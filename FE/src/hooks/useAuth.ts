import { useState, useEffect } from 'react'
import type { User } from '../types'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token and validate
    const token = localStorage.getItem('authToken')

    // Simulate async token validation
    const validateToken = async () => {
      if (token) {
        // Validate token and fetch user data
        await Promise.resolve()
      }
      setLoading(false)
    }

    validateToken()
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    localStorage.setItem('authToken', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }
}
