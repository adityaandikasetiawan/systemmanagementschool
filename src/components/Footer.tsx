import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { t } from '../i18n';

interface FooterProps {
  logo?: string;
  siteName: string;
  accentColor?: string;
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ logo, siteName, accentColor = '#1E4AB8', onNavigate = () => {} }) => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {logo && (logo.startsWith('/') || logo.startsWith('http')) ? (
                 <img src={logo} alt={siteName} className="w-12 h-12 object-contain bg-white rounded-xl p-1" />
              ) : (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <span className="text-white text-xl">{logo || '🕌'}</span>
                </div>
              )}
              <h3 className="text-lg">{siteName}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('site.footer.description', "Lembaga pendidikan Islam terpadu yang berkomitmen membentuk generasi Qur'ani, berakhlak mulia, dan berprestasi.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">{t('site.footer.quick_links', 'Quick Links')}</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors text-left">
                  {t('site.footer.links.about', 'Tentang Kami')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="text-gray-400 hover:text-white transition-colors text-left">
                  {t('site.footer.links.programs', 'Program')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="text-gray-400 hover:text-white transition-colors text-left">
                  {t('site.footer.links.news', 'Berita')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="text-gray-400 hover:text-white transition-colors text-left">
                  {t('site.footer.links.gallery', 'Galeri')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career')} className="text-gray-400 hover:text-white transition-colors text-left">
                  {t('site.footer.links.career', 'Karir')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admission')} className="text-gray-400 hover:text-white transition-colors text-left">
                  {t('site.footer.links.admission', 'PPDB')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4">{t('site.footer.contact', 'Kontak')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">{t('site.footer.address', 'Jl. Pendidikan Islam No. 123, Jakarta Selatan')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">info@baituljannah.sch.id</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg mb-4">{t('site.footer.follow_us', 'Follow Us')}</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-2">{t('site.footer.newsletter.title', 'Newsletter')}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('site.footer.newsletter.placeholder', 'Email Anda')}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
                <button className="px-4 py-2 rounded-lg text-sm transition-colors" style={{ backgroundColor: accentColor }}>
                  {t('site.footer.newsletter.button', 'Subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">{t('site.footer.copyright', '© 2025 Yayasan Baituljannah. All rights reserved.')}</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('site.footer.privacy', 'Privacy Policy')}</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('site.footer.terms', 'Terms of Service')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
