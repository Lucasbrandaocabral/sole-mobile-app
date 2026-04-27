import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import s from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [['200+', 'Modelos'], ['50+', 'Marcas'], ['10K+', 'Clientes']]

export default function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 250])
  const contentY = useTransform(scrollY, [0, 700], [0, -60])
  const rawOpacity = useTransform(scrollY, [0, 550], [1, 0])
  const opacity = useSpring(rawOpacity, { damping: 30, stiffness: 100 })

  return (
    <section className={s.hero} ref={ref}>
      <div className={s.bg}>
        <motion.img
          src="https://imgnike-a.akamaihd.net/1920x1920/022147IKA9.jpg"
          alt=""
          className={s.bgImg}
          style={{ y }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 14, ease: 'easeOut' }}
        />
        <div className={s.overlay} />
      </div>

      <div className={s.grain} />

      <motion.div className={s.content} style={{ y: contentY, opacity }}>
        <motion.span className={s.eyebrow} {...fadeUp(0.2)}>
          Nova Coleção · 2025
        </motion.span>

        <motion.h1 className={s.title} {...fadeUp(0.35)}>
          Defina seu<br />
          <span>estilo.</span>
        </motion.h1>

        <motion.p className={s.sub} {...fadeUp(0.5)}>
          Sneakers premium para quem não abre<br />
          mão de performance e identidade.
        </motion.p>

        <motion.div className={s.ctas} {...fadeUp(0.65)}>
          <a href="#products" className={s.btnPrimary}>Ver Coleção</a>
          <a href="#featured" className={s.btnSecondary}>Destaques</a>
        </motion.div>

        <motion.div className={s.stats} {...fadeUp(0.8)}>
          {stats.map(([num, label]) => (
            <div key={label} className={s.stat}>
              <span className={s.statNum}>{num}</span>
              <span className={s.statLabel}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={s.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className={s.scrollLine} />
        <span>scroll</span>
      </motion.div>
    </section>
  )
}
