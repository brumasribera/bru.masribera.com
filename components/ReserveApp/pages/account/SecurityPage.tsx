import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Shield,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Trash2,
  Plus,
  QrCode,
  Download
} from "lucide-react";

interface SecurityPageProps {
  onBack: () => void;
}

interface SecuritySession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  ipAddress: string;
}

export function SecurityPage({ onBack }: SecurityPageProps) {
  const { t } = useTranslation('reserve');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const [sessions] = useState<SecuritySession[]>([
    {
      id: '1',
      device: 'iPhone 15 Pro',
      location: 'Denver, CO, US',
      lastActive: '2 minutes ago',
      isCurrent: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      device: 'MacBook Air',
      location: 'Denver, CO, US',
      lastActive: '1 hour ago',
      isCurrent: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      device: 'iPad Pro',
      location: 'Boulder, CO, US',
      lastActive: '2 days ago',
      isCurrent: false,
      ipAddress: '10.0.0.50'
    }
  ]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
    alert('Password changed successfully');
  };

  const toggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowTwoFactorSetup(true);
    } else {
      setTwoFactorEnabled(false);
      setBackupCodes([]);
    }
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
    setShowBackupCodes(true);
  };

  const revokeSession = (sessionId: string) => {
    // Remove session from list
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    // In real app, this would call an API
    console.log('Session revoked:', sessionId);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <pattern id="security-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="8" height="8" fill="white" opacity="0.3"/>
              <rect x="20" y="20" width="8" height="8" fill="white" opacity="0.2"/>
              <circle cx="30" cy="10" r="2" fill="white" opacity="0.4"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#security-pattern)" />
          </svg>
        </div>
        
        {/* Navigation */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Security & Privacy</h1>
          <p className="text-orange-100 text-sm text-center">Protect your account and data</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Password Management */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-600" />
            Password Management
          </h3>
          
          <div className="space-y-4">
            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Change Password Button */}
            <button
              onClick={handlePasswordChange}
              disabled={!currentPassword || !newPassword || !confirmPassword || isChangingPassword}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isChangingPassword ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Changing Password...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-orange-600" />
            Two-Factor Authentication
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">2FA Status</p>
                <p className="text-xs text-gray-500">
                  {twoFactorEnabled 
                    ? 'Your account is protected with two-factor authentication' 
                    : 'Add an extra layer of security to your account'
                  }
                </p>
              </div>
              <button
                onClick={toggleTwoFactor}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {twoFactorEnabled && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Two-factor authentication is enabled</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={generateBackupCodes}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Backup Codes
                  </button>
                  <button className="flex-1 py-2 px-3 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Setup New
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-orange-600" />
            Active Sessions
          </h3>
          
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-xl p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{session.device}</span>
                      {session.isCurrent && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Current</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{session.lastActive}</span>
                      <span>•</span>
                      <span>{session.ipAddress}</span>
                    </div>
                  </div>
                  
                  {!session.isCurrent && (
                    <button
                      onClick={() => revokeSession(session.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Device
          </button>
        </div>

        {/* Security Preferences */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Login Notifications</p>
                <p className="text-xs text-gray-500">Get notified of new login attempts</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Suspicious Activity Alerts</p>
                <p className="text-xs text-gray-500">Receive alerts for unusual account activity</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Logout</p>
                <p className="text-xs text-gray-500">Automatically log out after 30 minutes of inactivity</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Security Tips
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Use a strong, unique password for your account</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Enable two-factor authentication for extra security</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Regularly review and revoke unused sessions</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
              <p>Never share your backup codes with anyone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600 mb-4">
              Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </p>
            
            <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-center text-lg font-mono focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                maxLength={6}
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTwoFactorSetup(false)}
                  className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setTwoFactorEnabled(true);
                    setShowTwoFactorSetup(false);
                    generateBackupCodes();
                  }}
                  className="flex-1 py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Codes Modal */}
      {showBackupCodes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Codes</h3>
            <p className="text-sm text-gray-600 mb-4">
              Save these codes in a secure place. You can use them to access your account if you lose your 2FA device.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div key={index} className="text-center font-mono text-sm bg-white p-2 rounded border">
                    {code}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowBackupCodes(false)}
                className="flex-1 py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                I've Saved Them
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
