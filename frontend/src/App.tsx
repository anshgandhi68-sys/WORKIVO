import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar, AppPage } from './components/common/Navbar';
import { Stepper } from './components/common/Stepper';
import { Footer } from './components/common/Footer';
import { HelpModal } from './components/common/HelpModal';
import { AddressModal } from './components/common/AddressModal';
import { ReceiptModal } from './components/common/ReceiptModal';
import { DashboardModal } from './components/common/DashboardModal';
import { MutualAidModal } from './components/common/MutualAidModal';
import { NominateApprenticeModal } from './components/common/NominateApprenticeModal';
import { AuthModal } from './components/common/AuthModal';

import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { CooperativePage } from './components/pages/CooperativePage';
import { WelfareFundPage } from './components/pages/WelfareFundPage';
import { MemberDirectoryPage } from './components/pages/MemberDirectoryPage';
import { ResolutionDeskPage } from './components/pages/ResolutionDeskPage';
import { AvailabilityPlannerPage } from './components/pages/AvailabilityPlannerPage';
import { GuildCommandPage } from './components/pages/GuildCommandPage';
import { ArtisanProfilePage } from './components/pages/ArtisanProfilePage';
import { EarningsLedgerPage } from './components/pages/EarningsLedgerPage';
import { WorkerDashboardPage } from './components/pages/WorkerDashboardPage';

import { Step1Service } from './components/steps/Step1Service';
import { Step2Worker } from './components/steps/Step2Worker';
import { Step3Schedule } from './components/steps/Step3Schedule';
import { Step4Payment } from './components/steps/Step4Payment';
import { Step5Confirm } from './components/steps/Step5Confirm';

