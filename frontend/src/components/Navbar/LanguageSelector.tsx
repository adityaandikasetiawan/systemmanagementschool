import React, { useState } from 'react';
import i18n from '../../i18n';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  locale: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`h-9 px-3 rounded-full border flex items-center gap-2 bg-white transition-all duration-200 ${
            isOpen 
              ? 'border-blue-500 text-blue-700 ring-2 ring-blue-100' 
              : 'border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
            <span className="text-[13px] font-semibold">{locale === 'id' ? 'ID' : 'EN'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 pt-2 w-36 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-white shadow-xl rounded-xl p-1.5 border border-gray-100 ring-1 ring-black/5">
                  {i18n.availableLocales.map((lc) => (
                      <button
                          key={lc}
                          onClick={() => {
                            i18n.setLocale(lc as 'id' | 'en');
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all flex items-center justify-between group ${
                            locale === lc 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                          <span>{lc === 'id' ? 'Indonesia' : 'English'}</span>
                          {locale === lc && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                      </button>
                  ))}
              </div>
          </div>
        )}
    </div>
  );
};
