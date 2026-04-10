'use client';

import { cvData } from '@/data/cv-data';

export default function Navbar() {
  const initials = cvData.personal.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            className="text-sm uppercase font-medium text-white hover:text-lambo-gold transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
            style={{ letterSpacing: '0.225px' }}
          >
            {initials}
          </a>
          <a
            href={cvData.personal.cvDownloadPath}
            download
            className="bg-lambo-gold text-black px-6 py-3 text-sm uppercase font-medium hover:bg-lambo-goldDark transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-lambo-gold"
            style={{ letterSpacing: '0.16px' }}
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
