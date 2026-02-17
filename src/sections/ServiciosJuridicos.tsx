import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, Gavel, FileText, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const legalServices = [
  {
    icon: Scale,
    title: 'Desahucios',
    description: 'Procedimientos civiles para recuperación de inmuebles'
  },
  {
    icon: Gavel,
    title: 'Defensa Penal',
    description: 'Protección ante denuncias y procedimientos penales'
  },
  {
    icon: FileText,
    title: 'Medidas Cautelares',
    description: 'Protección inmediata del inmueble ocupado'
  },
  {
    icon: Shield,
    title: 'Asesoramiento Legal',
    description: 'Orientación experta en ocupación ilegal'
  }
];

export default function ServiciosJuridicos() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide from left with mask reveal
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content fade in
      gsap.fromTo(contentRef.current?.querySelectorAll('.content-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.legal-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, { y: 30 - self.progress * 60 });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-black" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                alt="Abogados contra okupas"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-4 border border-[#00d4ff]/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#00d4ff]/20 rounded-xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <div className="flex items-center space-x-2 mb-6 content-item">
              <div className="w-8 h-0.5 bg-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
                Servicios Jurídicos
              </span>
            </div>

            <h2 
              className="heading-lg mb-6 text-white content-item"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ABOGADOS CONTRA OKUPAS
            </h2>

            <p className="body-text mb-6 content-item">
              Especializados en desahucios por ocupación ilegal, recuperación inmediata 
              de viviendas y defensa de propietarios. Asesoramiento legal urgente en 
              desalojo de okupas, procedimientos civiles y penales, denuncias, medidas 
              cautelares y protección del inmueble.
            </p>

            <p className="text-gray-400 mb-8 content-item">
              Abogado experto en ocupación ilegal en España. Rápido, eficaz y orientado 
              a resultados. Más de 1.000 propietarios ya confían en Eleven.
            </p>

            <div className="flex items-center space-x-4 content-item">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff]/30 to-[#00d4ff]/10 border-2 border-black flex items-center justify-center"
                  >
                    <span className="text-xs text-[#00d4ff]">★</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-medium">+1.000 casos resueltos</p>
                <p className="text-gray-400 text-sm">Experiencia contrastada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Services Cards */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {legalServices.map((service, index) => (
            <div
              key={index}
              className="legal-card glass-light border border-white/10 rounded-xl p-6 hover:border-[#00d4ff]/30 hover:bg-white/5 transition-all duration-400 group"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#00d4ff]/20 transition-colors">
                <service.icon className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
