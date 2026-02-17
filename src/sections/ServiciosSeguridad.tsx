import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'CONTROL DE ACCESOS',
    description: 'Implementamos sistemas y personal especializado para gestionar y restringir el acceso a tus instalaciones, asegurando máxima protección.',
    image: '/images/control-accesos.jpg',
    link: '#seguridad-fisica'
  },
  {
    id: 2,
    title: 'COBRO DE DEUDAS',
    description: 'Recuperamos tu dinero. Contamos con profesionales en este ámbito que garantizan una recuperación rápida y legal.',
    image: '/images/cobro-deudas.jpg',
    link: '#seguridad-fisica'
  },
  {
    id: 3,
    title: 'CONSULTORÍA DE SEGURIDAD',
    description: 'Analizamos riesgos y diseñamos estrategias personalizadas para reforzar la seguridad de personas, empresas y propiedades.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
    link: '#seguridad-fisica'
  },
  {
    id: 4,
    title: 'ACOMPAÑAMIENTO VIP',
    description: 'Atención personalizada, discreción absoluta y asistencia exclusiva en cada momento que lo necesites.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80',
    link: '#seguridad-fisica'
  }
];

export default function ServiciosSeguridad() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    const currentSlideEl = slideRefs.current[currentSlide];
    const nextSlideEl = slideRefs.current[index];

    if (currentSlideEl && nextSlideEl) {
      // Animate out current slide
      gsap.to(currentSlideEl, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: 'expo.in'
      });

      // Animate in next slide
      gsap.fromTo(nextSlideEl,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          onComplete: () => {
            setCurrentSlide(index);
            setIsAnimating(false);
          }
        }
      );
    }
  }, [currentSlide, isAnimating]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % services.length;
    goToSlide(next);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + services.length) % services.length;
    goToSlide(prev);
  }, [currentSlide, goToSlide]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [nextSlide]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { width: '0%' },
        { width: '100%', duration: 6, ease: 'linear' }
      );
    }
  }, [currentSlide]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative h-[80vh] min-h-[600px] overflow-hidden"
    >
      {/* Slides */}
      {services.map((service, index) => (
        <div
          key={service.id}
          ref={el => { slideRefs.current[index] = el; }}
          className={`absolute inset-0 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-0.5 bg-[#00d4ff]" />
                  <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
                    Servicios de Seguridad
                  </span>
                </div>

                <h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {service.title}
                </h3>

                <p className="text-lg text-gray-300 mb-8 max-w-xl">
                  {service.description}
                </p>

                <a
                  href={service.link}
                  className="btn-primary inline-flex items-center space-x-3 group"
                >
                  <span>MÁS INFO</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:scale-110 transition-all duration-300"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:scale-110 transition-all duration-300"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'bg-[#00d4ff] w-8'
              : 'bg-white/30 hover:bg-white/50'
              }`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-[#00d4ff]"
          style={{ width: '0%' }}
        />
      </div>
    </section>
  );
}
