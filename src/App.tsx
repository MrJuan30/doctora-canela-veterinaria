import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import Home from '@/pages/Home';
import ServicePage from '@/pages/ServicePage';
import StorePage from '@/pages/StorePage';
import ProductPage from '@/pages/ProductPage';
import NotFound from '@/pages/NotFound';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios/:slug" element={<ServicePage />} />
          <Route path="/tienda" element={<StorePage />} />
          <Route path="/producto/:slug" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
