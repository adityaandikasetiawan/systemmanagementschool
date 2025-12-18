import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { Image as ImageIcon, X, Download, Share2, ZoomIn, Calendar, Tag, Eye, Grid, List, Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../services/api';
import { t, tf } from '../i18n';

interface GalleryProps {
  onNavigate?: (page: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNavigate = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { label: t('site.menu.home', 'Beranda'), href: '#', onClick: () => onNavigate('main') },
    {
      label: t('site.menu.about', 'Tentang'),
      href: '#',
      submenu: [
        { label: t('site.submenu.foundation_profile', 'Profile Yayasan'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.vision_mission', 'Visi & Misi'), href: '#', onClick: () => onNavigate('vision-mission') },
        { label: t('site.submenu.history', 'Sejarah'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.organization', 'Struktur Organisasi'), href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: t('navbar.units_menu', 'Unit Pendidikan'),
      href: '#',
      submenu: [
        { label: '🎨 ' + t('home.units.items.tkit', 'TKIT Baituljannah'), href: '#', onClick: () => onNavigate('tkit') },
        { label: '📚 ' + t('home.units.items.sdit', 'SDIT Baituljannah'), href: '#', onClick: () => onNavigate('sdit') },
        { label: '🎓 ' + t('home.units.items.smpit', 'SMPIT Baituljannah'), href: '#', onClick: () => onNavigate('smpit') },
        { label: '🏆 ' + t('home.units.items.smait', 'SMAIT Baituljannah'), href: '#', onClick: () => onNavigate('smait') },
        { label: '❤️ ' + t('home.units.items.slbit', 'SLBIT Baituljannah'), href: '#', onClick: () => onNavigate('slbit') }
      ]
    },
    {
      label: t('site.menu.info', 'Informasi'),
      href: '#',
      submenu: [
        { label: t('site.submenu.news', 'Berita'), href: '#', onClick: () => onNavigate('news') },
        { label: t('site.submenu.gallery', 'Galeri'), href: '#', onClick: () => onNavigate('gallery') },
        { label: t('site.submenu.programs', 'Kurikulum'), href: '#', onClick: () => onNavigate('curriculum') },
        { label: t('site.submenu.achievement', 'Prestasi'), href: '#', onClick: () => onNavigate('achievement') }
      ]
    },
    { label: t('site.menu.career', 'Karir'), href: '#', onClick: () => onNavigate('career') },
    {
      label: t('site.menu.admission', 'PPDB'),
      href: '#',
      submenu: [
        { label: t('site.submenu.admission_registration', 'Pendaftaran'), href: '#', onClick: () => onNavigate('admission') },
        { label: t('site.submenu.admission_schedule', 'Jadwal & Alur'), href: '#', onClick: () => onNavigate('admission') },
        { label: t('site.submenu.admission_fee', 'Biaya Pendidikan'), href: '#', onClick: () => onNavigate('admission') }
      ]
    },
    { label: t('site.menu.contact', 'Kontak'), href: '#', onClick: () => onNavigate('contact') }
    ,
    { label: t('common.login', 'Login'), href: '#', onClick: () => onNavigate('login') }
  ];

  const breadcrumbItems = [
    { label: t('menu.home'), onClick: () => onNavigate('main') },
    { label: t('menu.gallery') }
  ];

  const categories = [
    { id: 'Semua', label: t('gallery_page.categories.all'), count: galleryItems.length, color: 'from-gray-500 to-gray-600' },
    { id: 'Kegiatan', label: t('gallery_page.categories.activity'), count: galleryItems.filter(i => i.category === 'Kegiatan').length, color: 'from-blue-500 to-cyan-600' },
    { id: 'Fasilitas', label: t('gallery_page.categories.facility'), count: galleryItems.filter(i => i.category === 'Fasilitas').length, color: 'from-green-500 to-emerald-600' },
    { id: 'Event', label: t('gallery_page.categories.event'), count: galleryItems.filter(i => i.category === 'Event').length, color: 'from-orange-500 to-amber-600' },
    { id: 'Pembelajaran', label: t('gallery_page.categories.learning'), count: galleryItems.filter(i => i.category === 'Pembelajaran').length, color: 'from-pink-500 to-rose-600' }
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.gallery.getAll();
        const list = res && res.success && res.data ? res.data : [];
        const mapped = list.map((g: any) => ({
          id: g.id || Date.now(),
          image: g.image_url,
          title: g.title || '',
          category: g.category || 'Kegiatan',
          date: g.event_date || '',
          views: g.views || 0,
          description: g.description || '',
          color: '#3B82F6'
        }));
        setGalleryItems(mapped);
      } catch {
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredGallery = galleryItems.filter(item => 
    selectedCategory === 'Semua' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        siteName={t('site.name')}
        siteTagline={t('navbar.tagline')}
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gallery-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white"/>
                <circle cx="75" cy="75" r="2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gallery-pattern)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} theme="dark" />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <ImageIcon className="w-4 h-4" />
              <span>{t('gallery_page.hero.badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">{t('gallery_page.hero.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{t('gallery_page.hero.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.id ? 'bg-white/30' : 'bg-gray-200'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'masonry' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Masonry View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Grid View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-gray-600">
            {tf('gallery_page.filter.showing', { count: filteredGallery.length })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredGallery.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'masonry' 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 ${
                    viewMode === 'masonry' && index % 3 === 0 ? 'lg:row-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === 'masonry' && index % 3 === 0 ? 'h-96 lg:h-full' : 'h-64'
                  }`}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-white text-xs mb-3 backdrop-blur-md"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.category}
                        </span>
                        <h3 className="text-white text-lg mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/90 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl text-gray-600 mb-2">{t('gallery_page.filter.empty_title')}</h3>
              <p className="text-gray-500 mb-6">{t('gallery_page.filter.empty_desc')}</p>
              <button
                onClick={() => setSelectedCategory('Semua')}
                className="btn-outline"
              >
                {t('gallery_page.filter.view_all')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-4 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-white text-sm mb-3"
                    style={{ backgroundColor: selectedImage.color }}
                  >
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80 mb-4">{selectedImage.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedImage.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedImage.views} {t('gallery_page.item.views')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer siteName={t('site.name')} accentColor="#1E4AB8" onNavigate={onNavigate} logo="/images/logo/logo-yayasan.jpg" />
    </div>
  );
};
