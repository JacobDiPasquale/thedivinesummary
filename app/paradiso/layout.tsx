import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

export default function ParadisoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-canticle="paradiso" className="min-h-screen">
      <SiteNav />
      <PageTransition canticleId="paradiso">
        {children}
      </PageTransition>
      <Footer />
    </div>
  );
}
