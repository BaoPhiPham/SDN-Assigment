import { useState } from 'react'
import { ViewState, type Product, type User } from './types'
import { MOCK_USER } from './constants'
import Navbar from './components/Navbar'
import Storefront from './views/Storefront'
import ProductDetail from './views/ProductDetail'
import UserProfile from './views/UserProfile'
import AdminDashboard from './views/AdminDashboard'
import Auth from './views/Auth'

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.STOREFRONT)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [user, setUser] = useState<User | null>(null) // Start as guest (not logged in)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView(ViewState.PRODUCT_DETAIL)
  }

  const navigateTo = (view: ViewState) => {
    setCurrentView(view)
  }

  const handleLogin = () => {
    setUser(MOCK_USER)
    setCurrentView(ViewState.STOREFRONT)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView(ViewState.AUTH)
  }

  const renderContent = () => {
    switch (currentView) {
      case ViewState.AUTH:
        return <Auth onLogin={handleLogin} onBackToHome={() => setCurrentView(ViewState.STOREFRONT)} />
      case ViewState.ADMIN_DASHBOARD:
        return <AdminDashboard onNavigate={navigateTo} />
      case ViewState.PROFILE:
        return <UserProfile user={user!} onLogout={handleLogout} />
      case ViewState.PRODUCT_DETAIL:
        return <ProductDetail product={selectedProduct} onBack={() => setCurrentView(ViewState.STOREFRONT)} />
      case ViewState.STOREFRONT:
      default:
        return <Storefront onProductClick={handleProductClick} />
    }
  }

  // Views that don't need the main navbar
  const noNavbarViews: ViewState[] = [ViewState.AUTH, ViewState.ADMIN_DASHBOARD]

  return (
    <div className='min-h-screen bg-dark-900 text-slate-200 font-sans selection:bg-primary selection:text-white'>
      {!noNavbarViews.includes(currentView) && <Navbar onNavigate={navigateTo} currentView={currentView} user={user} />}
      <main className={noNavbarViews.includes(currentView) ? '' : 'pt-20'}>{renderContent()}</main>
    </div>
  )
}