const MainAppContent: React.FC = () => {
  const { state, setSelectedTrade, goToStep, selectWorker } = useBooking();
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [portalMode, setPortalMode] = useState<'client' | 'worker'>('client');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMutualAidOpen, setIsMutualAidOpen] = useState(false);
  const [isNominateOpen, setIsNominateOpen] = useState(false);

  const handleNavigateToBooking = (trade?: string) => {
    if (trade) {
      setSelectedTrade(trade as any);
    }
    goToStep(1);
    setActivePage('bookings');
    setPortalMode('client');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: AppPage) => {
    setActivePage(page);
    // Automatically synchronize portal mode based on page type
    const workerPages: AppPage[] = ['worker-dashboard', 'command', 'earnings', 'availability', 'members', 'welfare', 'cooperative'];
    if (workerPages.includes(page)) {
      setPortalMode('worker');
    } else {
      setPortalMode('client');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplacementAccepted = (artisanName: string) => {
    alert(`Handover authorized: ${artisanName} assigned to dispatch #WKV-849201. Your ₹225 escrow deposit remains locked with zero price change.`);
    goToStep(5);
    setActivePage('bookings');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FE] text-slate-800 antialiased font-sans">
      {/* Global Navigation Header */}
      <Navbar 
        activePage={activePage}
        portalMode={portalMode}
        onSelectPortalMode={(mode) => setPortalMode(mode)}
        onNavigate={handlePageChange}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Main Page Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Route 1: Home Landing Page */}
        {activePage === 'home' && (
          <HomePage 
            onNavigateToBooking={handleNavigateToBooking}
            onNavigateToServices={() => handlePageChange('services')}
            onNavigateToCoop={() => handlePageChange('cooperative')}
          />
        )}

        {/* Route 2: Services Catalog */}
        {activePage === 'services' && (
          <ServicesPage 
            onSelectServiceCategory={handleNavigateToBooking}
          />
        )}

        {/* Route 3: 5-Step Booking Flow */}
        {activePage === 'bookings' && (
          <div>
            <div className="mb-4 flex items-center justify-between text-xs font-semibold px-2 text-slate-500">
              <span>Karnataka Cooperative Booking Wizard</span>
              <button
                onClick={() => handlePageChange('resolution')}
                className="text-rose-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>Worker Unavailable? Open Resolution Desk</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              </button>
            </div>
            <Stepper />
            {state.currentStep === 1 && <Step1Service />}
            {state.currentStep === 2 && <Step2Worker />}
            {state.currentStep === 3 && <Step3Schedule onOpenAddressModal={() => setIsAddressOpen(true)} />}
            {state.currentStep === 4 && <Step4Payment />}
            {state.currentStep === 5 && (
              <Step5Confirm 
                onOpenReceiptModal={() => setIsReceiptOpen(true)}
                onOpenDashboardModal={() => setIsDashboardOpen(true)}
              />
            )}
          </div>
        )}

        {/* Route 4: Resolution Desk */}
        {activePage === 'resolution' && (
          <ResolutionDeskPage 
            onBackToBookings={() => handlePageChange('bookings')}
            onSelectReplacement={handleReplacementAccepted}
          />
        )}

        {/* Route 5: Cooperative Member Directory */}
        {activePage === 'members' && (
          <MemberDirectoryPage 
            onOpenNominate={() => setIsNominateOpen(true)}
            onNavigateToCoop={() => handlePageChange('cooperative')}
          />
        )}

        {/* Route 6: Availability Planner */}
        {activePage === 'availability' && (
          <AvailabilityPlannerPage />
        )}

        {/* Route 7: Your Cooperative Hub */}
        {activePage === 'cooperative' && (
          <CooperativePage 
            onNavigateToWelfare={() => handlePageChange('welfare')}
            onOpenMutualAid={() => setIsMutualAidOpen(true)}
          />
        )}

        {/* Route 8: Community Welfare Fund & Audited Ledger */}
        {activePage === 'welfare' && (
          <WelfareFundPage 
            onOpenMutualAid={() => setIsMutualAidOpen(true)}
            onNavigateToCoop={() => handlePageChange('cooperative')}
          />
        )}


        {/* Route 10: Artisan Profile (Batch 4 Image 2) */}
        {activePage === 'artisan-profile' && (
          <ArtisanProfilePage 
            onBookArtisan={() => handleNavigateToBooking('Electrical & Wiring')}
            onNavigateToServices={() => handlePageChange('services')}
            onNavigateToCoop={() => handlePageChange('cooperative')}
          />
        )}

        {/* Route 11: Worker Dashboard & Daily Dispatch (Batch 4 Images 4 & 5) */}
        {activePage === 'worker-dashboard' && (
          <WorkerDashboardPage 
            onNavigateToEarnings={() => handlePageChange('earnings')}
            onNavigateToAvailability={() => handlePageChange('availability')}
            onNavigateToCoop={() => handlePageChange('command')}
          />
        )}

        {/* Route 12: Guild Command Center (Batch 4 Image 1) */}
        {activePage === 'command' && (
          <GuildCommandPage 
            onNavigateToMembers={() => handlePageChange('members')}
            onNavigateToWelfare={() => handlePageChange('welfare')}
          />
        )}

        {/* Route 13: Worker Earnings & Co-op Ledger (Batch 4 Image 3) */}
        {activePage === 'earnings' && (
          <EarningsLedgerPage 
            onNavigateToJobs={() => handlePageChange('worker-dashboard')}
          />
        )}
      </main>

      {/* Global Cooperative Footer */}
      <Footer />

      {/* Interactive Modals */}
      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
      <AddressModal 
        isOpen={isAddressOpen} 
        onClose={() => setIsAddressOpen(false)} 
      />
      <ReceiptModal 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
      />
      <DashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
      />
      <MutualAidModal 
        isOpen={isMutualAidOpen} 
        onClose={() => setIsMutualAidOpen(false)} 
      />
      <NominateApprenticeModal
        isOpen={isNominateOpen}
        onClose={() => setIsNominateOpen(false)}
      />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MainAppContent />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
