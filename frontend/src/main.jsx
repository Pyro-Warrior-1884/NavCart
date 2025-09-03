import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NavigationPage from './Navigation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigationPage />
  </StrictMode>,
)
