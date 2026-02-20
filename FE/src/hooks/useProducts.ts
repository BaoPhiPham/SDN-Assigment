import { useState, useEffect } from 'react'
import type { Product } from '../types'
import { MOCK_PRODUCTS } from '../constants'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Replace with actual API call
        // const response = await productService.getAll()
        // setProducts(response.data)

        // For now, use mock data
        await new Promise((resolve) => setTimeout(resolve, 500))
        setProducts(MOCK_PRODUCTS)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
