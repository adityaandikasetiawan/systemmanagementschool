import React, { useEffect, useState } from 'react';
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
}

import { t } from '../i18n';
export const Navbar: React.FC<NavbarProps> = ({ logo, siteName, siteTagline = t('navbar.tagline', 'Islamic Education'), accentColor = '#1E4AB8', menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const loginItem = menuItems.find((i) => i.label.toLowerCase() === 'login');
  const filteredMenu = menuItems.filter((i) => i.label.toLowerCase() !== 'login');
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('baituljannah_user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch {}
  }, []);

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
      const homeItem = menuItems.find((i) => i.label.toLowerCase() === 'beranda');
      homeItem?.onClick?.();
      setIsOpen(false);
    } catch {}
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Site Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
              <span className="text-white text-xl">🕌</span>
            </div>
            <div>
              <h1 className="text-xl" style={{ color: accentColor }}>{siteName}</h1>
              <p className="text-xs text-gray-500">{siteTagline}</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {filteredMenu.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-[var(--color-primary)] transition-colors py-2"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                  onClick={item.onClick}
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </button>
                
                {item.submenu && activeSubmenu === item.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white shadow-strong rounded-xl py-2 opacity-100 transition-all"
                    onMouseEnter={() => setActiveSubmenu(item.label)}
                    onMouseLeave={() => setActiveSubmenu(null)}
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
                        {subitem.label}
                      </button>
                    ))}
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
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {t('common.logout')}
                </button>
              </div>
            )}
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
            {filteredMenu.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block py-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.label}
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
                        {subitem.label}
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
                <button
                  onClick={logout}
                  className="w-full mt-2 px-4 py-2 rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
