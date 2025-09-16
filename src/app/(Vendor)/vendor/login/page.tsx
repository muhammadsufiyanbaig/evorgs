'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorLoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to vendor-specific login route
    router.push('/vendor/auth/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-600"></div>
    </div>
  );
}
