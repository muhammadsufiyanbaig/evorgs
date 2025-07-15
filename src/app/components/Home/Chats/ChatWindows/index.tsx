"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft, Check, CheckCheck, ImageIcon, File, MapPin, MoreVertical, } from "lucide-react"


interface Message {
  id: string
  senderId: string
  receiverId: string
  message: string
  messageType: "Text" | "Image" | "File" | "Location"
  status: "Sent" | "Delivered" | "Read" | "Deleted"
  sentAt: string
  attachmentUrl?: string
  serviceType?: string
}

interface ChatWindowProps {
  conversation: {
    otherUserId: string
    otherUserName: string
    otherUserAvatar: string
    messages: Message[]
    lastMessage: Message
  }
  userId: string
  onBack: () => void
}

export function ChatWindow({ conversation, userId, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages(conversation.messages)
    scrollToBottom()
  }, [conversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: userId,
      receiverId: conversation.otherUserId,
      message: newMessage,
      messageType: "Text",
      status: "Sent",
      sentAt: new Date().toISOString(),
      serviceType: conversation.messages[0]?.serviceType,
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage("")

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "Delivered" as const } : msg)))
    }, 1000)

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "Read" as const } : msg)))
    }, 3000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

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

  const getMessageIcon = (messageType: string) => {
    switch (messageType) {
      case "Image":
        return <ImageIcon className="w-4 h-4" />
      case "File":
        return <File className="w-4 h-4" />
      case "Location":
        return <MapPin className="w-4 h-4" />
      default:
        return null
    }
  }

  const renderMessage = (message: Message) => {
    const isOwn = message.senderId === userId
    const icon = getMessageIcon(message.messageType)

    return (
      <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-6 group`}>
        <div
          className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
        >
          {!isOwn && (
            <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm">
              <AvatarImage src={conversation.otherUserAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-600 text-white text-xs">
                {conversation.otherUserName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm ${
              isOwn
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-md"
                : "bg-white text-gray-900 border border-gray-100 rounded-bl-md"
            }`}
          >
            {message.serviceType && (
              <Badge
                className={`mb-2 text-xs border-0 ${
                  isOwn ? "bg-white/20 text-white" : "bg-orange-100 text-orange-800"
                }`}
              >
                {message.serviceType}
              </Badge>
            )}

            <div className="flex items-start space-x-2">
              {icon && <span className="mt-1">{icon}</span>}
              <div className="flex-1">
                {message.messageType === "Text" ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
                ) : message.messageType === "Image" ? (
                  <div>
                    <img
                      src={message.attachmentUrl || "/placeholder.svg?height=200&width=300&query=image"}
                      alt="Shared image"
                      className="rounded-lg max-w-full h-auto mb-2 shadow-sm"
                    />
                    {message.message && <p className="text-sm">{message.message}</p>}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium flex items-center">
                      {icon}
                      <span className="ml-2">{message.messageType}</span>
                    </p>
                    {message.message && <p className="text-sm mt-1">{message.message}</p>}
                    {message.attachmentUrl && (
                      <a
                        href={message.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline opacity-75 block mt-1"
                      >
                        View attachment
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`flex items-center justify-between mt-2 text-xs ${isOwn ? "text-white/70" : "text-gray-500"}`}
            >
              <span>{(new Date(message.sentAt)).toLocaleString()}</span>
              {getStatusIcon(message.status, message.senderId)}
            </div>

            {/* Message tail */}
            <div
              className={`absolute bottom-0 w-3 h-3 ${
                isOwn
                  ? "right-0 transform translate-x-1 bg-gradient-to-r from-orange-500 to-orange-600"
                  : "left-0 transform -translate-x-1 bg-white border-l border-b border-gray-100"
              } rotate-45`}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Card className="border-0 shadow-sm rounded-none">
        <CardHeader className="bg-gradient-to-r from-white to-orange-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden hover:bg-orange-100">
                <ArrowLeft className="w-4 h-4" />
              </Button>

              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
                  <AvatarImage src={conversation.otherUserAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
                    {conversation.otherUserName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">{conversation.otherUserName}</h2>
                <p className="text-sm text-green-600 font-medium">Online now</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
             
              <Button variant="ghost" size="sm" className="hover:bg-orange-100 text-orange-600">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        <div className="max-w-4xl mx-auto">
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <Card className="border-0 shadow-lg rounded-none">
        <CardContent className="p-4 bg-white">
          <div className="flex items-center space-x-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="pr-12 border-gray-200 focus:border-orange-400 focus:ring-orange-400 rounded-full py-3 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>

            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
