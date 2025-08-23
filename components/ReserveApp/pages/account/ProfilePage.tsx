import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  Globe,
  Heart
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
  dateOfBirth: string;
  location: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  bio: string;
  occupation: string;
  interests: string[];
  avatar: string;
  verified: boolean;
  joinDate: string;
}

export function ProfilePage({ onBack, user, onUpdateUser }: ProfilePageProps) {
  const { t } = useTranslation('reserve');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Default profile data if no user provided
  const defaultProfile: UserProfile = {
    firstName: "Sonia",
    lastName: "Rodriguez",
    email: "sonia.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    dateOfBirth: "1995-03-18",
    location: {
      city: "Denver",
      country: "United States",
      coordinates: { lat: 39.7392, lng: -104.9903 }
    },
    bio: "Passionate environmental advocate and sustainability consultant. Dedicated to creating positive change through community engagement and innovative conservation solutions. Enjoys hiking, photography, and exploring nature.",
    occupation: "Sustainability Consultant & Environmental Advocate",
    interests: ["Conservation", "Climate Action", "Community Engagement", "Hiking", "Nature Photography", "Sustainable Development"],
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
           coordinates: { lat: 39.7392, lng: -104.9903 }
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

  const handleInterestToggle = (interest: string) => {
    if (!isEditing) return;
    
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
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

  const availableInterests = [
    "Conservation", "Climate Action", "Wildlife Photography", "Hiking", 
    "Renewable Energy", "Sustainable Living", "Marine Biology", "Forestry",
    "Biodiversity", "Eco Tourism", "Green Technology", "Carbon Offset"
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto relative">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="profile-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white"/>
              <circle cx="10" cy="10" r="0.5" fill="white"/>
              <circle cx="50" cy="20" r="0.5" fill="white"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#profile-pattern)" />
          </svg>
        </div>
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              <Edit3 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 backdrop-blur-sm"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          )}
        </div>
        
                {/* Profile Picture Section */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white pointer-events-auto">
            <div className="relative inline-block mb-4">
               {/* Profile Picture - Always Clickable */}
               <img 
                 src={isEditing ? editedProfile.avatar : profile.avatar} 
                 alt={`${profile.firstName} ${profile.lastName}`}
                 className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg object-cover cursor-pointer hover:scale-105 transition-transform duration-200 relative z-10"
                 onClick={handleImageClick}
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                 }}
               />
               
               {/* Verification Badge */}
               {profile.verified && (
                 <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white pointer-events-none">
                   <CheckCircle className="w-4 h-4 text-white" />
                 </div>
               )}
               
               {/* Camera Button - Only when editing */}
               {isEditing && (
                 <button
                   className="absolute -top-1 -right-1 w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center border-2 border-white transition-colors cursor-pointer z-20"
                   onClick={(e) => {
                     e.stopPropagation(); // Prevent triggering the image modal
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
                   <Camera className="w-3 h-3 text-white" />
                 </button>
               )}
             </div>
            <h1 className="text-2xl font-bold mb-1">{profile.firstName} {profile.lastName}</h1>
            <p className="text-blue-100 text-sm">{profile.occupation}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
          
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.firstName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              ) : (
                <p className="py-2 text-gray-900">{profile.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.lastName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              ) : (
                <p className="py-2 text-gray-900">{profile.lastName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              ) : (
                <p className="py-2 text-gray-900">{formatDate(profile.dateOfBirth)} ({calculateAge(profile.dateOfBirth)} years old)</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="py-2 text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-600" />
            Contact Details
          </h3>
          
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3 py-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{profile.email}</p>
              </div>
              {profile.verified && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 py-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-1 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 py-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Location</p>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedProfile.location.city}
                      onChange={(e) => setEditedProfile(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, city: e.target.value }
                      }))}
                      placeholder="City"
                      className="w-full px-3 py-1 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                    <input
                      type="text"
                      value={editedProfile.location.country}
                      onChange={(e) => setEditedProfile(prev => ({ 
                        ...prev, 
                        location: { ...prev.location, country: e.target.value }
                      }))}
                      placeholder="Country"
                      className="w-full px-3 py-1 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                ) : (
                  <p className="text-gray-900">{profile.location.city}, {profile.location.country}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-600" />
            Interests
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {isEditing ? (
              <>
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      editedProfile.interests.includes(interest)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </>
            ) : (
              <>
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            Account Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Member since</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(profile.joinDate)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Account status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Active</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Verification</span>
              <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 ${profile.verified ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${profile.verified ? 'text-green-700' : 'text-gray-500'}`}>
                  {profile.verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-colors">
              <Shield className="w-4 h-4 mx-auto mb-1" />
              <span className="text-sm font-medium">Verify Account</span>
            </button>
            
            <button className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-colors">
              <Globe className="w-4 h-4 mx-auto mb-1" />
              <span className="text-sm font-medium">Export Data</span>
            </button>
          </div>
                 )}
       </div>
       
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
