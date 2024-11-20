import { Search, MapPin, Grid3X3, Building2, ShoppingBag, Hotel, LibraryIcon as Museum, Utensils } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

export default function Hero() {
  const categories = [
    { name: "Restaurant", icon: Utensils, count: 10 },
    { name: "Shopping", icon: ShoppingBag, count: 3 },
    { name: "Hotel", icon: Hotel, count: 4 },
    { name: "Museum", icon: Museum, count: 3 },
  ]

  return (
    <div className="relative min-h-[50vh] pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Content */}
      <div className="relative px-4 pt-20 pb-32 space-y-12">
        {/* Hero Text */}
        <div className="flex justify-center items-center ">
          <div className='text-center space-y-4'>
          <p className="text-orange-500">Discover & Connect With Great Places Around The World</p>
          <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold w-fit text-orange-500">
            Let's Discover This City
          </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto bg-white rounded-lg sm:rounded-full p-2 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4">
            <Input 
              type="text" 
              placeholder="What are you looking for" 
              className="border-0 focus-visible:ring-0"
            />
          </div>
          <Select >
            <SelectTrigger className="w-full flex-1  md:w-[200px] border-0 focus:ring-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <SelectValue placeholder="Select Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tokyo">Tokyo</SelectItem>
              <SelectItem value="osaka">Osaka</SelectItem>
              <SelectItem value="kyoto">Kyoto</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full flex-1  md:w-[200px] border-0 focus:ring-0">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4  text-orange-500" />
                <SelectValue placeholder="Select Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.name} value={category.name.toLowerCase()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="w-full md:w-auto px-8 rounded-full bg-orange-500 hover:bg-orange-600">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.name}
                variant="ghost"
                className="text-orange-500 bg-white/100 backdrop-blur-sm  hover:bg-muted/50 transition-colors"
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.name} className="p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer bg-white/90 backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-muted-foreground text-sm">({category.count})</p>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}