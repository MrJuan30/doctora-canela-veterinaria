import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cms } from '@/cms';
import { ProductCard } from '@/components/ProductCard';
import type { ProductCategory } from '@/cms/types';
import { PawPrint, Sparkle } from '@/components/decorations';

gsap.registerPlugin(ScrollTrigger);

export default function StorePage() {
  const products = cms.getProducts();
  const root = useRef<HTMLDivElement>(null);
  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );
  const [active, setActive] = useState<string>('Todos');

  const filtered = useMemo(
    () =>
      active === 'Todos'
        ? products
        : products.filter((p) => p.category === (active as ProductCategory)),
    [active, products],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.store-title > span', {
        y: 0, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 0.15,
      });
      gsap.utils.toArray<HTMLElement>('.store-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: (i % 4) * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          },
        );
      });
    }, root);
    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <div ref={root} className="pt-24 md:pt-32 pb-24 bg-[var(--brand-mist)] min-h-screen">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative">
          <PawPrint className="absolute -top-4 right-0 w-14 h-14 text-[rgba(0,72,131,0.15)] rotate-12" />
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[rgba(0,72,131,0.70)] flex items-center gap-2">
            <Sparkle className="w-4 h-4 text-[var(--brand)]" /> Tienda Doctora Canela
          </p>
          <h1 className="mt-3 font-display font-black text-4xl md:text-6xl text-[var(--brand-ink)] leading-[1.05]">
            <span className="mask-line store-title"><span>Todo lo que tu mascota</span></span>
            <span className="mask-line store-title"><span><span className="text-outline">merece</span> y más</span></span>
          </h1>
          <p className="mt-5 max-w-xl text-[rgba(6,42,69,0.65)] leading-relaxed">
            Productos seleccionados por nuestro equipo veterinario. Agrega al carrito y
            finaliza tu pedido por WhatsApp — pronto con pagos en línea.
          </p>
        </div>

        {/* filtros */}
        <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Categorías">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-300 ${
                active === cat
                  ? 'bg-[var(--brand)] text-white shadow-[0_10px_24px_-8px_rgba(0,72,131,0.5)]'
                  : 'bg-white text-[var(--brand)] border-2 border-[var(--border)] hover:border-[rgba(0,72,131,0.50)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grilla */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.slug} className="store-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-[rgba(6,42,69,0.50)]">
          Precios en pesos colombianos · Recoge en la clínica o coordina entrega por WhatsApp
        </p>
      </div>
    </div>
  );
}
