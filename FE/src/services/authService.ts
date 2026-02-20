import { apiService } from './api'
import type { User } from '../types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  birthYear: string
  gender: 'Female' | 'Male' | 'Other'
}

export const authService = {
  async login(credentials: LoginCredentials) {
    return apiService.post<{ user: User; token: string }>('/auth/login', credentials)
  },

  async register(data: RegisterData) {
    return apiService.post<{ user: User; token: string }>('/auth/register', data)
  },

  async logout() {
    return apiService.post<void>('/auth/logout', {})
  },

  async getCurrentUser() {
    return apiService.get<User>('/auth/me')
  }
}
