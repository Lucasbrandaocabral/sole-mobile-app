import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import s from './ProductCard.module.css'

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart()
  const { isLiked, toggle } = useWishlist()
  const liked = isLiked(product.id)
  const [shine, setShine] = useState({ x: 50, y: 50 })

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 280, damping: 22 })
  const springY = useSpring(rotY, { stiffness: 280, damping: 22 })

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    rotX.set((ny - 0.5) * -14)
    rotY.set((nx - 0.5) * 14)
    setShine({ x: nx * 100, y: ny * 100 })
  }

  function onMouseLeave() {
    rotX.set(0)
    rotY.set(0)
    setShine({ x: 50, y: 50 })
  }

  return (
    <motion.div
      className={s.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onPointerUp={onMouseLeave}
      onPointerCancel={onMouseLeave}
      style={{ transformPerspective: 900, rotateX: springX, rotateY: springY }}
    >
      <div className={s.imgWrap} onClick={() => onClick(product)}>
        <img src={product.image} alt={product.name} className={s.img} loading="lazy" />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="" className={s.hoverImg} loading="lazy" />
        )}
        <span className={s.tag} style={{ background: product.tagColor }}>
          {product.tag}
        </span>
        {discount && (
          <span className={s.discount}>-{discount}%</span>
        )}
        <button
          className={`${s.like} ${liked ? s.liked : ''}`}
          onClick={e => { e.stopPropagation(); toggle(product.id) }}
        >
          <Heart size={16} fill={liked ? '#ff4d00' : 'none'} />
        </button>
      </div>

      <div className={s.info}>
        <div className={s.topRow}>
          <span className={s.brand}>{product.brand}</span>
          <div className={s.rating}>
            <Star size={11} fill="#ff4d00" color="#ff4d00" />
            <span>{product.rating}</span>
            <span className={s.reviews}>({product.reviews})</span>
          </div>
        </div>

        <h3 className={s.name} onClick={() => onClick(product)}>
          {product.name}
        </h3>

        <div className={s.colors}>
          {product.colors.map((c, i) => (
            <span key={i} className={s.colorDot} style={{ background: c }} />
          ))}
        </div>

        <div className={s.bottom}>
          <div className={s.priceGroup}>
            <span className={s.price}>R$ {product.price.toLocaleString('pt-BR')}</span>
            {product.originalPrice && (
              <span className={s.original}>
                R$ {product.originalPrice.toLocaleString('pt-BR')}
              </span>
            )}
          </div>
          <button className={s.addBtn} onClick={() => addToCart(product, product.sizes[0])}>
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      <div
        className={s.shine}
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.08) 0%, transparent 65%)`,
        }}
      />
    </motion.div>
  )
}
