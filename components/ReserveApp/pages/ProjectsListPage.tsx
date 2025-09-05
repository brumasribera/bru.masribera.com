import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Filter, Search, MapPin, Leaf, TrendingUp, Users, ChevronDown, ArrowDownAZ, ArrowDownZA, ArrowUp01, ArrowUp10 } from 'lucide-react'
import { PROJECTS } from '../utils/data'
import { Project } from '../types/types'
import * as Slider from '@radix-ui/react-slider'
import * as Select from '@radix-ui/react-select'

interface ProjectsListPageProps {
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectsListPage({ onBack, onSelectProject }: ProjectsListPageProps) {
  const { t } = useTranslation('reserve');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('');
  const [progressRange, setProgressRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Filter projects based on search and filters
  const filteredProjects = PROJECTS.filter(project => {
    // Generate random progress between 1-99% for all projects
    let projectProgress;
    if (project.id === 'pix4d' || project.id === 'openhuts' || project.id === 'moodlenet' || project.id === 'clathes') {
      // Use a seed based on project ID for consistent random values
      const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1);
      const randomValue = Math.sin(seed) * 10000;
      const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
      projectProgress = Math.round(75 + (normalizedRandom * 24)); // 75-99 range
    } else {
      // Use a seed-based calculation to spread projects evenly across 1-99%
      const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1) + project.id.charCodeAt(2);
      const randomValue = Math.sin(seed) * 10000;
      const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
      projectProgress = Math.round(1 + (normalizedRandom * 98)); // 1-99 range
    }
    
    const matchesSearch = searchTerm === '' || 
                         t(`projects.${project.id}`).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedCountry === 'all' || project.country === selectedCountry;
    const matchesImpact = selectedImpact === '' || 
      (selectedImpact === 'Biodiversity' && project.impact.biodiversity >= 80) ||
      (selectedImpact === 'Carbon' && project.impact.carbon >= 80) ||
      (selectedImpact === 'Community' && project.impact.community >= 80);
    
    const matchesProgress = projectProgress >= progressRange[0] && projectProgress <= progressRange[1];
    
    return matchesSearch && matchesCountry && matchesImpact && matchesProgress;
  });

  // Sort the filtered projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // If no sorting is applied, return original order
    if (!sortBy || !sortOrder) return 0;
    
