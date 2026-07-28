import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cms } from '@/cms';
import { whatsappLink } from '@/lib/format';

export function WhatsAppFloat() {
  const site = cms.getSiteConfig();
  return (
    <motion.a
      href={whatsappLink(site.phoneIntl, '¡Hola, Doctora Canela! Quiero más información.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3.5 shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] font-extrabold text-sm"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircle className="w-5 h-5" fill="currentColor" />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
