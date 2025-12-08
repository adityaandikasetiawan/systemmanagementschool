import React, { useState } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { t } from '../i18n';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  submenu?: { label: string; href: string; onClick?: () => void; section?: string }[];
  badge?: string;
  section?: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  accentColor?: string;
  userRole: string;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  accentColor = '#1E4AB8',
  userRole,
  userName
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <aside className="w-64 bg-white h-screen sticky top-0 shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <span className="text-white text-lg">🕌</span>
          </div>
          <div>
            <h3 className="text-sm">{t('sidebar.title')}</h3>
            <p className="text-xs text-gray-500">{t('sidebar.brand')}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openSubmenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSubmenu === item.label && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex}>
                          {subitem.onClick ? (
                            <button
                              onClick={subitem.onClick}
                              className="w-full text-left block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {subitem.label}
                            </button>
                          ) : (
                            <a
                              href={subitem.href}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {subitem.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
