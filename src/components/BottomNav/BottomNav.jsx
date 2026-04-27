import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import s from './BottomNav.module.css'

const tabs = [
  { id: 'home', icon: Home, label: 'Início' },
  { id: 'search', icon: Search, label: 'Buscar' },
  { id: 'cart', icon: ShoppingBag, label: 'Sacola' },
  { id: 'wishlist', icon: Heart, label: 'Favoritos' },
  { id: 'account', icon: User, label: 'Conta' },
]

export default function BottomNav({ active, onTabChange, onCartOpen }) {
  const { count } = useCart()

  function handleTap(id) {
    if (id === 'cart') {
      onCartOpen()
      return
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    onTabChange(id)
  }

  return (
    <nav className={s.nav}>
      {tabs.map(({ id, icon: Icon, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            className={`${s.tab} ${isActive ? s.active : ''}`}
            onClick={() => handleTap(id)}
          >
            <motion.span
              className={s.iconWrap}
              animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {id === 'cart' && count > 0 && (
                <AnimatePresence>
                  <motion.span
                    className={s.badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                </AnimatePresence>
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            </motion.span>
            <span className={s.label}>{label}</span>
            {isActive && (
              <motion.div
                className={s.dot}
                layoutId="bnav-dot"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
