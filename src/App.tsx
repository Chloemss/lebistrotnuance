import { useState, useCallback, useEffect } from 'react'
import Loader         from './components/Loader'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
// import Place          from './components/Place'
import PageLinks      from './components/PageLinks'
import MenuVideo      from './components/MenuVideo'
import Gallery        from './components/Gallery'
import Reviews        from './components/Reviews'
import Faq            from './components/Faq'
import Visit          from './components/Visit'
import Reservation    from './components/Reservation'
import Footer         from './components/Footer'
import ScrollArrow    from './components/ScrollArrow'
import Cursor         from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import { useScrollReveal } from './hooks/useScrollReveal'
import './App.css'
import './animations.css'

export default function App() {
  const [loaded, setLoaded]         = useState(false)
  const [panelOpen, setPanelOpen]   = useState(false)

  useScrollReveal()

  useEffect(() => {
    document.body.classList.add('is-loading')
  }, [])

  const handleLoaderDone = useCallback(() => {
    document.body.classList.remove('is-loading')
    setLoaded(true)
  }, [])

  const openPanel = useCallback(() => {
    setPanelOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closePanel = useCallback(() => {
    setPanelOpen(false)
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      {!loaded && <Loader onDone={handleLoaderDone} />}

      <div className={`site${loaded ? ' site--visible' : ''}`}>
        <Navbar onReserve={openPanel} />
        <ScrollArrow />
        <main>
          <div id="hero">      <Hero />      </div>
          <div id="about">     <About />     </div>
          <div id="gallery">   <Gallery />   </div>
          {/* <div id="place">     <Place />     </div> */}
          <MenuVideo />        {/* id="carte-video" */}
          {/* <div id="events">    <Events />    </div> */}
          <div id="pagelinks"> <PageLinks /> </div>
          <div id="faq">       <Faq />       </div>
          <Reservation
            panelOpen={panelOpen}
            onOpenPanel={openPanel}
            onClosePanel={closePanel}
          />{/* id="reserver" */}
          <div id="avis">      <Reviews />   </div>
          <div id="visit">     <Visit />     </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
