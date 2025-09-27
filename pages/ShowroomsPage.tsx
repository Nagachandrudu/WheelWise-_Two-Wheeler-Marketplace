
import React, { useState } from 'react';
import { SHOWROOMS } from '../constants';
import { MapPinIcon, PhoneIcon } from '../components/Icons';

const ShowroomsPage: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('Ongole');
    const cities = [...new Set(SHOWROOMS.map(s => s.city))];
    const filteredShowrooms = SHOWROOMS.filter(s => s.city === selectedCity);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-brand-dark mb-4">Find a Showroom Near You</h1>
            <p className="text-center text-lg text-gray-600 mb-8">Explore our network of trusted showrooms to get a hands-on experience.</p>
            
            <div className="flex justify-center mb-8">
                <div className="bg-white p-2 rounded-full shadow-md">
                    {cities.map(city => (
                        <button 
                            key={city}
                            onClick={() => setSelectedCity(city)}
                            className={`px-6 py-2 rounded-full text-base font-semibold transition-colors ${selectedCity === city ? 'bg-brand-primary text-white' : 'text-gray-600'}`}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredShowrooms.map(showroom => (
                    <div key={showroom.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-brand-dark">{showroom.name}</h2>
                        <div className="mt-4 space-y-3 text-gray-700">
                           <div className="flex items-start">
                                <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                                <span>{showroom.address}, {showroom.city}</span>
                            </div>
                             <div className="flex items-center">
                                <PhoneIcon className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                                <span>{showroom.phone}</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <a href={`https://www.google.com/maps?q=${showroom.lat},${showroom.lng}`} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-brand-secondary text-white py-2 px-4 rounded-md font-semibold hover:bg-emerald-600 transition-colors">
                                View on Map
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowroomsPage;
