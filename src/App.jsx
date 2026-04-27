import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import BrandsBanner from './components/BrandsBanner/BrandsBanner'
import Featured from './components/Featured/Featured'
import ProductGrid from './components/ProductGrid/ProductGrid'
import ProductModal from './components/ProductModal/ProductModal'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import BottomNav from './components/BottomNav/BottomNav'
import SearchOverlay from './components/SearchOverlay/SearchOverlay'
import WishlistPage from './components/WishlistPage/WishlistPage'
import AccountPage from './components/AccountPage/AccountPage'
import { WishlistProvider } from './context/WishlistContext'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [searchOpen, setSearchOpen] = useState(false)

  function toggleTheme() {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '')
      return next
    })
  }

  function handleTabChange(tab) {
    setActiveTab(tab)
    if (tab === 'search') setSearchOpen(true)
  }

  function closeSearch() {
    setSearchOpen(false)
    setActiveTab('home')
  }

  return (
    <WishlistProvider>
    <CartProvider>
      <Cursor />

      <Navbar
        theme={theme}
        onThemeToggle={toggleTheme}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearch}
      />

      <main>
        <Hero />
        <BrandsBanner />
        <Featured />
        <ProductGrid onProductClick={setSelectedProduct} search={search} />
      </main>

      <Footer />

      <BottomNav
        active={activeTab}
        onTabChange={handleTabChange}
        onCartOpen={() => setCartOpen(true)}
      />

      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            query={search}
            onSearch={setSearch}
            onClose={closeSearch}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <Cart onClose={() => setCartOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeTab === 'wishlist' && (
          <WishlistPage
            key="wishlist"
            onClose={() => setActiveTab('home')}
            onProductClick={setSelectedProduct}
          />
        )}
        {activeTab === 'account' && (
          <AccountPage
            key="account"
            onClose={() => setActiveTab('home')}
          />
        )}
      </AnimatePresence>
    </CartProvider>
    </WishlistProvider>
  )
}
