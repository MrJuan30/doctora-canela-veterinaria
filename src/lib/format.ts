export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function whatsappLink(phoneIntl: string, message: string): string {
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;
}
