import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'

export const App: React.FC = () => (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
)
