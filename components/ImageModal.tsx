import { useEffect } from 'react'
import { X, ArrowLeft } from 'lucide-react'

interface ImageModalProps {
  selectedImage: string | null
  setSelectedImage: (image: string | null) => void
  imagePaths: string[]
  altText?: string
}

export function ImageModal({ selectedImage, setSelectedImage, imagePaths, altText = "Project Image" }: ImageModalProps) {
  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      
      // Prevent default behavior for arrow keys when modal is open
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
      }
      
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = imagePaths.indexOf(selectedImage)
        const prevIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex - 1
        setSelectedImage(imagePaths[prevIndex])
      } else if (e.key === 'ArrowRight') {
        const currentIndex = imagePaths.indexOf(selectedImage)
        const nextIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex + 1
        setSelectedImage(imagePaths[nextIndex])
      }
    }
    
    document.addEventListener('keydown', handleKeyDown, true) // Use capture phase
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [selectedImage, imagePaths, setSelectedImage])
  
  // Navigation functions for modal
  const goToPreviousImage = () => {
    if (!selectedImage) return
    const currentIndex = imagePaths.indexOf(selectedImage)
    const prevIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex - 1
    setSelectedImage(imagePaths[prevIndex])
  }
  
  const goToNextImage = () => {
    if (!selectedImage) return
    const currentIndex = imagePaths.indexOf(selectedImage)
    const nextIndex = currentIndex === 0 ? imagePaths.length - 1 : currentIndex + 1
    setSelectedImage(imagePaths[nextIndex])
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the image or buttons
    if (e.target === e.currentTarget) {
      setSelectedImage(null)
    }
  }

  if (!selectedImage) return null

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-7xl max-h-full overflow-auto">
        {/* Close button - always visible */}
        <button
          onClick={() => setSelectedImage(null)}
          className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Navigation arrows */}
        <button
          onClick={goToPreviousImage}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={goToNextImage}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
        >
          <ArrowLeft className="h-6 w-6 rotate-180" />
        </button>
        
        <img 
          src={selectedImage} 
          alt={altText}
          className="max-w-full object-contain rounded-lg"
        />
      </div>
    </div>
  )
}
