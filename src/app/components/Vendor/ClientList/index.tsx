"use client"

import * as React from "react"
import { ArrowUpDown, ChevronDown, Plus, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Client } from "@/utils/interfaces"
import { clients } from "@/utils/data"
// New dialog imports:
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

export default function ClientsList() {
  const [sortColumn, setSortColumn] = React.useState<keyof Client>("name")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [visibleColumns, setVisibleColumns] = React.useState<Set<keyof Client>>(
    new Set(["name", "mobileNumber", "reviews", "sales", "createdAt"]),
  )
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  // New state for the add client form
  const [newClient, setNewClient] = React.useState({ name: "", email: "", mobileNumber: "" })

  // Handler to process add client form submission
  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("New client added:", newClient)
    // Reset the form (optionally close the dialog through additional state if needed)
    setNewClient({ name: "", email: "", mobileNumber: "" })
  }

  const sortedAndFilteredClients = React.useMemo(() => {
    return clients
      .filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (client.mobileNumber?.includes(searchTerm) ?? false),
      )
      .sort((a, b) => {
        if (a[sortColumn] == null || b[sortColumn] == null) return 0
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
      })
  }, [searchTerm, sortColumn, sortDirection])

  const paginatedClients = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedAndFilteredClients.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedAndFilteredClients, currentPage])

  const toggleSort = (column: keyof Client) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleColumnVisibility = (column: keyof Client) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(column)) {
        newSet.delete(column)
      } else {
        newSet.add(column)
      }
      return newSet
    })
  }

  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const toggleAllRowsSelection = () => {
    if (selectedRows.size === paginatedClients.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedClients.map((_, index) => index)))
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-orange-600">Clients list</h2>
          <p className="text-muted-foreground">
            View, add, edit and delete your client&apos;s details.{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Modified Add Button wrapped with Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Add
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Client</DialogTitle>
                <DialogDescription>Fill the form to add a new client manually.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    value={newClient.name}
                    onChange={(e) =>
                      setNewClient((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Mobile Number"
                    value={newClient.mobileNumber}
                    onChange={(e) =>
                      setNewClient((prev) => ({ ...prev, mobileNumber: e.target.value }))
                    }
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white" type="submit">Submit</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search by name, email or mobile number"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm focus-visible:ring-orange-500"
        />
        <Select
          value={`${sortColumn}-${sortDirection}`}
          onValueChange={(value) => {
            const [column, direction] = value.split("-") as [keyof Client, "asc" | "desc"]
            setSortColumn(column)
            setSortDirection(direction)
          }}
        >
          <SelectTrigger className="w-[180px] shrink-0 focus:ring-orange-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">First name (A-Z)</SelectItem>
            <SelectItem value="name-desc">First name (Z-A)</SelectItem>
            <SelectItem value="createdAt-asc">Created (oldest first)</SelectItem>
            <SelectItem value="createdAt-desc">Created (newest first)</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto border-orange-500 text-orange-500 hover:bg-orange-50">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border-orange-200">
            {(Object.keys(clients[0]) as Array<keyof Client>).map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                className="capitalize"
                checked={visibleColumns.has(column)}
                onCheckedChange={() => toggleColumnVisibility(column)}
              >
                {column}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader className="bg-orange-500">
            <TableRow className="hover:bg-orange-500">
              <TableHead className="text-white">
                <Checkbox
                  className="border-orange-300 text-white"
                  checked={selectedRows.size === paginatedClients.length}
                  onCheckedChange={toggleAllRowsSelection}
                  aria-label="Select all"
                />
              </TableHead>
              {Array.from(visibleColumns).map((column) => (
                <TableHead className="text-white" key={column}>
                  <div className="flex items-center">
                   <p> {column} </p>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClients.map((client, index) => (
              <TableRow
                key={client.id}
                data-state={selectedRows.has(index) && "selected"}
                className=""
              >
                <TableCell>
                  <Checkbox
                    className="border-orange-300 text-orange-500"
                    checked={selectedRows.has(index)}
                    onCheckedChange={() => toggleRowSelection(index)}
                    aria-label="Select row"
                  />
                </TableCell>
                {Array.from(visibleColumns).map((column) => (
                  <TableCell key={column}>
                    {column === "name" ? (
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {client.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">{client.email}</div>
                        </div>
                      </div>
                    ) : column === "sales" ? (
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(client.sales)
                    ) : column === "createdAt" ? (
                      new Date(client.createdAt).toLocaleDateString()
                    ) : (
                      client[column] || "-"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-orange-600">
          Page {currentPage} of {Math.ceil(sortedAndFilteredClients.length / itemsPerPage)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(Math.ceil(sortedAndFilteredClients.length / itemsPerPage), prev + 1))
          }
          disabled={currentPage === Math.ceil(sortedAndFilteredClients.length / itemsPerPage)}
          className="border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

