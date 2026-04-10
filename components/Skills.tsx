'use client';

import { cvData } from '@/data/cv-data';

export default function Skills() {
  return (
    <section id="skills" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">03 / SKILLS</p>
          <h2 className="text-section uppercase font-normal text-white">
            Core Competencies
          </h2>
        </div>

        {/* Skill tiles — gap-px + bg-lambo-charcoal creates 1px hairlines */}
        <div className="grid md:grid-cols-3 gap-px bg-lambo-charcoal border border-lambo-charcoal">
          {cvData.skills.map((group, index) => (
            <div key={group.category} className="bg-lambo-black p-10">
              <p className="micro-label !text-lambo-gold mb-6">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-feature uppercase text-white font-normal leading-tight mb-8">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.competencies.map((competency, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-lambo-ash leading-relaxed"
                  >
                    <span
                      className="text-lambo-gold mt-1.5 flex-shrink-0 select-none"
                      aria-hidden="true"
                    >
                      ▍
                    </span>
                    <span>{competency}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages — single line, no progress bars */}
        <div className="mt-24">
          <p className="micro-label !text-lambo-gold mb-6">LANGUAGES</p>
          <p className="text-base text-lambo-smoke flex flex-wrap items-center gap-x-3 gap-y-2">
            {cvData.languages.map((lang, i) => (
              <span key={lang.language} className="flex items-center gap-3">
                <span
                  className="uppercase"
                  style={{ letterSpacing: '0.16px' }}
                >
                  {lang.language} — {lang.level}
                </span>
                {i < cvData.languages.length - 1 && (
                  <span className="text-lambo-charcoal" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
