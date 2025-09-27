import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { VehicleContext } from '../context/VehicleContext';
import VehicleCard from '../components/VehicleCard';

const FavoritesPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { vehicles, favorites } = useContext(VehicleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/favorites' } } });
    }
  }, [user, navigate]);

  if (!user) {
    // This will be briefly rendered before the redirect happens
    return null;
  }

  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id));

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-brand-dark mb-4">My Favorites</h1>
      {favoriteVehicles.length > 0 ? (
        <>
            <p className="text-center text-lg text-gray-600 mb-8">Your saved collection of top rides.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
            </div>
        </>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-gray-600">You haven't added any favorites yet.</p>
            <p className="text-gray-500 mt-2">Click the heart icon on any vehicle to save it here.</p>
            <Link to="/browse" className="mt-6 inline-block bg-brand-primary text-white px-6 py-3 rounded-md font-semibold btn-animated-primary">
                Start Browsing
            </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;