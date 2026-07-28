import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cms } from '@/cms';
import { formatCOP, whatsappLink } from '@/lib/format';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();
  const site = cms.getSiteConfig();

  const orderMessage = () => {
    const lines = items.map(
      (i) => `• ${i.quantity} × ${i.product.name} — ${formatCOP(i.product.price * i.quantity)}`,
    );
    return `¡Hola, Doctora Canela! Quiero hacer un pedido:\n\n${lines.join('\n')}\n\nTotal: ${formatCOP(totalPrice)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-[rgba(6,42,69,0.40)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            key="panel"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Carrito de compras"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
              <h2 className="font-display font-black text-xl text-[var(--brand)] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Tu carrito
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[var(--brand-sky)] transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5 text-[var(--brand)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--brand-sky)] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-[var(--brand)]" />
                  </div>
                  <p className="font-display font-bold text-lg text-[var(--brand-ink)]">
                    Tu carrito está vacío
                  </p>
                  <p className="text-sm text-[rgba(6,42,69,0.60)] max-w-[240px]">
                    Explora la tienda y consiente a tu mascota con algo especial.
                  </p>
                  <a
                    href="#/tienda"
                    onClick={closeCart}
                    className="btn-ink rounded-full border-2 border-[var(--brand)] px-6 py-2.5 text-sm font-extrabold text-[var(--brand)]"
                  >
                    Ir a la tienda
                  </a>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.product.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 p-3 rounded-2xl bg-[var(--brand-mist)]"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover bg-white"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[var(--brand-ink)] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-[rgba(6,42,69,0.60)]">
                            {item.product.category}
                          </p>
                          <p className="font-extrabold text-[var(--brand)] mt-1">
                            {formatCOP(item.product.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-[var(--brand-sky)] transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3.5 h-3.5 text-[var(--brand)]" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-[var(--brand-sky)] transition-colors disabled:opacity-40"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5 text-[var(--brand)]" />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.slug)}
                              className="ml-auto p-1.5 rounded-full hover:bg-red-50 transition-colors"
                              aria-label={`Eliminar ${item.product.name}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--border)] px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[rgba(6,42,69,0.70)]">Subtotal</span>
                  <span className="font-display font-black text-2xl text-[var(--brand)]">
                    {formatCOP(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-[rgba(6,42,69,0.50)]">
                  El pago se coordina directamente con la clínica. Pronto habrá pagos en línea.
                </p>
                <a
                  href={whatsappLink(site.phoneIntl, orderMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink-light flex items-center justify-center gap-2 w-full rounded-full bg-[var(--brand)] border-2 border-[var(--brand)] px-6 py-3.5 font-extrabold text-white"
                >
                  Finalizar pedido por WhatsApp
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
