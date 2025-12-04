import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//Quitaremos esta parte en producción. Usamos modo estricto para el testing.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
