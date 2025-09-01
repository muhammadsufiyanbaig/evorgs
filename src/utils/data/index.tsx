
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
import type { Booking, Service, User, CateringCustomPackage, PhotographyCustomOrder } from "@/utils/interfaces";


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

export interface Comment {
  id: number
  author: string
  avatar?: string
  content: string
  date: string
  likes: number
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  summary: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  views: number
  likes: number
  comments: Comment[]
}
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "choosing-perfect-wedding-venue",
    title: "Choosing the Perfect Wedding Venue",
    excerpt:
      "Discover the essential factors to consider when selecting your dream wedding venue, from capacity to ambiance.",
    content: `
      <h2>Location is Everything</h2>
      <p>The venue sets the tone for your entire celebration. Whether you're dreaming of a romantic garden party or an elegant ballroom affair, the right location creates the perfect backdrop for your special day.</p>
      
      <h3>Key Factors to Consider</h3>
      <p>When evaluating potential venues, keep these essential elements in mind:</p>
      <ul>
        <li><strong>Capacity:</strong> Ensure the space comfortably fits your guest list</li>
        <li><strong>Accessibility:</strong> Consider parking, public transport, and mobility access</li>
        <li><strong>Ambiance:</strong> Choose a setting that reflects your style and vision</li>
        <li><strong>Amenities:</strong> Check for necessary facilities like restrooms, kitchen access, and AV equipment</li>
      </ul>
      
      <h3>Indoor vs. Outdoor Venues</h3>
      <p>Indoor venues offer climate control and predictable conditions, while outdoor spaces provide natural beauty and unique photo opportunities. Consider your season, guest comfort, and backup plans when making this decision.</p>
      
      <p>The perfect venue isn't just about the space—it's about finding a location that feels authentically you and creates the atmosphere you've always envisioned for your celebration.</p>
    `,
    summary:
      "Selecting the right wedding venue involves balancing practical considerations like capacity and accessibility with personal preferences for ambiance and style. The perfect venue creates an authentic atmosphere that reflects your vision while ensuring guest comfort and memorable experiences.",
    image: "/venue-category.jpg",
    author: "Isabella Martinez",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    category: "Venue",
    tags: ["Wedding Venue", "Event Planning", "Venue Selection", "Wedding Tips"],
    views: 3247,
    likes: 189,
    comments: [
      {
        id: 1,
        author: "Sarah Johnson",
        content:
          "This guide helped us narrow down our venue options so much! The accessibility checklist was especially useful.",
        date: "Dec 16, 2024",
        likes: 15,
      },
      {
        id: 2,
        author: "Michael Chen",
        content:
          "Great point about considering the season for outdoor venues. We almost made that mistake!",
        date: "Dec 16, 2024",
        likes: 12,
      },
      {
        id: 3,
        author: "Emma Davis",
        content: "The ambiance section really resonated with me. It's not just about the space, but the feeling it creates.",
        date: "Dec 17, 2024",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    slug: "rustic-farmhouse-wedding-guide",
    title: "The Ultimate Rustic Farmhouse Wedding Guide",
    excerpt:
      "Create a charming countryside celebration with authentic farmhouse elements, from décor to dining.",
    content: `
      <h2>Embracing Rustic Elegance</h2>
      <p>Farmhouse weddings combine the charm of rural settings with sophisticated celebration elements. This style celebrates natural beauty, vintage touches, and the warmth of countryside hospitality.</p>
      
      <h3>Essential Farmhouse Elements</h3>
      <p>Creating an authentic farmhouse atmosphere requires attention to these key details:</p>
      <ul>
        <li><strong>Natural Materials:</strong> Wood, burlap, mason jars, and wildflowers</li>
        <li><strong>Vintage Touches:</strong> Antique furniture, vintage signs, and heirloom decorations</li>
        <li><strong>Outdoor Ceremonies:</strong> Barn ceremonies, garden settings, or orchard backdrops</li>
        <li><strong>Comfort Food:</strong> Family-style dining, BBQ stations, and homemade desserts</li>
      </ul>
      
      <h3>Planning Your Farmhouse Celebration</h3>
      <p>Successful farmhouse weddings balance rustic charm with guest comfort. Consider weather contingencies, provide adequate seating, and ensure your catering can handle outdoor service requirements.</p>
      
      <p>Remember, farmhouse weddings are about creating a warm, welcoming atmosphere where guests feel like they're part of an extended family gathering in the most beautiful countryside setting.</p>
    `,
    summary:
      "Farmhouse weddings blend rustic charm with sophisticated celebration, featuring natural materials, vintage elements, and countryside hospitality. Success lies in balancing authentic farmhouse aesthetics with practical guest comfort considerations.",
    image: "/farmHouse-category.jpg",
    author: "Robert Hayes",
    date: "Dec 12, 2024",
    readTime: "8 min read",
    category: "Farmhouse",
    tags: ["Farmhouse Wedding", "Rustic Décor", "Countryside Events", "Vintage Style"],
    views: 2891,
    likes: 156,
    comments: [
      {
        id: 1,
        author: "Jennifer Lee",
        content:
          "We're planning a farmhouse wedding and this covers everything! Love the emphasis on comfort food.",
        date: "Dec 13, 2024",
        likes: 18,
      },
      {
        id: 2,
        author: "David Wilson",
        content: "The vintage touches section gave me so many ideas. Can't wait to start hunting for antiques!",
        date: "Dec 14, 2024",
        likes: 11,
      },
    ],
  },
  {
    id: 3,
    slug: "catering-trends-2024",
    title: "Top Catering Trends for 2024 Events",
    excerpt:
      "Explore the latest catering innovations, from sustainable menus to interactive dining experiences.",
    content: `
      <h2>Evolution of Event Dining</h2>
      <p>Modern catering goes beyond simply feeding guests—it's about creating memorable culinary experiences that complement and enhance your event's overall atmosphere and theme.</p>
      
      <h3>Sustainable and Local Focus</h3>
      <p>Today's hosts are increasingly conscious of their environmental impact, leading to a surge in farm-to-table catering, locally sourced ingredients, and zero-waste menu planning.</p>
      
      <h3>Interactive Food Experiences</h3>
      <p>Guests love participating in their dining experience. Popular interactive options include:</p>
      <ul>
        <li><strong>Live Cooking Stations:</strong> Chefs preparing dishes on-site</li>
        <li><strong>Build-Your-Own Bars:</strong> Taco bars, pasta stations, or cocktail mixing</li>
        <li><strong>Grazing Tables:</strong> Artisanal cheese and charcuterie displays</li>
        <li><strong>Food Trucks:</strong> Casual, fun dining with unique menu options</li>
      </ul>
      
      <h3>Dietary Inclusivity</h3>
      <p>Modern catering embraces dietary diversity, offering delicious options for vegan, gluten-free, and other dietary requirements without compromising on flavor or presentation.</p>
      
      <p>The best catering creates moments of joy and connection, turning meals into memorable experiences that guests will talk about long after the event ends.</p>
    `,
    summary:
      "Modern catering emphasizes sustainability, interactivity, and dietary inclusivity. The best event catering creates memorable culinary experiences through local sourcing, interactive food stations, and thoughtful accommodation of diverse dietary needs.",
    image: "/venue-category.jpg",
    author: "Chef Maria Rodriguez",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    category: "Catering",
    tags: ["Event Catering", "Food Trends", "Sustainable Dining", "Interactive Food"],
    views: 2134,
    likes: 98,
    comments: [
      {
        id: 1,
        author: "Carlos Mendez",
        content:
          "The sustainable catering section really opened my eyes. We're definitely going farm-to-table for our event.",
        date: "Dec 11, 2024",
        likes: 14,
      },
    ],
  },
  {
    id: 4,
    slug: "wedding-photography-styles-guide",
    title: "Understanding Wedding Photography Styles",
    excerpt:
      "Discover different photography approaches to find the perfect style that captures your unique love story.",
    content: `
      <h2>Capturing Your Story</h2>
      <p>Wedding photography has evolved far beyond traditional posed portraits. Today's couples have numerous artistic styles to choose from, each offering a unique way to document their special day.</p>
      
      <h3>Popular Photography Styles</h3>
      <p>Understanding different photography approaches helps you choose the right photographer for your vision:</p>
      <ul>
        <li><strong>Photojournalistic:</strong> Candid, documentary-style shots that capture authentic moments</li>
        <li><strong>Traditional:</strong> Classic posed portraits and formal group shots</li>
        <li><strong>Fine Art:</strong> Artistic, creative images with dramatic lighting and composition</li>
        <li><strong>Lifestyle:</strong> Natural, relaxed photos that feel spontaneous and genuine</li>
      </ul>
      
      <h3>Choosing Your Photographer</h3>
      <p>The right photographer understands your vision and personality. Look for someone whose portfolio resonates with you and who makes you feel comfortable and confident.</p>
      
      <p>Remember, wedding photos are more than just pictures—they're the visual story of one of the most important days of your life, meant to be treasured for generations.</p>
    `,
    summary:
      "Wedding photography offers diverse styles from photojournalistic to fine art, each capturing love stories differently. The right photographer combines technical skill with personal connection, creating images that authentically reflect your unique celebration and personality.",
    image: "/venue-category.jpg",
    author: "Alex Thompson",
    date: "Dec 8, 2024",
    readTime: "5 min read",
    category: "Photography",
    tags: ["Wedding Photography", "Photography Styles", "Wedding Planning", "Portrait Photography"],
    views: 3567,
    likes: 234,
    comments: [
      {
        id: 1,
        author: "Lisa Anderson",
        content:
          "This helped me understand the difference between photojournalistic and traditional styles. Perfect timing!",
        date: "Dec 9, 2024",
        likes: 19,
      },
    ],
  },
  {
    id: 5,
    slug: "venue-lighting-magic",
    title: "Creating Magic with Venue Lighting",
    excerpt: "Transform any space into a enchanting celebration venue with strategic lighting design and techniques.",
    content: `
      <h2>The Power of Illumination</h2>
      <p>Lighting is one of the most transformative elements in event design. The right lighting can turn an ordinary space into an extraordinary celebration venue, creating ambiance, highlighting key features, and setting the perfect mood.</p>
      
      <h3>Types of Event Lighting</h3>
      <p>Different lighting techniques serve various purposes in venue transformation:</p>
      <ul>
        <li><strong>Ambient Lighting:</strong> Overall illumination that sets the general mood</li>
        <li><strong>Accent Lighting:</strong> Highlights specific features like floral arrangements or architectural details</li>
        <li><strong>Task Lighting:</strong> Functional lighting for dining, reading, or activities</li>
        <li><strong>Decorative Lighting:</strong> String lights, lanterns, or candles that add visual interest</li>
      </ul>
      
      <h3>Creating Atmosphere</h3>
      <p>Warm lighting creates intimacy and romance, while cooler tones feel more modern and energetic. Dimmer switches allow you to adjust the mood throughout your event as the celebration evolves.</p>
      
      <p>Great lighting design is invisible—guests don't notice the technique, they just feel the magic of the perfectly illuminated space.</p>
    `,
    summary:
      "Strategic venue lighting transforms ordinary spaces into magical celebration venues through careful use of ambient, accent, task, and decorative lighting. The best lighting design creates atmosphere invisibly, allowing guests to feel the magic without noticing the technique.",
     image: "/venue-category.jpg",
    author: "Amanda Foster",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    category: "Venue",
    tags: ["Venue Lighting", "Event Design", "Ambiance", "Mood Lighting"],
    views: 1893,
    likes: 127,
    comments: [
      {
        id: 1,
        author: "Michael Brown",
        content: "Never realized how much lighting affects the whole venue atmosphere. This is eye-opening!",
        date: "Dec 6, 2024",
        likes: 16,
      },
      {
        id: 2,
        author: "Sophie Clark",
        content: "The section on warm vs cool lighting was particularly helpful for our venue planning.",
        date: "Dec 7, 2024",
        likes: 9,
      },
    ],
  },
  {
    id: 6,
    slug: "farmhouse-catering-comfort-food",
    title: "Farmhouse Catering: Elevated Comfort Food",
    excerpt:
      "Discover how to create sophisticated comfort food menus that perfectly complement rustic farmhouse celebrations.",
    content: `
      <h2>Comfort Food with Style</h2>
      <p>Farmhouse catering celebrates the art of comfort food, transforming beloved family recipes into sophisticated celebration menus that feel both elegant and approachable.</p>
      
      <h3>Signature Farmhouse Dishes</h3>
      <p>The best farmhouse catering combines familiar flavors with elevated presentation:</p>
      <ul>
        <li><strong>Family-Style Serving:</strong> Large platters that encourage sharing and conversation</li>
        <li><strong>Seasonal Ingredients:</strong> Fresh, local produce that reflects the agricultural setting</li>
        <li><strong>Artisanal Touches:</strong> Homemade breads, craft cheeses, and specialty preserves</li>
        <li><strong>Interactive Stations:</strong> Pie bars, s'mores stations, and hot cider stands</li>
      </ul>
      
      <h3>Balancing Rustic and Refined</h3>
      <p>Successful farmhouse catering maintains the warmth of home cooking while ensuring professional presentation and service that matches the significance of your celebration.</p>
      
      <p>The goal is creating a menu that feels like the best family gathering you've ever attended, where every dish tells a story and every bite creates a memory.</p>
    `,
    summary:
      "Farmhouse catering elevates comfort food through sophisticated presentation and local ingredients while maintaining the warmth of home cooking. The best farmhouse menus balance rustic charm with professional service, creating memorable dining experiences that feel like exceptional family gatherings.",
     image: "/venue-category.jpg",
    author: "Chef William Carter",
    date: "Dec 3, 2024",
    readTime: "7 min read",
    category: "Catering",
    tags: ["Farmhouse Catering", "Comfort Food", "Local Ingredients", "Family-Style Dining"],
    views: 2445,
    likes: 143,
    comments: [
      {
        id: 1,
        author: "Emily Johnson",
        content:
          "This perfectly captures what we want for our farmhouse wedding—elegant but not pretentious!",
        date: "Dec 4, 2024",
        likes: 21,
      },
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}



export const mockServiceInquiries = [
  {
    id: "inq-001",
    chatId: "chat-001",
    serviceType: "VENUE",
    serviceId: "venue-golden-palace",
    inquiryText:
      "Hi, I'm interested in booking your venue for my wedding on March 15th. Can you provide more details about pricing and availability?",
    status: "Answered" as const,
    createdAt: "2024-01-15T09:15:00Z",
    vendorId: "vendor-001",
  },
  {
    id: "inq-002",
    chatId: "chat-002",
    serviceType: "FARMHOUSE",
    serviceId: "farmhouse-sunset",
    inquiryText: "Could you send me some recent photos of the farmhouse and availability for weekend bookings?",
    status: "Open" as const,
    createdAt: "2024-01-15T13:30:00Z",
    vendorId: "vendor-002",
  },
  {
    id: "inq-003",
    chatId: "chat-003",
    serviceType: "CATERING_PACKAGE",
    serviceId: "catering-delicious",
    inquiryText: "I need catering for 100 people. What packages do you offer and what are the pricing options?",
    status: "Converted" as const,
    createdAt: "2024-01-15T16:00:00Z",
    vendorId: "vendor-003",
  },
  {
    id: "inq-004",
    chatId: "chat-004",
    serviceType: "PHOTOGRAPHY_PACKAGE",
    serviceId: "photo-perfect",
    inquiryText:
      "Hi! I'm looking for a wedding photographer for March 15th. Do you have availability and what are your packages?",
    status: "Answered" as const,
    createdAt: "2024-01-15T17:30:00Z",
    vendorId: "vendor-004",
  },
  {
    id: "inq-005",
    chatId: "chat-005",
    serviceType: "VENUE",
    serviceId: "venue-royal-gardens",
    inquiryText: "What are your rates for a 200-person wedding reception? Do you provide in-house catering?",
    status: "Closed" as const,
    createdAt: "2024-01-14T14:20:00Z",
    vendorId: "vendor-006",
  },
]

export const mockAdInquiries = [
  {
    id: "ad-inq-001",
    chatId: "chat-006",
    adId: "ad-decorators-pro",
    inquiryText:
      "I saw your advertisement for wedding decorations. Are you available for March 15th and what services do you provide?",
    status: "Open" as const,
    createdAt: "2024-01-15T19:45:00Z",
    vendorId: "vendor-005",
  },
  {
    id: "ad-inq-002",
    chatId: "chat-007",
    adId: "ad-music-masters",
    inquiryText:
      "Interested in your DJ services for a wedding. What packages do you offer and are you available on weekends?",
    status: "Answered" as const,
    createdAt: "2024-01-14T16:30:00Z",
    vendorId: "vendor-007",
  },
  {
    id: "ad-inq-003",
    chatId: "chat-008",
    adId: "ad-flower-paradise",
    inquiryText: "Looking for bridal bouquet and ceremony decorations. Can you provide a quote for March wedding?",
    status: "Converted" as const,
    createdAt: "2024-01-13T11:15:00Z",
    vendorId: "vendor-008",
  },
  {
    id: "ad-inq-004",
    chatId: "chat-009",
    adId: "ad-transport-luxury",
    inquiryText: "Need luxury car rental for wedding day. What vehicles do you have available and what are the rates?",
    status: "Closed" as const,
    createdAt: "2024-01-12T09:45:00Z",
    vendorId: "vendor-009",
  },
]

export const mockUsers: User[] = [
  {
    id: "user1", name: "Alice Johnson", email: "alice@example.com",
    firstName: "",
    lastName: "",
    isActive: false
  },
  {
    id: "user2", name: "Bob Williams", email: "bob@example.com",
    firstName: "",
    lastName: "",
    isActive: false
  },
  {
    id: "user3", name: "Charlie Brown", email: "charlie@example.com",
    firstName: "",
    lastName: "",
    isActive: false
  },
]

export const mockServices: Service[] = [
  {
    id: "venue1",
    name: "Grand Ballroom",
    category: "Venue",
    location: "Downtown Metropolis",
    price: 2500,
    rating: 4.8,
    reviewCount: 120,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Grand+Ballroom",
  },
  {
    id: "photography1",
    name: "Wedding Photography Deluxe",
    category: "Photography",
    location: "Citywide",
    price: 1500,
    rating: 4.9,
    reviewCount: 85,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Photo+Deluxe",
  },
  {
    id: "catering1",
    name: "Gourmet Catering Co.",
    category: "Catering",
    location: "Metropolis Area",
    price: 75, // per person
    rating: 4.7,
    reviewCount: 95,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Gourmet+Catering",
  },
]

export const mockBookings: Booking[] = [
  {
    id: "booking1",
    bookingReference: "BK-202401A",
    userId: "user1",
    userName: "Alice Johnson",
    userAvatar: "/placeholder-user.jpg",
    serviceType: "VENUE",
    serviceName: "Grand Ballroom",
    serviceId: "venue1",
    eventDate: "2024-08-15",
    numberOfGuests: 150,
    totalAmount: 2500,
    advanceAmount: 500,
    balanceAmount: 2000,
    status: "Confirmed",
    paymentStatus: "Advance Paid",
    visitRequested: true,
    visitStatus: "Scheduled",
    visitScheduledFor: "2025-07-20T10:00:00Z",
    specialRequests: "Need a vegan menu option for 10 guests.",
    createdAt: "2025-07-10T10:00:00Z",
  },
  {
    id: "booking2",
    bookingReference: "BK-202402B",
    userId: "user2",
    userName: "Bob Williams",
    userAvatar: "/placeholder-user.jpg",
    serviceType: "PHOTOGRAPHY",
    serviceName: "Wedding Photography Deluxe",
    serviceId: "photography1",
    eventDate: "2025-09-22",
    numberOfGuests: 2,
    totalAmount: 2500,
    advanceAmount: 1000,
    balanceAmount: 1500,
    status: "Pending",
    paymentStatus: "Awaiting Advance",
    visitRequested: false,
    visitStatus: "Not Requested",
    visitScheduledFor: null,
    specialRequests: "Focus on candid shots.",
    createdAt: "2025-07-11T11:30:00Z",
  },
]
export const mockConversations = [
  {
    otherUserId: "vendor-001",
    otherUserName: "Golden Palace Venue",
    otherUserAvatar: "/placeholder.svg?height=48&width=48",
    lastMessage: {
      id: "msg-001",
      message: "Thank you for your interest in our venue. We have availability for your wedding date!",
      messageType: "Text",
      status: "Read",
      sentAt: "2024-01-15T10:30:00Z",
      senderId: "vendor-001",
      serviceType: "VENUE",
    },
    messages: [
      {
        id: "msg-001",
        senderId: "user-123",
        receiverId: "vendor-001",
        message:
          "Hi, I'm interested in booking your venue for my wedding on March 15th. Can you provide more details about pricing and availability?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T09:15:00Z",
        serviceType: "VENUE",
      },
      {
        id: "msg-002",
        senderId: "vendor-001",
        receiverId: "user-123",
        message:
          "Hello! Thank you for your interest in Golden Palace Venue. We'd be delighted to host your special day!",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T09:45:00Z",
        serviceType: "VENUE",
      },
      {
        id: "msg-003",
        senderId: "vendor-001",
        receiverId: "user-123",
        message:
          "For March 15th, our premium package starts at $5,000 which includes the main hall, decorations, and basic catering for up to 150 guests.",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T10:30:00Z",
        serviceType: "VENUE",
      },
    ],
    unreadCount: 0,
  },
  {
    otherUserId: "vendor-002",
    otherUserName: "Sunset Farmhouse",
    otherUserAvatar: "/placeholder.svg?height=48&width=48",
    lastMessage: {
      id: "msg-004",
      message: "The farmhouse photos you requested",
      messageType: "Image",
      status: "Delivered",
      sentAt: "2024-01-15T14:20:00Z",
      senderId: "vendor-002",
      serviceType: "FARMHOUSE",
    },
    messages: [
      {
        id: "msg-004",
        senderId: "user-123",
        receiverId: "vendor-002",
        message: "Could you send me some recent photos of the farmhouse?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T13:30:00Z",
        serviceType: "FARMHOUSE",
      },
      {
        id: "msg-005",
        senderId: "vendor-002",
        receiverId: "user-123",
        message: "Here are the latest photos of our beautiful farmhouse!",
        messageType: "Image" as const,
        status: "Delivered" as const,
        sentAt: "2024-01-15T14:20:00Z",
        attachmentUrl: "/placeholder.svg?height=300&width=400",
        serviceType: "FARMHOUSE",
      },
    ],
    unreadCount: 1,
  },
  {
    otherUserId: "vendor-003",
    otherUserName: "Delicious Catering Co.",
    otherUserAvatar: "/placeholder.svg?height=48&width=48",
    lastMessage: {
      id: "msg-006",
      message: "Our menu catalog is attached",
      messageType: "File",
      status: "Sent",
      sentAt: "2024-01-15T16:45:00Z",
      senderId: "vendor-003",
      serviceType: "CATERING_PACKAGE",
    },
    messages: [
      {
        id: "msg-006",
        senderId: "user-123",
        receiverId: "vendor-003",
        message: "I need catering for 100 people. What packages do you offer?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T16:00:00Z",
        serviceType: "CATERING_PACKAGE",
      },
      {
        id: "msg-007",
        senderId: "vendor-003",
        receiverId: "user-123",
        message: "Perfect! We have several packages for 100 guests. Let me send you our complete menu catalog.",
        messageType: "File" as const,
        status: "Sent" as const,
        sentAt: "2024-01-15T16:45:00Z",
        attachmentUrl: "/menu-catalog.pdf",
        serviceType: "CATERING_PACKAGE",
      },
    ],
    unreadCount: 2,
  },
  {
    otherUserId: "vendor-004",
    otherUserName: "Picture Perfect Photography",
    otherUserAvatar: "/placeholder.svg?height=48&width=48",
    lastMessage: {
      id: "msg-008",
      message: "When would be a good time for a consultation call?",
      messageType: "Text",
      status: "Read",
      sentAt: "2024-01-15T18:30:00Z",
      senderId: "vendor-004",
      serviceType: "PHOTOGRAPHY_PACKAGE",
    },
    messages: [
      {
        id: "msg-008",
        senderId: "user-123",
        receiverId: "vendor-004",
        message: "Hi! I'm looking for a wedding photographer for March 15th. Do you have availability?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T17:30:00Z",
        serviceType: "PHOTOGRAPHY_PACKAGE",
      },
      {
        id: "msg-009",
        senderId: "vendor-004",
        receiverId: "user-123",
        message:
          "Hello! Yes, I'm available for March 15th. I'd love to discuss your photography needs and show you my portfolio.",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T18:00:00Z",
        serviceType: "PHOTOGRAPHY_PACKAGE",
      },
      {
        id: "msg-010",
        senderId: "vendor-004",
        receiverId: "user-123",
        message: "When would be a good time for a consultation call?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T18:30:00Z",
        serviceType: "PHOTOGRAPHY_PACKAGE",
      },
    ],
    unreadCount: 0,
  },
  {
    otherUserId: "vendor-005",
    otherUserName: "Event Decorators Pro",
    otherUserAvatar: "/placeholder.svg?height=48&width=48",
    lastMessage: {
      id: "msg-011",
      message: "We can definitely help with your decoration needs!",
      messageType: "Text",
      status: "Delivered",
      sentAt: "2024-01-15T20:15:00Z",
      senderId: "vendor-005",
      serviceType: "ADVERTISEMENT",
    },
    messages: [
      {
        id: "msg-011",
        senderId: "user-123",
        receiverId: "vendor-005",
        message: "I saw your advertisement for wedding decorations. Are you available for March 15th?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T19:45:00Z",
        serviceType: "ADVERTISEMENT",
      },
      {
        id: "msg-012",
        senderId: "vendor-005",
        receiverId: "user-123",
        message: "We can definitely help with your decoration needs! March 15th is available.",
        messageType: "Text" as const,
        status: "Delivered" as const,
        sentAt: "2024-01-15T20:15:00Z",
        serviceType: "ADVERTISEMENT",
      },
    ],
    unreadCount: 1,
  },
]
export const mockCateringRequests: CateringCustomPackage[] = [
  {
    id: "ccp1",
    vendorId: "vendor1",
    userId: "user3",
    orderDetails:
      "Looking for a full-service buffet for a corporate event. Theme is tropical. Need appetizers, main courses (with veg options), and desserts.",
    guestCount: 80,
    eventDate: "2025-10-05",
    price: 0,
    status: "Requested",
    createdAt: "2025-07-14T09:00:00Z",
    updatedAt: "2025-07-14T09:00:00Z",
  },
  {
    id: "ccp2",
    vendorId: "vendor1",
    userId: "user1",
    orderDetails: "Intimate wedding dinner. Plated 3-course meal required. High-end ingredients.",
    guestCount: 25,
    eventDate: "2025-11-12",
    price: 3000,
    status: "Quoted",
    createdAt: "2025-07-12T14:00:00Z",
    updatedAt: "2025-07-13T10:00:00Z",
  },
]

export const mockPhotographyRequests: PhotographyCustomOrder[] = [
  {
    id: "pco1",
    vendorId: "vendor1",
    userId: "user2",
    orderDetails:
      "Need a photographer for a 3-day music festival. Coverage of all main stages and crowd shots. Drone footage would be a plus.",
    eventDate: "2025-08-30",
    eventDuration: 24, // 8 hours per day
    price: 0,
    status: "Requested",
    createdAt: "2024-07-15T11:00:00Z",
    updatedAt: "2024-07-15T11:00:00Z",
  },
  {
    id: "pco2",
    vendorId: "vendor1",
    userId: "user3",
    orderDetails: "Product photography for a new line of jewelry. Need clean, white-background shots for e-commerce.",
    eventDate: "2025-08-01",
    eventDuration: 4,
    price: 800,
    status: "Accepted",
    createdAt: "2024-07-10T16:00:00Z",
    updatedAt: "2024-07-11T18:00:00Z",
  },
]
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Vendor {
  id: string
  vendorName: string
  vendorEmail: string
  vendorPhone: string
  vendorAddress: string
  vendorProfileDescription: string
  vendorWebsite: string
  vendorSocialLinks: string[]
  profileImage: string
  bannerImage: string
  vendorType: string
  vendorStatus: boolean // For the switch
  vendorTypeId: string
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
  // Placeholder for detailed data
  bookings?: any[]
  vouchers?: any[]
  posData?: any[]
  revenueData?: any[]
}

const mockVendors: Vendor[] = [
  {
    id: "ven_1",
    vendorName: "Acme Solutions",
    vendorEmail: "contact@acme.com",
    vendorPhone: "123-456-7890",
    vendorAddress: "123 Main St, Anytown, USA",
    vendorProfileDescription: "Leading provider of innovative solutions.",
    vendorWebsite: "https://www.acme.com",
    vendorSocialLinks: ["https://twitter.com/acme"],
    profileImage: "/placeholder.svg?height=64&width=64",
    bannerImage: "/placeholder.svg?height=200&width=800",
    vendorType: "Software",
    vendorStatus: true,
    vendorTypeId: "type_1",
    rating: 4.5,
    reviewCount: 120,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-07-20T14:30:00Z",
    bookings: [
      { id: "b1", date: "2024-07-25", service: "Consultation", amount: 150 },
      { id: "b2", date: "2024-07-26", service: "Workshop", amount: 300 },
    ],
    vouchers: [{ id: "v1", code: "SAVE10", value: 10 }],
    posData: [{ month: "Jan", sales: 10000 }],
    revenueData: [{ month: "Jan", revenue: 9000 }],
  },
  {
    id: "ven_2",
    vendorName: "Global Innovations",
    vendorEmail: "info@global.com",
    vendorPhone: "987-654-3210",
    vendorAddress: "456 Oak Ave, Otherville, USA",
    vendorProfileDescription: "Innovating for a better future.",
    vendorWebsite: "https://www.global.com",
    vendorSocialLinks: ["https://linkedin.com/global"],
    profileImage: "/placeholder.svg?height=64&width=64",
    bannerImage: "/placeholder.svg?height=200&width=800",
    vendorType: "Consulting",
    vendorStatus: false,
    vendorTypeId: "type_2",
    rating: 3.8,
    reviewCount: 75,
    createdAt: "2022-11-01T09:00:00Z",
    updatedAt: "2024-06-10T11:00:00Z",
    bookings: [{ id: "b3", date: "2024-08-01", service: "Strategy Session", amount: 500 }],
    vouchers: [{ id: "v2", code: "FIRST20", value: 20 }],
    posData: [{ month: "Feb", sales: 12000 }],
    revenueData: [{ month: "Feb", revenue: 11000 }],
  },
  {
    id: "ven_3",
    vendorName: "Creative Designs",
    vendorEmail: "hello@creative.com",
    vendorPhone: "555-123-4567",
    vendorAddress: "789 Pine Ln, Design City, USA",
    vendorProfileDescription: "Bringing ideas to life through design.",
    vendorWebsite: "https://www.creative.com",
    vendorSocialLinks: ["https://instagram.com/creative"],
    profileImage: "/placeholder.svg?height=64&width=64",
    bannerImage: "/placeholder.svg?height=200&width=800",
    vendorType: "Design",
    vendorStatus: true,
    vendorTypeId: "type_3",
    rating: 4.9,
    reviewCount: 200,
    createdAt: "2023-03-20T11:00:00Z",
    updatedAt: "2024-07-01T09:00:00Z",
    bookings: [],
    vouchers: [],
    posData: [{ month: "Mar", sales: 8000 }],
    revenueData: [{ month: "Mar", revenue: 7500 }],
  },
]

// Simulate GraphQL client
export const graphqlClient = {
  adminListAllVendors: async (input?: {
    page?: number
    limit?: number
  }): Promise<{
    vendors: Vendor[]
    total: number
    page: number
    limit: number
    totalPages: number
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    const page = input?.page || 1
    const limit = input?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedVendors = mockVendors.slice(start, end)

    return {
      vendors: paginatedVendors,
      total: mockVendors.length,
      page,
      limit,
      totalPages: Math.ceil(mockVendors.length / limit),
    }
  },
  getVendorById: async (id: string): Promise<Vendor | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
    return mockVendors.find((vendor) => vendor.id === id)
  },
  createVendor: async (newVendor: Omit<Vendor, "id" | "createdAt" | "updatedAt">): Promise<Vendor> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const id = `ven_${mockVendors.length + 1}`
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    const vendor = {
      ...newVendor,
      id,
      createdAt,
      updatedAt,
    }
    mockVendors.push(vendor)
    return vendor
  },
  updateVendor: async (id: string, updatedFields: Partial<Vendor>): Promise<Vendor | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = mockVendors.findIndex((vendor) => vendor.id === id)
    if (index > -1) {
      mockVendors[index] = {
        ...mockVendors[index],
        ...updatedFields,
        updatedAt: new Date().toISOString(),
      }
      return mockVendors[index]
    }
    return undefined
  },
  deleteVendor: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = mockVendors.length
    const newVendors = mockVendors.filter((vendor) => vendor.id !== id)
    mockVendors.splice(0, mockVendors.length, ...newVendors) // Update the original array
    return mockVendors.length < initialLength
  },
}


