import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cms } from '@/cms';
import { BookingSection } from '@/components/BookingSection';
import { ProductCard } from '@/components/ProductCard';
import { RevealText } from '@/components/RevealText';
import {
  PawOutline,
  PawPrint,
  SketchCat,
  SketchDog,
  Sparkle,
  SpeechBubble,
} from '@/components/decorations';
import { formatCOP } from '@/lib/format';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = ['/images/hero-1.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg'];

const SERVICE_SKETCHES = {
  urgencias: PawPrint,
  cirugias: SketchDog,
  spa: SketchCat,
} as const;

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const services = cms.getServices();
  const products = cms.getProducts();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ============ DESKTOP: experiencia de scroll fijada ============ */
      mm.add('(min-width: 1024px)', () => {
        /* ---- HERO: entrada inmediata + crossfade y reveals con scroll ---- */
        gsap.to('.hero-line-early > span', {
          y: 0, stagger: 0.18, duration: 1.2, ease: 'power4.out', delay: 0.35,
        });
        gsap.to('.hero-sub', {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        });
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-scene',
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 1,
          },
        });
        heroTl
          .to('.hero-img-1', { opacity: 0, scale: 1.08, duration: 2, ease: 'none' }, 1.5)
          .to('.hero-img-2', { opacity: 1, duration: 2, ease: 'none' }, 1.5)
          .to('.hero-img-2', { opacity: 0, scale: 1.08, duration: 2, ease: 'none' }, 4)
          .to('.hero-img-3', { opacity: 1, duration: 2, ease: 'none' }, 4)
          .to('.hero-line-late > span', { y: 0, stagger: 0.55, duration: 1.4, ease: 'power4.out' }, 1.2)
          .to('.hero-ctas', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 3.6)
          .to('.hero-cue', { opacity: 0, duration: 0.5 }, 1)
          .to('.hero-deco-left', { y: -80, rotate: -14, duration: 5, ease: 'none' }, 0)
          .to('.hero-deco-right', { y: -140, rotate: 18, duration: 5, ease: 'none' }, 0);

        /* ---- Banda manga: huellas se dibujan, líneas de velocidad barren ---- */
        const bandTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.manga-band',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        bandTl
          .fromTo('.band-paw', { opacity: 0, scale: 0.3, rotate: -30 }, { opacity: 1, scale: 1, rotate: 0, stagger: 0.35, duration: 1, ease: 'back.out(2.5)' }, 0)
          .fromTo('.band-speed', { xPercent: -30, opacity: 0 }, { xPercent: 30, opacity: 1, duration: 3, ease: 'none' }, 0)
          .fromTo('.band-dog', { x: -120, rotate: -8 }, { x: 120, rotate: 6, duration: 4, ease: 'none' }, 0)
          .fromTo('.band-cat', { x: 140, rotate: 10 }, { x: -140, rotate: -6, duration: 4, ease: 'none' }, 0)
          .fromTo('.band-bubble', { scale: 0, rotate: -12 }, { scale: 1, rotate: 3, duration: 1.2, ease: 'back.out(2)' }, 1.6);

        /* ---- SERVICIOS: sección fijada, tarjetas entran por turnos ---- */
        const svcTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.services-scene',
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1,
          },
        });
        svcTl
          .to('.svc-title-line > span', { y: 0, stagger: 0.3, duration: 1, ease: 'power4.out' }, 0)
          .fromTo('.svc-card-0', { xPercent: -130, rotate: -6 }, { xPercent: 0, rotate: 0, duration: 1.6, ease: 'power3.out' }, 1)
          .fromTo('.svc-card-1', { yPercent: 130, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.6, ease: 'power3.out' }, 2.2)
          .fromTo('.svc-card-2', { xPercent: 130, rotate: 6 }, { xPercent: 0, rotate: 0, duration: 1.6, ease: 'power3.out' }, 3.4)
          .fromTo('.svc-card-0 img', { yPercent: -10 }, { yPercent: 10, duration: 4, ease: 'none' }, 1)
          .fromTo('.svc-card-1 img', { yPercent: -10 }, { yPercent: 10, duration: 4, ease: 'none' }, 1.5)
          .fromTo('.svc-card-2 img', { yPercent: -10 }, { yPercent: 10, duration: 4, ease: 'none' }, 2)
          .to('.svc-sparkle', { rotate: 180, scale: 1.3, duration: 4.6, ease: 'none' }, 0);

        /* ---- TIENDA: riel horizontal fijado ---- */
        const rail = document.querySelector<HTMLElement>('.store-rail');
        const railDist = rail ? Math.max(rail.scrollWidth - window.innerWidth + 120, 0) : 0;
        gsap.to('.store-rail', {
          x: -railDist,
          ease: 'none',
          scrollTrigger: {
            trigger: '.store-scene',
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      /* ============ MÓVIL: reveals suaves sin fijar ============ */
      mm.add('(max-width: 1023px)', () => {
        gsap.to('.hero-line-early > span, .hero-line-late > span', {
          y: 0, stagger: 0.15, duration: 1, ease: 'power4.out', delay: 0.2,
        });
        gsap.to('.hero-sub, .hero-ctas', {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, delay: 0.8, ease: 'power3.out',
        });
        // crossfade por tiempo en móvil (sensación de video)
        const fade = gsap.timeline({ repeat: -1 });
        fade
          .to('.hero-img-1', { opacity: 0, duration: 1.2 }, '+=3')
          .to('.hero-img-2', { opacity: 1, duration: 1.2 }, '<')
          .to('.hero-img-2', { opacity: 0, duration: 1.2 }, '+=3')
          .to('.hero-img-3', { opacity: 1, duration: 1.2 }, '<')
          .to('.hero-img-3', { opacity: 0, duration: 1.2 }, '+=3')
          .to('.hero-img-1', { opacity: 1, duration: 1.2 }, '<');

        gsap.utils.toArray<HTMLElement>('.svc-card-mobile').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            });
        });
        gsap.fromTo('.band-paw',
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1, scale: 1, stagger: 0.12, ease: 'back.out(2)',
            scrollTrigger: { trigger: '.manga-band', start: 'top 80%' },
          });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 1200);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root}>
      {/* ================= HERO ================= */}
      <section className="hero-scene relative h-[100svh] overflow-hidden bg-[var(--brand-deep)]" aria-label="Bienvenida">
        {/* stack de imágenes tipo video */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`hero-img-${i + 1} absolute inset-0 w-full h-full object-cover ${
                i === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: 'kenburns 14s ease-out forwards' }}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="absolute inset-0 bg-[rgba(0,50,92,0.30)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,50,92,0.70)] via-[rgba(0,50,92,0.45)] to-[rgba(0,50,92,0.80)]" />
        </div>

        {/* decoración flotante */}
        <PawOutline className="hero-deco-left absolute left-[6%] top-[22%] w-20 h-20 md:w-28 md:h-28 text-white/25" />
        <Sparkle className="hero-deco-right absolute right-[8%] top-[30%] w-10 h-10 text-white/40" />
        <PawPrint className="hero-deco-right absolute right-[14%] bottom-[24%] w-14 h-14 text-white/20" />

        {/* contenido */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
          <p className="hero-sub opacity-0 translate-y-6 text-xs md:text-sm font-extrabold uppercase tracking-[0.4em] text-white/80 mb-6">
            Clínica Veterinaria · Kennedy, Bogotá
          </p>
          <h1 className="font-display font-black text-white leading-[1.08] text-[clamp(2rem,6vw,4.6rem)] max-w-5xl">
            <span className="mask-line hero-line-early"><span>Ellos no hablan.</span></span>
            <span className="mask-line hero-line-early"><span>Pero cuando vuelven felices,</span></span>
            <span className="mask-line hero-line-late"><span className="text-outline-white">sabes que estuvieron</span></span>
            <span className="mask-line hero-line-late"><span>en las mejores manos.</span></span>
          </h1>
          <div className="hero-ctas opacity-0 translate-y-8 mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#agendar"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ink-light rounded-full bg-white text-[var(--brand-deep)] px-8 py-4 font-extrabold text-base shadow-xl"
            >
              Agendar cita
            </a>
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border-2 border-white/70 text-white px-8 py-4 font-extrabold text-base hover:bg-white/10 transition-colors"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* indicador de scroll */}
        <div className="hero-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">Desliza</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* ================= BANDA MANGA ================= */}
      <section className="manga-band relative py-24 md:py-36 bg-white overflow-hidden" aria-hidden="true">
        <div className="band-speed speed-lines absolute inset-y-0 -left-1/4 w-[150%] opacity-0" />
        <div className="relative mx-auto max-w-6xl px-5 flex items-center justify-between gap-6">
          <SketchDog className="band-dog w-24 md:w-40 text-[var(--brand)] shrink-0" />
          <div className="flex items-center gap-4 md:gap-10">
            {[0, 1, 2, 3].map((i) => (
              <PawPrint
                key={i}
                className={`band-paw text-[rgba(0,72,131,0.70)] ${i % 2 ? 'rotate-12 translate-y-3' : '-rotate-6'} w-8 md:w-14`}
              />
            ))}
          </div>
          <div className="relative shrink-0">
            <SpeechBubble className="band-bubble w-40 md:w-56 text-[var(--brand)]">
              <span className="font-display font-black text-[var(--brand)] text-lg md:text-2xl">¡Guau!</span>
            </SpeechBubble>
            <SketchCat className="band-cat absolute -bottom-16 md:-bottom-24 -right-2 w-24 md:w-36 text-[var(--brand)]" />
          </div>
        </div>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section id="servicios" className="services-scene relative bg-[var(--brand-mist)] overflow-hidden">
        <div className="halftone-bg absolute inset-0 opacity-30 pointer-events-none" />
        <div className="relative min-h-[100svh] flex flex-col justify-center py-20 md:py-0 mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[rgba(0,72,131,0.70)] flex items-center gap-2">
                <Sparkle className="svc-sparkle w-4 h-4 text-[var(--brand)]" /> Lo que hacemos con amor
              </p>
              <h2 className="mt-3 font-display font-black text-4xl md:text-6xl text-[var(--brand-ink)] leading-[1.05]">
                <span className="mask-line svc-title-line"><span>Nuestros</span></span>
                <span className="mask-line svc-title-line"><span className="text-outline">Servicios</span></span>
              </h2>
            </div>
            <p className="hidden md:block max-w-xs text-sm text-[rgba(6,42,69,0.60)] leading-relaxed pb-2">
              Tres formas de cuidar a tu mejor amigo, cada una con su propia página y todo el detalle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => {
              const Sketch = SERVICE_SKETCHES[service.icon];
              return (
                <Link
                  key={service.slug}
                  to={`/servicios/${service.slug}`}
                  className={`svc-card-${i} svc-card-mobile group relative rounded-[2rem] bg-white border border-[var(--border)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_36px_80px_-32px_rgba(0,72,131,0.45)]`}
                >
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,50,92,0.45)] to-transparent" />
                    <Sketch className="absolute bottom-4 right-4 w-12 h-12 text-white/90 animate-breathe" />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="font-display font-black text-2xl text-[var(--brand-ink)] group-hover:text-[var(--brand)] transition-colors">
                      {service.shortName}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[var(--brand)]">{service.tagline}</p>
                    <p className="mt-3 text-sm text-[rgba(6,42,69,0.65)] leading-relaxed line-clamp-3">
                      {service.description[0]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--brand)]">
                      Conocer más
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TIENDA ================= */}
      <section className="store-scene relative bg-white overflow-hidden">
        <div className="relative min-h-[100svh] flex flex-col justify-center py-20 md:py-0">
          <div className="mx-auto max-w-7xl w-full px-5 md:px-8 mb-10 md:mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[rgba(0,72,131,0.70)]">
                Tienda Doctora Canela
              </p>
              <RevealText
                lines={['Todo para consentirlos']}
                className="mt-3 font-display font-black text-4xl md:text-6xl text-[var(--brand-ink)] leading-[1.05]"
              />
            </div>
            <Link
              to="/tienda"
              className="btn-ink hidden md:inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand)] px-6 py-3 font-extrabold text-[var(--brand)] shrink-0"
            >
              Ver toda la tienda <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* riel horizontal (desktop: fijado / móvil: scroll nativo) */}
          <div className="store-rail flex gap-6 px-5 md:px-8 md:w-max overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none">
            {products.map((p) => (
              <div key={p.slug} className="w-[75vw] sm:w-[46vw] md:w-[330px] shrink-0 snap-start">
                <ProductCard product={p} compact />
              </div>
            ))}
            <div className="w-[60vw] md:w-[300px] shrink-0 flex items-center justify-center">
              <Link
                to="/tienda"
                className="group flex flex-col items-center gap-4 text-center"
              >
                <span className="w-24 h-24 rounded-full border-2 border-dashed border-[rgba(0,72,131,0.50)] flex items-center justify-center group-hover:bg-[var(--brand-sky)] transition-colors">
                  <ArrowRight className="w-8 h-8 text-[var(--brand)] transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-display font-bold text-[var(--brand)]">
                  Ver los {products.length} productos
                </span>
                <span className="text-xs text-[rgba(6,42,69,0.50)]">
                  desde {formatCOP(Math.min(...products.map((p) => p.price)))}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AGENDAMIENTO ================= */}
      <BookingSection />
    </div>
  );
}
