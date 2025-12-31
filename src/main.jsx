import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'           // ✅ এটা থাকতে হবে

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
