import { brands } from '../../data/products'
import s from './BrandsBanner.module.css'

export default function BrandsBanner() {
  const doubled = [...brands, ...brands]

  return (
    <div className={s.wrap}>
      <div className={s.track}>
        {doubled.map((brand, i) => (
          <span key={i} className={s.item}>
            {brand}
            <span className={s.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
