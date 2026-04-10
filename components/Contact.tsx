'use client';

import { cvData } from '@/data/cv-data';

type ContactItem = {
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
};

export default function Contact() {
  const items: ContactItem[] = [
    {
      label: 'EMAIL',
      value: cvData.personal.email,
      href: `mailto:${cvData.personal.email}`,
    },
    {
      label: 'PHONE',
      value: cvData.personal.phone,
      href: `tel:${cvData.personal.phone.split(' ')[0]}`,
    },
    {
      label: 'LINKEDIN',
      value: 'Connect with me',
      href: cvData.personal.linkedIn,
      external: true,
    },
    {
      label: 'LOCATION',
      value: cvData.personal.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">05 / CONTACT</p>
          <h2 className="text-section uppercase font-normal text-white">
            Get In Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: contact rows */}
          <div className="border-t border-lambo-charcoal">
            {items.map((item) => {
              const inner = (
                <>
                  <p className="micro-label !text-lambo-gold mb-3">
                    {item.label}
                  </p>
                  <p className="text-feature uppercase font-normal text-white group-hover:text-lambo-gold transition-colors duration-200 leading-tight">
                    {item.value.toUpperCase()}
                  </p>
                </>
              );
              return (
                <div
                  key={item.label}
                  className="border-b border-lambo-charcoal py-8"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="block group focus:outline-2 focus:outline-offset-2 focus:outline-white"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div>{inner}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Availability panel — the only charcoal surface on the page */}
          <div className="bg-lambo-charcoal p-10">
            <p className="micro-label !text-lambo-gold mb-8">
              AVAILABILITY & WORK STATUS
            </p>

            <div className="space-y-8 mb-10">
              <div>
                <p className="micro-label mb-2">AVAILABILITY</p>
                <p className="text-base text-lambo-smoke">
                  {cvData.additionalInfo.availability}
                </p>
              </div>
              <div>
                <p className="micro-label mb-2">WORK AUTHORIZATION</p>
                <p className="text-base text-lambo-smoke">
                  {cvData.additionalInfo.workAuthorization}
                </p>
              </div>
              <div>
                <p className="micro-label mb-2">RELOCATION</p>
                <p className="text-base text-lambo-smoke">
                  {cvData.additionalInfo.willingnessToRelocate}
                </p>
              </div>
            </div>

            <a
              href={cvData.personal.cvDownloadPath}
              download
              className="w-full inline-flex items-center justify-center bg-lambo-gold text-black px-8 py-4 text-sm uppercase font-medium hover:bg-lambo-goldDark transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-lambo-gold"
              style={{ letterSpacing: '0.16px' }}
            >
              Download Full CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
