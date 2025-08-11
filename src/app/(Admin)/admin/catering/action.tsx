"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  createStandardPackage,
  listCustomPackages,
  listStandardPackages,
  removeCustomPackage,
  removeStandardPackage,
  updateStandardPackage,
  getStandardPackageById,
  type CreatePackageInput,
  type UpdatePackageInput,
} from "@/utils/data"
import type { AdminCustomPackageFilters } from "@/utils/interfaces"

// List helpers to reflect GraphQL queries

export async function AdminListCustomPackages(filters?: AdminCustomPackageFilters) {
  return listCustomPackages(filters)
}

export async function GetAllCateringPackages(page?: number, pageSize?: number) {
  return listStandardPackages(page, pageSize)
}

// Mutations

export async function DeleteCustomPackage(formData: FormData) {
  const id = String(formData.get("id") || "")
  if (!id) return
  await removeCustomPackage(id)
  revalidatePath("/admin/catering/custom")
}

export async function DeleteStandardPackage(formData: FormData) {
  const id = String(formData.get("id") || "")
  if (!id) return
  await removeStandardPackage(id)
  revalidatePath("/admin/catering/standard")
}

export async function CreateStandardPackageAction(formData: FormData) {
  const input: CreatePackageInput = {
    vendorId: String(formData.get("vendorId") || ""),
    packageName: String(formData.get("packageName") || ""),
    serviceArea: String(formData.get("serviceArea") || ""),
    description: String(formData.get("description") || ""),
    imageUrl: String(formData.get("imageUrl") || "/placeholder.svg?height=240&width=480"),
    price: Number(formData.get("price") || 0),
    minGuests: Number(formData.get("minGuests") || 0),
    maxGuests: Number(formData.get("maxGuests") || 0),
    menuItems: String(formData.get("menuItems") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    dietaryOptions: String(formData.get("dietaryOptions") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    amenities: String(formData.get("amenities") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    isAvailable: String(formData.get("isAvailable") || "false") === "true",
    reviewCount: Number(formData.get("reviewCount") || 0),
  }

  // Basic validation
  if (!input.packageName || !input.vendorId) {
    return { ok: false, error: "Vendor ID and Package Name are required." }
  }
  const created = await createStandardPackage(input)
  revalidatePath("/admin/catering/standard")
  redirect(`/admin/catering/standard/${created.id}`)
}

export async function UpdateStandardPackageAction(id: string, formData: FormData) {
  const updates: UpdatePackageInput = {
    vendorId: String(formData.get("vendorId") || ""),
    packageName: String(formData.get("packageName") || ""),
    serviceArea: String(formData.get("serviceArea") || ""),
    description: String(formData.get("description") || ""),
    imageUrl: String(formData.get("imageUrl") || "/placeholder.svg?height=240&width=480"),
    price: Number(formData.get("price") || 0),
    minGuests: Number(formData.get("minGuests") || 0),
    maxGuests: Number(formData.get("maxGuests") || 0),
    menuItems: String(formData.get("menuItems") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    dietaryOptions: String(formData.get("dietaryOptions") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    amenities: String(formData.get("amenities") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    isAvailable: String(formData.get("isAvailable") || "false") === "true",
    reviewCount: Number(formData.get("reviewCount") || 0),
  }

  const updated = await updateStandardPackage(id, updates)
  if (!updated) {
    return { ok: false, error: "Package not found." }
  }
  revalidatePath(`/admin/catering/standard/${id}`)
  redirect(`/admin/catering/standard/${id}`)
}

export async function GetStandardPackageById(id: string) {
  return getStandardPackageById(id)
}
