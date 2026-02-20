import { apiService } from './api'
import type { Brand } from '../types'

export const brandService = {
  async getAll() {
    return apiService.get<Brand[]>('/brands')
  },

  async getById(id: string) {
    return apiService.get<Brand>(`/brands/${id}`)
  },

  async create(brand: Omit<Brand, 'id'>) {
    return apiService.post<Brand>('/brands', brand)
  },

  async update(id: string, brand: Partial<Brand>) {
    return apiService.put<Brand>(`/brands/${id}`, brand)
  },

  async delete(id: string) {
    return apiService.delete<void>(`/brands/${id}`)
  }
}
