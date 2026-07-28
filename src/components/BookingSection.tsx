import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeart, Send, Syringe, Scissors, Sparkles } from 'lucide-react';
import { cms } from '@/cms';
import { whatsappLink } from '@/lib/format';
import { RevealText } from '@/components/RevealText';

const baseSchema = z.object({
  ownerName: z.string().min(3, 'Cuéntanos tu nombre'),
  petName: z.string().min(1, '¿Cómo se llama tu mascota?'),
  species: z.enum(['Perro', 'Gato', 'Otro']),
  date: z.string().min(1, 'Elige una fecha'),
  time: z.string().min(1, 'Elige una hora'),
  phone: z.string().min(7, 'Necesitamos un teléfono válido'),
  whatsapp: z.string().min(7, 'Necesitamos un WhatsApp válido'),
  notes: z.string().optional(),
  // campos específicos (opcionales según servicio)
  age: z.string().optional(),
  weight: z.string().optional(),
  reason: z.string().optional(),
  vaccine: z.string().optional(),
  breed: z.string().optional(),
  coatType: z.string().optional(),
  spaService: z.string().optional(),
});

type FormValues = z.infer<typeof baseSchema>;
type ServiceId = 'vacunacion' | 'cirugia' | 'spa';

const SERVICE_ICONS: Record<ServiceId, React.ReactNode> = {
  vacunacion: <Syringe className="w-6 h-6" />,
  cirugia: <Scissors className="w-6 h-6" />,
  spa: <Sparkles className="w-6 h-6" />,
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--brand)] mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1 text-xs font-bold text-red-500">{error}</span>}
    </label>
  );
}

const inputCls =
  'w-full rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-[var(--brand-ink)] font-semibold placeholder:font-normal placeholder:text-[rgba(6,42,69,0.35)] focus:border-[var(--brand)] focus:outline-none transition-colors';

