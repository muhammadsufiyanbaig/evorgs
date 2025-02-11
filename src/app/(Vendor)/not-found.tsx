import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-orange-500" />
        <h1 className="text-4xl font-bold text-orange-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-500">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="text-white bg-orange-500 hover:bg-orange-600 w-full">
          <Link href="/" >
            Go back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  )
}

