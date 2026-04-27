import { useEffect, useRef } from 'react'
import s from './Cursor.module.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const move = (e) => {
      dot.style.setProperty('--cx', `${e.clientX}px`)
      dot.style.setProperty('--cy', `${e.clientY}px`)
      ring.style.setProperty('--rx', `${e.clientX}px`)
      ring.style.setProperty('--ry', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dotRef} className={s.dot} />
      <div ref={ringRef} className={s.ring} />
    </>
  )
}
