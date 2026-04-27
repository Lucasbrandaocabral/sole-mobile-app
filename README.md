# SOLE — Premium Sneaker Store

> App mobile de sneakers com experiência nativa, construído com React + Capacitor.

---

## Visão Geral

SOLE é um e-commerce de tênis premium com interface totalmente focada em mobile. Cada interação foi pensada para parecer um app nativo — animações fluidas, gestos de toque, navegação por abas e transições de página.

<!-- ADICIONAR GIF DO APP RODANDO AQUI -->

---

## Funcionalidades

### Navegação por Abas
Bottom navigation com 5 abas: Home, Busca, Sacola, Favoritos e Conta. Indicador animado com spring physics ao trocar de aba.

<!-- GIF da navegação -->

### Catálogo de Produtos
Grid responsivo de 2 colunas com efeito 3D tilt ao passar o mouse, imagem de hover alternativa e badge de desconto. Quick-add direto pelo botão de sacola.

<!-- GIF do grid -->

### Modal de Produto
Página full-screen com slide animado do bottom. Galeria de fotos navegável por swipe ou miniaturas. Duas abas:
- **Detalhes** — tamanho, cores, preço com desconto, adicionar ao carrinho
- **Avaliações** — rating geral com estrelas e lista de reviews de clientes

<!-- GIF do modal -->

### Sacola
Bottom sheet animado com lista de itens, controle de quantidade, resumo de preço e botão de finalizar.

<!-- GIF do carrinho -->

### Favoritos
Aba dedicada com grid de produtos curtidos. Estado global persistido durante a sessão — coração em qualquer card, modal ou botão atualiza a lista instantaneamente.

<!-- GIF dos favoritos -->

### Busca
Overlay com campo de busca e filtro em tempo real sobre o catálogo de produtos.

### Conta
Página de perfil com estatísticas (pedidos, favoritos, avaliações) e menu de configurações.

### Tema Dark / Light
Alternância de tema via Navbar com variáveis CSS.

---

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + CSS Modules |
| Animações | Framer Motion |
| Ícones | Lucide React |
| Build | Vite 5 |
| Mobile | Capacitor 8 (Android) |

---

## Estrutura

```
src/
├── components/
│   ├── Hero/            # Banner principal
│   ├── BrandsBanner/    # Carrossel de marcas
│   ├── Featured/        # Produtos em destaque
│   ├── ProductGrid/     # Grid do catálogo
│   ├── ProductCard/     # Card individual com tilt 3D
│   ├── ProductModal/    # Página de produto (swipe + tabs)
│   ├── Cart/            # Sacola (bottom sheet)
│   ├── BottomNav/       # Navegação por abas
│   ├── SearchOverlay/   # Busca fullscreen
│   ├── WishlistPage/    # Página de favoritos
│   └── AccountPage/     # Perfil do usuário
├── context/
│   ├── CartContext.jsx
│   └── WishlistContext.jsx
└── data/
    └── products.js
```

---

Made by [Lucas Brandão](https://github.com/Lucasbrandaocabral)
