import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeroCarousel } from '../components/HeroCarousel';
import { UnitCard } from '../components/UnitCard';
import { UnitCardCircular } from '../components/UnitCardCircular';
import { ProgramCard } from '../components/ProgramCard';
import { NewsCard } from '../components/NewsCard';
import { BookOpen, Users, Award, Globe, Heart, Star, ArrowRight, Sparkles, Trophy, GraduationCap, Target, TrendingUp, Search, Play } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AchievementCard } from '../components/AchievementCard';
import { api } from '../services/api';
import { t, getLocale } from '../i18n';

interface MainPortalProps {
  onNavigate: (page: string) => void;
}

export const MainPortal: React.FC<MainPortalProps> = ({ onNavigate }) => {
  const dateLocale = getLocale() === 'en' ? 'en-US' : 'id-ID';
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

  const defaultHeroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop',
      title: t('home.hero.slides.foundation.title', 'Yayasan Baituljannah'),
      description: t('home.hero.slides.foundation.description', 'Membentuk Generasi Qur\'ani yang Cerdas, Berakhlak Mulia, dan Berprestasi Global'),
      badge: t('home.hero.slides.foundation.badge', '🕌 Pendidikan Islam Terpadu')
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop',
      title: t('home.hero.slides.quality.title', 'Pendidikan Berkualitas'),
      description: t('home.hero.slides.quality.description', 'Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Quran dan As-Sunnah'),
      badge: t('home.hero.slides.quality.badge', '📚 Kurikulum Terpadu')
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop',
      title: t('home.hero.slides.achievement.title', 'Prestasi Gemilang'),
      description: t('home.hero.slides.achievement.description', 'Ratusan prestasi di tingkat lokal, nasional, dan internasional'),
      badge: t('home.hero.slides.achievement.badge', '🏆 Berprestasi')
    },
    {
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop',
      title: t('home.hero.slides.facilities.title', 'Fasilitas Modern'),
      description: t('home.hero.slides.facilities.description', 'Dilengkapi dengan fasilitas pembelajaran yang modern dan mendukung'),
      badge: t('home.hero.slides.facilities.badge', '🏫 Fasilitas Lengkap')
    },
    {
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1920&h=1080&fit=crop',
      title: t('home.hero.slides.teachers.title', 'Guru Profesional'),
      description: t('home.hero.slides.teachers.description', 'Tenaga pendidik yang kompeten, berpengalaman, dan berdedikasi tinggi'),
      badge: t('home.hero.slides.teachers.badge', '👨‍🏫 Pendidik Berpengalaman')
    }
  ];

  const [heroSlides, setHeroSlides] = useState<any[]>(defaultHeroSlides);
  const [unitsData, setUnitsData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.heroSlides.getAll();
        const list = (res && res.success && res.data) ? (res.data as any[]) : [];
        if (mounted) {
          if (Array.isArray(list) && list.length > 0) {
            setHeroSlides(list);
          } else {
            setHeroSlides(defaultHeroSlides);
          }
        }
      } catch {
        if (mounted) setHeroSlides(defaultHeroSlides);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.units.getAll();
        const list = (res && res.success && res.data) ? (res.data as any[]) : [];
        if (mounted) setUnitsData(Array.isArray(list) ? list : []);
      } catch {
        if (mounted) setUnitsData([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const units = [
    {
      name: 'TKIT',
      fullName: 'TKIT Baituljannah',
      description: 'Pendidikan anak usia dini berbasis Islam dengan metode pembelajaran yang menyenangkan dan mengembangkan potensi anak.',
      domain: 'tkitbaituljannah.sch.id',
      color: '#10B981',
      icon: '🎨',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'SDIT',
      fullName: 'SDIT Baituljannah',
      description: 'Sekolah dasar Islam terpadu dengan kurikulum nasional plus pembelajaran Al-Quran dan pembentukan karakter.',
      domain: 'sditbaituljannah.sch.id',
      color: '#3B82F6',
      icon: '📚',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'SMPIT',
      fullName: 'SMPIT Baituljannah',
      description: 'SMP Islam terpadu yang memadukan ilmu pengetahuan umum dengan nilai-nilai Islam untuk membentuk remaja yang cerdas.',
      domain: 'smpitbaituljannah.sch.id',
      color: '#F97316',
      icon: '💻',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      name: 'SMAIT',
      fullName: 'SMAIT Baituljannah',
      description: 'SMA Islam terpadu yang mempersiapkan siswa untuk meraih prestasi akademik dan non-akademik tingkat nasional.',
      domain: 'smaitbaituljannah.sch.id',
      color: '#8B5CF6',
      icon: '☁️',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'SLBIT',
      fullName: 'SLBIT Baituljannah',
      description: 'Sekolah berasrama khusus untuk santri yang ingin mendalami Al-Quran dengan pendidikan formal yang berkualitas.',
      domain: 'slbitbaituljannah.sch.id',
      color: '#14B8A6',
      icon: '👥',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  const stats = [
    { value: '15+', label: t('about.stats.years_experience', 'Tahun Berpengalaman'), icon: Award, color: 'from-blue-500 to-cyan-500' },
    { value: '250+', label: t('about.stats.educators', 'Tenaga Pendidik'), icon: Users, color: 'from-green-500 to-emerald-500' },
    { value: '2000+', label: t('about.stats.students_active', 'Siswa Aktif'), icon: GraduationCap, color: 'from-purple-500 to-indigo-500' },
    { value: '150+', label: t('programs.highlights.achievements', 'Prestasi Diraih'), icon: Trophy, color: 'from-orange-500 to-amber-500' }
  ];

  const programs = [
    {
      title: t('home.programs.items.tahfidz.title', 'Tahfidz Al-Qur\'an'),
      description: t('home.programs.items.tahfidz.desc', 'Program unggulan menghafal Al-Qur\'an dengan metode mudah, menyenangkan, dan terbukti efektif.'),
      icon: BookOpen,
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: t('home.programs.items.bilingual.title', 'Bilingual Program'),
      description: t('home.programs.items.bilingual.desc', 'Pembelajaran dua bahasa (Arab & Inggris) untuk mempersiapkan generasi global yang Islami.'),
      icon: Globe,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: t('home.programs.items.character.title', 'Character Building'),
      description: t('home.programs.items.character.desc', 'Pembentukan karakter Islami melalui pembiasaan akhlak mulia dalam kehidupan sehari-hari.'),
      icon: Heart,
      color: '#F97316',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      title: t('home.programs.items.academic.title', 'Academic Excellence'),
      description: t('home.programs.items.academic.desc', 'Program akselerasi akademik dengan metode pembelajaran inovatif dan guru berpengalaman.'),
      icon: Star,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  const news = [
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'SMAIT Juara Olimpiade Matematika Nasional 2024',
      date: '15 November 2024',
      category: 'Prestasi',
      excerpt: 'Tim olimpiade SMAIT Baituljannah berhasil meraih medali emas pada kompetisi Olimpiade Matematika tingkat nasional...',
      color: '#8B5CF6'
    },
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Launching Program Tahfidz Intensif 2025',
      date: '10 November 2024',
      category: 'Program',
      excerpt: 'Yayasan Baituljannah meluncurkan program tahfidz intensif dengan target hafalan 30 juz untuk siswa berprestasi...',
      color: '#10B981'
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Workshop Parenting untuk Orang Tua Siswa',
      date: '5 November 2024',
      category: 'Kegiatan',
      excerpt: 'Kegiatan workshop parenting Islami dengan tema "Mendidik Anak di Era Digital" dihadiri 200+ orang tua...',
      color: '#F97316'
    }
  ];

  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState('');
  useEffect(() => {
    let active = true;
    (async () => {
      setLoadingNews(true);
      try {
        const res = await api.news.getLatest({ limit: 5 });
        if (!active) return;
        if (res.success) {
          setLatestNews(res.data || []);
          setNewsError('');
        } else {
          setNewsError(res.message || t('home.news.load_error', 'Gagal memuat berita'));
        }
      } catch {
        if (!active) return;
        setNewsError(t('home.news.load_error', 'Gagal memuat berita'));
      } finally {
        if (active) setLoadingNews(false);
      }
    })();
    return () => { active = false; };
  }, []);
  const displayNews = latestNews.length > 0 ? latestNews : news;

  const whyChooseUs = [
    {
      icon: Target,
      title: t('home.why_choose_us.items.vision.title', 'Visi yang Jelas'),
      description: t('home.why_choose_us.items.vision.desc', 'Membentuk generasi Qurani dengan target hafalan dan prestasi akademik yang terukur')
    },
    {
      icon: Users,
      title: t('home.why_choose_us.items.teachers.title', 'Guru Berkualitas'),
      description: t('home.why_choose_us.items.teachers.desc', 'Tim pendidik profesional, bersertifikat, dan berpengalaman di bidangnya')
    },
    {
      icon: Award,
      title: t('home.why_choose_us.items.achievement.title', 'Prestasi Membanggakan'),
      description: t('home.why_choose_us.items.achievement.desc', 'Ratusan prestasi lokal, nasional, dan internasional di berbagai bidang')
    },
    {
      icon: Heart,
      title: t('home.why_choose_us.items.environment.title', 'Lingkungan Islami'),
      description: t('home.why_choose_us.items.environment.desc', 'Suasana pembelajaran yang kondusif dengan nilai-nilai Islam yang kuat')
    },
    {
      icon: TrendingUp,
      title: t('home.why_choose_us.items.facilities.title', 'Fasilitas Modern'),
      description: t('home.why_choose_us.items.facilities.desc', 'Lab komputer, perpustakaan digital, dan sarana olahraga yang lengkap')
    },
    {
      icon: Globe,
      title: t('home.why_choose_us.items.curriculum.title', 'Kurikulum Global'),
      description: t('home.why_choose_us.items.curriculum.desc', 'Integrasi kurikulum nasional dengan standar internasional dan nilai Islam')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        siteName={t('site.name')}
        siteTagline={t('navbar.tagline', "Sekolahnya Para Juara")}
        accentColor="#1E4AB8"
        menuItems={menuItems}
        hideUserInfo
        hideLogout
        logo="/images/logo/logo-yayasan.jpg"
      />

      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} accentColor="var(--color-secondary)" />

      {/* Unit Schools - Enhanced */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5B4DB5 0%, #7C6FCC 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t('home.units.badge', 'Jenjang Pendidikan')}</span>
            </div>
            {/* <h2 className="text-white mb-4 text-4xl lg:text-5xl">Program Unggulan</h2>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto">
              Lima unit pendidikan terintegrasi dari PAUD hingga SMA untuk perjalanan pendidikan yang berkesinambungan
            </p> */}
            <div className="w-24 h-1 bg-white/50 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 max-w-6xl mx-auto mb-12">
            {unitsData && unitsData.length > 0 ? (
              unitsData.map((u: any, idx: number) => {
                const key = String((u.level || u.name || '')).toLowerCase();
                let displayName = u.name || u.level || 'Unit';
                
                if (key.includes('tkit')) displayName = t('home.units.items.tkit', 'TKIT');
                else if (key.includes('sdit')) displayName = t('home.units.items.sdit', 'SDIT');
                else if (key.includes('smpit')) displayName = t('home.units.items.smpit', 'SMPIT');
                else if (key.includes('smait')) displayName = t('home.units.items.smait', 'SMAIT');
                else if (key.includes('slbit')) displayName = t('home.units.items.slbit', 'SLBIT');
                
                return (
                  <UnitCardCircular
                    key={idx}
                    name={displayName}
                    icon={u.icon || '🏫'}
                    color={u.accent_color || '#3B82F6'}
                    onClick={() => {
                      if (key.includes('tkit')) onNavigate('tkit');
                      else if (key.includes('sdit')) onNavigate('sdit');
                      else if (key.includes('smpit')) onNavigate('smpit');
                      else if (key.includes('smait')) onNavigate('smait');
                      else if (key.includes('slbit')) onNavigate('slbit');
                      else onNavigate('about');
                    }}
                  />
                );
              })
            ) : (
              <>
                <UnitCardCircular
                  name={t('home.units.items.tkit', 'PGIT - TKIT')}
                  icon="/images/logo/logo-tkit.png"
                  color="#10B981"
                  onClick={() => onNavigate('tkit')}
                />
                <UnitCardCircular
                  name={t('home.units.items.sdit', 'SDIT')}
                  icon="/images/logo/logo-sdit.png"
                  color="#3B82F6"
                  onClick={() => onNavigate('sdit')}
                />
                <UnitCardCircular
                  name={t('home.units.items.smpit', 'SMPIT')}
                  icon="/images/logo/logo-smpit.png"
                  color="#003399"
                  onClick={() => onNavigate('smpit')}
                />
                <UnitCardCircular
                  name={t('home.units.items.smait', 'SMAIT')}
                  icon="/images/logo/logo-smait.png"
                  color="#586c7d"
                  onClick={() => onNavigate('smait')}
                />
                <UnitCardCircular
                  name={t('home.units.items.slbit', 'SLBIT')}
                  icon="/images/logo/logo-slbit.png"
                  color="#14B8A6"
                  onClick={() => onNavigate('slbit')}
                />
                <UnitCardCircular
                  name={t('home.units.items.asrama', 'Asrama')}
                  icon="/images/logo/logo-asrama.png"
                  color="#D4AF37"
                  onClick={() => onNavigate('asrama')}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video Profile Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6">
              <Play className="w-4 h-4" />
              <span>{t('home.video.badge', 'Video Profil')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl mb-6">{t('home.video.title', 'Mengenal Lebih Dekat Baitul Jannah')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800">
              <div className="aspect-video relative">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/EMSGkb_-ATI?autoplay=1&mute=1&controls=1&loop=1&playlist=EMSGkb_-ATI&playsinline=1&rel=0" 
                  title="Profil Baitul Jannah Islamic School"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4AB8]/10 rounded-full text-[#1E4AB8] text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>{t('home.why_choose_us.badge', 'Keunggulan Kami')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4">{t('home.why_choose_us.title', 'Mengapa Memilih Baituljannah?')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('home.why_choose_us.subtitle', 'Pendidikan Islam terpadu dengan standar berkualitas tinggi')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 h-full border border-gray-100 hover:border-[#1E4AB8]/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section - Enhanced */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              <span>{t('home.programs.badge', 'Program Unggulan')}</span>
            </div>
            <h2 className="mb-4">{t('home.programs.title', 'Program Pendidikan Kami')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t('home.programs.subtitle', 'Berbagai program unggulan yang dirancang khusus untuk membentuk generasi Qurani yang cerdas dan berkarakter')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div 
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-3">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('programs')}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <span>{t('home.programs.button', 'Lihat Semua Program')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* News Section - New Layout */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Header with Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl lg:text-4xl">{t('home.news.title', 'Berita Dan Kegiatan Sekolah')}</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('home.news.search_placeholder', 'Cari berita...')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E4AB8] transition-colors"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {newsError && (
            <div className="mb-4 text-sm text-red-600">
              {newsError}
            </div>
          )}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              {loadingNews ? (
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
                  <div className="h-64 lg:h-80 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
                  </div>
                </div>
              ) : (
                <div
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300"
                  onClick={() => {
                    const id = (displayNews[0]?.id as any) || null;
                    if (id) {
                      try { localStorage.setItem('bj_news_selected_id', String(id)); } catch {}
                    }
                    onNavigate('news');
                  }}
                >
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <ImageWithFallback
                      src={(displayNews[0]?.image || displayNews[0]?.image_url || '')}
                      alt={(displayNews[0]?.title || '')}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-3 line-clamp-2 group-hover:text-[#1E4AB8] transition-colors cursor-pointer">
                      {displayNews[0]?.title || ''}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span>{t('home.news.meta.by_foundation', 'By Baituljannah')}</span>
                      <span>•</span>
                      <span>{t('home.news.meta.published_on', 'Published On')} {displayNews[0] ? new Date(displayNews[0]?.publish_date || displayNews[0]?.created_at || displayNews[0]?.date || Date.now()).toLocaleDateString(dateLocale) : ''}</span>
                      <span>•</span>
                      <span>{t('home.news.meta.views', 'Views')} 301</span>
                    </div>
                    <p className="text-gray-600 mt-3 leading-relaxed line-clamp-3">
                      {(displayNews[0]?.excerpt || displayNews[0]?.content || '')}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {loadingNews ? (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-5 bg-white rounded-xl border-l-4" style={{ borderColor: '#1E4AB8' }}>
                        <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 mt-2" />
                      </div>
                    ))}
                  </>
                ) : (
                  displayNews.slice(1).map((item, index) => (
                    <div
                      key={index}
                      className="group p-5 bg-white rounded-xl border-l-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                      style={{ borderColor: '#1E4AB8' }}
                      onClick={() => {
                        const id = (item as any)?.id || null;
                        if (id) {
                          try { localStorage.setItem('bj_news_selected_id', String(id)); } catch {}
                        }
                        onNavigate('news');
                      }}
                    >
                      <h4 className="text-lg mb-2 group-hover:text-[#1E4AB8] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>{t('home.news.meta.by_admin', 'By Admin')}</span>
                        <span>•</span>
                        <span>{t('home.news.meta.published_on', 'Published On')} {new Date(item.publish_date || item.created_at || item.date || Date.now()).toLocaleDateString(dateLocale)}</span>
                        <span>•</span>
                        <span>{t('home.news.meta.categories', 'Categories:')} <span style={{ color: '#1E4AB8' }}>{item.category}</span></span>
                        <span>•</span>
                        <span>2-4 {t('home.news.meta.min_read', 'min read')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-8">
                <button
                  onClick={() => onNavigate('news')}
                  className="w-full md:w-auto px-8 py-3 bg-[#5BC0DE] text-white rounded-lg hover:bg-[#46b8d6] transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>{t('home.news.meta.more_button')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Gallery Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 rounded-full text-sm mb-6">
              <Trophy className="w-4 h-4" />
              <span>{t('home.achievement.badge', 'Prestasi Membanggakan')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4">{t('home.achievement.title', 'Siswa Berprestasi')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('home.achievement.subtitle', 'Mencetak generasi juara yang berprestasi di berbagai bidang kompetisi lokal, nasional, dan internasional')}
            </p>
          </div>

          {/* Achievement Cards Carousel */}
          <div className="relative">
            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AchievementCard
                studentName="M. Husein Haekal"
                studentImage="https://images.unsplash.com/photo-1712671556764-583ea336d9a0"
                achievement={t('home.achievement.cards.card1.achievement')}
                competition='"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung'
                rank={t('home.achievement.cards.card1.rank')}
                category={t('home.achievement.cards.card1.category')}
                accentColor="#1E4AB8"
              />
              <AchievementCard
                studentName="Zalika Tsabita Az - Zahra"
                studentImage="https://images.unsplash.com/photo-1634451784126-b9f7282edb1b"
                achievement={t('home.achievement.cards.card2.achievement')}
                competition='"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung'
                rank={t('home.achievement.cards.card2.rank')}
                category={t('home.achievement.cards.card2.category')}
                accentColor="#F97316"
              />
              <AchievementCard
                studentName="Dhoffa Adzellia Khaerani"
                studentImage="https://images.unsplash.com/photo-1760348082270-3a46a3512850"
                achievement={t('home.achievement.cards.card3.achievement')}
                competition='"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung'
                rank={t('home.achievement.cards.card3.rank')}
                category={t('home.achievement.cards.card3.category')}
                accentColor="#10B981"
              />
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="w-12 h-1 bg-[#1E4AB8] rounded-full transition-all"></button>
              <button className="w-8 h-1 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"></button>
              <button className="w-8 h-1 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"></button>
            </div>
          </div>

          {/* Button to Achievement */}
          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('achievement')}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <Trophy className="w-5 h-5" />
              <span>{t('home.achievement.button', 'Lihat Semua Prestasi')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Alumni Universities Section */}
      <section className="section-padding bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>{t('home.alumni.badge', 'Alumni Success Story')}</span>
            </div>
            {/* <h2 className="text-4xl lg:text-5xl mb-4">They Made It! Our Alumni in Top Universities</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Alumni Baituljannah berhasil diterima di berbagai universitas terkemuka di Indonesia dan dunia
            </p> */}
          </div>

          {/* Featured Alumni Success Stories */}


          {/* Universities Grid - Enhanced */}
          <div className="bg-white rounded-3xl shadow-strong p-8 md:p-12 mb-12">
            <h3 className="text-2xl text-center mb-8 text-gray-900">{t('home.alumni.title', 'Universitas Tujuan Alumni Kami')}</h3>
            
            {/* Top Tier Universities */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">{t('home.alumni.top_tier', 'Top Tier Universities')}</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                {/* UI */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img src="/images/university/UI.png" alt="UI" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-center font-medium text-gray-900">{t('home.alumni.universities.ui', 'UI')}</p>
                  </div>
                </div>

                {/* UGM */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img src="/images/university/UGM.webp" alt="UGM" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-center font-medium text-gray-900">{t('home.alumni.universities.ugm', 'UGM')}</p>
                  </div>
                </div>

                {/* IPB */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img src="/images/university/IPB.png" alt="IPB" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-center font-medium text-gray-900">{t('home.alumni.universities.ipb', 'IPB')}</p>
                  </div>
                </div>

                {/* ITB */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img src="/images/university/ITB.png" alt="ITB" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-center font-medium text-gray-900">{t('home.alumni.universities.itb', 'ITB')}</p>
                  </div>
                </div>

                {/* UB */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                      <img src="/images/university/UB.webp" alt="UB" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-center font-medium text-gray-900">{t('home.alumni.universities.ub', 'UB')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Choices */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">{t('home.alumni.popular', 'Popular Choices')}</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UNPAD.webp" alt="UNPAD" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.unpad', 'UNPAD')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UNDIP.png" alt="UNDIP" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.undip', 'UNDIP')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UNAIR.png" alt="UNAIR" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.unair', 'UNAIR')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/ITS.png" alt="ITS" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.its', 'ITS')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UNS.png" alt="UNS" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.uns', 'UNS')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UNILA.png" alt="UNILA" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.unila', 'UNILA')}</p>
                </div>
              </div>
            </div>

            {/* Other Universities */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">{t('home.alumni.other', 'Other Destinations')}</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/Telkom.png" alt="Telkom" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.telkom', 'Telkom')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UIN.png" alt="UIN" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.uin', 'UIN')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UPN.png" alt="UPN" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.upn', 'UPN')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UNES.png" alt="UNNES" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.unnes', 'UNNES')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/UPI.png" alt="UPI" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.upi', 'UPI')}</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform p-2">
                    <img src="/images/university/BINUS.png" alt="BINUS" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('home.alumni.universities.binus', 'BINUS')}</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      

      {/* CTA Section - Enhanced */}
      <section className="section-padding bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t('home.cta.badge', 'Daftar Sekarang')}</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">{t('home.cta.title', 'Bergabunglah dengan Keluarga Baituljannah')}</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t('home.cta.subtitle', 'Daftarkan putra-putri Anda sekarang dan berikan mereka pendidikan terbaik yang mengintegrasikan ilmu dan iman')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('admission')} 
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <span>{t('home.cta.button_admission', 'Daftar PPDB 2025')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>{t('home.cta.button_contact', 'Hubungi Kami')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-[var(--color-primary)] mb-4">{t('home.social.title', 'Ikuti Kami')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.social.subtitle', 'Dapatkan update terbaru melalui media sosial kami')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {['Facebook', 'Instagram', 'YouTube', 'Twitter', 'LinkedIn'].map((platform) => (
              <button
                key={platform}
                className="px-6 py-3 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-xl transition-all"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer siteName={t('site.name')} accentColor="#1E4AB8" onNavigate={onNavigate} logo="/images/logo/logo-yayasan.jpg" />
    </div>
  );
};
