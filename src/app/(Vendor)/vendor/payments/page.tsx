import Image from "next/image"
import { Check } from "lucide-react"

export default function PaymentLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-orange-100 to-orange-500">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-white/20 backdrop-blur-sm text-orange-600 px-4 py-1 rounded-full text-sm font-semibold">
                Coming soon
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Power your business with Evorgs payments
            </h1>

            <p className="text-lg text-gray-700">
              Low cost, safe and simple payments integrated directly to your Evorgs account for effortless checkout
            </p>

            <ul className="space-y-4">
              {[
                "Get paid by clients online and securely save card details on file.",
                "Receive funds directly to your connected bank account",
                "Coming soon: Optional card terminals for payments in-store",
                "Protect against no shows and cancellations",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Images */}
          <div className="relative">
            <div className="relative z-10 max-w-sm ml-auto">
              <Image
                src=""
                alt="Payment terminal and card interface"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>

            {/* Payment Methods */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-end items-center">
              {[
                "visa",
                "mastercard",
                "maestro",
                "amex",
                "diners",
                "discover",
                "apple-pay",
                "google-pay",
                "contactless",
              ].map((provider) => (
                <div key={provider} className="h-8 w-12 bg-white/80 rounded-md flex items-center justify-center">
                  <span className="sr-only">{provider}</span>
                  {/* Note: In a real implementation, you would use actual payment provider logos */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

