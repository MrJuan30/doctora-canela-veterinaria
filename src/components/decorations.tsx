/**
 * Ilustraciones decorativas dibujadas a mano en SVG.
 * Estilo: trazo irregular tipo manga, azul corporativo.
 */

export function PawPrint({
  className = '',
  strokeWidth = 7,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        {/* almohadilla principal */}
        <path
          d="M50 52 C 38 52 30 63 31 74 C 32 84 41 88 50 87 C 59 88 68 84 69 74 C 70 63 62 52 50 52 Z"
          fill="currentColor"
          stroke="none"
        />
        {/* dedos */}
        <ellipse cx="22" cy="42" rx="9" ry="12" transform="rotate(-18 22 42)" fill="currentColor" stroke="none" />
        <ellipse cx="41" cy="28" rx="9" ry="13" transform="rotate(-6 41 28)" fill="currentColor" stroke="none" />
        <ellipse cx="61" cy="28" rx="9" ry="13" transform="rotate(6 61 28)" fill="currentColor" stroke="none" />
        <ellipse cx="79" cy="42" rx="9" ry="12" transform="rotate(18 79 42)" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function PawOutline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <path d="M50 54 C 39 54 32 64 33 74 C 34 83 42 86 50 85 C 58 86 66 83 67 74 C 68 64 61 54 50 54 Z" />
        <ellipse cx="23" cy="43" rx="8" ry="11" transform="rotate(-18 23 43)" />
        <ellipse cx="41" cy="30" rx="8" ry="12" transform="rotate(-6 41 30)" />
        <ellipse cx="61" cy="30" rx="8" ry="12" transform="rotate(6 61 30)" />
        <ellipse cx="78" cy="43" rx="8" ry="11" transform="rotate(18 78 43)" />
      </g>
    </svg>
  );
}

/** Líneas de velocidad tipo manga que irradian desde un punto */
export function SpeedLines({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="100" y1="10" x2="100" y2="45" />
        <line x1="145" y1="22" x2="130" y2="52" />
        <line x1="178" y1="55" x2="148" y2="70" />
        <line x1="190" y1="100" x2="155" y2="100" />
        <line x1="178" y1="145" x2="148" y2="130" />
        <line x1="145" y1="178" x2="130" y2="148" />
        <line x1="55" y1="22" x2="70" y2="52" />
        <line x1="22" y1="55" x2="52" y2="70" />
        <line x1="10" y1="100" x2="45" y2="100" />
        <line x1="22" y1="145" x2="52" y2="130" />
        <line x1="55" y1="178" x2="70" y2="148" />
      </g>
    </svg>
  );
}

/** Globo de diálogo manga */
export function SpeechBubble({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 220 130" fill="none" className="w-full h-auto" aria-hidden="true">
        <path
          d="M18 12 C 8 12 6 22 6 32 L 6 78 C 6 90 14 96 26 96 L 60 96 L 52 122 L 84 96 L 194 96 C 208 96 214 88 214 76 L 214 30 C 214 18 206 12 194 12 Z"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pb-3 px-6">
        {children}
      </div>
    </div>
  );
}

/** Perro sentado, trazo a mano alzada */
export function SketchDog({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* orejas */}
        <path d="M38 30 C 30 14 44 8 48 20" />
        <path d="M82 30 C 90 14 76 8 72 20" />
        {/* cabeza */}
        <path d="M38 32 C 34 48 40 62 60 63 C 80 62 86 48 82 32 C 78 22 68 18 60 18 C 52 18 42 22 38 32 Z" />
        {/* hocico */}
        <path d="M50 46 C 50 52 54 56 60 56 C 66 56 70 52 70 46" />
        <path d="M57 44 C 57 41 63 41 63 44 C 63 47 57 47 57 44 Z" fill="currentColor" />
        {/* ojos */}
        <circle cx="48" cy="36" r="2.4" fill="currentColor" />
        <circle cx="72" cy="36" r="2.4" fill="currentColor" />
        {/* cuerpo sentado */}
        <path d="M40 66 C 32 84 30 108 36 124 L 84 124 C 90 108 88 84 80 66" />
        {/* patas delanteras */}
        <path d="M50 124 L 50 100" />
        <path d="M70 124 L 70 100" />
        {/* cola */}
        <path d="M86 112 C 98 108 102 96 96 90" />
      </g>
    </svg>
  );
}

/** Gato dormido, trazo a mano alzada */
export function SketchCat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 110" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* orejas */}
        <path d="M44 26 L 38 8 L 56 18" />
        <path d="M84 26 L 90 8 L 72 18" />
        {/* cabeza */}
        <path d="M40 30 C 36 48 44 60 64 60 C 84 60 92 48 88 30 C 84 20 74 16 64 16 C 54 16 44 20 40 30 Z" />
        {/* ojos cerrados */}
        <path d="M48 38 C 51 41 55 41 58 38" />
        <path d="M70 38 C 73 41 77 41 80 38" />
        {/* nariz y bigotes */}
        <path d="M61 46 C 61 44 67 44 67 46 C 67 49 61 49 61 46 Z" fill="currentColor" />
        <path d="M40 46 L 24 42 M40 50 L 25 52" />
        <path d="M88 46 L 104 42 M88 50 L 103 52" />
        {/* cuerpo acurrucado */}
        <path d="M36 64 C 22 74 20 92 34 98 C 58 106 96 104 112 94 C 122 86 118 72 104 66" />
        {/* cola envolvente */}
        <path d="M112 92 C 128 96 132 82 124 76" />
        {/* zzz */}
        <path d="M100 20 l 8 -8 M100 12 h 8 l -8 8 h 8" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Cruz médica dibujada a mano */
export function SketchCross({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M22 6 L 38 6 L 38 22 L 54 22 L 54 38 L 38 38 L 38 54 L 22 54 L 22 38 L 6 38 L 6 22 L 22 22 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Estrella de brillo Y2K */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 2 C 21 12 26 18 38 20 C 26 22 21 28 20 38 C 19 28 14 22 2 20 C 14 18 19 12 20 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
