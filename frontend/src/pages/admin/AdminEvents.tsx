import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit, Trash2, Eye, Search, Filter, Clock, MapPin, Users, Tag, X, Check } from 'lucide-react';
import { api } from '../../services/api';

interface AdminEventsProps {
    onNavigate?: (page: string) => void;
    embedded?: boolean;
}

interface EventItem {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    unit: string;
    description: string;
    image: string;
    capacity: string;
    status: 'Mendatang' | 'Berlangsung' | 'Selesai';
    accentColor: string;
    agenda: string[];
}

export const AdminEvents: React.FC<AdminEventsProps> = ({ onNavigate = () => { }, embedded = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('Semua');
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
    const [eventsList, setEventsList] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<Partial<EventItem>>({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '08:00 - 12:00 WIB',
        location: '',
        category: 'Akademik',
        unit: 'Semua Unit',
        description: '',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        capacity: '100 Peserta',
        status: 'Mendatang',
        accentColor: '#3B82F6',
        agenda: []
    });

    const [agendaInput, setAgendaInput] = useState('');

    const categories = ['Semua', 'Akademik', 'Keagamaan', 'Libur', 'Kegiatan', 'Olahraga', 'Kompetisi', 'Rapat'];
    const units = ['Semua Unit', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT', 'Yayasan'];
    const statuses = ['Semua', 'Mendatang', 'Berlangsung', 'Selesai'];
    const colors = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Green', value: '#10B981' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Teal', value: '#14B8A6' },
        { name: 'Red', value: '#EF4444' }
    ];

    // Load events from API on mount
    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const res = await api.events.getAll();
                if (res.success && res.data) {
                    setEventsList(res.data);
                }
            } catch (err) {
                console.error('Failed to load events:', err);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    const filteredEvents = eventsList.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'Semua' || event.category === filterCategory;
        const matchesStatus = filterStatus === 'Semua' || event.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '08:00 - 12:00 WIB',
            location: '',
            category: 'Akademik',
            unit: 'Semua Unit',
            description: '',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            capacity: '100 Peserta',
            status: 'Mendatang',
            accentColor: '#3B82F6',
            agenda: []
        });
        setAgendaInput('');
        setShowModal(true);
    };

    const handleEdit = (event: EventItem) => {
        setModalMode('edit');
        setSelectedEvent(event);
        setFormData(event);
        setAgendaInput('');
        setShowModal(true);
    };

    const handleView = (event: EventItem) => {
        setModalMode('view');
        setSelectedEvent(event);
        setFormData(event);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (modalMode === 'create') {
                const res = await api.events.create(formData);
                if (res.success && res.data) {
                    setEventsList([res.data, ...eventsList]);
                }
            } else if (modalMode === 'edit' && selectedEvent) {
                const res = await api.events.update(selectedEvent.id, formData);
                if (res.success && res.data) {
                    setEventsList(eventsList.map(e => e.id === selectedEvent.id ? res.data : e));
                }
            }
        } catch (err) {
            console.error('Failed to save event:', err);
        } finally {
            setShowModal(false);
            setSelectedEvent(null);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await api.events.delete(id);
            if (res.success) {
                setEventsList(eventsList.filter(e => e.id !== id));
            }
        } catch (err) {
            console.error('Failed to delete event:', err);
        } finally {
            setShowDeleteConfirm(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const addAgendaItem = () => {
        if (agendaInput.trim()) {
            setFormData({
                ...formData,
                agenda: [...(formData.agenda || []), agendaInput.trim()]
            });
            setAgendaInput('');
        }
    };

    const removeAgendaItem = (index: number) => {
        setFormData({
            ...formData,
            agenda: (formData.agenda || []).filter((_, i) => i !== index)
        });
    };

    const stats = [
        { label: 'Total Event', value: eventsList.length, color: 'from-blue-500 to-blue-600' },
        { label: 'Mendatang', value: eventsList.filter(e => e.status === 'Mendatang').length, color: 'from-green-500 to-green-600' },
        { label: 'Berlangsung', value: eventsList.filter(e => e.status === 'Berlangsung').length, color: 'from-yellow-500 to-yellow-600' },
        { label: 'Selesai', value: eventsList.filter(e => e.status === 'Selesai').length, color: 'from-purple-500 to-purple-600' }
    ];

    return (
        <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>
            <div className="container-custom py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl mb-2">Kelola Event & Kalender</h1>
                            <p className="text-gray-600">Manajemen event dan jadwal kegiatan sekolah</p>
                        </div>
                        <button
                            onClick={handleCreate}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Tambah Event</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-2xl mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari event..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full py-2 bg-transparent outline-none"
                            >
                                {categories.map(cat => (
                                    <option key={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
                            <Tag className="w-5 h-5 text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full py-2 bg-transparent outline-none"
                            >
                                {statuses.map(status => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        Menampilkan <strong>{filteredEvents.length}</strong> dari <strong>{eventsList.length}</strong> event
                    </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat data event...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-600">Belum ada event</p>
                        </div>
                    ) : (
                        filteredEvents.map(event => (
                            <div key={event.id} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                                <div className="flex gap-6">
                                    {/* Image */}
                                    <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0" style={{ borderLeft: `4px solid ${event.accentColor}` }}>
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs ${event.status === 'Mendatang' ? 'bg-green-100 text-green-700' :
                                                            event.status === 'Berlangsung' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {event.status}
                                                    </span>
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                        {event.category}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                        {event.unit}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl mb-2">{event.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{new Date(event.date).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>{event.capacity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleView(event)}
                                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                            title="Lihat"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(event.id)}
                                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl my-8">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl">
                                    {modalMode === 'create' ? 'Tambah Event Baru' : modalMode === 'edit' ? 'Edit Event' : 'Detail Event'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            {modalMode === 'view' ? (
                                /* View Mode */
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden">
                                        <img src={formData.image} alt={formData.title} className="w-full h-64 object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl mb-2">{formData.title}</h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${formData.status === 'Mendatang' ? 'bg-green-100 text-green-700' :
                                                    formData.status === 'Berlangsung' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {formData.status}
                                            </span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                {formData.category}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-4 space-y-1">
                                            <p><strong>Tanggal:</strong> {formData.date && new Date(formData.date).toLocaleDateString('id-ID')}</p>
                                            <p><strong>Waktu:</strong> {formData.time}</p>
                                            <p><strong>Lokasi:</strong> {formData.location}</p>
                                            <p><strong>Kapasitas:</strong> {formData.capacity}</p>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed mb-4">{formData.description}</p>
                                        {formData.agenda && formData.agenda.length > 0 && (
                                            <div>
                                                <strong>Agenda:</strong>
                                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                                    {formData.agenda.map((item, idx) => (
                                                        <li key={idx} className="text-gray-600 text-sm">{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Create/Edit Mode */
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Judul Event</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                            placeholder="Masukkan judul event"
                                            required
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Tanggal</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Waktu</label>
                                            <input
                                                type="text"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                                placeholder="08:00 - 12:00 WIB"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Kategori</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                            >
                                                {categories.filter(c => c !== 'Semua').map(cat => (
                                                    <option key={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Unit</label>
                                            <select
                                                name="unit"
                                                value={formData.unit}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                            >
                                                {units.map(unit => (
                                                    <option key={unit}>{unit}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Lokasi</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                                placeholder="Aula Utama"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Kapasitas</label>
                                            <input
                                                type="text"
                                                name="capacity"
                                                value={formData.capacity}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                                placeholder="100 Peserta"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                        >
                                            <option>Mendatang</option>
                                            <option>Berlangsung</option>
                                            <option>Selesai</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Deskripsi</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                            placeholder="Deskripsi event..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">URL Gambar</label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {formData.image && (
                                            <div className="mt-3 rounded-xl overflow-hidden">
                                                <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Warna Tema</label>
                                        <div className="flex gap-2">
                                            {colors.map(color => (
                                                <button
                                                    key={color.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, accentColor: color.value })}
                                                    className={`w-10 h-10 rounded-xl transition-all ${formData.accentColor === color.value
                                                            ? 'ring-4 ring-offset-2 ring-blue-500 scale-110'
                                                            : 'hover:scale-105'
                                                        }`}
                                                    style={{ backgroundColor: color.value }}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Agenda</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={agendaInput}
                                                onChange={(e) => setAgendaInput(e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                                                placeholder="08:00 - Pembukaan"
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAgendaItem())}
                                            />
                                            <button
                                                type="button"
                                                onClick={addAgendaItem}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {formData.agenda && formData.agenda.length > 0 && (
                                            <ul className="space-y-2">
                                                {formData.agenda.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                                        <span className="flex-1 text-sm">{item}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAgendaItem(idx)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                {modalMode === 'view' ? 'Tutup' : 'Batal'}
                            </button>
                            {modalMode !== 'view' && (
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>{modalMode === 'create' ? 'Simpan' : 'Update'}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl text-center mb-2">Hapus Event?</h3>
                        <p className="text-gray-600 text-center mb-6">
                            Event yang dihapus tidak dapat dikembalikan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
