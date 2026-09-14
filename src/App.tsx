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
    };

    document.title = pageTitles[currentPath] || `${siteConfig.company.masterName} — ${siteConfig.brand.productName}`;
  }, [currentPath]);

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/product':
        return <ProductPage onNavigate={handleNavigate} />;
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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;
