import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Shield, Lock, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Ken Burns effect
      gsap.fromTo(bgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 8, ease: 'none' }
      );

      // Headline 1 animation - character split
      const headline1Chars = headline1Ref.current?.querySelectorAll('.char');
      if (headline1Chars) {
        gsap.fromTo(headline1Chars,
          { y: 100, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.6
          }
        );
      }

      // Headline 2 animation
      const headline2Chars = headline2Ref.current?.querySelectorAll('.char');
      if (headline2Chars) {
        gsap.fromTo(headline2Chars,
          { y: 100, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'expo.out',
            delay: 0.9
          }
        );
      }

      // Description fade up
      gsap.fromTo(descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 1.2 }
      );

      // CTA button bounce in
      gsap.fromTo(ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 1.5 }
      );

      // Scroll parallax effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, { y: self.progress * -150 });
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              opacity: 1 - self.progress * 1.5,
              y: self.progress * -50
            });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text into characters
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'scale(1.1)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=80"
          alt="Eleven Seguridad"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16 pt-32 pb-20"
      >
        <div className="max-w-4xl">
          {/* Headline 1 */}
          <h1
            ref={headline1Ref}
            className="heading-xl mb-4 text-white perspective-1000"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {splitText('ELEVEN SEGURIDAD')}
          </h1>

          {/* Headline 2 */}
          <h2
            ref={headline2Ref}
            className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-6 text-[#00d4ff] perspective-1000"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {splitText('Protección Integral 24/7')}
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            Expertos en seguridad física y digital. Ofrecemos soluciones integrales
            para particulares y empresas: control de accesos, consultoría, acompañamiento
            VIP y protección mensual sin sorpresas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              ref={ctaRef}
              href="#contacto"
              onClick={(e) => { e.preventDefault(); scrollToContact(); }}
              className="btn-primary inline-flex items-center space-x-3 group animate-pulse-glow"
            >
              <span>CONTACTA CON NOSOTROS</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-white/30 text-white font-medium tracking-wider hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-300 rounded-xl"
            >
              VER SERVICIOS
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 flex items-center justify-center border border-[#00d4ff]/30">
                <Shield className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <div>
                <p className="text-white font-medium">Seguridad Física</p>
                <p className="text-gray-400 text-sm">Protección presencial</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 flex items-center justify-center border border-[#00d4ff]/30">
                <Lock className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <div>
                <p className="text-white font-medium">Seguridad Digital</p>
                <p className="text-gray-400 text-sm">Protección tecnológica</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 flex items-center justify-center border border-[#00d4ff]/30">
                <Eye className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <div>
                <p className="text-white font-medium">Vigilancia 24/7</p>
                <p className="text-gray-400 text-sm">Siempre protegido</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Animated accent line */}
      <div className="absolute left-0 top-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent transform -translate-y-1/2 opacity-50" />
    </section>
  );
}
