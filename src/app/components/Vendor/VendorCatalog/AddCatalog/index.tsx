import type React from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { LucideIcon } from "lucide-react"

type Category = {
  name: string
  icon: LucideIcon
}

type AddCatalogModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  newCatalogItem: {
    title: string
    description: string
    categories: string
    imageSrc: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCategoryChange: (value: string) => void
  handleAddCatalog: () => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void  // <-- added handler
  categories: Category[]
}

const AddCatalogModal: React.FC<AddCatalogModalProps> = ({
  isOpen,
  setIsOpen,
  newCatalogItem,
  handleInputChange,
  handleCategoryChange,
  handleAddCatalog,
  handleImageUpload,  // <-- added handler
  categories,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="p-2">
          <Plus className="mr-2 h-4 w-4" /> Add New Catalog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Catalog Item</DialogTitle>
          <DialogDescription>Fill in the details for the new catalog item.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={newCatalogItem.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={newCatalogItem.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
            {/* Replace image URL input with file upload */}
            <div className="flex flex-col space-y-2">
            <Label htmlFor="imageSrc" className="text-sm font-medium text-gray-700">
              Upload Image
            </Label>
            <div className="relative flex flex-col items-center justify-center w-full border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:border-gray-400 transition cursor-pointer">
              <input
              type="file"
              id="imageSrc"
              name="imageSrc"
              onChange={(e) => {
                handleImageUpload(e);
                if (e.target.files && e.target.files[0]) {
                const fileName = e.target.files[0].name;
                document.getElementById('fileName')!.textContent = fileName;
                }
              }}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-10 h-10 text-gray-500" />
            </div>
            <span id="fileName" className="text-sm text-gray-500"></span>
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddCatalog}>
            Add Catalog Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCatalogModal;