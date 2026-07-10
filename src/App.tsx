import { useState, useCallback, useEffect } from 'react'
import Loader         from './components/Loader'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
// import Place          from './components/Place'
// import PageLinks      from './components/PageLinks'
// import Devanture      from './components/Devanture'
// import CarteBoissons  from './components/CarteBoissons'
// import MenuVideo      from './components/MenuVideo'
import LaCarte        from './components/LaCarte'
// import Gallery        from './components/Gallery'
// import Reviews        from './components/Reviews'
import Visit          from './components/Visit'
import Faq            from './components/Faq'
import Footer         from './components/Footer'
import Reservation    from './components/Reservation'
import ScrollArrow    from './components/ScrollArrow'
import Cursor         from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import { useScrollReveal } from './hooks/useScrollReveal'
import './App.css'
import './animations.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useScrollReveal()

  useEffect(() => {
    document.body.classList.add('is-loading')
  }, [])

  const handleLoaderDone = useCallback(() => {
    document.body.classList.remove('is-loading')
    setLoaded(true)
  }, [])

  /* "Réserver" (navbar, hero) → défile vers la section réservation */
  const goToReserve = useCallback(() => {
    document.getElementById('reserver')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {!loaded && <Loader onDone={handleLoaderDone} />}

      <div className={`site${loaded ? ' site--visible' : ''}`}>
        <Navbar onReserve={goToReserve} />
        <ScrollArrow />
        <main>
          <div id="hero">      <Hero onReserve={goToReserve} /> </div>
          <div id="about">     <About />     </div>
          <LaCarte />          {/* id="carte" — Manger & Boire réunis */}
          <Visit />            {/* id="visit" */}
          <div id="faq">       <Faq />       </div>
          <Reservation />      {/* id="reserver" */}
        </main>
        <Footer />
      </div>
    </>
  )
}
