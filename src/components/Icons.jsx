const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 18, children, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
}

export function AppleIcon({ size = 17, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.36 12.66c.02-2.1 1.72-3.1 1.8-3.15-.98-1.43-2.5-1.63-3.04-1.65-1.29-.13-2.52.76-3.17.76-.66 0-1.66-.74-2.73-.72-1.4.02-2.7.81-3.42 2.06-1.46 2.53-.37 6.27 1.05 8.32.7 1 1.53 2.13 2.62 2.09 1.05-.04 1.45-.68 2.72-.68 1.27 0 1.63.68 2.74.66 1.13-.02 1.84-1.02 2.53-2.03.8-1.16 1.12-2.29 1.14-2.35-.02-.01-2.19-.84-2.21-3.31ZM14.3 6.46c.58-.7.97-1.67.86-2.64-.84.03-1.86.56-2.46 1.26-.54.62-1.01 1.61-.88 2.56.94.07 1.9-.48 2.48-1.18Z"
      />
    </svg>
  )
}

export function ArrowIcon({ size = 16, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="M5 12h13M13 6l6 6-6 6" />
    </Svg>
  )
}

export function DownloadIcon({ size = 16, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14" />
    </Svg>
  )
}

export function CheckIcon({ size = 16, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="m5 12 4 4L19 6" />
    </Svg>
  )
}

export function BranchIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <circle {...strokeProps} cx="7" cy="5" r="2.2" />
      <circle {...strokeProps} cx="17" cy="7" r="2.2" />
      <circle {...strokeProps} cx="7" cy="19" r="2.2" />
      <path {...strokeProps} d="M7 7.2v9.6M9.2 5h3.2a2.6 2.6 0 0 1 2.6 2.6v.4" />
    </Svg>
  )
}

export function MonitorIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect {...strokeProps} x="3" y="4" width="18" height="12" rx="2" />
      <path {...strokeProps} d="M9 20h6M12 16v4" />
    </Svg>
  )
}

export function LockIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect {...strokeProps} x="5" y="10" width="14" height="10" rx="2" />
      <path {...strokeProps} d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10M12 14v2" />
    </Svg>
  )
}

export function SparkIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
      <path {...strokeProps} d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </Svg>
  )
}

export function PulseIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="M3 12h4l2.2-5 4.1 10L15.5 12H21" />
    </Svg>
  )
}

export function GridIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect {...strokeProps} x="3.5" y="3.5" width="6.5" height="6.5" rx="1.4" />
      <rect {...strokeProps} x="14" y="3.5" width="6.5" height="6.5" rx="1.4" />
      <rect {...strokeProps} x="3.5" y="14" width="6.5" height="6.5" rx="1.4" />
      <rect {...strokeProps} x="14" y="14" width="6.5" height="6.5" rx="1.4" />
    </Svg>
  )
}

export function ScanIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M8 12h8" />
    </Svg>
  )
}

export function ClipboardIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect {...strokeProps} x="6" y="4" width="12" height="16" rx="2" />
      <path {...strokeProps} d="M9 4.5V3h6v1.5M9 10h6M9 14h4" />
    </Svg>
  )
}

export function BoltIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path {...strokeProps} d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />
    </Svg>
  )
}
