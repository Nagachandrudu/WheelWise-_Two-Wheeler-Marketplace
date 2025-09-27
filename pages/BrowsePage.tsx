
import React, { useState, useMemo, useContext, useEffect } from 'react';
import { VehicleContext } from '../context/VehicleContext';
import { Vehicle, VehicleType, FuelType } from '../types';
import VehicleCard from '../components/VehicleCard';

const FilterSidebar: React.FC<{
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  resetFilters: () => void;
  brands: string[];
  maxPrice: number;
  minPrice: number;
}> = ({ filters, setFilters, resetFilters, brands, maxPrice, minPrice }) => {

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);


  return (
    <aside className="w-full lg:w-1/4 lg:pr-8">
      <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Filters</h3>
          <button onClick={resetFilters} className="text-sm text-brand-primary hover:underline">Reset</button>
        </div>
        
        {/* Search */}
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Model</label>
            <input 
                type="text" 
                placeholder="e.g. Splendor"
                value={filters.search}
                onChange={e => handleFilterChange('search', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <input 
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.price}
            onChange={e => handleFilterChange('price', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2 text-gray-600">Up to {formatCurrency(filters.price)}</div>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Brand</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input 
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => {
                      const newBrands = filters.brands.includes(brand)
                        ? filters.brands.filter((b: string) => b !== brand)
                        : [...filters.brands, brand];
                      handleFilterChange('brands', newBrands);
                  }}
                  className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                />
                <span className="ml-2 text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Vehicle Type */}
        <div className="mb-6">
            <h4 className="font-semibold mb-2">Vehicle Type</h4>
            <div className="flex space-x-4">
                 {Object.values(VehicleType).map(type => (
                    <button key={type} onClick={() => handleFilterChange('type', filters.type === type ? null : type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${filters.type === type ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>
                        {type}
                    </button>
                 ))}
            </div>
        </div>

        {/* Fuel Type */}
        <div>
            <h4 className="font-semibold mb-2">Fuel Type</h4>
            <div className="flex space-x-4">
                 {Object.values(FuelType).map(type => (
                    <button key={type} onClick={() => handleFilterChange('fuelType', filters.fuelType === type ? null : type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${filters.fuelType === type ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>
                        {type}
                    </button>
                 ))}
            </div>
        </div>
      </div>
    </aside>
  );
};

const BrowsePage: React.FC = () => {
  const { vehicles } = useContext(VehicleContext);

  const { BRANDS, MAX_PRICE, MIN_PRICE } = useMemo(() => {
    if (vehicles.length === 0) {
        return { BRANDS: [], MAX_PRICE: 1000000, MIN_PRICE: 0 };
    }
    const brands = [...new Set(vehicles.map(v => v.brand))].sort();
    const maxPrice = Math.max(...vehicles.map(v => v.price));
    const minPrice = Math.min(...vehicles.map(v => v.price));
    return { BRANDS: brands, MAX_PRICE: maxPrice, MIN_PRICE: minPrice };
  }, [vehicles]);
  
  const initialFilters = useMemo(() => ({
      search: '',
      price: MAX_PRICE,
      brands: [],
      type: null,
      fuelType: null,
  }), [MAX_PRICE]);

  const [filters, setFilters] = useState(initialFilters);
  
  useEffect(() => {
      setFilters(initialFilters);
  }, [initialFilters]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle: Vehicle) => {
      const { search, price, brands, type, fuelType } = filters;
      if (search && !vehicle.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (price < vehicle.price) return false;
      if (brands.length > 0 && !brands.includes(vehicle.brand)) return false;
      if (type && vehicle.type !== type) return false;
      if (fuelType && vehicle.fuelType !== fuelType) return false;
      return true;
    });
  }, [vehicles, filters]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <div className="flex flex-col lg:flex-row">
      <FilterSidebar 
        filters={filters} 
        setFilters={setFilters} 
        resetFilters={resetFilters}
        brands={BRANDS}
        maxPrice={MAX_PRICE}
        minPrice={MIN_PRICE}
      />
      <main className="w-full lg:w-3/4 mt-8 lg:mt-0">
        <h2 className="text-3xl font-bold mb-6">Explore Vehicles ({filteredVehicles.length})</h2>
        {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-gray-600">No vehicles match your criteria.</p>
                <button onClick={resetFilters} className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-md btn-animated-primary">Clear Filters</button>
            </div>
        )}
      </main>
    </div>
  );
};

export default BrowsePage;