import { Search, MapPin, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  return (
    <div className="w-full container p-4 !mt-28 rounded-xl md:rounded-full md:py-0 md:pr-0 bg-white shadow-md">
      <div className="grid grid-rows-4 md:grid-rows-1 md:grid-cols-[auto_auto_auto_20%] gap-3 p-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="What are you looking for"
            className="w-full pl-4 h-12  md:border-none md:shadow-none"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full h-12  md:border-none md:shadow-none">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select Location" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="tokyo">Tokyo</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full h-12  md:border-none md:shadow-none">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
        <Button className="h-12 px-8 bg-orange-500 hover:bg-orange-600 rounded-full">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}