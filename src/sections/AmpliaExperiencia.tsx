import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: '+10', label: 'Años de experiencia' },
  { icon: Users, value: '+1.000', label: 'Clientes satisfechos' },
  { icon: Clock, value: '24h', label: 'Respuesta inmediata' },
  { icon: MapPin, value: 'Toda', label: 'Cobertura España' }
];

export default function AmpliaExperiencia() {
  const sectionRef = useRef<HTMLElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Accent line draw
      gsap.fromTo(accentRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content slide up
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
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image reveal - animating the INNER container
      gsap.fromTo(imageInnerRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, { y: 20 - self.progress * 40 });
          }
          if (imageRef.current) {
            gsap.set(imageRef.current, { y: -20 + self.progress * 40 });
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Content */}
          <div ref={contentRef} className="lg:pr-16 relative">
            {/* Accent line */}
            <div
              ref={accentRef}
              className="absolute left-0 top-0 w-1 h-24 bg-gradient-to-b from-[#00d4ff] to-transparent origin-top"
            />

            <div className="pl-6">
              <div className="flex items-center space-x-2 mb-6 content-item">
                <div className="w-8 h-0.5 bg-[#00d4ff]" />
                <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
                  Experiencia
                </span>
              </div>

              <h2
                className="heading-lg mb-6 text-white content-item"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                AMPLIA EXPERIENCIA
              </h2>

              <div className="space-y-4 mb-8">
                <p className="body-text content-item">
                  En Eleven Seguridad somos la empresa de confianza para quienes buscan
                  soluciones profesionales de seguridad. Nuestra amplia experiencia en
                  el sector nos permite ofrecer un servicio de excelencia, discreto y
                  adaptado a cada cliente.
                </p>

                <p className="text-gray-400 content-item">
                  Como empresa con trayectoria contrastada, hemos protegido hogares,
                  empresas y activos de todo tipo, siempre priorizando la seguridad
                  y tranquilidad de nuestros clientes.
                </p>

                <p className="text-gray-400 content-item">
                  Con Eleven, cada proyecto es único. Diseñamos estrategias personalizadas
                  que garantizan la máxima protección para tu familia, tu negocio y tus bienes.
                </p>
              </div>

              <div className="content-item">
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>SOLICITA INFORMACIÓN</span>
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative lg:-ml-16"
          >
            <div ref={imageInnerRef} className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80"
                alt="Experiencia Eleven Seguridad"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div
              ref={statsRef}
              className="absolute -bottom-8 -left-8 lg:bottom-8 lg:-left-16 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl grid grid-cols-2 gap-4 z-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-item flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
