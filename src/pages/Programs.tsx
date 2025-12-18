import { 
  BookOpen, 
  Users, 
  Award, 
  Star, 
  Globe, 
  Heart, 
  Zap, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Lightbulb, 
  Target, 
  Shield
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t, tf } from '../i18n';

interface ProgramsProps {
  onNavigate?: (page: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onNavigate = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    { label: t('site.menu.home'), onClick: () => onNavigate('main') },
    { label: t('programs_page.hero.badge') }
  ];

  const categories = [
    { id: 'all', name: t('programs_page.categories.all'), icon: Star, count: 12 },
    { id: 'academic', name: t('programs_page.categories.academic'), icon: BookOpen, count: 2 },
    { id: 'religious', name: t('programs_page.categories.religious'), icon: Heart, count: 3 },
    { id: 'extracurricular', name: t('programs_page.categories.extracurricular'), icon: Zap, count: 3 },
    { id: 'development', name: t('programs_page.categories.development'), icon: TrendingUp, count: 4 }
  ];

  const programs = [
    {
      icon: BookOpen,
      title: t('programs_page.items.tahfidz.title'),
      description: t('programs_page.items.tahfidz.desc'),
      categoryId: 'religious',
      features: t('programs_page.items.tahfidz.features', { returnObjects: true }) as string[],
      color: '#10B981',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: Globe,
      title: t('programs_page.items.language.title'),
      description: t('programs_page.items.language.desc'),
      categoryId: 'academic',
      features: t('programs_page.items.language.features', { returnObjects: true }) as string[],
      color: '#3B82F6',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Award,
      title: t('programs_page.items.olympiad.title'),
      description: t('programs_page.items.olympiad.desc'),
      categoryId: 'academic',
      features: t('programs_page.items.olympiad.features', { returnObjects: true }) as string[],
      color: '#F97316',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      icon: Heart,
      title: t('programs_page.items.character.title'),
      description: t('programs_page.items.character.desc'),
      categoryId: 'development',
      features: t('programs_page.items.character.features', { returnObjects: true }) as string[],
      color: '#8B5CF6',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    {
      icon: Users,
      title: t('programs_page.items.leadership.title'),
      description: t('programs_page.items.leadership.desc'),
      categoryId: 'development',
      features: t('programs_page.items.leadership.features', { returnObjects: true }) as string[],
      color: '#14B8A6',
      bgGradient: 'from-teal-50 to-cyan-50'
    },
    {
      icon: Star,
      title: t('programs_page.items.tahsin.title'),
      description: t('programs_page.items.tahsin.desc'),
      categoryId: 'religious',
      features: t('programs_page.items.tahsin.features', { returnObjects: true }) as string[],
      color: '#10B981',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      icon: Lightbulb,
      title: t('programs_page.items.robotics.title'),
      description: t('programs_page.items.robotics.desc'),
      categoryId: 'extracurricular',
      features: t('programs_page.items.robotics.features', { returnObjects: true }) as string[],
      color: '#F59E0B',
      bgGradient: 'from-yellow-50 to-amber-50'
    },
    {
      icon: Target,
      title: t('programs_page.items.counseling.title'),
      description: t('programs_page.items.counseling.desc'),
      categoryId: 'development',
      features: t('programs_page.items.counseling.features', { returnObjects: true }) as string[],
      color: '#6366F1',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      icon: Zap,
      title: t('programs_page.items.sports_arts.title'),
      description: t('programs_page.items.sports_arts.desc'),
      categoryId: 'extracurricular',
      features: t('programs_page.items.sports_arts.features', { returnObjects: true }) as string[],
      color: '#EF4444',
      bgGradient: 'from-red-50 to-rose-50'
    },
    {
      icon: Shield,
      title: t('programs_page.items.kitab.title'),
      description: t('programs_page.items.kitab.desc'),
      categoryId: 'religious',
      features: t('programs_page.items.kitab.features', { returnObjects: true }) as string[],
      color: '#10B981',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: BookOpen,
      title: t('programs_page.items.entrepreneur.title'),
      description: t('programs_page.items.entrepreneur.desc'),
      categoryId: 'extracurricular',
      features: t('programs_page.items.entrepreneur.features', { returnObjects: true }) as string[],
      color: '#F97316',
      bgGradient: 'from-orange-50 to-yellow-50'
    },
    {
      icon: Globe,
      title: t('programs_page.items.study_tour.title'),
      description: t('programs_page.items.study_tour.desc'),
      categoryId: 'development',
      features: t('programs_page.items.study_tour.features', { returnObjects: true }) as string[],
      color: '#3B82F6',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.categoryId === selectedCategory);

  const highlights = [
    { number: '50+', label: t('programs_page.highlights.available_programs'), icon: BookOpen, color: 'from-blue-500 to-cyan-600' },
    { number: '100%', label: t('programs_page.highlights.active_students'), icon: Users, color: 'from-green-500 to-emerald-600' },
    { number: '200+', label: t('programs_page.highlights.achievements'), icon: Award, color: 'from-orange-500 to-amber-600' },
    { number: '15+', label: t('programs_page.highlights.years_experience'), icon: Star, color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={t('site.name')}
        siteTagline={t('navbar.tagline')}
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
              <Sparkles className="w-4 h-4" />
              <span>{t('programs.hero.badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">{t('programs.hero.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">{t('programs.hero.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((stat, index) => {
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
                    <p className="text-3xl mb-1">{stat.number}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40 border-b">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
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
            Menampilkan <strong>{filteredPrograms.length}</strong> program
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index} 
                  className={`group relative bg-gradient-to-br ${program.bgGradient} rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden`}
                >
                  {/* Islamic Pattern Overlay */}
                  <div className="absolute inset-0 islamic-pattern opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  
                  {/* Decorative Element */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: program.color }}
                  ></div>

                  <div className="relative">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: program.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Category Badge */}
                    <span 
                      className="inline-block text-xs px-4 py-1.5 rounded-full mb-4 text-white"
                      style={{ backgroundColor: program.color }}
                    >
                      {program.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl mb-3 text-gray-900">{program.title}</h3>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle 
                            className="w-5 h-5 flex-shrink-0" 
                            style={{ color: program.color }}
                          />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                      <button 
                        className="text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                        style={{ color: program.color }}
                      >
                        <span>{t('programs_page.item.view_detail')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding bg-gradient-to-br from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>{t('programs_page.featured.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('programs_page.featured.title')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('programs_page.featured.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* International Class */}
            <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-strong overflow-hidden">
              <div className="absolute inset-0 islamic-pattern opacity-10"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
                  ✨ {t('programs_page.featured.new_badge')}
                </span>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl mb-2">{t('programs_page.featured.international.title')}</h3>
                  </div>
                </div>

                <p className="text-white/90 mb-6 text-lg leading-relaxed">
                  {t('programs_page.featured.international.desc')}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>{t('programs_page.featured.international.features.teachers')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span>{t('programs_page.featured.international.features.curriculum')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span>{t('programs_page.featured.international.features.global')}</span>
                  </div>
                </div>

                <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  {t('programs_page.featured.register')}
                </button>
              </div>
            </div>

            {/* STEAM Lab */}
            <div className="relative bg-white rounded-3xl p-10 shadow-strong border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
              
              <div className="relative">
                <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm mb-6">
                  🚀 {t('programs_page.featured.new_badge')}
                </span>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl mb-2 text-gray-900">{t('programs_page.featured.steam.title')}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {t('programs_page.featured.steam.desc')}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{t('programs_page.featured.steam.features.equipment')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Target className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{t('programs_page.featured.steam.features.project')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{t('programs_page.featured.steam.features.skill')}</span>
                  </div>
                </div>

                <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-colors">
                  {t('programs_page.featured.register')}
                </button>
              </div>
            </div>
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
            <span>Bergabunglah Bersama Kami</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">Tertarik dengan Program Kami?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Daftarkan putra-putri Anda sekarang dan berikan mereka kesempatan untuk berkembang optimal dengan program unggulan kami
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

      <Footer siteName={t('site.name')} accentColor="#1E4AB8" onNavigate={onNavigate} logo="/images/logo/logo-yayasan.jpg" />
    </div>
  );
};
