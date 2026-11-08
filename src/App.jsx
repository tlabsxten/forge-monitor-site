import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SignalLab from './components/SignalLab'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Download from './components/Download'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <SignalLab />
        <Features />
        <Showcase />
        <Download />
      </main>
      <Footer />
    </>
  )
}
