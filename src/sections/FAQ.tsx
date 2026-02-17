import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Cuánto cuesta una desokupación?',
    answer: 'El precio de una desokupación varía según varios factores: la ubicación del inmueble, el tipo de ocupación, el estado del proceso legal y la urgencia del caso. Ofrecemos presupuestos personalizados sin compromiso. Contacta con nosotros para una valoración gratuita de tu situación.'
  },
  {
    question: '¿Cuánto tiempo lleva el proceso de desokupación?',
    answer: 'El tiempo puede variar significativamente dependiendo del caso. En situaciones de mediación exitosa, podemos resolverlo en horas o días. En casos que requieren procedimientos legales, puede tomar semanas o meses. Nuestro equipo trabaja para agilizar cada etapa del proceso.'
  },
  {
    question: '¿Es legal el servicio de desokupación que ofrecen?',
    answer: 'Absolutamente. Todos nuestros procedimientos se realizan dentro del marco legal español. Contamos con abogados especializados que supervisan cada caso para garantizar que todas las acciones sean legales y éticas. No utilizamos métodos violentos ni ilegales.'
  },
  {
    question: '¿Qué ocurre si los okupas no quieren abandonar la vivienda?',
    answer: 'En estos casos, activamos el protocolo legal correspondiente. Nuestros abogados inician los procedimientos de desahucio pertinentes mientras nuestro equipo de seguridad mantiene la vigilancia del inmueble. Cada situación se evalúa individualmente para determinar la mejor estrategia.'
  },
  {
    question: '¿Qué áreas geográficas cubren?',
    answer: 'Operamos en toda España, con presencia destacada en Madrid, Barcelona, Valencia, Alicante, Toledo y otras grandes ciudades. Nuestra red de profesionales nos permite ofrecer cobertura nacional con respuesta rápida en cualquier punto del territorio español.'
  }
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      // FAQ items stagger
      const items = sectionRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(items,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-black" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Section Heading */}
          <div className="section-heading text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
                FAQ
              </span>
              <div className="w-8 h-0.5 bg-[#00d4ff]" />
            </div>
            <h2 
              className="heading-lg text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              PREGUNTAS FRECUENTES
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item"
              >
                <div 
                  className={`
                    glass-light border border-white/10 rounded-xl overflow-hidden
                    transition-all duration-300
                    ${openIndex === index ? 'border-[#00d4ff]/30 bg-white/5' : 'hover:bg-white/[0.02]'}
                  `}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h4 className="text-white font-medium pr-4">
                      {faq.question}
                    </h4>
                    <div 
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        transition-all duration-300
                        ${openIndex === index ? 'bg-[#00d4ff]/20 rotate-45' : 'bg-white/10'}
                      `}
                    >
                      {openIndex === index ? (
                        <X className="w-4 h-4 text-[#00d4ff]" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-400
                      ${openIndex === index ? 'max-h-96' : 'max-h-0'}
                    `}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed pl-4 border-l-2 border-[#00d4ff]/30">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              ¿Tienes más preguntas? Estamos aquí para ayudarte.
            </p>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>CONTÁCTANOS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
