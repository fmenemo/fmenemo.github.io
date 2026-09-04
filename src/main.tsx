import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { en } from './content.en.ts'

const root = createRoot(document.getElementById('root')!)

// The design prototype (#32): five variants of this page, switchable by the
// `variant` search parameter, on this same route. Two things keep it out of the
// site a visitor gets. With no parameter this boots the app it always booted,
// and `import.meta.env.DEV` is a literal `false` in a production build, so the
// dynamic import below is unreachable code that Rollup removes: neither the
// switcher nor any variant is in the bundle to ship. Throwaway, and it leaves
// with the design decision it exists to settle.
const requestedVariant = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('variant') : null

if (requestedVariant) {
  void import('./prototype/prototype.throwaway.tsx').then(({ default: Prototype }) => {
    root.render(
      <StrictMode>
        <Prototype content={en} requested={requestedVariant} />
      </StrictMode>,
    )
  })
} else {
  root.render(
    <StrictMode>
      <App content={en} />
    </StrictMode>,
  )
}
