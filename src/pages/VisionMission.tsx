import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { Eye, Target, CheckCircle, Star, Heart, BookOpen, Users, Award, Sparkles, TrendingUp, Shield, Lightbulb, Zap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { t } from '../i18n';

interface VisionMissionProps {
  onNavigate?: (page: string) => void;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ onNavigate = () => {} }) => {
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
    { label: t('site.menu.home'), onClick: () => onNavigate('main') },
    { label: t('site.submenu.vision_mission') }
  ];

  const missions = [
    {
      icon: BookOpen,
      title: t('vision_mission.mission.items.education.title'),
      description: t('vision_mission.mission.items.education.desc'),
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Heart,
      title: t('vision_mission.mission.items.character.title'),
      description: t('vision_mission.mission.items.character.desc'),
      color: '#EF4444',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      icon: Users,
      title: t('vision_mission.mission.items.potential.title'),
      description: t('vision_mission.mission.items.potential.desc'),
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Award,
      title: t('vision_mission.mission.items.achievement.title'),
      description: t('vision_mission.mission.items.achievement.desc'),
      color: '#F59E0B',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: Shield,
      title: t('vision_mission.mission.items.environment.title'),
      description: t('vision_mission.mission.items.environment.desc'),
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: TrendingUp,
      title: t('vision_mission.mission.items.partnership.title'),
      description: t('vision_mission.mission.items.partnership.desc'),
      color: '#14B8A6',
      gradient: 'from-teal-500 to-cyan-600'
    }
  ];

  const goals = [
    {
      icon: Star,
      title: t('vision_mission.goals.items.quran.title'),
      description: t('vision_mission.goals.items.quran.desc'),
      stats: t('vision_mission.goals.items.quran.stats')
    },
    {
      icon: Lightbulb,
      title: t('vision_mission.goals.items.innovation.title'),
      description: t('vision_mission.goals.items.innovation.desc'),
      stats: t('vision_mission.goals.items.innovation.stats')
    },
    {
      icon: Zap,
      title: t('vision_mission.goals.items.achievement.title'),
      description: t('vision_mission.goals.items.achievement.desc'),
      stats: t('vision_mission.goals.items.achievement.stats')
    },
    {
      icon: Users,
      title: t('vision_mission.goals.items.hr.title'),
      description: t('vision_mission.goals.items.hr.desc'),
      stats: t('vision_mission.goals.items.hr.stats')
    }
  ];

  const values = [
    { title: t('vision_mission.values.items.integrity.title'), description: t('vision_mission.values.items.integrity.desc') },
    { title: t('vision_mission.values.items.excellence.title'), description: t('vision_mission.values.items.excellence.desc') },
    { title: t('vision_mission.values.items.innovation.title'), description: t('vision_mission.values.items.innovation.desc') },
    { title: t('vision_mission.values.items.collaboration.title'), description: t('vision_mission.values.items.collaboration.desc') },
    { title: t('vision_mission.values.items.compassion.title'), description: t('vision_mission.values.items.compassion.desc') },
    { title: t('vision_mission.values.items.accountability.title'), description: t('vision_mission.values.items.accountability.desc') }
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
              <Eye className="w-4 h-4" />
              <span>{t('vision_mission.hero.badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">{t('vision_mission.hero.title')}</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              {t('vision_mission.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c"
                  alt={t('vision_mission.vision.image_alt')}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Eye className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl mb-2">{t('vision_mission.vision.card_title')}</h3>
                    <p className="text-white/90">{t('vision_mission.vision.card_subtitle')}</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm mb-6">
                <Eye className="w-4 h-4" />
                <span>{t('vision_mission.vision.badge')}</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900">{t('vision_mission.vision.title')}</h2>
              
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 shadow-soft relative overflow-hidden mb-8">
                <div className="absolute inset-0 islamic-pattern opacity-5"></div>
                <div className="relative">
                  <Star className="w-12 h-12 text-blue-600 mb-4" />
                  <p className="text-2xl text-gray-900 leading-relaxed italic">
                    {t('vision_mission.vision.quote')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1 text-gray-900">{t('vision_mission.vision.points.innovative.title')}</h4>
                    <p className="text-gray-600">{t('vision_mission.vision.points.innovative.desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1 text-gray-900">{t('vision_mission.vision.points.character.title')}</h4>
                    <p className="text-gray-600">{t('vision_mission.vision.points.character.desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1 text-gray-900">{t('vision_mission.vision.points.leader.title')}</h4>
                    <p className="text-gray-600">{t('vision_mission.vision.points.leader.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm mb-6">
              <Target className="w-4 h-4" />
              <span>{t('vision_mission.mission.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('vision_mission.mission.title')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('vision_mission.mission.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((mission, index) => {
              const Icon = mission.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden"
                >
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
                    {index + 1}
                  </div>

                  {/* Islamic Pattern */}
                  <div className="absolute inset-0 islamic-pattern opacity-5"></div>
                  
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

                  <div className="relative">
                    <div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mission.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl mb-3 text-gray-900">{mission.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{mission.description}</p>

                    {/* Decorative Element */}
                    <div 
                      className="absolute bottom-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: mission.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t('vision_mission.goals.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('vision_mission.goals.title')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('vision_mission.goals.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 text-white shadow-strong hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 islamic-pattern opacity-10"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <p className="text-3xl mb-2">{goal.stats}</p>
                    <h3 className="text-xl mb-3">{goal.title}</h3>
                    <p className="text-white/90">{goal.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm mb-6">
              <Heart className="w-4 h-4" />
              <span>{t('vision_mission.values.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">{t('vision_mission.values.title')}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t('vision_mission.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
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
            <span>{t('vision_mission.cta.badge')}</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">{t('vision_mission.cta.title')}</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {t('vision_mission.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('admission')} 
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <span>{t('navbar.ppdb_cta')}</span>
              <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('programs')} 
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>{t('vision_mission.cta.button_programs')}</span>
            </button>
          </div>
        </div>
      </section>

      <Footer siteName={t('site.name')} accentColor="#1E4AB8" onNavigate={onNavigate} logo="/images/logo/logo-yayasan.jpg" />
    </div>
  );
};
