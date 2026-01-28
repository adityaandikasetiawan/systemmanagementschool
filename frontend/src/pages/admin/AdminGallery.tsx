import React, { useState, useEffect } from 'react';
import { t } from '../../i18n';
import { Image as ImageIcon, Plus, Edit, Trash2, Search, Filter, Calendar, X, Check, Upload, Grid, List, Download, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

interface AdminGalleryProps {
  onNavigate?: (page: string) => void;
  embedded?: boolean;
}

interface GalleryItem {
  id: string | number;
  title: string;
  category: string;
  unit: string;
  date: string;
  photographer: string;
  description: string;
  image: string;
  downloads: number;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ onNavigate = () => {}, embedded = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const sq = localStorage.getItem('bj_admin_gallery_search');
      const fc = localStorage.getItem('bj_admin_gallery_filter');
      const vm = localStorage.getItem('bj_admin_gallery_view') as 'grid' | 'list' | null;
      if (sq !== null) setSearchQuery(sq);
      if (fc !== null) setFilterCategory(fc);
      if (vm === 'grid' || vm === 'list') setViewMode(vm);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('bj_admin_gallery_search', searchQuery); } catch {}
  }, [searchQuery]);

  useEffect(() => {
    try { localStorage.setItem('bj_admin_gallery_filter', filterCategory); } catch {}
  }, [filterCategory]);

  useEffect(() => {
    try { localStorage.setItem('bj_admin_gallery_view', viewMode); } catch {}
  }, [viewMode]);

  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Kegiatan',
    unit: 'Semua Unit',
    date: new Date().toISOString().split('T')[0],
    photographer: 'Admin Yayasan',
    description: '',
    image: ''
  });

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Olahraga', 'Kegiatan', 'Fasilitas', 'Prestasi'];
  const units = ['Semua Unit', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT', 'Yayasan'];

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await (await import('../../services/api')).api.gallery.getAll();
      const list = res && res.success && res.data ? res.data : [];
      const mapped: GalleryItem[] = list.map((g: any) => ({
        id: String(g.id || Date.now()),
        title: g.title || '',
        category: g.category || 'Kegiatan',
        unit: 'Semua Unit',
        date: g.event_date || new Date().toISOString().split('T')[0],
        photographer: 'Admin Yayasan',
        description: g.description || '',
        image: g.image_url,
        downloads: g.views || 0,
      }));
      setGalleryList(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      category: 'Kegiatan',
      unit: 'Semua Unit',
      date: new Date().toISOString().split('T')[0],
      photographer: 'Admin Yayasan',
      description: '',
      image: ''
    });
    setUploadedFile(null);
    setShowModal(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setModalMode('edit');
    setSelectedImage(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await (await import('../../services/api')).api.gallery.delete(id);
      fetchGallery();
      setShowDeleteConfirm(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (modalMode === 'create') {
        const fd = new FormData();
        fd.append('title', formData.title || '');
        fd.append('category', formData.category || 'Kegiatan');
        fd.append('description', formData.description || '');
        fd.append('event_date', formData.date || '');
        if (uploadedFile) {
          fd.append('image', uploadedFile);
        }
        await (await import('../../services/api')).api.gallery.upload(fd);
      } else if (modalMode === 'edit' && selectedImage) {
        const payload = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            event_date: formData.date,
        };
        await (await import('../../services/api')).api.gallery.update(selectedImage.id, payload);
      }
      setShowModal(false);
      fetchGallery();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGallery = galleryList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Galeri Foto</h1>
          <p className="text-gray-600">Kelola foto kegiatan sekolah</p>
        </div>
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Tambah Foto
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari foto..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex border rounded-lg overflow-hidden">
                <button
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                    onClick={() => setViewMode('grid')}
                >
                    <Grid className="w-5 h-5 text-gray-600" />
                </button>
                <button
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                    onClick={() => setViewMode('list')}
                >
                    <List className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </div>
      </div>

      {isLoading ? (
          <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
      ) : (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGallery.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="relative aspect-video">
                            <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => handleEdit(item)} className="p-2 bg-white/90 rounded-full hover:bg-white text-blue-600">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => setShowDeleteConfirm(item.id)} className="p-2 bg-white/90 rounded-full hover:bg-white text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{item.category}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {item.date}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Foto</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Judul</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredGallery.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden">
                                        <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-1 hover:bg-blue-50 text-blue-600 rounded">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setShowDeleteConfirm(item.id)} className="p-1 hover:bg-red-50 text-red-600 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">{modalMode === 'create' ? 'Tambah Foto' : 'Edit Foto'}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Foto</label>
                <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Kategori</label>
                    <select
                        className="w-full px-3 py-2 border rounded-lg"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                        {categories.filter(c => c !== 'Semua').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tanggal</label>
                    <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              {modalMode === 'create' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Foto</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={e => setUploadedFile(e.target.files?.[0] || null)}
                        />
                        {uploadedFile ? (
                            <div className="text-sm text-green-600 font-medium flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" />
                                {uploadedFile.name}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm">
                                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p>Klik atau drag foto ke sini</p>
                            </div>
                        )}
                    </div>
                  </div>
              )}
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {isLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirm */}
      {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                  <h3 className="text-lg font-bold mb-2">Hapus Foto?</h3>
                  <p className="text-gray-600 mb-6">Foto yang dihapus tidak dapat dikembalikan.</p>
                  <div className="flex justify-end gap-3">
                      <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                      <button onClick={() => handleDelete(showDeleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Hapus</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
