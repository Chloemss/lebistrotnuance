import { useState, useCallback, useEffect } from 'react'
import Loader       from './components/Loader'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Place        from './components/Place'
import PageLinks    from './components/PageLinks'
import MenuVideo       from './components/MenuVideo'
import Gallery      from './components/Gallery'
import Faq          from './components/Faq'
import Visit        from './components/Visit'
import Reservation  from './components/Reservation'
import Footer       from './components/Footer'
import ScrollArrow  from './components/ScrollArrow'
import './App.css'

export default function App() {
  const [loaded, setLoaded]         = useState(false)
  const [panelOpen, setPanelOpen]   = useState(false)

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
      {!loaded && <Loader onDone={handleLoaderDone} />}

      <div className={`site${loaded ? ' site--visible' : ''}`}>
        <Navbar onReserve={openPanel} />
        <ScrollArrow />
        <main>
          <div id="hero">      <Hero />      </div>
          <div id="about">     <About />     </div>
          <MenuVideo />        {/* id="carte-video" */}
          {/* <div id="events">    <Events />    </div> */}
          <div id="gallery">   <Gallery />   </div>
          <div id="place">     <Place />     </div>
          <div id="pagelinks"> <PageLinks /> </div>
          <div id="faq">       <Faq />       </div>
          <Reservation
            panelOpen={panelOpen}
            onOpenPanel={openPanel}
            onClosePanel={closePanel}
          />{/* id="reserver" */}
          <div id="visit">     <Visit />     </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