export interface Venue {
  id: string
  vendorId: string
  name: string
  location: string
  description: string
  imageUrl: string
  price: number
  tags: string[]
  amenities: string[]
  minPersonLimit: number
  maxPersonLimit: number
  isAvailable: boolean
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

const mockVenues: Venue[] = [
  {
    id: "venue-1",
    vendorId: "vendor-a",
    name: "Grand Ballroom",
    location: "123 Event St, Cityville",
    description: "A spacious and elegant ballroom perfect for large events.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: 1500,
    tags: ["ballroom", "luxury", "wedding"],
    amenities: ["catering", "sound system", "parking"],
    minPersonLimit: 100,
    maxPersonLimit: 500,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 120,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "venue-2",
    vendorId: "vendor-b",
    name: "Cozy Cafe Space",
    location: "456 Coffee Ln, Townsville",
    description: "Intimate cafe setting ideal for small gatherings and workshops.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: 300,
    tags: ["cafe", "intimate", "workshop"],
    amenities: ["wifi", "coffee bar"],
    minPersonLimit: 10,
    maxPersonLimit: 50,
    isAvailable: false,
    rating: 4.5,
    reviewCount: 75,
    createdAt: "2023-02-20T11:30:00Z",
    updatedAt: "2023-02-20T11:30:00Z",
  },
  {
    id: "venue-3",
    vendorId: "vendor-a",
    name: "Rooftop Garden",
    location: "789 Sky High, Metropolis",
    description: "Stunning rooftop garden with panoramic city views.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: 1000,
    tags: ["outdoor", "views", "party"],
    amenities: ["bar service", "lighting"],
    minPersonLimit: 50,
    maxPersonLimit: 200,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 90,
    createdAt: "2023-03-10T09:00:00Z",
    updatedAt: "2023-03-10T09:00:00Z",
  },
  {
    id: "venue-4",
    vendorId: "vendor-c",
    name: "Conference Hall A",
    location: "101 Business Park, Tech City",
    description: "Modern conference hall equipped for corporate events.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: 800,
    tags: ["conference", "corporate", "meeting"],
    amenities: ["projector", "whiteboard", "high-speed internet"],
    minPersonLimit: 30,
    maxPersonLimit: 150,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 60,
    createdAt: "2023-04-01T14:00:00Z",
    updatedAt: "2023-04-01T14:00:00Z",
  },
  {
    id: "venue-5",
    vendorId: "vendor-b",
    name: "Art Gallery Loft",
    location: "202 Creative St, Artsy District",
    description: "Industrial-chic loft space, perfect for art exhibitions and creative events.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    price: 700,
    tags: ["gallery", "loft", "creative"],
    amenities: ["display lighting", "flexible layout"],
    minPersonLimit: 20,
    maxPersonLimit: 100,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 45,
    createdAt: "2023-05-05T16:00:00Z",
    updatedAt: "2023-05-05T16:00:00Z",
  },
]

export const getAllVenues = async (): Promise<Venue[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockVenues
}

export const getVenueById = async (id: string): Promise<Venue | undefined> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockVenues.find((venue) => venue.id === id)
}

export const updateVenueAvailability = async (id: string, isAvailable: boolean): Promise<Venue | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const venueIndex = mockVenues.findIndex((venue) => venue.id === id)
  if (venueIndex > -1) {
    mockVenues[venueIndex] = {
      ...mockVenues[venueIndex],
      isAvailable,
      updatedAt: new Date().toISOString(),
    }
    return mockVenues[venueIndex]
  }
  return undefined
}

export const createVenue = async (
  newVenueData: Omit<Venue, "id" | "createdAt" | "updatedAt" | "rating" | "reviewCount">,
): Promise<Venue> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const newVenue: Venue = {
    id: `venue-${mockVenues.length + 1}`,
    ...newVenueData,
    rating: 0, // Default for new venues
    reviewCount: 0, // Default for new venues
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockVenues.push(newVenue)
  return newVenue
}

export const updateVenue = async (
  id: string,
  updatedVenueData: Partial<Omit<Venue, "id" | "createdAt" | "rating" | "reviewCount">>,
): Promise<Venue | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const venueIndex = mockVenues.findIndex((venue) => venue.id === id)
  if (venueIndex > -1) {
    mockVenues[venueIndex] = {
      ...mockVenues[venueIndex],
      ...updatedVenueData,
      updatedAt: new Date().toISOString(),
    }
    return mockVenues[venueIndex]
  }
  return undefined
}
import type { Farmhouse } from '../interfaces';

// In a real application, this data would come from your GraphQL API.
// We are mocking it here for demonstration purposes.
const farmhouses: Farmhouse[] = [
  {
    id: '1',
    vendorId: 'vendor-123',
    name: 'Sunset Valley Farm',
    location: 'Napa, California',
    description: 'A beautiful farmhouse surrounded by vineyards. Perfect for a weekend getaway.',
    imageUrl: '/placeholder.svg?height=400&width=600',
    perNightPrice: 350,
    minNights: 2,
    maxNights: 14,
    maxGuests: 8,
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Free Parking', 'Hot Tub'],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 120,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-10-28T12:30:00Z',
  },
  {
    id: '2',
    vendorId: 'vendor-456',
    name: 'Green Meadows Retreat',
    location: 'Asheville, North Carolina',
    description: 'A cozy retreat in the heart of the Blue Ridge Mountains. Enjoy hiking and nature.',
    imageUrl: '/placeholder.svg?height=400&width=600',
    perNightPrice: 275,
    minNights: 3,
    maxNights: 10,
    maxGuests: 6,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Pet Friendly'],
    isAvailable: false,
    rating: 4.9,
    reviewCount: 95,
    createdAt: '2023-03-20T14:00:00Z',
    updatedAt: '2023-11-05T18:00:00Z',
  },
  {
    id: '3',
    vendorId: 'vendor-789',
    name: 'Ocean Breeze Farmstead',
    location: 'Malibu, California',
    description: 'Stunning ocean views from this modern farmstead. Steps away from the beach.',
    imageUrl: '/placeholder.svg?height=400&width=600',
    perNightPrice: 550,
    minNights: 4,
    maxNights: 30,
    maxGuests: 10,
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Beach Access', 'Air Conditioning'],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 210,
    createdAt: '2022-11-10T09:00:00Z',
    updatedAt: '2023-11-01T11:45:00Z',
  },
];

// Simulate API calls
export const getFarmhouses = async (): Promise<Farmhouse[]> => {
  // In a real app, you'd fetch from your GraphQL endpoint
  return new Promise(resolve => setTimeout(() => resolve(farmhouses), 500));
};

export const getFarmhouseById = async (id: string): Promise<Farmhouse | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(farmhouses.find(f => f.id === id)), 300));
};

// These functions would trigger mutations in a real app
export const createFarmhouse = async (data: Omit<Farmhouse, 'id' | 'createdAt' | 'updatedAt'>): Promise<Farmhouse> => {
  const newFarmhouse: Farmhouse = {
    ...data,
    id: (Math.random() * 10000).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  farmhouses.push(newFarmhouse);
  return new Promise(resolve => setTimeout(() => resolve(newFarmhouse), 500));
};

export const updateFarmhouse = async (id: string, data: Partial<Farmhouse>): Promise<Farmhouse | undefined> => {
  const index = farmhouses.findIndex(f => f.id === id);
  if (index !== -1) {
    farmhouses[index] = { ...farmhouses[index], ...data, updatedAt: new Date().toISOString() };
    return new Promise(resolve => setTimeout(() => resolve(farmhouses[index]), 500));
  }
  return undefined;
};

import type {
  AdminCustomPackage,
  AdminCustomPackageFilters,
  AdminCustomPackageList,
  CateringPackage,
  CateringPackageList,
} from "../interfaces"

// In-memory stores for demo purposes (seed data).
let customPackages: AdminCustomPackage[] = [
  {
    id: "c1",
    userId: "u_101",
    vendorId: "v_501",
    orderDetails: "Wedding catering with vegetarian focus, buffet style.",
    guestCount: 120,
    eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    price: 4200,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "c2",
    userId: "u_102",
    vendorId: "v_502",
    orderDetails: "Corporate lunch, vegan options, plated service.",
    guestCount: 40,
    eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    price: 1500,
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let cateringStandardPackages: CateringPackage[] = [
  {
    id: "p1",
    vendorId: "v_201",
    packageName: "Classic Buffet",
    serviceArea: "San Francisco Bay Area",
    description: "A well-rounded buffet with meats, salads, and sides.",
    imageUrl: "/placeholder.svg?height=240&width=480",
    price: 30,
    minGuests: 25,
    maxGuests: 250,
    menuItems: ["Roast chicken", "Pasta primavera", "Caesar salad", "Garlic bread"],
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    amenities: ["Setup", "Cleanup", "Warmers"],
    isAvailable: true,
    reviewCount: 128,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p2",
    vendorId: "v_202",
    packageName: "Vegan Feast",
    serviceArea: "Los Angeles",
    description: "Wholesome vegan menu with seasonal produce.",
    imageUrl: "/placeholder.svg?height=240&width=480",
    price: 35,
    minGuests: 20,
    maxGuests: 200,
    menuItems: ["Tofu stir-fry", "Quinoa salad", "Roasted veggies", "Vegan brownies"],
    dietaryOptions: ["Vegan", "Nut-Free"],
    amenities: ["Setup", "Server staff"],
    isAvailable: true,
    reviewCount: 74,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Persistence helpers (localStorage with safe fallbacks)
const STORAGE_KEY = "admin_catering_store_v1"

type StoreShape = {
  customPackages: AdminCustomPackage[]
  standardPackages: CateringPackage[]
}

function readStorage(): StoreShape | null {
  try {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis && globalThis.localStorage) {
      const raw = globalThis.localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as StoreShape
      return parsed
    }
  } catch {
    // ignore
  }
  return null
}

function writeStorage(store: StoreShape) {
  try {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis && globalThis.localStorage) {
      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    }
  } catch {
    // ignore
  }
}

function syncFromStorage() {
  const persisted = readStorage()
  if (persisted) {
    customPackages = persisted.customPackages
    cateringStandardPackages = persisted.standardPackages
  } else {
    // Seed initial data into storage so first navigation also sees it
    saveToStorage()
  }
}

function saveToStorage() {
  writeStorage({ customPackages, standardPackages: cateringStandardPackages })
}

function paginate<T>(items: T[], page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  return {
    items: items.slice(start, end),
    total,
    totalPages,
    page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

// AdminListCustomPackages
export async function listCustomPackages(filters?: AdminCustomPackageFilters): Promise<AdminCustomPackageList> {
  syncFromStorage()
  const { status, q, page = 1, pageSize = 10 } = filters || {}
  let data = [...customPackages]

  if (status) {
    data = data.filter((p) => p.status === status)
  }
  if (q && q.trim()) {
    const s = q.toLowerCase()
    data = data.filter(
      (p) =>
        p.id.toLowerCase().includes(s) ||
        p.userId.toLowerCase().includes(s) ||
        p.vendorId.toLowerCase().includes(s) ||
        p.orderDetails.toLowerCase().includes(s),
    )
  }

  const { items, total, totalPages } = paginate(data, page, pageSize)
  return {
    packages: items,
    total,
    page,
    totalPages,
  }
}

export async function removeCustomPackage(id: string) {
  syncFromStorage()
  customPackages = customPackages.filter((p) => p.id !== id)
  saveToStorage()
}

export async function setCustomPackageStatus(id: string, status: AdminCustomPackage["status"]) {
  syncFromStorage()
  const idx = customPackages.findIndex((p) => p.id === id)
  if (idx >= 0) {
    customPackages[idx] = { ...customPackages[idx], status, updatedAt: new Date().toISOString() }
    saveToStorage()
  }
}

// GetAllCateringPackages
export async function listStandardPackages(page = 1, pageSize = 10): Promise<CateringPackageList> {
  syncFromStorage()
  const { items, total, totalPages, hasNextPage, hasPreviousPage } = paginate(cateringStandardPackages, page, pageSize)
  return {
    packages: items,
    total,
    page,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  }
}

export async function getStandardPackageById(id: string): Promise<CateringPackage | null> {
  syncFromStorage()
  return cateringStandardPackages.find((p) => p.id === id) || null
}

export async function removeStandardPackage(id: string) {
  syncFromStorage()
  cateringStandardPackages = cateringStandardPackages.filter((p) => p.id !== id)
  saveToStorage()
}

export type CreatePackageInput = Omit<CateringPackage, "id" | "createdAt" | "updatedAt" | "reviewCount"> & {
  reviewCount?: number
}

export async function createStandardPackage(input: CreatePackageInput): Promise<CateringPackage> {
  syncFromStorage()
  const now = new Date().toISOString()
  const newPkg: CateringPackage = {
    ...input,
    id: `p_${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    reviewCount: input.reviewCount ?? 0,
  }
  cateringStandardPackages.unshift(newPkg)
  saveToStorage()
  return newPkg
}

export type UpdatePackageInput = Partial<Omit<CateringPackage, "id" | "createdAt" | "updatedAt">>

export async function updateStandardPackage(id: string, updates: UpdatePackageInput): Promise<CateringPackage | null> {
  syncFromStorage()
  const idx = cateringStandardPackages.findIndex((p) => p.id === id)
  if (idx < 0) return null
  const updated: CateringPackage = {
    ...cateringStandardPackages[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  cateringStandardPackages[idx] = updated
  saveToStorage()
  return updated
}


export type PhotographyVendor = {
  id: string
  vendorName: string
  vendorEmail: string
  vendorPhone: string
}

export type CustomOrder = {
  id: string
  vendorId: string
  userId: string
  orderDetails: string
  eventDate: string // ISO
  eventDuration: number // hours
  price: number
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  createdAt: string // ISO
  updatedAt: string // ISO
}

export type StandardPackage = {
  id: string
  packageName: string
  vendorId: string
  price: number
  duration: number // hours
  isAvailable: boolean
  createdAt: string // ISO
}

const vendors: Vendor[] = [
  {
    id: "v1", vendorName: "Sunset Frames", vendorEmail: "contact@sunsetframes.com", vendorPhone: "+1 555-1001",
    vendorAddress: "",
    vendorProfileDescription: "",
    vendorWebsite: "",
    vendorSocialLinks: [],
    profileImage: "",
    bannerImage: "",
    vendorType: "",
    vendorStatus: false,
    vendorTypeId: "",
    rating: 0,
    reviewCount: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "v2", vendorName: "Golden Lens Co.", vendorEmail: "hello@goldenlens.co", vendorPhone: "+1 555-1002",
    vendorAddress: "",
    vendorProfileDescription: "",
    vendorWebsite: "",
    vendorSocialLinks: [],
    profileImage: "",
    bannerImage: "",
    vendorType: "",
    vendorStatus: false,
    vendorTypeId: "",
    rating: 0,
    reviewCount: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "v3", vendorName: "Studio Orange", vendorEmail: "book@studioorange.io", vendorPhone: "+1 555-1003",
    vendorAddress: "",
    vendorProfileDescription: "",
    vendorWebsite: "",
    vendorSocialLinks: [],
    profileImage: "",
    bannerImage: "",
    vendorType: "",
    vendorStatus: false,
    vendorTypeId: "",
    rating: 0,
    reviewCount: 0,
    createdAt: "",
    updatedAt: ""
  },
]

const standardPackages: StandardPackage[] = [
  {
    id: "p1",
    packageName: "Wedding Basic",
    vendorId: "v1",
    price: 1200,
    duration: 6,
    isAvailable: true,
    createdAt: new Date("2024-06-12").toISOString(),
  },
  {
    id: "p2",
    packageName: "Wedding Premium",
    vendorId: "v2",
    price: 2200,
    duration: 10,
    isAvailable: true,
    createdAt: new Date("2024-07-03").toISOString(),
  },
  {
    id: "p3",
    packageName: "Event Coverage",
    vendorId: "v3",
    price: 800,
    duration: 4,
    isAvailable: false,
    createdAt: new Date("2024-08-20").toISOString(),
  },
]

const customOrders: CustomOrder[] = [
  {
    id: "o1",
    vendorId: "v1",
    userId: "u101",
    orderDetails: "Full-day outdoor wedding; candid shots; drone footage optional.",
    eventDate: new Date("2025-09-21").toISOString(),
    eventDuration: 8,
    price: 1800,
    status: "PENDING",
    createdAt: new Date("2025-07-01T10:00:00Z").toISOString(),
    updatedAt: new Date("2025-07-01T10:00:00Z").toISOString(),
  },
  {
    id: "o2",
    vendorId: "v2",
    userId: "u102",
    orderDetails: "Corporate conference; keynote and breakout sessions.",
    eventDate: new Date("2025-10-05").toISOString(),
    eventDuration: 6,
    price: 1500,
    status: "CONFIRMED",
    createdAt: new Date("2025-07-10T09:00:00Z").toISOString(),
    updatedAt: new Date("2025-07-12T14:30:00Z").toISOString(),
  },
  {
    id: "o3",
    vendorId: "v3",
    userId: "u103",
    orderDetails: "Fashion photoshoot; studio lighting; 3 outfit changes.",
    eventDate: new Date("2025-08-25").toISOString(),
    eventDuration: 3,
    price: 600,
    status: "COMPLETED",
    createdAt: new Date("2025-06-20T08:45:00Z").toISOString(),
    updatedAt: new Date("2025-06-21T11:00:00Z").toISOString(),
  },
]

export function getVendors(): Vendor[] {
  return vendors
}

export function findVendorById(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id)
}

export function getAllCustomOrders(opts?: { page?: number; pageSize?: number }) {
  const page = opts?.page ?? 1
  const pageSize = opts?.pageSize ?? 50
  const total = customOrders.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const orders = customOrders.slice(start, end)
  return {
    orders,
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

export function deleteCustomOrder(id: string): boolean {
  const idx = customOrders.findIndex((o) => o.id === id)
  if (idx !== -1) {
    customOrders.splice(idx, 1)
    return true
  }
  return false
}

export function getAllPackages(opts?: { page?: number; pageSize?: number }) {
  const page = opts?.page ?? 1
  const pageSize = opts?.pageSize ?? 50
  const total = standardPackages.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const packages = standardPackages.slice(start, end)
  return {
    packages: packages.map((p) => ({
      ...p,
      vendor: findVendorById(p.vendorId),
    })),
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

export function findPackageById(id: string) {
  const p = standardPackages.find((x) => x.id === id)
  if (!p) return undefined
  return {
    ...p,
    vendor: findVendorById(p.vendorId),
  }
}

export function deletePackage(id: string): boolean {
  const idx = standardPackages.findIndex((p) => p.id === id)
  if (idx !== -1) {
    standardPackages.splice(idx, 1)
    return true
  }
  return false
}

export function createPackage(input: {
  packageName: string
  vendorId: string
  price: number
  duration: number
  isAvailable: boolean
}): StandardPackage {
  const id = "p" + (Math.max(0, ...standardPackages.map((p) => Number.parseInt(p.id.replace("p", "")) || 0)) + 1)
  const pkg: StandardPackage = {
    id,
    packageName: input.packageName,
    vendorId: input.vendorId,
    price: input.price,
    duration: input.duration,
    isAvailable: input.isAvailable,
    createdAt: new Date().toISOString(),
  }
  standardPackages.unshift(pkg)
  return pkg
}

export function updatePackage(
  id: string,
  input: Partial<Omit<StandardPackage, "id" | "createdAt">>,
): StandardPackage | undefined {
  const idx = standardPackages.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  standardPackages[idx] = { ...standardPackages[idx], ...input }
  return standardPackages[idx]
}
