import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { PricingPage } from './pages/PricingPage';
import { DemoPage } from './pages/DemoPage';
import { DownloadPage } from './pages/DownloadPage';
import { AboutPage } from './pages/AboutPage';
import { SupportPage } from './pages/SupportPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { EightPmPoolPage } from './pages/EightPmPoolPage';
import { DeveloperPolicyPage } from './pages/DeveloperPolicyPage';
import { DeveloperRegistrationPage } from './pages/DeveloperRegistrationPage';
import { CosmicWarpSplash } from './components/cinema/CosmicWarpSplash';
import { LuxuryCustomCursor } from './components/ui/LuxuryCustomCursor';
import { siteConfig } from './config/siteConfig';

export function App() {
  const getInitialPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/')) {
      return path === '' ? '/' : path;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [isWarping, setIsWarping] = useState(false);
  const [warpTarget, setWarpTarget] = useState<string>('/demo');

  const triggerWarpToDemo = (target = '/demo') => {
    setWarpTarget(target);
    setIsWarping(true);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  // SEO Page Title synchronization
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': `${siteConfig.company.masterName} — ${siteConfig.brand.productName} | Business Software Made Simple`,
      '/product': `Features & Capabilities — ${siteConfig.brand.productName}`,
      '/pricing': `Pricing & 35-Day Free Trial — ${siteConfig.brand.productName}`,
      '/demo': `Interactive Demo Preview — ${siteConfig.brand.productName}`,
      '/download': `Download Windows & Android — ${siteConfig.brand.productName}`,
      '/about': `About ${siteConfig.company.masterName} — ${siteConfig.brand.productFamily}`,
      '/support': `Support & Contact — ${siteConfig.brand.productName}`,
      '/privacy': `Privacy Policy — ${siteConfig.brand.productName}`,
      '/8pm': '8 PM — Elite Pool & Snooker Club Management | By STOMS',
      '/developer-policy': 'Developer Policy & Engineering Standards — STOMS',
      '/policy': 'Company Engineering & Code Policy — STOMS',
      '/engineering-policy': 'Engineering Standards & IP Protection — STOMS',
      '/developer-registration': 'Developer Registration & Work Inquiries — STOMS',
      '/join-team': 'Work with STOMS Engineering — Developer Registration',
      '/apply': 'Developer Intake & Work Inquiry — STOMS',
    };

    document.title = pageTitles[currentPath] || `${siteConfig.company.masterName} — ${siteConfig.brand.productName}`;
  }, [currentPath]);

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            onLaunchDemo={() => triggerWarpToDemo('/demo')} 
          />
        );
      case '/product':
        return (
          <ProductPage 
            onNavigate={handleNavigate} 
            onLaunchDemo={() => triggerWarpToDemo('/demo')} 
          />
        );
      case '/pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case '/demo':
        return <DemoPage onNavigate={handleNavigate} />;
      case '/download':
        return <DownloadPage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/support':
        return <SupportPage onNavigate={handleNavigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case '/8pm':
        return <EightPmPoolPage onNavigate={handleNavigate} />;
      case '/developer-policy':
      case '/policy':
      case '/engineering-policy':
      case '/company-policy':
        return <DeveloperPolicyPage onNavigate={handleNavigate} />;
      case '/developer-registration':
      case '/join-team':
      case '/apply':
      case '/careers':
        return <DeveloperRegistrationPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            onLaunchDemo={() => triggerWarpToDemo('/demo')} 
          />
        );
    }
  };

  return (
    <>
      {/* Awwwards-grade Luxury Fluid Magnetic Custom Cursor */}
      <LuxuryCustomCursor />

      <Layout currentPath={currentPath} onNavigate={handleNavigate}>
        {renderCurrentPage()}
      </Layout>

      {/* Ultra-Cinematic Cosmic Hyperspace Warp Loading Splash ("Paisa Vasool Animation") */}
      <CosmicWarpSplash
        isOpen={isWarping}
        targetPath={warpTarget}
        onComplete={() => {
          handleNavigate(warpTarget);
          setIsWarping(false);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onCancel={() => {
          handleNavigate(warpTarget);
          setIsWarping(false);
        }}
      />
    </>
  );
}

export default App;
