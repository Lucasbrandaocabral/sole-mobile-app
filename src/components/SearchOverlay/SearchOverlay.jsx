import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowLeft, TrendingUp } from 'lucide-react'
import s from './SearchOverlay.module.css'

const popular = ['Nike Air Max', 'Jordan Retro XI', 'New Balance 990', 'Yeezy 700', 'Salomon XT-6']

export default function SearchOverlay({ query, onSearch, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [])

  function submit(val) {
    onSearch(val)
    onClose()
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <motion.div
      className={s.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={s.sheet}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={s.handle} />

        <div className={s.header}>
          <button className={s.back} onClick={onClose}>
            <ArrowLeft size={22} />
          </button>
          <div className={s.inputWrap}>
            <Search size={16} className={s.searchIcon} />
            <input
              ref={inputRef}
              className={s.input}
              placeholder="Tênis, marcas..."
              value={query}
              onChange={e => onSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit(query)}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  className={s.clear}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => onSearch('')}
                >
                  <X size={15} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          {query && (
            <button className={s.searchBtn} onClick={() => submit(query)}>
              Ver
            </button>
          )}
        </div>

        <div className={s.body}>
          {!query ? (
            <>
              <p className={s.section}>Em alta</p>
              {popular.map(term => (
                <button key={term} className={s.item} onClick={() => submit(term)}>
                  <TrendingUp size={16} className={s.itemIcon} />
                  <span>{term}</span>
                </button>
              ))}
            </>
          ) : (
            <button className={s.item} onClick={() => submit(query)}>
              <Search size={16} className={s.itemIcon} />
              <span>Buscar por "<strong>{query}</strong>"</span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