export function BookingSection() {
  const site = cms.getSiteConfig();
  const options = cms.getBookingOptions();
  const [service, setService] = useState<ServiceId>('vacunacion');
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: { species: 'Perro' },
  });

  const serviceLabel = useMemo(
    () => options.find((o) => o.id === service)?.label ?? service,
    [service, options],
  );

  const selectService = (id: ServiceId) => {
    setService(id);
    setSent(false);
  };

  const onSubmit = (values: FormValues) => {
    const lines = [
      `¡Hola, Doctora Canela! Quiero agendar una cita de *${serviceLabel}*.`,
      '',
      `• Propietario: ${values.ownerName}`,
      `• Mascota: ${values.petName} (${values.species})`,
    ];
    if (service === 'cirugia') {
      if (values.age) lines.push(`• Edad: ${values.age}`);
      if (values.weight) lines.push(`• Peso: ${values.weight} kg`);
      if (values.reason) lines.push(`• Motivo: ${values.reason}`);
    }
    if (service === 'vacunacion') {
      if (values.vaccine) lines.push(`• Vacuna: ${values.vaccine}`);
      if (values.age) lines.push(`• Edad: ${values.age}`);
    }
    if (service === 'spa') {
      if (values.breed) lines.push(`• Raza: ${values.breed}`);
      if (values.coatType) lines.push(`• Pelaje: ${values.coatType}`);
      if (values.spaService) lines.push(`• Servicio: ${values.spaService}`);
    }
    lines.push(
      `• Fecha deseada: ${values.date}`,
      `• Hora deseada: ${values.time}`,
      `• Teléfono: ${values.phone}`,
      `• WhatsApp: ${values.whatsapp}`,
    );
    if (values.notes) lines.push(`• Observaciones: ${values.notes}`);
    window.open(whatsappLink(site.phoneIntl, lines.join('\n')), '_blank');
    setSent(true);
    reset({ species: values.species });
  };

  return (
    <section id="agendar" className="relative py-24 md:py-32 bg-[var(--brand-mist)] overflow-hidden">
      <div className="halftone-bg absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[rgba(0,72,131,0.70)]">
            Agenda tu cita
          </p>
          <RevealText
            lines={['El primer paso hacia', 'una colita feliz']}
            className="mt-4 font-display font-black text-4xl md:text-6xl text-[var(--brand-ink)] leading-[1.05]"
          />
          <p className="mt-5 text-[rgba(6,42,69,0.65)] leading-relaxed">
            Elige el servicio y el formulario se adapta a lo que tu mascota necesita.
            Confirmamos tu cita por WhatsApp.
          </p>
        </div>

        {/* selector de servicio */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto" role="tablist" aria-label="Tipo de servicio">
          {options.map((opt) => {
            const active = service === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={active}
                onClick={() => selectService(opt.id as ServiceId)}
                className={`relative rounded-3xl border-2 p-5 text-left transition-all duration-400 ${
                  active
                    ? 'border-[var(--brand)] bg-white shadow-[0_18px_44px_-18px_rgba(0,72,131,0.4)] -translate-y-1'
                    : 'border-transparent bg-white/60 hover:bg-white'
                }`}
              >
                <span
                  className={`inline-flex w-11 h-11 rounded-2xl items-center justify-center mb-3 transition-colors ${
                    active ? 'bg-[var(--brand)] text-white' : 'bg-[var(--brand-sky)] text-[var(--brand)]'
                  }`}
                >
                  {SERVICE_ICONS[opt.id as ServiceId]}
                </span>
                <span className="block font-display font-black text-lg text-[var(--brand-ink)]">
                  {opt.label}
                </span>
                <span className="block mt-1 text-xs text-[rgba(6,42,69,0.60)] leading-snug">
                  {opt.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* formulario dinámico */}
        <div className="mt-10 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.form
              key={service}
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] bg-white border border-[var(--border)] p-6 md:p-10 shadow-[0_30px_80px_-40px_rgba(0,72,131,0.35)]"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Nombre del propietario" error={errors.ownerName?.message}>
                  <input className={inputCls} placeholder="Tu nombre completo" {...register('ownerName')} />
                </Field>
                <Field label="Nombre de la mascota" error={errors.petName?.message}>
                  <input className={inputCls} placeholder="Ej. Canela" {...register('petName')} />
                </Field>
                <Field label="Especie" error={errors.species?.message}>
                  <select className={inputCls} {...register('species')}>
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Otro</option>
                  </select>
                </Field>

                {service === 'vacunacion' && (
                  <>
                    <Field label="Edad de la mascota">
                      <input className={inputCls} placeholder="Ej. 8 meses" {...register('age')} />
                    </Field>
                    <Field label="Vacuna (si la sabes)">
                      <input className={inputCls} placeholder="Ej. Triple felina, rabia…" {...register('vaccine')} />
                    </Field>
                  </>
                )}

                {service === 'cirugia' && (
                  <>
                    <Field label="Edad">
                      <input className={inputCls} placeholder="Ej. 2 años" {...register('age')} />
                    </Field>
                    <Field label="Peso aproximado (kg)">
                      <input className={inputCls} placeholder="Ej. 12" inputMode="decimal" {...register('weight')} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Motivo de la cirugía">
                        <input className={inputCls} placeholder="Ej. Esterilización, masa, hernia…" {...register('reason')} />
                      </Field>
                    </div>
                  </>
                )}

                {service === 'spa' && (
                  <>
                    <Field label="Raza">
                      <input className={inputCls} placeholder="Ej. Poodle, Criollo…" {...register('breed')} />
                    </Field>
                    <Field label="Tipo de pelaje">
                      <select className={inputCls} {...register('coatType')}>
                        <option value="">Selecciona una opción</option>
                        <option>Corto</option>
                        <option>Medio</option>
                        <option>Largo</option>
                        <option>Rizo</option>
                      </select>
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Servicio de spa">
                        <select className={inputCls} {...register('spaService')}>
                          <option value="">Selecciona una opción</option>
                          <option>Baño completo</option>
                          <option>Baño + corte</option>
                          <option>Corte de uñas y limpieza de oídos</option>
                          <option>Deslanado profundo</option>
                        </select>
                      </Field>
                    </div>
                  </>
                )}

                <Field label="Fecha deseada" error={errors.date?.message}>
                  <input type="date" className={inputCls} {...register('date')} />
                </Field>
                <Field label="Hora deseada" error={errors.time?.message}>
                  <input type="time" className={inputCls} {...register('time')} />
                </Field>
                <Field label="Teléfono" error={errors.phone?.message}>
                  <input className={inputCls} placeholder="300 000 0000" inputMode="tel" {...register('phone')} />
                </Field>
                <Field label="WhatsApp" error={errors.whatsapp?.message}>
                  <input className={inputCls} placeholder="300 000 0000" inputMode="tel" {...register('whatsapp')} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Observaciones">
                    <textarea
                      className={`${inputCls} min-h-[100px] resize-y`}
                      placeholder="Algo que debamos saber: comportamiento, medicamentos, alergias…"
                      {...register('notes')}
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="btn-ink-light inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-[var(--brand)] border-2 border-[var(--brand)] px-8 py-4 font-extrabold text-white"
                >
                  <Send className="w-4 h-4" /> Solicitar cita por WhatsApp
                </button>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]"
                  >
                    <CalendarHeart className="w-4 h-4" />
                    Abrimos WhatsApp con tu solicitud lista para enviar.
                  </motion.p>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
