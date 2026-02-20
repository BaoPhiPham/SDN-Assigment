import { apiService } from './api'
import type { Product } from '../types'

export const productService = {
  async getAll() {
    return apiService.get<Product[]>('/perfumes')
  },

  async getById(id: string) {
    return apiService.get<Product>(`/perfumes/${id}`)
  },

  async create(product: Omit<Product, 'id'>) {
    return apiService.post<Product>('/perfumes', product)
  },

  async update(id: string, product: Partial<Product>) {
    return apiService.put<Product>(`/perfumes/${id}`, product)
  },

  async delete(id: string) {
    return apiService.delete<void>(`/perfumes/${id}`)
  }
}
