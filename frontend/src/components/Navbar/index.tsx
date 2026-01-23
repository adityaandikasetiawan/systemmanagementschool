import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Menu } from 'lucide-react';
import { t } from '../../i18n';
import i18n from '../../i18n';
import { NavbarProps } from './types';
import { Logo } from './Logo';
import { DesktopMenu } from './DesktopMenu';
import { UserActions } from './UserActions';
import { LanguageSelector } from './LanguageSelector';
import { RunningText } from './RunningText';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC<NavbarProps> = ({ 
  logo, 
  siteName, 
  siteTagline = t('navbar.tagline', 'Islamic Education'), 
  accentColor = '#1E4AB8', 
  menuItems, 
  hideUserInfo = false, 
  hideLogout = false, 
  isSticky = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginItem = menuItems.find((i) => i.label.toLowerCase() === 'login');
  const filteredMenu = menuItems.filter((i) => i.label.toLowerCase() !== 'login');
  const [user, setUser] = useState<any | null>(null);
  const [locale, setLocaleState] = useState(i18n.getLocale());

  useEffect(() => {
    try {
      const raw = localStorage.getItem('baituljannah_user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch {}
  }, []);

  useEffect(() => {
    const unsub = i18n.onLocaleChange((lc) => setLocaleState(lc));
    return () => unsub();
  }, []);

  const MENU_KEYS: Record<string, string> = {
    'Beranda': 'site.menu.home',
    'Tentang': 'site.menu.about',
    'Profile': 'site.menu.profile',
    'Informasi': 'site.menu.info',
    'Karir': 'site.menu.career',
    'Career': 'site.menu.career',
    'SPMB': 'site.menu.admission',
    'PPDB': 'site.menu.admission',
    'Kontak': 'site.menu.contact',
    'Visi & Misi': 'site.submenu.vision_mission',
    'Kurikulum': 'site.submenu.curriculum',
    'Fasilitas': 'site.submenu.facilities',
    'Kepengurusan': 'site.submenu.management',
    'Profil Yayasan': 'site.submenu.foundation_profile',
    'Sejarah': 'site.submenu.history',
    'Struktur Organisasi': 'site.submenu.organization',
    'Berita': 'site.submenu.news',
    'Galeri Foto': 'site.submenu.gallery',
    'Prestasi': 'site.submenu.achievement',
    'Program': 'site.submenu.programs',
    'Pendaftaran': 'site.submenu.admission_registration',
    'Jadwal & Alur': 'site.submenu.admission_schedule',
    'Biaya Pendidikan': 'site.submenu.admission_fee',
    'Login': 'common.login'
  };

  const translateLabel = (label: string): string => {
    const key = MENU_KEYS[label];
    return key ? t(key) : label;
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return t('navbar.role.super_admin');
      case 'admin_unit':
        return t('navbar.role.admin_unit');
      case 'guru':
        return t('navbar.role.guru');
      case 'siswa':
        return t('navbar.role.siswa');
      default:
        return t('navbar.role.default');
    }
  };

  const logout = () => {
    try {
      api.auth.logout().catch(() => {});
      localStorage.removeItem('baituljannah_user');
      localStorage.removeItem('baituljannah_token');
      localStorage.removeItem('baituljannah_refresh_token');
      setUser(null);
      if (loginItem) {
        loginItem.onClick?.();
      } else {
        const homeItem = menuItems.find((i) => i.label.toLowerCase() === 'beranda');
        homeItem?.onClick?.();
      }
      setIsOpen(false);
    } catch {}
  };

  return (
    <nav className={`z-50 transition-all duration-300 ${isSticky ? 'sticky top-0 w-full shadow-md bg-white/95 backdrop-blur-md border-b border-gray-200/50' : 'relative border-b border-gray-100 bg-white'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-3 px-4 md:px-6 h-20">
          <Logo 
            logo={logo} 
            siteName={siteName} 
            siteTagline={siteTagline} 
            accentColor={accentColor} 
            locale={locale} 
          />

          <DesktopMenu 
            menuItems={filteredMenu} 
            translateLabel={translateLabel} 
          />

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector locale={locale} />
            
            <div className="w-px h-8 bg-gray-200 mx-1"></div>

            <UserActions 
              user={user} 
              loginItem={loginItem} 
              hideUserInfo={hideUserInfo} 
              hideLogout={hideLogout} 
              logout={logout} 
              getRoleLabel={getRoleLabel}
              t={t}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-xl transition-all duration-200"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <RunningText />

      <MobileMenu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        user={user} 
        hideUserInfo={hideUserInfo} 
        filteredMenu={filteredMenu} 
        translateLabel={translateLabel} 
        locale={locale} 
        logout={logout} 
        hideLogout={hideLogout} 
        loginItem={loginItem}
        siteName={siteName}
        getRoleLabel={getRoleLabel}
        t={t}
      />
    </nav>
  );
};
