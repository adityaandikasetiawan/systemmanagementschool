import React from 'react';
import { UnitSchool } from '../../UnitSchool';

interface Props {
  onNavigate: (page: string) => void;
}

export const SMPITPage: React.FC<Props> = ({ onNavigate }) => {
  const config = {
    unitName: 'SMPIT',
    fullName: 'SMPIT Baituljannah',
    accentColor: '#003399', // Biru SMP yang lebih khas (Deep Royal Blue)
    icon: '/images/logo/logo-smpit.png',
    description: 'Sekolah Menengah Pertama Islam Terpadu yang mengintegrasikan ilmu pengetahuan dengan nilai-nilai Islam untuk membentuk remaja yang berkarakter dan berprestasi.'
  };

  return <UnitSchool {...config} onNavigate={onNavigate} />;
};
