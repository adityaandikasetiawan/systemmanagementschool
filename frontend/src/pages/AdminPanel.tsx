import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StatsCard } from '../components/StatsCard';
import { 
  Users, BookOpen, Calendar, Award, TrendingUp, FileText, Bell, Settings, LogOut, 
  Briefcase, DollarSign, Image as ImageIcon, Trophy, GraduationCap, ClipboardCheck,
  BarChart, Mail, Phone, MapPin, Download, Plus, Edit, Eye, Search, Filter, X, Save,
  School, Building, Megaphone, Library, UserCheck, ChevronRight, Clock, CheckCircle,
  AlertCircle, TrendingDown
} from 'lucide-react';
import { api } from '../services/api';
import { t, tf } from '../i18n';
import { Table } from '../components/Table';
import { Pagination as Pager } from '../components/Pagination';
import { AdminAchievement } from './AdminAchievement';
import { AdminNews } from './AdminNews';
import { AdminGallery } from './AdminGallery';
import { AdminPrograms } from './AdminPrograms';
import { AdminCareer } from './AdminCareer';

interface AdminPanelProps {
  userRole: 'Super Admin' | 'Admin Unit' | 'Guru' | 'Siswa';
  userName: string;
  unitName?: string;
  accentColor?: string;
  onNavigate?: (page: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  userRole,
  userName,
  unitName,
  accentColor = '#1E4AB8',
  onNavigate = () => {}
}) => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'units' | 'users' | 'ppdb' | 'career' | 'finance' | 'library' | 'attendance' | 'students' | 'teachers' | 'classes' | 'materials' | 'assignments' | 'grades' | 'schedule' | 'profile' | 'content-news' | 'content-gallery' | 'content-achievement' | 'content-programs' | 'content-hero'>('dashboard');
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('bj_admin_active_section');
      if (saved) setActiveSection(saved as any);
    } catch {}
  }, []);
  React.useEffect(() => {
    try { localStorage.setItem('bj_admin_active_section', activeSection); } catch {}
  }, [activeSection]);

  // Menu items based on role
  const getMenuItems = () => {
    if (userRole === 'Super Admin') {
      return [
        { label: t('admin.menu.dashboard'), icon: TrendingUp, section: 'dashboard' },
        { label: t('admin.menu.units'), icon: Building, section: 'units' },
        { label: t('admin.menu.users'), icon: Users, section: 'users' },
        { 
          label: t('admin.menu.content'), 
          icon: FileText, 
          submenu: [
            { label: t('admin.menu.content_news'), onClick: () => setActiveSection('content-news') },
            { label: t('admin.menu.content_gallery'), onClick: () => setActiveSection('content-gallery') },
            { label: t('admin.menu.content_achievement'), onClick: () => setActiveSection('content-achievement') },
            { label: t('admin.menu.content_programs'), onClick: () => setActiveSection('content-programs') },
            { label: 'Hero Slides', onClick: () => setActiveSection('content-hero') }
          ]
        },
        { label: t('admin.menu.ppdb'), icon: Calendar, section: 'ppdb' },
        { label: t('admin.menu.career'), icon: Briefcase, onClick: () => setActiveSection('career') },
        { label: t('admin.menu.finance'), icon: DollarSign, section: 'finance' },
        { label: t('admin.menu.profile'), icon: Settings, section: 'profile' },
        { label: t('admin.menu.logout'), icon: LogOut, href: '#', onClick: async () => { try { await api.auth.logout(); } catch {} onNavigate('login'); } }
      ];
    } else if (userRole === 'Admin Unit') {
      return [
        { label: t('admin.menu.dashboard'), icon: TrendingUp, section: 'dashboard' },
        { label: t('admin.menu.students'), icon: Users, section: 'students' },
        { label: t('admin.menu.teachers'), icon: GraduationCap, section: 'teachers' },
        { 
          label: t('admin.menu.materials'), 
          icon: BookOpen, 
          submenu: [
            { label: t('admin.menu.classes'), section: 'classes' },
            { label: 'Mata Pelajaran', href: '#' },
            { label: t('admin.menu.schedule'), section: 'schedule' }
          ]
        },
        { label: t('admin.menu.attendance'), icon: UserCheck, section: 'attendance' },
        { label: t('admin.menu.finance'), icon: DollarSign, section: 'finance' },
        { label: t('admin.menu.library'), icon: Library, section: 'library' },
        { label: t('admin.menu.ppdb'), icon: Calendar, section: 'ppdb' },
        { 
          label: t('admin.menu.content'), 
          icon: FileText, 
          submenu: [
            { label: t('admin.menu.content_news'), onClick: () => setActiveSection('content-news') },
            { label: t('admin.menu.content_gallery'), onClick: () => setActiveSection('content-gallery') },
            { label: t('admin.menu.content_achievement'), onClick: () => setActiveSection('content-achievement') },
            { label: t('admin.menu.content_programs'), onClick: () => setActiveSection('content-programs') },
            { label: 'Hero Slides', onClick: () => setActiveSection('content-hero') }
          ]
        },
        { label: t('admin.menu.profile'), icon: Settings, section: 'profile' },
        { label: t('admin.menu.logout'), icon: LogOut, href: '#', onClick: async () => { try { await api.auth.logout(); } catch {} onNavigate('login'); } }
      ];
    } else if (userRole === 'Guru') {
      return [
        { label: t('admin.menu.dashboard'), icon: TrendingUp, section: 'dashboard' },
        { label: t('admin.headers.classes_teacher'), icon: Users, section: 'classes' },
        { label: t('admin.menu.materials'), icon: BookOpen, section: 'materials' },
        { label: t('admin.menu.assignments'), icon: FileText, section: 'assignments' },
        { label: t('admin.menu.grades'), icon: Award, section: 'grades' },
        { label: t('admin.menu.attendance'), icon: UserCheck, section: 'attendance' },
        { label: t('admin.menu.schedule'), icon: Calendar, section: 'schedule' },
        { label: t('admin.headers.profile'), icon: Settings, section: 'profile' },
        { label: t('admin.menu.logout'), icon: LogOut, href: '#', onClick: async () => { try { await api.auth.logout(); } catch {} onNavigate('login'); } }
      ];
    } else { // Siswa
      return [
        { label: t('admin.menu.dashboard'), icon: TrendingUp, section: 'dashboard' },
        { label: t('admin.menu.materials'), icon: BookOpen, section: 'materials' },
        { label: t('admin.menu.assignments'), icon: FileText, section: 'assignments', badge: '3' },
        { label: t('admin.menu.grades'), icon: Award, section: 'grades' },
        { label: t('admin.menu.attendance'), icon: UserCheck, section: 'attendance' },
        { label: t('admin.menu.schedule'), icon: Calendar, section: 'schedule' },
        { label: t('admin.headers.profile'), icon: Settings, section: 'profile' },
        { label: t('admin.menu.logout'), icon: LogOut, href: '#', onClick: () => onNavigate('login') }
      ];
    }
  };

  // Handle menu click
  const handleMenuClick = (item: any) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.section) {
      setActiveSection(item.section);
    }
  };

  // Stats data based on role
  const getStatsData = () => {
    if (userRole === 'Super Admin') {
      return [
        { title: 'Total Siswa', value: '1,250', icon: Users, color: '#3B82F6', trend: { value: '+12%', isPositive: true } },
        { title: 'Total Guru', value: '125', icon: GraduationCap, color: '#10B981', trend: { value: '+5%', isPositive: true } },
        { title: 'Unit Sekolah', value: '5', icon: Building, color: '#F97316', trend: { value: '0%', isPositive: true } },
        { title: 'Pendaftar PPDB', value: '342', icon: Calendar, color: '#8B5CF6', trend: { value: '+25%', isPositive: true } }
      ];
    } else if (userRole === 'Admin Unit') {
      return [
        { title: 'Total Siswa', value: '450', icon: Users, color: accentColor, trend: { value: '+8%', isPositive: true } },
        { title: 'Total Guru', value: '45', icon: GraduationCap, color: '#10B981', trend: { value: '+2%', isPositive: true } },
        { title: 'Kelas Aktif', value: '15', icon: BookOpen, color: '#F97316', trend: { value: '0%', isPositive: true } },
        { title: 'Pendaftar PPDB', value: '87', icon: Calendar, color: '#8B5CF6', trend: { value: '+18%', isPositive: true } }
      ];
    } else if (userRole === 'Guru') {
      return [
        { title: 'Siswa Saya', value: '120', icon: Users, color: accentColor },
        { title: 'Kelas', value: '4', icon: BookOpen, color: '#10B981' },
        { title: 'Materi', value: '28', icon: FileText, color: '#F97316' },
        { title: 'Tugas Pending', value: '12', icon: ClipboardCheck, color: '#EF4444' }
      ];
    } else {
      return [
        { title: 'Tugas Aktif', value: '3', icon: FileText, color: '#EF4444' },
        { title: 'Nilai Rata-rata', value: '87.5', icon: Award, color: '#10B981' },
        { title: 'Kehadiran', value: '95%', icon: UserCheck, color: accentColor },
        { title: 'Materi', value: '24', icon: BookOpen, color: '#F97316' }
      ];
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent userRole={userRole} accentColor={accentColor} />;
      case 'units':
        return <UnitsManagement accentColor={accentColor} />;
      case 'users':
        return <UsersManagement accentColor={accentColor} />;
      case 'ppdb':
        return <PPDBManagement accentColor={accentColor} />;
      case 'career':
        return <AdminCareer onNavigate={onNavigate} embedded />;
      case 'content-news':
        return <ContentNewsManagement accentColor={accentColor} onNavigate={onNavigate} />;
      case 'content-gallery':
        return <ContentGalleryManagement accentColor={accentColor} onNavigate={onNavigate} />;
      case 'content-achievement':
        return <ContentAchievementManagement accentColor={accentColor} onNavigate={onNavigate} />;
      case 'content-programs':
        return <ContentProgramsManagement accentColor={accentColor} onNavigate={onNavigate} />;
      case 'content-hero':
        return <ContentHeroSlidesManagement accentColor={accentColor} />;
      case 'students':
        return <StudentsManagement accentColor={accentColor} onNavigate={onNavigate} />;
      case 'teachers':
        return <TeachersManagement accentColor={accentColor} />;
      case 'classes':
        return <ClassesManagement accentColor={accentColor} userRole={userRole} />;
      case 'finance':
        return <FinanceManagement accentColor={accentColor} />;
      case 'library':
        return <LibraryManagement accentColor={accentColor} />;
      case 'attendance':
        return <AttendanceManagement accentColor={accentColor} userRole={userRole} />;
      case 'materials':
        return <MaterialsManagement accentColor={accentColor} userRole={userRole} />;
      case 'assignments':
        return <AssignmentsManagement accentColor={accentColor} userRole={userRole} />;
      case 'grades':
        return <GradesManagement accentColor={accentColor} userRole={userRole} />;
      case 'schedule':
        return <ScheduleManagement accentColor={accentColor} userRole={userRole} />;
      case 'profile':
        return <ProfileManagement accentColor={accentColor} userRole={userRole} userName={userName} />;
      default:
        return <DashboardContent userRole={userRole} accentColor={accentColor} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={getMenuItems().map((item: any) => ({
          ...item,
          href: item.href || '#',
          onClick: () => handleMenuClick(item),
          submenu: item.submenu?.map((sub: any) => ({
            ...sub,
            href: sub.href || '#'
          }))
        }))}
        accentColor={accentColor}
        userRole={userRole}
        userName={userName}
      />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between p-6">
            <div>
                      <h1>
                        {activeSection === 'dashboard' && `${t('admin.headers.dashboard')}${unitName ? ` - ${unitName}` : ''}`}
                        {activeSection === 'units' && t('admin.headers.units')}
                        {activeSection === 'users' && t('admin.headers.users')}
                        {activeSection === 'ppdb' && t('admin.headers.ppdb')}
                        {activeSection === 'career' && t('admin.headers.career')}
                        {activeSection === 'content-news' && t('admin.headers.content_news')}
                        {activeSection === 'content-gallery' && t('admin.headers.content_gallery')}
                        {activeSection === 'content-achievement' && t('admin.headers.content_achievement')}
                        {activeSection === 'content-programs' && t('admin.headers.content_programs')}
                        {activeSection === 'students' && t('admin.headers.students')}
                        {activeSection === 'teachers' && t('admin.headers.teachers')}
                        {activeSection === 'classes' && (userRole === 'Guru' ? t('admin.headers.classes_teacher') : t('admin.headers.classes_admin'))}
                        {activeSection === 'finance' && t('admin.headers.finance')}
                        {activeSection === 'library' && t('admin.headers.library')}
                        {activeSection === 'attendance' && t('admin.headers.attendance')}
                        {activeSection === 'materials' && t('admin.headers.materials')}
                        {activeSection === 'assignments' && t('admin.headers.assignments')}
                        {activeSection === 'grades' && t('admin.headers.grades')}
                        {activeSection === 'schedule' && t('admin.headers.schedule')}
                        {activeSection === 'profile' && t('admin.headers.profile')}
                      </h1>
                      <p className="text-gray-500 text-sm">{tf('admin.headers.welcome', { name: userName }, `Selamat datang kembali, ${userName}!`)}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {getStatsData().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          )}
          
          {renderContent()}
        </div>
  </main>
  </div>
);
};

