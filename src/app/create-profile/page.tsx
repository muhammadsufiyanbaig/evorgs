"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera } from 'lucide-react'
import { ProfileFormData } from "@/utils/interfaces"
import Image from "next/image"
import { useRouter } from "next/navigation"


export default function CreateProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    sex: "",
    dateOfBirth: "",
    profileImage: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sex: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    router.push("/dashboard");
  }

  return (
    <section className="py-10 flex justify-center items-center bg-gradient-to-b min-h-screen from-orange-100 to-white dark:from-orange-900 dark:to-gray-900">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8">
          <h1 className="text-3xl font-serif font-extrabold mb-2 text-orange-500 dark:text-orange-400">
            Profile
          </h1>
          <h2 className="text-gray-600 dark:text-gray-400 text-sm mb-6">Create Your Profile</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Profile Image */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full bg-orange-200 dark:bg-orange-700 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <Image
                    height={128}
                    width={128}
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-orange-500 dark:text-orange-300" />
                  )}
                </div>
                <label
                  htmlFor="upload_profile"
                  className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </label>
                <input
                  type="file"
                  id="upload_profile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload Profile Image</p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="mt-1 border-orange-200 focus:ring-orange-500 focus:border-orange-500 dark:border-orange-700 dark:focus:ring-orange-400 dark:focus:border-orange-400"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="mt-1 border-orange-200 focus:ring-orange-500 focus:border-orange-500 dark:border-orange-700 dark:focus:ring-orange-400 dark:focus:border-orange-400"
                />
              </div>
            </div>

            {/* Sex and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="sex" className="text-gray-700 dark:text-gray-300">Gender</Label>
                <Select onValueChange={handleSelectChange} value={formData.sex}>
                  <SelectTrigger className="w-full mt-1 border-orange-200 focus:ring-orange-500 focus:border-orange-500 dark:border-orange-700 dark:focus:ring-orange-400 dark:focus:border-orange-400">
                    <SelectValue placeholder="Select Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1 border-orange-200 focus:ring-orange-500 focus:border-orange-500 dark:border-orange-700 dark:focus:ring-orange-400 dark:focus:border-orange-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
              Create Profile
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

