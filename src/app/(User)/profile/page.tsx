"use client"

import { SetStateAction, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Heart, User2, Edit } from "lucide-react"
import EditUserModal from "@/app/components/EditUserModal"

export default function UserDetailPage() {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    profilePic: "/banner.jpg",
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleUserUpdate = (updatedUser: SetStateAction<{ firstName: string; lastName: string; gender: string; dateOfBirth: string; profilePic: string }>) => {
    setUser(updatedUser)
    setIsEditModalOpen(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-100 to-white">
      <div className=" container mx-auto py-12 px-4">
        <Card className="max-w-3xl mx-auto overflow-hidden shadow-lg">
          <CardContent className="pt-8 pb-8 px-8">
            <div className="flex flex-col items-center mb-8 relative">
              <Image
                src={user.profilePic || "/placeholder.svg"}
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-4 border-orange-500 shadow-md mb-4"
              />
              <h1 className="text-3xl font-bold text-center text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-0 right-0 text-orange-500 hover:text-orange-600 hover:bg-orange-100"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center md:justify-start">
                <User2 className="w-6 h-6 mr-3 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-gray-700">Gender</h3>
                  <p className="text-gray-600">{user.gender}</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Calendar className="w-6 h-6 mr-3 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-gray-700">Date of Birth</h3>
                  <p className="text-gray-600">{user.dateOfBirth}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/favourite" className="w-full">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                  <Heart className="w-4 h-4 mr-2" />
                  Favourites
                </Button>
              </Link>
              <Link href="/my_booking" className="w-full">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                  <Calendar className="w-4 h-4 mr-2" />
                  My Bookings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdate={handleUserUpdate}
      />
    </div>
  )
}

