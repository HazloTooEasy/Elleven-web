import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './sections/Header';
import Hero from './sections/Hero';
import ContactForm from './sections/ContactForm';
import ProteccionIntegral from './sections/ProteccionIntegral';
import ServiciosSeguridad from './sections/ServiciosSeguridad';
import ServiciosJuridicos from './sections/ServiciosJuridicos';
import AmpliaExperiencia from './sections/AmpliaExperiencia';
import Prevencion from './sections/Prevencion';
import Testimonials from './sections/Testimonials';
import Cobertura from './sections/Cobertura';
import FAQ from './sections/FAQ';
import Desokupaciones from './sections/Desokupaciones';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Header scroll effect
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: 'header' }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <ContactForm />
        <ProteccionIntegral />
        <ServiciosSeguridad />
        <ServiciosJuridicos />
        <AmpliaExperiencia />
        <Prevencion />
        <Desokupaciones />
        <Testimonials />
        <Cobertura />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
