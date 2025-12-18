import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { Users, Award, BookOpen, Heart, Target, Eye, Building2, GraduationCap, Shield, Sparkles, CheckCircle, Star, TrendingUp, Zap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SponsorshipBanner } from '../components/SponsorshipBanner';
import { t } from '../i18n';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate = () => {} }) => {
  const menuItems = [
    { label: t('site.menu.home', 'Beranda'), href: '#', onClick: () => onNavigate('main') },
    {
      label: t('site.menu.about', 'Tentang'),
      href: '#',
      submenu: [
        { label: t('site.submenu.vision_mission', 'Visi & Misi'), href: '#', onClick: () => onNavigate('vision-mission') },
        { label: t('site.submenu.curriculum', 'Kurikulum'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.facilities', 'Fasilitas'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.management', 'Kepengurusan'), href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: t('site.menu.profile', 'Profil'),
      href: '#',
      submenu: [
        { label: t('site.submenu.foundation_profile', 'Profil Yayasan'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.history', 'Sejarah'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.organization', 'Struktur Organisasi'), href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: t('site.menu.info', 'Informasi'),
      href: '#',
      submenu: [
        { label: t('site.submenu.news', 'Berita'), href: '#', onClick: () => onNavigate('news') },
        { label: t('site.submenu.gallery', 'Galeri Foto'), href: '#', onClick: () => onNavigate('gallery') },
        { label: t('site.submenu.achievement', 'Prestasi'), href: '#', onClick: () => onNavigate('achievement') },
        { label: t('site.submenu.programs', 'Program'), href: '#', onClick: () => onNavigate('programs') }
      ]
    },
    { label: t('site.menu.career', 'Karir'), href: '#', onClick: () => onNavigate('career') },
    {
      label: t('site.menu.admission', 'SPMB'),
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
    { label: t('site.menu.about', 'Tentang Kami') }
  ];

  const values = [
    {
      icon: BookOpen,
      title: t('about.values.quality.title', 'Pendidikan Berkualitas'),
      description: t('about.values.quality.desc', 'Memberikan pendidikan Islam terpadu dengan standar nasional dan internasional yang unggul'),
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Heart,
      title: t('about.values.compassion.title', 'Kasih Sayang'),
      description: t('about.values.compassion.desc', 'Mendidik dengan penuh kasih sayang dan perhatian terhadap setiap individu siswa'),
      color: '#EF4444',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      icon: Award,
      title: t('about.values.achievement.title', 'Prestasi Gemilang'),
      description: t('about.values.achievement.desc', 'Menghasilkan lulusan yang berprestasi dalam bidang akademik dan non-akademik'),
      color: '#F59E0B',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: Shield,
      title: t('about.values.character.title', 'Karakter Islami'),
      description: t('about.values.character.desc', 'Membentuk karakter yang berakhlakul karimah berdasarkan Al-Quran dan As-Sunnah'),
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  const statistics = [
    { number: '2000+', label: t('about.stats.students_active'), icon: Users, gradient: 'from-blue-500 to-cyan-600' },
    { number: '200+', label: t('about.stats.educators'), icon: GraduationCap, gradient: 'from-green-500 to-emerald-600' },
    { number: '15+', label: t('about.stats.years_experience'), icon: Award, gradient: 'from-orange-500 to-amber-600' },
    { number: '5', label: t('about.stats.units'), icon: Building2, gradient: 'from-purple-500 to-indigo-600' }
  ];

  const facilities = [
    {
      title: t('about.facilities.classrooms.title', 'Ruang Kelas Modern'),
      description: t('about.facilities.classrooms.desc', 'Ruang kelas ber-AC dengan fasilitas multimedia dan kapasitas optimal untuk pembelajaran efektif'),
      icon: Building2,
      color: '#3B82F6'
    },
    {
      title: t('about.facilities.labs.title', 'Laboratorium Lengkap'),
      description: t('about.facilities.labs.desc', 'Lab komputer, sains, dan bahasa dengan peralatan modern untuk praktikum siswa'),
      icon: Zap,
      color: '#10B981'
    },
    {
      title: t('about.facilities.library.title', 'Perpustakaan Digital'),
      description: t('about.facilities.library.desc', 'Perpustakaan dengan koleksi buku lengkap dan akses e-library untuk pembelajaran mandiri'),
      icon: BookOpen,
      color: '#8B5CF6'
    },
    {
      title: t('about.facilities.mosque.title', 'Masjid Megah'),
      description: t('about.facilities.mosque.desc', 'Masjid dengan kapasitas besar untuk ibadah berjamaah dan kegiatan keagamaan'),
      icon: Heart,
      color: '#10B981'
    },
    {
      title: t('about.facilities.sports.title', 'Lapangan Olahraga'),
      description: t('about.facilities.sports.desc', 'Area olahraga lengkap termasuk lapangan futsal, basket, dan fasilitas olahraga lainnya'),
      icon: Target,
      color: '#F97316'
    },
    {
      title: t('about.facilities.canteen.title', 'Kantin Sehat'),
      description: t('about.facilities.canteen.desc', 'Kantin dengan menu halal, bergizi, dan higienis untuk kebutuhan nutrisi siswa'),
      icon: Star,
      color: '#F59E0B'
    }
  ];

  const leadership = [
    {
      name: 'Prof. Dr. H. Ahmad Syaikhu, M.Pd.I',
      position: t('about.leadership.roles.chairman.title', 'Ketua Yayasan'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      description: t('about.leadership.roles.chairman.desc', 'Memimpin yayasan dengan visi pendidikan Islam modern')
    },
    {
      name: 'Dr. Hj. Siti Aisyah, M.Pd',
      position: t('about.leadership.roles.academic_director.title', 'Direktur Akademik'),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      description: t('about.leadership.roles.academic_director.desc', 'Mengembangkan kurikulum terpadu dan berkualitas')
    },
    {
      name: 'Drs. H. Muhammad Ridwan, M.M',
      position: t('about.leadership.roles.finance_director.title', 'Direktur Keuangan'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      description: t('about.leadership.roles.finance_director.desc', 'Mengelola keuangan yayasan secara profesional')
    },
    {
      name: 'Ustadz Ahmad Fauzi, Lc., M.A',
      position: t('about.leadership.roles.islamic_director.title', 'Direktur Keislaman'),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      description: t('about.leadership.roles.islamic_director.desc', 'Membina program keagamaan dan tahfidz')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={t('site.name')}
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="#1E4AB8"
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
              <Building2 className="w-4 h-4" />
              <span>{t('about.hero.badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">{t('about.hero.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{t('about.hero.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl mb-1">{stat.number}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>{t('about.history.badge')}</span>
              </div>
              <h2 className="text-4xl mb-6 text-gray-900">{t('about.history.title')}</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{t('about.history.p1')}</p>
                <p>{t('about.history.p2')}</p>
                <p>{t('about.history.p3')}</p>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <h3 className="text-xl mb-4 text-gray-900">{t('about.commitment.title')}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('about.commitment.items.quality')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('about.commitment.items.character')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('about.commitment.items.facilities')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t('about.commitment.items.achievement')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1699210260060-236da96bc52d"
                  alt="Gedung Baituljannah"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl mb-2">{t('about.campus.title')}</h3>
                  <p className="text-white/90">{t('about.campus.subtitle')}</p>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">200+</p>
                    <p className="text-sm text-gray-600">{t('about.card.achievements_label')}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{t('about.card.achievements_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm mb-6">
              <Heart className="w-4 h-4" />
              <span>{t('about.values.badge', 'Nilai-Nilai Kami')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('about.values.title', 'Pilar Pendidikan Kami')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('about.values.subtitle', 'Empat pilar utama yang menjadi fondasi dalam setiap aspek pendidikan di Baituljannah')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  
                  {/* Islamic Pattern */}
                  <div className="absolute inset-0 islamic-pattern opacity-5"></div>
                  
                  <div className="relative">
                    <div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span>{t('about.facilities.badge', 'Fasilitas Lengkap')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('about.facilities.title', 'Fasilitas Modern')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('about.facilities.subtitle', 'Berbagai fasilitas penunjang pembelajaran yang modern dan lengkap untuk kenyamanan siswa')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: facility.color + '20' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: facility.color }} />
                  </div>
                  <h3 className="text-lg mb-2 text-gray-900">{facility.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522134939204-9b9957145632"
                alt="Pembelajaran di Kelas"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759494706685-7ca176de7e6b"
                alt="Perpustakaan Modern"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm mb-6">
              <Users className="w-4 h-4" />
              <span>{t('about.leadership.badge', 'Tim Kepemimpinan')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('about.leadership.title', 'Kepengurusan Yayasan')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('about.leadership.subtitle', 'Dipimpin oleh profesional berpengalaman yang berdedikasi untuk pendidikan berkualitas')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg mb-1 text-gray-900">{leader.name}</h3>
                  <p className="text-sm text-[#1E4AB8] mb-3">{leader.position}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
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
            <span>{t('about.cta.badge', 'Bergabunglah Bersama Kami')}</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">{t('about.cta.title', 'Jadilah Bagian dari Keluarga Baituljannah')}</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t('about.cta.subtitle', 'Wujudkan impian pendidikan terbaik untuk putra-putri Anda bersama kami')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('admission')} 
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <span>{t('about.cta.button_ppdb', 'Daftar PPDB 2025')}</span>
              <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>{t('about.cta.button_contact', 'Hubungi Kami')}</span>
            </button>
          </div>
        </div>
      </section>

      <SponsorshipBanner onNavigate={onNavigate} />

      <Footer siteName={t('site.name')} accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
};
