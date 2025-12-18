import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { Trophy, Award, Medal, Filter, Search, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';
import { AchievementCard } from '../components/AchievementCard';
import { t } from '../i18n';

interface AchievementProps {
  onNavigate?: (page: string) => void;
}

export const Achievement: React.FC<AchievementProps> = ({ onNavigate = () => {} }) => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    {
      label: 'Tentang',
      href: '#',
      submenu: [
        { label: 'Visi & Misi', href: '#', onClick: () => onNavigate('vision-mission') },
        { label: 'Kurikulum', href: '#', onClick: () => onNavigate('about') },
        { label: 'Fasilitas', href: '#', onClick: () => onNavigate('about') },
        { label: 'Kepengurusan', href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: 'Profile',
      href: '#',
      submenu: [
        { label: 'Profil Yayasan', href: '#', onClick: () => onNavigate('about') },
        { label: 'Sejarah', href: '#', onClick: () => onNavigate('about') },
        { label: 'Struktur Organisasi', href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: 'Informasi',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate('news') },
        { label: 'Galeri Foto', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Prestasi', href: '#', onClick: () => onNavigate('achievement') },
        { label: 'Program', href: '#', onClick: () => onNavigate('programs') }
      ]
    },
    { label: 'Karir', href: '#', onClick: () => onNavigate('career') },
    {
      label: 'SPMB',
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

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Prestasi Siswa' }
  ];

  const years = ['2025', '2024', '2023', '2022'];
  const categories = [
    { name: 'Semua', count: 24, icon: Star },
    { name: 'Olimpiade', count: 8, icon: Trophy },
    { name: 'Olahraga', count: 6, icon: Medal },
    { name: 'Seni & Budaya', count: 5, icon: Award },
    { name: 'Tahfidz', count: 3, icon: Star },
    { name: 'Sains', count: 2, icon: Trophy }
  ];

  const achievements = [
    {
      studentName: "M. Husein Haekal",
      studentImage: "https://images.unsplash.com/photo-1712671556764-583ea336d9a0",
      achievement: "Peserta Olimpiade Terbaik",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 1",
      category: "Olimpiade",
      accentColor: "#1E4AB8",
      year: "2025"
    },
    {
      studentName: "Zalika Tsabita Az - Zahra",
      studentImage: "https://images.unsplash.com/photo-1634451784126-b9f7282edb1b",
      achievement: "Pencak Silat Tunggal",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 3",
      category: "Olahraga",
      accentColor: "#F97316",
      year: "2025"
    },
    {
      studentName: "Dhoffa Adzellia Khaerani",
      studentImage: "https://images.unsplash.com/photo-1760348082270-3a46a3512850",
      achievement: "Pidato Bahasa Inggris",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 2",
      category: "Seni & Budaya",
      accentColor: "#10B981",
      year: "2025"
    },
    {
      studentName: "Ahmad Fauzan",
      studentImage: "https://images.unsplash.com/photo-1628887590437-940b8e74e43a",
      achievement: "Tahfidz 30 Juz",
      competition: "Wisuda Tahfidz Nasional 2025",
      rank: "JUARA 1",
      category: "Tahfidz",
      accentColor: "#8B5CF6",
      year: "2025"
    },
    {
      studentName: "Siti Aisyah Ramadhani",
      studentImage: "https://images.unsplash.com/photo-1763627556329-a038d29d4f62",
      achievement: "Matematika Tingkat Nasional",
      competition: "Olimpiade Sains Nasional (OSN) 2024",
      rank: "JUARA 1",
      category: "Sains",
      accentColor: "#3B82F6",
      year: "2024"
    },
    {
      studentName: "Muhammad Rizki",
      studentImage: "https://images.unsplash.com/photo-1712671556764-583ea336d9a0",
      achievement: "Renang Gaya Bebas 100m",
      competition: "POPDA Tingkat Provinsi 2024",
      rank: "JUARA 2",
      category: "Olahraga",
      accentColor: "#14B8A6",
      year: "2024"
    },
    {
      studentName: "Fatimah Az-Zahra",
      studentImage: "https://images.unsplash.com/photo-1634451784126-b9f7282edb1b",
      achievement: "Kaligrafi Arab",
      competition: "Festival Seni Islam Tingkat Nasional 2024",
      rank: "JUARA 1",
      category: "Seni & Budaya",
      accentColor: "#F97316",
      year: "2024"
    },
    {
      studentName: "Hafiz Abdullah",
      studentImage: "https://images.unsplash.com/photo-1628887590437-940b8e74e43a",
      achievement: "Hafiz Cilik 15 Juz",
      competition: "Musabaqah Hifdzil Quran Tingkat Kota 2024",
      rank: "JUARA 2",
      category: "Tahfidz",
      accentColor: "#8B5CF6",
      year: "2024"
    },
    {
      studentName: "Naila Syahrani",
      studentImage: "https://images.unsplash.com/photo-1760348082270-3a46a3512850",
      achievement: "Fisika Eksperimen",
      competition: "Science Fair Internasional 2024",
      rank: "JUARA 3",
      category: "Sains",
      accentColor: "#3B82F6",
      year: "2024"
    }
  ];

  const filteredAchievements = achievements.filter(item => {
    const matchYear = selectedYear === 'Semua' || item.year === selectedYear;
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.achievement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchYear && matchCategory && matchSearch;
  });

  // Stats untuk achievement
  const stats = [
    { label: 'Total Prestasi', value: achievements.length, icon: Trophy, color: 'from-yellow-500 to-amber-600' },
    { label: 'Juara 1', value: achievements.filter(a => a.rank.includes('1')).length, icon: Trophy, color: 'from-blue-500 to-cyan-600' },
    { label: 'Juara 2', value: achievements.filter(a => a.rank.includes('2')).length, icon: Award, color: 'from-purple-500 to-indigo-600' },
    { label: 'Juara 3', value: achievements.filter(a => a.rank.includes('3')).length, icon: Medal, color: 'from-orange-500 to-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        siteName={t('site.name')}
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} theme="dark" />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <Trophy className="w-4 h-4" />
              <span>Hall of Fame</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Prestasi Siswa</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Membanggakan prestasi gemilang para siswa Baituljannah di berbagai kompetisi tingkat lokal, nasional, dan internasional
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40 border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama siswa atau prestasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1E4AB8] transition-colors"
              />
            </div>

            {/* Year Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <button
                onClick={() => setSelectedYear('Semua')}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  selectedYear === 'Semua'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Semua Tahun</span>
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === cat.name
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.name ? 'bg-white/30' : 'bg-gray-200'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-gray-600">
            Menampilkan <strong>{filteredAchievements.length}</strong> prestasi
          </div>
        </div>
      </section>

      {/* Achievement Cards Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredAchievements.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.map((achievement, index) => (
                <AchievementCard
                  key={index}
                  studentName={achievement.studentName}
                  studentImage={achievement.studentImage}
                  achievement={achievement.achievement}
                  competition={achievement.competition}
                  rank={achievement.rank}
                  category={achievement.category}
                  accentColor={achievement.accentColor}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl text-gray-600 mb-2">Tidak ada prestasi ditemukan</h3>
              <p className="text-gray-500 mb-6">Coba ubah filter atau pencarian Anda</p>
              <button
                onClick={() => {
                  setSelectedYear('2025');
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="btn-outline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Bergabunglah Bersama Kami</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">Raih Prestasi Gemilangmu</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Daftarkan putra-putri Anda dan wujudkan potensi terbaiknya bersama Baituljannah
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

      <Footer siteName={t('site.name')} accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
};
