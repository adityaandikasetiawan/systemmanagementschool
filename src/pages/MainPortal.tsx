import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeroCarousel } from '../components/HeroCarousel';
import { UnitCard } from '../components/UnitCard';
import { UnitCardCircular } from '../components/UnitCardCircular';
import { ProgramCard } from '../components/ProgramCard';
import { NewsCard } from '../components/NewsCard';
import { BookOpen, Users, Award, Globe, Heart, Star, ArrowRight, Sparkles, Trophy, GraduationCap, Target, TrendingUp, Search } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AchievementCard } from '../components/AchievementCard';

interface MainPortalProps {
  onNavigate: (page: string) => void;
}

export const MainPortal: React.FC<MainPortalProps> = ({ onNavigate }) => {
  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    {
      label: 'Tentang',
      href: '#',
      submenu: [
        { label: 'Profile Yayasan', href: '#', onClick: () => onNavigate('about') },
        { label: 'Visi & Misi', href: '#', onClick: () => onNavigate('vision-mission') },
        { label: 'Sejarah', href: '#', onClick: () => onNavigate('about') },
        { label: 'Struktur Organisasi', href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: 'Unit Pendidikan',
      href: '#',
      submenu: [
        { label: '🎨 TKIT Baituljannah', href: '#', onClick: () => onNavigate('tkit') },
        { label: '📚 SDIT Baituljannah', href: '#', onClick: () => onNavigate('sdit') },
        { label: '🎓 SMPIT Baituljannah', href: '#', onClick: () => onNavigate('smpit') },
        { label: '🏆 SMAIT Baituljannah', href: '#', onClick: () => onNavigate('smait') },
        { label: '❤️ SLBIT Baituljannah', href: '#', onClick: () => onNavigate('slbit') }
      ]
    },
    {
      label: 'Informasi',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate('news') },
        { label: 'Galeri', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Kurikulum', href: '#', onClick: () => onNavigate('programs') },
        { label: 'Prestasi', href: '#', onClick: () => onNavigate('achievement') }
      ]
    },
    { label: 'Karir', href: '#', onClick: () => onNavigate('career') },
    {
      label: 'PPDB',
      href: '#',
      submenu: [
        { label: 'Pendaftaran', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Jadwal & Alur', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Biaya Pendidikan', href: '#', onClick: () => onNavigate('admission') }
      ]
    },
    { label: 'Kontak', href: '#', onClick: () => onNavigate('contact') },
    { label: 'Login', href: '#', onClick: () => onNavigate('login') }
  ];

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop',
      title: 'Yayasan Baituljannah',
      description: 'Membentuk Generasi Qur\'ani yang Cerdas, Berakhlak Mulia, dan Berprestasi Global',
      badge: '🕌 Pendidikan Islam Terpadu'
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop',
      title: 'Pendidikan Berkualitas',
      description: 'Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Quran dan As-Sunnah',
      badge: '📚 Kurikulum Terpadu'
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop',
      title: 'Prestasi Gemilang',
      description: 'Ratusan prestasi di tingkat lokal, nasional, dan internasional',
      badge: '🏆 Berprestasi'
    },
    {
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop',
      title: 'Fasilitas Modern',
      description: 'Dilengkapi dengan fasilitas pembelajaran yang modern dan mendukung',
      badge: '🏫 Fasilitas Lengkap'
    },
    {
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1920&h=1080&fit=crop',
      title: 'Guru Profesional',
      description: 'Tenaga pendidik yang kompeten, berpengalaman, dan berdedikasi tinggi',
      badge: '👨‍🏫 Pendidik Berpengalaman'
    }
  ];

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
    { value: '15+', label: 'Tahun Berpengalaman', icon: Award, color: 'from-blue-500 to-cyan-500' },
    { value: '250+', label: 'Tenaga Pendidik', icon: Users, color: 'from-green-500 to-emerald-500' },
    { value: '2000+', label: 'Siswa Aktif', icon: GraduationCap, color: 'from-purple-500 to-indigo-500' },
    { value: '150+', label: 'Prestasi Diraih', icon: Trophy, color: 'from-orange-500 to-amber-500' }
  ];

  const programs = [
    {
      title: 'Tahfidz Al-Qur\'an',
      description: 'Program unggulan menghafal Al-Qur\'an dengan metode mudah, menyenangkan, dan terbukti efektif.',
      icon: BookOpen,
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Bilingual Program',
      description: 'Pembelajaran dua bahasa (Arab & Inggris) untuk mempersiapkan generasi global yang Islami.',
      icon: Globe,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Character Building',
      description: 'Pembentukan karakter Islami melalui pembiasaan akhlak mulia dalam kehidupan sehari-hari.',
      icon: Heart,
      color: '#F97316',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Academic Excellence',
      description: 'Program akselerasi akademik dengan metode pembelajaran inovatif dan guru berpengalaman.',
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

  const whyChooseUs = [
    {
      icon: Target,
      title: 'Visi yang Jelas',
      description: 'Membentuk generasi Qurani dengan target hafalan dan prestasi akademik yang terukur'
    },
    {
      icon: Users,
      title: 'Guru Berkualitas',
      description: 'Tim pendidik profesional, bersertifikat, dan berpengalaman di bidangnya'
    },
    {
      icon: Award,
      title: 'Prestasi Membanggakan',
      description: 'Ratusan prestasi lokal, nasional, dan internasional di berbagai bidang'
    },
    {
      icon: Heart,
      title: 'Lingkungan Islami',
      description: 'Suasana pembelajaran yang kondusif dengan nilai-nilai Islam yang kuat'
    },
    {
      icon: TrendingUp,
      title: 'Fasilitas Modern',
      description: 'Lab komputer, perpustakaan digital, dan sarana olahraga yang lengkap'
    },
    {
      icon: Globe,
      title: 'Kurikulum Global',
      description: 'Integrasi kurikulum nasional dengan standar internasional dan nilai Islam'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems}
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
              <span>Jenjang Pendidikan</span>
            </div>
            {/* <h2 className="text-white mb-4 text-4xl lg:text-5xl">Program Unggulan</h2>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto">
              Lima unit pendidikan terintegrasi dari PAUD hingga SMA untuk perjalanan pendidikan yang berkesinambungan
            </p> */}
            <div className="w-24 h-1 bg-white/50 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 max-w-6xl mx-auto mb-12">
            <UnitCardCircular
              name="PGIT - TKIT"
              icon="🎨"
              color="#10B981"
              onClick={() => onNavigate('tkit')}
            />
            <UnitCardCircular
              name="SDIT"
              icon="📚"
              color="#3B82F6"
              onClick={() => onNavigate('sdit')}
            />
            <UnitCardCircular
              name="SMPIT"
              icon="💻"
              color="#F97316"
              onClick={() => onNavigate('smpit')}
            />
            <UnitCardCircular
              name="SMAIT"
              icon="☁️"
              color="#8B5CF6"
              onClick={() => onNavigate('smait')}
            />
            <UnitCardCircular
              name="SLBIT"
              icon="👥"
              color="#14B8A6"
              onClick={() => onNavigate('slbit')}
            />
            <UnitCardCircular
              name="Pesantren"
              icon="🕌"
              color="#D4AF37"
              onClick={() => onNavigate('about')}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4AB8]/10 rounded-full text-[#1E4AB8] text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>Keunggulan Kami</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4">Mengapa Memilih Baituljannah?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pendidikan Islam terpadu dengan standar berkualitas tinggi
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
              <span>Program Unggulan</span>
            </div>
            <h2 className="mb-4">Program Pendidikan Kami</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Berbagai program unggulan yang dirancang khusus untuk membentuk generasi Qurani yang cerdas dan berkarakter
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
              <span>Lihat Semua Program</span>
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
            <h2 className="text-3xl lg:text-4xl">Berita Dan Kegiatan Sekolah</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E4AB8] transition-colors"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left - Featured News */}
            <div className="lg:col-span-5">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <ImageWithFallback
                    src={news[0].image}
                    alt={news[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-3 line-clamp-2 group-hover:text-[#1E4AB8] transition-colors cursor-pointer">
                    {news[0].title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span>By Ar Raihan School</span>
                    <span>•</span>
                    <span>Published On {news[0].date}</span>
                    <span>•</span>
                    <span>Views 301</span>
                  </div>
                  <p className="text-gray-600 mt-3 leading-relaxed line-clamp-3">
                    {news[0].excerpt}
                  </p>
                </div>
              </div>
            </div>

            {/* Right - News List */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {news.slice(1).map((item, index) => (
                  <div 
                    key={index}
                    className="group p-5 bg-white rounded-xl border-l-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                    style={{ borderColor: item.color }}
                  >
                    <h4 className="text-lg mb-2 group-hover:text-[#1E4AB8] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>By Juanita Raihan</span>
                      <span>•</span>
                      <span>Published On {item.date}</span>
                      <span>•</span>
                      <span>Categories: <span style={{ color: item.color }}>{item.category}</span></span>
                      <span>•</span>
                      <span>2-4 min read</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="mt-8">
                <button 
                  onClick={() => onNavigate('news')}
                  className="w-full md:w-auto px-8 py-3 bg-[#5BC0DE] text-white rounded-lg hover:bg-[#46b8d6] transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>BERITA KEGIATAN LAINNYA</span>
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
              <span>Prestasi Membanggakan</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4">Siswa Berprestasi</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Mencetak generasi juara yang berprestasi di berbagai bidang kompetisi lokal, nasional, dan internasional
            </p>
          </div>

          {/* Achievement Cards Carousel */}
          <div className="relative">
            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AchievementCard
                studentName="M. Husein Haekal"
                studentImage="https://images.unsplash.com/photo-1712671556764-583ea336d9a0"
                achievement="Peserta Olimpiade Terbaik"
                competition='"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung'
                rank="JUARA 1"
                category="Cerdas Cermat"
                accentColor="#1E4AB8"
              />
              <AchievementCard
                studentName="Zalika Tsabita Az - Zahra"
                studentImage="https://images.unsplash.com/photo-1634451784126-b9f7282edb1b"
                achievement="Pencak Silat Tunggal"
                competition='"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung'
                rank="JUARA 3"
                category="Perwakilan • Tinggi 2 • Tinggi 1"
                accentColor="#F97316"
              />
              <AchievementCard
                studentName="Dhoffa Adzellia Khaerani"
                studentImage="https://images.unsplash.com/photo-1760348082270-3a46a3512850"
                achievement="Pidato Bahasa Inggris"
                competition='"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung'
                rank="JUARA 2"
                category="Perwakilan • Tinggi 2 • Tinggi 3"
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
              <span>Lihat Semua Prestasi</span>
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
              <span>Alumni Success Story</span>
            </div>
            {/* <h2 className="text-4xl lg:text-5xl mb-4">They Made It! Our Alumni in Top Universities</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Alumni Baituljannah berhasil diterima di berbagai universitas terkemuka di Indonesia dan dunia
            </p> */}
          </div>

          {/* Featured Alumni Success Stories */}


          {/* Universities Grid - Enhanced */}
          <div className="bg-white rounded-3xl shadow-strong p-8 md:p-12 mb-12">
            <h3 className="text-2xl text-center mb-8 text-gray-900">Universitas Tujuan Alumni Kami</h3>
            
            {/* Top Tier Universities */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Top Tier Universities</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                {/* UI */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-center font-medium text-gray-900">UI</p>
                    <p className="text-center text-xs text-gray-500 mt-1">25 Alumni</p>
                  </div>
                </div>

                {/* UGM */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-center font-medium text-gray-900">UGM</p>
                    <p className="text-center text-xs text-gray-500 mt-1">32 Alumni</p>
                  </div>
                </div>

                {/* IPB */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-center font-medium text-gray-900">IPB</p>
                    <p className="text-center text-xs text-gray-500 mt-1">18 Alumni</p>
                  </div>
                </div>

                {/* ITB */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-center font-medium text-gray-900">ITB</p>
                    <p className="text-center text-xs text-gray-500 mt-1">22 Alumni</p>
                  </div>
                </div>

                {/* UB */}
                <div className="group relative">
                  <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 group-hover:scale-105">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-center font-medium text-gray-900">UB</p>
                    <p className="text-center text-xs text-gray-500 mt-1">15 Alumni</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Choices */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Popular Choices</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UNPAD</p>
                  <p className="text-xs text-gray-500">12 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UNDIP</p>
                  <p className="text-xs text-gray-500">14 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UNAIR</p>
                  <p className="text-xs text-gray-500">16 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">ITS</p>
                  <p className="text-xs text-gray-500">11 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UNS</p>
                  <p className="text-xs text-gray-500">9 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UNILA</p>
                  <p className="text-xs text-gray-500">20 Alumni</p>
                </div>
              </div>
            </div>

            {/* Other Universities */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Other Destinations</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Telkom</p>
                  <p className="text-xs text-gray-500">8 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UIN</p>
                  <p className="text-xs text-gray-500">24 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UPN</p>
                  <p className="text-xs text-gray-500">7 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UNNES</p>
                  <p className="text-xs text-gray-500">10 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">UPI</p>
                  <p className="text-xs text-gray-500">13 Alumni</p>
                </div>
                <div className="group text-center">
                  <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">BINUS</p>
                  <p className="text-xs text-gray-500">6 Alumni</p>
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
            <span>Daftar Sekarang</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">Bergabunglah dengan Keluarga Baituljannah</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Daftarkan putra-putri Anda sekarang dan berikan mereka pendidikan terbaik yang mengintegrasikan ilmu dan iman
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('admission')} 
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <span>Daftar PPDB 2025</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>Hubungi Kami</span>
            </button>
          </div>
        </div>
      </section>

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
};
