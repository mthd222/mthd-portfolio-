import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/martian-mono/wdth.css'
import '@fontsource-variable/instrument-sans/wdth.css'
import './index.css'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

// /admin is a dev-only content editor; the dynamic import is dead-code-eliminated
// from production builds, so the live site never ships it.
if (import.meta.env.DEV && window.location.pathname.startsWith('/admin')) {
  import('./admin/Admin.jsx').then(({ default: Admin }) => {
    root.render(<Admin />)
  })
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
