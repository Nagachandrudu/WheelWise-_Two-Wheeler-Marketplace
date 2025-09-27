import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UPCOMING_VEHICLES } from '../constants';
import { VehicleContext } from '../context/VehicleContext';
import { AuthContext } from '../context/AuthContext';
import { getAIRecommendations } from '../services/geminiService';
import VehicleCard from '../components/VehicleCard';
import HeroAnimation from '../components/HeroAnimation';
import { Vehicle } from '../types';
import { BikeIcon, ScooterIcon, ChevronRightIcon, BicycleIcon, CalendarIcon } from '../components/Icons';

const HomePage: React.FC = () => {
  const { vehicles, favorites } = useContext(VehicleContext);
  const { user } = useContext(AuthContext);
  
  const [recommendations, setRecommendations] = useState<Vehicle[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  const featuredBikes = vehicles.filter(v => v.type === 'Bike').slice(0, 3);
  const featuredScooters = vehicles.filter(v => v.type === 'Scooter').slice(0, 3);
  const featuredBicycles = vehicles.filter(v => v.type === 'Bicycle').slice(0, 3);

  const favoriteVehicles = useMemo(() => {
    return vehicles.filter(v => favorites.includes(v.id));
  }, [favorites, vehicles]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user && favoriteVehicles.length > 0) {
        setIsLoadingRecs(true);
        setRecommendations([]);
        try {
          const candidateVehicles = vehicles.filter(v => !favorites.includes(v.id));
          const recommendedIds = await getAIRecommendations(favoriteVehicles, candidateVehicles);
          const recommendedVehicles = vehicles.filter(v => recommendedIds.includes(v.id));
          setRecommendations(recommendedVehicles);
        } catch (error) {
          console.error("Failed to fetch AI recommendations:", error);
        } finally {
          setIsLoadingRecs(false);
        }
      } else {
        setRecommendations([]);
      }
    };
    fetchRecommendations();
  }, [user, favorites, vehicles]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative text-center py-16 px-4 bg-brand-light rounded-lg overflow-hidden">
        <HeroAnimation className="absolute top-0 left-0 w-full h-full z-0 opacity-50" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Find Your Perfect Ride</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the widest range of bikes, scooters, and electric vehicles. Compare, calculate, and book a test ride today!
          </p>
          <Link
            to="/browse"
            className="mt-8 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary btn-animated-primary"
          >
            Explore Now <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* AI Recommendations Section */}
      {user && favorites.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-6 flex items-center">
            ✨ AI Recommendations For You
          </h2>
          {isLoadingRecs ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Generating personalized recommendations...</p>
            </div>
          ) : (
            recommendations.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )
          )}
        </div>
      )}

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

      {/* Featured Bicycles Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-brand-dark flex items-center"><BicycleIcon className="mr-3 h-8 w-8 text-brand-primary"/>Featured Bicycles</h2>
            <Link to="/browse" className="text-brand-primary hover:underline font-semibold">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBicycles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
      
      {/* Upcoming Launches Section */}
      <div>
        <h2 className="text-3xl font-bold text-brand-dark mb-6 text-center">Upcoming Launches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {UPCOMING_VEHICLES.map(vehicle => (
            <div key={vehicle.name} className="bg-white rounded-lg shadow-md overflow-hidden flex p-4">
              <img src={vehicle.imageUrl} alt={vehicle.name} className="w-32 h-32 object-cover rounded-md flex-shrink-0" />
              <div className="ml-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-brand-dark">{vehicle.brand} {vehicle.name}</h3>
                  <p className="text-gray-600 mt-2">{vehicle.description}</p>
                </div>
                <div className="flex items-center text-sm font-semibold text-brand-secondary mt-3">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>Expected Launch: {vehicle.launchDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;