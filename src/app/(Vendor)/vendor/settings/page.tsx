"use client"

import { FeatureCard } from "@/app/components/Vendor/VendorSetting"
import { sections } from "@/utils/data"
import { useState } from "react"


export default function WorkspaceSettings() {
  const [activeTab, setActiveTab] = useState("settings")

  const scrollToSection = (id:string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveTab(id)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold mb-2">Workspace settings</h1>
        <p className="text-gray-600 mb-8">Manage settings for Innovative Widget.</p>

        <div className="sticky top-0 z-10 -mx-4 bg-gray-50/80 backdrop-blur-sm shadow-sm">
          <nav className="flex space-x-4 mb-0 border-b px-4 py-4 max-w-7xl mx-auto">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                  activeTab === id ? "text-primary" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
                {activeTab === id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </nav>
        </div>

        {sections.map(({ id, label, features }) => (
          <section key={id} id={id} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{label}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
