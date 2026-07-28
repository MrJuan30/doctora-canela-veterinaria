import type { CMSProvider } from './types';
import { localProvider } from './data';

/**
 * Punto único de acceso al contenido.
 *
 * Hoy resuelve contra el proveedor local. Cuando DICAM CMS esté listo,
 * se reemplaza esta instancia por `new DicamProvider({ apiUrl, token })`
 * y todo el sitio consumirá el CMS sin tocar un solo componente.
 */
export const cms: CMSProvider = localProvider;
