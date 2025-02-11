"use client";
import { usePathname } from 'next/navigation';
import Header from '../../Reuseable/Header';
import DownloadBanner from '../AllCategories/LandingPage/DownloadBanner';
import Footer from '../AllCategories/LandingPage/Footer';

const HeaderFooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const hideHeaderFooter = [
    '/login',
    '/register',
    '/forget-password',
    '/otp-verification',
  ].includes(pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <DownloadBanner />}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default HeaderFooterWrapper;