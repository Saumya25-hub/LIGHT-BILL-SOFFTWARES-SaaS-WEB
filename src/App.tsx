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
import { OnyxGymPage } from './pages/OnyxGymPage';
import { DeveloperPolicyPage } from './pages/DeveloperPolicyPage';
import { DeveloperRegistrationPage } from './pages/DeveloperRegistrationPage';
import { MultiCounterPage } from './pages/MultiCounterPage';
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
      '/': `STOMS SBV1 — ${siteConfig.brand.productName} | ${siteConfig.company.masterName}`,
      '/product': `STOMS SBV1 Features & Capabilities — ${siteConfig.brand.productName}`,
      '/pricing': `STOMS SBV1 Pricing & 35-Day Free Trial — ${siteConfig.brand.productName}`,
      '/demo': `STOMS SBV1 Interactive Demo Simulator — ${siteConfig.brand.productName}`,
      '/download': `Download STOMS SBV1 Windows (.exe) — ${siteConfig.brand.productName}`,
      '/about': `About S TOM’S Enterprises & Signatures IT Groups — STOMS SBV1`,
      '/support': `Support & Rapid Helpdesk — ${siteConfig.brand.productName}`,
      '/privacy': `Privacy Policy & Local Data Guarantee — ${siteConfig.brand.productName}`,
      '/multi-counter': `1 Shop 2 Counter PCs — Real-Time Local LAN Sync | ${siteConfig.brand.productName}`,
      '/dual-counter': `1 Shop 2 Counter PCs — Real-Time Local LAN Sync | ${siteConfig.brand.productName}`,
      '/multi-pc': `1 Shop 2 Counter PCs — Real-Time Local LAN Sync | ${siteConfig.brand.productName}`,
      '/8pm': '8 PM — Elite Pool & Snooker Club Management | By STOMS',
      '/onyx-gym': 'ONYX GYM — Elite Fitness & Athletic Club OS | STOMS',
      '/gym': 'ONYX GYM — Elite Fitness & Athletic Club OS | STOMS',
      '/onyx': 'ONYX GYM — Elite Fitness & Athletic Club OS | STOMS',
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
      case '/multi-counter':
      case '/dual-counter':
      case '/multi-pc':
        return (
          <MultiCounterPage 
            onNavigate={handleNavigate} 
            onLaunchDemo={() => triggerWarpToDemo('/demo')} 
          />
        );
      case '/privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case '/8pm':
        return <EightPmPoolPage onNavigate={handleNavigate} />;
      case '/onyx-gym':
      case '/gym':
      case '/onyx':
        return <OnyxGymPage onNavigate={handleNavigate} />;
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
