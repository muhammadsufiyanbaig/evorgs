
import { Client } from "@/utils/interfaces";
import {
  Building2,
  Calendar,
  CreditCard,
  Users,
  FileText,
  Wallet,
  Store,
  ChromeIcon as Google,
  Facebook,
  Link2,
  Zap,
  Tag,
  DollarSign,
  Mail,
  Star,
  PlusCircle,
  Network,
} from "lucide-react"

const today = new Date()
today.setHours(0, 0, 0, 0)



export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Services",
    hash: "#services",
  },
  {
    name: "Destinations",
    hash: "#destinations",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const clients: Client[] = Array.from({ length: 50 }, (_, i) => ({
  id: `client-${i + 1}`,
  name: `${["Jack", "Jane", "John", "Sarah", "Mike"][Math.floor(Math.random() * 5)]} ${
    ["Doe", "Smith", "Johnson", "Williams", "Brown"][Math.floor(Math.random() * 5)]
  }`,
  email: `client${i + 1}@example.com`,
  mobileNumber: Math.random() > 0.3 ? `+1${Math.floor(Math.random() * 1000000000)}` : null,
  reviews: Math.floor(Math.random() * 50),
  sales: Math.floor(Math.random() * 100000),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
}))


export const sections = [
  {
    id: "settings",
    label: "Settings",
    features: [
      { icon: <Building2 className="w-6 h-6 text-orange-500" />, title: "Business setup", description: "Customise business details, manage locations, and client referral sources." },
      { icon: <Calendar className="w-6 h-6 text-orange-500" />, title: "Scheduling", description: "Set your availability, manage bookable resources and online booking preferences." },
      { icon: <CreditCard className="w-6 h-6 text-orange-500" />, title: "Sales", description: "Configure payment methods, taxes, receipts, service charges and gift cards." },
      { icon: <Users className="w-6 h-6 text-orange-500" />, title: "Team", description: "Manage permissions, compensation and time-off." },
      { icon: <FileText className="w-6 h-6 text-orange-500" />, title: "Forms", description: "Configure templates for client forms." },
      { icon: <Wallet className="w-6 h-6 text-orange-500" />, title: "Payments", description: "Configure payment methods, terminals and your payment policy." },
    ],
  },
  {
    id: "online-presence",
    label: "Online presence",
    features: [
      { icon: <Store className="w-6 h-6 text-orange-500" />, title: "Marketplace profile", description: "Attract new clients with online bookings." },
      { icon: <Google className="w-6 h-6 text-orange-500" />, title: "Reserve with Google", description: "Get online bookings from Google Search and Maps." },
      { icon: <Facebook className="w-6 h-6 text-orange-500" />, title: "Book with Facebook and Instagram", description: "Get online bookings from your social media pages." },
      { icon: <Link2 className="w-6 h-6 text-orange-500" />, title: "Link builder", description: "Create shareable booking links and QR codes." },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    features: [
      { icon: <Zap className="w-6 h-6 text-orange-500" />, title: "Automations", description: "Engage with your clients and keep them up to date with automations." },
      { icon: <Tag className="w-6 h-6 text-orange-500" />, title: "Deals", description: "Reward and retain clients with discount codes, flash sales and promotion offers." },
      { icon: <DollarSign className="w-6 h-6 text-orange-500" />, title: "Smart pricing", description: "Adjust your prices to charge different amounts during more or less busy hours." },
      { icon: <Mail className="w-6 h-6 text-orange-500" />, title: "Sent messages", description: "View the list of all email, text and push messages sent to your clients." },
      { icon: <Star className="w-6 h-6 text-orange-500" />, title: "Ratings and reviews", description: "View star ratings and reviews left by clients after their visit." },
    ],
  },
  {
    id: "other",
    label: "Other",
    features: [
      { icon: <PlusCircle className="w-6 h-6 text-orange-500" />, title: "Add-ons", description: "Take your business to the next level with Fresha add-ons." },
      { icon: <Network className="w-6 h-6 text-orange-500" />, title: "Integrations", description: "Integrate Fresha with third party applications." },
    ],
  },
]