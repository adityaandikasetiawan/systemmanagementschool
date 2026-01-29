import React, { useState, useEffect } from 'react';
import { ResponsiveLayout } from '../../layouts/ResponsiveLayout';
import { Calendar, Clock, MapPin, Users, Tag, ChevronLeft, ChevronRight, Filter, X, Sparkles, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { t } from '../../i18n';
import { api } from '../../services/api';

interface EventsProps {
    onNavigate?: (page: string) => void;
}

// Default hardcoded events as fallback
const defaultEvents = [
    {
        id: 1,
        title: 'Peringatan Maulid Nabi Muhammad SAW',
        date: '2024-12-15',
        time: '08:00 - 12:00 WIB',
        location: 'Aula Utama Baituljannah',
        category: 'Keagamaan',
        unit: 'Semua Unit',
        description: 'Peringatan Maulid Nabi dengan berbagai kegiatan seperti lomba tahfidz, ceramah, dan pentas seni Islami.',
        image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
        capacity: '500 Peserta',
        status: 'Mendatang',
        accentColor: '#10B981',
        agenda: ['08:00 - Pembukaan & Tilawah', '09:00 - Ceramah', '10:00 - Lomba Tahfidz', '12:00 - Penutupan']
    },
    {
        id: 2,
        title: 'Ujian Akhir Semester Ganjil',
        date: '2024-12-18',
        time: '07:30 - 12:00 WIB',
        location: 'Ruang Kelas Masing-masing',
        category: 'Akademik',
        unit: 'SDIT, SMPIT, SMAIT, SLBIT',
        description: 'Pelaksanaan Ujian Akhir Semester Ganjil Tahun Ajaran 2024/2025.',
        image: 'https://images.unsplash.com/photo-1660795468878-d9d8d75967b9',
        capacity: '1500 Siswa',
        status: 'Mendatang',
        accentColor: '#3B82F6',
        agenda: ['07:00 - Persiapan', '08:00 - Ujian Dimulai', '10:00 - Selesai']
    },
    {
        id: 3,
        title: 'Liburan Semester Ganjil',
        date: '2024-12-23',
        time: 'All Day',
        location: '-',
        category: 'Libur',
        unit: 'Semua Unit',
        description: 'Libur semester ganjil untuk siswa. Kegiatan belajar mengajar dimulai kembali 6 Januari 2025.',
        image: 'https://images.unsplash.com/photo-1595566358869-ddd6f35a964c',
        capacity: '-',
        status: 'Mendatang',
        accentColor: '#F97316',
        agenda: ['Libur Semester Ganjil']
    },
    {
        id: 4,
        title: 'Mulai Semester Genap',
        date: '2025-01-06',
        time: '07:00 WIB',
        location: 'Sekolah',
        category: 'Akademik',
        unit: 'Semua Unit',
        description: 'Kegiatan belajar mengajar semester genap dimulai.',
        image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
        capacity: '2000 Siswa',
        status: 'Mendatang',
        accentColor: '#3B82F6',
        agenda: ['07:00 - Apel Pagi', '08:00 - KBM Dimulai']
    },
    {
        id: 5,
        title: 'Wisuda Tahfidz 10 Juz',
        date: '2025-01-20',
        time: '08:00 - 12:00 WIB',
        location: 'Aula Baituljannah',
        category: 'Keagamaan',
        unit: 'SDIT, SMPIT',
        description: 'Wisuda bagi siswa yang telah menyelesaikan hafalan 10 juz Al-Quran.',
        image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
        capacity: '200 Peserta',
        status: 'Mendatang',
        accentColor: '#10B981',
        agenda: ['08:00 - Registrasi', '09:00 - Pembukaan', '10:00 - Penyerahan Sertifikat', '12:00 - Selesai']
    },
    {
        id: 6,
        title: 'Olimpiade Sains Sekolah',
        date: '2025-02-10',
        time: '08:00 - 15:00 WIB',
        location: 'Lab & Ruang Kelas',
        category: 'Kompetisi',
        unit: 'SMPIT, SMAIT',
        description: 'Olimpiade Sains tingkat sekolah untuk persiapan OSN.',
        image: 'https://images.unsplash.com/photo-1660795468878-d9d8d75967b9',
        capacity: '150 Peserta',
        status: 'Mendatang',
        accentColor: '#F97316',
        agenda: ['08:00 - Registrasi', '09:00 - Babak Penyisihan', '13:00 - Babak Final', '15:00 - Pengumuman']
    }
];

export const Events: React.FC<EventsProps> = ({ onNavigate = () => { } }) => {
    const [selectedMonth, setSelectedMonth] = useState(11); // December (0-indexed)
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [filterCategory, setFilterCategory] = useState<string>('Semua');
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const menuItems = [
        { label: t('site.menu.home', 'Beranda'), href: '#', onClick: () => onNavigate('main') },
        {
            label: t('site.menu.about', 'Tentang'),
            href: '#',
            submenu: [
                { label: t('site.submenu.foundation_profile', 'Profile Yayasan'), href: '#', onClick: () => onNavigate('about') },
                { label: t('site.submenu.vision_mission', 'Visi & Misi'), href: '#', onClick: () => onNavigate('vision-mission') }
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
                { label: t('site.submenu.achievement', 'Prestasi'), href: '#', onClick: () => onNavigate('achievement') }
            ]
        },
        { label: t('site.menu.career', 'Karir'), href: '#', onClick: () => onNavigate('career') },
        { label: t('site.menu.contact', 'Kontak'), href: '#', onClick: () => onNavigate('contact') },
        { label: t('common.login', 'Login'), href: '#', onClick: () => onNavigate('login') }
    ];

    // Load events from API on mount
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await api.events.getAll();
                if (res.success && res.data && res.data.length > 0) {
                    setEvents(res.data);
                } else {
                    setEvents(defaultEvents);
                }
            } catch (err) {
                console.error('Failed to load events:', err);
                setEvents(defaultEvents);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const categories = ['Semua', 'Akademik', 'Keagamaan', 'Kompetisi', 'Olahraga', 'Rapat', 'Libur'];
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const filteredEvents = events.filter(event =>
        filterCategory === 'Semua' || event.category === filterCategory
    );

    const upcomingEvents = events.filter(e => e.status === 'Mendatang').slice(0, 3);

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const getEventsForDate = (day: number) => {
        const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    const prevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const nextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const days = [];
        const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

        // Empty cells for days before the first day
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-xl"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = getEventsForDate(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === selectedMonth && new Date().getFullYear() === selectedYear;

            days.push(
                <div
                    key={day}
                    className={`h-24 p-2 rounded-xl border-2 transition-all cursor-pointer hover:border-blue-300 ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white'
                        }`}
                    onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
                >
                    <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</span>
                    <div className="mt-1 space-y-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                            <div
                                key={idx}
                                className="text-xs px-1 py-0.5 rounded truncate"
                                style={{ backgroundColor: `${event.accentColor}20`, color: event.accentColor }}
                            >
                                {event.title}
                            </div>
                        ))}
                        {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">+{dayEvents.length - 2} lainnya</div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-3xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-semibold">{monthNames[selectedMonth]} {selectedYear}</h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map(name => (
                        <div key={name} className="text-center text-sm font-medium text-gray-500 py-2">
                            {name}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <ResponsiveLayout
        siteName="Baitul Jannah Islamic School"
      siteTagline="SEKOLAHNYA PARA JUARA"
      accentColor="#1E4AB8"
      menuItems={menuItems}
      hideUserInfo
      hideLogout
      logo="/images/logo/logo-yayasan.jpg"
      onNavigate={onNavigate}
    >

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-[#1E4AB8] to-[#3B82F6] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6" />
                            <span className="text-sm uppercase tracking-wider">Kalender Akademik</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Event & Jadwal Kegiatan</h1>
                        <p className="text-xl text-white/90">
                            Tetap update dengan kegiatan dan jadwal penting di Yayasan Baituljannah
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter and View Toggle */}
            <section className="py-8 sticky top-0 z-30 bg-white shadow-soft">
                <div className="container-custom">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm transition-all ${filterCategory === cat
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2 rounded-lg text-sm transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''
                                    }`}
                            >
                                Daftar
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`px-4 py-2 rounded-lg text-sm transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm' : ''
                                    }`}
                            >
                                Kalender
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container-custom">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : viewMode === 'calendar' ? (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {renderCalendar()}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold mb-4">Event Mendatang</h3>
                                {upcomingEvents.map(event => (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedEvent(event)}
                                        className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-strong transition-all cursor-pointer"
                                        style={{ borderLeft: `4px solid ${event.accentColor}` }}
                                    >
                                        <p className="font-medium mb-1">{event.title}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(event.date).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map(event => (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all cursor-pointer group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <ImageWithFallback
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                                style={{ backgroundColor: event.accentColor }}
                                            >
                                                {event.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold mb-3 line-clamp-2">{event.title}</h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredEvents.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500">Tidak ada event dalam kategori ini</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Event Detail Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl my-8">
                        <div className="relative h-64 rounded-t-3xl overflow-hidden">
                            <ImageWithFallback
                                src={selectedEvent.image}
                                alt={selectedEvent.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-4">
                                <span
                                    className="px-4 py-2 rounded-full text-sm font-medium text-white"
                                    style={{ backgroundColor: selectedEvent.accentColor }}
                                >
                                    {selectedEvent.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="w-5 h-5" style={{ color: selectedEvent.accentColor }} />
                                    <span>{new Date(selectedEvent.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock className="w-5 h-5" style={{ color: selectedEvent.accentColor }} />
                                    <span>{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5" style={{ color: selectedEvent.accentColor }} />
                                    <span>{selectedEvent.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Users className="w-5 h-5" style={{ color: selectedEvent.accentColor }} />
                                    <span>{selectedEvent.capacity}</span>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
                            {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-3">Agenda:</h4>
                                    <ul className="space-y-2">
                                        {selectedEvent.agenda.map((item: string, idx: number) => (
                                            <li key={idx} className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedEvent.accentColor }}></div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </ResponsiveLayout>
    );
};
