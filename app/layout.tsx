import type { Metadata } from 'next';
import './globals.css';

/* EDIT: Update metadata for your personal branding */
export const metadata: Metadata = {
  title: 'Simone Droghini | Senior Project Manager / Project Director',
  description:
    'Senior Project Director with 20+ years delivering complex infrastructure projects. Expertise in pharmaceutical warehouses, GMP compliance, cold chain logistics, and HVAC systems.',
  keywords: [
    'Project Manager',
    'Project Director',
    'Infrastructure',
    'Pharmaceutical',
    'GMP',
    'Cold Chain',
    'HVAC',
    'Construction Management',
  ],
  authors: [{ name: 'Simone Droghini' }],
  openGraph: {
    title: 'Simone Droghini | Senior Project Manager / Project Director',
    description:
      'Senior Project Director with 20+ years delivering complex infrastructure projects worldwide.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts loaded via link for better compatibility with static export */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
