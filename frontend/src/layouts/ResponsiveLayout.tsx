import React from 'react';
import { useIsMobile } from '../components/ui/use-mobile';
import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

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

export const ResponsiveLayout: React.FC<LayoutProps> = (props) => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileLayout {...props} /> : <DesktopLayout {...props} />;
};
