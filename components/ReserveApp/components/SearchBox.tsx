import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { Project } from '../types/types';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export function SearchBox({ projects, onProjectSelect }: SearchBoxProps) {
  const { t } = useTranslation('reserve');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter projects based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProjects([]);
      setIsOpen(false);
      return;
    }

    const filtered = projects.filter(project => 
      project.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('Search term:', searchTerm, 'Filtered projects:', filtered.length, 'Is open:', filtered.length > 0);
    setFilteredProjects(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [searchTerm, projects]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredProjects.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < filteredProjects.length) {
            handleProjectSelect(filteredProjects[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredProjects, selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProjectSelect = (project: Project) => {
    onProjectSelect(project);
    setSearchTerm('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };



  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (filteredProjects.length > 0) setIsOpen(true);
          }}
          placeholder={t('searchProjects')}
          className="w-full h-10 md:h-12 pl-10 pr-10 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-full text-base text-gray-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && filteredProjects.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[40]"
        >
          {filteredProjects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                index === selectedIndex ? 'bg-green-50 border-l-4 border-l-green-500' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {t(`projects.${project.id}`)}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{project.country}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    €{project.pricePerM2}/m²
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
