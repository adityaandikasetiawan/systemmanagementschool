import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { UnitHeroCarousel } from '../components/UnitHeroCarousel';
import { ProgramCard } from '../components/ProgramCard';
import { NewsCard } from '../components/NewsCard';
import { BookOpen, Users, Award, Calendar, MapPin, Phone, Mail, GraduationCap, Clock, DollarSign, Target, TrendingUp, Star, Trophy, CheckCircle, Building, Microscope, Library } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AchievementCard } from '../components/AchievementCard';
import { t, tf } from '../i18n';

interface UnitSchoolProps {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  description: string;
  onNavigate?: (page: string) => void;
}

export const UnitSchool: React.FC<UnitSchoolProps> = ({
  unitName,
  fullName,
  accentColor,
  icon,
  description,
  onNavigate = () => {}
}) => {
  const menuItems = [
    { label: t('site.menu.home', 'Beranda'), href: '#', onClick: () => {} },
    {
      label: t('site.menu.profile', 'Profil'),
      href: '#',
      submenu: [
        { label: t('site.submenu.about', 'Tentang Kami'), href: '#', onClick: () => {} },
        { label: t('site.submenu.vision_mission', 'Visi & Misi'), href: '#', onClick: () => {} },
        { label: t('site.submenu.facilities', 'Fasilitas'), href: '#', onClick: () => {} }
      ]
    },
    { label: t('site.submenu.programs', 'Kurikulum'), href: '#', onClick: () => {} },
    { label: t('site.menu.teachers', 'Guru & Staff'), href: '#', onClick: () => {} },
    { label: t('site.submenu.news', 'Berita'), href: '#', onClick: () => {} },
    { label: t('site.submenu.gallery', 'Galeri'), href: '#', onClick: () => {} },
    { label: t('site.menu.career', 'Karir'), href: '#', onClick: () => onNavigate('career') },
    { label: t('site.menu.admission', 'PPDB'), href: '#', onClick: () => onNavigate('admission') },
    { label: t('site.menu.contact', 'Kontak'), href: '#', onClick: () => {} },
    { label: t('common.login', 'Login'), href: '#', onClick: () => onNavigate('login') }
  ];

  const programs = [
    {
      title: t('unit_school.programs.items.tahfidz.title', 'Tahfidz Al-Qur\'an'),
      description: t('unit_school.programs.items.tahfidz.desc', 'Program menghafal Al-Qur\'an dengan metode yang mudah dan menyenangkan.'),
      icon: BookOpen,
      color: accentColor
    },
    {
      title: t('unit_school.programs.items.character.title', 'Character Building'),
      description: t('unit_school.programs.items.character.desc', 'Pembentukan karakter Islami melalui pembiasaan akhlak mulia setiap hari.'),
      icon: Users,
      color: accentColor
    },
    {
      title: t('unit_school.programs.items.academic.title', 'Prestasi Akademik'),
      description: t('unit_school.programs.items.academic.desc', 'Pembelajaran berkualitas untuk meraih prestasi akademik terbaik.'),
      icon: Award,
      color: accentColor
    }
  ];

  const teachers = [
    {
      name: 'Ustadz Ahmad Fauzi, S.Pd.I',
      role: t('unit_school.teachers.roles.principal', 'Kepala Sekolah'),
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Ustadzah Siti Aisyah, S.Pd',
      role: t('unit_school.teachers.roles.tahfidz', 'Guru Tahfidz'),
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Ustadz Muhammad Rizki, M.Pd',
      role: t('unit_school.teachers.roles.math', 'Guru Matematika'),
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Ustadzah Fatimah Az-Zahra, S.S',
      role: t('unit_school.teachers.roles.arabic', 'Guru Bahasa Arab'),
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar
        siteName={fullName}
        accentColor={accentColor}
        menuItems={menuItems}
      />

      {/* Back to Portal */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-4">
          <button 
            onClick={() => onNavigate('main')}
            className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"
          >
            <span>←</span> {t('unit_school.back_to_portal', 'Kembali ke Portal Utama')}
          </button>
        </div>
      </div>

      {/* Hero Carousel */}
      <UnitHeroCarousel
        unitName={unitName}
        fullName={fullName}
        accentColor={accentColor}
        icon={icon}
        onCtaClick={() => onNavigate('admission')}
      />

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHN0dWR5aW5nfGVufDF8fHx8MTc2NDMxNzE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt={fullName}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                {t('unit_school.about.badge', 'Tentang Kami')}
              </div>
              <h2 className="mb-4">{tf('unit_school.about.title', { unitName }, `Profil ${unitName}`)}</h2>
              <p className="text-gray-600 mb-6">
                {tf('unit_school.about.description', { fullName }, `${fullName} adalah lembaga pendidikan Islam terpadu yang berkomitmen untuk memberikan pendidikan berkualitas dengan mengintegrasikan kurikulum nasional dan nilai-nilai Islam. Kami fokus pada pengembangan kognitif, afektif, dan psikomotorik siswa secara seimbang.`)}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="mb-1">{t('unit_school.about.items.curriculum.title', 'Kurikulum Terintegrasi')}</h5>
                    <p className="text-gray-600 text-sm">
                      {t('unit_school.about.items.curriculum.desc', 'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="mb-1">{t('unit_school.about.items.teachers.title', 'Tenaga Pendidik Profesional')}</h5>
                    <p className="text-gray-600 text-sm">
                      {t('unit_school.about.items.teachers.desc', 'Guru-guru berkualifikasi dan berpengalaman dalam pendidikan Islam terpadu')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="mb-1">{t('unit_school.about.items.facilities.title', 'Fasilitas Lengkap')}</h5>
                    <p className="text-gray-600 text-sm">
                      {t('unit_school.about.items.facilities.desc', 'Gedung modern, laboratorium, perpustakaan, dan fasilitas pendukung lainnya')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {t('unit_school.programs.badge', 'Program Unggulan')}
            </div>
            <h2 className="mb-4">{t('unit_school.programs.title', 'Program Unggulan Kami')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.programs.subtitle', 'Program-program dirancang khusus untuk mengembangkan potensi siswa secara maksimal')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Kurikulum Section - NEW */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {t('unit_school.curriculum.badge', 'Kurikulum')}
            </div>
            <h2 className="mb-4">{t('unit_school.curriculum.title', 'Kurikulum Terintegrasi')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.curriculum.subtitle', 'Kombinasi sempurna antara kurikulum nasional dan nilai-nilai Islam')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Kurikulum Nasional */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: accentColor }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">{t('unit_school.curriculum.national.title', 'Kurikulum Nasional')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">{t('unit_school.curriculum.national.items.0', 'Kurikulum Merdeka yang adaptif dan inovatif')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">{t('unit_school.curriculum.national.items.1', 'Pembelajaran berbasis project dan problem solving')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">{t('unit_school.curriculum.national.items.2', 'STEAM (Science, Technology, Engineering, Arts, Math)')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">{t('unit_school.curriculum.national.items.3', 'Bahasa Indonesia, Inggris, dan Arab')}</span>
                </li>
              </ul>
            </div>

            {/* Kurikulum Islam */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">{t('unit_school.curriculum.islamic.title', 'Kurikulum Islam')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{t('unit_school.curriculum.islamic.items.0', 'Tahfidz Al-Qur\'an dengan target hafalan bertahap')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{t('unit_school.curriculum.islamic.items.1', 'Aqidah, Fiqih, dan Akhlak dalam kehidupan sehari-hari')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{t('unit_school.curriculum.islamic.items.2', 'Hadits dan Sirah Nabawiyah')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{t('unit_school.curriculum.islamic.items.3', 'Praktik ibadah dan pembiasaan adab Islami')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Jadwal Pembelajaran */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8 text-center">{t('unit_school.schedule.title', 'Jadwal Pembelajaran')}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg">{t('unit_school.schedule.time.title', 'Waktu Belajar')}</h4>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>{t('unit_school.schedule.time.mon_thu', 'Senin - Kamis')}</span>
                    <span className="font-medium">07:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>{t('unit_school.schedule.time.fri', 'Jumat')}</span>
                    <span className="font-medium">07:00 - 11:00 WIB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>{t('unit_school.schedule.time.sat', 'Sabtu')}</span>
                    <span className="font-medium">{t('unit_school.schedule.time.extracurricular', 'Ekstrakurikuler')}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg">{t('unit_school.schedule.focus.title', 'Fokus Pembelajaran')}</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">{t('unit_school.schedule.focus.items.0', 'Character & Leadership Building')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">{t('unit_school.schedule.focus.items.1', 'Critical Thinking & Problem Solving')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">{t('unit_school.schedule.focus.items.2', 'Collaboration & Communication')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section - NEW */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {t('unit_school.facilities.badge', 'Fasilitas')}
            </div>
            <h2 className="mb-4">{t('unit_school.facilities.title', 'Fasilitas Lengkap & Modern')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.facilities.subtitle', 'Didukung fasilitas terbaik untuk mendukung proses belajar mengajar')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ruang Kelas */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558443957-d056622df610"
                  alt="Ruang Kelas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: accentColor }}>
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">{t('unit_school.facilities.items.classroom.title', 'Ruang Kelas')}</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  {t('unit_school.facilities.items.classroom.desc', 'Ruang kelas ber-AC dengan kapasitas 25-30 siswa, dilengkapi smart TV dan sound system')}
                </p>
              </div>
            </div>

            {/* Perpustakaan */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595315343110-9b445a960442"
                  alt="Perpustakaan"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-2">
                    <Library className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">{t('unit_school.facilities.items.library.title', 'Perpustakaan')}</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  {t('unit_school.facilities.items.library.desc', 'Koleksi 5000+ buku, ruang baca nyaman, dan sistem peminjaman digital')}
                </p>
              </div>
            </div>

            {/* Laboratorium */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac"
                  alt="Laboratorium"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center mb-2">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">{t('unit_school.facilities.items.lab.title', 'Laboratorium')}</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  {t('unit_school.facilities.items.lab.desc', 'Lab Komputer, Sains, dan Bahasa dengan peralatan modern dan lengkap')}
                </p>
              </div>
            </div>

            {/* Lapangan Olahraga */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1649182462992-ea644b7f8155"
                  alt="Lapangan"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">Lapangan</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  Lapangan futsal, basket, dan area outdoor untuk kegiatan olahraga
                </p>
              </div>
            </div>
          </div>

          {/* Additional Facilities List */}
          <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8 text-center">{t('unit_school.facilities.additional.title', 'Fasilitas Tambahan')}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">{t('unit_school.facilities.additional.items.mosque.title', 'Masjid/Musholla')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.facilities.additional.items.mosque.desc', 'Tempat ibadah yang nyaman dan bersih')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">{t('unit_school.facilities.additional.items.canteen.title', 'Kantin Sehat')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.facilities.additional.items.canteen.desc', 'Menyediakan makanan bergizi dan halal')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">{t('unit_school.facilities.additional.items.clinic.title', 'Klinik Kesehatan')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.facilities.additional.items.clinic.desc', 'UKS dengan tenaga medis profesional')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">{t('unit_school.facilities.additional.items.wifi.title', 'WiFi & Internet')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.facilities.additional.items.wifi.desc', 'Akses internet cepat di seluruh area')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">{t('unit_school.facilities.additional.items.cctv.title', 'CCTV 24/7')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.facilities.additional.items.cctv.desc', 'Keamanan terpantau sepanjang waktu')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">{t('unit_school.facilities.additional.items.parking.title', 'Parkir Luas')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.facilities.additional.items.parking.desc', 'Area parkir yang aman dan tertata')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Stats - NEW */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {t('unit_school.achievements.badge', 'Prestasi')}
            </div>
            <h2 className="mb-4">{t('unit_school.achievements.title', 'Prestasi & Statistik')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.achievements.subtitle', 'Bukti nyata kualitas pendidikan kami')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">{t('unit_school.achievements.stats.graduation.value', '95%')}</p>
                <p className="text-white/90">{t('unit_school.achievements.stats.graduation.label', 'Lulus UN/USBN')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">50+</p>
                <p className="text-white/90">Prestasi Lomba</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">30 Juz</p>
                <p className="text-white/90">Target Tahfidz</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <Star className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">A</p>
                <p className="text-white/90">Akreditasi</p>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8">{t('unit_school.achievements.list.title', 'Prestasi Terkini')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">{t('unit_school.achievements.list.items.0.title', 'Juara 1 Olimpiade Sains Nasional')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.achievements.list.items.0.desc', 'Tingkat Provinsi - Bidang Matematika')}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('unit_school.achievements.list.items.0.date', 'Desember 2024')}</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">{t('unit_school.achievements.list.items.1.title', 'Juara 2 Kompetisi Hafidz')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.achievements.list.items.1.desc', 'Tingkat Nasional - Kategori 10 Juz')}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('unit_school.achievements.list.items.1.date', 'November 2024')}</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">{t('unit_school.achievements.list.items.2.title', 'Juara 1 Lomba Robotika')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.achievements.list.items.2.desc', 'Tingkat Kota - Line Follower')}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('unit_school.achievements.list.items.2.date', 'Oktober 2024')}</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">{t('unit_school.achievements.list.items.3.title', 'Juara 3 English Competition')}</h5>
                  <p className="text-sm text-gray-600">{t('unit_school.achievements.list.items.3.desc', 'Tingkat Provinsi - Story Telling')}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('unit_school.achievements.list.items.3.date', 'September 2024')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure - NEW */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {t('unit_school.fees.badge', 'Biaya Pendidikan')}
            </div>
            <h2 className="mb-4">{t('unit_school.fees.title', 'Investasi Pendidikan Terbaik')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.fees.subtitle', 'Biaya yang transparan dan kompetitif untuk pendidikan berkualitas')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Biaya Pendaftaran */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <DollarSign className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <h3 className="text-xl">{t('unit_school.fees.registration.title', 'Biaya Pendaftaran')}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">{t('unit_school.fees.registration.form', 'Formulir Pendaftaran')}</span>
                      <span className="font-medium">Rp 300.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">{t('unit_school.fees.registration.entrance_fee', 'Uang Pangkal')}</span>
                      <span className="font-medium">Rp 15.000.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">{t('unit_school.fees.registration.uniform_book', 'Seragam & Buku')}</span>
                      <span className="font-medium">Rp 3.500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-xl px-4">
                      <span className="font-medium">{t('unit_school.fees.registration.total', 'Total Awal')}</span>
                      <span className="text-xl font-semibold" style={{ color: accentColor }}>Rp 18.800.000</span>
                    </div>
                  </div>
                </div>

                {/* Biaya Bulanan */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <Calendar className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <h3 className="text-xl">{t('unit_school.fees.monthly.title', 'Biaya Bulanan')}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">{t('unit_school.fees.monthly.tuition', 'SPP')}</span>
                      <span className="font-medium">Rp 1.500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">{t('unit_school.fees.monthly.catering', 'Catering (Opsional)')}</span>
                      <span className="font-medium">Rp 500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">{t('unit_school.fees.monthly.transport', 'Transportasi (Opsional)')}</span>
                      <span className="font-medium">Rp 400.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-xl px-4">
                      <span className="font-medium">{t('unit_school.fees.monthly.total', 'Per Bulan')}</span>
                      <span className="text-xl font-semibold" style={{ color: accentColor }}>Rp 1.500.000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <Star className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-900">{t('unit_school.fees.discounts.early_bird.title', 'Diskon Pendaftar Awal')}</p>
                      <p className="text-xs text-green-700">{t('unit_school.fees.discounts.early_bird.desc', 'Hingga 20%')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">{t('unit_school.fees.discounts.sibling.title', 'Diskon Kakak Beradik')}</p>
                      <p className="text-xs text-blue-700">{t('unit_school.fees.discounts.sibling.desc', '10% untuk adik')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <Award className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">{t('unit_school.fees.discounts.scholarship.title', 'Beasiswa Prestasi')}</p>
                      <p className="text-xs text-purple-700">{t('unit_school.fees.discounts.scholarship.desc', 'Tersedia')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-900">
                  <strong>Catatan:</strong> {t('unit_school.fees.note', 'Biaya dapat berubah sewaktu-waktu. Silakan hubungi bagian administrasi untuk informasi terkini dan detail cicilan.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {t('unit_school.teachers.badge', 'Tenaga Pendidik')}
            </div>
            <h2 className="mb-4">{t('unit_school.teachers.title', 'Guru & Staff')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.teachers.subtitle', 'Tim pendidik profesional yang berdedikasi untuk pendidikan terbaik')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <div key={index} className="card text-center hover:-translate-y-2">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4" style={{ borderColor: `${accentColor}40` }}>
                  <ImageWithFallback
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="mb-1">{teacher.name}</h5>
                <p className="text-sm text-gray-600">{teacher.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPDB CTA */}
      <section className="section-padding" style={{ background: `linear-gradient(to right, ${accentColor}, #8B5CF6)` }}>
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-12 shadow-strong">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="mb-4">{t('unit_school.ppdb.title', 'Pendaftaran Peserta Didik Baru (PPDB)')}</h2>
                <p className="text-gray-600 mb-6">
                  {tf('unit_school.ppdb.subtitle', 'Bergabunglah dengan keluarga besar {fullName}. Kami membuka pendaftaran untuk tahun ajaran 2025/2026.', { fullName })}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm">{t('unit_school.ppdb.period', 'Periode Pendaftaran')}: <strong>{t('unit_school.ppdb.period_date', '1 Januari - 31 Maret 2025')}</strong></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <Users className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm">{t('unit_school.ppdb.quota', 'Kuota')}: <strong>{t('unit_school.ppdb.quota_value', '120 Siswa')}</strong></p>
                    </div>
                  </div>
                </div>

                <button className="btn-primary" style={{ backgroundColor: accentColor }}>
                  {t('unit_school.ppdb.button', 'Daftar Sekarang')}
                </button>
              </div>

              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760464600453-2aa3b68fd9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzY0MzE3MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="PPDB"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">{t('unit_school.contact.title', 'Hubungi Kami')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('unit_school.contact.subtitle', 'Kami siap membantu menjawab pertanyaan Anda')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <MapPin className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h5 className="mb-2">{t('unit_school.contact.address', 'Alamat')}</h5>
              <p className="text-gray-600 text-sm">
                Jl. Pendidikan Islam No. 123<br />
                Jakarta Selatan, 12345
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <Phone className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h5 className="mb-2">{t('unit_school.contact.phone', 'Telepon')}</h5>
              <p className="text-gray-600 text-sm">
                (021) 1234-5678<br />
                0812-3456-7890
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <Mail className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h5 className="mb-2">{t('unit_school.contact.email', 'Email')}</h5>
              <p className="text-gray-600 text-sm">
                info@{unitName.toLowerCase()}baituljannah.sch.id<br />
                ppdb@{unitName.toLowerCase()}baituljannah.sch.id
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer siteName={fullName} accentColor={accentColor} onNavigate={onNavigate} />
    </div>
  );
};
