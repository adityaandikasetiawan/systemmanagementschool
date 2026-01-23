export interface MenuItem {
  label: string;
  href: string;
  onClick?: () => void;
  image?: string;
  submenu?: { label: string; href: string; onClick?: () => void; image?: string }[];
}

export interface NavbarProps {
  logo?: string;
  siteName: string;
  siteTagline?: string;
  accentColor?: string;
  menuItems: MenuItem[];
  hideUserInfo?: boolean;
  hideLogout?: boolean;
  isSticky?: boolean;
}
