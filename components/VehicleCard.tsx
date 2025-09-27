import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle, FuelType } from '../types';
import { BoltIcon, GasPumpIcon, UserIcon, XIcon, HeartIcon, StarIcon } from './Icons';
import { CompareContext } from '../context/CompareContext';
import { VehicleContext } from '../context/VehicleContext';
import { AuthContext } from '../context/AuthContext';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { compareList, toggleCompare } = useContext(CompareContext);
  const { removeVehicle, myVehicleIds, toggleFavorite, isFavorite } = useContext(VehicleContext);
  const { user } = useContext(AuthContext);

  const isComparing = compareList.some(v => v.id === vehicle.id);
  const isFavorited = isFavorite(vehicle.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative group transform hover:-translate-y-1 transition-all duration-300">
       <div className="absolute -inset-0.5 animated-gradient-border-glow rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
       <div className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        <div className="absolute top-2 right-2 z-10 flex space-x-2">
          {user && (
            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className={`p-1.5 rounded-full transition-colors ${
                isFavorited ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-100'
              }`}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          )}
          {myVehicleIds.includes(vehicle.id) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Are you sure you want to remove this listing?')) {
                  removeVehicle(vehicle.id);
                }
              }}
              className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors"
              aria-label="Remove listing"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <Link to={`/vehicle/${vehicle.id}`} className="block">
          <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-48 object-cover" />
        </Link>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
              <h3 className="text-lg font-bold text-brand-dark">{vehicle.brand} {vehicle.name}</h3>
              <div className="flex items-center mt-1">
                  <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(vehicle.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({vehicle.reviews.length} reviews)</span>
              </div>
              <p className="text-2xl font-semibold text-brand-primary mt-2">{formatPrice(vehicle.price)}</p>
              <p className="text-sm text-gray-500">Ex-showroom price</p>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                  {vehicle.fuelType === FuelType.ELECTRIC && <BoltIcon className="h-4 w-4 mr-2 text-yellow-500" />}
                  {vehicle.fuelType === FuelType.PETROL && <GasPumpIcon className="h-4 w-4 mr-2 text-red-500" />}
                  {vehicle.fuelType === FuelType.MANUAL && <UserIcon className="h-4 w-4 mr-2 text-green-500" />}
                  <span>{vehicle.mileage}</span>
              </div>
              <div className="flex items-center">
                  <span className="font-semibold mr-1">Engine:</span>
                  <span>{vehicle.engine}</span>
              </div>
          </div>

          <div className="mt-4 flex space-x-2">
              <Link to={`/vehicle/${vehicle.id}`} className="flex-1 text-center bg-brand-secondary text-white py-2 px-4 rounded-md font-semibold btn-animated-secondary">
                  View Details
              </Link>
              <button
                  onClick={() => toggleCompare(vehicle)}
                  className={`flex-1 text-center py-2 px-4 rounded-md font-semibold ${
                      isComparing ? 'bg-red-500 text-white btn-animated-danger' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
              >
                  {isComparing ? 'Remove' : 'Compare'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;