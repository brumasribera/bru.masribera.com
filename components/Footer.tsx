import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            © 2024 Bru Mas Ribera. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>in Switzerland</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
