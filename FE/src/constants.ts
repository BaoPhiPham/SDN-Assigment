import type { Product, Brand, User, Review } from './types'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Elixir',
    brand: 'PerfumeHub Collection',
    price: 280.0,
    image: 'https://picsum.photos/400/500?random=1',
    rating: 5,
    reviews: 124,
    description: 'Discover the allure of our newest extrait de parfum. A symphony of dark woods and rare spices.',
    tags: ['Extract', 'Unisex', 'Featured'],
    volumeOptions: [
      { size: '50ml', price: 180 },
      { size: '100ml', price: 280 }
    ]
  },
  {
    id: '2',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    price: 425.0,
    image: 'https://picsum.photos/400/500?random=2',
    rating: 4.8,
    reviews: 89,
    description:
      'Luminous and sophisticated, Baccarat Rouge 540 lays on the skin like an amber floral and woody breeze. A poetic alchemy composed by Francis Kurkdjian, where the aerial notes of jasmine and the radiance of saffron carry mineral facets of ambergris and woody tones of freshly cut cedar.',
    tags: ['Unisex', 'Extract', 'Popular'],
    volumeOptions: [
      { size: '35ml', price: 205 },
      { size: '70ml', price: 425 },
      { size: '200ml', price: 850 }
    ]
  },
  {
    id: '3',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    price: 145.0,
    image: 'https://picsum.photos/400/500?random=3',
    rating: 4.7,
    reviews: 342,
    description: 'A woody aromatic fragrance for the man who defies convention.',
    tags: ['Male', 'Eau de Parfum'],
    volumeOptions: [
      { size: '50ml', price: 105 },
      { size: '100ml', price: 145 }
    ]
  },
  {
    id: '4',
    name: 'Black Orchid',
    brand: 'Tom Ford',
    price: 195.0,
    image: 'https://picsum.photos/400/500?random=4',
    rating: 4.6,
    reviews: 210,
    description:
      'A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice.',
    tags: ['Female', 'Unisex', 'Dark'],
    volumeOptions: [
      { size: '50ml', price: 150 },
      { size: '100ml', price: 195 }
    ]
  },
  {
    id: '5',
    name: 'Sauvage Elixir',
    brand: 'Dior',
    price: 230.0,
    image: 'https://picsum.photos/400/500?random=5',
    rating: 4.9,
    reviews: 512,
    description:
      'An extraordinarily concentrated fragrance steeped in the emblematic freshness of Sauvage with an intoxicating heart of spices.',
    tags: ['Male', 'Elixir'],
    volumeOptions: [{ size: '60ml', price: 230 }]
  },
  {
    id: '6',
    name: 'Layton',
    brand: 'Parfums de Marly',
    price: 310.0,
    image: 'https://picsum.photos/400/500?random=6',
    rating: 4.8,
    reviews: 156,
    description: 'A seductive oriental-floral fragrance with an intense olfactory signature.',
    tags: ['Unisex', 'Niche'],
    volumeOptions: [
      { size: '75ml', price: 220 },
      { size: '125ml', price: 310 }
    ]
  }
]

export const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'Maison Francis Kurkdjian', status: 'Active', productsCount: 28, lastUpdated: 'Oct 24, 2023' },
  { id: '2', name: 'Roja Parfums', status: 'Active', productsCount: 15, lastUpdated: 'Oct 22, 2023' },
  { id: '3', name: 'Tom Ford', status: 'Review', productsCount: 42, lastUpdated: 'Oct 20, 2023' },
  { id: '4', name: 'Xerjoff', status: 'Active', productsCount: 31, lastUpdated: 'Oct 18, 2023' }
]

export const MOCK_USER: User = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  birthYear: '1993',
  gender: 'Female',
  joinDate: '2021',
  role: 'VIP'
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    user: 'Sarah Jenkins',
    rating: 5,
    comment: 'The fragrance is incredible, lasting well over 12 hours on my skin.',
    date: '2 days ago'
  },
  {
    id: '2',
    user: 'Michael Chen',
    rating: 4,
    comment: 'Great scent, very unique. However, for the price point, I expected better packaging.',
    date: '1 week ago'
  }
]
