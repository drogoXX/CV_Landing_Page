'use client';

import { cvData } from '@/data/cv-data';

export default function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-lambo-black flex items-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] border border-white/50">
              <img
                src={cvData.personal.profileImage}
                alt={cvData.personal.name}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.1) brightness(0.95)' }}
              />
            </div>
          </div>

          {/* Type column */}
          <div className="lg:col-span-7">
            <p className="micro-label !text-lambo-gold mb-6">
              AVAILABLE FOR PROJECTS
            </p>

            <h1 className="text-display2 lg:text-display1 uppercase font-normal text-white mb-8">
              {cvData.personal.name}
            </h1>

            <p className="text-feature uppercase text-lambo-smoke font-normal mb-8">
              {cvData.personal.title}
            </p>

            <p className="text-base text-lambo-ash leading-relaxed max-w-2xl mb-10">
              {cvData.personal.tagline}
            </p>

            <p className="micro-label mb-12">
              {cvData.personal.location.toUpperCase()} ·{' '}
              {cvData.personal.nationality.toUpperCase()}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={cvData.personal.cvDownloadPath}
                download
                className="inline-flex items-center justify-center bg-lambo-gold text-black px-8 py-4 text-sm uppercase font-medium hover:bg-lambo-goldDark transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-lambo-gold"
                style={{ letterSpacing: '0.16px' }}
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center border border-white/50 text-white px-8 py-4 text-sm uppercase font-medium opacity-50 hover:opacity-100 hover:bg-[#1EAEDB]/20 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                style={{ letterSpacing: '0.16px' }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Horizon line at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
    </section>
  );
}
