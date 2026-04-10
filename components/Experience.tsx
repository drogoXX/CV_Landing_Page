'use client';

import { cvData } from '@/data/cv-data';

const COUNTRY_CODE: Record<string, string> = {
  Italy: 'IT',
  Slovakia: 'SK',
  Austria: 'AT',
  Finland: 'FI',
  Germany: 'DE',
  Denmark: 'DK',
  'United Kingdom': 'UK',
};

export default function Experience() {
  const roles = [...cvData.experience].reverse();

  return (
    <section id="experience" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">02 / EXPERIENCE</p>
          <h2 className="text-section uppercase font-normal text-white">
            Professional Experience
          </h2>
        </div>

        {/* Roles list */}
        <div className="border-t border-lambo-charcoal">
          {roles.map((exp) => {
            const dateColor =
              exp.type === 'major' ? '!text-lambo-gold' : '!text-lambo-ash';
            const country =
              COUNTRY_CODE[exp.location] ?? exp.location.toUpperCase();

            return (
              <div
                key={exp.id}
                className="border-b border-lambo-charcoal py-16"
              >
                {/* Date range */}
                <p className={`micro-label ${dateColor} mb-4`}>
                  {exp.dateStart.toUpperCase()} — {exp.dateEnd.toUpperCase()} · {country}
                </p>

                {/* Role title */}
                <h3 className="text-feature uppercase text-white font-normal mb-3 leading-tight">
                  {exp.title}
                </h3>

                {/* Company */}
                <p className="text-base uppercase text-lambo-ash mb-6" style={{ letterSpacing: '0.16px' }}>
                  {exp.company}
                </p>

                {/* Project + value */}
                <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <p className="text-base text-lambo-smoke">{exp.project}</p>
                  <p className="text-base text-lambo-gold">{exp.projectValue}</p>
                </div>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {exp.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="micro-label border border-lambo-charcoal px-3 py-1.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
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
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
