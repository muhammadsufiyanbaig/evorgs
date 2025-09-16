'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorRegisterRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to vendor-specific register route
    router.push('/vendor/auth/register');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-600"></div>
    </div>
  );
}
