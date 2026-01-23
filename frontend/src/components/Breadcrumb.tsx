import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { t } from '../i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: string) => void;
  theme?: string;
}

const LABEL_KEYS: Record<string, string> = {
  'Beranda': 'site.menu.home',
  'Program Unggulan': 'site.submenu.programs',
  'Tentang Kami': 'site.menu.about',
  'Program': 'site.submenu.programs',
  'Berita': 'site.submenu.news',
  'Galeri': 'site.submenu.gallery',
  'Prestasi': 'site.submenu.achievement',
  'Karir': 'site.menu.career',
  'PPDB': 'navbar.ppdb_cta'
};

const translate = (label: string): string => {
  const key = LABEL_KEYS[label];
  return key ? t(key) : label;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate = () => {}, theme = 'light' }) => {
  const isDark = theme === 'dark';
  return (
    <nav className={`flex items-center gap-2 text-sm ${isDark ? 'text-white' : ''}`}>
      <button onClick={() => onNavigate('main')} className={isDark ? 'flex items-center gap-1 text-white/80 hover:text-white transition-colors' : 'flex items-center gap-1 text-gray-500 hover:text-[var(--color-primary)] transition-colors'}>
        <Home className={isDark ? 'w-4 h-4 text-white/70' : 'w-4 h-4'} />
        <span>{t('site.menu.home')}</span>
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className={isDark ? 'w-4 h-4 text-white/60' : 'w-4 h-4 text-gray-400'} />
          {item.onClick || item.href ? (
            <button onClick={item.onClick} className={isDark ? 'text-white/80 hover:text-white transition-colors' : 'text-gray-500 hover:text-[var(--color-primary)] transition-colors'}>
              {translate(item.label)}
            </button>
          ) : (
            <span className={isDark ? 'text-white' : 'text-gray-700'}>{translate(item.label)}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
