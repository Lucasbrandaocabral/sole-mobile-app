import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react'
import s from './Footer.module.css'

const cols = [
  {
    title: 'Produtos',
    links: ['Novidades', 'Lifestyle', 'Running', 'Basketball', 'Trail'],
  },
  {
    title: 'Marcas',
    links: ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Salomon'],
  },
  {
    title: 'Suporte',
    links: ['Sobre nós', 'Contato', 'FAQ', 'Trocas e Devoluções'],
  },
]

const socials = [
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
  { icon: Facebook, href: '#' },
]

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.brand}>
          <span className={s.logo}>
            SOLE<span>.</span>
          </span>
          <p>
            Sneakers premium para quem não abre mão de performance e identidade.
            Curadoria exclusiva das melhores marcas do mundo.
          </p>
          <div className={s.socials}>
            {socials.map(({ icon: Icon, href }) => (
              <a key={href + Icon.name} href={href} aria-label="social">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {cols.map(col => (
          <div key={col.title} className={s.col}>
            <h4>{col.title}</h4>
            {col.links.map(link => (
              <a key={link} href="#products">{link}</a>
            ))}
          </div>
        ))}
      </div>

      <div className={s.bottom}>
        <span>© 2025 SOLE. Todos os direitos reservados.</span>
        <div className={s.policies}>
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
