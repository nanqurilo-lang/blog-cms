"use client"

import { Eye, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopActions() {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-3 bg-background border-b">
      <Button variant="outline">
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </Button>

      <Button variant="outline">
        <Save className="w-4 h-4 mr-2" />
        Save as Draft
      </Button>

      <Button>Publish</Button>
    </div>
  )
}
