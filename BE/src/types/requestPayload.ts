export interface RegisterPayload {
  email: string
  password: string
  name: string
  yob?: number
  gender?: boolean
}

export interface LoginPayload {
  email: string
  password: string
}
