import SiteLayout from "@/components/layout/SiteLayout"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export default function HomePage() {
  return (
    <SiteLayout>
      <section className="container-custom py-16">
        <h1 className="text-h1 text-gradient mb-3">FUSAF Design System</h1>
        <p className="text-body text-muted-foreground max-w-2xl">
          Каркас сайту федерації: Next.js 15, Tailwind, shadcn/ui, Lucide.
        </p>
        <Button className="mt-6"><Trophy className="mr-2 h-4 w-4" /> Переглянути змагання</Button>
      </section>
    </SiteLayout>
  )
}
