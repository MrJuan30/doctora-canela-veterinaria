import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Revelado de texto con máscara: cada línea entra desde abajo
 * dentro de un contenedor con overflow oculto, sincronizado con el scroll.
 */
export function RevealText({
  lines,
  className = '',
  lineClassName = '',
  as: Tag = 'h2',
  scrub = false,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  scrub?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const spans = ref.current?.querySelectorAll('.mask-line > span');
      if (!spans?.length) return;
      gsap.to(spans, {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay,
        ...(scrub
          ? {
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                end: 'top 35%',
                scrub: 1,
              },
            }
          : {
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }),
      });
    }, ref);
    return () => ctx.revert();
  }, [lines, scrub, delay]);

  const HeadingTag = Tag as 'h2';

  return (
    <div ref={ref}>
      <HeadingTag className={className}>
        {lines.map((line, i) => (
          <span className="mask-line" key={i}>
            <span className={lineClassName}>{line}</span>
          </span>
        ))}
      </HeadingTag>
    </div>
  );
}
