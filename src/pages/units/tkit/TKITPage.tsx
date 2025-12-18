import React from 'react';
import { UnitSchool } from '../../UnitSchool';

interface Props {
  onNavigate: (page: string) => void;
}

export const TKITPage: React.FC<Props> = ({ onNavigate }) => {
  const config = {
    unitName: 'TKIT',
    fullName: 'TKIT Baituljannah',
    accentColor: '#10B981',
    icon: '/images/logo/logo-tkit.png',
    description: 'Pendidikan anak usia dini berbasis Islam dengan metode pembelajaran yang menyenangkan dan mengembangkan potensi anak secara optimal melalui pendekatan holistik.'
  };

  return <UnitSchool {...config} onNavigate={onNavigate} />;
};
