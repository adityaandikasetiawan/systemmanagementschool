import React from 'react';
import { UnitSchool } from '../../UnitSchool';

interface Props {
  onNavigate: (page: string) => void;
}

export const SLBITPage: React.FC<Props> = ({ onNavigate }) => {
  const config = {
    unitName: 'SLBIT',
    fullName: 'SLBIT Baituljannah',
    accentColor: '#14B8A6',
    icon: '/images/logo/logo-slbit.png',
    description: 'Sekolah Luar Biasa Islam Terpadu yang memberikan pendidikan inklusif dengan perhatian khusus untuk setiap siswa berkebutuhan khusus dengan kasih sayang dan profesionalisme.'
  };

  return <UnitSchool {...config} onNavigate={onNavigate} />;
};
