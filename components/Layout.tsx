
import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BikeIcon, ChevronRightIcon, BellIcon, XIcon, DashboardIcon, WrenchIcon } from './Icons';
import { CompareContext } from '../context/CompareContext';
import { AuthContext } from '../context/AuthContext';
import { VehicleContext } from '../context/VehicleContext';

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const { priceDropNotifications, dismissPriceDropNotification } = useContext(VehicleContext);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationRef]);

  const navItems = [
    { name: 'Browse', path: '/browse' },
    { name: 'Test Ride', path: '/test-ride' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Sell Bike', path: '/sell-bike' },
    { name: 'Showrooms', path: '/showrooms' },
  ];
  
  const loggedInNavItems = [
      { name: 'My Favorites', path: '/favorites' },
  ];
  
  const dealerNavItems = [
      { name: 'Dealer Dashboard', path: '/dealer-dashboard' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

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
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link-hover text-base font-medium ${
                    isActive ? 'text-brand-primary' : 'text-gray-500'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/maintenance-helper"
              className={({ isActive }) =>
                `nav-link-hover flex items-center text-base font-medium ${
                  isActive ? 'text-brand-primary' : 'text-gray-500'
                }`
              }
            >
              <WrenchIcon className="h-5 w-5 mr-1.5" />
              Maintenance Helper
            </NavLink>
            {user && !user.isDealer && loggedInNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link-hover text-base font-medium ${
                    isActive ? 'text-brand-primary' : 'text-gray-500'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {user && user.isDealer && dealerNavItems.map((item) => (
               <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link-hover flex items-center text-base font-medium ${
                    isActive ? 'text-brand-primary' : 'text-gray-500'
                  }`
                }
              >
                <DashboardIcon className="h-5 w-5 mr-1.5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
           <div className="hidden md:flex items-center space-x-4">
            {user ? (
                <>
                    <div className="relative" ref={notificationRef}>
                        <button onClick={() => setNotificationsOpen(prev => !prev)} className="relative text-gray-500 hover:text-brand-primary p-2 rounded-full hover:bg-gray-100">
                            <BellIcon className="h-6 w-6" />
                            {priceDropNotifications.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                            )}
                        </button>
                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border">
                                <div className="p-3 font-bold text-lg border-b">Notifications</div>
                                {priceDropNotifications.length > 0 ? (
                                    <ul className="py-1 max-h-80 overflow-y-auto">
                                        {priceDropNotifications.map(vehicle => (
                                            <li key={vehicle.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                                <div className="p-3">
                                                   <div className="flex justify-between items-start">
                                                        <Link to={`/vehicle/${vehicle.id}`} onClick={() => setNotificationsOpen(false)} className="flex-grow">
                                                            <p className="font-semibold text-gray-800">{vehicle.brand} {vehicle.name}</p>
                                                            <p className="text-sm text-green-600">Price dropped to <span className="font-bold">{formatPrice(vehicle.price)}</span>!</p>
                                                        </Link>
                                                        <button onClick={() => dismissPriceDropNotification(vehicle.id)} className="ml-2 text-gray-400 hover:text-gray-600 p-1 rounded-full flex-shrink-0">
                                                            <XIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="p-4 text-center text-gray-500">No new notifications.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <span className="text-gray-600">Welcome, {user.name}! {user.isDealer && '(Dealer)'}</span>
                    <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md btn-animated-danger">
                        Logout
                    </button>
                </>
            ) : (
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md btn-animated-primary">
                    Login
                </Link>
            )}
           </div>
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