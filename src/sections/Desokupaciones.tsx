import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Home, Clock, Shield, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Desokupaciones() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade up
      gsap.fromTo(contentRef.current?.querySelectorAll('.content-item') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Button elastic entrance
      gsap.fromTo(buttonRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Clock, text: 'Respuesta en 24h' },
    { icon: Shield, text: '100% Legal' },
    { icon: Check, text: 'Sin violencia' }
  ];

  return (
    <section
      id="desokupaciones"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00d4ff]/3 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={contentRef}>
            {/* Icon */}
            <div className="content-item inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 mb-8">
              <Home className="w-10 h-10 text-[#00d4ff]" />
            </div>

            {/* Heading */}
            <h2 
              className="heading-lg mb-6 text-white content-item"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              DESOKUPACIONES
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto content-item">
              Servicio especializado en recuperación de inmuebles ocupados. 
              Gestión legal integral con resultados garantizados.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 content-item">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-gray-400"
                >
                  <feature.icon className="w-5 h-5 text-[#00d4ff]" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Dynamic CTA Button */}
            <a
              ref={buttonRef}
              href="https://desokupaciones.elevenseguridad.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                inline-flex items-center space-x-3 
                px-10 py-5 
                bg-gradient-to-r from-[#00d4ff] to-[#00a8cc]
                text-black font-bold text-lg
                rounded-full
                transform transition-all duration-500
                ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
              `}
              style={{
                boxShadow: isHovered 
                  ? '0 0 60px rgba(0, 212, 255, 0.6), 0 20px 40px rgba(0, 0, 0, 0.4)' 
                  : '0 0 30px rgba(0, 212, 255, 0.3)'
              }}
            >
              <span>Visitar Web de Desokupaciones</span>
              <ExternalLink className={`
                w-6 h-6 
                transform transition-transform duration-300
                ${isHovered ? 'translate-x-1 -translate-y-1' : ''}
              `} />
            </a>

            {/* Subtext */}
            <p className="mt-6 text-gray-500 text-sm content-item">
              Serás redirigido a nuestro portal especializado en desokupaciones
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
