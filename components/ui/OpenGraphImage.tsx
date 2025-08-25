

interface OpenGraphImageProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  profileImage?: string;
  projectType?: 'main' | 'project';
  projectCountry?: string;
  projectImpact?: {
    biodiversity: number;
    carbon: number;
    community: number;
  };
}

export function OpenGraphImage({
  title,
  subtitle,
  imageUrl,
  profileImage = '/profile/profile-cropped.jpg',
  projectType = 'main',
  projectCountry,
  projectImpact
}: OpenGraphImageProps) {
  return (
    <div className="relative w-[1200px] h-[630px] bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Background Image Overlay */}
      {imageUrl && (
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 via-emerald-700/60 to-teal-800/80" />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-between h-full p-16">
        {/* Left Side - Text Content */}
        <div className="flex-1 max-w-2xl">
          {/* Profile Image */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src={profileImage} 
                alt="Bru Mas Ribera"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white/90">
              <div className="text-lg font-medium">Bru Mas Ribera</div>
              <div className="text-sm opacity-75">Frontend & UX Engineer</div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Project-specific content */}
          {projectType === 'project' && projectCountry && (
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-3 h-3 bg-white/60 rounded-full"></div>
              <span className="text-lg font-medium">{projectCountry}</span>
            </div>
          )}

          {/* Impact Metrics for projects */}
          {projectType === 'project' && projectImpact && (
            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{projectImpact.biodiversity}%</div>
                <div className="text-sm text-white/70">Biodiversity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{projectImpact.carbon}%</div>
                <div className="text-sm text-white/70">Carbon</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{projectImpact.community}%</div>
                <div className="text-sm text-white/70">Community</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Visual Elements */}
        <div className="flex flex-col items-end justify-center space-y-6">
          {/* Leaf Icon */}
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,10,5.25,9,5.25S2,11.5,2,13.5a6.23,6.23,0,0,0,1.75,3.75C4.5,17.5,2,19,2,19s3,1,5,1,8-1,10-2,2-2,2-2S17,8,17,8Z"/>
            </svg>
          </div>

          {/* Website URL */}
          <div className="text-right">
            <div className="text-white/60 text-sm font-medium">Visit</div>
            <div className="text-white text-lg font-semibold">bru.masribera.com</div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />
    </div>
  );
}

export default OpenGraphImage;
