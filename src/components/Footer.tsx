import { Link } from 'react-router';
import { MapPin, Phone, Instagram, Star, Clock } from 'lucide-react';
import { cms } from '@/cms';
import { whatsappLink } from '@/lib/format';
import { PawOutline } from '@/components/decorations';

export function Footer() {
  const site = cms.getSiteConfig();
  const services = cms.getServices();
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;

  return (
    <footer className="relative bg-[var(--brand-deep)] text-white overflow-hidden">
      <PawOutline className="absolute -top-8 -right-8 w-48 h-48 text-white/5 rotate-12" />
      <PawOutline className="absolute bottom-16 left-[8%] w-24 h-24 text-white/5 -rotate-12" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* marca + contacto */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Logo Doctora Canela"
                className="w-14 h-14 rounded-full ring-2 ring-white/30"
              />
              <div>
                <p className="font-display font-black text-xl leading-tight">Doctora Canela</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Clínica Veterinaria
                </p>
              </div>
            </div>
            <p className="mt-5 font-display text-lg text-white/85">“{site.slogan}”</p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <span className="flex items-center gap-0.5" aria-label={`Calificación ${site.googleRating} de 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-300" fill="currentColor" />
                ))}
              </span>
              <span className="text-sm font-extrabold">{site.googleRating.toFixed(1)}</span>
              <span className="text-xs text-white/60">en Google</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(site.phoneIntl, '¡Hola, Doctora Canela!')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink-light inline-flex items-center gap-2 rounded-full bg-white text-[var(--brand-deep)] px-5 py-2.5 text-sm font-extrabold"
              >
                <Phone className="w-4 h-4" /> {site.phoneDisplay}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-5 py-2.5 text-sm font-extrabold hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>

          {/* servicios + horarios */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.28em] text-white/50">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/servicios/${s.slug}`}
                    className="font-bold text-white/85 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tienda" className="font-bold text-white/85 hover:text-white transition-colors">
                  Tienda para mascotas
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 text-xs font-extrabold uppercase tracking-[0.28em] text-white/50">
              Horarios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-2.5 text-white/80">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                  <span>
                    <strong className="block text-white">{h.days}</strong>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* mapa */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.28em] text-white/50">
              Encuéntranos
            </h3>
            <p className="mt-4 flex items-start gap-2.5 text-white/85">
              <MapPin className="w-5 h-5 shrink-0 text-white/60" />
              <span>
                {site.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </span>
            </p>
            <div className="mt-5 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
              <iframe
                title="Mapa: Clínica Veterinaria Doctora Canela, Kennedy, Bogotá"
                src={mapsSrc}
                className="w-full h-64 md:h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {site.legalName} · Kennedy, Bogotá
          </p>
          <p className="font-display">Tu me cuidas. Yo te cuido.</p>
        </div>
      </div>
    </footer>
  );
}