    if (sortBy === 'name') {
      const nameA = t(`projects.${a.id}`).toLowerCase();
      const nameB = t(`projects.${b.id}`).toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (sortBy === 'progress') {
      let progressA, progressB;
      
      // Calculate progress for project A
      if (a.id === 'pix4d' || a.id === 'openhuts' || a.id === 'moodlenet' || a.id === 'clathes') {
        const seed = a.id.charCodeAt(0) + a.id.charCodeAt(1);
        const randomValue = Math.sin(seed) * 10000;
        const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
        progressA = Math.round(75 + (normalizedRandom * 24));
        } else {
        const seed = a.id.charCodeAt(0) + a.id.charCodeAt(1) + a.id.charCodeAt(2);
        const randomValue = Math.sin(seed) * 10000;
        const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
        progressA = Math.round(1 + (normalizedRandom * 98));
      }
      
      // Calculate progress for project B
      if (b.id === 'pix4d' || b.id === 'openhuts' || b.id === 'moodlenet' || b.id === 'clathes') {
        const seed = b.id.charCodeAt(0) + b.id.charCodeAt(1);
        const randomValue = Math.sin(seed) * 10000;
        const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
        progressB = Math.round(75 + (normalizedRandom * 24));
      } else {
        const seed = b.id.charCodeAt(1) + b.id.charCodeAt(2);
        const randomValue = Math.sin(seed) * 10000;
        const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
        progressB = Math.round(1 + (normalizedRandom * 98));
      }
      
      return sortOrder === 'asc' ? progressA - progressB : progressB - progressA;
    }
    return 0;
  });

  // Get unique countries and impacts for filter options
  const countries = [...new Set(PROJECTS.map(p => p.country))].sort();
  const impacts = ['Biodiversity', 'Carbon', 'Community'];

  const handleProjectClick = (project: Project) => {
    onSelectProject(project);
  };

  return (
    <div className="h-full bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 flex flex-col">
      {/* Header - Always sticky at top, no scrollbar */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 sticky top-0 z-40 flex-shrink-0 shadow-lg">
         <div className="p-4">
           <div className="flex items-center justify-between mb-4">
             <button
               onClick={onBack}
               className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50"
             >
               <ArrowLeft className="h-5 w-5" />
             </button>
             <div className="flex flex-col items-center">
               <h1 className="text-xl font-bold text-white">Explore Projects</h1>
             </div>
             <button
               onClick={() => setShowFilters(!showFilters)}
               className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-110 shadow-lg hover:shadow-xl bg-white/90 text-gray-700 hover:bg-white backdrop-blur-sm border border-gray-200/50"
             >
               <Filter className={`h-5 w-5 transition-transform duration-500 ease-in-out ${showFilters ? 'rotate-180' : ''}`} />
             </button>
           </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
                  placeholder="Search projects or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full text-base text-gray-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 shadow-md"
            />
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className={`transform transition-all duration-300 delay-200 ${
            showFilters ? 'translate-y-0 opacity-100 max-h-96' : 'translate-y-2 opacity-0 max-h-0 overflow-hidden'
          }`}>
            <div className="space-y-4">
                              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Country</label>
                <Select.Root value={selectedCountry} onValueChange={setSelectedCountry}>
                  <Select.Trigger className="w-full px-3 py-2.5 bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 cursor-pointer hover:bg-white/100 flex items-center justify-between">
                    <Select.Value placeholder="All Countries" />
                    <Select.Icon>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Select.Icon>
                  </Select.Trigger>
                  
                  <Select.Portal>
                    <Select.Content 
                      className="overflow-hidden bg-white/95 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg z-40"
                      style={{ maxHeight: '120px' }}
                    >
                      <Select.Viewport className="p-1">
                        <Select.Item value="all" className="relative flex items-center px-3 py-2 text-sm text-gray-900 rounded cursor-pointer hover:bg-green-50 focus:bg-green-50 focus:outline-none">
                          <Select.ItemText>All Countries</Select.ItemText>
                        </Select.Item>
                        
                        {countries.map(country => (
                          <Select.Item 
                            key={country} 
                            value={country} 
                            className="relative flex items-center px-3 py-2 text-sm text-gray-900 rounded cursor-pointer hover:bg-green-50 focus:bg-green-50 focus:outline-none"
                          >
                            <Select.ItemText>{country}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
               </div>

              {/* Impact Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">High Impact Areas</label>
                <div className="flex gap-1.5">
                  {impacts.map((impact, index) => (
                      <button
                      key={impact}
                      onClick={() => setSelectedImpact(selectedImpact === impact ? '' : impact)}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 ${
                        selectedImpact === impact
                          ? 'bg-green-600 text-white border border-green-600'
                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-green-300'
                        }`}
                      style={{ transitionDelay: `${300 + index * 50}ms` }}
                    >
                      {impact === 'Biodiversity' && <Leaf className="h-4 w-4" />}
                      {impact === 'Carbon' && <TrendingUp className="h-4 w-4" />}
                      {impact === 'Community' && <Users className="h-4 w-4" />}
                      {impact}
                      </button>
                  ))}
                </div>
              </div>

              {/* Progress Range Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Progress Range</label>
                
                {/* Percentage Inputs */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={progressRange[1]}
                      value={progressRange[0]}
                      onChange={(e) => {
                        const value = Math.max(0, Math.min(progressRange[1], parseInt(e.target.value) || 0));
                        setProgressRange([value, progressRange[1]]);
                      }}
                      onBlur={(e) => {
                        const value = Math.max(0, Math.min(progressRange[1], parseInt(e.target.value) || 0));
                        setProgressRange([value, progressRange[1]]);
                      }}
                      className="w-16 px-2 py-1.5 bg-white/95 backdrop-blur-sm border border-white/30 rounded-lg text-gray-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    />
                    <span className="text-white text-sm">%</span>
           </div>

                  <span className="text-white text-sm">to</span>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={progressRange[0]}
                      max="100"
                      value={progressRange[1]}
                      onChange={(e) => {
                        const value = Math.max(progressRange[0], Math.min(100, parseInt(e.target.value) || 100));
                        setProgressRange([progressRange[0], value]);
                      }}
                      onBlur={(e) => {
                        const value = Math.max(progressRange[0], Math.min(100, parseInt(e.target.value) || 100));
                        setProgressRange([progressRange[0], value]);
                      }}
                      className="w-16 px-2 py-1.5 bg-white/95 backdrop-blur-sm border border-white/30 rounded-lg text-gray-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                    />
                    <span className="text-white text-sm">%</span>
        </div>
      </div>

                {/* Radix UI Range Slider */}
                <div className="px-2">
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={progressRange}
                    onValueChange={setProgressRange}
                    max={100}
                    min={0}
                    step={1}
                  >
                    <Slider.Track className="bg-white/30 relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-white/60 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb 
                      className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    />
                    <Slider.Thumb 
                      className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    />
                  </Slider.Root>
                  
                  <div className="flex justify-between text-xs text-white/80 mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                     </div>
                   </div>
                   
              {/* Sorting Options */}
                     <div>
                <label className="block text-sm font-medium text-white mb-2">Sort by</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (sortBy === 'name') {
                        if (sortOrder === 'asc') {
                          setSortOrder('desc');
                        } else {
                          // Reset to disabled state
                          setSortBy('');
                          setSortOrder('');
                        }
                      } else {
                        // Set to ascending
                        setSortBy('name');
                        setSortOrder('asc');
                      }
                    }}
                    aria-sort={sortBy === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                      sortBy === 'name' 
                        ? (sortOrder === 'asc' 
                          ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' 
                          : 'bg-green-700 text-white border-green-700 hover:bg-green-800')
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-green-300'
                    }`}
                  >
                    <span>Name</span>
                    {sortBy === 'name' ? (
                      sortOrder === 'asc' ? (
                        <ArrowDownAZ className="w-4 h-4" />
                      ) : (
                        <ArrowDownZA className="w-4 h-4" />
                      )
                    ) : null}
                  </button>
                  
                  <button
                    onClick={() => {
                      if (sortBy === 'progress') {
                        if (sortOrder === 'asc') {
                          setSortOrder('desc');
                        } else {
                          // Reset to disabled state
                          setSortBy('');
                          setSortOrder('');
                        }
                      } else {
                        // Set to ascending
                        setSortBy('progress');
                        setSortOrder('asc');
                      }
                    }}
                    aria-sort={sortBy === 'progress' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                      sortBy === 'progress' 
                        ? (sortOrder === 'asc' 
                          ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' 
                          : 'bg-green-700 text-white border-green-700 hover:bg-green-800')
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-green-300'
                    }`}
                  >
                    <span>Progress</span>
                    {sortBy === 'progress' ? (
                      sortOrder === 'asc' ? (
                        <ArrowUp01 className="w-4 h-4" />
                      ) : (
                        <ArrowUp10 className="w-4 h-4" />
                      )
                    ) : null}
                  </button>
                       </div>
                       

              </div>
                           </div>
                         </div>
                       </div>
                     </div>
                     
      {/* Projects List - Scrollable section */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {sortedProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 shadow-lg">
              <Leaf className="h-5 w-5" />
              <span>No projects found matching your criteria</span>
                 </div>
           </div>
         ) : (
          <div className="space-y-3 flex flex-col items-center">
            {sortedProjects.map((project) => (
               <div
                 key={project.id}
                onClick={() => handleProjectClick(project)}
                className="project-card bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 w-[calc(100%-1rem)] max-w-lg group relative focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                 tabIndex={0}
                 role="button"
                 aria-label={`View details for ${t(`projects.${project.id}`)} project`}
               >
                 {/* Hover overlay for visual feedback */}
                 <div className="absolute inset-0 bg-gradient-to-r from-green-50/0 via-green-50/20 to-green-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10" />
                 
                <div className="flex h-32 relative z-20">
                   {/* Project Image - Full height left side */}
                  <div className="relative w-24 flex-shrink-0">
                     <img
                       src={project.image}
                       alt={t(`projects.${project.id}`)}
                      className="w-full h-full object-cover rounded-l-xl"
                     />
                    <div className="absolute top-1 right-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                       €{project.pricePerM2}/m²
                     </div>
                   </div>

                   {/* Project Info - Right side */}
                  <div className="flex-1 p-2 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                         {t(`projects.${project.id}`)}
                       </h3>
                       
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{project.country}</span>
                       </div>

                       {/* Project Progress - Compact version */}
                      <div className="mb-1">
                        <div className="flex items-center justify-end text-xs mb-0.5">
                          <span className="font-medium text-green-600">
                            {(() => {
                              let projectProgress;
                              if (project.id === 'pix4d' || project.id === 'openhuts' || project.id === 'moodlenet' || project.id === 'clathes') {
                                // Use a seed based on project ID for consistent random values
                                const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1);
                                const randomValue = Math.sin(seed) * 10000;
                                const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
                                projectProgress = Math.round(75 + (normalizedRandom * 24)); // 75-99 range
                              } else {
                                // Use a seed-based calculation to spread projects evenly across 1-99%
                                const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1) + project.id.charCodeAt(2);
                                const randomValue = Math.sin(seed) * 10000;
                                const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
                                projectProgress = Math.round(1 + (normalizedRandom * 98)); // 1-99 range
                              }
                              return projectProgress;
                            })()}%
                          </span>
                         </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                           <div 
                            className="bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 h-1.5 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                             style={{ 
                              width: `${(() => {
                                let projectProgress;
                                if (project.id === 'pix4d' || project.id === 'openhuts' || project.id === 'moodlenet' || project.id === 'clathes') {
                                  // Use a seed based on project ID for consistent random values
                                  const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1);
                                  const randomValue = Math.sin(seed) * 10000;
                                  const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
                                  projectProgress = Math.round(75 + (normalizedRandom * 24)); // 75-99 range
                                } else {
                                  // Use a seed-based calculation to spread projects evenly across 1-99%
                                  const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1) + project.id.charCodeAt(2);
                                  const randomValue = Math.sin(seed) * 10000;
                                  const normalizedRandom = Math.abs(randomValue - Math.floor(randomValue));
                                  projectProgress = Math.round(1 + (normalizedRandom * 98)); // 1-99 range
                                }
                                return projectProgress;
                              })()}%`
                            }}
                           >
                             {/* Animated shine effect */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Action Button */}
                                        <div className="w-full bg-green-600 hover:bg-green-700 text-white py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center">
                      Protect this area
                    </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         )}


       </div>
     </div>
   );
}
