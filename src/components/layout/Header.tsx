"use client"
import Link from "next/link"
import { Home, Info, Trophy, Building, Image as ImageIcon, FileText, Users, Phone, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navigation = [
  { href: "/", label: "Головна", icon: Home },
  { href: "/about", label: "Про нас", icon: Info },
  { href: "/competitions", label: "Змагання", icon: Trophy },
  { href: "/clubs", label: "Клуби", icon: Building },
  { href: "/gallery", label: "Галерея", icon: ImageIcon },
  { href: "/news", label: "Новини", icon: FileText },
  { href: "/membership", label: "Членство", icon: Users },
  { href: "/contacts", label: "Контакти", icon: Phone },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container-custom h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">FUSAF</Link>

        <nav className="hidden md:flex gap-6">
          {navigation.map((i) => (
            <Link key={i.href} href={i.href} className="text-sm text-foreground/80 hover:text-primary flex items-center gap-1">
              <i.icon className="h-4 w-4" />
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex gap-3">
          <Button variant="ghost" asChild><Link href="/auth/login">Вхід</Link></Button>
          <Button asChild><Link href="/auth/register">Реєстрація</Link></Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="container-custom py-4 flex flex-col gap-2">
            {navigation.map((i) => (
              <Link key={i.href} href={i.href} className="px-2 py-2 rounded hover:bg-secondary flex items-center gap-2" onClick={() => setOpen(false)}>
                <i.icon className="h-4 w-4" />
                {i.label}
              </Link>
            ))}
            <div className="pt-2 border-t mt-2 flex gap-2">
              <Button variant="ghost" asChild className="flex-1"><Link href="/auth/login">Вхід</Link></Button>
              <Button asChild className="flex-1"><Link href="/auth/register">Реєстрація</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
