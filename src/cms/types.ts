/**
 * Tipos del contenido del sitio.
 *
 * Estas interfaces definen el contrato que luego implementará DICAM CMS.
 * El sitio nunca consume datos hardcodeados en los componentes: todo pasa
 * por el proveedor de contenido (ver cms/index.ts), de modo que cambiar
 * la fuente local por la API de DICAM solo requiere reemplazar el provider.
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  slogan: string;
  phoneDisplay: string;
  phoneIntl: string; // formato wa.me, sin '+'
  address: string;
  addressLines: string[];
  city: string;
  instagram: string;
  googleRating: number;
  googleReviews: number;
  hours: { days: string; time: string }[];
  mapsQuery: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string[];
  features: string[];
  image: string;
  /** ilustración manga para la tarjeta */
  icon: 'urgencias' | 'cirugias' | 'spa';
  faqs: ServiceFAQ[];
}

export type ProductCategory =
  | 'Camas y descanso'
  | 'Higiene y hogar'
  | 'Juguetes'
  | 'Paseo y viaje'
  | 'Alimentación';

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // COP
  stock: number;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[];
}

export interface BookingServiceOption {
  id: 'vacunacion' | 'cirugia' | 'spa';
  label: string;
  description: string;
}

/** Contrato que implementará DICAM CMS en producción. */
export interface CMSProvider {
  getSiteConfig(): SiteConfig;
  getServices(): Service[];
  getService(slug: string): Service | undefined;
  getProducts(): Product[];
  getProduct(slug: string): Product | undefined;
  getRelatedProducts(slug: string, count: number): Product[];
  getBookingOptions(): BookingServiceOption[];
}
