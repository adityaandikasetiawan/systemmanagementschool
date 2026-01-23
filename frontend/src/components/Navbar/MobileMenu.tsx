import React from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MenuItem } from './types';
import i18n from '../../i18n';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: any | null;
  hideUserInfo: boolean;
  filteredMenu: MenuItem[];
  translateLabel: (label: string) => string;
  locale: string;
  logout: () => void;
  hideLogout: boolean;
  loginItem?: MenuItem;
  siteName: string;
  getRoleLabel: (role?: string) => string;
  t: (key: string, defaultVal?: string) => string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  user,
  hideUserInfo,
  filteredMenu,
  translateLabel,
  locale,
  logout,
  hideLogout,
  loginItem,
  siteName,
  getRoleLabel,
  t
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Menu Content */}
      <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[300px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <span className="font-bold text-lg text-gray-800 tracking-tight block">{t('site.menu.title', 'Menu')}</span>
            <span className="text-xs text-gray-400 font-medium">System Management Sekolah</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-6">
           {/* User Info Mobile */}
           {user && !hideUserInfo && (
            <div className="mt-4 mx-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-white shadow-sm flex items-center justify-center">
                  {user.photo_url ? (
                    <ImageWithFallback src={user.photo_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-base text-[var(--color-primary)] font-bold">
                      {(user.full_name || '?').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{user.full_name}</p>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-[var(--color-primary)] border border-blue-100 uppercase tracking-wider mt-1">
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-1">
            {filteredMenu.map((item, index) => (
              <div key={index} className="border-b border-gray-50 last:border-0 pb-1 mb-1">
                {item.submenu ? (
                  <div className="py-1">
                    <div className="font-semibold text-gray-800 px-3 py-2 text-sm uppercase tracking-wider opacity-70">{translateLabel(item.label)}</div>
                    <div className="pl-3 space-y-0.5 mt-1">
                      {item.submenu.map((subitem, subindex) => (
                        <button
                          key={subindex}
                          onClick={() => {
                            subitem.onClick?.();
                            setIsOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:bg-blue-50/50 rounded-lg transition-all"
                        >
                          {subitem.image ? (
                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                               <ImageWithFallback src={subitem.image} alt={subitem.label} className="w-full h-full object-contain p-0.5" />
                            </div>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                          )}
                          {translateLabel(subitem.label)}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="w-full text-left block px-3 py-3 font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-xl transition-all"
                  >
                    {translateLabel(item.label)}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Language Switcher Mobile */}
          <div className="px-2">
            <label className="text-xs font-semibold text-gray-400 mb-3 block uppercase tracking-wider">{t('common.language', 'Bahasa')}</label>
            <div className="grid grid-cols-2 gap-3">
              {i18n.availableLocales.map((lc) => (
                <button
                  key={lc}
                  onClick={() => {
                    i18n.setLocale(lc as 'id' | 'en');
                    setIsOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                    locale === lc 
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{lc === 'id' ? '🇮🇩' : '🇬🇧'}</span>
                  <span>{lc === 'id' ? 'Indo' : 'English'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50/50">
          {user ? (
            !hideLogout && (
              <button
                onClick={logout}
                className="w-full py-3 px-4 rounded-xl bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <LogIn className="w-4 h-4 rotate-180" />
                <span>{t('common.logout')}</span>
              </button>
            )
          ) : (
             loginItem && (
              <button
                onClick={() => {
                  loginItem.onClick?.();
                  setIsOpen(false);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[var(--color-primary)] text-white hover:opacity-90 hover:shadow-lg hover:shadow-blue-900/20 font-semibold transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>{t('common.login')}</span>
              </button>
            )
          )}
          <p className="text-center text-[10px] text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
