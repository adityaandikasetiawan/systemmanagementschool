import React, { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LogoProps {
  logo?: string;
  siteName: string;
  siteTagline?: string;
  accentColor?: string;
  locale?: string;
}

export const Logo: React.FC<LogoProps> = ({ logo, siteName, siteTagline, accentColor, locale }) => {
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

    const targetWidth = nameWidth;
    const delta = targetWidth - tagWidth;
    if (chars < 2) {
      setTaglineSpacing(0);
      return;
    }

    const gaps = chars - 1;
    const spacingPx = Math.max(delta / gaps, 0);
    setTaglineSpacing(spacingPx);

    requestAnimationFrame(() => {
      const targetW = nameEl.getBoundingClientRect().width;
      const currentTagW = tagEl.getBoundingClientRect().width;
      const remain = targetW - currentTagW;
      if (remain > 0.5) {
        const add = remain / gaps;
        setTaglineSpacing((prev) => prev + add);
      }
    });
  };

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [logo]);

  useEffect(() => {
    recalcSpacing();
  }, [siteName, siteTagline, locale]);

  useEffect(() => {
    const onResize = () => recalcSpacing();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="flex items-center gap-3 md:gap-4 group cursor-pointer select-none">
      {logo && (logo.startsWith('/') || logo.startsWith('http')) && !imgError ? (
         <div className="relative flex-shrink-0">
           <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <ImageWithFallback 
             src={logo} 
             alt={siteName} 
             className="relative w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm" 
           />
         </div>
      ) : (
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-blue-900/20" style={{ backgroundColor: accentColor }}>
          <span className="text-white text-2xl md:text-3xl font-bold">{siteName.charAt(0)}</span>
        </div>
      )}
      <div className="flex flex-col justify-center">
        <h1 ref={nameRef} className="text-lg md:text-xl font-black leading-tight tracking-tight text-[#1E4AB8] transition-colors duration-300 group-hover:text-blue-700">
          {siteName}
        </h1>
        {siteTagline && (
          <div className="w-[0px] overflow-visible relative mt-1 hidden md:block">
            <p ref={taglineRef} className="text-[10px] text-gray-500 leading-none font-bold tracking-wider uppercase opacity-80 whitespace-nowrap" style={{ letterSpacing: taglineSpacing ? `${taglineSpacing}px` : undefined, transform: 'scale(0.6)', transformOrigin: 'top left' }}>
              {siteTagline}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
