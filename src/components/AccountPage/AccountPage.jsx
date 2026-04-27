import { motion } from 'framer-motion'
import { ArrowLeft, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import s from './AccountPage.module.css'

const menuItems = [
  { icon: Package, label: 'Meus Pedidos', sub: '3 pedidos ativos' },
  { icon: MapPin, label: 'Endereços', sub: 'Gerenciar endereços' },
  { icon: CreditCard, label: 'Pagamentos', sub: 'Cartões e métodos' },
  { icon: Settings, label: 'Configurações', sub: 'Preferências do app' },
]

export default function AccountPage({ onClose }) {
  const { liked } = useWishlist()

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
        <h2 className={s.title}>Minha Conta</h2>
      </div>

      <div className={s.body}>
        <div className={s.profile}>
          <div className={s.avatar}>L</div>
          <div className={s.profileInfo}>
            <span className={s.name}>Lucas Brandão</span>
            <span className={s.email}>lucasbrandao@sole.com</span>
          </div>
        </div>

        <div className={s.stats}>
          <div className={s.stat}>
            <span className={s.statNum}>3</span>
            <span className={s.statLabel}>Pedidos</span>
          </div>
          <div className={s.statDivider} />
          <div className={s.stat}>
            <span className={s.statNum}>{liked.size}</span>
            <span className={s.statLabel}>Favoritos</span>
          </div>
          <div className={s.statDivider} />
          <div className={s.stat}>
            <span className={s.statNum}>5</span>
            <span className={s.statLabel}>Avaliações</span>
          </div>
        </div>

        <div className={s.menu}>
          {menuItems.map(({ icon: Icon, label, sub }) => (
            <button key={label} className={s.menuItem}>
              <div className={s.menuIcon}>
                <Icon size={18} />
              </div>
              <div className={s.menuText}>
                <span className={s.menuLabel}>{label}</span>
                <span className={s.menuSub}>{sub}</span>
              </div>
              <ChevronRight size={18} className={s.chevron} />
            </button>
          ))}
        </div>

        <button className={s.logout}>
          <LogOut size={18} />
          <span>Sair da conta</span>
        </button>
      </div>
    </motion.div>
  )
}
