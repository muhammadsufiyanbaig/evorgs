"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Clock, CheckCheck, Check, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockConversations } from "@/utils/data"


interface Conversation {
  otherUserId: string
  otherUserName: string
  otherUserAvatar: string
  lastMessage: {
    id: string
    message: string
    messageType: string
    status: string
    sentAt: string
    senderId: string
    serviceType?: string
  }
  messages: any[]
  unreadCount: number
}

interface ChatListProps {
  userId: string
  userType: string
  onSelectConversation: (conversation: Conversation) => void
  selectedConversationId?: string
}

export function ChatList({ userId, userType, onSelectConversation, selectedConversationId }: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setConversations(mockConversations)
      setLoading(false)
    }, 1000)
  }, [userId, userType])

  const filteredConversations = conversations.filter((conversation) =>
    conversation.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string, senderId: string) => {
    if (senderId !== userId) return null

    switch (status) {
      case "Sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "Delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "Read":
        return <CheckCheck className="w-3 h-3 text-orange-500" />
      default:
        return null
    }
  }

  const getServiceBadge = (serviceType?: string) => {
    if (!serviceType) return null

    const colors = {
      Venue: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300",
      Farmhouse: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300",
      CateringPackage: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300",
      PhotographyPackage: "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border-pink-300",
      Advertisement: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300",
    }

    return (
      <Badge className={`text-xs border ${colors[serviceType as keyof typeof colors] || "bg-gray-100 text-gray-800"}`}>
        {serviceType}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-100"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.otherUserId}
              className={`group cursor-pointer transition-all duration-200 ${
                selectedConversationId === conversation.otherUserId
                  ? "transform scale-[0.98]"
                  : "hover:transform hover:scale-[0.99]"
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <Card
                className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                  selectedConversationId === conversation.otherUserId
                    ? "bg-gradient-to-r from-orange-50 to-orange-100 ring-2 ring-orange-300 shadow-lg"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                        <AvatarImage src={conversation.otherUserAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
                          {conversation.otherUserName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate text-sm">{conversation.otherUserName}</h3>
                        <div className="flex items-center space-x-2">
                          {getServiceBadge(conversation.lastMessage.serviceType)}
                          {conversation.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-sm">
                              {conversation.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 truncate flex-1 pr-2">
                          {conversation.lastMessage.messageType === "Text"
                            ? conversation.lastMessage.message
                            : `📎 ${conversation.lastMessage.messageType}`}
                        </p>

                        <div className="flex items-center space-x-1">
                          {getStatusIcon(conversation.lastMessage.status, conversation.lastMessage.senderId)}
                          <span className="text-xs text-gray-400 flex items-center whitespace-nowrap">
                            <Clock className="w-3 h-3 mr-1" />
                            {(new Date(conversation.lastMessage.sentAt)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
