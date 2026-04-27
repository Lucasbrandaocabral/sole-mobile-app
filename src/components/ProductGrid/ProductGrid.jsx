import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { products, categories } from '../../data/products'
import ProductCard from '../ProductCard/ProductCard'
import s from './ProductGrid.module.css'

const sortOptions = [
  { value: 'default', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliado' },
]

export default function ProductGrid({ onProductClick, search }) {
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('default')

  const filtered = products
    .filter(p => cat === 'all' || p.category === cat)
    .filter(p => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.includes(q)
      )
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <section id="products" className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={s.title}>Coleção</h2>
            <p className={s.sub}>{filtered.length} produtos encontrados</p>
          </motion.div>
        </div>

        <div className={s.toolbar}>
          <div className={s.categories}>
            {categories.map(c => (
              <button
                key={c.id}
                className={`${s.catBtn} ${cat === c.id ? s.catActive : ''}`}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className={s.sortWrap}>
            <SlidersHorizontal size={16} color="var(--text2)" />
            <div className={s.selectWrap}>
              <select
                className={s.sort}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className={s.selectArrow} />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={s.empty}>
            <p>Nenhum produto encontrado para <strong>"{search}"</strong></p>
          </div>
        ) : (
          <div className={s.grid}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
