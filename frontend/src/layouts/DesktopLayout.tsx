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

export const DesktopLayout: React.FC<LayoutProps> = ({ 
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
    <div className="min-h-screen flex flex-col bg-white desktop-layout">
      <Navbar
        siteName={siteName}
        siteTagline={siteTagline}
        accentColor={accentColor}
        logo={logo}
        menuItems={menuItems}
        hideUserInfo={hideUserInfo}
        hideLogout={hideLogout}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
