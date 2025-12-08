import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { DollarSign, Calendar, Download, CreditCard, CheckCircle, AlertCircle, XCircle, Clock, FileText, TrendingUp, Wallet, ArrowRight, X, Check } from 'lucide-react';
import { api } from '../services/api';
import { t, tf } from '../i18n';

interface StudentFinanceProps {
  onNavigate?: (page: string) => void;
}

interface PaymentItem {
  id: number;
  month: string;
  year: number;
  category: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string | null;
  invoiceNumber: string;
}

export const StudentFinance: React.FC<StudentFinanceProps> = ({ onNavigate = () => {} }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'invoice'>('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);

  const studentData = {
    nis: '2024001',
    name: 'Muhammad Rizki Pratama',
    class: 'XII IPA 1',
    unit: 'SMAIT',
    tahunAjaran: '2024/2025'
  };

  const menuItems = [
    { label: t('student.menu.dashboard'), href: '#', onClick: () => onNavigate('student-dashboard') },
    { label: t('student.menu.academic'), href: '#', onClick: () => {} },
    { label: t('student.menu.finance'), href: '#', onClick: () => {} },
    { label: t('student.menu.profile'), href: '#', onClick: () => {} }
  ];

  const mockPayments: PaymentItem[] = [
    {
      id: 1,
      month: 'Juli',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-07-10',
      paidDate: '2024-07-08',
      status: 'paid',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2024-07-001'
    },
    {
      id: 2,
      month: 'Agustus',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-08-10',
      paidDate: '2024-08-09',
      status: 'paid',
      paymentMethod: 'Virtual Account',
      invoiceNumber: 'INV-2024-08-001'
    },
    {
      id: 3,
      month: 'September',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-09-10',
      paidDate: '2024-09-07',
      status: 'paid',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2024-09-001'
    },
    {
      id: 4,
      month: 'Oktober',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-10-10',
      paidDate: '2024-10-10',
      status: 'paid',
      paymentMethod: 'E-Wallet',
      invoiceNumber: 'INV-2024-10-001'
    },
    {
      id: 5,
      month: 'November',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-11-10',
      paidDate: '2024-11-08',
      status: 'paid',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2024-11-001'
    },
    {
      id: 6,
      month: 'Desember',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-12-10',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      invoiceNumber: 'INV-2024-12-001'
    },
    {
      id: 7,
      month: 'Januari',
      year: 2025,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2025-01-10',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      invoiceNumber: 'INV-2025-01-001'
    }
  ];

  const [payments, setPayments] = useState<PaymentItem[]>(mockPayments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.finance.getStudentPayments(1);
        if (res?.success && res?.data?.payments) {
          const mapped: PaymentItem[] = res.data.payments.map((p: any, idx: number) => ({
            id: p.id ?? idx + 1,
            month: p.month ?? '',
            year: p.year ?? 0,
            category: 'SPP',
            amount: p.amount ?? 0,
            dueDate: p.dueDate ?? '',
            paidDate: p.paidDate ?? null,
            status: p.status ?? 'pending',
            paymentMethod: null,
            invoiceNumber: ''
          }));
          setPayments(mapped);
        }
      } catch {}
      finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const additionalFees = [
    {
      id: 1,
      name: 'Kegiatan Study Tour',
      amount: 2500000,
      dueDate: '2024-12-15',
      status: 'pending' as const
    },
    {
      id: 2,
      name: 'Seragam Batik',
      amount: 350000,
      dueDate: '2024-12-20',
      status: 'pending' as const
    }
  ];

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: t('student.finance.stats.total_paid'),
      value: `Rp ${(totalPaid / 1000000).toFixed(1)}jt`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      detail: `${payments.filter(p => p.status === 'paid').length} ${t('student.finance.stats.months_label')}`
    },
    {
      label: t('student.finance.stats.pending_bills'),
      value: `Rp ${(totalPending / 1000000).toFixed(1)}jt`,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      detail: `${payments.filter(p => p.status === 'pending').length} ${t('student.finance.stats.months_label')}`
    },
    {
      label: t('student.finance.stats.status'),
      value: totalOverdue === 0 ? t('student.finance.status.ok') : t('student.finance.status.has_overdue'),
      icon: totalOverdue === 0 ? CheckCircle : AlertCircle,
      color: totalOverdue === 0 ? 'from-blue-500 to-blue-600' : 'from-red-500 to-red-600',
      detail: totalOverdue === 0 ? t('student.finance.status.no_overdue') : tf('student.finance.stats.overdue_amount_label', { amount: (totalOverdue / 1000000).toFixed(1) })
    },
    {
      label: t('student.finance.stats.monthly_spp_label'),
      value: 'Rp 1,5jt',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      detail: 'SPP Bulanan'
    }
  ];

  const handlePayment = (payment: PaymentItem) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          {t('student.finance.status.paid')}
        </span>;
      case 'pending':
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {t('student.finance.status.pending')}
        </span>;
      case 'overdue':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          {t('student.finance.status.overdue')}
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={t('student.finance.site_title')}
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl mb-2">{t('student.finance.header')}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white/90">
                <span>{studentData.name}</span>
                <span>•</span>
                <span>{studentData.nis}</span>
                <span>•</span>
                <span>{studentData.class}</span>
                <span>•</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {t('student.finance.academic_year_short')} {studentData.tahunAjaran}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>{t('student.finance.download_summary')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'overview'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('student.finance.tabs.overview')}
              </button>
              <button
                onClick={() => setSelectedTab('history')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'history'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('student.finance.tabs.history')}
              </button>
              <button
                onClick={() => setSelectedTab('invoice')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'invoice'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('student.finance.tabs.invoice')}
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Pending Payments */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    {t('student.finance.pending_section.title')}
                  </h3>
                  <div className="space-y-3">
                    {payments.filter(p => p.status === 'pending' || p.status === 'overdue').map((payment) => (
                      <div key={payment.id} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium mb-1">{payment.category} - {payment.month} {payment.year}</h4>
                            <p className="text-sm text-gray-600">{t('student.finance.due_date')}: {new Date(payment.dueDate).toLocaleDateString('id-ID')}</p>
                          </div>
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl text-[#1E4AB8]">{formatCurrency(payment.amount)}</p>
                          <button
                            onClick={() => handlePayment(payment)}
                            className="px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>{t('student.finance.pay_now')}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Fees */}
                {additionalFees.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      {t('student.finance.other_fees.title')}
                    </h3>
                    <div className="space-y-3">
                      {additionalFees.map((fee) => (
                        <div key={fee.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium mb-1">{fee.name}</h4>
                              <p className="text-sm text-gray-600">{t('student.finance.due_date')}: {new Date(fee.dueDate).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl mb-2">{formatCurrency(fee.amount)}</p>
                              <button className="px-4 py-1 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                                {t('student.finance.pay')}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="text-lg mb-4">{tf('student.finance.summary.title', { period: studentData.tahunAjaran })}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">{t('student.finance.summary.total_spp')}</p>
                      <p className="text-2xl text-gray-800">{formatCurrency(payments.length * 1500000)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">{t('student.finance.summary.paid')}</p>
                      <p className="text-2xl text-green-600">{formatCurrency(totalPaid)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">{t('student.finance.summary.remaining')}</p>
                      <p className="text-2xl text-orange-600">{formatCurrency(totalPending)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {selectedTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t('student.finance.history.title')}</h3>
                  <select className="px-4 py-2 border border-gray-200 rounded-xl outline-none">
                    <option>{t('student.finance.history.filters.all_status')}</option>
                    <option>{t('student.finance.history.filters.paid')}</option>
                    <option>{t('student.finance.history.filters.pending')}</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.period')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.category')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.amount')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.due')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.paid_date')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.method')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.status')}</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">{t('student.finance.history.table.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, idx) => (
                        <tr key={payment.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="px-4 py-3 text-sm">{payment.month} {payment.year}</td>
                          <td className="px-4 py-3 text-sm">{payment.category}</td>
                          <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-4 py-3 text-sm">{new Date(payment.dueDate).toLocaleDateString('id-ID')}</td>
                          <td className="px-4 py-3 text-sm">
                            {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('id-ID') : '-'}
                          </td>
                          <td className="px-4 py-3 text-sm">{payment.paymentMethod || '-'}</td>
                          <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                          <td className="px-4 py-3">
                            {payment.status === 'paid' ? (
                              <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePayment(payment)}
                                className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm"
                              >
                                {t('student.finance.pay')}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Invoice Tab */}
            {selectedTab === 'invoice' && (
              <div className="space-y-4">
                <h3 className="text-lg mb-4">{t('student.finance.invoice.title')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {payments.filter(p => p.status === 'paid').map((payment) => (
                    <div key={payment.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium mb-1">{payment.month} {payment.year}</h4>
                          <p className="text-sm text-gray-600">{t('student.finance.invoice.number_label')}: {payment.invoiceNumber}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {t('student.finance.status.paid')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <p className="text-xl mb-1">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-gray-500">{t('student.finance.invoice.paid_on')}: {payment.paidDate && new Date(payment.paidDate).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            <FileText className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">{t('student.finance.modal.title')}</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Payment Details */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-medium mb-4">{t('student.finance.modal.details.title')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('student.finance.modal.details.period')}</span>
                    <span className="font-medium">{selectedPayment.month} {selectedPayment.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('student.finance.modal.details.category')}</span>
                    <span className="font-medium">{selectedPayment.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('student.finance.due_date')}</span>
                    <span className="font-medium">{new Date(selectedPayment.dueDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-medium">{t('student.finance.modal.details.total_bill')}</span>
                    <span className="text-2xl text-[#1E4AB8]">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-medium mb-4">{t('student.finance.modal.method.title')}</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#1E4AB8] transition-colors">
                    <input type="radio" name="payment" className="mr-3" defaultChecked />
                    <div className="flex-1">
                      <p className="font-medium">{t('student.finance.modal.method.bank_transfer')}</p>
                      <p className="text-sm text-gray-600">{t('student.finance.modal.method.bank_list')}</p>
                    </div>
                    <Wallet className="w-6 h-6 text-gray-400" />
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#1E4AB8] transition-colors">
                    <input type="radio" name="payment" className="mr-3" />
                    <div className="flex-1">
                      <p className="font-medium">{t('student.finance.modal.method.virtual_account')}</p>
                      <p className="text-sm text-gray-600">{t('student.finance.modal.method.virtual_desc')}</p>
                    </div>
                    <CreditCard className="w-6 h-6 text-gray-400" />
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#1E4AB8] transition-colors">
                    <input type="radio" name="payment" className="mr-3" />
                    <div className="flex-1">
                      <p className="font-medium">{t('student.finance.modal.method.ewallet')}</p>
                      <p className="text-sm text-gray-600">{t('student.finance.modal.method.ewallet_list')}</p>
                    </div>
                    <DollarSign className="w-6 h-6 text-gray-400" />
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t('student.finance.modal.cancel')}
              </button>
              <button className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2">
                <span>{t('student.finance.modal.continue_payment')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
