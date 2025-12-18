import React from 'react';
import { UnitSchool } from '../../UnitSchool';

interface Props {
  onNavigate: (page: string) => void;
}

export const AsramaPage: React.FC<Props> = ({ onNavigate }) => {
  const config = {
    unitName: 'ASRAMA',
    fullName: 'Asrama Baituljannah',
    accentColor: '#D4AF37',
    icon: '/images/logo/logo-asrama.png',
    description: 'Asrama putra dan putri dengan fasilitas lengkap dan pembinaan karakter Islami yang intensif, menciptakan lingkungan yang kondusif untuk belajar dan beribadah.'
  };

  return <UnitSchool {...config} onNavigate={onNavigate} />;
};
