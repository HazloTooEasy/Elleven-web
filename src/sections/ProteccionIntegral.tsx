import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProteccionIntegral() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with circle clip-path
      gsap.fromTo(imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', y: 50 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Heading word split animation
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Content fade up
      gsap.fromTo(contentRef.current?.querySelectorAll('.fade-up') || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, { y: 50 - self.progress * 100 });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-3">
        {word}
      </span>
    ));
  };

  const features = [
    'Protección física 24/7',
    'Seguridad digital avanzada',
    'Respuesta inmediata',
    'Equipo altamente cualificado'
  ];

  return (
    <section
      id="sobre-nosotros"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
                alt="Protección Integral"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-black/90 backdrop-blur-xl border border-[#00d4ff]/30 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-[#00d4ff]/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#00d4ff]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-gray-400 text-sm">Protección garantizada</p>
                </div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute -inset-4 border border-[#00d4ff]/10 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <div className="flex items-center space-x-2 mb-6 fade-up">
              <div className="w-8 h-0.5 bg-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
                Seguridad Total
              </span>
            </div>

            <h2
              ref={headingRef}
              className="heading-lg mb-6 text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {splitWords('PROTECCIÓN INTEGRAL,')}
              <br />
              {splitWords('SEGURIDAD TOTAL')}
            </h2>

            <p className="body-text mb-8 fade-up">
              En Eleven, combinamos servicios de seguridad para brindar una protección 
              integral. Nuestro enfoque garantiza que tanto los espacios como la información 
              están resguardados frente a cualquier amenaza. Somos expertos en seguridad 
              física y digital, ofreciendo soluciones completas para particulares y empresas.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 fade-up"
                >
                  <div className="w-6 h-6 rounded-full bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="fade-up">
              <p className="text-lg font-medium text-white mb-2">
                Confía en nosotros para
              </p>
              <p 
                className="text-2xl font-bold text-[#00d4ff]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                TU SEGURIDAD TOTAL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
