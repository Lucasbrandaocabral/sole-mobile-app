import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun, Search, ShoppingBag, X, Menu } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import s from './Navbar.module.css'

const links = ['Novidades', 'Coleções', 'Brands', 'Sale']

export default function Navbar({ theme, onThemeToggle, onCartOpen, onSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { count } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleSearch(val) {
    setQuery(val)
    onSearch(val)
  }

  return (
    <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
      <div className={s.inner}>
        <a href="#" className={s.logo}>
          SOLE<span>.</span>
        </a>

        <ul className={s.links}>
          {links.map(l => (
            <li key={l}>
              <a href="#products">{l}</a>
            </li>
          ))}
        </ul>

        <div className={s.actions}>
          <button
            className={s.iconBtn}
            aria-label="Toggle theme"
            onClick={onThemeToggle}
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className={`${s.iconBtn} ${s.desktopOnly}`}
            aria-label="Buscar"
            onClick={() => setSearchOpen(v => !v)}
          >
            <Search size={20} />
          </button>

          <button
            className={`${s.iconBtn} ${s.desktopOnly}`}
            aria-label="Carrinho"
            onClick={onCartOpen}
          >
            <ShoppingBag size={20} />
            {count > 0 && <span className={s.badge}>{count}</span>}
          </button>

          <button
            className={`${s.iconBtn} ${s.burger}`}
            aria-label="Menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className={s.searchBar}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Search size={18} className={s.searchIcon} />
            <input
              autoFocus
              placeholder="Buscar tênis, marcas..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
            />
            {query && (
              <button onClick={() => handleSearch('')}>
                <X size={16} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={s.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {links.map(l => (
              <a key={l} href="#products" onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
