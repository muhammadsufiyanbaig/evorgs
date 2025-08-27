"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, MoreHorizontal, Eye, Trash2, MessageCircle, Copy } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockChats = [
  {
    id: "1",
    sender: "John Doe",
    receiver: "Vendor A",
    message: "Interested in your catering service for my wedding on June 15th. Can you provide a quote for 150 guests?",
    status: "Read",
    sentAt: "2024-01-15 10:30",
    type: "Service",
    fullConversation: [
      {
        sender: "John Doe",
        message: "Hi, I'm interested in your catering service for my wedding.",
        timestamp: "2024-01-15 10:30",
      },
      {
        sender: "Vendor A",
        message: "Hello! Congratulations on your upcoming wedding. I'd be happy to help.",
        timestamp: "2024-01-15 10:32",
      },
      {
        sender: "John Doe",
        message: "Great! The wedding is on June 15th and we're expecting about 150 guests.",
        timestamp: "2024-01-15 10:35",
      },
      {
        sender: "Vendor A",
        message: "Perfect! Let me prepare a customized quote for you.",
        timestamp: "2024-01-15 10:40",
      },
    ],
  },
  {
    id: "2",
    sender: "Jane Smith",
    receiver: "Vendor B",
    message: "Can you provide photography for our corporate event next month?",
    status: "Delivered",
    sentAt: "2024-01-15 09:15",
    type: "Service",
    fullConversation: [
      {
        sender: "Jane Smith",
        message: "Hi, we need photography services for our corporate event.",
        timestamp: "2024-01-15 09:15",
      },
      {
        sender: "Vendor B",
        message: "I'd love to help with your corporate event photography!",
        timestamp: "2024-01-15 09:20",
      },
    ],
  },
  {
    id: "3",
    sender: "Mike Johnson",
    receiver: "Vendor C",
    message: "Looking for venue rental for a birthday party. Do you have availability?",
    status: "Sent",
    sentAt: "2024-01-15 08:45",
    type: "Ad",
    fullConversation: [
      {
        sender: "Mike Johnson",
        message: "Looking for venue rental for a birthday party. Do you have availability?",
        timestamp: "2024-01-15 08:45",
      },
    ],
  },
]

export default function ChatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    const variants = {
      Read: "bg-green-100 text-green-800 border-green-200",
      Delivered: "bg-blue-100 text-blue-800 border-blue-200",
      Sent: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    return (
      <Badge 
        variant="outline" 
        className={`${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"} text-xs font-medium`}
      >
        {status}
      </Badge>
    )
  }

  const openChatDialog = (chat: any) => {
    setSelectedChat(chat)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-orange-900">
              All Chats
            </h2>
            <p className="text-sm sm:text-base text-orange-700/80">
              Manage and monitor all chat conversations
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
              <Input
                placeholder="Search chats..."
                className="pl-10 w-full sm:w-64 border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Mobile Card View (visible on small screens) */}
        <div className="block lg:hidden space-y-4">
          {mockChats.map((chat) => (
            <Card key={chat.id} className="bg-white border-orange-200 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-orange-900 truncate">
                        {chat.sender} → {chat.receiver}
                      </p>
                      <p className="text-xs text-orange-600 mt-1">{chat.sentAt}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {getStatusBadge(chat.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-orange-200">
                          <DropdownMenuItem 
                            onClick={() => openChatDialog(chat)}
                            className="text-orange-700 hover:bg-orange-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">{chat.message}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-orange-100">
                    <Badge 
                      variant="outline" 
                      className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
                    >
                      {chat.type}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openChatDialog(chat)}
                      className="text-orange-600 hover:bg-orange-50 text-xs"
                    >
                      View Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop Table View (hidden on small screens) */}
        <Card className="hidden lg:block bg-white border-orange-200 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50 border-orange-200">
                    <TableHead className="text-orange-900 font-semibold">Sender</TableHead>
                    <TableHead className="text-orange-900 font-semibold">Receiver</TableHead>
                    <TableHead className="text-orange-900 font-semibold">Message</TableHead>
                    <TableHead className="text-orange-900 font-semibold">Status</TableHead>
                    <TableHead className="text-orange-900 font-semibold">Type</TableHead>
                    <TableHead className="text-orange-900 font-semibold">Sent At</TableHead>
                    <TableHead className="text-orange-900 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockChats.map((chat) => (
                    <TableRow key={chat.id} className="border-orange-100 hover:bg-orange-25">
                      <TableCell className="font-medium text-orange-900">{chat.sender}</TableCell>
                      <TableCell className="text-orange-800">{chat.receiver}</TableCell>
                      <TableCell className="max-w-xs truncate text-gray-700">{chat.message}</TableCell>
                      <TableCell>{getStatusBadge(chat.status)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          {chat.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-orange-600">{chat.sentAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-orange-600 hover:bg-orange-50"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-orange-200">
                            <DropdownMenuItem 
                              onClick={() => openChatDialog(chat)}
                              className="text-orange-700 hover:bg-orange-50"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Chat Details Dialog */}
        <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] sm:max-h-[80vh] bg-white border-orange-200 m-4 sm:m-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-orange-900">
                <MessageCircle className="h-5 w-5 text-orange-600" />
                Chat Details
              </DialogTitle>
              <DialogDescription className="text-orange-700/80">
                View the complete conversation thread
              </DialogDescription>
            </DialogHeader>

            {selectedChat && (
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                  {/* Chat Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="text-sm font-medium text-orange-900">From</p>
                      <p className="text-sm text-orange-700">{selectedChat.sender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">To</p>
                      <p className="text-sm text-orange-700">{selectedChat.receiver}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Status</p>
                      {getStatusBadge(selectedChat.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Type</p>
                      <Badge 
                        variant="outline" 
                        className="bg-orange-100 text-orange-800 border-orange-300"
                      >
                        {selectedChat.type}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="bg-orange-200" />

                  {/* Conversation Thread */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-orange-900">Conversation</h4>
                    {selectedChat.fullConversation?.map((msg: any, index: number) => (
                      <div 
                        key={index} 
                        className="flex flex-col space-y-2 p-3 rounded-lg bg-gradient-to-r from-orange-25 to-white border border-orange-100"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                          <span className="text-sm font-medium text-orange-900">{msg.sender}</span>
                          <span className="text-xs text-orange-600">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{msg.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-orange-200">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Chat ID
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Chat
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
