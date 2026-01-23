import React from 'react';
import { UnitSchool } from '../../UnitSchool';

interface Props {
  onNavigate: (page: string) => void;
}

export const SMAITPage: React.FC<Props> = ({ onNavigate }) => {
  const config = {
    unitName: 'SMAIT',
    fullName: 'SMAIT Baituljannah',
    accentColor: '#586c7d', // Abu-abu SMA (Slate Grey) yang elegan
    icon: '/images/logo/logo-smait.png',
    description: 'Sekolah Menengah Atas Islam Terpadu yang mempersiapkan siswa menjadi pemimpin masa depan yang berakhlak mulia, cerdas, dan siap menghadapi tantangan global.'
  };

  return <UnitSchool {...config} onNavigate={onNavigate} />;
};
