import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Emilio Romo',
    rating: 5,
    text: 'Increíble! Muy eficaces y profesionales, solucionaron mi situación en tiempo record, muy recomendable sin duda!!!',
    avatar: 'ER'
  },
  {
    id: 2,
    name: 'Iván González',
    rating: 5,
    text: 'Los mejores sin duda!!! Un servicio excepcional, rápido y muy profesional. Se nota la experiencia en cada paso.',
    avatar: 'IG'
  },
  {
    id: 3,
    name: 'Alejandro Gómez Martín',
    rating: 5,
    text: 'Hicieron un servicio eficiente y profesional, solucionando una situación delicada de la manera más rápida posible.',
    avatar: 'AG'
  },
  {
    id: 4,
    name: 'Juanjino Je',
    rating: 5,
    text: 'No sabía que aun quedaba gente tan honrada buena y profesional todo a la vez. Se nota que saben muy bien lo que hacen.',
    avatar: 'JJ'
  },
  {
    id: 5,
    name: 'Estefanía De Haro',
    rating: 5,
    text: 'Un 10/10, desde el trato, la amabilidad, la fiabilidad y el compromiso. Son personas serias, puntuales y siempre profesionales.',
    avatar: 'ED'
  },
  {
    id: 6,
    name: 'Antonio Virgilioso',
    rating: 5,
    text: 'Muy buena empresa de seguridad. Equipo de profesionales con una calidad humana que sorprende. Mi padre se sintió muy cómodo.',
    avatar: 'AV'
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [prev, currentIndex, next];
  };

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentIndex, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % testimonials.length);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading animation
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

      // Cards 3D rotate in
      const cards = carouselRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(cards,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
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

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const visibleIndices = getVisibleTestimonials();

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Section Heading */}
        <div className="section-heading text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-0.5 bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
              Testimonios
            </span>
            <div className="w-8 h-0.5 bg-[#00d4ff]" />
          </div>
          <h2
            className="heading-lg text-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            OPINIÓN DE NUESTROS CLIENTES
          </h2>
        </div>

        {/* 3D Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div
            ref={carouselRef}
            className="flex items-center justify-center gap-6 perspective-1000 py-8"
          >
            {testimonials.map((testimonial, index) => {
              const isVisible = visibleIndices.includes(index);
              const isCenter = index === currentIndex;
              const position = visibleIndices.indexOf(index);

              if (!isVisible) return null;

              return (
                <div
                  key={testimonial.id}
                  className={`
                    testimonial-card
                    glass-light border border-white/10 rounded-2xl p-8
                    transition-all duration-500
                    ${isCenter ? 'scale-110 opacity-100 z-10' : 'scale-90 opacity-60 blur-[2px]'}
                  `}
                  style={{
                    transform: `
                      ${position === 0 ? 'translateX(20px) rotateY(15deg)' : ''}
                      ${position === 2 ? 'translateX(-20px) rotateY(-15deg)' : ''}
                      ${isCenter ? 'translateZ(50px)' : ''}
                    `,
                    maxWidth: isCenter ? '450px' : '350px',
                    flex: isCenter ? '1.2' : '1'
                  }}
                >
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-[#00d4ff]/30 mb-4" />

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-300 mb-6 line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff]/30 to-[#00d4ff]/10 flex items-center justify-center border border-[#00d4ff]/30">
                      <span className="text-[#00d4ff] font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">Cliente verificado</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex ? 'bg-[#00d4ff] w-6' : 'bg-white/30 hover:bg-white/50'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
