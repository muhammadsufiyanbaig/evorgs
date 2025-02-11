
export function FeatureCard({ icon, title, description }:{icon: JSX.Element, title: string, description: string}) {
    return (
      <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="text-primary">{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2 text-orange-600">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
              View
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
  