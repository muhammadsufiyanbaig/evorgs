'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRight } from 'lucide-react'
import Link from "next/link"

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqs = [
    {
      question: "Branding is simply a more efficient way to sell things?",
      answer: "Branding is much more than just a sales tool. It's about creating a unique identity and emotional connection with customers. A strong brand builds trust, loyalty, and long-term relationships that go beyond simple transactions."
    },
    {
      question: "It's better to be first in the mind than marketplace?",
      answer: "Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur elit. Vesti at bulum nec odio aea the dumm ipsumm ipsum that dolocons rsus mal suada and fadolorit consectetur elit. dummy generator combined looks reasonable."
    },
    {
      question: "Marketing is a company's ultimate objective?",
      answer: "While marketing is crucial, it's just one component of a company's overall strategy. The ultimate objective is typically to create value for customers, employees, and stakeholders while building a sustainable business."
    },
    {
      question: "Positioning is what you do to the mind of the prospect?",
      answer: "Yes, positioning is about creating a distinct and valuable place in the target customer's mind. It's about how your brand is perceived relative to competitors and what unique value proposition you offer."
    },
    {
      question: "Top branding is simply a more efficient way to sell things?",
      answer: "Top branding goes beyond sales efficiency. It's about creating lasting impressions, building trust, and establishing a meaningful connection with your audience that resonates with their values and aspirations."
    },
    {
      question: "What does it take become an author?",
      answer: "Becoming an author requires dedication, creativity, and persistence. It involves developing your writing skills, understanding your audience, and being willing to revise and refine your work continuously."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-[url('/farmHouse-category.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Faq</h1>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-orange-500 transition-colors">
                EvOrgs
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-500">Faq</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto py-16 px-4">
        <Accordion 
          type="single" 
          collapsible 
          className="space-y-4"
          onValueChange={(value) => setOpenItem(value)}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6 py-2 shadow-sm"
            >
              <AccordionTrigger 
                className={`text-lg font-medium hover:no-underline ${
                  openItem === `item-${index}` ? 'text-orange-600' : ''
                }`}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

