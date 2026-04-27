import { motion } from 'framer-motion'
import { ArrowLeft, Heart } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { products } from '../../data/products'
import ProductCard from '../ProductCard/ProductCard'
import s from './WishlistPage.module.css'

export default function WishlistPage({ onClose, onProductClick }) {
  const { isLiked } = useWishlist()
  const likedProducts = products.filter(p => isLiked(p.id))

  return (
    <motion.div
      className={s.page}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
    >
      <div className={s.header}>
        <button className={s.back} onClick={onClose}>
          <ArrowLeft size={22} />
        </button>
        <h2 className={s.title}>Favoritos</h2>
        {likedProducts.length > 0 && (
          <span className={s.count}>{likedProducts.length}</span>
        )}
      </div>

      <div className={s.body}>
        {likedProducts.length === 0 ? (
          <div className={s.empty}>
            <Heart size={52} strokeWidth={1} color="var(--text2)" />
            <p>Nenhum favorito ainda</p>
            <span>Toque no coração de qualquer produto para salvar aqui</span>
            <button className={s.shopBtn} onClick={onClose}>
              Explorar Coleção
            </button>
          </div>
        ) : (
          <div className={s.grid}>
            {likedProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
