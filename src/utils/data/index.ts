
import { Client } from "@/utils/interfaces";

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

