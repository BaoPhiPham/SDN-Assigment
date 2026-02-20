import { apiService } from './api'
import type { User } from '../types'

interface UpdateProfileData {
  firstName?: string
  lastName?: string
  birthYear?: string
  gender?: 'Female' | 'Male' | 'Other'
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export const memberService = {
  async getProfile() {
    return apiService.get<User>('/members/profile')
  },

  async updateProfile(data: UpdateProfileData) {
    return apiService.put<User>('/members/profile', data)
  },

  async changePassword(data: ChangePasswordData) {
    return apiService.put<void>('/members/password', data)
  },

  async deleteAccount() {
    return apiService.delete<void>('/members/account')
  }
}
