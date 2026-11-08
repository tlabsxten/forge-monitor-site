import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const LIME = 0xc8ff3d
const ORANGE = 0xff6a3d
const STEEL = 0x8b9a93
const INK = 0x0b0f11

function ringSector(inner, outer, progress) {
  const sweep = Math.PI * 2 * Math.max(0, Math.min(1, progress))
  if (sweep < 0.002) return new THREE.BufferGeometry()
  const start = Math.PI / 2
  const end = start - sweep
  const shape = new THREE.Shape()
  shape.absarc(0, 0, outer, start, end, true)
  shape.absarc(0, 0, inner, end, start, false)
  shape.closePath()
  return new THREE.ShapeGeometry(shape, 120)
}

function fullRing(inner, outer, color, opacity = 0.55) {
  const geometry = new THREE.RingGeometry(inner, outer, 180, 1)
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  return new THREE.Mesh(geometry, material)
}

function makeTicks() {
  const points = []
  for (let i = 0; i < 72; i += 1) {
    const angle = (i / 72) * Math.PI * 2
    const long = i % 6 === 0
    const r1 = 2.64
    const r2 = long ? 2.8 : 2.72
    points.push(
      new THREE.Vector3(Math.cos(angle) * r1, Math.sin(angle) * r1, -0.05),
      new THREE.Vector3(Math.cos(angle) * r2, Math.sin(angle) * r2, -0.05),
    )
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color: 0x354146,
    transparent: true,
    opacity: 0.65,
  })
  return new THREE.LineSegments(geometry, material)
}

