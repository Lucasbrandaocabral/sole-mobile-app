import { motion } from 'framer-motion'
import s from './Featured.module.css'

const cards = [
  {
    img: 'https://imgnike-a.akamaihd.net/1920x1920/022147NYA9.jpg',
    eyebrow: 'LIMITED DROP',
    title: 'Tênis Nike Air Max Plus Masculino\nExclusivo 2025',
    big: true,
  },
  {
    img: 'https://imgnike-a.akamaihd.net/360x360/058467IEA1.jpg',
    eyebrow: 'RARO',
    title: 'Nike Air Max 95 Big Bubble',
    big: false,
  },
  {
    img: 'https://imgnike-a.akamaihd.net/360x360/105746IKA3.jpg',
    eyebrow: 'NOVO',
    title: 'Nike Shox R4',
    big: false,
  },
]

export default function Featured() {
  const [big, ...small] = cards

  return (
    <section id="featured" className={s.section}>
      <div className={s.container}>
        <motion.div
          className={s.card}
          style={{ backgroundImage: `url(${big.img})` }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={s.overlay} />
          <div className={s.cardContent}>
            <span className={s.eyebrow}>{big.eyebrow}</span>
            <h3>{big.title.replace('\n', '\n')}</h3>
            <a href="#products" className={s.link}>Shop Now →</a>
          </div>
        </motion.div>

        <div className={s.stack}>
          {small.map((card, i) => (
            <motion.div
              key={card.title}
              className={`${s.card} ${s.cardSm}`}
              style={{ backgroundImage: `url(${card.img})` }}
              initial={{ opacity: 0, y: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
            >
              <div className={s.overlay} />
              <div className={s.cardContent}>
                <span className={s.eyebrow}>{card.eyebrow}</span>
                <h3>{card.title}</h3>
                <a href="#products" className={s.link}>Ver →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
