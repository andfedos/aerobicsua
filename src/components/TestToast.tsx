"use client"
import { toast } from "sonner"

export default function TestToast() {
  return (
    <button
      className="px-4 py-2 rounded bg-primary text-primary-foreground"
      onClick={() => toast.success("Працює!")}
    >
      Ping
    </button>
  )
}

