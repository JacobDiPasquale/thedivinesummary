import SiteNav from '@/components/layout/SiteNav';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

export default function InfernoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-canticle="inferno" className="min-h-screen">
      <SiteNav />
      <PageTransition canticleId="inferno">
        {children}
      </PageTransition>
      <Footer />
    </div>
  );
}
