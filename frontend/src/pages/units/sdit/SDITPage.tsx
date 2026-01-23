import React from 'react';
import { UnitSchool } from '../../UnitSchool';

interface Props {
  onNavigate: (page: string) => void;
}

export const SDITPage: React.FC<Props> = ({ onNavigate }) => {
  const config = {
    unitName: 'SDIT',
    fullName: 'SDIT Baituljannah',
    accentColor: '#3B82F6',
    icon: '/images/logo/logo-sdit.png',
    description: 'Sekolah Dasar Islam Terpadu dengan kurikulum nasional plus pendidikan agama Islam yang komprehensif untuk membentuk generasi Qur\'ani yang cerdas dan berakhlak mulia.'
  };

  return <UnitSchool {...config} onNavigate={onNavigate} />;
};
