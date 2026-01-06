import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
