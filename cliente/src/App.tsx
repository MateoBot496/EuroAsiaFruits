import { BrowserRouter, Routes, Route } from "react-router-dom";
import {type JSX } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Productos from './pages/Productos'
import About from './pages/About'


function App() : JSX.Element {

  

  return (
    <>
      <BrowserRouter>
          <Navbar />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/about" element={<About />} />

          </Routes>
          
      </BrowserRouter>
    </>
  )
}

export default App
  