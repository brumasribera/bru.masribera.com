import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, altText }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[40] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-[80%] max-h-[80%] p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white hover:bg-gray-100 text-gray-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Image Container */}
        <div className="relative">
          <img
            src={imageSrc}
            alt={altText}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
            }}
          />
        </div>
        
        {/* Click outside to close */}
        <div 
          className="absolute inset-0 -z-10" 
          onClick={onClose}
        />
      </div>
    </div>
  );
}
