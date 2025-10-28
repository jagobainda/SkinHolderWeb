//import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@ui/pages/LoginPage'

export const Router = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<div>Bienvenido</div>} />
    </Routes>
)
