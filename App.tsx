
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CompareProvider } from './context/CompareContext';
import { VehicleProvider } from './context/VehicleContext';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import OpeningAnimation from './components/OpeningAnimation';
import AppDemo from './components/AppDemo';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import ComparePage from './pages/ComparePage';
import CalculatorsPage from './pages/CalculatorsPage';
import SellBikePage from './pages/SellBikePage';
import ShowroomsPage from './pages/ShowroomsPage';
import AboutPage from './pages/AboutPage';
import TestRidePage from './pages/TestRidePage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import DealerDashboardPage from './pages/DealerDashboardPage';
import MaintenanceHelperPage from './pages/MaintenanceHelperPage';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    // Show demo only on first visit per session, after the loading animation is done.
    if (!isLoading) {
      const demoShown = sessionStorage.getItem('demoShown');
      if (!demoShown) {
        setShowDemo(true);
      }
    }
  }, [isLoading]);

  const handleDemoFinish = () => {
    sessionStorage.setItem('demoShown', 'true');
    setShowDemo(false);
  };

  if (isLoading) {
    return <OpeningAnimation onFinish={() => setIsLoading(false)} />;
  }

  return (
    <AuthProvider>
      <VehicleProvider>
        <CompareProvider>
          <HashRouter>
            {showDemo && <AppDemo onFinish={handleDemoFinish} />}
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/calculators" element={<CalculatorsPage />} />
                <Route path="/sell-bike" element={<SellBikePage />} />
                <Route path="/showrooms" element={<ShowroomsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/test-ride" element={<TestRidePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/dealer-dashboard" element={<DealerDashboardPage />} />
                <Route path="/maintenance-helper" element={<MaintenanceHelperPage />} />
              </Routes>
            </Layout>
          </HashRouter>
        </CompareProvider>
      </VehicleProvider>
    </AuthProvider>
  );
};

export default App;