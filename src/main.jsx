import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (import.meta.env.DEV) {
  studio.initialize()
  studio.extend(extension)
}

// studio.ui.hide()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
)
