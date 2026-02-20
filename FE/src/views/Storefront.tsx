import type { Product } from '../types'
import { MOCK_PRODUCTS } from '../constants'
import { ProductCard } from '../components/ProductCard'

interface StorefrontProps {
  onProductClick: (product: Product) => void
}

const Storefront: React.FC<StorefrontProps> = ({ onProductClick }) => {
  const featuredProduct = MOCK_PRODUCTS[0]

  return (
    <div className='pb-12'>
      {/* Hero Section */}
      <div className='px-6 mb-12'>
        <div className='bg-gradient-to-r from-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-8 md:p-12 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-dark-900 to-transparent'></div>

          <div className='relative z-10 grid md:grid-cols-2 gap-8 items-center'>
            <div className='space-y-6'>
              <span className='inline-block px-3 py-1 bg-dark-700 text-primary text-xs font-semibold rounded-full uppercase tracking-wider'>
                Featured Collection
              </span>
              <h1 className='text-4xl md:text-6xl font-serif font-bold text-white leading-tight'>
                {featuredProduct.name}
              </h1>
              <p className='text-slate-400 text-lg max-w-md'>{featuredProduct.description}</p>
              <button
                onClick={() => onProductClick(featuredProduct)}
                className='bg-primary hover:bg-sky-600 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-primary/20'
              >
                Explore Now
              </button>
            </div>
            <div className='flex justify-center md:justify-end'>
              <div className='relative group cursor-pointer' onClick={() => onProductClick(featuredProduct)}>
                <div className='absolute inset-0 bg-primary blur-3xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity'></div>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className='relative h-80 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='px-6 grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* Filters Sidebar */}
        <div className='lg:col-span-3 space-y-8'>
          <div>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-bold text-slate-500 uppercase tracking-wider'>Collection</h3>
            </div>
            <div className='space-y-2'>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  defaultChecked
                  className='w-4 h-4 rounded border-slate-600 bg-dark-800 text-primary focus:ring-primary focus:ring-offset-dark-900'
                />
                <span className='text-slate-300 group-hover:text-white transition-colors'>All Fragrances</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  className='w-4 h-4 rounded border-slate-600 bg-dark-800 text-primary focus:ring-primary focus:ring-offset-dark-900'
                />
                <span className='text-slate-300 group-hover:text-white transition-colors'>Extrait de Parfum</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  className='w-4 h-4 rounded border-slate-600 bg-dark-800 text-primary focus:ring-primary focus:ring-offset-dark-900'
                />
                <span className='text-slate-300 group-hover:text-white transition-colors'>Eau de Parfum</span>
              </label>
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-bold text-slate-500 uppercase tracking-wider'>Brands</h3>
              <button className='text-xs text-primary hover:underline'>Clear</button>
            </div>
            <div className='space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar'>
              {[
                'Tom Ford',
                'Maison Francis Kurkdjian',
                'Creed',
                'Parfums de Marly',
                'Roja Parfums',
                'Xerjoff',
                'Amouage'
              ].map((brand) => (
                <label key={brand} className='flex items-center gap-3 cursor-pointer group'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 rounded border-slate-600 bg-dark-800 text-primary focus:ring-primary focus:ring-offset-dark-900'
                  />
                  <span className='text-slate-300 group-hover:text-white transition-colors'>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className='text-sm font-bold text-slate-500 uppercase tracking-wider mb-4'>Audience</h3>
            <div className='flex gap-2'>
              <button className='px-3 py-1 bg-dark-800 border border-dark-700 rounded text-slate-300 hover:bg-dark-700 hover:text-white text-sm'>
                Male
              </button>
              <button className='px-3 py-1 bg-dark-800 border border-dark-700 rounded text-slate-300 hover:bg-dark-700 hover:text-white text-sm'>
                Female
              </button>
              <button className='px-3 py-1 bg-primary border border-primary rounded text-white text-sm'>Unisex</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='lg:col-span-9'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-serif text-white'>Fragrance Selection</h2>
            <div className='flex items-center gap-2'>
              <span className='text-slate-400 text-sm'>Sort by:</span>
              <select className='bg-dark-800 border border-dark-700 text-white text-sm rounded px-2 py-1 focus:outline-none focus:border-primary'>
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {MOCK_PRODUCTS.slice(1).map((product) => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center mt-12 gap-2'>
            <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-slate-400 hover:bg-dark-700'>
              &lt;
            </button>
            <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold'>
              1
            </button>
            <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-slate-400 hover:bg-dark-700 hover:text-white transition-colors'>
              2
            </button>
            <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-slate-400 hover:bg-dark-700 hover:text-white transition-colors'>
              3
            </button>
            <span className='w-10 h-10 flex items-center justify-center text-slate-600'>...</span>
            <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-slate-400 hover:bg-dark-700 hover:text-white transition-colors'>
              8
            </button>
            <button className='w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 border border-dark-700 text-slate-400 hover:bg-dark-700'>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Storefront
