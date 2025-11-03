import { useState, useEffect } from 'react'
import { AuthApi } from '@data/datasources/AuthApi.ts'

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isChecking, setIsChecking] = useState<boolean>(true)

    const checkAuth = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsAuthenticated(false)
            setIsChecking(false)
            return
        }

        const isValid = await AuthApi.validate()

        if (!isValid) {
            localStorage.removeItem('token')
            setIsAuthenticated(false)
        } else {
            setIsAuthenticated(true)
        }

        setIsChecking(false)
    }

    useEffect(() => {
        checkAuth().catch(error => {
            console.error('Error checking authentication:', error)
            setIsAuthenticated(false)
            setIsChecking(false)
        })

        const interval = setInterval(checkAuth, 6000000)

        return () => clearInterval(interval)
    }, [])

    return { isAuthenticated, isChecking, checkAuth }
}
