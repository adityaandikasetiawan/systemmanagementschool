import React from 'react';
import { LogIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MenuItem } from './types';

interface UserActionsProps {
  user: any | null;
  loginItem?: MenuItem;
  hideUserInfo: boolean;
  hideLogout: boolean;
  logout: () => void;
  getRoleLabel: (role?: string) => string;
  t: (key: string) => string;
}

export const UserActions: React.FC<UserActionsProps> = ({ 
  user, 
  loginItem, 
  hideUserInfo, 
  hideLogout, 
  logout, 
  getRoleLabel,
  t 
}) => {
  return (
    <>
      {!user && loginItem && (
        <button
          onClick={() => loginItem.onClick?.()}
          className="flex items-center gap-2 bg-[#1E4AB8] hover:bg-blue-800 text-white px-6 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 shadow-sm"
        >
          <LogIn className="w-4 h-4" />
          <span>{t('common.login')}</span>
        </button>
      )}
      {user && (
        <div className="flex items-center gap-2 pl-1">
          {!hideUserInfo && (
            <div className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 transition-all cursor-pointer group/user">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-50 border border-gray-200 shadow-sm group-hover/user:scale-105 transition-transform">
                {user.photo_url ? (
                  <ImageWithFallback src={user.photo_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-indigo-600">
                    <span className="text-xs font-black">
                      {(user.full_name || '?').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-gray-700 leading-tight group-hover/user:text-[var(--color-primary)] transition-colors">{user.full_name?.split(' ')[0]}</span>
                <span className="text-[9px] font-medium text-gray-400 leading-tight">{getRoleLabel(user.role)}</span>
              </div>
            </div>
          )}
          {!hideLogout && (
            <button
              onClick={logout}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              title={t('common.logout')}
            >
              <LogIn className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
      )}
    </>
  );
};
