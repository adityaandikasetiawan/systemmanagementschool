import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { FormInput } from '../components/FormInput';
import { FormSelect } from '../components/FormSelect';
import { CheckCircle, FileText, Calendar, Users, CreditCard, Award, Download, Upload } from 'lucide-react';
import { t } from '../i18n';

interface AdmissionProps {
  onNavigate?: (page: string) => void;
}

export const Admission: React.FC<AdmissionProps> = ({ onNavigate = () => {} }) => {
  const [selectedUnit, setSelectedUnit] = useState('');

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
    { label: t('site.menu.home', 'Beranda'), href: '#' },
    { label: t('admission.hero.title', 'Pendaftaran Siswa Baru') }
  ];

  const timeline = [
    { phase: t('admission.timeline.phases.registration.title', 'Pendaftaran Online'), date: t('admission.timeline.phases.registration.date', '1 Jan - 28 Feb 2024'), status: 'active' },
    { phase: t('admission.timeline.phases.test.title', 'Tes Seleksi'), date: t('admission.timeline.phases.test.date', '1 - 15 Mar 2024'), status: 'upcoming' },
    { phase: t('admission.timeline.phases.announcement.title', 'Pengumuman'), date: t('admission.timeline.phases.announcement.date', '20 Mar 2024'), status: 'upcoming' },
    { phase: t('admission.timeline.phases.reregistration.title', 'Daftar Ulang'), date: t('admission.timeline.phases.reregistration.date', '25 Mar - 5 Apr 2024'), status: 'upcoming' }
  ];

  const requirements = [
    t('admission.requirements.items.birth_cert', 'Fotokopi Akta Kelahiran (2 lembar)'),
    t('admission.requirements.items.family_card', 'Fotokopi Kartu Keluarga (2 lembar)'),
    t('admission.requirements.items.photo', 'Pas foto terbaru 3x4 (4 lembar)'),
    t('admission.requirements.items.health_cert', 'Surat keterangan sehat dari dokter'),
    t('admission.requirements.items.report_card', 'Fotokopi raport semester terakhir (untuk jenjang SD ke atas)'),
    t('admission.requirements.items.recommendation', 'Surat rekomendasi dari sekolah sebelumnya (jika ada)')
  ];

  const units = [
    {
      code: 'tkit',
      name: t('home.units.items.tkit', 'TKIT Baituljannah'),
      color: '#10B981',
      age: t('admission.units.data.tkit.age', '4-6 tahun'),
      quota: t('admission.units.data.tkit.quota', '60 siswa'),
      fee: 'Rp 15.000.000'
    },
    {
      code: 'sdit',
      name: t('home.units.items.sdit', 'SDIT Baituljannah'),
      color: '#3B82F6',
      age: t('admission.units.data.sdit.age', '6-7 tahun'),
      quota: t('admission.units.data.sdit.quota', '120 siswa'),
      fee: 'Rp 20.000.000'
    },
    {
      code: 'smpit',
      name: t('home.units.items.smpit', 'SMPIT Baituljannah'),
      color: '#F97316',
      age: t('admission.units.data.smpit.age', '12-13 tahun'),
      quota: t('admission.units.data.smpit.quota', '90 siswa'),
      fee: 'Rp 25.000.000'
    },
    {
      code: 'smait',
      name: t('home.units.items.smait', 'SMAIT Baituljannah'),
      color: '#8B5CF6',
      age: t('admission.units.data.smait.age', '15-16 tahun'),
      quota: t('admission.units.data.smait.quota', '90 siswa'),
      fee: 'Rp 28.000.000'
    },
    {
      code: 'slbit',
      name: t('home.units.items.slbit', 'SLBIT Baituljannah'),
      color: '#14B8A6',
      age: t('admission.units.data.slbit.age', '6-18 tahun'),
      quota: t('admission.units.data.slbit.quota', '30 siswa'),
      fee: 'Rp 18.000.000'
    }
  ];

  const steps = [
    {
      icon: FileText,
      title: t('admission.steps.items.form.title', 'Isi Formulir Online'),
      description: t('admission.steps.items.form.desc', 'Lengkapi formulir pendaftaran online dengan data yang benar')
    },
    {
      icon: Upload,
      title: t('admission.steps.items.upload.title', 'Upload Dokumen'),
      description: t('admission.steps.items.upload.desc', 'Upload semua dokumen persyaratan yang dibutuhkan')
    },
    {
      icon: CreditCard,
      title: t('admission.steps.items.payment.title', 'Pembayaran'),
      description: t('admission.steps.items.payment.desc', 'Lakukan pembayaran biaya pendaftaran')
    },
    {
      icon: Calendar,
      title: t('admission.steps.items.test.title', 'Tes Seleksi'),
      description: t('admission.steps.items.test.desc', 'Ikuti tes seleksi sesuai jadwal yang ditentukan')
    },
    {
      icon: CheckCircle,
      title: t('admission.steps.items.announcement.title', 'Pengumuman'),
      description: t('admission.steps.items.announcement.desc', 'Cek pengumuman hasil seleksi')
    },
    {
      icon: Award,
      title: t('admission.steps.items.reregistration.title', 'Daftar Ulang'),
      description: t('admission.steps.items.reregistration.desc', 'Lakukan daftar ulang untuk calon siswa yang diterima')
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('admission.form.success', 'Pendaftaran berhasil! Silakan cek email untuk informasi selanjutnya.'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={t('site.name')}
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="var(--color-primary)"
      />

      <div className="container-custom py-8">
        <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-[var(--color-secondary)] text-gray-900 px-6 py-2 rounded-full mb-4">
            {t('admission.hero.year_badge', '📚 Tahun Ajaran 2024/2025')}
          </div>
          <h1 className="text-white mb-4">{t('admission.hero.title', 'Pendaftaran Siswa Baru')}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            {t('admission.hero.subtitle', 'Bergabunglah dengan keluarga besar Yayasan Baituljannah dan wujudkan masa depan gemilang bersama kami')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary bg-[var(--color-secondary)] text-gray-900 hover:bg-[var(--color-secondary-dark)]">
              {t('admission.hero.button_register', 'Daftar Sekarang')}
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white/10 flex items-center gap-2">
              <Download className="w-5 h-5" />
              {t('admission.hero.button_brochure', 'Download Brosur')}
            </button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="card bg-white shadow-strong">
            <h3 className="text-[var(--color-primary)] mb-6 text-center">{t('admission.timeline.title', 'Jadwal Pendaftaran')}</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    item.status === 'active' 
                      ? 'bg-[var(--color-primary)] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <h4 className="text-gray-900 mb-2">{item.phase}</h4>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  {item.status === 'active' && (
                    <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {t('admission.timeline.status.active', 'Aktif')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unit Selection */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-[var(--color-primary)] mb-4">{t('admission.units.title', 'Pilih Unit Sekolah')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('admission.units.subtitle', 'Silakan pilih unit sekolah yang sesuai dengan jenjang pendidikan yang diinginkan')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {units.map((unit) => (
              <div
                key={unit.code}
                onClick={() => setSelectedUnit(unit.code)}
                className={`card cursor-pointer transition-all duration-300 hover:shadow-strong ${
                  selectedUnit === unit.code ? 'ring-2 ring-[var(--color-primary)] transform scale-105' : 'hover:-translate-y-1'
                }`}
              >
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white" style={{ backgroundColor: unit.color }}>
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-gray-900 mb-3">{unit.name}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{t('admission.units.labels.age', 'Usia')}: {unit.age}</p>
                  <p>{t('admission.units.labels.quota', 'Kuota')}: {unit.quota}</p>
                  <p className="text-gray-900">{t('admission.units.labels.fee', 'Biaya')}: {unit.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-[var(--color-primary)] mb-4">{t('admission.steps.title', 'Alur Pendaftaran')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('admission.steps.subtitle', 'Ikuti langkah-langkah berikut untuk menyelesaikan proses pendaftaran')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl flex items-center justify-center">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[var(--color-primary)] mb-1">{t('admission.steps.step_badge', 'Langkah')} {index + 1}</div>
                  <h4 className="text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[var(--color-primary)] mb-6">{t('admission.requirements.title', 'Persyaratan Pendaftaran')}</h2>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>

              <div className="card bg-[var(--color-secondary)]/20 border-2 border-[var(--color-secondary)] mt-6">
                <h4 className="text-gray-900 mb-3">{t('admission.requirements.note.title', 'Catatan Penting')}</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {t('admission.requirements.note.list.0', 'Semua dokumen harus dalam kondisi baik dan terbaca dengan jelas')}</li>
                  <li>• {t('admission.requirements.note.list.1', 'Biaya pendaftaran sebesar Rp 500.000 (tidak dapat dikembalikan)')}</li>
                  <li>• {t('admission.requirements.note.list.2', 'Pendaftaran dapat dilakukan secara online atau datang langsung')}</li>
                  <li>• {t('admission.requirements.note.list.3', 'Untuk informasi lebih lanjut, hubungi bagian admisi')}</li>
                </ul>
              </div>
            </div>

            {/* Quick Registration Form */}
            <div className="card bg-white shadow-strong border border-gray-100">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl -mt-6 -mx-6 mb-6">
                <h3 className="text-white mb-2">{t('admission.form.title', 'Formulir Pendaftaran Cepat')}</h3>
                <p className="text-white/80 text-sm">{t('admission.form.subtitle', 'Isi data dengan lengkap dan benar')}</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    {t('admission.form.name', 'Nama Lengkap Calon Siswa')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder={t('admission.form.name_placeholder', 'Masukkan nama lengkap')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    {t('admission.form.parent_name', 'Nama Orang Tua/Wali')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder={t('admission.form.parent_name_placeholder', 'Masukkan nama orang tua')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    {t('admission.form.email', 'Email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder={t('admission.form.email_placeholder', 'email@example.com')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    {t('admission.form.phone', 'Nomor Telepon')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder={t('admission.form.phone_placeholder', '08xx-xxxx-xxxx')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    {t('admission.form.unit', 'Unit Sekolah')} <span className="text-red-500">*</span>
                  </label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                  >
                    <option value="">{t('admission.form.unit_placeholder', 'Pilih unit sekolah')}</option>
                    {units.map((unit) => (
                      <option key={unit.code} value={unit.code}>{unit.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {t('admission.form.submit', 'Daftar Sekarang')}
                  </button>
                </div>

                <p className="text-gray-500 text-xs text-center pt-2">
                  {t('admission.form.disclaimer', 'Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-[var(--color-primary)] mb-4">{t('admission.faq.title', 'Pertanyaan yang Sering Diajukan')}</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: t('admission.faq.items.deadline.q', 'Kapan batas akhir pendaftaran?'),
                a: t('admission.faq.items.deadline.a', 'Pendaftaran dibuka mulai 1 Januari hingga 28 Februari 2024 atau hingga kuota terpenuhi.')
              },
              {
                q: t('admission.faq.items.scholarship.q', 'Apakah ada beasiswa yang tersedia?'),
                a: t('admission.faq.items.scholarship.a', 'Ya, kami menyediakan berbagai program beasiswa untuk siswa berprestasi dan kurang mampu. Info lengkap dapat ditanyakan saat pendaftaran.')
              },
              {
                q: t('admission.faq.items.payment.q', 'Bagaimana sistem pembayaran biaya pendidikan?'),
                a: t('admission.faq.items.payment.a', 'Pembayaran dapat dilakukan secara cash atau cicilan. Detail skema pembayaran akan dijelaskan saat daftar ulang.')
              },
              {
                q: t('admission.faq.items.dorm.q', 'Apakah ada asrama untuk siswa?'),
                a: t('admission.faq.items.dorm.a', 'Saat ini asrama tersedia untuk siswa SMAIT dan SMPIT. Fasilitas asrama dilengkapi dengan pembimbing dan pengawas 24 jam.')
              }
            ].map((faq, index) => (
              <div key={index} className="card">
                <h4 className="text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer siteName={t('site.name')} accentColor="var(--color-primary)" onNavigate={onNavigate} logo="/images/logo/logo-yayasan.jpg" />
    </div>
  );
};
