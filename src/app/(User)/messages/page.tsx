"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, FileText, User, Sparkles } from "lucide-react"
import { ChatList } from "@/app/components/Home/Chats/ChatList"
import { ChatWindow } from "@/app/components/Home/Chats/ChatWindows"
import { InquiriesTab } from "@/app/components/Home/Chats/InquiresTabs"

const MOCK_USER = {
  id: "user-123",
  type: "user",
  name: "John Doe",
}

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation)
  }

  const handleBackToList = () => {
    setSelectedConversation(null)
  }

  return (
    <div className="min-h-screen my-10 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Messages
                </h1>
                <p className="text-gray-600 font-medium">Connect with vendors and manage your inquiries</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">All conversations secured</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="chats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white shadow-sm border-0 p-1">
            <TabsTrigger
              value="chats"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white font-medium py-3 rounded-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Conversations</span>
            </TabsTrigger>
            <TabsTrigger
              value="inquiries"
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white font-medium py-3 rounded-lg transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Inquiries</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chats">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-240px)]">
              {/* Chat List */}
              <div className={`lg:col-span-4 ${isMobile && selectedConversation ? "hidden" : "block"}`}>
                <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <ChatList
                    userId={MOCK_USER.id}
                    userType={MOCK_USER.type}
                    onSelectConversation={handleSelectConversation}
                    selectedConversationId={selectedConversation?.otherUserId}
                  />
                </Card>
              </div>

              {/* Chat Window */}
              <div className={`lg:col-span-8 ${isMobile && !selectedConversation ? "hidden" : "block"}`}>
                {selectedConversation ? (
                  <Card className="h-full shadow-lg border-0 overflow-hidden">
                    <ChatWindow conversation={selectedConversation} userId={MOCK_USER.id} onBack={handleBackToList} />
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-12 h-12 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Select a conversation</h3>
                      <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                        Choose a conversation from the list to start messaging with vendors and service providers
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <InquiriesTab userId={MOCK_USER.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
