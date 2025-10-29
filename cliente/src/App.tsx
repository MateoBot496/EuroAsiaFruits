import { useState, type JSX } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() : JSX.Element {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1 className='text-3xl font-bold underline '> Hola mundillo </h1>
    </>
  )
}

export default App
