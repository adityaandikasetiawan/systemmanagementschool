import React from 'react';
import { AlertCircle, Award, Calendar } from 'lucide-react';

export const RunningText: React.FC = () => {
  return (
    <div className="bg-[var(--color-primary)] text-white text-sm py-2 overflow-hidden border-t border-white/10 relative z-40">
      <div className="animate-marquee whitespace-nowrap inline-block w-full">
        <span className="inline-flex items-center gap-2 mx-12">
          <span className="bg-white/20 p-1 rounded-full"><AlertCircle className="w-3 h-3" /></span>
          <span className="font-medium">Informasi:</span> Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2025/2026 Telah Dibuka!
        </span>
        <span className="inline-flex items-center gap-2 mx-12">
          <span className="bg-white/20 p-1 rounded-full"><Award className="w-3 h-3" /></span>
          <span className="font-medium">Prestasi:</span> Selamat kepada Tim Robotik yang meraih Juara 1 Tingkat Nasional!
        </span>
        <span className="inline-flex items-center gap-2 mx-12">
          <span className="bg-white/20 p-1 rounded-full"><Calendar className="w-3 h-3" /></span>
          <span className="font-medium">Agenda:</span> Jadwal Ujian Akhir Semester Genap dimulai tanggal 15 Juni 2025.
        </span>
      </div>
    </div>
  );
};
