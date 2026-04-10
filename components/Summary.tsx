'use client';

import { cvData } from '@/data/cv-data';

export default function Summary() {
  return (
    <section id="about" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">01 / SUMMARY</p>
          <h2 className="text-section uppercase font-normal text-white">
            Professional Summary
          </h2>
        </div>

        {/* Summary copy */}
        <p className="text-body-lg text-lambo-smoke leading-relaxed max-w-4xl mb-24">
          {cvData.summary}
        </p>

        {/* Statistics row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-lambo-charcoal border border-lambo-charcoal">
          {cvData.statistics.map((stat, index) => (
            <div key={index} className="bg-lambo-black px-6 py-8">
              <p className="text-subsection text-lambo-gold font-normal mb-3 break-words">
                {stat.value}
              </p>
              <p className="micro-label">{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
