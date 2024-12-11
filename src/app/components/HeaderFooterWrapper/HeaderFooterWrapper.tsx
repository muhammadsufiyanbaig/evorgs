"use client";
import { usePathname } from 'next/navigation';
import Header from '../Header';
import DownloadBanner from '../LandingPage/DownloadBanner';
import Footer from '../LandingPage/Footer';

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