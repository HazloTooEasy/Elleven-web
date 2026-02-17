import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { 
    label: 'Servicios', 
    href: '#servicios',
    submenu: [
      { label: 'Seguridad Física', href: '#seguridad-fisica' },
      { label: 'Seguridad Digital', href: '#seguridad-digital' }
    ]
  },
  { label: 'Desokupaciones', href: '#desokupaciones' },
  { label: 'Prevención', href: '#prevencion' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Contacto', href: '#contacto' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }
      );

      gsap.fromTo(navRef.current?.querySelectorAll('.nav-item') || [],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo(contactRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out', delay: 0.4 }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <a 
              href="#inicio" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}
              className="block"
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span className="text-white">ELEVEN</span>
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="nav-item relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-sm font-medium text-white/80 hover:text-[#00d4ff] transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00d4ff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </a>

                {/* Submenu */}
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(subItem.href); }}
                        className="block px-4 py-3 text-sm text-white/80 hover:text-[#00d4ff] hover:bg-white/5 transition-all duration-200"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & Social */}
          <div ref={contactRef} className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm">
              <a href="tel:608294503" className="flex items-center space-x-2 text-white/70 hover:text-[#00d4ff] transition-colors">
                <Phone className="w-4 h-4" />
                <span>608 29 45 03</span>
              </a>
              <a href="mailto:info@elevenseguridad.com" className="flex items-center space-x-2 text-white/70 hover:text-[#00d4ff] transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden xl:inline">info@elevenseguridad.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#00d4ff] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/34633827979" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#00d4ff] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="block text-lg font-medium text-white/80 hover:text-[#00d4ff] transition-colors py-2"
                >
                  {item.label}
                </a>
                {item.submenu && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(subItem.href); }}
                        className="block text-sm text-white/60 hover:text-[#00d4ff] transition-colors py-1"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a href="tel:608294503" className="flex items-center space-x-2 text-white/70">
                <Phone className="w-5 h-5" />
                <span>608 29 45 03</span>
              </a>
              <a href="mailto:info@elevenseguridad.com" className="flex items-center space-x-2 text-white/70">
                <Mail className="w-5 h-5" />
                <span>info@elevenseguridad.com</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
