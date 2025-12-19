import React, { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../services/api';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  onClick?: () => void;
  submenu?: { label: string; href: string; onClick?: () => void }[];
}

interface NavbarProps {
  logo?: string;
  siteName: string;
  siteTagline?: string;
  accentColor?: string;
  menuItems: MenuItem[];
  hideUserInfo?: boolean;
  hideLogout?: boolean;
}

import { t } from '../i18n';
import i18n from '../i18n';
export const Navbar: React.FC<NavbarProps> = ({ logo, siteName, siteTagline = t('navbar.tagline', 'Islamic Education'), accentColor = '#1E4AB8', menuItems, hideUserInfo = false, hideLogout = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
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

  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const [taglineSpacing, setTaglineSpacing] = useState<number>(0);

  const recalcSpacing = () => {
    const nameEl = nameRef.current;
    const tagEl = taglineRef.current;
    if (!nameEl || !tagEl) return;
    const nameWidth = nameEl.getBoundingClientRect().width;
    const tagWidth = tagEl.getBoundingClientRect().width;
    const rawText = tagEl.textContent || '';
    const chars = Math.max(rawText.length, 2);

    const pxPerCm = 96 / 2.54;
    const extraTotalPx = pxPerCm * 2;
    const targetWidth = nameWidth + extraTotalPx;
    const delta = targetWidth - tagWidth;
    if (chars < 2) {
      setTaglineSpacing(0);
      return;
    }

    const gaps = chars - 1;
    const spacingPx = Math.max(delta / gaps, 1.5);
    setTaglineSpacing(spacingPx);

    requestAnimationFrame(() => {
      const targetW = nameEl.getBoundingClientRect().width + extraTotalPx;
      const currentTagW = tagEl.getBoundingClientRect().width;
      const remain = targetW - currentTagW;
      if (remain > 0.5) {
        const add = remain / gaps;
        setTaglineSpacing((prev) => prev + add);
      }
    });
  };

  useEffect(() => {
    recalcSpacing();
  }, [siteName, siteTagline, locale]);

  useEffect(() => {
    const onResize = () => recalcSpacing();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Site Name */}
          <div className="flex items-center gap-3">
            {logo && (logo.startsWith('/') || logo.startsWith('http')) ? (
               <img src={logo} alt={siteName} className="w-12 h-12 object-contain rounded-xl" />
            ) : (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <span className="text-white text-xl">{logo || '🕌'}</span>
              </div>
            )}
            <div>
              <h1 ref={nameRef} className="text-xl" style={{ color: accentColor }}>{siteName}</h1>
              <p ref={taglineRef} className="text-xs text-gray-500" style={{ letterSpacing: taglineSpacing ? `${taglineSpacing}px` : undefined }}>{siteTagline}</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {filteredMenu.map((item, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-[var(--color-primary)] transition-colors py-2"
                  onClick={item.onClick}
                >
                  {translateLabel(item.label)}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </button>
                
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-48 z-50">
                    <div
                      className="bg-white shadow-strong rounded-xl py-2 opacity-100 transition-all border border-gray-100"
                    >
                      {item.submenu.map((subitem, subindex) => (
                        <button
                          key={subindex}
                          onClick={() => {
                            subitem.onClick?.();
                            setActiveSubmenu(null);
                          }}
                          className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
                        >
                          {translateLabel(subitem.label)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {!user && loginItem && (
              <button
                onClick={() => loginItem.onClick?.()}
                className="px-4 py-2 rounded-xl text-sm bg-[var(--color-primary)] text-white hover:opacity-90 transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('common.login')}</span>
              </button>
            )}
            {user && (
              <div className="flex items-center gap-3">
                {!hideUserInfo && (
                  <>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {user.photo_url ? (
                        <ImageWithFallback src={user.photo_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-600">
                          {(user.full_name || '?').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-gray-50 text-sm text-gray-700">
                      <span>{user.full_name}</span>
                      <span className="mx-2">·</span>
                      <span className="text-gray-500">{getRoleLabel(user.role)}</span>
                    </div>
                  </>
                )}
                {!hideLogout && (
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {t('common.logout')}
                  </button>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              <select
                value={locale}
                onChange={(e) => i18n.setLocale(e.target.value as 'id' | 'en')}
                className="px-2 py-1 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
              >
                {i18n.availableLocales.map((lc) => (
                  <option key={lc} value={lc}>{lc.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="mb-2">
              <select
                value={locale}
                onChange={(e) => i18n.setLocale(e.target.value as 'id' | 'en')}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
              >
                {i18n.availableLocales.map((lc) => (
                  <option key={lc} value={lc}>{lc.toUpperCase()}</option>
                ))}
              </select>
            </div>
            {filteredMenu.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block py-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                >
                  {translateLabel(item.label)}
                </button>
                {item.submenu && (
                  <div className="pl-4">
                    {item.submenu.map((subitem, subindex) => (
                      <button
                        key={subindex}
                        onClick={() => {
                          subitem.onClick?.();
                          setIsOpen(false);
                        }}
                        className="w-full text-left block py-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {translateLabel(subitem.label)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="btn-primary w-full mt-4">{t('navbar.ppdb_cta')}</button>
            {!user && loginItem && (
              <button
                onClick={() => {
                  loginItem.onClick?.();
                  setIsOpen(false);
                }}
                className="w-full mt-2 px-4 py-2 rounded-xl text-sm bg-[var(--color-primary)] text-white hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('common.login')}</span>
              </button>
            )}
            {user && (
              <div className="mt-3">
                {!hideUserInfo && (
                  <div className="px-3 py-2 rounded-xl bg-gray-50 text-sm text-gray-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {user.photo_url ? (
                        <ImageWithFallback src={user.photo_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-600">
                          {(user.full_name || '?').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span>{user.full_name}</span>
                      <span className="ml-2 text-gray-500">{getRoleLabel(user.role)}</span>
                    </div>
                  </div>
                )}
                {!hideLogout && (
                  <button
                    onClick={logout}
                    className="w-full mt-2 px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
