import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container-custom py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="text-xl font-bold mb-2">FUSAF</div>
            <p className="text-gray-300 max-w-md">
              Федерація української спортивної аеробіки — розвиток і популяризація спортивної аеробіки в Україні.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Швидкі посилання</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white">Про федерацію</Link></li>
              <li><Link href="/competitions" className="hover:text-white">Змагання</Link></li>
              <li><Link href="/clubs" className="hover:text-white">Клуби</Link></li>
              <li><Link href="/news" className="hover:text-white">Новини</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Правове</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/privacy" className="hover:text-white">Політика конфіденційності</Link></li>
              <li><Link href="/terms" className="hover:text-white">Умови використання</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-gray-400 flex items-center justify-between">
          <span>© {year} FUSAF. Всі права захищені.</span>
          <span>Зроблено на Next.js + Tailwind</span>
        </div>
      </div>
    </footer>
  )
}
