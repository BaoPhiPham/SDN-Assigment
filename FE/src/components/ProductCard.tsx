import type { Product } from '../types'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className='bg-dark-800 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-primary/5 border border-dark-700 hover:border-dark-600 transition-all duration-300 flex flex-col'>
      <div className='relative pt-[100%] bg-dark-900 overflow-hidden cursor-pointer' onClick={() => onClick(product)}>
        <div className='absolute top-3 left-3 flex gap-1 z-10'>
          {product.tags.includes('Extract') && (
            <span className='bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase'>Extrait</span>
          )}
          {product.tags.includes('Unisex') && (
            <span className='bg-dark-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase'>
              Unisex
            </span>
          )}
        </div>
        <img
          src={product.image}
          alt={product.name}
          className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100'
        />
      </div>

      <div className='p-5 flex flex-col flex-grow'>
        <p className='text-xs text-slate-500 uppercase tracking-wide font-medium mb-1'>{product.brand}</p>
        <h3
          className='text-lg font-bold text-white mb-2 cursor-pointer hover:text-primary transition-colors'
          onClick={() => onClick(product)}
        >
          {product.name}
        </h3>
        <p className='text-slate-400 text-xs line-clamp-2 mb-4 flex-grow'>{product.description}</p>

        <div className='flex items-center justify-between mt-auto'>
          <span className='text-xl font-medium text-white'>${product.price.toFixed(2)}</span>
          <button className='bg-dark-700 hover:bg-primary text-white p-2 rounded-lg transition-colors group/btn'>
            <ShoppingCart className='w-5 h-5 group-hover/btn:scale-110 transition-transform' />
          </button>
        </div>
      </div>
    </div>
  )
}
