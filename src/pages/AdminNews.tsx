import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { t, tf } from '../i18n';
import { FileText, Plus, Edit, Trash2, Eye, Search, Filter, Calendar, Tag, X, Check, Image as ImageIcon, Upload } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../services/api';

interface AdminNewsProps {
  onNavigate?: (page: string) => void;
  embedded?: boolean;
}

interface NewsItem {
  id: number;
  title: string;
  category: string;
  unit: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  status: 'Published' | 'Draft';
  views: number;
}

export const AdminNews: React.FC<AdminNewsProps> = ({ onNavigate = () => {}, embedded = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  React.useEffect(() => {
    try {
      const sq = localStorage.getItem('bj_admin_news_search');
      const fc = localStorage.getItem('bj_admin_news_filter');
      const fs = localStorage.getItem('bj_admin_news_status');
      if (sq !== null) setSearchQuery(sq);
      if (fc !== null) setFilterCategory(fc);
      if (fs !== null) setFilterStatus(fs);
    } catch {}
  }, []);

  React.useEffect(() => {
    try { localStorage.setItem('bj_admin_news_search', searchQuery); } catch {}
  }, [searchQuery]);

  React.useEffect(() => {
    try { localStorage.setItem('bj_admin_news_filter', filterCategory); } catch {}
  }, [filterCategory]);

  React.useEffect(() => {
    try { localStorage.setItem('bj_admin_news_status', filterStatus); } catch {}
  }, [filterStatus]);

  const menuItems = [
    { label: t('admin_news.menu.dashboard'), href: '#', onClick: () => onNavigate('admin-super') },
    { label: t('admin_news.menu.news'), href: '#', onClick: () => {} },
    { label: t('admin_news.menu.gallery'), href: '#', onClick: () => onNavigate('admin-gallery') },
    { label: t('admin_news.menu.achievement'), href: '#', onClick: () => onNavigate('admin-achievement') },
    { label: t('admin_news.menu.programs'), href: '#', onClick: () => onNavigate('admin-programs') },
    { label: t('admin_news.menu.career'), href: '#', onClick: () => onNavigate('admin-career') }
  ];

  const [newsList, setNewsList] = useState<any[]>([]);

  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    category: 'Akademik',
    unit: 'Semua Unit',
    date: new Date().toISOString().split('T')[0],
    author: 'Admin Yayasan',
    excerpt: '',
    content: '',
    image: '',
    status: 'Draft'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Prestasi', 'Kegiatan', 'Pengumuman'];
  const units = ['Semua Unit', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT', 'Yayasan'];
  const statuses = ['Semua', 'Published', 'Draft'];

  const filteredNews = newsList.filter((news: any) => {
    const title = (news.title || '').toLowerCase();
    const excerpt = (news.excerpt || news.content || '').toLowerCase();
    const category = news.category || 'Semua';
    const status = news.status || 'Draft';
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || excerpt.includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || category === filterCategory;
    const matchesStatus = filterStatus === 'Semua' || status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  React.useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await api.news.getAll({ page: 1, limit: 100 });
        if (res.success) {
          setNewsList(res.data || []);
        }
      } catch {}
    };
    loadNews();
  }, []);

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      category: 'Akademik',
      unit: 'Semua Unit',
      date: new Date().toISOString().split('T')[0],
      author: 'Admin Yayasan',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1644380644655-fcf91fa5c43b',
      status: 'Draft'
    });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleEdit = (news: NewsItem) => {
    setModalMode('edit');
    setSelectedNews(news);
    setFormData(news);
    setShowModal(true);
  };

  const handleView = (news: NewsItem) => {
    setModalMode('view');
    setSelectedNews(news);
    setFormData(news);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (modalMode === 'create') {
        let res: any;
        if (selectedFile) {
          const fd = new FormData();
          fd.append('title', String(formData.title || ''));
          fd.append('content', String(formData.content || ''));
          fd.append('category', String(formData.category || 'Akademik'));
          fd.append('unit_sekolah', String(formData.unit || 'Semua'));
          fd.append('status', (formData.status || 'Draft').toLowerCase() === 'published' ? 'published' : 'draft');
          if (formData.date) fd.append('publish_date', String(formData.date));
          fd.append('image', selectedFile);
          res = await api.news.create(fd);
        } else {
          const payload: any = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            unit_sekolah: formData.unit,
            image_url: formData.image,
            status: (formData.status || 'Draft').toLowerCase() === 'published' ? 'published' : 'draft',
            publish_date: formData.date
          };
          res = await api.news.create(payload);
        }
        if (res.success) {
          const list = await api.news.getAll({ page: 1, limit: 100 });
          if (list.success) setNewsList(list.data || []);
        }
      } else if (modalMode === 'edit' && selectedNews) {
        let res: any;
        if (selectedFile) {
          const fd = new FormData();
          fd.append('title', String(formData.title || ''));
          fd.append('content', String(formData.content || ''));
          fd.append('category', String(formData.category || 'Akademik'));
          fd.append('unit_sekolah', String(formData.unit || 'Semua'));
          fd.append('status', (formData.status || 'Draft').toLowerCase() === 'published' ? 'published' : 'draft');
          if (formData.date) fd.append('publish_date', String(formData.date));
          fd.append('image', selectedFile);
          res = await api.news.update((selectedNews as any).id, fd);
        } else {
          const payload: any = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            unit_sekolah: formData.unit,
            image_url: formData.image,
            status: (formData.status || 'Draft').toLowerCase() === 'published' ? 'published' : 'draft',
            publish_date: formData.date
          };
          res = await api.news.update((selectedNews as any).id, payload);
        }
        if (res.success) {
          const list = await api.news.getAll({ page: 1, limit: 100 });
          if (list.success) setNewsList(list.data || []);
        }
      }
    } catch {} finally {
      setShowModal(false);
      setSelectedNews(null);
      setSelectedFile(null);
    }
  };

  const handleDelete = (id: number) => {
    const run = async () => {
      try {
        const res = await api.news.delete(id);
        if (res.success) {
          const list = await api.news.getAll({ page: 1, limit: 100 });
          if (list.success) setNewsList(list.data || []);
        }
      } catch {} finally {
        setShowDeleteConfirm(null);
      }
    };
    run();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const stats = [
    { label: t('admin_news.stats.total'), value: newsList.length, color: 'from-blue-500 to-blue-600' },
    { label: t('admin_news.stats.published'), value: newsList.filter(n => n.status === 'Published').length, color: 'from-green-500 to-green-600' },
    { label: t('admin_news.stats.draft'), value: newsList.filter(n => n.status === 'Draft').length, color: 'from-yellow-500 to-yellow-600' },
    { label: t('admin_news.stats.views'), value: newsList.reduce((sum, n) => sum + n.views, 0).toLocaleString(), color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>
      {!embedded && (
        <Navbar 
          siteName={t('admin_news.site_title')}
          accentColor="#1E4AB8"
          menuItems={menuItems}
        />
      )}

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">{t('admin_news.header.title')}</h1>
              <p className="text-gray-600">{t('admin_news.header.subtitle')}</p>
            </div>
              <button
                onClick={handleCreate}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>{t('admin_news.header.create')}</span>
              </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <FileText className="w-6 h-6 text-white" />
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
                placeholder={t('admin_news.filters.search_placeholder')}
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
            {tf('admin_news.filters.summary', { count: filteredNews.length, total: newsList.length })}
          </div>
        </div>

        {/* News List */}
        <div className="space-y-4">
            {filteredNews.map((news: any) => (
              <div key={news.id} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={news.image || news.image_url || ''}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                          (news.status || 'Draft') === 'Published' || (news.status || 'draft') === 'published'
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {(news.status || 'Draft')}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {news.category}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {news.unit || news.unit_sekolah || 'Semua Unit'}
                          </span>
                        </div>
                        <h3 className="text-xl mb-2">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.excerpt || (news.content || '').slice(0, 160)}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(news.date || news.publish_date || news.created_at || Date.now()).toLocaleDateString('id-ID')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{(news.views || 0)} {t('admin_news.list.views_suffix')}</span>
                          </div>
                          <span>{t('admin_news.list.author_prefix')} {(news.author || news.author_name || 'Admin')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleView(news)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title={t('common.actions.view')}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(news)}
                      className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                      title={t('common.actions.edit')}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm((news as any).id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title={t('common.actions.delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {filteredNews.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">{t('admin_news.list.empty')}</p>
            </div>
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
                  {modalMode === 'create' ? t('admin_news.modal.title.create') : modalMode === 'edit' ? t('admin_news.modal.title.edit') : t('admin_news.modal.title.view')}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {modalMode === 'view' ? (
                /* View Mode */
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={formData.image || ''}
                      alt={formData.title || ''}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl mb-2">{formData.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        formData.status === 'Published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {formData.status}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {formData.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {formData.unit}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {formData.date && new Date(formData.date).toLocaleDateString('id-ID')} • {formData.author}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{formData.content}</p>
                  </div>
                </div>
              ) : (
                /* Create/Edit Mode */
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.title')}</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder={t('admin_news.modal.form.title_placeholder')}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.category')}</label>
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
                      <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.unit')}</label>
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
                      <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.date')}</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.status')}</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      >
                        <option>{t('admin_news.modal.form.status_options.draft')}</option>
                        <option>{t('admin_news.modal.form.status_options.published')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.excerpt')}</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder={t('admin_news.modal.form.excerpt_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.content')}</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder={t('admin_news.modal.form.content_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('admin_news.modal.form.image_url')}</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>{t('admin_news.modal.form.upload')}</span>
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0] || null; setSelectedFile(f); if (f) setFormData({ ...formData, image: '' }); }} />
                    </div>
                    {formData.image && (
                      <div className="mt-3 rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={formData.image}
                          alt={t('admin_news.modal.form.preview_alt')}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    {selectedFile && (
                      <div className="mt-3 text-sm text-gray-600">{selectedFile.name}</div>
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
                {modalMode === 'view' ? t('admin_news.modal.actions.close') : t('admin_news.modal.actions.cancel')}
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{modalMode === 'create' ? t('admin_news.modal.actions.create') : t('admin_news.modal.actions.save')}</span>
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
            <h3 className="text-xl text-center mb-2">{t('admin_news.delete.title')}</h3>
            <p className="text-gray-600 text-center mb-6">
              {t('admin_news.delete.message')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t('admin_news.delete.cancel')}
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                {t('admin_news.delete.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
