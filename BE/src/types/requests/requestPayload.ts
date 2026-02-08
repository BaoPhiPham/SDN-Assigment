import mongoose from 'mongoose'

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
