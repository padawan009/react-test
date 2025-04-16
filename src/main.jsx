import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyForm from './MyForm'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyForm />
  </StrictMode>,
)
