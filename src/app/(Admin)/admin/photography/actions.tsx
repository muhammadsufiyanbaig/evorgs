"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  deleteCustomOrder as deleteCustomOrderData,
  deletePackage as deletePackageData,
  createPackage as createPackageData,
  updatePackage as updatePackageData,
} from "@/utils/data"

export async function deleteCustomOrderAction(formData: FormData) {
  const id = String(formData.get("id") || "")
  if (id) {
    deleteCustomOrderData(id)
  }
  revalidatePath("/admin/photography/custom")
}

export async function deletePackageAction(formData: FormData) {
  const id = String(formData.get("id") || "")
  if (id) {
    deletePackageData(id)
  }
  revalidatePath("/admin/photography/standard")
}

export async function createPackageAction(formData: FormData) {
  const packageName = String(formData.get("packageName") || "")
  const vendorId = String(formData.get("vendorId") || "")
  const price = Number(formData.get("price") || 0)
  const duration = Number(formData.get("duration") || 0)
  const isAvailable = formData.get("isAvailable") === "on"

  const created = createPackageData({ packageName, vendorId, price, duration, isAvailable })
  revalidatePath("/admin/photography/standard")
  redirect(`/admin/photography/standard/${created.id}`)
}

export async function updatePackageAction(formData: FormData) {
  const id = String(formData.get("id") || "")
  const packageName = String(formData.get("packageName") || "")
  const vendorId = String(formData.get("vendorId") || "")
  const price = Number(formData.get("price") || 0)
  const duration = Number(formData.get("duration") || 0)
  const isAvailable = formData.get("isAvailable") === "on"

  if (id) {
    updatePackageData(id, { packageName, vendorId, price, duration, isAvailable })
  }
  revalidatePath(`/admin/photography/standard/${id}`)
  redirect(`/admin/photography/standard/${id}`)
}
