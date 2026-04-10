'use client';

import { cvData } from '@/data/cv-data';

type EducationEntry = (typeof cvData.education)[number];

function EntryList({ entries }: { entries: EducationEntry[] }) {
  return (
    <div className="border-t border-lambo-charcoal">
      {entries.map((edu, index) => (
        <div
          key={index}
          className="border-b border-lambo-charcoal py-8 flex items-start justify-between gap-6"
        >
          <div className="flex-1">
            <h4 className="text-feature uppercase text-white font-normal leading-tight mb-2">
              {edu.degree}
            </h4>
            <p className="text-base text-lambo-ash">
              {edu.institution}
              {edu.location ? ` · ${edu.location}` : ''}
            </p>
          </div>
          <p className="micro-label !text-lambo-gold flex-shrink-0 mt-2">
            {edu.year}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Education() {
  const degrees = cvData.education.filter((e) => e.type === 'degree');
  const certifications = cvData.education.filter(
    (e) => e.type === 'certification'
  );

  return (
    <section id="education" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">04 / EDUCATION</p>
          <h2 className="text-section uppercase font-normal text-white">
            Education & Certifications
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-lambo-charcoal">
          <div className="bg-lambo-black lg:pr-12">
            <p className="micro-label !text-lambo-gold mb-8">
              ACADEMIC DEGREES
            </p>
            <EntryList entries={degrees} />
          </div>
          <div className="bg-lambo-black lg:pl-12">
            <p className="micro-label !text-lambo-gold mb-8">
              PROFESSIONAL CERTIFICATIONS
            </p>
            <EntryList entries={certifications} />
          </div>
        </div>
      </div>
    </section>
  );
}