// Dashboard Content Component
const DashboardContent: React.FC<{ userRole: string; accentColor: string }> = ({ userRole, accentColor }) => {
  const defaultActivities = [
    { activity: 'User baru terdaftar', user: 'Ahmad Fauzi', time: '5 menit lalu', status: 'Success' },
    { activity: 'Berita dipublikasikan', user: 'Admin SDIT', time: '15 menit lalu', status: 'Success' },
    { activity: 'PPDB diterima', user: 'Siti Aisyah', time: '1 jam lalu', status: 'Pending' },
    { activity: 'Materi diupload', user: 'Guru Matematika', time: '2 jam lalu', status: 'Success' }
  ];
  const [activities, setActivities] = React.useState<Array<{ id: string; activity: string; user: string; time: string; status: string }>>([]);
  const [showActivityForm, setShowActivityForm] = React.useState(false);
  const [editingActivity, setEditingActivity] = React.useState<{ id: string; activity: string; user: string; time: string; status: string } | null>(null);
  const [activityForm, setActivityForm] = React.useState<{ activity: string; user: string; time: string; status: string }>({ activity: '', user: '', time: '', status: 'Success' });
  const getTimeLabel = (iso?: string, fallback?: string) => {
    if (!iso) return fallback || '';
    const now = Date.now();
    const t = new Date(iso).getTime();
    const diffMs = Math.max(0, now - t);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'baru saja';
    if (diffMin < 60) return `${diffMin} menit lalu`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} jam lalu`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} hari lalu`;
  };
  const loadActivities = React.useCallback(async () => {
    try {
      const res = await api.dashboardActivities.getAll();
      const list = (res && res.success && res.data) ? (res.data as any[]) : [];
      if (Array.isArray(list) && list.length) {
        setActivities(list.map((a: any) => {
          const statusRaw = String(a.status || 'Success');
          const status = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
          const time = getTimeLabel(a.occurred_at || a.created_at, a.time);
          return {
            id: String(a.id),
            activity: a.activity || a.title || '',
            user: a.user || a.actor || '',
            time,
            status
          };
        }));
      } else {
        const seeded: any[] = [];
        for (const a of defaultActivities) {
          const created = await api.dashboardActivities.create({
            activity: a.activity,
            user: a.user,
            status: a.status.toLowerCase(),
            occurred_at: new Date().toISOString(),
            time: a.time
          });
          if (created.success && created.data) {
            const d: any = created.data;
            const statusRaw = String(d.status || 'Success');
            const status = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);
            const time = getTimeLabel(d.occurred_at || d.created_at, d.time || a.time);
            seeded.push({
              id: String(d.id),
              activity: d.activity || a.activity,
              user: d.user || a.user,
              time,
              status
            });
          }
        }
        setActivities(seeded.length ? seeded : defaultActivities.map(a => ({ id: String(Date.now() + Math.random()), ...a })));
      }
    } catch {
      setActivities(defaultActivities.map(a => ({ id: String(Date.now() + Math.random()), ...a })));
    }
  }, []);
  const saveActivities = async (next?: Array<{ id: string; activity: string; user: string; time: string; status: string }>) => {
    if (next) setActivities(next);
  };
  const openCreateActivity = () => {
    setEditingActivity(null);
    setActivityForm({ activity: '', user: '', time: '', status: 'Success' });
    setShowActivityForm(true);
  };
  const openEditActivity = (row: { id: string; activity: string; user: string; time: string; status: string }) => {
    setEditingActivity(row);
    setActivityForm({ activity: row.activity, user: row.user, time: row.time, status: row.status });
    setShowActivityForm(true);
  };
  const removeActivity = async (id: string) => {
    if (!confirm('Hapus aktivitas ini?')) return;
    await api.dashboardActivities.delete(id);
    await loadActivities();
  };
  const saveActivity = async () => {
    if (!activityForm.activity || !activityForm.user) return;
    if (editingActivity) {
      await api.dashboardActivities.update(editingActivity.id, {
        activity: activityForm.activity,
        user: activityForm.user,
        status: activityForm.status.toLowerCase(),
        occurred_at: new Date().toISOString(),
        time: activityForm.time
      });
    } else {
      await api.dashboardActivities.create({
        activity: activityForm.activity,
        user: activityForm.user,
        status: activityForm.status.toLowerCase(),
        occurred_at: new Date().toISOString(),
        time: activityForm.time
      });
    }
    setShowActivityForm(false);
    await loadActivities();
  };
  React.useEffect(() => { loadActivities(); }, [loadActivities]);
  const [events, setEvents] = React.useState<Array<{ id: string; title: string; date: string; time: string; location: string }>>([]);
  const [showEventForm, setShowEventForm] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<{ id: string; title: string; date: string; time: string; location: string } | null>(null);
  const [eventForm, setEventForm] = React.useState<{ title: string; date: string; time: string; location: string }>({ title: '', date: '', time: '', location: '' });
  const [quickModal, setQuickModal] = React.useState<{ type: string; data?: any } | null>(null);
  const [unitQuickForm, setUnitQuickForm] = React.useState<{ name: string; level: string; accent_color: string }>({ name: '', level: '', accent_color: accentColor });
  const [userQuickForm, setUserQuickForm] = React.useState<{ name: string; email: string; role: string }>({ name: '', email: '', role: 'Siswa' });
  const [studentQuickForm, setStudentQuickForm] = React.useState<{ name: string; unit: string; class_name: string }>({ name: '', unit: '', class_name: '' });
  const [teacherQuickForm, setTeacherQuickForm] = React.useState<{ name: string; unit: string; subject: string }>({ name: '', unit: '', subject: '' });
  const [materialQuickForm, setMaterialQuickForm] = React.useState<{ title: string; link: string }>({ title: '', link: '' });
  const [assignmentQuickForm, setAssignmentQuickForm] = React.useState<{ title: string; due_date: string }>({ title: '', due_date: '' });
  const [scheduleQuickForm, setScheduleQuickForm] = React.useState<{ title: string; date: string; time: string; location: string }>({ title: '', date: '', time: '', location: '' });
  const openQuick = (type: string, data?: any) => { setQuickModal({ type, data }); };
  const closeQuick = () => { setQuickModal(null); };
  const saveQuick = async () => {
    if (!quickModal) return;
    try {
      if (quickModal.type === 'unit') {
        if (!unitQuickForm.name || !unitQuickForm.level) return;
        await api.units.create({ name: unitQuickForm.name, level: unitQuickForm.level, accent_color: unitQuickForm.accent_color });
      } else if (quickModal.type === 'user') {
        const roleMapBackend: Record<string, string> = { 'Siswa': 'student', 'Guru': 'teacher', 'Admin Unit': 'admin', 'Super Admin': 'super_admin' };
        const role = roleMapBackend[userQuickForm.role] || 'student';
        if (!userQuickForm.name || !userQuickForm.email) return;
        const username = String(userQuickForm.email).split('@')[0];
        const tempPassword = `${Math.random().toString(36).slice(2, 10)}A1!`;
        const res = await api.auth.register({ username, email: userQuickForm.email, password: tempPassword, role, full_name: userQuickForm.name });
        if (res && res.success) {
          try { window.dispatchEvent(new CustomEvent('bj:users:refresh')); } catch {}
        }
      } else if (quickModal.type === 'student') {
        if (!studentQuickForm.name) return;
        await api.students.create({ name: studentQuickForm.name, unit: studentQuickForm.unit, class_name: studentQuickForm.class_name });
      } else if (quickModal.type === 'teacher') {
        if (!teacherQuickForm.name) return;
        await api.teachers.create({ name: teacherQuickForm.name, unit: teacherQuickForm.unit, subject: teacherQuickForm.subject });
      } else if (quickModal.type === 'material') {
        if (!materialQuickForm.title && !materialQuickForm.link) return;
        const fd = new FormData();
        fd.append('title', materialQuickForm.title);
        fd.append('link', materialQuickForm.link);
        await api.materials.create(fd);
      } else if (quickModal.type === 'assignment') {
        if (!assignmentQuickForm.title || !assignmentQuickForm.due_date) return;
        await api.assignments.create({ title: assignmentQuickForm.title, deadline: assignmentQuickForm.due_date });
      } else if (quickModal.type === 'schedule') {
        const title = scheduleQuickForm.title || 'Jadwal';
        const date = scheduleQuickForm.date || new Date().toISOString().slice(0, 10);
        const parts = (scheduleQuickForm.time || '').split('-').map(s => s.trim());
        const start_time = parts[0] || '';
        const end_time = parts[1] || '';
        await api.dashboardEvents.create({ title, event_date: date, start_time, end_time, location: scheduleQuickForm.location });
        await loadEvents();
      }
    } finally {
      closeQuick();
    }
  };
  const loadEvents = React.useCallback(async () => {
    try {
      const res = await api.dashboardEvents.getAll();
      const list = (res && res.success && res.data) ? (res.data as any[]) : [];
      setEvents((Array.isArray(list) ? list : []).map(e => ({ ...e, id: String(e.id) })));
    } catch {
      setEvents([]);
    }
  }, []);
  const saveEvents = async (next?: Array<{ id: string; title: string; date: string; time: string; location: string }>) => {
    if (next) setEvents(next);
  };
  const openCreateEvent = () => {
    setEditingEvent(null);
    setEventForm({ title: '', date: '', time: '', location: '' });
    setShowEventForm(true);
  };
  const openEditEvent = (e: { id: string; title: string; date: string; time: string; location: string }) => {
    setEditingEvent(e);
    setEventForm({ title: e.title, date: e.date, time: e.time, location: e.location });
    setShowEventForm(true);
  };
  const removeEvent = async (e: { id: string }) => {
    if (!confirm('Hapus event ini?')) return;
    await api.dashboardEvents.delete(e.id);
    await loadEvents();
  };
  const saveEvent = async () => {
    if (!eventForm.title || !eventForm.date) return;
    if (editingEvent) {
      const parts = (eventForm.time || '').split('-').map(s => s.trim());
      const start_time = parts[0] || '';
      const end_time = parts[1] || '';
      await api.dashboardEvents.update(editingEvent.id, { title: eventForm.title, event_date: eventForm.date, start_time, end_time, location: eventForm.location });
    } else {
      const parts = (eventForm.time || '').split('-').map(s => s.trim());
      const start_time = parts[0] || '';
      const end_time = parts[1] || '';
      await api.dashboardEvents.create({ title: eventForm.title, event_date: eventForm.date, start_time, end_time, location: eventForm.location });
    }
    setShowEventForm(false);
    await loadEvents();
  };
  React.useEffect(() => { loadEvents(); }, [loadEvents]);

  const columns = [
    { header: 'Aktivitas', accessor: 'activity' },
    { header: 'User', accessor: 'user' },
    { header: 'Waktu', accessor: 'time' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs ${value === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {value}
        </span>
      )
    },
    {
      header: 'Aksi',
      accessor: 'id',
      cell: (_value: any, row: any) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openEditActivity(row)} className="btn-outline text-xs" style={{ borderColor: accentColor, color: accentColor }}>
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => removeActivity(row.id)} className="btn-outline text-xs" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Recent Activities */}
      <div className="lg:col-span-2">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3>Aktivitas Terbaru</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => openQuick('activitiesView')} className="text-sm" style={{ color: accentColor }}>Lihat Semua</button>
              <button onClick={openCreateActivity} className="btn-primary text-sm flex items-center gap-2" style={{ backgroundColor: accentColor }}>
                <Plus className="w-4 h-4" />
                <span>Tambah Aktivitas</span>
              </button>
            </div>
          </div>
          <Table columns={columns} data={activities} accentColor={accentColor} />
        </div>
      </div>

      {/* Quick Actions & Events */}
      <div>
        <div className="card mb-6">
          <h4 className="mb-6">Quick Actions</h4>
          <div className="space-y-3">
            {userRole === 'Super Admin' && (
              <>
                <button onClick={() => openQuick('unit')} className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                  <Building className="w-5 h-5" />
                  <span>Tambah Unit</span>
                </button>
                <button onClick={() => openQuick('user')} className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                  <Users className="w-5 h-5" />
                  <span>Tambah User</span>
                </button>
              </>
            )}
            {userRole === 'Admin Unit' && (
              <>
                <button onClick={() => openQuick('student')} className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                  <Users className="w-5 h-5" />
                  <span>Tambah Siswa</span>
                </button>
                <button onClick={() => openQuick('teacher')} className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                  <GraduationCap className="w-5 h-5" />
                  <span>Tambah Guru</span>
                </button>
              </>
            )}
            {userRole === 'Guru' && (
              <>
                <button onClick={() => openQuick('material')} className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-5 h-5" />
                  <span>Upload Materi</span>
                </button>
                <button onClick={() => openQuick('assignment')} className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                  <FileText className="w-5 h-5" />
                  <span>Buat Tugas</span>
                </button>
              </>
            )}
            <button onClick={() => openQuick('schedule')} className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
              <Calendar className="w-5 h-5" />
              <span>Lihat Jadwal</span>
            </button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="mb-0">Event Mendatang</h4>
            <button onClick={openCreateEvent} className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
              <Plus className="w-4 h-4" />
              <span>Tambah Event</span>
            </button>
          </div>
          <div className="space-y-4">
            {events.length === 0 && (
              <div className="text-sm text-gray-500">Belum ada event</div>
            )}
            {events.map((e) => {
              const d = new Date(e.date);
              const month = d.toLocaleString('id-ID', { month: 'short' }).toUpperCase();
              const day = d.getDate().toString().padStart(2, '0');
              return (
                <div key={e.id} className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                      <span className="text-xs">{month}</span>
                      <span className="text-lg">{day}</span>
                    </div>
                    <div>
                      <p className="text-sm">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.time} {e.location ? `• ${e.location}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditEvent(e)} className="btn-outline text-xs" style={{ borderColor: accentColor, color: accentColor }}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeEvent(e)} className="btn-outline text-xs" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {showEventForm && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-strong">
              <div className="p-6 border-b">
                <h3 className="text-lg">{editingEvent ? 'Edit Event' : 'Tambah Event'}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm block mb-2">Judul</label>
                  <input value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-2">Tanggal</label>
                    <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Waktu</label>
                    <input type="text" placeholder="08:00 - 12:00" value={eventForm.time} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="text-sm block mb-2">Lokasi</label>
                  <input value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="input-field" />
                </div>
              </div>
              <div className="p-6 border-t flex gap-2">
                <button onClick={() => setShowEventForm(false)} className="flex-1 btn-outline">Batal</button>
                <button onClick={saveEvent} className="flex-1 btn-primary" style={{ backgroundColor: accentColor }}>
                  <Save className="w-4 h-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {quickModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-strong">
              <div className="p-6 border-b">
                <h3 className="text-lg">
                  {quickModal.type === 'unit' && 'Tambah Unit'}
                  {quickModal.type === 'user' && 'Tambah User'}
                  {quickModal.type === 'student' && 'Tambah Siswa'}
                  {quickModal.type === 'teacher' && 'Tambah Guru'}
                  {quickModal.type === 'material' && 'Upload Materi'}
                  {quickModal.type === 'assignment' && 'Buat Tugas'}
                  {quickModal.type === 'schedule' && 'Jadwal'}
                  {quickModal.type === 'activitiesView' && 'Semua Aktivitas'}
                </h3>
              </div>
              {quickModal.type === 'activitiesView' ? (
                <div className="p-6 space-y-4 max-h-[60vh] overflow-auto">
                  {activities.map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border">
                      <div>
                        <p className="font-medium">{a.activity}</p>
                        <p className="text-xs text-gray-500">{a.user} • {a.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${a.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{a.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {quickModal.type === 'unit' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Nama</label>
                        <input value={unitQuickForm.name} onChange={(e) => setUnitQuickForm({ ...unitQuickForm, name: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Jenjang</label>
                        <input value={unitQuickForm.level} onChange={(e) => setUnitQuickForm({ ...unitQuickForm, level: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Warna Aksen</label>
                        <input type="color" value={unitQuickForm.accent_color} onChange={(e) => setUnitQuickForm({ ...unitQuickForm, accent_color: e.target.value })} className="input-field" />
                      </div>
                    </>
                  )}
                  {quickModal.type === 'user' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Nama</label>
                        <input value={userQuickForm.name} onChange={(e) => setUserQuickForm({ ...userQuickForm, name: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Email</label>
                        <input type="email" value={userQuickForm.email} onChange={(e) => setUserQuickForm({ ...userQuickForm, email: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Role</label>
                        <select value={userQuickForm.role} onChange={(e) => setUserQuickForm({ ...userQuickForm, role: e.target.value })} className="input-field">
                          <option>Siswa</option>
                          <option>Guru</option>
                          <option>Admin Unit</option>
                          <option>Super Admin</option>
                        </select>
                      </div>
                    </>
                  )}
                  {quickModal.type === 'student' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Nama</label>
                        <input value={studentQuickForm.name} onChange={(e) => setStudentQuickForm({ ...studentQuickForm, name: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Unit</label>
                        <input value={studentQuickForm.unit} onChange={(e) => setStudentQuickForm({ ...studentQuickForm, unit: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Kelas</label>
                        <input value={studentQuickForm.class_name} onChange={(e) => setStudentQuickForm({ ...studentQuickForm, class_name: e.target.value })} className="input-field" />
                      </div>
                    </>
                  )}
                  {quickModal.type === 'teacher' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Nama</label>
                        <input value={teacherQuickForm.name} onChange={(e) => setTeacherQuickForm({ ...teacherQuickForm, name: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Unit</label>
                        <input value={teacherQuickForm.unit} onChange={(e) => setTeacherQuickForm({ ...teacherQuickForm, unit: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Mapel</label>
                        <input value={teacherQuickForm.subject} onChange={(e) => setTeacherQuickForm({ ...teacherQuickForm, subject: e.target.value })} className="input-field" />
                      </div>
                    </>
                  )}
                  {quickModal.type === 'material' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Judul</label>
                        <input value={materialQuickForm.title} onChange={(e) => setMaterialQuickForm({ ...materialQuickForm, title: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Link</label>
                        <input value={materialQuickForm.link} onChange={(e) => setMaterialQuickForm({ ...materialQuickForm, link: e.target.value })} className="input-field" />
                      </div>
                    </>
                  )}
                  {quickModal.type === 'assignment' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Judul</label>
                        <input value={assignmentQuickForm.title} onChange={(e) => setAssignmentQuickForm({ ...assignmentQuickForm, title: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Tenggat</label>
                        <input type="date" value={assignmentQuickForm.due_date} onChange={(e) => setAssignmentQuickForm({ ...assignmentQuickForm, due_date: e.target.value })} className="input-field" />
                      </div>
                    </>
                  )}
                  {quickModal.type === 'schedule' && (
                    <>
                      <div>
                        <label className="text-sm block mb-2">Judul</label>
                        <input value={scheduleQuickForm.title} onChange={(e) => setScheduleQuickForm({ ...scheduleQuickForm, title: e.target.value })} className="input-field" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm block mb-2">Tanggal</label>
                          <input type="date" value={scheduleQuickForm.date} onChange={(e) => setScheduleQuickForm({ ...scheduleQuickForm, date: e.target.value })} className="input-field" />
                        </div>
                        <div>
                          <label className="text-sm block mb-2">Waktu</label>
                          <input value={scheduleQuickForm.time} onChange={(e) => setScheduleQuickForm({ ...scheduleQuickForm, time: e.target.value })} className="input-field" placeholder="08:00 - 12:00" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm block mb-2">Lokasi</label>
                        <input value={scheduleQuickForm.location} onChange={(e) => setScheduleQuickForm({ ...scheduleQuickForm, location: e.target.value })} className="input-field" />
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="p-6 border-t flex gap-2">
                <button onClick={closeQuick} className="flex-1 btn-outline">Tutup</button>
                <button onClick={saveQuick} className="flex-1 btn-primary" style={{ backgroundColor: accentColor }}>
                  <Save className="w-4 h-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Units Management Component
const UnitsManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({
    code: '',
    name: '',
    level: '',
    description: '',
    accent_color: '#3B82F6',
    icon: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    principal_name: '',
    status: 'active',
    established_year: ''
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.units.getAll();
      const payload: any = res && res.data ? res.data : [];
      const list = Array.isArray(payload) ? payload : (payload.units || []);
      setItems(list);
    } catch {}
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      code: '',
      name: '',
      level: '',
      description: '',
      accent_color: accentColor,
      icon: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      principal_name: '',
      status: 'active',
      established_year: ''
    });
    setShowForm(true);
  };

  const openEdit = (u: any) => {
    setEditing(u);
    setForm({
      code: u.code || '',
      name: u.name || '',
      level: u.level || '',
      description: u.description || '',
      accent_color: u.accent_color || accentColor,
      icon: u.icon || '',
      address: u.address || '',
      phone: u.phone || '',
      email: u.email || '',
      website: u.website || '',
      principal_name: u.principal_name || '',
      status: u.status || 'active',
      established_year: u.established_year || ''
    });
    setShowForm(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await api.units.update(editing.id, form);
      } else {
        await api.units.create(form);
      }
      setShowForm(false);
      await load();
    } catch {}
  };

  const remove = async (u: any) => {
    try {
      await api.units.delete(u.id);
      await load();
    } catch {}
  };

  React.useEffect(() => { load(); }, []);

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
  try {
      const res = await api.gallery.upload(fd);
      const d: any = res && res.data ? res.data : {};
      const url = d.image_url || d.thumbnail_url || d.url || d.image || d.path || d.link || '';
      if (url) setForm({ ...form, icon: url });
  } catch {}
  };

  const computeCode = (nameVal: string, levelVal: string) => {
    const lvl = (levelVal || 'UNIT').replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase();
    const nm = (nameVal || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase();
    const rand = String(Math.floor(100 + Math.random() * 900));
    return `${lvl}${nm}${rand}`;
  };
  const generateCode = () => {
    setForm({ ...form, code: computeCode(form.name, form.level) });
  };

  const openVisit = (u: any) => {
    const raw = (u && u.website) ? String(u.website).trim() : '';
    if (!raw) return;
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    window.open(href, '_blank');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-600">Kelola semua unit sekolah yang ada di Yayasan Baituljannah</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah Unit</span>
        </button>
      </div>

      {loading && (
        <div className="card mb-6">
          <p className="text-center text-gray-600 py-6">Memuat data...</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((unit) => (
          <div key={unit.id} className="card hover:shadow-strong transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${(unit.accent_color || accentColor)}20`, color: unit.accent_color || accentColor }}>
                <School className="w-6 h-6" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${unit.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {unit.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <h4 className="mb-1">{unit.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{unit.level}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(unit)} className="flex-1 btn-outline text-sm" style={{ borderColor: unit.accent_color || accentColor, color: unit.accent_color || accentColor }}>
                <Edit className="w-4 h-4" />
              </button>
              {unit.website && (
                <button onClick={() => openVisit(unit)} className="flex-1 btn-outline text-sm" style={{ borderColor: unit.accent_color || accentColor, color: unit.accent_color || accentColor }}>
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => remove(unit)} className="flex-1 btn-outline text-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-strong max-h-[70vh] flex flex-col">
            <div className="p-6 border-b shrink-0">
              <h3 className="text-lg">{editing ? 'Edit Unit' : 'Tambah Unit'}</h3>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Kode</label>
                  <div className="flex gap-2">
                    <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="input-field flex-1" />
                    <button type="button" onClick={generateCode} className="px-4 py-2 rounded-xl border text-sm" style={{ borderColor: accentColor, color: accentColor }}>Generate</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm block mb-2">Nama</label>
                  <input value={form.name} onChange={(e) => {
                    const val = e.target.value;
                    if (!form.code) {
                      setForm({ ...form, name: val, code: computeCode(val, form.level) });
                    } else {
                      setForm({ ...form, name: val });
                    }
                  }} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Jenjang</label>
                  <input value={form.level} onChange={(e) => {
                    const val = e.target.value;
                    if (!form.code) {
                      setForm({ ...form, level: val, code: computeCode(form.name, val) });
                    } else {
                      setForm({ ...form, level: val });
                    }
                  }} className="input-field" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Warna Aksen</label>
                  <input type="color" value={form.accent_color} onChange={(e) => setForm({ ...form, accent_color: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm block mb-2">Deskripsi</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Icon</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-field" />
                  <input type="file" accept="image/*" onChange={handleIconUpload} className="input-field mt-2" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Kepala Sekolah</label>
                  <input value={form.principal_name} onChange={(e) => setForm({ ...form, principal_name: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm block mb-2">Alamat</label>
                <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Telepon</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Domain/Situs</label>
                  <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Tahun Berdiri</label>
                  <input type="number" value={form.established_year} onChange={(e) => setForm({ ...form, established_year: e.target.value })} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex gap-2 shrink-0">
              <button onClick={() => setShowForm(false)} className="flex-1 btn-outline text-sm px-3 py-2">Batal</button>
              <button onClick={save} className="flex-1 btn-primary text-sm px-3 py-2" style={{ backgroundColor: accentColor }}>
                <Save className="w-4 h-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Users Management Component
const UsersManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('Semua Role');
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<{ full_name: string; email: string; role: string; phone?: string; password?: string; confirmPassword?: string }>({ full_name: '', email: '', role: 'Siswa', phone: '', password: '', confirmPassword: '' });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const roleMapBackend: Record<string, string> = { 'Siswa': 'student', 'Guru': 'teacher', 'Admin Unit': 'admin', 'Super Admin': 'super_admin' };
      const statusMapBackend: Record<string, string> = { 'Aktif': 'active', 'Nonaktif': 'inactive' };
      const roleParam = roleMapBackend[filterRole] || (filterRole === 'Semua Role' ? '' : '');
      const statusParam = statusMapBackend[filterStatus] || (filterStatus === 'Semua Status' ? '' : '');
      const res = await api.users.getAll({ page, limit, ...(roleParam ? { role: roleParam } : {}), ...(statusParam ? { status: statusParam } : {}) });
      let list: any[] = [];
      let totalCount = 0;
      if (res && res.success && res.data && Array.isArray((res as any).data?.users)) {
        list = (res as any).data.users;
        const pg = (res as any).data.pagination;
        totalCount = pg?.total || 0;
        setTotalPages(Math.max(pg?.total_pages || 1, 1));
      } else if (res && res.success && Array.isArray(res.data)) {
        const all = res.data as any[];
        totalCount = all.length;
        const start = (page - 1) * limit;
        list = all.slice(start, start + limit);
        setTotalPages(Math.max(Math.ceil(total / limit), 1));
      }
      setItems(list);
      setTotal(totalCount);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    load();
    const handler = () => { load(); };
    window.addEventListener('bj:users:refresh' as any, handler);
    return () => { window.removeEventListener('bj:users:refresh' as any, handler); };
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [filterRole, filterStatus]);

  React.useEffect(() => {
    load();
  }, [page, filterRole, filterStatus]);

  const mapRoleToLabel = (role: string) => {
    const m: Record<string, string> = { super_admin: 'Super Admin', admin: 'Admin Unit', teacher: 'Guru', student: 'Siswa', parent: 'Orang Tua' };
    return m[role] || role;
  };

  const filtered = items
    .map((u: any) => ({
      id: u.id,
      name: u.full_name || u.username || '-',
      email: u.email || '-',
      role: mapRoleToLabel(u.role || '-'),
      unit: u.unit || '-',
      status: (u.status || 'active') === 'active' ? 'Aktif' : 'Nonaktif',
      lastLogin: u.last_login || '-'
    }))
    .filter(u => (
      (!searchQuery || (u.name + u.email).toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterRole === 'Semua Role' || u.role === filterRole) &&
      (filterStatus === 'Semua Status' || u.status === filterStatus)
    ));

  const openCreate = () => {
    setEditing(null);
    setForm({ full_name: '', email: '', role: 'Siswa', phone: '', password: '', confirmPassword: '' });
    setShowForm(true);
  };

  const openEdit = (user: any) => {
    setEditing(user);
    setForm({ full_name: user.name || '', email: user.email || '', role: user.role || 'Siswa', phone: user.phone || '' });
    setShowForm(true);
  };

  const save = async () => {
    try {
      const roleMapBackend: Record<string, string> = { 'Siswa': 'student', 'Guru': 'teacher', 'Admin Unit': 'admin', 'Super Admin': 'super_admin' };
      const role = roleMapBackend[form.role] || 'student';
      if (!form.full_name || !form.email) return;
      if (editing) {
        await api.users.update(editing.id, { email: form.email, role, full_name: form.full_name, phone: form.phone });
      } else {
        const username = String(form.email).split('@')[0];
        const password = form.password || '';
        const confirm = form.confirmPassword || '';
        if (!password || password !== confirm) return;
        await api.auth.register({ username, email: form.email, password, role, full_name: form.full_name, phone: form.phone });
      }
      setShowForm(false);
      await load();
    } catch {}
  };

  const remove = async (user: any) => {
    if (!confirm('Hapus user ini?')) return;
    try {
      await api.users.delete(user.id);
      await load();
    } catch {}
  };

  const columns = [
    { header: 'Nama', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Unit', accessor: 'unit' },
    { header: 'Status', accessor: 'status' },
    { header: 'Last Login', accessor: 'lastLogin' },
    { header: 'Aksi', accessor: 'id' },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Kelola User</h1>
            <p className="text-gray-600">Manajemen data pengguna sistem</p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Tambah User</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
          >
            <option>Semua Role</option>
            <option>Admin Unit</option>
            <option>Guru</option>
            <option>Siswa</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>
        <div className="mt-4 text-gray-600">
          Menampilkan <strong>{filtered.length}</strong> dari <strong>{total}</strong> user
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Memuat data...</div>
        ) : (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((row, idx) => (
                <div key={idx} className="card hover:shadow-strong transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                      <Users className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${row.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {row.status}
                    </span>
                  </div>
                  <h4 className="mb-1">{row.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{row.email}</p>
                  <div className="text-sm text-gray-600 mb-4">{row.role} • {row.unit}</div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(row)} className="flex-1 btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(row)} className="flex-1 btn-outline text-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && totalPages > 1 && (
          <div className="p-4 border-t">
            <Pager currentPage={page} totalPages={totalPages} onPageChange={setPage} accentColor={accentColor} />
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-strong overflow-hidden">
            <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <h2 className="text-2xl">{editing ? 'Edit User' : 'Tambah User Baru'}</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm block mb-2">Nama Lengkap</label>
                <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-sm block mb-2">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-sm block mb-2">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-field">
                  <option>Siswa</option>
                  <option>Guru</option>
                  <option>Admin Unit</option>
                  <option>Super Admin</option>
                </select>
              </div>
              <div>
                <label className="text-sm block mb-2">No. Telepon</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
              </div>
              {!editing && (
                <>
                  <div>
                    <label className="text-sm block mb-2">Password</label>
                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Konfirmasi Password</label>
                    <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="input-field" />
                  </div>
                </>
              )}
            </div>
            <div className="p-6 border-t flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 btn-outline">Batal</button>
              <button onClick={save} className="flex-1 btn-primary" style={{ backgroundColor: accentColor }}>
                <Save className="w-4 h-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PPDB Management Component
const PPDBManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any | null>(null);
  const [activityForm, setActivityForm] = useState<{ activity: string; user: string; time: string; status: 'Success' | 'Pending' }>({ activity: '', user: '', time: '', status: 'Pending' });
  const saveActivity = async () => {
    try {
      setShowActivityForm(false);
      setEditingActivity(null);
    } catch {}
  };

  const stats = [
    { label: 'Total Pendaftar', value: '342', color: '#3B82F6', icon: Users },
    { label: 'Menunggu Verifikasi', value: '87', color: '#F59E0B', icon: Clock },
    { label: 'Diterima', value: '230', color: '#10B981', icon: CheckCircle },
    { label: 'Ditolak', value: '25', color: '#EF4444', icon: AlertCircle }
  ];

  const applicants = [
    { id: 1, name: 'Muhammad Rizki', unit: 'SDIT', birthDate: '2015-05-15', parent: 'Ahmad Fauzi', phone: '081234567890', date: '2024-11-25', status: 'pending' },
    { id: 2, name: 'Fatimah Zahra', unit: 'SMPIT', birthDate: '2012-08-20', parent: 'Abdullah Rahman', phone: '081234567891', date: '2024-11-26', status: 'pending' },
    { id: 3, name: 'Ali Hassan', unit: 'TKIT', birthDate: '2019-03-10', parent: 'Hassan Ibrahim', phone: '081234567892', date: '2024-11-27', status: 'accepted' }
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6 border-b">
          <button
            className={`pb-3 px-4 transition-colors ${selectedTab === 'pending' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
            style={{ borderColor: selectedTab === 'pending' ? accentColor : 'transparent', color: selectedTab === 'pending' ? accentColor : undefined }}
            onClick={() => setSelectedTab('pending')}
          >
            Menunggu Verifikasi (87)
          </button>
          <button
            className={`pb-3 px-4 transition-colors ${selectedTab === 'accepted' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
            style={{ borderColor: selectedTab === 'accepted' ? accentColor : 'transparent', color: selectedTab === 'accepted' ? accentColor : undefined }}
            onClick={() => setSelectedTab('accepted')}
          >
            Diterima (230)
          </button>
          <button
            className={`pb-3 px-4 transition-colors ${selectedTab === 'rejected' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
            style={{ borderColor: selectedTab === 'rejected' ? accentColor : 'transparent', color: selectedTab === 'rejected' ? accentColor : undefined }}
            onClick={() => setSelectedTab('rejected')}
          >
            Ditolak (25)
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicants
            .filter(a => a.status === selectedTab)
            .map((applicant) => (
              <div key={applicant.id} className="card hover:shadow-strong transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">👤</div>
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">PPDB</span>
                </div>
                <h4 className="mb-1">{applicant.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{applicant.unit} • {applicant.birthDate}</p>
                <p className="text-sm text-gray-500 mb-4">{applicant.parent} • {applicant.phone}</p>
                <div className="flex gap-2">
                  <button className="flex-1 btn-outline text-sm" style={{ borderColor: '#10B981', color: '#10B981' }}>
                    Terima
                  </button>
                  <button className="flex-1 btn-outline text-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                    Tolak
                  </button>
                  <button className="flex-1 btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    Detail
                  </button>
                </div>
              </div>
            ))}
        </div>
        {showActivityForm && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-strong">
              <div className="p-6 border-b">
                <h3 className="text-lg">{editingActivity ? 'Edit Aktivitas' : 'Tambah Aktivitas'}</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm block mb-2">Aktivitas</label>
                  <input value={activityForm.activity} onChange={(e) => setActivityForm({ ...activityForm, activity: e.target.value })} className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block mb-2">User</label>
                    <input value={activityForm.user} onChange={(e) => setActivityForm({ ...activityForm, user: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm block mb-2">Waktu</label>
                    <input placeholder="cth: 5 menit lalu" value={activityForm.time} onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="text-sm block mb-2">Status</label>
                  <select value={activityForm.status} onChange={(e) => setActivityForm({ ...activityForm, status: e.target.value as "Pending" | "Success" })} className="input-field">
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t flex gap-2">
                <button onClick={() => setShowActivityForm(false)} className="flex-1 btn-outline">Batal</button>
                <button onClick={saveActivity} className="flex-1 btn-primary" style={{ backgroundColor: accentColor }}>
                  <Save className="w-4 h-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Students Management Component (simplified - full version already exists in AdminStudents.tsx)
const StudentsManagement: React.FC<{ accentColor: string; onNavigate: (page: string) => void }> = ({ accentColor, onNavigate }) => {
  return (
    <div className="card">
      <p className="text-center text-gray-600 py-12">
        Halaman manajemen siswa lengkap sudah tersedia di <button onClick={() => onNavigate('admin-students')} className="underline" style={{ color: accentColor }}>AdminStudents.tsx</button>
      </p>
    </div>
  );
};

// Teachers Management Component
const TeachersManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const teachers = [
    { id: 1, nip: 'GT-2020-001', name: 'Ustadz Ahmad', subject: 'Matematika', unit: 'SDIT', classes: '4A, 4B, 4C', students: 90, status: 'Aktif' },
    { id: 2, nip: 'GT-2020-002', name: 'Ustadzah Fatimah', subject: 'Bahasa Arab', unit: 'SMPIT', classes: '7A, 7B', students: 60, status: 'Aktif' },
    { id: 3, nip: 'GT-2021-003', name: 'Ustadz Muhammad', subject: 'Fisika', unit: 'SMAIT', classes: '10A, 10B', students: 56, status: 'Aktif' }
  ];

  const columns = [
    { header: 'NIP', accessor: 'nip' },
    { header: 'Nama', accessor: 'name' },
    { header: 'Mata Pelajaran', accessor: 'subject' },
    { header: 'Unit', accessor: 'unit' },
    { header: 'Kelas', accessor: 'classes' },
    { header: 'Siswa', accessor: 'students' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          {value}
        </span>
      )
    },
    {
      header: 'Aksi',
      accessor: 'id',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari guru..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah Guru</span>
        </button>
      </div>

      <div className="card">
        <Table columns={columns} data={teachers} accentColor={accentColor} />
      </div>
    </div>
  );
};

// Classes Management Component
type TeacherClass = { id: number; name: string; level: string; students: number; waliKelas: string; subject: string; schedule: string };
type AdminClass = { id: number; name: string; level: string; students: number; waliKelas: string };

const ClassesManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  if (userRole === 'Guru') {
    const classes: TeacherClass[] = [
      { id: 1, name: '4A', level: 'Kelas 4', students: 30, waliKelas: 'Ustadz Ahmad', subject: 'Matematika', schedule: 'Senin, Rabu, Jumat' },
      { id: 2, name: '4B', level: 'Kelas 4', students: 30, waliKelas: 'Ustadzah Siti', subject: 'Matematika', schedule: 'Selasa, Kamis' },
      { id: 3, name: '5A', level: 'Kelas 5', students: 28, waliKelas: 'Ustadzah Maryam', subject: 'Matematika', schedule: 'Rabu, Jumat' }
    ];
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kelas..."
              className="input-field pl-10"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="card hover:shadow-strong transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4>{cls.name}</h4>
                  <p className="text-sm text-gray-600">{cls.level}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Jumlah Siswa</span>
                  <span>{cls.students} siswa</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Wali Kelas</span>
                  <span>{cls.waliKelas}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Mata Pelajaran</span>
                  <span>{cls.subject}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Jadwal</span>
                  <span className="text-xs">{cls.schedule}</span>
                </div>
              </div>
              <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const classes: AdminClass[] = [
    { id: 1, name: '1A', level: 'Kelas 1', students: 30, waliKelas: 'Ustadzah Aisyah' },
    { id: 2, name: '1B', level: 'Kelas 1', students: 28, waliKelas: 'Ustadz Abdullah' },
    { id: 3, name: '2A', level: 'Kelas 2', students: 32, waliKelas: 'Ustadzah Fatimah' },
    { id: 4, name: '2B', level: 'Kelas 2', students: 30, waliKelas: 'Ustadz Muhammad' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kelas..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah Kelas</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="card hover:shadow-strong transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4>{cls.name}</h4>
                <p className="text-sm text-gray-600">{cls.level}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Jumlah Siswa</span>
                <span>{cls.students} siswa</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Wali Kelas</span>
                <span>{cls.waliKelas}</span>
              </div>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Finance Management Component (simplified)
const FinanceManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any | null>(null);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.finance.getReport();
        if (res.success) {
          setReport(res.data);
        } else {
          setError(res.message || 'Gagal memuat laporan keuangan');
        }
      } catch (e: any) {
        setError(e.message || 'Terjadi kesalahan saat memuat laporan');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    {
      label: 'Total Pemasukan',
      value: report ? `Rp ${Intl.NumberFormat('id-ID').format(report.totalRevenue)}` : '-',
      color: '#10B981',
      icon: TrendingUp,
    },
    {
      label: 'Tagihan Pending',
      value: report ? `Rp ${Intl.NumberFormat('id-ID').format(report.totalPending)}` : '-',
      color: '#F59E0B',
      icon: Clock,
    },
    {
      label: 'Tunggakan',
      value: report ? `Rp ${Intl.NumberFormat('id-ID').format(report.totalOverdue)}` : '-',
      color: '#EF4444',
      icon: TrendingDown,
    },
    {
      label: 'Siswa Lunas',
      value: report ? String(report.paidCount) : '-',
      color: '#3B82F6',
      icon: CheckCircle,
    },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl mb-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="card">
          <p className="text-center text-gray-500 py-12">Memuat data keuangan...</p>
        </div>
      )}

      {error && (
        <div className="card">
          <p className="text-center text-red-600 py-12">{error}</p>
        </div>
      )}

      {report && (
        <div className="card">
          <h4 className="mb-4">Ringkasan Per Unit</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(report.byUnit) && report.byUnit.map((u: any, idx: number) => (
              <div key={idx} className="p-4 border rounded-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{u.unit}</p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-lg mt-2">Rp {Intl.NumberFormat('id-ID').format(u.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Library Management Component
const LibraryManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const books = [
    { id: 1, title: 'Fiqih Sunnah', author: 'Sayyid Sabiq', category: 'Agama', stock: 15, borrowed: 5 },
    { id: 2, title: 'Tafsir Ibnu Katsir', author: 'Ibnu Katsir', category: 'Agama', stock: 10, borrowed: 3 },
    { id: 3, title: 'Matematika Kelas 5', author: 'Tim Penulis', category: 'Pelajaran', stock: 50, borrowed: 35 },
    { id: 4, title: 'Bahasa Indonesia', author: 'Tim Penulis', category: 'Pelajaran', stock: 50, borrowed: 28 }
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Total Buku</p>
          <p className="text-3xl" style={{ color: accentColor }}>1,250</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Dipinjam</p>
          <p className="text-3xl text-orange-500">385</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Tersedia</p>
          <p className="text-3xl text-green-500">865</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Terlambat</p>
          <p className="text-3xl text-red-500">23</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h4>Daftar Buku</h4>
          <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
            <Plus className="w-5 h-5" />
            <span>Tambah Buku</span>
          </button>
        </div>

        <div className="space-y-3">
          {books.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-soft transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 rounded bg-gray-200 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h5>{book.title}</h5>
                  <p className="text-sm text-gray-600">{book.author} • {book.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stok: {book.stock}</p>
                  <p className="text-sm text-orange-600">Dipinjam: {book.borrowed}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Attendance Management Component
type StudentAttendance = { date: string; status: string; subject: string; teacher: string };
type ClassAttendance = { id: number; class: string; date: string; present: number; sick: number; absent: number; total: number };

const AttendanceManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  if (userRole === 'Siswa') {
    const attendanceData: StudentAttendance[] = [
      { date: '2024-12-01', status: 'Hadir', subject: 'Matematika', teacher: 'Ustadz Ahmad' },
      { date: '2024-12-01', status: 'Hadir', subject: 'Bahasa Arab', teacher: 'Ustadzah Fatimah' },
      { date: '2024-12-01', status: 'Hadir', subject: 'Fisika', teacher: 'Ustadz Muhammad' }
    ];
    return (
      <div>
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Kehadiran</p>
            <p className="text-3xl text-green-500">95%</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Hadir</p>
            <p className="text-3xl" style={{ color: accentColor }}>85 hari</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Sakit</p>
            <p className="text-3xl text-yellow-500">3 hari</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Izin</p>
            <p className="text-3xl text-orange-500">2 hari</p>
          </div>
        </div>

        <div className="card">
          <h4 className="mb-4">Riwayat Absensi</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendanceData.map((item, index) => (
              <div key={index} className="p-4 border rounded-xl hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-gray-600">{item.teacher}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">{item.status}</span>
                </div>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <input type="date" className="input-field" defaultValue="2024-12-01" />
        <select className="input-field">
          <option>Semua Kelas</option>
          <option>4A</option>
          <option>4B</option>
          <option>5A</option>
        </select>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      <div className="card">
        <h4 className="mb-4">Absensi Hari Ini</h4>
        <div className="space-y-3">
          {([
            { id: 1, class: '4A', date: '2024-12-01', present: 28, sick: 2, absent: 0, total: 30 },
            { id: 2, class: '4B', date: '2024-12-01', present: 27, sick: 1, absent: 2, total: 30 },
            { id: 3, class: '5A', date: '2024-12-01', present: 26, sick: 2, absent: 0, total: 28 }
          ] as ClassAttendance[]).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-xl">
              <div>
                <h5>Kelas {item.class}</h5>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl text-green-500">{item.present}</p>
                  <p className="text-xs text-gray-600">Hadir</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-yellow-500">{item.sick}</p>
                  <p className="text-xs text-gray-600">Sakit</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-red-500">{item.absent}</p>
                  <p className="text-xs text-gray-600">Alpa</p>
                </div>
                <button className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Materials Management Component
const MaterialsManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const materials = [
    { id: 1, title: 'Materi Perkalian dan Pembagian', subject: 'Matematika', class: '4A', date: '2024-11-28', files: 3, views: 28 },
    { id: 2, title: 'Tata Bahasa Arab Dasar', subject: 'Bahasa Arab', class: '4A', date: '2024-11-25', files: 2, views: 25 },
    { id: 3, title: 'Sejarah Islam: Periode Madinah', subject: 'Sejarah Islam', class: '5A', date: '2024-11-22', files: 4, views: 24 }
  ];

  return (
    <div>
      {userRole === 'Guru' && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari materi..."
              className="input-field pl-10"
            />
          </div>
          <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
            <Plus className="w-5 h-5" />
            <span>Upload Materi</span>
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="card hover:shadow-strong transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
              <BookOpen className="w-12 h-12" style={{ color: accentColor }} />
            </div>
            <h5 className="mb-2">{material.title}</h5>
            <p className="text-sm text-gray-600 mb-4">{material.subject} • Kelas {material.class}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{material.files} file</span>
              <span>{material.views} views</span>
              <span>{material.date}</span>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              {userRole === 'Guru' ? 'Edit Materi' : 'Lihat Materi'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Assignments Management Component
type StudentAssignment = { id: number; title: string; subject: string; teacher: string; deadline: string; status: string };
type TeacherAssignment = { id: number; title: string; class: string; deadline: string; submitted: number; total: number };

const AssignmentsManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  if (userRole === 'Siswa') {
    const assignments: StudentAssignment[] = [
      { id: 1, title: 'Latihan Soal Perkalian', subject: 'Matematika', teacher: 'Ustadz Ahmad', deadline: '2024-12-05', status: 'Belum Dikumpulkan' },
      { id: 2, title: 'Essay Bahasa Arab', subject: 'Bahasa Arab', teacher: 'Ustadzah Fatimah', deadline: '2024-12-03', status: 'Terlambat' },
      { id: 3, title: 'Laporan Praktikum', subject: 'IPA', teacher: 'Ustadz Muhammad', deadline: '2024-12-10', status: 'Sudah Dikumpulkan' }
    ];
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card hover:shadow-strong transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                <FileText className="w-6 h-6" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                assignment.status === 'Sudah Dikumpulkan' ? 'bg-green-100 text-green-700' :
                assignment.status === 'Terlambat' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {assignment.status}
              </span>
            </div>
            <h5 className="mb-2">{assignment.title}</h5>
            <p className="text-sm text-gray-600 mb-1">{assignment.subject}</p>
            <p className="text-sm text-gray-600 mb-4">{assignment.teacher}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-500">Deadline:</span>
              <span className="text-red-600">{assignment.deadline}</span>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              {assignment.status === 'Sudah Dikumpulkan' ? 'Lihat Detail' : 'Kerjakan'}
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari tugas..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Buat Tugas</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(function() {
          const assignments: TeacherAssignment[] = [
            { id: 1, title: 'Latihan Soal Perkalian', class: '4A, 4B', deadline: '2024-12-05', submitted: 45, total: 60 },
            { id: 2, title: 'Essay Matematika', class: '5A', deadline: '2024-12-03', submitted: 28, total: 28 },
            { id: 3, title: 'Tugas Kelompok', class: '4A', deadline: '2024-12-10', submitted: 20, total: 30 }
          ];
          return assignments;
        })().map((assignment) => (
          <div key={assignment.id} className="card hover:shadow-strong transition-shadow">
            <h5 className="mb-2">{assignment.title}</h5>
            <p className="text-sm text-gray-600 mb-4">Kelas {assignment.class}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-500">Deadline:</span>
              <span className="text-red-600">{assignment.deadline}</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progres Pengumpulan</span>
                <span style={{ color: accentColor }}>{assignment.submitted}/{assignment.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all" 
                  style={{ 
                    width: `${(assignment.submitted / assignment.total) * 100}%`,
                    backgroundColor: accentColor 
                  }}
                ></div>
              </div>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              Lihat Pengumpulan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grades Management Component
const GradesManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const grades = userRole === 'Siswa'
    ? [
        { subject: 'Matematika', uts: 85, uas: 88, tugas: 90, final: 87.5 },
        { subject: 'Bahasa Arab', uts: 82, uas: 85, tugas: 88, final: 85 },
        { subject: 'IPA', uts: 90, uas: 92, tugas: 95, final: 92 },
        { subject: 'IPS', uts: 78, uas: 80, tugas: 85, final: 81 }
      ]
    : [
        { id: 1, name: 'Muhammad Rizki', nis: '2024001', uts: 85, uas: 88, tugas: 90, final: 87.5 },
        { id: 2, name: 'Fatimah Zahra', nis: '2024002', uts: 90, uas: 92, tugas: 95, final: 92 },
        { id: 3, name: 'Ali Hassan', nis: '2024003', uts: 78, uas: 80, tugas: 85, final: 81 }
      ];

  if (userRole === 'Siswa') {
    return (
      <div>
        <div className="card mb-6">
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20` }}>
              <Award className="w-12 h-12" style={{ color: accentColor }} />
            </div>
            <h3 className="mb-2">Nilai Rata-rata</h3>
            <p className="text-5xl mb-2" style={{ color: accentColor }}>87.5</p>
            <p className="text-gray-600">Semester Ganjil 2024/2025</p>
          </div>
        </div>

        <div className="card">
          <h4 className="mb-4">Rincian Nilai</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Mata Pelajaran</th>
                  <th className="text-center py-3 px-4">UTS</th>
                  <th className="text-center py-3 px-4">UAS</th>
                  <th className="text-center py-3 px-4">Tugas</th>
                  <th className="text-center py-3 px-4">Nilai Akhir</th>
                </tr>
              </thead>
              <tbody>
                {(grades as Array<{ subject: string; uts: number; uas: number; tugas: number; final: number }>).map((grade, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{grade.subject}</td>
                    <td className="py-3 px-4 text-center">{grade.uts}</td>
                    <td className="py-3 px-4 text-center">{grade.uas}</td>
                    <td className="py-3 px-4 text-center">{grade.tugas}</td>
                    <td className="py-3 px-4 text-center" style={{ color: accentColor }}>{grade.final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <select className="input-field">
          <option>Kelas 4A</option>
          <option>Kelas 4B</option>
          <option>Kelas 5A</option>
        </select>
        <select className="input-field">
          <option>Matematika</option>
          <option>Bahasa Arab</option>
          <option>IPA</option>
        </select>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">NIS</th>
                <th className="text-left py-3 px-4">Nama</th>
                <th className="text-center py-3 px-4">UTS</th>
                <th className="text-center py-3 px-4">UAS</th>
                <th className="text-center py-3 px-4">Tugas</th>
                <th className="text-center py-3 px-4">Nilai Akhir</th>
                <th className="text-center py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade: any) => (
                <tr key={grade.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{grade.nis}</td>
                  <td className="py-3 px-4">{grade.name}</td>
                  <td className="py-3 px-4 text-center">{grade.uts}</td>
                  <td className="py-3 px-4 text-center">{grade.uas}</td>
                  <td className="py-3 px-4 text-center">{grade.tugas}</td>
                  <td className="py-3 px-4 text-center" style={{ color: accentColor }}>{grade.final}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Schedule Management Component
const ScheduleManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const schedule = [
    { time: '07:00 - 07:45', monday: 'Matematika', tuesday: 'Bahasa Indonesia', wednesday: 'IPA', thursday: 'IPS', friday: 'Agama' },
    { time: '08:00 - 08:45', monday: 'Bahasa Arab', tuesday: 'Matematika', wednesday: 'Bahasa Indonesia', thursday: 'IPA', friday: 'IPS' },
    { time: '09:00 - 09:45', monday: 'IPA', tuesday: 'Bahasa Arab', wednesday: 'Matematika', thursday: 'Bahasa Indonesia', friday: 'Penjaskes' },
    { time: '10:00 - 10:45', monday: 'IPS', tuesday: 'IPA', wednesday: 'Bahasa Arab', thursday: 'Matematika', friday: 'Seni Budaya' }
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {userRole !== 'Siswa' && (
          <select className="input-field">
            <option>Kelas 4A</option>
            <option>Kelas 4B</option>
            <option>Kelas 5A</option>
          </select>
        )}
        <select className="input-field">
          <option>Semester Ganjil 2024/2025</option>
          <option>Semester Genap 2024/2025</option>
        </select>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Waktu</th>
              <th className="text-center py-3 px-4">Senin</th>
              <th className="text-center py-3 px-4">Selasa</th>
              <th className="text-center py-3 px-4">Rabu</th>
              <th className="text-center py-3 px-4">Kamis</th>
              <th className="text-center py-3 px-4">Jumat</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-600">{slot.time}</td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.monday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.tuesday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.wednesday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.thursday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.friday}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Profile Management Component
const ProfileManagement: React.FC<{ accentColor: string; userRole: string; userName: string }> = ({ accentColor, userRole, userName }) => {
  return (
    <div className="max-w-4xl">
      <div className="card mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center text-4xl">
            👤
          </div>
          <div className="flex-1">
            <h3 className="mb-2">{userName}</h3>
            <p className="text-gray-600 mb-4">{userRole}</p>
            <button className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
              Ubah Foto
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="mb-6">Informasi Pribadi</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Nama Lengkap</label>
            <input type="text" className="input-field" defaultValue={userName} />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Email</label>
            <input type="email" className="input-field" defaultValue="user@baituljannah.sch.id" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">No. Telepon</label>
            <input type="tel" className="input-field" defaultValue="081234567890" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Tanggal Lahir</label>
            <input type="date" className="input-field" defaultValue="1990-01-01" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-gray-600">Alamat</label>
            <textarea className="input-field" rows={3} defaultValue="Jl. Pendidikan No. 123, Jakarta"></textarea>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="btn-primary" style={{ backgroundColor: accentColor }}>
            Simpan Perubahan
          </button>
          <button className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
            Batal
          </button>
        </div>
      </div>

      <div className="card mt-6">
        <h4 className="mb-6">Ubah Password</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Password Lama</label>
            <input type="password" className="input-field" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Password Baru</label>
            <input type="password" className="input-field" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Konfirmasi Password Baru</label>
            <input type="password" className="input-field" />
          </div>
        </div>
        <button className="btn-primary mt-6" style={{ backgroundColor: accentColor }}>
          Update Password
        </button>
      </div>
    </div>
  );
};

// Content: News Management (full version embedded)
const ContentNewsManagement: React.FC<{ accentColor: string; onNavigate: (page: string) => void }> = ({ accentColor, onNavigate }) => {
  return (
    <div className="space-y-6">
      <AdminNews onNavigate={onNavigate} embedded />
    </div>
  );
};

// Content: Gallery Management (full version embedded)
const ContentGalleryManagement: React.FC<{ accentColor: string; onNavigate: (page: string) => void }> = ({ accentColor, onNavigate }) => {
  return (
    <div className="space-y-6">
      <AdminGallery onNavigate={onNavigate} embedded />
    </div>
  );
};

// Content: Achievement Management (full version embedded)
const ContentAchievementManagement: React.FC<{ accentColor: string; onNavigate: (page: string) => void }> = ({ accentColor, onNavigate }) => {
  return (
    <div className="space-y-6">
      <AdminAchievement onNavigate={onNavigate} embedded />
    </div>
  );
};

// Content: Programs Management (full version embedded)
const ContentProgramsManagement: React.FC<{ accentColor: string; onNavigate: (page: string) => void }> = ({ accentColor, onNavigate }) => {
  return (
    <div className="space-y-6">
      <AdminPrograms onNavigate={onNavigate} embedded />
    </div>
  );
};

// Content: Hero Slides Management (CRUD)
const ContentHeroSlidesManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [slides, setSlides] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ image: '', image_base64: '', title: '', description: '', badge: '', order: 1, status: 'published' });
  const [uploadError, setUploadError] = useState<string>('');

  const load = async () => {
    const res = await api.heroSlides.getAll();
    setSlides((res && res.success && res.data) ? (res.data as any[]) : []);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ image: '', image_base64: '', title: '', description: '', badge: '', order: (slides.length || 0) + 1, status: 'published' });
    setShowForm(true);
  };

  const openEdit = (slide: any) => {
    setEditing(slide);
    setForm({ image: slide.image || '', image_base64: '', title: slide.title || '', description: slide.description || '', badge: slide.badge || '', order: slide.order || 1, status: slide.status || 'published' });
    setShowForm(true);
  };

  const save = async () => {
    if (editing) {
      const res = await api.heroSlides.update(editing.id, form);
      if (res.success) {
        await load();
        setShowForm(false);
      }
    } else {
      const res = await api.heroSlides.create(form);
      if (res.success) {
        await load();
        setShowForm(false);
      }
    }
  };

  const remove = async (slide: any) => {
    if (!confirm('Hapus slide ini?')) return;
    const res = await api.heroSlides.delete(slide.id);
    if (res.success) await load();
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h4>Hero Slides (Banner Beranda)</h4>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah Slide</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((s: any) => (
          <div key={s.id} className="card">
            <div className="w-full h-28 rounded-xl bg-gray-100 mb-3 overflow-hidden">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <h5 className="mb-1">{s.title}</h5>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{s.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">#{s.order}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(s)} className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => remove(s)} className="btn-outline text-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-strong">
            <div className="p-6 border-b">
              <h3 className="text-lg">{editing ? 'Edit Slide' : 'Tambah Slide'}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Gambar (URL)</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Upload Gambar</label>
                  <input type="file" accept="image/png,image/jpeg,image/webp" className="input-field" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const allowed = new Set(['image/png','image/jpeg','image/webp']);
                    if (!allowed.has(file.type)) { setUploadError('Format tidak didukung (hanya JPG/PNG/WEBP)'); return; }
                    const maxSize = 5 * 1024 * 1024;
                    if (file.size > maxSize) { setUploadError('Ukuran file maksimal 5MB'); return; }
                    setUploadError('');
                    const reader = new FileReader();
                    reader.onload = () => {
                      const dataUrl = reader.result as string;
                      const img = new Image();
                      img.onload = () => {
                        const minW = 1200, minH = 400;
                        if (img.width < minW || img.height < minH) { setUploadError(`Resolusi minimal ${minW}x${minH}px`); return; }
                        const maxW = 1920, maxH = 1080;
                        let tw = img.width, th = img.height;
                        const rw = maxW / tw, rh = maxH / th;
                        const r = Math.min(1, rw, rh);
                        tw = Math.round(tw * r);
                        th = Math.round(th * r);
                        const canvas = document.createElement('canvas');
                        canvas.width = tw; canvas.height = th;
                        const ctx = canvas.getContext('2d');
                        if (!ctx) { setForm(prev => ({ ...prev, image_base64: dataUrl })); return; }
                        ctx.drawImage(img, 0, 0, tw, th);
                        const webp = canvas.toDataURL('image/webp', 0.85);
                        setForm(prev => ({ ...prev, image_base64: webp }));
                      };
                      img.src = dataUrl;
                    };
                    reader.readAsDataURL(file);
                  }} />
                  {uploadError && (<p className="text-xs text-red-600 mt-2">{uploadError}</p>)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full h-32 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
                  {(form.image_base64 || form.image) ? (
                    <img src={form.image_base64 || (import.meta.env.DEV && form.image.startsWith('/') ? (`http://localhost:8080${form.image}`) : form.image)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-500">Belum ada gambar</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button disabled={!(form.image_base64 || form.image)} onClick={() => {
                    const src = form.image_base64 || form.image;
                    if (!src) return;
                    const url = (import.meta.env.DEV && src.startsWith('/')) ? `http://localhost:8080${src}` : src;
                    window.open(url, '_blank');
                  }} className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    Preview
                  </button>
                  <button disabled={!form.image_base64} onClick={() => setForm(prev => ({ ...prev, image_base64: '' }))} className="btn-outline text-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                    Hapus Upload
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Judul</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Badge</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm block mb-2">Deskripsi</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-2">Urutan</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm block mb-2">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 btn-outline">Batal</button>
              <button onClick={save} className="flex-1 btn-primary" style={{ backgroundColor: accentColor }}>
                <Save className="w-4 h-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
