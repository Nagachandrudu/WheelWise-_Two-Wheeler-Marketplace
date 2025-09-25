
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { VehicleContext } from '../context/VehicleContext';
import { VehicleType, FuelType } from '../types';

const SellBikePage: React.FC = () => {
    const { addVehicle } = useContext(VehicleContext);
    const [submitted, setSubmitted] = useState(false);
    const initialFormData = {
        name: '', brand: '', price: '', imageUrl: '',
        type: VehicleType.BIKE, fuelType: FuelType.PETROL,
        mileage: '', engine: '', power: '', brakes: 'Disc',
        description: '', engineType: '', displacement: '', fuelCapacity: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newVehicle = {
            name: formData.name,
            brand: formData.brand,
            price: Number(formData.price),
            type: formData.type,
            fuelType: formData.fuelType,
            imageUrl: formData.imageUrl || `https://source.unsplash.com/random/600x400/?${formData.type}`,
            mileage: formData.mileage,
            engine: formData.engine,
            power: formData.power,
            brakes: formData.brakes,
            description: formData.description,
            specs: {
                'Engine Type': formData.engineType,
                'Displacement': formData.displacement,
                'Max Power': formData.power,
                'Fuel Capacity': formData.fuelCapacity,
            },
        };
        addVehicle(newVehicle);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h1 className="text-3xl font-bold text-brand-secondary">Thank You!</h1>
                <p className="mt-4 text-lg text-gray-700">Your bike has been listed successfully and is now available for others to browse.</p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/browse" className="w-full sm:w-auto px-6 py-3 bg-brand-primary text-white rounded-md font-semibold hover:bg-blue-800 transition-colors">
                        Browse All Vehicles
                    </Link>
                    <button 
                        onClick={() => { 
                            setSubmitted(false); 
                            setFormData(initialFormData); 
                        }} 
                        className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition-colors">
                        Sell Another Bike
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-brand-dark mb-4">List Your Vehicle for Sale</h1>
            <p className="text-center text-gray-600 mb-8">Fill out the form below to add your vehicle to our marketplace.</p>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-8">
                
                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Brand</label>
                            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.png" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>

                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                {Object.values(VehicleType).map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                            <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                {Object.values(FuelType).map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-b pb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance & Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mileage (e.g., 50 kmpl)</label>
                            <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Engine (e.g., 125 cc)</label>
                            <input type="text" name="engine" value={formData.engine} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Max Power (e.g., 8 PS)</label>
                            <input type="text" name="power" value={formData.power} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Brakes Type</label>
                             <select name="brakes" value={formData.brakes} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option value="Disc">Disc</option>
                                <option value="Drum">Drum</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Spec: Engine Type</label>
                            <input type="text" name="engineType" value={formData.engineType} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Spec: Displacement</label>
                            <input type="text" name="displacement" value={formData.displacement} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Spec: Fuel Capacity</label>
                            <input type="text" name="fuelCapacity" value={formData.fuelCapacity} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                </div>

                <div className="text-center pt-4">
                    <button type="submit" className="w-full md:w-auto px-12 py-3 bg-brand-primary text-white rounded-md font-semibold text-lg hover:bg-blue-800 transition-colors">
                        List Your Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellBikePage;
