import type { Metadata } from 'next';
import { Cinzel_Decorative, Cinzel, EB_Garamond } from 'next/font/google';
import '@/styles/globals.css';

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const cinzel = Cinzel({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'La Divina Commedia — A Canto by Canto Commentary',
    template: '%s — The Divine Summary',
  },
  description:
    "A canto-by-canto commentary on Dante\u2019s Divine Comedy: Inferno, Purgatorio, and Paradiso.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[
      cinzelDecorative.variable,
      cinzel.variable,
      ebGaramond.variable,
    ].join(' ')}>
      <body>{children}</body>
    </html>
  );
}
