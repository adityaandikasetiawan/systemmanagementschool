import React, { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ChevronDown, 
  Newspaper, 
  Image, 
  Trophy, 
  Layout, 
  FileText, 
  Users, 
  Building2, 
  History, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  BookOpen,
  Target
} from 'lucide-react';
import { MenuItem } from './types';

interface DesktopMenuProps {
  menuItems: MenuItem[];
  translateLabel: (label: string) => string;
}

// Helper to map labels to icons
const getIconForLabel = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes('berita') || lower.includes('news')) return Newspaper;
  if (lower.includes('galeri') || lower.includes('gallery')) return Image;
  if (lower.includes('prestasi') || lower.includes('achievement')) return Trophy;
  if (lower.includes('program')) return Layout;
  if (lower.includes('visi') || lower.includes('vision')) return Target;
  if (lower.includes('kurikulum') || lower.includes('curriculum')) return BookOpen;
  if (lower.includes('fasilitas') || lower.includes('facilities')) return Building2;
  if (lower.includes('kepengurusan') || lower.includes('management')) return Users;
  if (lower.includes('yayasan') || lower.includes('foundation')) return Building2;
  if (lower.includes('sejarah') || lower.includes('history')) return History;
  if (lower.includes('struktur') || lower.includes('organization')) return FileText;
  if (lower.includes('pendaftaran') || lower.includes('registration')) return FileText;
  if (lower.includes('jadwal') || lower.includes('schedule')) return Calendar;
  if (lower.includes('biaya') || lower.includes('fee')) return DollarSign;
  return ChevronDown; // Default fallback
};

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ menuItems, translateLabel }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex items-center gap-1">
      {menuItems.map((item, index) => (
        <div 
          key={index} 
          className="relative group h-full flex items-center"
          onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          <button
            className={`flex items-center gap-1 text-[13px] font-semibold transition-all duration-300 px-2.5 py-1.5 rounded-full relative group/btn ${
              item.submenu && activeSubmenu === item.label 
                ? 'bg-blue-50 text-[#1E4AB8]' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E4AB8]'
            }`}
            onClick={item.onClick}
          >
            <span>{translateLabel(item.label)}</span>
            {item.submenu && (
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  activeSubmenu === item.label ? 'rotate-180' : 'group-hover/btn:translate-y-0.5'
                }`} 
              />
            )}
          </button>
          
          {item.submenu && activeSubmenu === item.label && (
            <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
               {/* Invisible bridge to prevent closing when moving mouse to dropdown */}
               <div className="absolute -top-4 left-0 right-0 h-6 bg-transparent"></div>
               
               {/* Triangle Tip */}
               <div className="absolute top-0 left-8 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 shadow-[-2px_-2px_5px_rgba(0,0,0,0.03)] z-50"></div>

              <div
                className="bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl p-2 border border-gray-100 ring-1 ring-black/5 overflow-hidden"
              >
                <div className="flex flex-col gap-1">
                  {item.submenu.map((subitem, subindex) => {
                    const Icon = getIconForLabel(subitem.label);
                    return (
                      <button
                        key={subindex}
                        onClick={() => {
                          subitem.onClick?.();
                          setActiveSubmenu(null);
                        }}
                        className="w-full text-left px-4 py-3 text-[13px] font-medium text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white hover:text-[#1E4AB8] transition-all duration-300 rounded-xl group/item flex items-center gap-3 relative overflow-hidden"
                        style={{
                          animationDelay: `${subindex * 50}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-blue-100 group-hover/item:text-[#1E4AB8] transition-colors duration-300 shadow-sm group-hover/item:shadow-md overflow-hidden">
                          {subitem.image ? (
                             <ImageWithFallback src={subitem.image} alt={subitem.label} className="w-full h-full object-contain p-1" />
                          ) : (
                             <Icon className="w-4 h-4" />
                          )}
                        </span>
                        <div className="flex flex-col relative z-10">
                          <span className="leading-none">{translateLabel(subitem.label)}</span>
                        </div>
                        
                        {/* Right Arrow on Hover */}
                        <ChevronDown className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 -rotate-90 text-[#1E4AB8]" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
