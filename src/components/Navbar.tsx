import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cms } from '@/cms';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios/urgencias', label: 'Urgencias' },
  { to: '/servicios/cirugias', label: 'Cirugías' },
  { to: '/servicios/spa', label: 'Spa' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/#agendar', label: 'Agendar', hash: true },
];

function FlipLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span className="nav-flip">
      <span className="nav-flip-inner">
        <span className="leading-[1.25em]">{text}</span>
        <span className={`leading-[1.25em] ${light ? 'text-white' : 'text-[var(--brand)]'}`}>
          {text}
        </span>
      </span>
    </span>
  );
}

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const site = cms.getSiteConfig();

  const darkHero = location.pathname === '/' || location.pathname.startsWith('/servicios');
  const overDark = darkHero && !scrolled && !mobileOpen;
  const linkColor = overDark ? 'text-white/85' : 'text-[rgba(6,42,69,0.80)]';
  const activeColor = overDark ? 'text-white' : 'text-[var(--brand)]';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const goToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.hash = '#/';
      setTimeout(() => {
        document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,72,131,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Logo Clínica Veterinaria Doctora Canela"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-[rgba(0,72,131,0.20)] group-hover:ring-[rgba(0,72,131,0.50)] transition-all duration-300"
            />
            <div className="leading-tight">
              <span
                className={`block font-display font-black text-base md:text-lg transition-colors ${
                  overDark ? 'text-white' : 'text-[var(--brand)]'
                }`}
              >
                Doctora Canela
              </span>
              <span
                className={`hidden md:block text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  overDark ? 'text-white/60' : 'text-[rgba(6,42,69,0.60)]'
                }`}
              >
                Clínica Veterinaria
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) =>
              item.hash ? (
                <a
                  key={item.label}
                  href="/#agendar"
                  onClick={goToBooking}
                  className={`text-sm font-bold transition-colors ${linkColor}`}
                >
                  <FlipLabel text={item.label} light={overDark} />
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors ${
                      isActive ? activeColor : linkColor
                    }`
                  }
                >
                  <FlipLabel text={item.label} light={overDark} />
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={openCart}
              className={`relative p-2.5 rounded-full transition-colors ${overDark ? 'hover:bg-white/15' : 'hover:bg-[var(--brand-sky)]'}`}
              aria-label={`Abrir carrito, ${totalItems} productos`}
            >
              <ShoppingBag className={`w-5 h-5 transition-colors ${overDark ? 'text-white' : 'text-[var(--brand)]'}`} strokeWidth={2.2} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-[var(--brand)] text-white text-[11px] font-extrabold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <a
              href="/#agendar"
              onClick={goToBooking}
              className={`hidden md:inline-flex items-center rounded-full border-2 px-5 py-2 text-sm font-extrabold transition-colors ${overDark ? 'border-white text-white hover:bg-white hover:text-[var(--brand)]' : 'btn-ink border-[var(--brand)] text-[var(--brand)]'}`}
            >
              Agendar cita
            </a>
            <button
              className={`lg:hidden p-2.5 rounded-full transition-colors ${overDark ? 'hover:bg-white/15' : 'hover:bg-[var(--brand-sky)]'}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-[var(--brand)]" />
              ) : (
                <Menu className={`w-6 h-6 ${overDark ? 'text-white' : 'text-[var(--brand)]'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* menú móvil */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out bg-white/95 backdrop-blur-md ${
          mobileOpen ? 'max-h-96 border-t border-[var(--border)]' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-5 flex flex-col gap-4" aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) =>
            item.hash ? (
              <a
                key={item.label}
                href="/#agendar"
                onClick={goToBooking}
                className="font-display font-bold text-lg text-[var(--brand)]"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className="font-display font-bold text-lg text-[var(--brand-ink)]"
              >
                {item.label}
              </NavLink>
            ),
          )}
          <p className="text-xs text-[rgba(6,42,69,0.50)] pt-2 border-t border-[var(--border)]">
            {site.slogan}
          </p>
        </nav>
      </div>
    </header>
  );
}
