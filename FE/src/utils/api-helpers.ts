// API helper utilities
import { type AxiosError } from 'axios'

/**
 * Check if error is an Axios error
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true
}

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    // Check if error response has message
    if (error.response?.data?.message) {
      return error.response.data.message
    }

    // Check for validation errors
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      if (Array.isArray(errors)) {
        return errors.map((e: { message: string }) => e.message).join(', ')
      }
    }

    // Default error messages based on status
    switch (error.response?.status) {
      case 400:
        return 'Invalid request. Please check your input.'
      case 401:
        return 'Unauthorized. Please login again.'
      case 403:
        return 'Access forbidden. You do not have permission.'
      case 404:
        return 'Resource not found.'
      case 500:
        return 'Server error. Please try again later.'
      default:
        return error.message || 'An error occurred'
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unknown error occurred'
}

/**
 * Build query string from object
 */
export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * Create FormData from object
 */
export const createFormData = (data: Record<string, unknown>): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)))
      } else {
        formData.append(key, String(value))
      }
    }
  })

  return formData
}

/**
 * Retry failed request
 */
export const retryRequest = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) {
      throw error
    }

    await new Promise((resolve) => setTimeout(resolve, delay))
    return retryRequest(fn, retries - 1, delay * 2)
  }
}
