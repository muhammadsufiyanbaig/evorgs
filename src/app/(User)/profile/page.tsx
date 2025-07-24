import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Mail, Phone, MapPin, Calendar, User } from "lucide-react"
import Link from "next/link"

// Mock user data based on your schema
const mockUser = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  profileImage: "/placeholder.svg?height=100&width=100",
  dateOfBirth: "1990-05-15",
  gender: "Male" as const,
  isVerified: true,
  createdAt: "2024-01-15T10:30:00Z",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Link href="/profile/edit">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src={mockUser.profileImage || "/placeholder.svg"}
                    alt={`${mockUser.firstName} ${mockUser.lastName}`}
                  />
                  <AvatarFallback className="text-lg">
                    {mockUser.firstName[0]}
                    {mockUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">
                  {mockUser.firstName} {mockUser.lastName}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  {mockUser.isVerified ? (
                    <Badge variant="default" className="bg-orange-100 text-orange-800 border-orange-200">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(mockUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{mockUser.address}</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(mockUser.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Gender</p>
                    <p className="text-sm text-muted-foreground">{mockUser.gender}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/profile/settings">
            <Button variant="outline">Settings</Button>
          </Link>
          <Button variant="destructive" className="ml-auto">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
