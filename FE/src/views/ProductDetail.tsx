import { useState } from 'react'
import type { Product } from '../types'
import { MOCK_REVIEWS } from '../constants'
import { Star, Share2, Truck, ShieldCheck, Heart } from 'lucide-react'

interface ProductDetailProps {
  product: Product | null
  onBack: () => void
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState<number>(0)

  if (!product) return <div>Loading...</div>

  const currentPrice = product.volumeOptions[selectedSize]?.price || product.price

  return (
    <div className='px-6 pb-20 max-w-7xl mx-auto'>
      {/* Breadcrumb */}
      <div className='text-xs text-slate-500 mb-8 flex items-center gap-2'>
        <span className='cursor-pointer hover:text-white' onClick={onBack}>
          Home
        </span>
        <span>/</span>
        <span className='cursor-pointer hover:text-white'>Fragrances</span>
        <span>/</span>
        <span className='cursor-pointer hover:text-white'>{product.brand}</span>
        <span>/</span>
        <span className='text-slate-300'>{product.name} Details</span>
      </div>

      <div className='grid md:grid-cols-2 gap-12 lg:gap-20'>
        {/* Gallery */}
        <div className='space-y-6'>
          <div className='aspect-square bg-[#1e1e1e] rounded-xl overflow-hidden flex items-center justify-center relative p-8 border border-dark-700'>
            <button className='absolute top-4 right-4 p-2 bg-dark-800/50 rounded-full hover:bg-dark-700 transition-colors text-slate-400 hover:text-red-500'>
              <Heart className='w-5 h-5' />
            </button>
            <img
              src={product.image}
              alt={product.name}
              className='max-h-full max-w-full object-contain drop-shadow-2xl'
            />
          </div>
          <div className='flex gap-4'>
            <div className='w-20 h-20 rounded-lg border-2 border-primary overflow-hidden p-1 cursor-pointer'>
              <img src={product.image} alt='Thumbnail' className='w-full h-full object-cover' />
            </div>
            <div className='w-20 h-20 rounded-lg border border-dark-700 overflow-hidden p-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity'>
              <img src={product.image} alt='Thumbnail 2' className='w-full h-full object-cover grayscale' />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className='flex flex-col'>
          <h4 className='text-primary font-bold text-sm tracking-widest uppercase mb-2'>{product.brand}</h4>
          <h1 className='text-4xl font-serif font-bold text-white mb-4'>{product.name}</h1>
          <div className='flex items-center gap-4 mb-2'>
            {product.tags.map((tag) => (
              <span
                key={tag}
                className='px-2 py-0.5 bg-accent/20 text-accent text-[10px] font-bold rounded uppercase border border-accent/30'
              >
                {tag}
              </span>
            ))}
          </div>

          <div className='flex items-center gap-2 mb-6'>
            <span className='text-2xl font-medium text-white'>${currentPrice.toFixed(2)}</span>
            <div className='h-4 w-px bg-slate-700 mx-2'></div>
            <div className='flex text-accent'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'fill-current' : 'text-slate-700'}`}
                />
              ))}
            </div>
            <span className='text-sm text-slate-400'>({product.reviews} reviews)</span>
          </div>

          <p className='text-slate-300 leading-relaxed mb-8 border-b border-dark-700 pb-8'>{product.description}</p>

          {/* Selectors */}
          <div className='space-y-6 mb-8'>
            <div className='flex justify-between items-center'>
              <span className='text-sm font-bold text-slate-300'>Volume</span>
              <button className='text-xs text-primary underline'>Size Guide</button>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              {product.volumeOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(idx)}
                  className={`py-3 rounded-lg border text-center transition-all ${selectedSize === idx ? 'border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'border-dark-700 bg-dark-800 text-slate-400 hover:border-slate-500'}`}
                >
                  <div className='text-sm font-bold'>{opt.size}</div>
                  <div className='text-xs opacity-70'>${opt.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-4 mb-8'>
            <button className='flex-1 bg-primary hover:bg-sky-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary/25 transition-all active:scale-95'>
              Add to Cart
            </button>
            <button className='px-4 bg-dark-800 border border-dark-700 rounded-lg hover:text-white text-slate-400 transition-colors'>
              <Share2 className='w-5 h-5' />
            </button>
          </div>

          {/* Features */}
          <div className='grid grid-cols-2 gap-4 text-xs text-slate-400'>
            <div className='flex items-center gap-2'>
              <Truck className='w-4 h-4 text-primary' />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className='flex items-center gap-2'>
              <ShieldCheck className='w-4 h-4 text-primary' />
              <span>Authenticity Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Reviews */}
      <div className='mt-20'>
        <div className='flex border-b border-dark-700 mb-8'>
          <button className='pb-4 border-b-2 border-primary text-primary font-bold mr-8'>Description</button>
          <button className='pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300 mr-8'>
            Ingredients
          </button>
          <button className='pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300'>Brand Info</button>
        </div>

        <div className='space-y-4 text-slate-400 leading-relaxed max-w-3xl'>
          <p>
            The {product.name} extrait de parfum augments the strength and radiance of the brand's amber woody floral
            aura. In this exalted version of a signature scent, jasmine blossoms and woody musks engage in an alchemy of
            the senses. A profusion and fusion of the elements that can only be tamed by the art of the perfumer and
            time-tested wisdom.
          </p>
          <ul className='list-disc pl-5 space-y-1'>
            <li>
              <strong className='text-slate-300'>Top Notes:</strong> Grandiflorum Jasmine from Egypt, Saffron
            </li>
            <li>
              <strong className='text-slate-300'>Heart Notes:</strong> Bitter Almond from Morocco, Cedar Wood
            </li>
            <li>
              <strong className='text-slate-300'>Base Notes:</strong> Woody Musk accord, Ambergris
            </li>
          </ul>
        </div>

        <div className='mt-16'>
          <h3 className='text-xl font-bold text-white mb-8'>Reviews & Ratings</h3>
          <div className='grid lg:grid-cols-12 gap-12'>
            <div className='lg:col-span-4 bg-dark-800 p-8 rounded-xl border border-dark-700 h-fit'>
              <h4 className='font-bold text-white mb-4'>Write a Review</h4>
              <div className='mb-4'>
                <label className='block text-xs font-bold text-slate-500 mb-2'>RATING</label>
                <div className='flex text-slate-600 gap-1'>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className='w-6 h-6 hover:text-accent cursor-pointer transition-colors' />
                  ))}
                </div>
              </div>
              <div className='mb-6'>
                <label className='block text-xs font-bold text-slate-500 mb-2'>YOUR REVIEW</label>
                <textarea
                  className='w-full bg-dark-900 border border-dark-600 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary h-32'
                  placeholder='Share your thoughts...'
                ></textarea>
              </div>
              <button className='w-full bg-primary text-white py-3 rounded-lg font-bold text-sm'>Submit Review</button>
            </div>

            <div className='lg:col-span-8 space-y-8'>
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className='border-b border-dark-700 pb-8 last:border-0'>
                  <div className='flex justify-between items-start mb-2'>
                    <h5 className='font-bold text-white'>{review.user}</h5>
                    <span className='text-xs text-slate-500'>{review.date}</span>
                  </div>
                  <div className='flex text-accent mb-3'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-700'}`} />
                    ))}
                  </div>
                  <p className='text-slate-400 text-sm leading-relaxed'>{review.comment}</p>
                </div>
              ))}
              <button className='text-primary text-sm font-medium hover:underline'>Load More Reviews</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
