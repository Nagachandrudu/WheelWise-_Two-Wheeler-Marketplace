
import React from 'react';
import { Link } from 'react-router-dom';
import { VEHICLES, UPCOMING_VEHICLES } from '../constants';
import VehicleCard from '../components/VehicleCard';
import { BikeIcon, ScooterIcon, ChevronRightIcon } from '../components/Icons';

const HomePage: React.FC = () => {
  const featuredBikes = VEHICLES.filter(v => v.type === 'Bike').slice(0, 3);
  const featuredScooters = VEHICLES.filter(v => v.type === 'Scooter').slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-brand-light rounded-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Find Your Perfect Ride</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the widest range of bikes, scooters, and electric vehicles. Compare, calculate, and book a test ride today!
        </p>
        <Link
          to="/browse"
          className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-blue-800"
        >
          Explore Now <ChevronRightIcon className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Featured Bikes Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-brand-dark flex items-center"><BikeIcon className="mr-3 h-8 w-8 text-brand-primary"/>Featured Bikes</h2>
            <Link to="/browse" className="text-brand-primary hover:underline font-semibold">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBikes.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>

      {/* Featured Scooters Section */}
       <div>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-brand-dark flex items-center"><ScooterIcon className="mr-3 h-8 w-8 text-brand-primary"/>Popular Scooters</h2>
            <Link to="/browse" className="text-brand-primary hover:underline font-semibold">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredScooters.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
      
      {/* Upcoming Launches Section */}
      <div>
        <h2 className="text-3xl font-bold text-brand-dark mb-6 text-center">Upcoming Launches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {UPCOMING_VEHICLES.map(vehicle => (
            <div key={vehicle.name} className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-4">
              <img src={vehicle.imageUrl} alt={vehicle.name} className="w-32 h-32 object-cover rounded-md" />
              <div className="ml-4">
                <h3 className="text-xl font-bold text-brand-dark">{vehicle.brand} {vehicle.name}</h3>
                <p className="text-gray-600 mt-2">{vehicle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
