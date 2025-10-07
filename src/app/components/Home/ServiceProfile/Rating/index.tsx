"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, Star } from "lucide-react";
import { useState } from "react";

interface RatingProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | null;
}

export default function Rating({ serviceData, serviceType }: RatingProps) {
  const reviews = serviceData?.reviews || [];
  
  const PersonRating = reviews.length > 0 ? reviews[0] : {
    rating: 4,
    author: "Demo Test",
    timestamp: "2 years ago",
    organization: "Nice Music Brands",
    content:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Egestas Id Gravida Libero, Convallis. Diam Vulputate Et Vulputat Risus Amet Dolor",
  };
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="bg-white rounded-lg px-6">
      <h2 className="py-6 text-xl font-bold">Rating</h2>
      <div className="py-6 relative border-t ">
        <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
        <div className="py-6 space-y-6">
          {/* Rating Section */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-[30%_auto] gap-6">
              <Card className="flex flex-col items-center justify-center gap-4 shadow-none rounded-lg aspect-square h-40 mx-auto">
                <div className="text-5xl font-bold">4.5</div>
                <div className="flex text-orange-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-40" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on 1 rating
                </div>
              </Card>
              <Card className="shadow-none flex items-center">
                <div className="space-y-1 flex-1 group">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center gap-4 even:bg-gray-50 px-6 py-3"
                    >
                      <div className="flex text-orange-400">
                        {Array(rating)
                          .fill(null)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                      </div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full"
                          style={{
                            width:
                              rating === 5
                                ? "60%"
                                : rating === 4
                                ? "30%"
                                : "10%",
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-4">
                        {rating === 5 ? "15" : rating === 4 ? "7" : "2"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg px-6 py-3">
              <p>Reviewed by 1 user</p>
            </div>
            <Card className="p-6 bg-gray-50 shadow-none rounded-lg border-none">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gray-200">DT</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < PersonRating.rating
                                ? "fill-orange-400 text-orange-400"
                                : " text-orange-400"
                            }`}
                          />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center flex-wrap gap-2">
                      by: {PersonRating.author}
                    <div className="flex items-center gap-2">
                    <span className="">
                        <CalendarDays className="h-4 w-4" />
                      </span>
                      {PersonRating.timestamp}
                    </div>
                    </span>
                  </div>
                  <h3 className="font-medium">{PersonRating.organization}</h3>
                  <p className="text-muted-foreground text-balance">
                    {PersonRating.content}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Feedback Form */}
          <div className="space-y-4 bg-gray-50 rounded-lg px-2 md:px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Leave feedback about this
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  required
                  className="bg-white border-none shadow-none h-11"
                />
                <Textarea
                  id="review"
                  required
                  className="bg-white border-none outline-none shadow-none p-4"
                  placeholder="Write your review*"
                  rows={8}
                />
                <Input
                  id="name"
                  placeholder="Name*"
                  required
                  className="bg-white border-none shadow-none h-11"
                />

                <Input
                  id="email"
                  type="email"
                  placeholder="Email*"
                  required
                  className="bg-white border-none shadow-none h-11"
                />
                <Input
                  id="website"
                  type="text"
                  placeholder="Website"
                  required
                  className="bg-white border-none shadow-none h-11"
                />
              </div>

              <div className="flex items-center gap-6">
                <Label className="text-lg">Rating*</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="hover:scale-110 transition-transform"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= (hoveredRating || rating)
                            ? "fill-orange-400 text-orange-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-fit py-6 px-8 bg-orange-500 hover:bg-orange-600"
              >
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
