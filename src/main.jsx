import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CardProvider from './context/CardProvider'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import DatabasePage from './pages/DatabasePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/database" element={<DatabasePage />} />
        </Routes>
      </BrowserRouter>
    </CardProvider>
  </StrictMode>,
)
