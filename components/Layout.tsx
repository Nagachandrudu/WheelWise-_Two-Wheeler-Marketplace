
import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BikeIcon, ChevronRightIcon } from './Icons';
import { CompareContext } from '../context/CompareContext';

const Header: React.FC = () => {
  const navItems = [
    { name: 'Browse', path: '/browse' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Sell Bike', path: '/sell-bike' },
    { name: 'Showrooms', path: '/showrooms' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-2xl font-bold text-brand-primary">
              <BikeIcon className="h-8 w-8 mr-2" />
              <span>WheelWise</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${
                    isActive ? 'text-brand-primary' : 'text-gray-500 hover:text-brand-primary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white mt-auto">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <div className="flex justify-center items-center space-x-6 mb-4">
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/showrooms" className="text-sm text-gray-400 hover:text-white transition-colors">Find a Showroom</Link>
                <Link to="/sell-bike" className="text-sm text-gray-400 hover:text-white transition-colors">Sell your Bike</Link>
            </div>
            <div className="text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} WheelWise. All rights reserved.</p>
                <p className="mt-2">Your Ultimate Two-Wheeler Marketplace.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingCompareButton: React.FC = () => {
  const { compareList } = useContext(CompareContext);

  if (compareList.length === 0) {
    return null;
  }

  return (
    <Link to="/compare" className="fixed bottom-5 right-5 z-50 bg-brand-primary text-white rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300">
        <div className="flex items-center justify-center p-4">
            <span className="font-bold text-lg">{compareList.length}</span>
            <span className="ml-2 mr-1 hidden sm:inline">Vehicles to Compare</span>
            <ChevronRightIcon className="h-6 w-6" />
        </div>
    </Link>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <FloatingCompareButton />
      <Footer />
    </div>
  );
};

export default Layout;
