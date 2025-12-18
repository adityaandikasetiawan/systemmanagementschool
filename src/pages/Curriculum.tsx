import React from 'react';
import ReactMarkdown from 'react-markdown';
import curriculumMd from '../content/curriculum.md?raw';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { BookOpen, Award, Star, Target, Shield, Users, CheckCircle, Brain, Globe, Heart } from 'lucide-react';
import { t } from '../i18n';

interface CurriculumProps {
  onNavigate?: (page: string) => void;
}

export const Curriculum: React.FC<CurriculumProps> = ({ onNavigate = () => {} }) => {
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
        { label: t('home.units.items.smait', 'SMAIT Baituljannah'), href: '#', onClick: () => onNavigate('smait') },
        { label: t('home.units.items.slbit', 'SLBIT Baituljannah'), href: '#', onClick: () => onNavigate('slbit') }
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
    { label: t('site.menu.contact', 'Kontak'), href: '#', onClick: () => onNavigate('contact') },
    { label: t('common.login', 'Login'), href: '#', onClick: () => onNavigate('login') }
  ];

  const breadcrumbItems = [
    { label: t('site.menu.home', 'Beranda'), onClick: () => onNavigate('main') },
    { label: t('site.submenu.programs', 'Kurikulum') }
  ];

  const curriculumPillars = [
    {
      title: 'Kurikulum Nasional',
      description: 'Menerapkan Kurikulum Merdeka dan K13 yang terintegrasi dengan nilai-nilai keislaman untuk membentuk kompetensi akademik yang unggul.',
      icon: BookOpen,
      color: 'blue',
      features: ['Standar Kompetensi Nasional', 'Pembelajaran Aktif & Kreatif', 'Pengembangan Literasi & Numerasi']
    },
    {
      title: 'Kurikulum Islam Terpadu (JSIT)',
      description: 'Mengadopsi standar kurikulum Jaringan Sekolah Islam Terpadu untuk pembentukan karakter dan akhlak mulia.',
      icon: Star,
      color: 'green',
      features: ['Bina Pribadi Islami (BPI)', 'Pembiasaan Ibadah', 'Pendidikan Karakter']
    },
    {
      title: 'Kurikulum Khas Baituljannah',
      description: 'Program unggulan yang dirancang khusus untuk mengembangkan potensi unik setiap peserta didik.',
      icon: Target,
      color: 'purple',
      features: ['Tahfidz Al-Quran', 'Bahasa Arab & Inggris', 'Enterpreneurship']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar menuItems={menuItems} onNavigate={onNavigate} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                Kurikulum Terpadu
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami memadukan Kurikulum Nasional, Kurikulum Jaringan Sekolah Islam Terpadu (JSIT), 
              dan Kurikulum Khas Baituljannah untuk melahirkan generasi yang cerdas, berkarakter, 
              dan berwawasan global.
            </p>
          </div>

          {/* Markdown Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-16">
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <ReactMarkdown>{curriculumMd}</ReactMarkdown>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {curriculumPillars.map((pillar, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${pillar.color}-50`}>
                  <pillar.icon className={`w-7 h-7 text-${pillar.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {pillar.description}
                </p>
                <ul className="space-y-3">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className={`w-4 h-4 text-${pillar.color}-500`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="space-y-20">
            {/* Academic Section */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                  <Brain className="w-4 h-4" />
                  Akademik Unggul
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pendekatan Saintifik & Holistik</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Proses pembelajaran dirancang untuk menstimulasi kemampuan berpikir kritis, kreatif, kolaboratif, dan komunikatif (4C). Kami menggunakan pendekatan saintifik yang mendorong siswa untuk mengamati, menanya, mencoba, menalar, dan mengkomunikasikan.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Project Based Learning</h4>
                    <p className="text-xs text-gray-500">Pembelajaran berbasis proyek nyata</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Inquiry Learning</h4>
                    <p className="text-xs text-gray-500">Menemukan pengetahuan secara mandiri</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Academic Activity" 
                  className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
                />
              </div>
            </div>

            {/* Islamic Section */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Islamic Learning" 
                  className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
                />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Karakter Qur'ani
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Integrasi Nilai Islam</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Setiap mata pelajaran terintegrasi dengan nilai-nilai Al-Qur'an dan As-Sunnah. Program pembiasaan ibadah harian dan pembinaan akhlak menjadi pondasi utama dalam membentuk karakter siswa yang sholeh dan musleh.
                </p>
                <ul className="space-y-4">
                  {[
                    'Target Hafalan Al-Qur\'an (Tahfidz)',
                    'Pembiasaan Shalat Dhuha & Dzuhur Berjamaah',
                    'Mentoring / Bina Pribadi Islami (BPI)',
                    'Pembelajaran Bahasa Arab Intensif'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Global Section */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  Wawasan Global
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap Menghadapi Masa Depan</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Kami mempersiapkan siswa dengan keterampilan abad 21, penguasaan bahasa asing (Inggris & Arab), dan literasi digital yang kuat agar mampu bersaing di kancah global tanpa kehilangan jati diri sebagai muslim.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['English Club', 'Coding & Robotics', 'Science Club', 'Public Speaking', 'Leadership Camp'].map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Global Skills" 
                  className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-3xl font-bold mb-6 relative z-10">Bergabunglah Bersama Kami</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Daftarkan putra-putri Anda dan jadilah bagian dari keluarga besar Sekolah Islam Terpadu Baituljannah.
            </p>
            <button 
              onClick={() => onNavigate('admission')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg relative z-10"
            >
              Daftar Sekarang
            </button>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
