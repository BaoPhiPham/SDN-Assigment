import { apiService } from './api'
import type { Review } from '../types'

interface CreateCommentData {
  productId: string
  rating: number
  comment: string
}

export const commentService = {
  async getByProductId(productId: string) {
    return apiService.get<Review[]>(`/comments/perfume/${productId}`)
  },

  async create(data: CreateCommentData) {
    return apiService.post<Review>('/comments', data)
  },

  async update(id: string, data: Partial<CreateCommentData>) {
    return apiService.put<Review>(`/comments/${id}`, data)
  },

  async delete(id: string) {
    return apiService.delete<void>(`/comments/${id}`)
  }
}
