import React from 'react'
import Hero from './assets/components/Hero'
import Navbar from './assets/components/Navbar'
import MenuSection from './assets/components/MenuSection'
import About from './assets/components/About'
import Reservation from './assets/components/Reservation'


const App = () => {
  return (
    <div>
     <Hero/>
     <Navbar/>
     <About/>
      <MenuSection/>
      <Reservation/>
       

    </div>
  )
}

export default App
