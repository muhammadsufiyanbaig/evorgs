import { Button } from "@/components/ui/button"
import { Dialog, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Toast } from "@/components/ui/toast"
import { Plus } from "lucide-react"
import { useState } from "react"

interface Client {
  id: string
  name: string | null
  email: string | null
  mobileNumber: string | null
  reviews: number
  sales: number
  createdAt: Date
}

interface AddClientDialogProps {
  onClientAdded: (client: Client) => void
}

export function AddClientDialog({ onClientAdded }: AddClientDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!open) return
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      mobileNumber: (formData.get("mobileNumber") as string) || null,
      reviews: 0,
      sales: 0,
      createdAt: new Date(),
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onClientAdded(newClient)
    setIsLoading(false)
    setOpen(false)
    Toast({ title: "Client added successfully", variant: "default" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     
      <DialogHeader>Add Client</DialogHeader>
      <DialogFooter>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input type="tel" id="mobileNumber" name="mobileNumber" />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-orange-600 hover:bg-orange-500 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogFooter>
    </Dialog>
  )
}

