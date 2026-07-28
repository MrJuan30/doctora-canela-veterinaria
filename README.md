# Clínica Veterinaria Doctora Canela — Sitio Web

Sitio web premium de la **Clínica Veterinaria Doctora Canela** (Kennedy, Bogotá, Colombia).
Una experiencia digital interactiva con estética manga/editorial en azul corporativo `#004883`,
scroll cinematográfico con secciones fijadas, tienda con carrito y agendamiento dinámico de citas.

## Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS 3 + shadcn/ui**
- **GSAP + ScrollTrigger** (secciones fijadas, parallax, reveals con máscara)
- **Framer Motion** (carrito, transiciones de formulario)
- **React Hook Form + Zod** (agendamiento dinámico por servicio)
- **React Router 7** (hash routing, apto para hosting estático)

## Secciones

- **Home**: hero con crossfade cinematográfico, banda de transición manga (huellas, speed lines,
  globos de diálogo), servicios con entrada escalonada, riel horizontal de productos fijado al scroll.
- **Servicios** (`/servicios/:slug`): Urgencias, Cirugías y Spa — cada uno con descripción,
  características, FAQ con acordeón y CTA de agendamiento.
- **Tienda** (`/tienda`): 8 productos con filtros por categoría.
- **Producto** (`/producto/:slug`): galería, características, stock, selector de cantidad y relacionados.
- **Carrito**: drawer con cantidades, eliminación, subtotal y checkout por WhatsApp
  (estructura lista para pasarela de pagos).
- **Agendamiento**: formulario que cambia según el servicio (Vacunación / Cirugía / Spa),
  validado con Zod y enviado como mensaje de WhatsApp.

## Arquitectura CMS-ready (DICAM)

Todo el contenido se consume a través de `src/cms/`:

```
src/cms/
  types.ts   → contratos (SiteConfig, Service, Product, CMSProvider…)
  data.ts    → proveedor local de contenido
  index.ts   → instancia activa: `export const cms = localProvider`
```

Para conectar **DICAM CMS** basta con crear un `DicamProvider` que implemente la interfaz
`CMSProvider` y cambiar la instancia exportada en `src/cms/index.ts`.
Ningún componente necesita modificarse.

## Desarrollo

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción en dist/
```

### Imágenes (`public/images/`)

Al hacer `npm install`, el script `postinstall` (`scripts/download-images.mjs`)
descarga automáticamente las 15 imágenes del sitio a `public/images/` usando el
manifiesto `assets-images.json`.

> ⚠️ Las URLs firmadas del manifiesto tienen vigencia de ~6 días desde la
> publicación del repo. Si al clonar tiempo después alguna imagen falla,
> el build funciona igual, pero deberás copiar las imágenes manualmente a
> `public/images/` (o pedir que se regenere el manifiesto).

## Datos de la clínica

- **Dirección**: Cra. 72k #40-05, Kennedy, Bogotá
- **Teléfono / WhatsApp**: 318 947 1374
- **Instagram**: [@doctora_canela](https://www.instagram.com/doctora_canela/)
- **Calificación Google**: 5.0 ★

## SEO

- Metadatos y Open Graph en `index.html`
- Schema.org `VeterinaryCare` (JSON-LD) con dirección, horario y rating
- `public/robots.txt` y `public/sitemap.xml`

---

© Clínica Veterinaria Doctora Canela · “Tu me cuidas. Yo te cuido.”
