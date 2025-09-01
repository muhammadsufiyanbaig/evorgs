"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal, ArrowUpDown, Trash2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { Farmhouse } from "@/utils/interfaces";

type SortDirection = 'asc' | 'desc' | null;
type SortField = keyof Farmhouse | null;

interface FarmhousesTableProps {
    data: Farmhouse[];
    onDelete?: (farmhouseId: string) => void;
}

export function FarmhousesTable({ data, onDelete }: FarmhousesTableProps) {
    const [sortField, setSortField] = React.useState<SortField>(null);
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
    const [farmhouseData, setFarmhouseData] = React.useState<Farmhouse[]>(data);

    React.useEffect(() => {
        setFarmhouseData(data);
    }, [data]);

    const handleSort = (field: keyof Farmhouse) => {
        let direction: SortDirection = 'asc';
        
        if (sortField === field && sortDirection === 'asc') {
            direction = 'desc';
        } else if (sortField === field && sortDirection === 'desc') {
            direction = null;
        }
        
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedData = React.useMemo(() => {
        if (!sortField || !sortDirection) {
            return farmhouseData;
        }

        return [...farmhouseData].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [farmhouseData, sortField, sortDirection]);

    const handleAvailabilityToggle = (farmhouseId: string, checked: boolean) => {
        setFarmhouseData(prev => 
            prev.map(farmhouse => 
                farmhouse.id === farmhouseId 
                    ? { ...farmhouse, isAvailable: checked }
                    : farmhouse
            )
        );
        console.log(`Toggled availability for farmhouse ${farmhouseId} to ${checked}`);
    };

    const handleDelete = (farmhouseId: string) => {
        if (onDelete) {
            onDelete(farmhouseId);
        } else {
            // Default delete behavior if no onDelete prop is provided
            setFarmhouseData(prev => prev.filter(farmhouse => farmhouse.id !== farmhouseId));
            console.log(`Deleted farmhouse ${farmhouseId}`);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <div className="rounded-md border border-orange-200 bg-white shadow-sm">
            <Table>
                <TableHeader className="bg-orange-50">
                    <TableRow className="border-orange-200 hover:bg-orange-100">
                        <TableHead>
                            <Button
                                variant="ghost"
                                onClick={() => handleSort('name')}
                                className="flex items-center gap-2 text-orange-900 hover:bg-orange-200 hover:text-orange-900"
                            >
                                Name
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="text-orange-900">Location</TableHead>
                        <TableHead className="text-right text-orange-900">Price/Night</TableHead>
                        <TableHead className="text-center text-orange-900">Rating</TableHead>
                        <TableHead className="text-center text-orange-900">Availability</TableHead>
                        <TableHead className="text-right text-orange-900">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.length > 0 ? (
                        sortedData.map((farmhouse) => (
                            <TableRow 
                                key={farmhouse.id}
                                className="border-orange-100 hover:bg-orange-25"
                            >
                                <TableCell>
                                    <div className="font-medium text-orange-900">{farmhouse.name}</div>
                                </TableCell>
                                <TableCell className="text-orange-800">{farmhouse.location}</TableCell>
                                <TableCell className="text-right font-medium text-orange-900">
                                    {formatCurrency(farmhouse.perNightPrice)}
                                </TableCell>
                                <TableCell className="text-center text-orange-800">{farmhouse.rating}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center items-center space-x-2">
                                        <Switch
                                            checked={farmhouse.isAvailable}
                                            onCheckedChange={(checked) => 
                                                handleAvailabilityToggle(farmhouse.id, checked)
                                            }
                                            aria-label="Availability"
                                            className="data-[state=checked]:bg-orange-500"
                                        />
                                        <Badge 
                                            variant={farmhouse.isAvailable ? "default" : "outline"}
                                            className={farmhouse.isAvailable 
                                                ? "bg-orange-500 text-white hover:bg-orange-600" 
                                                : "border-orange-300 text-orange-700"
                                            }
                                        >
                                            {farmhouse.isAvailable ? "Available" : "Unavailable"}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-100 hover:text-orange-900"
                                            >
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-white border-orange-200">
                                            <DropdownMenuLabel className="text-orange-900">Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link 
                                                    href={`/admin/farmhouse/${farmhouse.id}`}
                                                    className="text-orange-700 hover:bg-orange-50 hover:text-orange-900"
                                                >
                                                    View Details
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link 
                                                    href={`/admin/farmhouse/${farmhouse.id}/edit`}
                                                    className="text-orange-700 hover:bg-orange-50 hover:text-orange-900"
                                                >
                                                    Edit Farmhouse
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-orange-200" />
                                            <DropdownMenuItem 
                                                onClick={() => handleDelete(farmhouse.id)}
                                                className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete Farmhouse
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-orange-700">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
