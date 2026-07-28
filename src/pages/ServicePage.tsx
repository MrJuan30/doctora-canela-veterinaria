import { useLayoutEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import { cms } from '@/cms';
import { FAQ } from '@/components/FAQ';
import NotFound from '@/pages/NotFound';
import { PawOutline, Sparkle } from '@/components/decorations';
import { whatsappLink } from '@/lib/format';

gsap.registerPlugin(ScrollTrigger);

export default function ServicePage() {
  const { slug } = useParams();
  const service = slug ? cms.getService(slug) : undefined;
  const site = cms.getSiteConfig();
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sp-hero-img',
        { scale: 1.15 },
        { scale: 1, duration: 1.6, ease: 'power3.out' },
      );
      gsap.to('.sp-hero-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.sp-hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.sp-title > span', {
        y: 0, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 0.25,
      });
      gsap.utils.toArray<HTMLElement>('.sp-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>('.sp-feature').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -28 },
          {
            opacity: 1, x: 0, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        );
      });
    }, root);
    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, [service, slug]);

  if (!service) return <NotFound />;

  return (
    <div ref={root}>
      {/* hero del servicio */}
      <section className="sp-hero relative h-[70svh] min-h-[460px] overflow-hidden bg-[var(--brand-deep)]">
        <img
          src={service.image}
          alt={service.name}
          className="sp-hero-img absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-deep)] via-[rgba(0,50,92,0.55)] to-[rgba(0,50,92,0.35)]" />
        <Sparkle className="absolute right-[10%] top-[28%] w-10 h-10 text-white/50 animate-floaty" />
        <PawOutline className="absolute left-[7%] bottom-[18%] w-24 h-24 text-white/20 animate-floaty-slow" />

        <div className="relative z-10 h-full mx-auto max-w-6xl px-5 md:px-8 flex flex-col justify-end pb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors mb-6 w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-white/75">
            Servicios Doctora Canela
          </p>
          <h1 className="mt-3 font-display font-black text-white text-[clamp(2.4rem,7vw,5rem)] leading-[1.03]">
            <span className="mask-line sp-title"><span>{service.name}</span></span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85 font-semibold">{service.tagline}</p>
        </div>
      </section>

      {/* descripción + características */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="sp-reveal text-xs font-extrabold uppercase tracking-[0.3em] text-[rgba(0,72,131,0.70)]">
              Sobre este servicio
            </p>
            {service.description.map((paragraph, i) => (
              <p
                key={i}
                className="sp-reveal mt-5 text-lg text-[rgba(6,42,69,0.75)] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5">
            <div className="sp-reveal rounded-[2rem] bg-[var(--brand-mist)] border border-[var(--border)] p-7 md:p-8">
              <h2 className="font-display font-black text-xl text-[var(--brand)]">
                Lo que incluye
              </h2>
              <ul className="mt-5 space-y-3.5">
                {service.features.map((feature) => (
                  <li key={feature} className="sp-feature flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-[var(--brand)] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </span>
                    <span className="font-semibold text-[rgba(6,42,69,0.80)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[var(--brand-mist)]">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="sp-reveal text-xs font-extrabold uppercase tracking-[0.3em] text-[rgba(0,72,131,0.70)] text-center">
            Resolvemos tus dudas
          </p>
          <h2 className="sp-reveal mt-3 font-display font-black text-3xl md:text-5xl text-center text-[var(--brand-ink)]">
            Preguntas frecuentes
          </h2>
          <div className="sp-reveal mt-10 rounded-[2rem] bg-white border border-[var(--border)] px-6 md:px-10 py-4">
            <FAQ faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* CTA agendar */}
      <section className="relative py-20 md:py-28 bg-[var(--brand-deep)] overflow-hidden">
        <PawOutline className="absolute -right-10 -bottom-10 w-56 h-56 text-white/5 rotate-12" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-tight">
            ¿Listo para cuidar a tu mejor amigo?
          </h2>
          <p className="mt-5 text-white/75 text-lg">
            Agenda tu cita de {service.shortName.toLowerCase()} hoy mismo. Te confirmamos por WhatsApp.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              onClick={() =>
                setTimeout(
                  () => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }),
                  350,
                )
              }
              className="btn-ink-light rounded-full bg-white text-[var(--brand-deep)] px-8 py-4 font-extrabold inline-flex items-center gap-2"
            >
              Agendar cita <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={whatsappLink(site.phoneIntl, `¡Hola! Quiero información sobre ${service.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/60 text-white px-8 py-4 font-extrabold inline-flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
