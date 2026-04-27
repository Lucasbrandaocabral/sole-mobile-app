import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Heart, ShoppingBag, Truck, RotateCcw, Shield, ArrowLeft } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import s from './ProductModal.module.css'

const perks = [
  { icon: Truck, text: 'Frete grátis acima de R$ 500' },
  { icon: RotateCcw, text: 'Devolução em 30 dias' },
  { icon: Shield, text: 'Pagamento 100% seguro' },
]

const mockReviews = [
  { id: 1, name: 'Carlos M.', rating: 5, date: 'Jan 2025', text: 'Produto incrível! Muito confortável e o design é exatamente como nas fotos. Chegou antes do prazo.' },
  { id: 2, name: 'Ana P.', rating: 4, date: 'Fev 2025', text: 'Ótimo custo-benefício. Entrega rápida e embalagem muito cuidadosa. Recomendo!' },
  { id: 3, name: 'Rafael S.', rating: 5, date: 'Mar 2025', text: 'Superou minhas expectativas. Qualidade premium, vale cada centavo.' },
  { id: 4, name: 'Julia F.', rating: 3, date: 'Abr 2025', text: 'Bom produto, mas o tamanho veste um pouco largo. Recomendo pedir um número menor.' },
  { id: 5, name: 'Marcos T.', rating: 5, date: 'Abr 2025', text: 'Chegou antes do prazo e o produto é de altíssima qualidade. Já é o segundo par!' },
]

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  const { isLiked, toggle } = useWishlist()
  const liked = isLiked(product.id)
  const [imgIdx, setImgIdx] = useState(0)
  const [size, setSize] = useState(product.sizes[0] ?? null)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState('details')

  const gallery = product.gallery || [product.image]
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const isMobile = window.innerWidth <= 768

  function prev() {
    setImgIdx(i => (i - 1 + gallery.length) % gallery.length)
  }
  function next() {
    setImgIdx(i => (i + 1) % gallery.length)
  }

  function handleAdd() {
    if (!size) return
    addToCart(product, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <AnimatePresence>
      <motion.div
        className={s.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={s.modal}
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Mobile header */}
          <div className={s.mobileHeader}>
            <button className={s.backBtn} onClick={onClose}>
              <ArrowLeft size={22} />
            </button>
            <span className={s.mobileTitle}>{product.name}</span>
            <button
              className={`${s.mobileWish} ${liked ? s.wishLiked : ''}`}
              onClick={() => toggle(product.id)}
            >
              <Heart size={20} fill={liked ? '#ff4d00' : 'none'} />
            </button>
          </div>

          {/* Desktop close */}
          <button className={s.close} onClick={onClose}>
            <X size={20} />
          </button>

          <div className={s.grid}>
            {/* Gallery */}
            <div className={s.gallery}>
              <motion.div
                className={s.mainImg}
                drag={gallery.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) next()
                  else if (info.offset.x > 50) prev()
                }}
                style={{ touchAction: 'pan-y' }}
              >
                <img src={gallery[imgIdx]} alt={product.name} draggable={false} />
                {discount && <span className={s.discountFloat}>-{discount}%</span>}
                {gallery.length > 1 && (
                  <div className={s.dots}>
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        className={`${s.dot} ${i === imgIdx ? s.dotActive : ''}`}
                        onClick={e => { e.stopPropagation(); setImgIdx(i) }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              <div className={s.thumbs}>
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`${s.thumb} ${i === imgIdx ? s.thumbActive : ''}`}
                    onClick={() => setImgIdx(i)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            </div>

            {/* Details column */}
            <div className={s.details}>
              {/* Tab bar */}
              <div className={s.tabBar}>
                <button
                  className={`${s.tabBtn} ${tab === 'details' ? s.tabActive : ''}`}
                  onClick={() => setTab('details')}
                >
                  Detalhes
                </button>
                <button
                  className={`${s.tabBtn} ${tab === 'reviews' ? s.tabActive : ''}`}
                  onClick={() => setTab('reviews')}
                >
                  Avaliações ({product.reviews})
                </button>
              </div>

              {/* Details tab */}
              {tab === 'details' && (
                <div className={s.tabContent}>
                  <div className={s.topInfo}>
                    <span className={s.brand}>{product.brand}</span>
                    <span className={s.tag} style={{ background: product.tagColor }}>
                      {product.tag}
                    </span>
                  </div>

                  <h2 className={s.name}>{product.name}</h2>

                  <div className={s.ratingRow}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.rating) ? '#ff4d00' : 'none'}
                        color="#ff4d00"
                      />
                    ))}
                    <span className={s.ratingNum}>{product.rating}</span>
                    <span className={s.reviewsCount}>({product.reviews} avaliações)</span>
                  </div>

                  <div className={s.priceRow}>
                    <span className={s.price}>R$ {product.price.toLocaleString('pt-BR')}</span>
                    {product.originalPrice && (
                      <span className={s.original}>
                        R$ {product.originalPrice.toLocaleString('pt-BR')}
                      </span>
                    )}
                    {discount && <span className={s.discountBadge}>-{discount}%</span>}
                  </div>

                  <p className={s.desc}>{product.description}</p>

                  <div className={s.colorSection}>
                    <span className={s.sectionLabel}>Cores disponíveis</span>
                    <div className={s.colors}>
                      {product.colors.map((c, i) => (
                        <span key={i} className={s.colorDot} style={{ background: c }} />
                      ))}
                    </div>
                  </div>

                  <div className={s.sizeSection}>
                    <span className={s.sectionLabel}>
                      Tamanho: <strong>{size || '—'}</strong>
                    </span>
                    <div className={s.sizes}>
                      {product.sizes.map(sz => (
                        <button
                          key={sz}
                          className={`${s.sizeBtn} ${size === sz ? s.sizeActive : ''}`}
                          onClick={() => setSize(sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={s.actions}>
                    <button
                      className={`${s.addBtn} ${!size ? s.addDisabled : ''} ${added ? s.addAdded : ''}`}
                      onClick={handleAdd}
                    >
                      <ShoppingBag size={18} />
                      {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                    </button>
                    <button
                      className={`${s.wishBtn} ${liked ? s.wishLiked : ''}`}
                      onClick={() => toggle(product.id)}
                    >
                      <Heart size={20} fill={liked ? '#ff4d00' : 'none'} />
                    </button>
                  </div>

                  <div className={s.perks}>
                    {perks.map(({ icon: Icon, text }) => (
                      <div key={text} className={s.perk}>
                        <Icon size={15} />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews tab */}
              {tab === 'reviews' && (
                <div className={s.tabContent}>
                  <div className={s.reviewSummary}>
                    <span className={s.bigRatingNum}>{product.rating}</span>
                    <div className={s.bigRatingRight}>
                      <div className={s.bigStars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill={i < Math.floor(product.rating) ? '#ff4d00' : 'none'}
                            color="#ff4d00"
                          />
                        ))}
                      </div>
                      <span className={s.totalReviews}>{product.reviews} avaliações verificadas</span>
                    </div>
                  </div>

                  <div className={s.reviewList}>
                    {mockReviews.map(r => (
                      <div key={r.id} className={s.reviewCard}>
                        <div className={s.reviewHeader}>
                          <div className={s.reviewAvatar}>{r.name[0]}</div>
                          <div className={s.reviewMeta}>
                            <span className={s.reviewName}>{r.name}</span>
                            <span className={s.reviewDate}>{r.date}</span>
                          </div>
                          <div className={s.reviewStars}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                fill={i < r.rating ? '#ff4d00' : 'none'}
                                color="#ff4d00"
                              />
                            ))}
                          </div>
                        </div>
                        <p className={s.reviewText}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile bottom action bar */}
          <div className={s.mobileBar}>
            <div className={s.mobileBarPrice}>
              {product.originalPrice && (
                <span className={s.mobileOriginalPrice}>
                  R$ {product.originalPrice.toLocaleString('pt-BR')}
                </span>
              )}
              <span className={s.mobileFinalPrice}>
                R$ {product.price.toLocaleString('pt-BR')}
              </span>
            </div>
            <button
              className={`${s.mobileAddBtn} ${!size ? s.addDisabled : ''} ${added ? s.addAdded : ''}`}
              onClick={handleAdd}
            >
              <ShoppingBag size={18} />
              {added ? 'Adicionado!' : 'Adicionar'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
