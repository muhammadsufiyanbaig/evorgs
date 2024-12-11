"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookCopy,
  BookMarked,
  ChevronDown,
  Heart,
  Lock,
  MapPin,
  UsersRound,
  Verified,
} from "lucide-react";

export default function PhotographerProfile() {
  const posts = [
    {
      id: 1,
      imageSrc: "/venue-category.jpg",
      alt: "Nature scene",
      title: "My new project",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima tenetur aut aperiam quibusdam eveniet a necessitatibus. Harum, explicabo ducimus.",
      time: "12:09 PM",
      likes: 23,
      saved: 12,
      locked: true,
      badge: null,
    },
    {
      id: 2,
      imageSrc: "/venue-category.jpg",
      alt: "Fashion photoshoot",
      title: "My first photoshoot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima tenetur aut aperiam quibusdam eveniet a necessitatibus. Harum, explicabo ducimus.",
      time: "1 day ago",
      likes: 12,
      saved: 4,
      locked: false,
      badge: "Premium",
    },
    {
      id: 3,
      imageSrc: "/venue-category.jpg",
      alt: "Fashion photoshoot",
      title: "My first photoshoot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima tenetur aut aperiam quibusdam eveniet a necessitatibus. Harum, explicabo ducimus.",
      time: "1 day ago",
      likes: 12,
      saved: 4,
      locked: false,
      badge: "Premium",
    },
    {
      id: 4,
      imageSrc: "/venue-category.jpg",
      alt: "Fashion photoshoot",
      title: "My first photoshoot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima tenetur aut aperiam quibusdam eveniet a necessitatibus. Harum, explicabo ducimus.",
      time: "1 day ago",
      likes: 12,
      saved: 4,
      locked: false,
      badge: "Premium",
    },
    {
      id: 5,
      imageSrc: "/venue-category.jpg",
      alt: "Fashion photoshoot",
      title: "My first photoshoot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima tenetur aut aperiam quibusdam eveniet a necessitatibus. Harum, explicabo ducimus.",
      time: "1 day ago",
      likes: 12,
      saved: 4,
      locked: false,
      badge: "Premium",
    },
    {
      id: 6,
      imageSrc: "/venue-category.jpg",
      alt: "Fashion photoshoot",
      title: "My first photoshoot",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima tenetur aut aperiam quibusdam eveniet a necessitatibus. Harum, explicabo ducimus.",
      time: "1 day ago",
      likes: 12,
      saved: 4,
      locked: false,
      badge: "Premium",
    },
    // ...add four more post objects...
  ];

  interface SortDropdownProps {
    value?: string;
    onValueChange?: (value: string) => void;
  }

  const [sortBy, setSortBy] = useState("Most popular");

  return (
    <section className="container">
      <div className="w-full mt-16">
        {/* Banner and Profile Section */}
        <div className="relative">
          <div className="h-52 md:h-96 w-full relative rounded-xl p-4 overflow-hidden">
            <Image
              src="/aboutbanner.jpg"
              alt="Profile banner"
              width={1000}
              height={1000}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="absolute -bottom-10 left-4 md:left-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <Image
                src="/pic-4.jpg"
                alt="Profile picture"
                className="object-cover"
                fill
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="py-12 px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Johnathan Clein</h1>
                <Verified className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-2 flex-wrap text-muted-foreground">
                <span>Commercial photographer</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>California, USA</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 bg-white px-2 py-2 rounded-xl">
              <div className="text-start px-3 flex flex-col sm:flex-row items-center justify-center gap-2 border-r-2">
                <UsersRound className="fill-muted-foreground text-muted-foreground" />
                <div className="text-xs md:text-base text-center sm:text-start">
                  <div className="font-bold">3,487</div>
                  <div className="text-sm text-muted-foreground">
                    subscribers
                  </div>
                </div>
              </div>
              <div className="text-start px-3 flex flex-col sm:flex-row items-center justify-center gap-2 border-r-2">
                <BookCopy className="fill-muted-foreground text-muted-foreground" />
                <div className="text-xs md:text-base text-center sm:text-start">
                  <div className="font-bold">28</div>
                  <div className="text-sm text-muted-foreground">posts</div>
                </div>
              </div>
              <div className="text-start px-3 flex flex-col sm:flex-row items-center justify-center gap-2 ">
                <Heart className="fill-muted-foreground text-muted-foreground" />
                <div className="text-xs md:text-base text-center sm:text-start">
                  <div className="font-bold">1,593</div>
                  <div className="text-sm text-muted-foreground">likes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row justify-between items-center mt-8 px-4">
            <Tabs defaultValue="posts" className="border rounded-xl overflow-hidden p-1 bg-white">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="posts"
                  className="data-[state=active]:bg-orange-400/70 text-xs md:text-base rounded-lg px-3 sm:px-4 py-2"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="goals"
                  className="data-[state=active]:bg-orange-400/70 text-xs md:text-base rounded-lg px-3 sm:px-4 py-2"
                >
                  Goals
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="data-[state=active]:bg-orange-400/70 text-xs md:text-base rounded-lg px-3 sm:px-4 py-2"
                >
                  Community
                  <Badge className="ml-2 bg-orange-600">3</Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:bg-orange-400/70 text-xs md:text-base rounded-lg px-3 sm:px-4 py-2"
                >
                  Courses
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex justify-end w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground gap-2"
                  >
                    Sort by: <span className="text-black">{sortBy}</span>{" "}
                    <ChevronDown className="w-4 h-4 bg-white rounded" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("Most popular")}>
                    Most popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("Newest")}>
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("Oldest")}>
                    Oldest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-8">
            {posts.map((post) => (
              <Card key={post.id} className="relative group overflow-hidden p-2">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={post.imageSrc}
                    alt={post.alt}
                    className="object-cover rounded-xl"
                    fill
                  />
                  {post.locked ? (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white bg-orange-800 px-4 py-2 rounded-full">
                        <Lock className="w-5 h-5" />
                        <span className="font-medium">Locked</span>
                      </div>
                    </div>
                  ) : (
                    post.badge && (
                      <Badge className="absolute top-0 right-0 !bg-orange-600 rounded-xl px-4 py-2">
                        {post.badge}
                      </Badge>
                    )
                  )}
                </div>
                <div className="p-4 space-y-3">
                 <div className="flex justify-between items-center flex-wrap">
                 <h3 className="font-bold line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.time}
                  </p>
                 </div>
                 <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-muted-foreground"/>
                      {post.likes} likes
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <BookMarked className="h-4 w-4 "/>
                      {post.saved} saved
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
