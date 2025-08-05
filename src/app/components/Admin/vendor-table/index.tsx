"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { type Vendor, graphqlClient } from "@/utils/data"
import { useToast } from "@/hooks/use-toast"

interface VendorTableProps {
    vendors: Vendor[]
    onVendorStatusChange: (id: string, status: boolean) => void
    onDeleteVendor: (id: string) => void
}

export function VendorTable({ vendors, onVendorStatusChange, onDeleteVendor }: VendorTableProps) {
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleStatusChange = async (id: string, checked: boolean) => {
        onVendorStatusChange(id, checked)
        toast({
            title: "Vendor Status Updated",
            description: `Vendor ${id} status changed to ${checked ? "Verified" : "Unverified"}.`,
        })
    }

    const handleDelete = async (id: string) => {
        setIsDeleting(id)
        try {
            const success = await graphqlClient.deleteVendor(id)
            if (success) {
                onDeleteVendor(id)
                toast({
                    title: "Vendor Deleted",
                    description: `Vendor ${id} has been successfully deleted.`,
                })
            } else {
                toast({
                    title: "Deletion Failed",
                    description: `Could not delete vendor ${id}.`,
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: `An error occurred while deleting vendor ${id}.`,
                variant: "destructive",
            })
        } finally {
            setIsDeleting(null)
        }
    }

    return (
        <div className="border border-orange-200 shadow-sm rounded-lg overflow-x-auto bg-white">
            <Table>
                <TableHeader>
                    <TableRow className="bg-orange-50 border-orange-200">
                        <TableHead className="w-[80px] text-orange-900 font-semibold">Image</TableHead>
                        <TableHead className="text-orange-900 font-semibold">Name</TableHead>
                        <TableHead className="text-orange-900 font-semibold">Email</TableHead>
                        <TableHead className="hidden md:table-cell text-orange-900 font-semibold">Phone</TableHead>
                        <TableHead className="hidden lg:table-cell text-orange-900 font-semibold">Type</TableHead>
                        <TableHead className="text-orange-900 font-semibold">Status</TableHead>
                        <TableHead className="text-right text-orange-900 font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vendors.map((vendor, index) => (
                        <TableRow 
                            key={vendor.id} 
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-orange-25'} hover:bg-orange-50 border-orange-100 transition-colors`}
                        >
                            <TableCell>
                                <Image
                                    src={vendor.profileImage || "/placeholder.svg?height=64&width=64&query=vendor profile"}
                                    width={64}
                                    height={64}
                                    alt={`${vendor.vendorName} profile`}
                                    className="aspect-square rounded-md object-cover border-2 border-orange-200"
                                />
                            </TableCell>
                            <TableCell className="font-medium text-orange-900">{vendor.vendorName}</TableCell>
                            <TableCell className="text-orange-700">{vendor.vendorEmail}</TableCell>
                            <TableCell className="hidden md:table-cell text-orange-700">{vendor.vendorPhone}</TableCell>
                            <TableCell className="hidden lg:table-cell text-orange-700">{vendor.vendorType}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`status-switch-${vendor.id}`}
                                        checked={vendor.vendorStatus}
                                        onCheckedChange={(checked) => handleStatusChange(vendor.id, checked)}
                                        aria-label={`Toggle verification status for ${vendor.vendorName}`}
                                        className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-orange-200"
                                    />
                                    <Label 
                                        htmlFor={`status-switch-${vendor.id}`}
                                        className={`font-medium ${vendor.vendorStatus ? 'text-orange-600' : 'text-orange-400'}`}
                                    >
                                        {vendor.vendorStatus ? "Verified" : "Unverified"}
                                    </Label>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button 
                                            aria-haspopup="true" 
                                            size="icon" 
                                            variant="ghost"
                                            className="hover:bg-orange-100 text-orange-600 hover:text-orange-800"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border-orange-200">
                                        <DropdownMenuLabel className="text-orange-900">Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link 
                                                href={`/admin/vendors/${vendor.id}`} 
                                                className="flex items-center text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                                            >
                                                <Eye className="mr-2 h-4 w-4" /> View
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link 
                                                href={`/admin/vendors/${vendor.id}/edit`} 
                                                className="flex items-center text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                                            >
                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-orange-200" />
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(vendor.id)}
                                            disabled={isDeleting === vendor.id}
                                            className="text-red-600 hover:bg-red-50 hover:text-red-800 focus:text-red-800"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> {isDeleting === vendor.id ? "Deleting..." : "Delete"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
