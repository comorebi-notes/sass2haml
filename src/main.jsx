import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.sass'

const renderTargetDom = document.querySelector('#root')

createRoot(renderTargetDom).render(
  <StrictMode>
    <App />
  </StrictMode>
)
