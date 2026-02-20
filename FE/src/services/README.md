# Services Layer

This directory contains all API service modules using Axios for HTTP requests.

## Structure

```
services/
├── api.ts              # Base API service with Axios instance & interceptors
├── authService.ts      # Authentication endpoints
├── brandService.ts     # Brand management endpoints
├── productService.ts   # Product/Perfume endpoints
├── commentService.ts   # Comment/Review endpoints
├── memberService.ts    # Member profile endpoints
└── index.ts           # Export all services
```

## Architecture

All services use a **single shared Axios instance** configured in `api.ts`:
- ✅ One axios instance with interceptors
- ✅ Automatic token management
- ✅ Global error handling
- ✅ Request/response logging in dev mode

## Usage

### Import Services

```typescript
import { authService, productService, brandService } from '@/services'
```

### Making API Calls

All services return promises with typed responses:

```typescript
// Login example
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  })
  
  console.log(response.data.user)
  console.log(response.data.token)
} catch (error) {
  console.error('Login failed:', error)
}

// Get products example
try {
  const response = await productService.getAll()
  console.log(response.data) // Product[]
} catch (error) {
  console.error('Failed to fetch products:', error)
}
```

## Features

### Axios Interceptors

**Request Interceptor:**
- Automatically adds `Authorization` header with JWT token
- Logs requests in development mode

**Response Interceptor:**
- Handles 401 errors (redirects to login)
- Handles 403, 404, 500 errors
- Logs responses in development mode
- Global error handling

### API Service Methods

```typescript
apiService.get<T>(endpoint, config?)
apiService.post<T>(endpoint, data?, config?)
apiService.put<T>(endpoint, data?, config?)
apiService.patch<T>(endpoint, data?, config?)
apiService.delete<T>(endpoint, config?)
apiService.uploadFile<T>(endpoint, formData, config?)
```

### Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}
```

## Configuration

API base URL is configured via environment variable:

```env
VITE_API_URL=http://localhost:3000/api
```

Default: `http://localhost:3000/api`

### Single Axios Instance

All services share one configured axios instance from `api.ts`:
- Interceptors are set up once
- Token management is centralized
- Error handling is consistent across all services

## Error Handling

Errors are handled globally by Axios interceptors:

- **401 Unauthorized**: Clears token and redirects to `/auth`
- **403 Forbidden**: Logs error
- **404 Not Found**: Logs error
- **500 Server Error**: Logs error
- **Network Error**: Logs error

You can also handle errors locally:

```typescript
try {
  const response = await productService.getById('123')
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('Status:', error.response?.status)
    console.error('Data:', error.response?.data)
  }
}
```

## Adding New Services

1. Create new service file (e.g., `orderService.ts`)
2. Import `apiService`
3. Define service methods
4. Export from `index.ts`

Example:

```typescript
// orderService.ts
import { apiService } from './api'
import type { Order } from '../types'

export const orderService = {
  async getAll() {
    return apiService.get<Order[]>('/orders')
  },
  
  async create(order: Omit<Order, 'id'>) {
    return apiService.post<Order>('/orders', order)
  },
}
```

## Best Practices

1. Always use TypeScript types for request/response
2. Handle errors appropriately in components
3. Use try-catch blocks for async operations
4. Don't expose sensitive data in error messages
5. Use loading states in UI during API calls
