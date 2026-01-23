import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { api, apiHelpers } from '../services/api';
import { Camera, UserCog, KeyRound } from 'lucide-react';

interface SettingsProps {
  onNavigate?: (page: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate = () => {} }) => {
  const [user, setUser] = useState<any | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  useEffect(() => {
    const u = apiHelpers.getStoredUser();
    setUser(u);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.auth.getCurrentUser();
        if (res.success && res.data) {
          setUser(res.data);
          setFullName(res.data.full_name || '');
          setPhone(res.data.phone || '');
          if (res.data.avatar) {
            const a = String(res.data.avatar);
            const url = (a.startsWith('/uploads') || a.startsWith('http') || a.startsWith('data:')) ? a : `/uploads/${a}`;
            setAvatarPreview(url);
          }
        }
      } catch {}
    };
    load();
  }, []);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => {
      const role = user?.role;
      if (role === 'super_admin') onNavigate('admin-super');
      else if (role === 'admin_unit') onNavigate('admin-unit');
      else if (role === 'guru') onNavigate('admin-guru');
      else if (role === 'siswa') onNavigate('admin-siswa');
      else onNavigate('main');
    } },
    { label: 'Settings', href: '#', onClick: () => {} },
  ];

  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setAvatarFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(String(reader.result));
      reader.readAsDataURL(f);
    }
  };

  const submitAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    setAvatarMessage(null);
    if (!avatarFile) return setAvatarMessage('Pilih file terlebih dahulu');
    try {
      setSavingAvatar(true);
      const res = await api.auth.uploadAvatar(avatarFile);
      if (res.success) {
        setAvatarMessage('Foto profil berhasil diupdate');
      } else {
        setAvatarMessage(res.message || 'Gagal mengupdate foto profil');
      }
    } catch (e: any) {
      setAvatarMessage(e.message || 'Terjadi kesalahan');
    } finally {
      setSavingAvatar(false);
    }
  };

  const submitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);
    try {
      setSavingProfile(true);
      const res = await api.auth.updateProfile({ full_name: fullName, phone });
      if (res.success) {
        setProfileMessage('Informasi pribadi berhasil diupdate');
      } else {
        setProfileMessage(res.message || 'Gagal mengupdate profil');
      }
    } catch (e: any) {
      setProfileMessage(e.message || 'Terjadi kesalahan');
    } finally {
      setSavingProfile(false);
    }
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    if (!currentPassword || !newPassword) return setPasswordMessage('Isi semua kolom password');
    try {
      setSavingPassword(true);
      const res = await api.auth.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordMessage('Password berhasil diupdate');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setPasswordMessage(res.message || 'Gagal mengupdate password');
      }
    } catch (e: any) {
      setPasswordMessage(e.message || 'Terjadi kesalahan');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Pengaturan - Baituljannah"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-5 h-5" />
              <h2>Update Foto Profil</h2>
            </div>
            <form onSubmit={submitAvatar} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={onSelectAvatar} />
              </div>
              <button className="btn-primary" disabled={savingAvatar}>
                {savingAvatar ? 'Menyimpan...' : 'Simpan Foto'}
              </button>
              {avatarMessage && <p className="text-sm text-gray-600">{avatarMessage}</p>}
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <UserCog className="w-5 h-5" />
              <h2>Informasi Pribadi</h2>
            </div>
            <form onSubmit={submitProfile} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nama Lengkap</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" placeholder="Nama Lengkap" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">No. Telepon</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" placeholder="08xxxx" />
              </div>
              <div className="md:col-span-2">
                <button className="btn-primary" disabled={savingProfile}>
                  {savingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                {profileMessage && <p className="text-sm text-gray-600 mt-2">{profileMessage}</p>}
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <KeyRound className="w-5 h-5" />
              <h2>Ubah Password</h2>
            </div>
            <form onSubmit={submitPassword} className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Password Lama</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input" placeholder="Password lama" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Password Baru</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input" placeholder="Password baru" />
              </div>
              <div className="flex items-end">
                <button className="btn-primary w-full" disabled={savingPassword}>
                  {savingPassword ? 'Menyimpan...' : 'Simpan Password'}
                </button>
              </div>
              {passwordMessage && <p className="text-sm text-gray-600 md:col-span-3">{passwordMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
