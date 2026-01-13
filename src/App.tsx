import React, { useState, useEffect } from 'react';
import { MainPortal } from './pages/MainPortal';
import { TKITPage } from './pages/units/tkit/TKITPage';
import { SDITPage } from './pages/units/sdit/SDITPage';
import { SMPITPage } from './pages/units/smpit/SMPITPage';
import { SMAITPage } from './pages/units/smait/SMAITPage';
import { SLBITPage } from './pages/units/slbit/SLBITPage';
import { AsramaPage } from './pages/units/asrama/AsramaPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { ComponentLibrary } from './pages/ComponentLibrary';
import { DesignSystem } from './pages/DesignSystem';
import { About } from './pages/About';
import { VisionMission } from './pages/VisionMission';
import { News } from './pages/News';
import { Gallery } from './pages/Gallery';
import { Achievement } from './pages/Achievement';
import { Contact } from './pages/Contact';
import { Admission } from './pages/Admission';
import { Programs } from './pages/Programs';
import { Curriculum } from './pages/Curriculum';
import { Career } from './pages/Career';
import { Teachers } from './pages/Teachers';
import { Events } from './pages/Events';
import { Alumni } from './pages/Alumni';
import { AdminCareer } from './pages/AdminCareer';
import { AdminAchievement } from './pages/AdminAchievement';
import { AdminNews } from './pages/AdminNews';
import { AdminGallery } from './pages/AdminGallery';
import { AdminPrograms } from './pages/AdminPrograms';
import { AdminStudents } from './pages/AdminStudents';
import { StudentDashboard } from './pages/StudentDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { StudentFinance } from './pages/StudentFinance';
import { ParentFinance } from './pages/ParentFinance';
import { AdminFinance } from './pages/AdminFinance';
import { StudentAcademic } from './pages/StudentAcademic';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminLibrary } from './pages/AdminLibrary';
import { AdminAttendance } from './pages/AdminAttendance';
import { Login } from './pages/Login';
import { StudentProfile } from './pages/StudentProfile';
import { Settings } from './pages/Settings';
import { Layout, School, GraduationCap, Building2, Package, Palette, FileText, Image, Mail, UserPlus, Award, Trophy, LogIn } from 'lucide-react';
import { apiHelpers } from './services/api';

type PageType = 
  | 'main' 
  | 'login'
  | 'tkit' 
  | 'sdit' 
  | 'smpit' 
  | 'smait' 
  | 'slbit'
  | 'admin-super'
  | 'admin-unit'
  | 'admin-guru'
  | 'admin-siswa'
  | 'admin-career'
  | 'admin-achievement'
  | 'admin-news'
  | 'admin-gallery'
  | 'admin-programs'
  | 'admin-students'
  | 'admin-finance'
  | 'admin-library'
  | 'admin-attendance'
  | 'student-dashboard'
  | 'student-academic'
  | 'student-finance'
  | 'student-profile'
  | 'parent-dashboard'
  | 'parent-finance'
  | 'teacher-dashboard'
  | 'settings'
  | 'components'
  | 'design-system'
  | 'about'
  | 'vision-mission'
  | 'news'
  | 'gallery'
  | 'achievement'
  | 'contact'
  | 'admission'
  | 'programs'
  | 'curriculum'
  | 'career'
  | 'teachers'
  | 'events'
  | 'alumni'
  | 'asrama';

