import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BookOpen, Users, Calendar, Phone, Mail, MapPin, User, Building2 } from 'lucide-react';
import { api } from '../services/api';

interface StudentProfileProps {
  onNavigate?: (page: string) => void;
}

interface ProfileData {
  user_id: number;
  email: string;
  full_name: string;
  phone?: string | null;
  photo_url?: string | null;
  gender?: string | null;
  birth_date?: string | null;
  birth_place?: string | null;
  address?: string | null;
  city?: string | null;
  province?: string | null;
  nis?: string | null;
  nisn?: string | null;
  class?: string | null;
  unit?: string | null;
  academic_year?: string | null;
  gpa?: number | null;
  attendance?: number | null;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ onNavigate = () => {} }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('student-dashboard') },
    { label: 'Akademik', href: '#', onClick: () => onNavigate('student-academic') },
    { label: 'Keuangan', href: '#', onClick: () => onNavigate('student-finance') },
    { label: 'Profile', href: '#', onClick: () => {} }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.auth.getStudentProfile();
        if (res.success && res.data) {
          setProfile(res.data.profile);
        } else {
          setError(res.message || 'Gagal memuat profil');
        }
      } catch (e: any) {
        setError(e.message || 'Terjadi kesalahan saat memuat profil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Portal Siswa - Baituljannah"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          {loading && (
            <p className="text-gray-600">Memuat profil...</p>
          )}
          {error && (
            <p className="text-red-600">{error}</p>
          )}
          {profile && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow">
                    <ImageWithFallback 
                      src={profile.photo_url || ''}
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-2xl mt-4">{profile.full_name}</h1>
                  <p className="text-gray-600">{profile.email}</p>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>NIS: {profile.nis || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>NISN: {profile.nisn || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span>Kelas: {profile.class || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span>Unit: {profile.unit || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Tahun Ajaran: {profile.academic_year || '-'}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h2 className="text-lg mb-3">Informasi Pribadi</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Jenis Kelamin: {profile.gender || '-'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Tanggal Lahir: {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString('id-ID') : '-'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>Tempat Lahir: {profile.birth_place || '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h2 className="text-lg mb-3">Kontak & Alamat</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{profile.phone || '-'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{profile.address || '-'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{[profile.city, profile.province].filter(Boolean).join(', ') || '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                  <h2 className="text-lg mb-3">Akademik</h2>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-600">IPK Semester</p>
                      <p className="text-2xl">{profile.gpa ?? '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Kehadiran</p>
                      <p className="text-2xl">{profile.attendance != null ? `${profile.attendance}%` : '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
