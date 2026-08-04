import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { es } from './content.es.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App content={es} />
  </StrictMode>,
)
