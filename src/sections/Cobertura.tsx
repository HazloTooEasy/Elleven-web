import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    city: 'MADRID',
    description: 'Hace unos años, recuperar una vivienda ocupada en Madrid era un proceso largo y complicado. Hoy en día, con el apoyo de Eleven Seguridad, puedes contar con soluciones rápidas, legales y efectivas para recuperar tu propiedad.',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80'
  },
  {
    city: 'ALICANTE',
    description: 'La okupación de viviendas en Alicante se ha convertido en un problema creciente afectando a cientos de propietarios. Ante esta situación, contar con una empresa desokupa en Alicante como Eleven Seguridad es la solución más rápida.',
    image: 'https://images.unsplash.com/photo-1562569633-622303bafef5?w=600&q=80'
  },
  {
    city: 'TOLEDO',
    description: 'Ya sea porque sales de vacaciones o dejas tu vivienda sola por un tiempo, la okupación es una preocupación real. Por eso, nuestra empresa desokupa en Toledo te ofrece soluciones rápidas y legales para proteger tu hogar.',
    image: 'https://images.unsplash.com/photo-1569959220744-ff553533f492?w=600&q=80'
  }
];

export default function Cobertura() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const heading = sectionRef.current?.querySelector('.section-heading');
      if (heading) {
        gsap.fromTo(heading,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Cards stagger with different offsets
      const cards = cardsRef.current?.querySelectorAll('.location-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0 },
            {
              y: index === 1 ? 40 : 0, // Middle card offset
              opacity: 1,
              duration: 0.7,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
              },
              delay: index * 0.15
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Section Heading */}
        <div className="section-heading text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-[#00d4ff]" />
            <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
              Cobertura Nacional
            </span>
          </div>
          <h2 
            className="heading-lg text-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            TRABAJAMOS EN TODA ESPAÑA
          </h2>
        </div>

        {/* Location Cards */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {locations.map((location, index) => (
            <div
              key={index}
              className="location-card group"
              style={{ marginTop: index === 1 ? '40px' : '0' }}
            >
              <div className="glass-light border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d4ff]/30 transition-all duration-400 hover:-translate-y-4 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={location.image}
                    alt={`Desokupación en ${location.city}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* City badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#00d4ff]" />
                      <span 
                        className="text-white font-bold text-lg"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {location.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-4">
                    {location.description}
                  </p>
                  
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center space-x-2 text-[#00d4ff] text-sm font-medium group/link"
                  >
                    <span>Más información</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More locations hint */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            También operamos en Barcelona, Valencia, Sevilla, Málaga, Zaragoza, Bilbao, Murcia y más ciudades.
          </p>
        </div>
      </div>
    </section>
  );
}