function makeParticles(mobile) {
  const count = mobile ? 110 : 240
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const palette = [new THREE.Color(LIME), new THREE.Color(ORANGE), new THREE.Color(0x9fb0a7)]
  for (let i = 0; i < count; i += 1) {
    const radius = 2.9 + Math.random() * 2.1
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.55
    const color = palette[Math.floor(Math.random() * palette.length)]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = new THREE.PointsMaterial({
    size: mobile ? 0.03 : 0.025,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })
  return new THREE.Points(geometry, material)
}

export default function ForgeCore({
  testProgress = 0.82,
  acceptanceProgress = 0.64,
  className = '',
  label = 'Forge signal core',
}) {
  const mountRef = useRef(null)
  const stateRef = useRef({ testProgress, acceptanceProgress })
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    stateRef.current = { testProgress, acceptanceProgress }
  }, [testProgress, acceptanceProgress])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 760px)').matches

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setFailed(true)
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0.35, 9.15)
    camera.lookAt(0, 0, 0)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.domElement.setAttribute('aria-label', label)
    renderer.domElement.setAttribute('role', 'img')
    mount.appendChild(renderer.domElement)

    const root = new THREE.Group()
    const ringGroup = new THREE.Group()
    const coreGroup = new THREE.Group()
    root.add(ringGroup, coreGroup)
    scene.add(root)

    const baseOuter = fullRing(2.36, 2.52, 0x182226, 0.8)
    const baseInner = fullRing(2.1, 2.26, 0x182226, 0.72)
    ringGroup.add(baseOuter, baseInner, makeTicks())

    const testMaterial = new THREE.MeshStandardMaterial({
      color: LIME,
      emissive: LIME,
      emissiveIntensity: 1.9,
      metalness: 0.15,
      roughness: 0.35,
      side: THREE.DoubleSide,
      toneMapped: false,
    })
    const acceptanceMaterial = new THREE.MeshStandardMaterial({
      color: ORANGE,
      emissive: ORANGE,
      emissiveIntensity: 1.5,
      metalness: 0.15,
      roughness: 0.4,
      side: THREE.DoubleSide,
      toneMapped: false,
    })

    const testMesh = new THREE.Mesh(ringSector(2.36, 2.52, stateRef.current.testProgress), testMaterial)
    testMesh.position.z = 0.04
    const acceptanceMesh = new THREE.Mesh(
      ringSector(2.1, 2.26, stateRef.current.acceptanceProgress),
      acceptanceMaterial,
    )
    acceptanceMesh.position.z = 0.05
    ringGroup.add(testMesh, acceptanceMesh)

    const coreGeometry = new THREE.IcosahedronGeometry(0.96, 1)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: INK,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    core.scale.set(0.74, 1.15, 0.74)
    core.rotation.z = 0.18
    coreGroup.add(core)

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: STEEL,
      transparent: true,
      opacity: 0.65,
    })
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry), edgeMaterial)
    edges.scale.copy(core.scale)
    edges.rotation.copy(core.rotation)
    coreGroup.add(edges)

    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 32, 32),
      new THREE.MeshBasicMaterial({
        color: LIME,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    coreGroup.add(coreGlow)

    const orbitA = new THREE.Mesh(
      new THREE.TorusGeometry(1.34, 0.006, 6, 140),
      new THREE.MeshBasicMaterial({ color: STEEL, transparent: true, opacity: 0.35 }),
    )
    orbitA.rotation.x = Math.PI / 2.1
    const orbitB = new THREE.Mesh(
      new THREE.TorusGeometry(1.58, 0.005, 6, 140),
      new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.28 }),
    )
    orbitB.rotation.y = Math.PI / 2.2
    coreGroup.add(orbitA, orbitB)

    const satellites = [
      new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshBasicMaterial({ color: LIME }),
      ),
      new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshBasicMaterial({ color: ORANGE }),
      ),
      new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 16, 16),
        new THREE.MeshBasicMaterial({ color: STEEL }),
      ),
    ]
    satellites.forEach((satellite, index) => {
      satellite.userData.phase = index * 2.1
      coreGroup.add(satellite)
    })

    const particles = makeParticles(mobile)
    root.add(particles)

    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const key = new THREE.DirectionalLight(0xffffff, 3.2)
    key.position.set(4, 6, 8)
    scene.add(key)
    const limeLight = new THREE.PointLight(LIME, 45, 14, 2)
    limeLight.position.set(-3.5, 2.5, 4)
    scene.add(limeLight)
    const orangeLight = new THREE.PointLight(ORANGE, 30, 12, 2)
    orangeLight.position.set(3.5, -2, 3.5)
    scene.add(orangeLight)

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return
      const rect = mount.getBoundingClientRect()
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onPointerLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerleave', onPointerLeave)

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    const clock = new THREE.Clock()
    let lastTest = stateRef.current.testProgress
    let lastAcceptance = stateRef.current.acceptanceProgress

    const updateRing = (mesh, inner, outer, progress) => {
      mesh.geometry.dispose()
      mesh.geometry = ringSector(inner, outer, progress)
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const { testProgress: nextTest, acceptanceProgress: nextAcceptance } = stateRef.current
      if (nextTest !== lastTest) {
        updateRing(testMesh, 2.36, 2.52, nextTest)
        lastTest = nextTest
      }
      if (nextAcceptance !== lastAcceptance) {
        updateRing(acceptanceMesh, 2.1, 2.26, nextAcceptance)
        lastAcceptance = nextAcceptance
      }

      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05

      if (!reducedMotion) {
        root.rotation.y = Math.sin(elapsed * 0.18) * 0.16 + pointer.x * 0.18
        root.rotation.x = Math.sin(elapsed * 0.14) * 0.06 + pointer.y * 0.1
        coreGroup.rotation.y += 0.0032
        coreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.08
        ringGroup.rotation.z = Math.sin(elapsed * 0.2) * 0.018
        orbitA.rotation.z = elapsed * 0.12
        orbitB.rotation.z = -elapsed * 0.09
        particles.rotation.y = elapsed * 0.012
        satellites.forEach((satellite, index) => {
          const angle = elapsed * (0.18 + index * 0.03) + satellite.userData.phase
          const radius = 1.5 + index * 0.42
          satellite.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.6,
            Math.sin(angle * 1.4) * 0.35,
          )
        })
      }

      renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerleave', onPointerLeave)
      renderer.domElement.remove()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
    }
  }, [label])

  return (
    <div className={`forge-core ${className}`.trim()}>
      <div ref={mountRef} className="forge-core-canvas" />
      {failed ? (
        <div className="forge-core-fallback" aria-hidden="true">
          <span />
          <span />
          <span />
          <b>F</b>
        </div>
      ) : null}
    </div>
  )
}
