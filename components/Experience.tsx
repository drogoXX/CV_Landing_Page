'use client';

import { cvData } from '@/data/cv-data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            A track record of delivering complex infrastructure projects across multiple industries and geographies
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2" />

          <div className="space-y-12">
            {cvData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 bg-primary-600 rounded-full -translate-x-1/2 ring-4 ring-primary-100" />

                {/* Content Card */}
                <div
                  className={`${
                    index % 2 === 0 ? 'lg:pr-12' : 'lg:col-start-2 lg:pl-12'
                  }`}
                >
                  <div
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                      exp.type === 'major' ? 'border-l-4 border-primary-600' : 'border-l-4 border-neutral-300'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-6 border-b border-neutral-100">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-2">
                            {exp.dateStart} - {exp.dateEnd}
                          </span>
                          <h3 className="text-xl font-heading font-bold text-neutral-900">
                            {exp.title}
                          </h3>
                        </div>
                        <span className="text-3xl" title={exp.location}>
                          {exp.flag}
                        </span>
                      </div>

                      <div className="text-primary-700 font-semibold mb-1">
                        {exp.company}
                      </div>
                      <div className="text-neutral-600 text-sm mb-2">
                        {exp.project}
                      </div>
                      <div className="text-sm font-medium text-green-600 bg-green-50 inline-block px-2 py-1 rounded">
                        {exp.projectValue}
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="px-6 py-4 bg-neutral-50">
                      <div className="flex flex-wrap gap-2">
                        {exp.expertise.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white text-neutral-600 text-xs font-medium rounded-full border border-neutral-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.slice(0, 4).map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                            <svg
                              className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty column for timeline alignment */}
                <div className={`hidden lg:block ${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
