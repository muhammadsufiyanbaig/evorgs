import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
 // Assuming there's a DatePicker component in shadcn

const SearchBar = () => (
  <div className="bg-white shadow-md p-6 flex space-x-5 mt-11 flex-wrap justify-between items-center rounded-xl space-y-4 md:space-y-0">
    {/* Property Type Dropdown */}
    <Select defaultValue="Villa">
      <SelectTrigger className="flex-grow md:flex-1 p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow">
        <SelectValue placeholder="Select Property Type" />
      </SelectTrigger>
      <SelectContent className="space-y-1">
        <SelectItem value="Villa">Villa</SelectItem>
        <SelectItem value="Resort">Resort</SelectItem>
        <SelectItem value="Apartment">Apartment</SelectItem>
        <SelectItem value="Farm House">Farm House</SelectItem>
      </SelectContent>
    </Select>

    {/* Check-in Date Picker */}
    <Input
        type="date"
        id="check-in" 
      placeholder="Check-in Date"
      className="p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow flex-grow md:flex-1"
    />

    {/* Check-out Date Picker */}
    <Input
        type="date"
        id="check-in"
      placeholder="Check-out Date"
      className="p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow flex-grow md:flex-1"
    />

    {/* Search Button */}
    <button className="w-full md:w-auto p-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none transition">
      Search
    </button>
  </div>
);

export default SearchBar;
