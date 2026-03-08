import useSEO from '../../hooks/useSEO';
import Hero from './Hero';
import ManfaatSection from './ManfaatSection';

export default function Home() {
  useSEO({ title: 'Beranda', description: 'Layanan terapi Totok Punggung tradisional oleh Haji Irawan. Solusi kesehatan autentik untuk stroke, nyeri punggung, dan berbagai penyakit.' });
  return (
    <>
      <Hero />
      <ManfaatSection />
    </>
  );
}

