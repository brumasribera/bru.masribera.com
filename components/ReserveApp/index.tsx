import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "./components/AppShell";
import { Globe3D } from "./components/Globe3D";
import { ProtectedAreaPage } from "./pages/contribution/ProtectedAreaPage";
import { Project } from "./types/types";
import { MyContributions } from "./pages/contribution/MyContributions";
import { Contribution } from "./types/types";
import { ContributionDetail } from "./pages/contribution/ContributionDetail";
import { AccountMain } from "./pages/account/AccountMain";
import { ProfilePage } from "./pages/account/ProfilePage";
import { PaymentPage } from "./pages/account/PaymentPage";
import { TransactionHistory } from "./pages/account/TransactionHistory";
import { LinkedAccounts } from "./pages/account/LinkedAccounts";
import { DownloadsPage } from "./pages/account/DownloadsPage";
import { Leaf } from "lucide-react";

/**
 * Reserve – Happy Nature (Responsive prototype)
 *
 * Optimized for all screen sizes:
 * - Mobile-first design with responsive scaling
 * - Adaptive layouts for tablets and desktop
 * - Touch-friendly on mobile, mouse-friendly on desktop
 * - Responsive typography and spacing
 */

type AccountPage = 'main' | 'profile' | 'payment' | 'transactions' | 'linked' | 'downloads';

export default function ReserveMobileApp() {
  const { ready, t } = useTranslation('reserve');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showMyContributions, setShowMyContributions] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [accountPage, setAccountPage] = useState<AccountPage>('main');
  
  // Mock user data - shared across components
  const [user, setUser] = useState({
    name: "Sonia Rodriguez",
    email: "sonia.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    location: "Denver, CO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
    memberSince: "June 2023",
    verified: true
  });

  // Function to update user profile
  const updateUser = (updatedUser: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  // Show loading state while i18n is not ready
  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reserve</h1>
          <p className="text-gray-600 text-sm md:text-base">{t('common.loadingTranslations')}</p>
        </div>
      </div>
    );
  }

  const openProject = (p: Project) => {
    setActiveProject(p);
    setShowMyContributions(false);
    setShowAccount(false);
  };

  const closeAccount = () => {
    setShowAccount(false);
    setAccountPage('main');
  };

  const renderAccountPage = () => {
    switch (accountPage) {
      case 'profile':
        return <ProfilePage onBack={() => setAccountPage('main')} user={user} onUpdateUser={updateUser} />;
      case 'payment':
        return (
          <PaymentPage 
            onBack={() => setAccountPage('main')} 
            onNavigateToTransactionHistory={() => setAccountPage('transactions')}
          />
        );
      case 'transactions':
        return <TransactionHistory onBack={() => setAccountPage('payment')} />;
      case 'linked':
        return <LinkedAccounts onBack={() => setAccountPage('main')} />;
      case 'downloads':
        return <DownloadsPage onBack={() => setAccountPage('main')} />;
      default:
        return (
          <AccountMain
            onBack={closeAccount}
            onNavigateToProfile={() => setAccountPage('profile')}
            onNavigateToPayment={() => setAccountPage('payment')}
            onNavigateToDownloads={() => setAccountPage('downloads')}
            onNavigateToLinkedAccounts={() => setAccountPage('linked')}
            user={user}
          />
        );
    }
  };

  return (
    <AppShell showHeader={false}>
      {showAccount ? (
        renderAccountPage()
      ) : showMyContributions ? (
        selectedContribution ? (
          <ContributionDetail
            contribution={selectedContribution}
            onBack={() => setSelectedContribution(null)}
          />
        ) : (
          <MyContributions
            onBack={() => setShowMyContributions(false)}
            onOpenContribution={(c) => setSelectedContribution(c)}
            onGoToGlobe={() => {
              setShowMyContributions(false);
              setActiveProject(null);
            }}
            onShowAccount={() => {
              setShowAccount(true);
              setAccountPage('main');
            }}
            user={user}
          />
        )
      ) : !activeProject ? (
        <div className="w-full h-full">
          <Globe3D 
            onPick={openProject} 
            onShowContributions={() => setShowMyContributions(true)}
            onShowAccount={() => {
              setShowAccount(true);
              setAccountPage('main');
            }}
            user={user}
          />
        </div>
      ) : (
        <ProtectedAreaPage
          project={activeProject}
          onBack={() => setActiveProject(null)}
          onShowContributions={() => setShowMyContributions(true)}
        />
      )}
    </AppShell>
  );
}
