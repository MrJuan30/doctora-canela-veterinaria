import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import gsap from 'gsap';
import { ArrowLeft, Check, Minus, Package, Plus, ShoppingBag } from 'lucide-react';
import { cms } from '@/cms';
import { useCart } from '@/context/CartContext';
import { formatCOP } from '@/lib/format';
import { ProductCard } from '@/components/ProductCard';
import NotFound from '@/pages/NotFound';
import { PawOutline } from '@/components/decorations';

export default function ProductPage() {
  const { slug } = useParams();
  const product = slug ? cms.getProduct(slug) : undefined;
  const related = slug ? cms.getRelatedProducts(slug, 4) : [];
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pd-img',
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.pd-info > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 0.15 },
      );
      gsap.fromTo(
        '.pd-related',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 },
      );
    }, root);
    window.scrollTo(0, 0);
    setQuantity(1);
    setActiveImg(0);
    return () => ctx.revert();
  }, [product, slug]);

  if (!product) return <NotFound />;

  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div ref={root} className="pt-24 md:pt-28 pb-24 bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 text-sm font-bold text-[rgba(0,72,131,0.80)] hover:text-[var(--brand)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la tienda
        </Link>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* galería */}
          <div>
            <div className="relative rounded-[2rem] overflow-hidden bg-[var(--brand-mist)] aspect-square border border-[var(--border)]">
              <img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                className="pd-img w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand)]">
                {product.category}
              </span>
              <PawOutline className="absolute bottom-4 right-4 w-12 h-12 text-[rgba(0,72,131,0.20)]" />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-colors ${
                      i === activeImg ? 'border-[var(--brand)]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Ver imagen ${i + 1} de ${product.name}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* información */}
          <div className="pd-info flex flex-col">
            <h1 className="font-display font-black text-3xl md:text-5xl text-[var(--brand-ink)] leading-[1.08]">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-[rgba(6,42,69,0.65)] leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {outOfStock ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 px-4 py-1.5 text-sm font-extrabold">
                  <Package className="w-4 h-4" /> Agotado
                </span>
              ) : lowStock ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-600 px-4 py-1.5 text-sm font-extrabold">
                  <Package className="w-4 h-4" /> ¡Solo quedan {product.stock}!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-600 px-4 py-1.5 text-sm font-extrabold">
                  <Package className="w-4 h-4" /> En stock ({product.stock} disponibles)
                </span>
              )}
            </div>

            <ul className="mt-7 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-[var(--brand-sky)] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-[rgba(6,42,69,0.80)]">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-9">
              <p className="font-display font-black text-4xl text-[var(--brand)]">
                {formatCOP(product.price)}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-full border-2 border-[var(--border)] px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full hover:bg-[var(--brand-sky)] flex items-center justify-center transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4 text-[var(--brand)]" />
                  </button>
                  <span className="w-8 text-center font-extrabold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="w-8 h-8 rounded-full hover:bg-[var(--brand-sky)] flex items-center justify-center transition-colors disabled:opacity-40"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4 text-[var(--brand)]" />
                  </button>
                </div>
                <button
                  onClick={() => addItem(product, quantity)}
                  disabled={outOfStock}
                  className="btn-ink-light inline-flex items-center gap-2 rounded-full bg-[var(--brand)] border-2 border-[var(--brand)] px-8 py-4 font-extrabold text-white disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ShoppingBag className="w-5 h-5" /> Agregar al carrito
                </button>
              </div>
              <p className="mt-4 text-xs text-[rgba(6,42,69,0.50)]">
                Recoge en Cra. 72k #40-05, Kennedy · o coordina entrega por WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* relacionados */}
        {related.length > 0 && (
          <section className="pd-related mt-24">
            <h2 className="font-display font-black text-2xl md:text-4xl text-[var(--brand-ink)]">
              También le puede gustar
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
