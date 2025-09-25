import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle, FuelType } from '../types';
import { BoltIcon, GasPumpIcon, UserIcon, XIcon } from './Icons';
import { CompareContext } from '../context/CompareContext';
import { VehicleContext } from '../context/VehicleContext';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { compareList, toggleCompare } = useContext(CompareContext);
  const { removeVehicle, myVehicleIds } = useContext(VehicleContext);
  const isComparing = compareList.some(v => v.id === vehicle.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      {myVehicleIds.includes(vehicle.id) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to remove this listing?')) {
              removeVehicle(vehicle.id);
            }
          }}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors z-10"
          aria-label="Remove listing"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
            <h3 className="text-lg font-bold text-brand-dark">{vehicle.brand} {vehicle.name}</h3>
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
            <Link to={`/vehicle/${vehicle.id}`} className="flex-1 text-center bg-brand-secondary text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors duration-300 font-semibold">
                View Details
            </Link>
            <button
                onClick={() => toggleCompare(vehicle)}
                className={`flex-1 text-center py-2 px-4 rounded-md transition-colors duration-300 font-semibold ${
                    isComparing ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
                {isComparing ? 'Remove' : 'Compare'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
