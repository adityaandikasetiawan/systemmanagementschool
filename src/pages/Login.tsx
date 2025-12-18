import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, UserCircle, Lock, Mail, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { api } from '../services/api';
import { t } from '../i18n';

interface LoginProps {
  onNavigate?: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'teacher' | 'student' | 'parent'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const fillDevCredentials = () => {
    setFormData({ email: 'admin@baituljannah.sch.id', password: '123' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorDetail(null);
    setLoading(true);
    try {
      const res = await api.auth.login(formData.email, formData.password);
      if (res.success && res.data && (res as any).data.user) {
        const roleRaw = (res as any).data.user.role;
        const role = String(roleRaw || '').toLowerCase();
        if (role === 'super_admin' || role === 'admin' || role === 'admin_unit') {
          onNavigate('admin-super');
        } else if (role === 'guru' || role === 'teacher') {
          onNavigate('teacher-dashboard');
        } else if (role === 'siswa' || role === 'student') {
          onNavigate('student-dashboard');
        } else if (role === 'orang_tua' || role === 'parent' || role === 'ortu') {
          onNavigate('parent-dashboard');
        } else {
          onNavigate('main');
        }
      } else {
        setError(res.message || 'Login gagal');
        if (res.message === 'Login failed') {
          setErrorDetail('Server autentikasi sedang bermasalah atau database belum tersambung. Coba kembali beberapa saat lagi, atau gunakan kredensial pengujian di lingkungan pengembangan.');
        }
      }
    } catch (err: any) {
      const msg = err?.message || 'Terjadi kesalahan';
      setError(msg);
      if (msg === 'Login failed') {
        setErrorDetail('Server autentikasi sedang bermasalah atau database belum tersambung. Gunakan kredensial dev untuk uji sementara atau hubungi admin backend.');
      } else if (msg === 'Invalid email or password') {
        setErrorDetail('Pastikan email/username dan password sesuai. Jika lupa password, gunakan fitur pemulihan.');
      } else if (msg === 'Request failed') {
        setErrorDetail('Tidak dapat terhubung ke server. Periksa koneksi internet atau status server backend.');
      }
      if (import.meta.env.DEV && formData.password === '123') {
        const lower = formData.email.toLowerCase();
        let role = 'student';
        if (lower.includes('admin.sdit')) role = 'admin_unit';
        else if (lower.includes('admin@baituljannah')) role = 'super_admin';
        else if (lower.includes('parent') || lower.includes('@parent.')) role = 'orang_tua';
        else if (lower.includes('student') || lower.includes('@student.')) role = 'siswa';
        else if (lower.includes('ahmad@baituljannah') || lower.includes('ustadz')) role = 'guru';
        const user = { id: 'dev', email: formData.email, role } as any;
        localStorage.setItem('baituljannah_token', 'dev');
        localStorage.setItem('baituljannah_user', JSON.stringify(user));
        if (role === 'super_admin' || role === 'admin' || role === 'admin_unit') {
          onNavigate('admin-super');
        } else if (role === 'guru' || role === 'teacher') {
          onNavigate('teacher-dashboard');
        } else if (role === 'siswa' || role === 'student') {
          onNavigate('student-dashboard');
        } else if (role === 'orang_tua' || role === 'parent' || role === 'ortu') {
          onNavigate('parent-dashboard');
        } else {
          onNavigate('main');
        }
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      id: 'student',
      label: t('login.types.student.label'),
      icon: '👨‍🎓',
      color: 'from-blue-500 to-blue-600',
      description: t('login.types.student.description')
    },
    {
      id: 'parent',
      label: t('login.types.parent.label'),
      icon: '👨‍👩‍👧',
      color: 'from-green-500 to-green-600',
      description: t('login.types.parent.description')
    },
    {
      id: 'teacher',
      label: t('login.types.teacher.label'),
      icon: '👨‍🏫',
      color: 'from-purple-500 to-purple-600',
      description: t('login.types.teacher.description')
    },
    {
      id: 'admin',
      label: t('login.types.admin.label'),
      icon: '👤',
      color: 'from-orange-500 to-orange-600',
      description: t('login.types.admin.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E4AB8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container-custom min-h-screen flex items-center justify-center py-12 px-4 relative z-10">
        <div className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding */}
            <div className="hidden md:block">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-strong">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl flex items-center justify-center mb-6 shadow-strong">
                    <span className="text-4xl">🕌</span>
                  </div>
                  <h1 className="text-4xl mb-4">
                    Yayasan <span className="text-[#1E4AB8]">Baituljannah</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Sistem Manajemen Sekolah Islam Terpadu
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600">✓</span>
                      </div>
                      <span>Pendidikan Berkualitas Islami</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600">✓</span>
                      </div>
                      <span>5 Unit Pendidikan Lengkap</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600">✓</span>
                      </div>
                      <span>Guru Professional & Berpengalaman</span>
                    </div>
                  </div>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden shadow-strong">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c"
                    alt="Baituljannah School"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
              {/* Mobile Logo */}
              <div className="md:hidden mb-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl flex items-center justify-center mb-4 shadow-strong mx-auto">
                  <span className="text-3xl">🕌</span>
                </div>
                <h1 className="text-2xl mb-2">
                  Yayasan <span className="text-[#1E4AB8]">Baituljannah</span>
                </h1>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl mb-2">{t('login.welcome_title')}</h2>
                <p className="text-gray-600">{t('login.welcome_subtitle')}</p>
              </div>

              {/* User Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('login.login_as')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setUserType(type.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        userType === type.id
                          ? 'border-[#1E4AB8] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl shadow-soft`}>
                          {type.icon}
                        </div>
                        <div>
                          <p className="font-medium">{type.label}</p>
                          <p className="text-xs text-gray-500">{type.description}</p>
                        </div>
                      </div>
                      {userType === type.id && (
                        <div className="mt-2 flex justify-end">
                          <div className="w-6 h-6 rounded-full bg-[#1E4AB8] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">{error}</div>
                    {errorDetail && (
                      <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-xs">
                        {errorDetail}
                        {error === 'Login failed' && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-gray-600">{t('login.dev_creds')}</span>
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">admin@baituljannah.sch.id</span>
                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">123</span>
                            <button type="button" onClick={fillDevCredentials} className="ml-auto text-[#1E4AB8] hover:underline">{t('login.fill_auto')}</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {/* Email/Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{userType === 'student' ? t('login.email_label_student') : t('login.email_label_other')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={userType === 'student' ? t('login.email_placeholder_student') : t('login.email_placeholder_other')}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('login.password_label')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={t('login.password_placeholder')}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-[#1E4AB8] rounded" />
                    <span className="text-sm text-gray-600">{t('login.remember_me')}</span>
                  </label>
                  <button type="button" className="text-sm text-[#1E4AB8] hover:underline">{t('login.forgot_password')}</button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full px-6 py-4 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6]'} text-white rounded-xl hover:shadow-strong transition-all flex items-center justify-center gap-2 group`}
                  disabled={loading}
                >
                  <LogIn className="w-5 h-5" />
                  <span>{loading ? t('login.processing') : t('login.submit')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">{t('login.divider_or', 'atau')}</span>
                </div>
              </div>

              {/* Back to Homepage */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('main')}
                  className="text-gray-600 hover:text-[#1E4AB8] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>{t('login.back_home')}</span>
                </button>
              </div>

              
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2024 Yayasan Baituljannah. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
