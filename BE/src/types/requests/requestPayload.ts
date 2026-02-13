import mongoose, { Types } from 'mongoose'

export interface RegisterPayload {
  email: string
  password: string
  name: string
  yob: number
  gender: boolean
}

export interface LoginPayload {
  email: string
  password: string
}
export interface PerfumeSearchFilter {
  perfumeName?: {
    $regex: string
    $options: string
  }
  brand?: mongoose.Types.ObjectId
}

export interface UpdateProfilePayload {
  name?: string
  gender?: boolean
  yob?: number
}

export interface ChangePasswordPayload {
  old_password: string
  password: string
  confirm_password: string
}

export interface CreateBrandPayload {
  brandName: string
}

export interface CreatePerfumePayload {
  perfumeName: string
  brand: string | mongoose.Types.ObjectId
  description: string
  uri: string
  price: number
  concentration: string
  ingredients: string
  volume: number
  targetAudience: string
}

export interface UpdatePerfumePayload {
  perfumeName?: string
  brand?: string | mongoose.Types.ObjectId
  description?: string
  uri?: string
  price?: number
  concentration?: string
  ingredients?: string
  volume?: number
  targetAudience?: string
}

export interface CreateCommentPayload {
  perfumeId: string | Types.ObjectId
  author: string | Types.ObjectId
  content: string
  rating: number
}

export interface UpdateCommentPayload {
  content?: string
  rating?: number
}
