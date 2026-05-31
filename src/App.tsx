/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewState } from './types';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import NewMemberView from './components/NewMemberView';
import PrayerRequestView from './components/PrayerRequestView';
import CheckinView from './components/CheckinView';
import CheckinSuccessView from './components/CheckinSuccessView';
import MinistryView from './components/MinistryView';
import DonationView from './components/DonationView';
import MyCellView from './components/MyCellView';
import PastoralView from './components/PastoralView';
import InactivityTimer from './components/InactivityTimer';

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  const handleStart = () => {
    setView('dashboard');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  const handleGoHome = () => {
    setView('home');
  };

  const handleCheckinSuccess = () => {
    setView('checkin_success');
  };

  return (
    <InactivityTimer currentView={view} onReset={handleGoHome}>
      <div className="min-h-screen bg-brand-light select-none text-[#191c1e] transition-all duration-300">
        {view === 'home' && (
          <HomeView onStart={handleStart} />
        )}

        {view === 'dashboard' && (
          <DashboardView 
            onSelectView={setView} 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'new_member' && (
          <NewMemberView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'prayer' && (
          <PrayerRequestView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'checkin' && (
          <CheckinView 
            onBack={handleBackToDashboard} 
            onSuccess={handleCheckinSuccess} 
          />
        )}

        {view === 'checkin_success' && (
          <CheckinSuccessView 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'ministries' && (
          <MinistryView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'donations' && (
          <DonationView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'my_cell' && (
          <MyCellView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
          />
        )}

        {view === 'pastoral' && (
          <PastoralView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
          />
        )}
      </div>
    </InactivityTimer>
  );
}
