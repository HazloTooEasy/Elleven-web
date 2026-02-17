import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Phone, FileCheck, Check, ArrowRight, Home, Building2, Key } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Shield,
    title: 'Protección continua',
    description: 'Tu propiedad vigilada y protegida durante todo el año.'
  },
  {
    icon: Clock,
    title: 'Respuesta inmediata',
    description: 'Canal directo de contacto para activar el protocolo de intervención.'
  },
  {
    icon: Phone,
    title: 'Un solo punto de contacto',
    description: 'Teléfono, WhatsApp o formulario. Siempre disponible.'
  },
  {
    icon: FileCheck,
    title: 'Gestión especializada',
    description: 'Verificación, clasificación y actuación según protocolo establecido.'
  }
];

const segments = [
  {
    icon: Home,
    title: 'Segunda residencia',
    description: 'Tranquilidad todo el año aunque no estés.'
  },
  {
    icon: Building2,
    title: 'Inversores',
    description: 'Coste fijo mensual por activo. Menos riesgo y menos sorpresas.'
  },
  {
    icon: Key,
    title: 'Arrendadores',
    description: 'Soporte ante incidencias del alquiler + canal único.'
  }
];

export default function Prevencion() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const heading = sectionRef.current?.querySelector('.section-heading');
      if (heading) {
        gsap.fromTo(heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Intro text
      const intro = sectionRef.current?.querySelector('.intro-text');
      if (intro) {
        gsap.fromTo(intro,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Benefits cards stagger
      const benefitCards = sectionRef.current?.querySelectorAll('.benefit-card');
      if (benefitCards) {
        gsap.fromTo(benefitCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
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

      // How it works steps
      const steps = sectionRef.current?.querySelectorAll('.step-item');
      if (steps) {
        gsap.fromTo(steps,
          { x: -30, opacity: 0 },
          {
            x: 0,
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
      }

      // Segments
      const segmentCards = sectionRef.current?.querySelectorAll('.segment-card');
      if (segmentCards) {
        gsap.fromTo(segmentCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // CTA button
      const cta = sectionRef.current?.querySelector('.cta-container');
      if (cta) {
        gsap.fromTo(cta,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prevencion"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Section Header */}
        <div className="section-heading text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-0.5 bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
              Servicio de Prevención
            </span>
            <div className="w-8 h-0.5 bg-[#00d4ff]" />
          </div>
          
          <h2 
            className="heading-lg text-white mb-6"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            PROTECCIÓN MENSUAL
          </h2>
          
          <p className="intro-text text-xl text-gray-300 leading-relaxed">
            Pagas una cuota fija al mes y, si ocurre una incidencia, activas un equipo 
            especializado sin desembolsos grandes ni imprevistos.
          </p>
        </div>

        {/* Main Value Proposition */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left: Benefits */}
          <div>
            <h3 
              className="text-2xl font-semibold text-white mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ¿Qué incluye?
            </h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="benefit-card flex items-start space-x-4 p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00d4ff]/30 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: How it works */}
          <div>
            <h3 
              className="text-2xl font-semibold text-white mb-8"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ¿Cómo funciona?
            </h3>
            
            <div className="space-y-6">
              {[
                { step: '01', title: 'Alta y activación', desc: 'Te suscribes y registramos los datos de tu propiedad.' },
                { step: '02', title: 'Reporte de incidencia', desc: 'Detectas un problema y contactas por el canal habilitado.' },
                { step: '03', title: 'Verificación', desc: 'Clasificamos el caso y validamos la información.' },
                { step: '04', title: 'Intervención', desc: 'Activamos el protocolo especializado según la situación.' },
                { step: '05', title: 'Seguimiento y cierre', desc: 'Recibes actualizaciones hasta la resolución del caso.' }
              ].map((item, index) => (
                <div key={index} className="step-item flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#00d4ff] text-sm font-bold">{item.step}</span>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* For whom */}
        <div className="mb-20">
          <h3 
            className="text-2xl font-semibold text-white text-center mb-10"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            ¿Para quién es?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="segment-card text-center p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00d4ff]/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center">
                  <segment.icon className="w-8 h-8 text-[#00d4ff]" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">{segment.title}</h4>
                <p className="text-gray-400 text-sm">{segment.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-container text-center">
          <div className="max-w-2xl mx-auto p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-[#00d4ff]/10 via-transparent to-[#00d4ff]/5 border border-[#00d4ff]/20">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Check className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium">Sin permanencia</span>
              <span className="text-gray-500">|</span>
              <Check className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium">Cancela cuando quieras</span>
            </div>
            
            <h3 
              className="text-2xl lg:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Protege tu propiedad hoy
            </h3>
            
            <p className="text-gray-400 mb-8">
              Cuota mensual predecible. Sin sustos ni pagos imprevistos cuando ocurre un problema.
            </p>
            
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
              <span>Solicitar información</span>
              <ArrowRight className={`
                w-6 h-6 
                transform transition-transform duration-300
                ${isHovered ? 'translate-x-1' : ''}
              `} />
            </a>
            
            <p className="mt-6 text-gray-500 text-sm">
              Te contactaremos para explicarte los detalles y adaptar el servicio a tus necesidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
