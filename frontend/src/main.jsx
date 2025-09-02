import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FindPath from './FindPath.jsx'
import SelectItems from './SelectItems.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SelectItems />
  </StrictMode>,
)
