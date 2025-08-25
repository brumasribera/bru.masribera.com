import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Filter, Search, MapPin, Leaf, TrendingUp, Users, ChevronDown } from 'lucide-react'
import { PROJECTS } from '../utils/data'
import { Project } from '../types/types'

interface ProjectsListPageProps {
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  filters?: {
    searchTerm: string;
    selectedCountry: string;
    selectedImpact: string;
    showFilters: boolean;
  };
  onFiltersChange?: (filters: {
    searchTerm: string;
    selectedCountry: string;
    selectedImpact: string;
    showFilters: boolean;
  }) => void;
  loadedProjects?: Project[];
  onLoadMoreProjects?: (newProjects: Project[], page: number, hasMore: boolean) => void;
  currentPage?: number;
  hasMore?: boolean;
}

// Custom Dropdown Component
interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  label: string;
}

function CustomDropdown({ value, onChange, options, placeholder, label }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(
    options.find(opt => opt.value === value) || null
  );

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm(''); // Clear search when option is selected
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm(''); // Clear search when opening
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.custom-dropdown')) {
        setIsOpen(false);
        setSearchTerm(''); // Clear search when closing
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-dropdown relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <div className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all duration-200 hover:border-green-400 flex items-center justify-between">
          {isOpen ? (
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-base"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <span className={`flex-1 cursor-pointer ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`} onClick={handleToggle}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
          <button
            type="button"
            onClick={handleToggle}
            className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="dropdown-menu w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto">
            {/* Options List */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                                 <button
                   key={option.value}
                   onClick={() => handleSelect(option)}
                   className={`w-full px-3 py-2 text-left hover:bg-green-50 transition-colors duration-150 ${
                     option.value === value 
                       ? 'bg-blue-100 text-blue-900 font-medium border-l-4 border-blue-400' 
                       : 'text-gray-700 hover:text-gray-900'
                   } ${option.value === '' ? 'border-b border-gray-200' : ''}`}
                   style={{
                     backgroundColor: option.value === value ? '#dbeafe' : undefined,
                     color: option.value === value ? '#1e3a8a' : undefined
                   }}
                 >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                No countries found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsListPage({ onBack, onSelectProject, filters, onFiltersChange, loadedProjects, onLoadMoreProjects, currentPage: externalCurrentPage, hasMore: externalHasMore }: ProjectsListPageProps) {
  const { t } = useTranslation('reserve');
  
  // Add custom CSS animation for progress bars
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progressFill {
        from { width: 0%; }
        to { width: var(--progress-width); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Use passed loaded projects or fall back to local state
  const projectsPerPage = 10; // Changed from 5 to 10
  
  // Fast initial load - show first 10 projects fast
  const initialLoadCount = 10; // Changed from 3 to 10
  
  // Use passed loaded projects or fall back to local state
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(externalCurrentPage || 1);
  const [hasMore, setHasMore] = useState(externalHasMore !== undefined ? externalHasMore : true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Use passed filters or default values
  const [searchTerm, setSearchTerm] = useState(filters?.searchTerm || '');
  const [selectedCountry, setSelectedCountry] = useState(filters?.selectedCountry || '');
  const [selectedImpact, setSelectedImpact] = useState(filters?.selectedImpact || '');
  const [showFilters, setShowFilters] = useState(filters?.showFilters || false);
  
  // Sync local state with passed filters
  useEffect(() => {
    if (filters) {
      setSearchTerm(filters.searchTerm);
      setSelectedCountry(filters.selectedCountry);
      setSelectedImpact(filters.selectedImpact);
      setShowFilters(filters.showFilters);
    }
  }, [filters]);

  // Call onFiltersChange when local filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        searchTerm,
        selectedCountry,
        selectedImpact,
        showFilters
      });
    }
  }, [searchTerm, selectedCountry, selectedImpact, showFilters, onFiltersChange]);

  // Reset pagination when filters are restored from props
  useEffect(() => {
    if (filters && (filters.searchTerm !== '' || filters.selectedCountry !== '' || filters.selectedImpact !== '')) {
      setVisibleProjects([]);
      setCurrentPage(1);
      setHasMore(true);
      setIsInitialLoad(true);
    }
  }, [filters]);

  // Get unique countries for filter
  const countries = Array.from(new Set(PROJECTS.map(p => p.country))).sort();
  
  // Impact options for filter
  const impactOptions = [
    { key: 'biodiversity', label: 'Biodiversity', icon: Leaf },
    { key: 'carbon', label: 'Carbon', icon: TrendingUp },
    { key: 'community', label: 'Community', icon: Users }
  ];

  // Prepare country options for dropdown
  const countryOptions = [
    { value: '', label: 'All Countries' },
    ...countries.map(country => ({ value: country, label: country }))
  ];

  // Filter projects based on search and filters
  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t(`projects.${project.id}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Fix country filtering: empty string means "All Countries", so show all
    const matchesCountry = selectedCountry === '' || project.country === selectedCountry;
    
    const matchesImpact = !selectedImpact || project.impact[selectedImpact as keyof typeof project.impact] >= 80;
    
    return matchesSearch && matchesCountry && matchesImpact;
  });

  // Load initial projects
  useEffect(() => {
    loadInitialProjects();
  }, [filteredProjects, initialLoadCount]);

  // Initialize filters and load projects when component mounts
  useEffect(() => {
    // If we have filters from props, make sure to load the filtered results
    if (filters && (filters.searchTerm || filters.selectedCountry || filters.selectedImpact)) {
      setVisibleProjects([]);
      setCurrentPage(1);
      setHasMore(true);
      // The loadMoreProjects will be triggered by the filteredProjects dependency
    }
  }, []);

  // Fast initial load function
  const loadInitialProjects = useCallback(() => {
    if (filteredProjects.length === 0) return;
    
    // Show first few projects immediately
    const initialProjects = filteredProjects.slice(0, initialLoadCount);
    setVisibleProjects(initialProjects);
    
    // If we have more projects, start background loading
    if (filteredProjects.length > initialLoadCount) {
      setCurrentPage(2); // Start from page 2 since we already have page 1
      setHasMore(true);
      
      // Load the rest in the background after a short delay
      setTimeout(() => {
        // Load next batch directly
        const startIndex = initialLoadCount;
        const endIndex = Math.min(startIndex + projectsPerPage, filteredProjects.length);
        const nextProjects = filteredProjects.slice(startIndex, endIndex);
        
        if (nextProjects.length > 0) {
          setVisibleProjects(prev => [...prev, ...nextProjects]);
          setCurrentPage(3); // Move to next page
        }
        
        // Continue with normal pagination if there are more projects
        if (endIndex < filteredProjects.length) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }, 50); // Reduced delay for faster background loading
    } else {
      setHasMore(false);
    }
    
    setIsInitialLoad(false);
  }, [filteredProjects, initialLoadCount, projectsPerPage]);

  const loadMoreProjects = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const startIndex = (currentPage - 1) * projectsPerPage;
      const endIndex = startIndex + projectsPerPage;
      const newProjects = filteredProjects.slice(startIndex, endIndex);
      
      if (newProjects.length === 0) {
        setHasMore(false);
      } else {
        setVisibleProjects(prev => [...prev, ...newProjects]);
        setCurrentPage(prev => prev + 1);
      }
      
      setIsLoading(false);
    }, 300);
  }, [currentPage, isLoading, hasMore, filteredProjects]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleProjects([]);
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [searchTerm, selectedCountry, selectedImpact]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProjects();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loadMoreProjects, hasMore, isLoading]);

  const handleProjectClick = (project: Project) => {
    onSelectProject(project);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedImpact('');
    // Note: onFiltersChange will be called by the useEffect above
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  // Add shimmer animation CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
      
      /* Ensure project cards are fully clickable */
      .project-card {
        position: relative;
        cursor: pointer !important;
        transition: all 0.2s ease-in-out;
      }
      
      .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      
      .project-card:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.05), transparent);
        animation: pulse 2s infinite;
        pointer-events: none;
        z-index: 1;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.6;
        }
      }
      
      .project-card * {
        cursor: pointer !important;
      }
      
      /* Ensure all text and icons show pointer cursor */
      .project-card h3,
      .project-card span,
      .project-card div,
      .project-card svg {
        cursor: pointer !important;
      }
      
      /* Focus state styling */
      .project-card:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.5);
      }
      
      .project-card:focus-visible {
        outline: 2px solid #22c55e;
        outline-offset: 2px;
      }
      
      /* Active state for click feedback */
      .project-card:active {
        transform: translateY(0px) scale(0.98);
        transition: all 0.1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 overflow-y-auto relative" style={{ zIndex: 1 }}>
             {/* Header */}
       <div className="bg-gradient-to-r from-green-600 to-emerald-600 sticky top-0 z-50">
         <div className="p-4">
           <div className="flex items-center justify-between mb-4">
             <button
               onClick={onBack}
               className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
             >
               <ArrowLeft className="h-5 w-5" />
             </button>
             <div className="flex flex-col items-center">
               <h1 className="text-xl font-bold text-white">Explore Projects</h1>
             </div>
             <button
               onClick={() => setShowFilters(!showFilters)}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-110 shadow-lg hover:shadow-xl ${
                 showFilters ? 'bg-green-600 text-white rotate-180' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
               }`}
             >
               <Filter className="h-5 w-5 transition-transform duration-500 ease-in-out" />
             </button>
           </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchProjects')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

                               {/* Filters */}
          <div className={`transition-all duration-500 ease-in-out ${
            showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200 transform transition-all duration-500 ease-in-out ${
              showFilters ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
            }" style={{ overflow: 'visible', position: 'relative', zIndex: 5 }}>
                              {/* Country Filter */}
               <div className="transform transition-all duration-300 delay-100 ${
                 showFilters ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
               }" style={{ position: 'relative', zIndex: 11 }}>
                 <CustomDropdown
                   value={selectedCountry}
                   onChange={setSelectedCountry}
                   options={countryOptions}
                   placeholder="All Countries"
                   label="Country"
                 />
               </div>

              {/* Impact Filter */}
              <div className="transform transition-all duration-300 delay-200 ${
                showFilters ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }">
                <label className="block text-sm font-medium text-gray-700 mb-2">High Impact Areas</label>
                <div className="flex flex-wrap gap-2">
                  {impactOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    const isSelected = selectedImpact === option.key;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setSelectedImpact(isSelected ? '' : option.key)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          isSelected 
                            ? 'bg-green-600 text-white shadow-lg' 
                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-green-300'
                        }`}
                        style={{
                          transitionDelay: `${300 + (index * 50)}ms`
                        }}
                      >
                        <IconComponent className="h-4 w-4" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="transform transition-all duration-300 delay-300 ${
                showFilters ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all duration-200 font-medium hover:bg-red-100 hover:text-red-700 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Clear All Filters
                </button>
              </div>
             </div>
           </div>


        </div>
      </div>

             {/* Projects Grid */}
       <div className="p-4">
         {visibleProjects.length === 0 ? (
           // Loading Skeleton Cards with Moving Gradients
           <div className="space-y-4 mb-8">
             {[...Array(10)].map((_, index) => ( // Changed from 5 to 10
               <div key={index} className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden w-full">
                 <div className="flex h-32">
                   {/* Image Skeleton */}
                   <div className="relative w-24 flex-shrink-0">
                     <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                     </div>
                   </div>
                   
                   {/* Content Skeleton */}
                   <div className="flex-1 p-3 flex flex-col justify-between">
                     <div>
                       {/* Title Skeleton */}
                       <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2 animate-pulse">
                         <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                       </div>
                       
                       {/* Location Skeleton */}
                       <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2 w-20 animate-pulse">
                         <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                       </div>
                       
                       {/* Impact Scores Skeleton */}
                       <div className="flex gap-3 mb-2">
                         {[...Array(3)].map((_, i) => (
                           <div key={i} className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-12 animate-pulse">
                             <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                           </div>
                         ))}
                       </div>
                       
                       {/* Area Skeleton */}
                       <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2 w-32 animate-pulse">
                         <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                       </div>
                       
                       {/* Progress Bar Skeleton */}
                       <div className="mb-2">
                         <div className="flex items-center justify-between mb-1">
                           <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-pulse">
                             <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                           </div>
                           <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-8 animate-pulse">
                             <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                           </div>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-2">
                           <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 h-2 rounded-full animate-pulse">
                             <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     {/* Button Skeleton */}
                     <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse">
                       <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         ) : (
           <div className="space-y-4 mb-8">
             {visibleProjects.map((project) => (
               <div
                 key={project.id}
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   handleProjectClick(project);
                 }}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     e.preventDefault();
                     handleProjectClick(project);
                   }
                 }}
                 tabIndex={0}
                 role="button"
                 aria-label={`View details for ${t(`projects.${project.id}`)} project`}
                 className="project-card bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 w-full group relative focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                 style={{ cursor: 'pointer' }}
               >
                 {/* Hover overlay for visual feedback */}
                 <div className="absolute inset-0 bg-gradient-to-r from-green-50/0 via-green-50/20 to-green-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10" />
                 
                 <div className="flex h-32 cursor-pointer relative z-20">
                   {/* Project Image - Full height left side */}
                   <div className="relative w-24 flex-shrink-0 cursor-pointer">
                     <img
                       src={project.image}
                       alt={t(`projects.${project.id}`)}
                       className="w-full h-full object-cover rounded-l-xl cursor-pointer"
                       style={{ cursor: 'pointer' }}
                     />
                     <div className="absolute top-1 right-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium cursor-pointer" style={{ cursor: 'pointer' }}>
                       €{project.pricePerM2}/m²
                     </div>
                   </div>

                   {/* Project Info - Right side */}
                   <div className="flex-1 p-3 flex flex-col justify-between cursor-pointer" style={{ cursor: 'pointer' }}>
                     <div className="cursor-pointer" style={{ cursor: 'pointer' }}>
                       <h3 className="font-semibold text-gray-900 text-sm mb-1 cursor-pointer" style={{ cursor: 'pointer' }}>
                         {t(`projects.${project.id}`)}
                       </h3>
                       
                       <div className="flex items-center gap-1 text-gray-600 text-xs mb-2 cursor-pointer" style={{ cursor: 'pointer' }}>
                         <MapPin className="h-3 w-3 cursor-pointer" style={{ cursor: 'pointer' }} />
                         <span className="cursor-pointer" style={{ cursor: 'pointer' }}>{project.country}</span>
                       </div>

                       {/* Project Progress - Compact version */}
                       <div className="mb-2 cursor-pointer" style={{ cursor: 'pointer' }}>
                         <div className="flex items-center justify-end text-xs mb-1 cursor-pointer" style={{ cursor: 'pointer' }}>
                           <span className="font-medium text-green-600 cursor-pointer" style={{ cursor: 'pointer' }}>{Math.round((project.areaHectares * (0.3 + (project.id.charCodeAt(0) % 20) / 100)) / project.areaHectares * 100)}%</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-2 cursor-pointer" style={{ cursor: 'pointer' }}>
                           <div 
                             className="bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000 ease-out cursor-pointer relative overflow-hidden"
                             style={{ 
                               '--progress-width': `${(project.areaHectares * (0.3 + (project.id.charCodeAt(0) % 20) / 100)) / project.areaHectares * 100}%`,
                               width: '0%',
                               animation: 'progressFill 1s ease-out forwards'
                             } as React.CSSProperties}
                           >
                             {/* Animated shine effect */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Action Button */}
                     <div className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer" style={{ cursor: 'pointer' }}>
                       Protect This Area
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         )}

         {/* End of results */}
         {!hasMore && visibleProjects.length > 0 && (
           <div className="text-center py-8">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700">
               <Leaf className="h-4 w-4" />
               <span>All projects loaded</span>
             </div>
           </div>
         )}

         {/* Scroll sentinel for infinite scroll */}
         <div id="scroll-sentinel" className="h-4" />
       </div>
     </div>
   );
}
