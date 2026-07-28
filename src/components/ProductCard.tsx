import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import type { Product } from '@/cms/types';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/format';

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addItem } = useCart();
  const outOfStock = product.stock === 0;

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[rgba(0,72,131,0.40)] hover:shadow-[0_24px_60px_-24px_rgba(0,72,131,0.35)] hover:-translate-y-1.5">
      <Link
        to={`/producto/${product.slug}`}
        className="block relative overflow-hidden bg-[var(--brand-mist)] aspect-square"
        aria-label={`Ver ${product.name}`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[var(--brand)]">
          {product.category}
        </span>
        {outOfStock && (
          <span className="absolute inset-0 bg-white/70 flex items-center justify-center font-display font-black text-[rgba(6,42,69,0.60)]">
            Agotado
          </span>
        )}
      </Link>
      <div className={`flex flex-col flex-1 ${compact ? 'p-4' : 'p-5'}`}>
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-display font-bold text-[var(--brand-ink)] leading-snug group-hover:text-[var(--brand)] transition-colors">
            {product.name}
          </h3>
        </Link>
        {!compact && (
          <p className="mt-1 text-sm text-[rgba(6,42,69,0.60)] line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <span className="font-display font-black text-lg text-[var(--brand)]">
            {formatCOP(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            disabled={outOfStock}
            className="btn-ink inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--brand)] px-4 py-2 text-xs font-extrabold text-[var(--brand)] disabled:opacity-40 disabled:pointer-events-none"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
