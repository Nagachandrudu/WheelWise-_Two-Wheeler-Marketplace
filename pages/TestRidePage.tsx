

import React, { useState, useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { VehicleContext } from '../context/VehicleContext';
import { SHOWROOMS } from '../constants';

const TestRidePage: React.FC = () => {
    const { vehicles } = useContext(VehicleContext);
    const [searchParams] = useSearchParams();
    const [submitted, setSubmitted] = useState(false);

    const getInitialFormData = () => ({
        name: '',
        email: '',
        phone: '',
        vehicleId: searchParams.get('vehicleId') || '',
        showroomId: '',
        date: '',
        timeSlot: 'Morning',
    });

    const [formData, setFormData] = useState(getInitialFormData());

    useEffect(() => {
        setFormData(getInitialFormData());
        setSubmitted(false);
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Test ride booking submitted:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        const selectedVehicle = vehicles.find(v => v.id === Number(formData.vehicleId));
        const selectedShowroom = SHOWROOMS.find(s => s.id === Number(formData.showroomId));

        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h1 className="text-3xl font-bold text-brand-secondary">Booking Confirmed!</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Your test ride for the <strong>{selectedVehicle?.brand} {selectedVehicle?.name}</strong> at <strong>{selectedShowroom?.name}</strong> has been scheduled.
                </p>
                <p className="mt-2 text-gray-600">
                    A confirmation email has been sent to you. We look forward to seeing you!
                </p>
                <div className="mt-8">
                    <Link to="/browse" className="px-6 py-3 bg-brand-primary text-white rounded-md font-semibold hover:bg-blue-800 transition-colors">
                        Explore More Vehicles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-brand-dark mb-4">Book Your Test Ride</h1>
            <p className="text-center text-gray-600 mb-8">
                Experience your favorite two-wheeler firsthand. Fill out the form below to schedule a ride at your convenience.
            </p>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700">Select Vehicle</label>
                        <select id="vehicleId" name="vehicleId" value={formData.vehicleId} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                            <option value="" disabled>-- Choose a vehicle --</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.id} value={vehicle.id}>{vehicle.brand} {vehicle.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="showroomId" className="block text-sm font-medium text-gray-700">Select Showroom</label>
                        <select id="showroomId" name="showroomId" value={formData.showroomId} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                            <option value="" disabled>-- Choose a showroom --</option>
                            {SHOWROOMS.map(showroom => (
                                <option key={showroom.id} value={showroom.id}>{showroom.name}, {showroom.city}</option>
                            ))}
                        </select>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
                    </div>
                    <div>
                        <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">Time Slot</label>
                        <select id="timeSlot" name="timeSlot" value={formData.timeSlot} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
                            <option value="Morning">Morning (9am - 12pm)</option>
                            <option value="Afternoon">Afternoon (1pm - 4pm)</option>
                            <option value="Evening">Evening (5pm - 7pm)</option>
                        </select>
                    </div>
                </div>
                <div className="text-center pt-4">
                    <button type="submit" className="w-full md:w-auto px-12 py-3 bg-brand-primary text-white rounded-md font-semibold text-lg btn-animated-primary">
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestRidePage;