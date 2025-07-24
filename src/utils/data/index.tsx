
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
      serviceType: "Venue",
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
        serviceType: "Venue",
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
        serviceType: "Venue",
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
        serviceType: "Venue",
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
      serviceType: "Farmhouse",
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
        serviceType: "Farmhouse",
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
        serviceType: "Farmhouse",
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
      serviceType: "CateringPackage",
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
        serviceType: "CateringPackage",
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
        serviceType: "CateringPackage",
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
      serviceType: "PhotographyPackage",
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
        serviceType: "PhotographyPackage",
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
        serviceType: "PhotographyPackage",
      },
      {
        id: "msg-010",
        senderId: "vendor-004",
        receiverId: "user-123",
        message: "When would be a good time for a consultation call?",
        messageType: "Text" as const,
        status: "Read" as const,
        sentAt: "2024-01-15T18:30:00Z",
        serviceType: "PhotographyPackage",
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
      serviceType: "Advertisement",
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
        serviceType: "Advertisement",
      },
      {
        id: "msg-012",
        senderId: "vendor-005",
        receiverId: "user-123",
        message: "We can definitely help with your decoration needs! March 15th is available.",
        messageType: "Text" as const,
        status: "Delivered" as const,
        sentAt: "2024-01-15T20:15:00Z",
        serviceType: "Advertisement",
      },
    ],
    unreadCount: 1,
  },
]

export const mockServiceInquiries = [
  {
    id: "inq-001",
    chatId: "chat-001",
    serviceType: "Venue",
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
    serviceType: "Farmhouse",
    serviceId: "farmhouse-sunset",
    inquiryText: "Could you send me some recent photos of the farmhouse and availability for weekend bookings?",
    status: "Open" as const,
    createdAt: "2024-01-15T13:30:00Z",
    vendorId: "vendor-002",
  },
  {
    id: "inq-003",
    chatId: "chat-003",
    serviceType: "CateringPackage",
    serviceId: "catering-delicious",
    inquiryText: "I need catering for 100 people. What packages do you offer and what are the pricing options?",
    status: "Converted" as const,
    createdAt: "2024-01-15T16:00:00Z",
    vendorId: "vendor-003",
  },
  {
    id: "inq-004",
    chatId: "chat-004",
    serviceType: "PhotographyPackage",
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
    serviceType: "Venue",
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
  { id: "user1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "user2", name: "Bob Williams", email: "bob@example.com" },
  { id: "user3", name: "Charlie Brown", email: "charlie@example.com" },
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
    serviceType: "Venue",
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
    serviceType: "Photography",
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
