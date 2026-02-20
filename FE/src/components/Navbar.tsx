import { ShoppingBag, Search, User as UserIcon } from 'lucide-react'
import { ViewState, type User } from '../types'

interface NavbarProps {
  onNavigate: (view: ViewState) => void
  currentView: ViewState
  user: User | null
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, user }) => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700 h-20 px-6 flex items-center justify-between'>
      {/* Logo */}
      <div className='flex items-center gap-2 cursor-pointer' onClick={() => onNavigate(ViewState.STOREFRONT)}>
        <div className='w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-lg'>
          P
        </div>
        <span className='text-xl font-bold tracking-wide text-white'>
          PERFUME<span className='text-primary'>HUB</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex items-center gap-8'>
        <button
          onClick={() => onNavigate(ViewState.STOREFRONT)}
          className={`text-sm font-medium transition-colors ${currentView === ViewState.STOREFRONT ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
        >
          Home
        </button>
        <button className='text-sm font-medium text-slate-400 hover:text-white transition-colors'>Brands</button>
        <button className='text-sm font-medium text-slate-400 hover:text-white transition-colors'>New Arrivals</button>
        {user && (
          <button
            onClick={() => onNavigate(ViewState.PROFILE)}
            className={`text-sm font-medium transition-colors ${currentView === ViewState.PROFILE ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
          >
            Account
          </button>
        )}
        {user?.role === 'VIP' && ( // Simulating Admin Access
          <button
            onClick={() => onNavigate(ViewState.ADMIN_DASHBOARD)}
            className='text-sm font-medium text-accent hover:text-yellow-300 transition-colors'
          >
            Admin Panel
          </button>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center gap-4'>
        <div className='relative hidden sm:block'>
          <input
            type='text'
            placeholder='Search fragrances...'
            className='bg-dark-800 border border-dark-700 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-primary w-64 transition-all'
          />
          <Search className='absolute right-3 top-2.5 w-4 h-4 text-slate-400' />
        </div>

        <button className='p-2 text-slate-400 hover:text-white transition-colors relative'>
          <ShoppingBag className='w-5 h-5' />
          <span className='absolute top-1 right-1 w-2 h-2 bg-primary rounded-full'></span>
        </button>

        <button
          onClick={() => (user ? onNavigate(ViewState.PROFILE) : onNavigate(ViewState.AUTH))}
          className='p-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center w-9 h-9 bg-dark-800 rounded-full border border-dark-700'
        >
          {user ? (
            <span className='text-xs font-bold text-white'>
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          ) : (
            <UserIcon className='w-4 h-4' />
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
