import { useState } from 'react';
import { Calendar, Camera, TrendingUp, Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  type: 'biodiversity' | 'carbon' | 'community' | 'monitoring' | 'milestone';
  metrics?: {
    treesPlanted?: number;
    carbonStored?: number;
    speciesProtected?: number;
    communityJobs?: number;
  };
}

interface ProjectUpdatesProps {
  projectId: string;
  projectName: string;
}

export function ProjectUpdates({ projectId, projectName }: ProjectUpdatesProps) {
  const { t } = useTranslation('reserve');
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);

  // Generate updates based on project ID
  const generateUpdates = (projectId: string): ProjectUpdate[] => {
    // Use a variety of the downloaded conservation images
    const availableImages = [
      '/reserve/update-images/forest-restoration-1.jpg',
      '/reserve/update-images/tree-planting-community.jpg', 
      '/reserve/update-images/coral-reef-restoration.jpg',
      '/reserve/update-images/mangrove-protection.jpg',
      '/reserve/update-images/community-education.jpg',
      '/reserve/update-images/sustainable-livelihoods.jpg',
      '/reserve/update-images/wetland-restoration.jpg',
      '/reserve/update-images/mountain-conservation.jpg',
      '/reserve/update-images/grassland-protection.jpg',
      '/reserve/update-images/biodiversity-survey.jpg',
      '/reserve/update-images/before-after-restoration.jpg',
      '/reserve/update-images/wildlife-monitoring.jpg'
    ];

    // Pick images based on project ID for consistency
    const getImageForUpdate = (updateIndex: number) => {
      const imageIndex = (projectId.charCodeAt(0) + updateIndex) % availableImages.length;
      return availableImages[imageIndex];
    };

    const baseUpdates = [
      {
        id: `${projectId}-update-1`,
        date: '2024-01-15',
        title: 'Project Launch & Initial Assessment',
        description: 'Conservation project officially launched with comprehensive biodiversity assessment. Local communities engaged and first monitoring stations established.',
        image: getImageForUpdate(0),
        type: 'milestone' as const,
        metrics: { treesPlanted: 0, speciesProtected: 12, communityJobs: 8 }
      },
      {
        id: `${projectId}-update-2`,
        date: '2024-02-28',
        title: 'Habitat Restoration Progress',
        description: 'Major restoration activities underway. Native species reintroduction program showing promising early results with increased wildlife sightings.',
        image: getImageForUpdate(1),
        type: 'biodiversity' as const,
        metrics: { treesPlanted: 2500, speciesProtected: 18, communityJobs: 12 }
      },
      {
        id: `${projectId}-update-3`,
        date: '2024-04-10',
        title: 'Carbon Sequestration Milestone',
        description: 'Reached significant carbon storage targets ahead of schedule. Enhanced monitoring shows 25% increase in soil carbon content.',
        image: getImageForUpdate(2),
        type: 'carbon' as const,
        metrics: { carbonStored: 1250, treesPlanted: 4200, communityJobs: 15 }
      },
      {
        id: `${projectId}-update-4`,
        date: '2024-06-22',
        title: 'Community Engagement Success',
        description: 'Local education programs launched with 200+ participants. Sustainable livelihood initiatives creating lasting positive impact.',
        image: getImageForUpdate(3),
        type: 'community' as const,
        metrics: { communityJobs: 25, speciesProtected: 24, treesPlanted: 6800 }
      },
      {
        id: `${projectId}-update-5`,
        date: '2024-08-05',
        title: 'Mid-Year Conservation Report',
        description: 'Comprehensive monitoring reveals exceeded biodiversity targets. Wildlife populations showing strong recovery patterns.',
        image: getImageForUpdate(4),
        type: 'monitoring' as const,
        metrics: { speciesProtected: 32, carbonStored: 2100, communityJobs: 30 }
      },
      {
        id: `${projectId}-update-6`,
        date: '2024-10-18',
        title: 'Technology Integration Success',
        description: 'AI-powered monitoring systems deployed, enabling real-time ecosystem health tracking and early intervention capabilities.',
        image: getImageForUpdate(5),
        type: 'monitoring' as const,
        metrics: { carbonStored: 2850, treesPlanted: 9500, speciesProtected: 38 }
      }
    ];

    return baseUpdates;
  };

  const updates = generateUpdates(projectId);
  const currentUpdate = updates[currentUpdateIndex];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'biodiversity':
        return <Camera className="w-4 h-4" />;
      case 'carbon':
        return <TrendingUp className="w-4 h-4" />;
      case 'community':
        return <Users className="w-4 h-4" />;
      case 'monitoring':
        return <MapPin className="w-4 h-4" />;
      case 'milestone':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Camera className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'biodiversity':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'carbon':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'community':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'monitoring':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'milestone':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  const nextUpdate = () => {
    setCurrentUpdateIndex((prev) => (prev + 1) % updates.length);
  };

  const prevUpdate = () => {
    setCurrentUpdateIndex((prev) => (prev - 1 + updates.length) % updates.length);
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-blue-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
            {t('projectPage.projectUpdates', 'Project Updates')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('projectPage.latestActivity', 'Latest conservation activity and progress')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {currentUpdateIndex + 1} / {updates.length}
          </span>
        </div>
      </div>

      {/* Current Update Display */}
      <div className="relative">
        {/* Update Image */}
        <div className="relative h-48 md:h-56 rounded-xl overflow-hidden mb-4">
          <img 
            src={currentUpdate.image} 
            alt={currentUpdate.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a default image if project image doesn't exist
              (e.target as HTMLImageElement).src = '/backgrounds/forest-background.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Date overlay */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-gray-700">
            {new Date(currentUpdate.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          
          {/* Type badge */}
          <div className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium border ${getTypeColor(currentUpdate.type)} backdrop-blur-sm`}>
            <div className="flex items-center gap-1">
              {getTypeIcon(currentUpdate.type)}
              <span className="capitalize">{currentUpdate.type}</span>
            </div>
          </div>
        </div>

        {/* Update Content */}
        <div className="space-y-3">
          <h4 className="text-base md:text-lg font-semibold text-gray-900">
            {currentUpdate.title}
          </h4>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            {currentUpdate.description}
          </p>

          {/* Metrics */}
          {currentUpdate.metrics && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentUpdate.metrics.treesPlanted !== undefined && (
                <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                  <div className="text-lg font-bold text-green-700">
                    {formatNumber(currentUpdate.metrics.treesPlanted)}
                  </div>
                  <div className="text-xs text-green-600">Trees Planted</div>
                </div>
              )}
              
              {currentUpdate.metrics.carbonStored !== undefined && (
                <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                  <div className="text-lg font-bold text-blue-700">
                    {formatNumber(currentUpdate.metrics.carbonStored)}t
                  </div>
                  <div className="text-xs text-blue-600">CO₂ Stored</div>
                </div>
              )}
              
              {currentUpdate.metrics.speciesProtected !== undefined && (
                <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-100">
                  <div className="text-lg font-bold text-purple-700">
                    {currentUpdate.metrics.speciesProtected}
                  </div>
                  <div className="text-xs text-purple-600">Species Protected</div>
                </div>
              )}
              
              {currentUpdate.metrics.communityJobs !== undefined && (
                <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
                  <div className="text-lg font-bold text-orange-700">
                    {currentUpdate.metrics.communityJobs}
                  </div>
                  <div className="text-xs text-orange-600">Jobs Created</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevUpdate}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            disabled={updates.length <= 1}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* Progress dots */}
          <div className="flex space-x-2">
            {updates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentUpdateIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentUpdateIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextUpdate}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            disabled={updates.length <= 1}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
