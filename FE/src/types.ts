export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  rating: number
  reviews: number
  description: string
  tags: string[] // e.g., 'Male', 'Female', 'Unisex', 'Extract'
  volumeOptions: VolumeOption[]
}

export interface VolumeOption {
  size: string
  price: number
}

export interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

export interface Brand {
  id: string
  name: string
  status: 'Active' | 'Review' | 'Inactive'
  productsCount: number
  lastUpdated: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  birthYear: string
  gender: 'Female' | 'Male' | 'Other'
  joinDate: string
  role: 'Member' | 'VIP' | 'Collector' | 'Admin'
}

export const ViewState = {
  AUTH: 'AUTH',
  STOREFRONT: 'STOREFRONT',
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  PROFILE: 'PROFILE',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD'
} as const

export type ViewState = (typeof ViewState)[keyof typeof ViewState]
