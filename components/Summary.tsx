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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-lambo-charcoal">
          {cvData.statistics.map((stat, index) => (
            <div
              key={index}
              className="px-6 py-8 lg:border-r border-b lg:border-b-0 border-lambo-charcoal last:border-r-0"
            >
              <p className="text-section text-lambo-gold font-normal leading-none mb-3">
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
