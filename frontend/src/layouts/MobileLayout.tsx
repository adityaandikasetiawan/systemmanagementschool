import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  menuItems: any[];
  onNavigate: (page: string) => void;
  siteName?: string;
  siteTagline?: string;
  accentColor?: string;
  logo?: string;
  hideUserInfo?: boolean;
  hideLogout?: boolean;
}

export const MobileLayout: React.FC<LayoutProps> = ({ 
  children, 
  menuItems, 
  onNavigate,
  siteName = "Baituljannah",
  siteTagline,
  accentColor,
  logo = "/logo.png",
  hideUserInfo,
  hideLogout
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mobile-layout">
      <div className="relative z-50 shadow-sm">
        <Navbar
          siteName={siteName}
          siteTagline={siteTagline}
          accentColor={accentColor}
          logo={logo}
          menuItems={menuItems}
          hideUserInfo={hideUserInfo}
          hideLogout={hideLogout}
          isSticky={false}
        />
      </div>
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>
      <div className="pb-safe">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
};
