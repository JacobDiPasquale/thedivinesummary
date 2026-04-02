import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

export default function PurgatorioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-canticle="purgatorio" className="min-h-screen">
      <SiteNav />
      <PageTransition canticleId="purgatorio">
        {children}
      </PageTransition>
      <Footer />
    </div>
  );
}
