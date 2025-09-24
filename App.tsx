
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CompareProvider } from './context/CompareContext';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import ComparePage from './pages/ComparePage';
import CalculatorsPage from './pages/CalculatorsPage';
import SellBikePage from './pages/SellBikePage';
import ShowroomsPage from './pages/ShowroomsPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <CompareProvider>
      <HashRouter>
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
          </Routes>
        </Layout>
      </HashRouter>
    </CompareProvider>
  );
};

export default App;
