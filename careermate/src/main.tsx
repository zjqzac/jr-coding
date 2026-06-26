import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Login from '@/pages/Login'
import Register from '@/pages/Register'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Login /> */}
    <Register />
  </StrictMode>,
)