const unitConfigs = {
  tkit: { unitName: 'TKIT', accentColor: '#10B981' },
  sdit: { unitName: 'SDIT', accentColor: '#3B82F6' },
  smpit: { unitName: 'SMPIT', accentColor: '#003399' },
  smait: { unitName: 'SMAIT', accentColor: '#586c7d' },
  slbit: { unitName: 'SLBIT', accentColor: '#14B8A6' },
  asrama: { unitName: 'Asrama', accentColor: '#D4AF37' }
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('main');
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const showQuickNav = false;

  const navigate = (page: string) => setCurrentPage(page as PageType);

  useEffect(() => {
    try {
      const hash = window.location.hash ? window.location.hash.substring(1) : '';
      const saved = localStorage.getItem('bj_current_page');
      const initial = (hash || saved || 'main') as PageType;
      setCurrentPage(initial);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bj_current_page', currentPage);
      window.location.hash = currentPage;
    } catch {}
  }, [currentPage]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('baituljannah_user');
      if (raw) {
        setCurrentUser(JSON.parse(raw));
      }
      const onStorage = (e: StorageEvent) => {
        if (e.key === 'baituljannah_user') {
          setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null);
        }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    } catch {}
  }, []);

  useEffect(() => {
    if (currentPage === 'admin-super' || currentPage === 'admin-unit' || currentPage === 'admin-guru' || currentPage === 'admin-siswa') {
      try {
        const raw = localStorage.getItem('baituljannah_user');
        if (raw) {
          setCurrentUser(JSON.parse(raw));
        }
      } catch {}
    }
  }, [currentPage]);

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin_unit':
        return 'Admin Unit';
      case 'guru':
        return 'Guru';
      case 'siswa':
        return 'Siswa';
      default:
        return 'Super Admin';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPortal onNavigate={navigate} />;
      
      case 'login':
        return <Login onNavigate={navigate} />;
      
      case 'tkit':
        return <TKITPage onNavigate={navigate} />;
      case 'sdit':
        return <SDITPage onNavigate={navigate} />;
      case 'smpit':
        return <SMPITPage onNavigate={navigate} />;
      case 'smait':
        return <SMAITPage onNavigate={navigate} />;
      case 'slbit':
        return <SLBITPage onNavigate={navigate} />;
      case 'asrama':
        return <AsramaPage onNavigate={navigate} />;
      
      case 'admin-super':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return (
          <AdminPanel
            userRole={getRoleLabel(currentUser?.role) as any}
            userName={currentUser?.full_name || 'Admin Yayasan'}
            accentColor="#1E4AB8"
            onNavigate={navigate}
          />
        );
      
      case 'admin-unit':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return (
          <AdminDashboard
            userRole={getRoleLabel(currentUser?.role)}
            userName={currentUser?.full_name || 'Admin SDIT'}
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={navigate}
          />
        );
      
      case 'admin-guru':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return (
          <AdminDashboard
            userRole={getRoleLabel(currentUser?.role)}
            userName={currentUser?.full_name || 'Ustadz Ahmad'}
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={navigate}
          />
        );
      
      case 'admin-siswa':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return (
          <AdminDashboard
            userRole={getRoleLabel(currentUser?.role)}
            userName={currentUser?.full_name || 'Muhammad Rizki'}
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={navigate}
          />
        );
      
      case 'student-dashboard':
        return (
          <StudentDashboard onNavigate={navigate} />
        );
      
      case 'student-academic':
        return (
          <StudentAcademic onNavigate={navigate} />
        );
      
      case 'student-finance':
        return (
          <StudentFinance onNavigate={navigate} />
        );

      case 'student-profile':
        return (
          <StudentProfile onNavigate={navigate} />
        );
      
      case 'parent-dashboard':
        return (
          <ParentDashboard onNavigate={navigate} />
        );
      
      case 'parent-finance':
        return (
          <ParentFinance onNavigate={navigate} />
        );
      
      case 'teacher-dashboard':
        return (
          <TeacherDashboard onNavigate={navigate} />
        );
      
      case 'settings':
        return (
          <Settings onNavigate={navigate} />
        );
      
      case 'components':
        return <ComponentLibrary />;
      
      case 'design-system':
        return <DesignSystem />;
      
      case 'about':
        return <About onNavigate={navigate} />;
      
      case 'vision-mission':
        return <VisionMission onNavigate={navigate} />;
      
      case 'news':
        return <News onNavigate={navigate} />;
      
      case 'gallery':
        return <Gallery onNavigate={navigate} />;
      
      case 'achievement':
        return <Achievement onNavigate={navigate} />;
      
      case 'contact':
        return <Contact onNavigate={navigate} />;
      
      case 'career':
        return <Career onNavigate={navigate} />;
      
      case 'admin-career':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminCareer onNavigate={navigate} />;
      
      case 'admin-achievement':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminAchievement onNavigate={navigate} />;
      
      case 'admin-news':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminNews onNavigate={navigate} />;
      
      case 'admin-gallery':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminGallery onNavigate={navigate} />;
      
      case 'admin-programs':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminPrograms onNavigate={navigate} />;
      
      case 'admin-students':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminStudents onNavigate={navigate} />;
      
      case 'admin-finance':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminFinance onNavigate={navigate} />;
      
      case 'admin-library':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminLibrary onNavigate={navigate} />;
      
      case 'admin-attendance':
        if (!currentUser || !apiHelpers.getToken()) {
          return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
        }
        return <AdminAttendance onNavigate={navigate} />;
      
      case 'admission':
        return <Admission onNavigate={navigate} />;
      
      case 'programs':
        return <Programs onNavigate={navigate} />;
      case 'curriculum':
        return <Curriculum onNavigate={navigate} />;
      case 'career':
        return <Career onNavigate={navigate} />;
      case 'teachers':
        return <Teachers onNavigate={navigate} />;
      
      case 'events':
        return <Events onNavigate={navigate} />;
      
      case 'alumni':
        return <Alumni onNavigate={navigate} />;
      
      default:
        return <MainPortal onNavigate={navigate} />;
  }
};

  return (
    <div className="relative">
      {showQuickNav && (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white rounded-2xl shadow-strong p-4">
          <p className="text-xs text-gray-500 mb-3 px-2">Quick Navigation</p>
          
          {/* Main Portal */}
          <div className="mb-3">
            <button
              onClick={() => setCurrentPage('main')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'main'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Main Portal</span>
            </button>
          </div>

          {/* Unit Schools */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <p className="text-xs text-gray-500 mb-2 px-2">Unit Sekolah</p>
            {Object.entries(unitConfigs).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key as PageType)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                  currentPage === key
                    ? 'text-white'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
                style={currentPage === key ? { backgroundColor: config.accentColor } : {}}
              >
                <School className="w-4 h-4" />
                <span>{config.unitName}</span>
              </button>
            ))}
          </div>

          {/* Component Library */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <button
              onClick={() => setCurrentPage('components')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'components'
                  ? 'bg-teal-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Component Library</span>
            </button>
          </div>

          {/* Public Pages */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <p className="text-xs text-gray-500 mb-2 px-2">Halaman Publik</p>
            <button
              onClick={() => setCurrentPage('login')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'login'
                  ? 'bg-emerald-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'about'
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Tentang</span>
            </button>
            <button
              onClick={() => setCurrentPage('vision-mission')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'vision-mission'
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Visi & Misi</span>
            </button>
            <button
              onClick={() => setCurrentPage('programs')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'programs'
                  ? 'bg-violet-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Program</span>
            </button>
            <button
              onClick={() => setCurrentPage('news')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'news'
                  ? 'bg-rose-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Berita</span>
            </button>
            <button
              onClick={() => setCurrentPage('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'gallery'
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Galeri Foto</span>
            </button>
            <button
              onClick={() => setCurrentPage('achievement')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'achievement'
                  ? 'bg-yellow-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Prestasi</span>
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'contact'
                  ? 'bg-cyan-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Kontak</span>
            </button>
            <button
              onClick={() => setCurrentPage('admission')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admission'
                  ? 'bg-amber-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Pendaftaran</span>
            </button>
          </div>

          {/* Admin Panel */}
          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs text-gray-500 mb-2 px-2">Admin Panel</p>
            <button
              onClick={() => setCurrentPage('admin-super')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-super'
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Super Admin</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-unit')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-unit'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Admin Unit</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-guru')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-guru'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Guru</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-siswa')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-siswa'
                  ? 'bg-orange-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Siswa</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-career')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-career'
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Rekrutmen</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-achievement')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-achievement'
                  ? 'bg-yellow-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Prestasi</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-news')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-news'
                  ? 'bg-rose-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Berita</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-gallery')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-gallery'
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Galeri Foto</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-programs')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-programs'
                  ? 'bg-violet-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Program</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-students')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-students'
                  ? 'bg-orange-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Siswa</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-finance')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-finance'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Keuangan</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-library')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-library'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Perpustakaan</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-attendance')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-attendance'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Kehadiran</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Page Content */}
      {renderPage()}
    </div>
  );
};

export default App;
