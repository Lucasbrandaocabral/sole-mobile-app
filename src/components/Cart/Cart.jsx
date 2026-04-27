import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import s from './Cart.module.css'

export default function Cart({ onClose }) {
  const { items, removeFromCart, updateQty, total, count } = useCart()

  const shipping = total >= 500 ? 0 : 29.9
  const freeShipLeft = 500 - total
  const mobile = window.innerWidth <= 768

  return (
    <AnimatePresence>
      <motion.div
        className={s.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className={s.cart}
        initial={mobile ? { y: '100%' } : { x: '100%' }}
        animate={mobile ? { y: 0 } : { x: 0 }}
        exit={mobile ? { y: '100%' } : { x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className={s.header}>
          <div>
            <h2 className={s.title}>Carrinho</h2>
            <span className={s.count}>{count} {count === 1 ? 'item' : 'itens'}</span>
          </div>
          <button className={s.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={s.items}>
          {items.length === 0 ? (
            <div className={s.empty}>
              <ShoppingBag size={40} strokeWidth={1} color="var(--text2)" />
              <p>Seu carrinho está vazio</p>
              <button className={s.shopBtn} onClick={onClose}>
                Explorar Coleção
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} className={s.item}>
                <div className={s.itemImg}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={s.itemInfo}>
                  <div className={s.itemTop}>
                    <div>
                      <span className={s.itemBrand}>{item.brand}</span>
                      <p className={s.itemName}>{item.name}</p>
                      <span className={s.itemSize}>Tam. {item.size}</span>
                    </div>
                    <button className={s.removeBtn} onClick={() => removeFromCart(item.key)}>
                      <X size={14} />
                    </button>
                  </div>

                  <div className={s.itemBottom}>
                    <div className={s.qtyCtrl}>
                      <button onClick={() => updateQty(item.key, -1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className={s.itemPrice}>
                      R$ {(item.price * item.qty).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={s.footer}>
            <div className={s.subtotal}>
              <span>Subtotal</span>
              <span>R$ {total.toLocaleString('pt-BR')}</span>
            </div>
            <div className={s.shipping}>
              <span>Frete</span>
              <span className={shipping === 0 ? s.free : ''}>
                {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className={s.divider} />
            <div className={s.total}>
              <span>Total</span>
              <span>R$ {(total + shipping).toLocaleString('pt-BR')}</span>
            </div>
            <button className={s.checkoutBtn}>
              <ShoppingBag size={18} />
              Finalizar Compra
            </button>
            {freeShipLeft > 0 && (
              <p className={s.freeShipHint}>
                Faltam R$ {freeShipLeft.toLocaleString('pt-BR')} para frete grátis
              </p>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
