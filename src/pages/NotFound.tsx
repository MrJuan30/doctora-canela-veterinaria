import { Link } from 'react-router';
import { SketchDog, SketchCat } from '@/components/decorations';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--brand-mist)] flex flex-col items-center justify-center text-center px-5 pt-20">
      <div className="flex items-end gap-6">
        <SketchDog className="w-28 text-[var(--brand)] animate-floaty" />
        <SketchCat className="w-32 text-[var(--brand)] animate-floaty-slow" />
      </div>
      <h1 className="mt-8 font-display font-black text-6xl md:text-8xl text-outline">404</h1>
      <p className="mt-4 font-display font-bold text-xl text-[var(--brand-ink)]">
        Esta página se escapó del consultorio
      </p>
      <p className="mt-2 text-[rgba(6,42,69,0.60)] max-w-sm">
        No encontramos lo que buscabas, pero tu mascota sí puede encontrar todo lo que necesita.
      </p>
      <Link
        to="/"
        className="btn-ink mt-8 rounded-full border-2 border-[var(--brand)] px-8 py-3.5 font-extrabold text-[var(--brand)]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
