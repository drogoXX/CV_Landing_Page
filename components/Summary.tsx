'use client';

import { cvData } from '@/data/cv-data';

export default function Summary() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Professional Summary
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full" />
        </div>

        {/* Summary Content */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote decoration */}
            <svg
              className="absolute -top-8 -left-8 w-16 h-16 text-primary-100"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed text-center relative z-10">
              {/* EDIT: Your professional summary */}
              {cvData.summary}
            </p>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cvData.statistics.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-2xl md:text-3xl font-heading font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 mt-2 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
