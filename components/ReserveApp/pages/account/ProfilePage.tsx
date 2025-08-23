import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  CheckCircle,
  Shield,
  Globe
} from "lucide-react";
import { ImageModal } from "../../components/ImageModal";

interface ProfilePageProps {
  onBack: () => void;
  user?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    memberSince: string;
    verified: boolean;
  };
  onUpdateUser?: (updatedUser: Partial<{
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    memberSince: string;
    verified: boolean;
  }>) => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
  avatar: string;
  verified: boolean;
  joinDate: string;
}

export function ProfilePage({ onBack, user, onUpdateUser }: ProfilePageProps) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Default profile data if no user provided
  const defaultProfile: UserProfile = {
    firstName: "Sonia",
    lastName: "Rodriguez",
    email: "sonia.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    location: {
      city: "Denver",
      country: "United States"
    },
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
    verified: true,
    joinDate: "2023-06-22"
  };
  
  // Use provided user data or default
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (user) {
             // Parse the user's name into first and last name
       const nameParts = user.name.split(' ');
       const firstName = nameParts[0] || "Sonia";
       const lastName = nameParts.slice(1).join(' ') || "Rodriguez";
      
      return {
        ...defaultProfile,
        firstName,
        lastName,
        email: user.email,
        phone: user.phone,
                 location: {
           city: user.location.split(',')[0] || "Denver",
           country: user.location.split(',')[1]?.trim() || "United States",
         },
        avatar: user.avatar,
        verified: user.verified,
        joinDate: user.memberSince
      };
    }
    return defaultProfile;
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  // Sync editedProfile when profile changes
  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setProfile(editedProfile);
    
    // Update parent component state if callback is provided
    if (onUpdateUser) {
      const updatedUserData = {
        name: `${editedProfile.firstName} ${editedProfile.lastName}`,
        email: editedProfile.email,
        phone: editedProfile.phone,
        location: `${editedProfile.location.city}, ${editedProfile.location.country}`,
        avatar: editedProfile.avatar
      };
      onUpdateUser(updatedUserData);
    }
    
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };



  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedProfile(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };



  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col overflow-hidden">
      {/* Ultra-Compact Header */}
      <div className="relative h-24 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700" />
        
        {/* Navigation */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className="w-7 h-7 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center gap-1 shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              <Edit3 className="w-3 h-3" />
              <span className="text-xs font-medium">Edit</span>
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                onClick={handleCancel}
                className="w-7 h-7 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-2 py-1 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-full flex items-center gap-1 shadow-lg transition-all duration-300 backdrop-blur-sm"
              >
                {isSaving ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3 h-3" />
                )}
                <span className="text-xs font-medium">{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Ultra-Compact Profile Picture Section */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white pointer-events-auto">
            <div className="relative inline-block mb-1">
               {/* Profile Picture */}
               <img 
                 src={isEditing ? editedProfile.avatar : profile.avatar} 
                 alt={`${profile.firstName} ${profile.lastName}`}
                 className="w-12 h-12 rounded-full border-2 border-white/30 shadow-lg object-cover cursor-pointer hover:scale-105 transition-transform duration-200 relative z-10"
                 onClick={handleImageClick}
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                 }}
               />
               
               {/* Verification Badge */}
               {profile.verified && (
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border border-white pointer-events-none">
                   <CheckCircle className="w-2.5 h-2.5 text-white" />
                 </div>
               )}
               
               {/* Camera Button - Only when editing */}
               {isEditing && (
                 <button
                   className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center border border-white transition-colors cursor-pointer z-20"
                   onClick={(e) => {
                     e.stopPropagation();
                     const input = document.createElement('input');
                     input.type = 'file';
                     input.accept = 'image/*';
                     input.onchange = (event) => {
                       const target = event.target as HTMLInputElement;
                       if (target.files && target.files[0]) {
                         handleAvatarChange({ target } as React.ChangeEvent<HTMLInputElement>);
                       }
                     };
                     input.click();
                   }}
                 >
                   <Camera className="w-2 h-2 text-white" />
                 </button>
               )}
             </div>
            <h1 className="text-base font-bold">{profile.firstName} {profile.lastName}</h1>
          </div>
        </div>
      </div>

      {/* Ultra-Compact Content - Nature Focused */}
      <div className="px-2 py-1 space-y-1.5 flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        {/* Essential Profile - Ultra Compact */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-green-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-green-600" />
            Profile
          </h3>
          
          <div className="space-y-1.5">
            {/* Name - Single Row */}
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">Name</label>
              {isEditing ? (
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={editedProfile.firstName}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    className="flex-1 px-1.5 py-1 bg-white border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent text-gray-900"
                    placeholder="First"
                  />
                  <input
                    type="text"
                    value={editedProfile.lastName}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    className="flex-1 px-1.5 py-1 bg-white border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent text-gray-900"
                    placeholder="Last"
                  />
                </div>
              ) : (
                <p className="py-1 text-gray-900 text-xs">{profile.firstName} {profile.lastName}</p>
              )}
            </div>




          </div>
        </div>

        {/* Essential Contact - Ultra Compact */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-green-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-green-600" />
            Contact
          </h3>
          
          <div className="space-y-1.5">
            {/* Email */}
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-1.5 py-1 bg-white border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent text-gray-900"
                  />
                ) : (
                  <p className="text-xs text-gray-900 truncate">{profile.email}</p>
                )}
              </div>
              {profile.verified && (
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            {/* Location - Nature Focused */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600">Region</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location.country}
                    onChange={(e) => setEditedProfile(prev => ({ 
                      ...prev, 
                      location: { ...prev.location, country: e.target.value }
                    }))}
                    placeholder="Country"
                    className="w-full px-1.5 py-1 bg-white border border-gray-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-transparent text-gray-900"
                  />
                ) : (
                  <p className="text-xs text-gray-900 truncate">{profile.location.country}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nature Impact - Ultra Compact */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm border border-emerald-100">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            Impact
          </h3>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Member since</span>
              <span className="font-medium text-gray-900">{new Date(profile.joinDate).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Status</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-700">Active</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Verified</span>
              <div className="flex items-center gap-1">
                <Shield className={`w-3 h-3 ${profile.verified ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`font-medium ${profile.verified ? 'text-green-700' : 'text-gray-500'}`}>
                  {profile.verified ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nature Action */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-white">
          <h3 className="text-xs font-semibold mb-1.5">Ready to protect nature?</h3>
          <button 
            onClick={onBack}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-1.5 rounded-lg transition-colors backdrop-blur-sm border border-white/20 text-xs"
          >
            <Globe className="w-3 h-3 inline mr-1" />
            Explore Projects
          </button>
        </div>
      </div>
      
      {/* Minimal bottom spacing */}
      <div className="h-2" />
       
       {/* Image Modal */}
       <ImageModal
         isOpen={isImageModalOpen}
         onClose={() => setIsImageModalOpen(false)}
         imageSrc={isEditing ? editedProfile.avatar : profile.avatar}
         altText={`${profile.firstName} ${profile.lastName}`}
       />
     </div>
   );
 }
