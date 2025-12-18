import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { FormSelect } from '../components/FormSelect';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { t } from '../i18n';

interface ContactProps {
  onNavigate?: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    unit: '',
    message: ''
  });

  const menuItems = [
    { label: t('site.menu.home', 'Beranda'), href: '#', onClick: () => onNavigate('main') },
    {
      label: t('site.menu.about', 'Tentang'),
      href: '#',
      submenu: [
        { label: t('site.submenu.vision_mission', 'Visi & Misi'), href: '#', onClick: () => onNavigate('vision-mission') },
        { label: t('site.submenu.curriculum', 'Kurikulum'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.facilities', 'Fasilitas'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.management', 'Kepengurusan'), href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: t('site.menu.profile', 'Profil'),
      href: '#',
      submenu: [
        { label: t('site.submenu.foundation_profile', 'Profil Yayasan'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.history', 'Sejarah'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.submenu.organization', 'Struktur Organisasi'), href: '#', onClick: () => onNavigate('about') },
        { label: t('site.menu.career', 'Peluang Karir'), href: '#', onClick: () => onNavigate('career') }
      ]
    },
    {
      label: t('site.menu.info', 'Informasi'),
      href: '#',
      submenu: [
        { label: t('site.submenu.news', 'Berita'), href: '#', onClick: () => onNavigate('news') },
        { label: t('site.submenu.gallery', 'Galeri'), href: '#', onClick: () => onNavigate('gallery') },
        { label: t('site.submenu.programs', 'Program'), href: '#', onClick: () => onNavigate('programs') }
      ]
    },
    {
      label: t('site.menu.admission', 'SPMB'),
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
    { label: t('site.menu.contact', 'Kontak') }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address', 'Alamat'),
      details: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      color: '#1E4AB8'
    },
    {
      icon: Phone,
      title: t('contact.info.phone', 'Telepon'),
      details: ['(022) 1234-5678', '+62 812-3456-7890'],
      color: '#10B981'
    },
    {
      icon: Mail,
      title: t('contact.info.email', 'Email'),
      details: ['info@baituljannah.sch.id', 'admin@baituljannah.sch.id'],
      color: '#F97316'
    },
    {
      icon: Clock,
      title: t('contact.info.hours', 'Jam Operasional'),
      details: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
      color: '#8B5CF6'
    }
  ];

  const units = [
    { name: t('home.units.items.tkit', 'TKIT Baituljannah'), phone: '(022) 1234-5601', email: 'tkit@baituljannah.sch.id' },
    { name: t('home.units.items.sdit', 'SDIT Baituljannah'), phone: '(022) 1234-5602', email: 'sdit@baituljannah.sch.id' },
    { name: t('home.units.items.smpit', 'SMPIT Baituljannah'), phone: '(022) 1234-5603', email: 'smpit@baituljannah.sch.id' },
    { name: t('home.units.items.smait', 'SMAIT Baituljannah'), phone: '(022) 1234-5604', email: 'smait@baituljannah.sch.id' },
    { name: t('home.units.items.slbit', 'SLBIT Baituljannah'), phone: '(022) 1234-5605', email: 'slbit@baituljannah.sch.id' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert(t('contact.form.success', 'Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.'));
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      unit: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={t('site.name')}
        siteTagline={t('navbar.tagline', "Sekolahnya Para Juara")}
        menuItems={menuItems}
        accentColor="var(--color-primary)"
      />

      <div className="container-custom py-8">
        <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{t('contact.hero.title', 'Hubungi Kami')}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t('contact.hero.subtitle', 'Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui berbagai saluran komunikasi')}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="card bg-white hover:shadow-strong transition-all">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${info.color}15` }}
                >
                  <info.icon className="w-7 h-7" style={{ color: info.color }} />
                </div>
                <h4 className="text-gray-900 mb-3">{info.title}</h4>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-[var(--color-primary)] mb-4">{t('contact.form.title', 'Kirim Pesan')}</h2>
                <p className="text-gray-600">
                  {t('contact.form.subtitle', 'Isi formulir di bawah ini dan kami akan segera merespon pesan Anda')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label={t('contact.form.name', 'Nama Lengkap')}
                  type="text"
                  placeholder={t('contact.form.name_placeholder', 'Masukkan nama lengkap')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label={t('contact.form.email', 'Email')}
                    type="email"
                    placeholder={t('contact.form.email_placeholder', 'email@example.com')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <FormInput
                    label={t('contact.form.phone', 'Nomor Telepon')}
                    type="tel"
                    placeholder={t('contact.form.phone_placeholder', '08xx-xxxx-xxxx')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <FormSelect
                  label={t('contact.form.unit', 'Unit Sekolah yang Dituju')}
                  options={[
                    { value: '', label: t('contact.form.unit_placeholder', 'Pilih unit sekolah') },
                    { value: 'tkit', label: t('home.units.items.tkit', 'TKIT Baituljannah') },
                    { value: 'sdit', label: t('home.units.items.sdit', 'SDIT Baituljannah') },
                    { value: 'smpit', label: t('home.units.items.smpit', 'SMPIT Baituljannah') },
                    { value: 'smait', label: t('home.units.items.smait', 'SMAIT Baituljannah') },
                    { value: 'slbit', label: t('home.units.items.slbit', 'SLBIT Baituljannah') },
                    { value: 'yayasan', label: 'Yayasan (Umum)' }
                  ]}
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                />

                <FormInput
                  label={t('contact.form.subject', 'Subjek')}
                  type="text"
                  placeholder={t('contact.form.subject_placeholder', 'Topik pesan Anda')}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />

                <FormTextarea
                  label={t('contact.form.message', 'Pesan')}
                  placeholder={t('contact.form.message_placeholder', 'Tulis pesan Anda di sini...')}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />

                <button type="submit" className="btn-primary bg-[var(--color-primary)] text-white w-full flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  {t('contact.form.submit', 'Kirim Pesan')}
                </button>
              </form>
            </div>

            {/* Map & Unit Contacts */}
            <div className="space-y-8">
              {/* Map */}
              <div className="card">
                <h3 className="text-gray-900 mb-4">{t('contact.map.title', 'Lokasi Kami')}</h3>
                <div className="bg-gray-200 rounded-xl overflow-hidden h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Map Preview</p>
                    <p className="text-sm text-gray-500">Embed Google Maps here</p>
                  </div>
                </div>
              </div>

              {/* Unit Contacts */}
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-[var(--color-primary)]" />
                  <h3 className="text-gray-900">{t('contact.units.title', 'Kontak Unit Sekolah')}</h3>
                </div>
                <div className="space-y-4">
                  {units.map((unit, index) => (
                    <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <h4 className="text-gray-900 mb-2">{unit.name}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{unit.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{unit.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="card bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
                <h4 className="text-white mb-4">{t('contact.faq.title', 'Pertanyaan Umum?')}</h4>
                <p className="text-white/90 mb-6 text-sm">
                  {t('contact.faq.desc', 'Lihat halaman FAQ kami untuk jawaban cepat atas pertanyaan yang sering diajukan')}
                </p>
                <button className="btn-secondary border-white text-white hover:bg-white/10 w-full">
                  {t('contact.faq.button', 'Lihat FAQ')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-[var(--color-primary)] mb-4">{t('contact.social.title', 'Ikuti Kami')}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('contact.social.desc', 'Dapatkan update terbaru melalui media sosial kami')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {['Facebook', 'Instagram', 'YouTube', 'Twitter', 'LinkedIn'].map((platform) => (
              <button
                key={platform}
                className="px-6 py-3 bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white rounded-xl transition-all"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer siteName={t('site.name')} accentColor="var(--color-primary)" onNavigate={onNavigate} />
    </div>
  );
};
