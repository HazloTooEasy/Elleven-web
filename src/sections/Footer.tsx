import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, MessageCircle, Twitter, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Desokupaciones', href: '#desokupaciones' },
  { label: 'Prevención', href: '#prevencion' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Contacto', href: '#contacto' }
];

const legalLinks = [
  { label: 'Aviso legal', href: '#' },
  { label: 'Política de cookies', href: '#' },
  { label: 'Declaración de privacidad', href: '#' }
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo fade in
      const logo = footerRef.current?.querySelector('.footer-logo');
      if (logo) {
        gsap.fromTo(logo,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Social icons elastic
      const socials = footerRef.current?.querySelectorAll('.social-icon');
      if (socials) {
        gsap.fromTo(socials,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Nav links stagger
      const navItems = footerRef.current?.querySelectorAll('.nav-link');
      if (navItems) {
        gsap.fromTo(navItems,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black border-t border-white/10" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 pb-12 border-b border-white/10">
          {/* Logo */}
          <div className="footer-logo mb-8 lg:mb-0">
            <a 
              href="#inicio"
              onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}
            >
              <h2 
                className="text-3xl font-bold text-white"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                ELEVEN
              </h2>
              <p className="text-gray-500 text-sm mt-1">Seguridad y Protección</p>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://instagram.com/elevenseguridad"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 hover:scale-110 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/34633827979"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 hover:scale-110 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/elevenseguridad"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 hover:scale-110 transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="nav-link text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00d4ff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-gray-500">
          <a href="tel:608294503" className="flex items-center space-x-2 hover:text-[#00d4ff] transition-colors">
            <Phone className="w-4 h-4" />
            <span>608 29 45 03</span>
          </a>
          <a href="mailto:info@elevenseguridad.com" className="flex items-center space-x-2 hover:text-[#00d4ff] transition-colors">
            <Mail className="w-4 h-4" />
            <span>info@elevenseguridad.com</span>
          </a>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>España</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            Copyright © 2025 Eleven Seguridad y Protección
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-[#00d4ff] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
