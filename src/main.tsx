import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { en } from './content.en.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App content={en} />
  </StrictMode>,
)
