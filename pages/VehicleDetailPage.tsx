import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { VehicleContext } from '../context/VehicleContext';
import { Vehicle } from '../types';
import { CompareContext } from '../context/CompareContext';
import { generateReview } from '../services/geminiService';

interface AIReview {
    pros: string[];
    cons: string[];
}

const VehicleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { vehicles, removeVehicle, myVehicleIds } = useContext(VehicleContext);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [aiReview, setAiReview] = useState<AIReview | null>(null);
    const [isLoadingReview, setIsLoadingReview] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { compareList, toggleCompare } = useContext(CompareContext);

    useEffect(() => {
        const foundVehicle = vehicles.find(v => v.id === Number(id));
        setVehicle(foundVehicle || null);
        setAiReview(null);
        setError(null);
        setIsLoadingReview(false);
    }, [id, vehicles]);

    const handleGenerateReview = async () => {
        if (!vehicle) return;
        setIsLoadingReview(true);
        setError(null);
        try {
            const review = await generateReview(vehicle);
            setAiReview(review);
        } catch (err) {
            setError('Failed to generate AI review. Please try again later.');
            console.error(err);
        } finally {
            setIsLoadingReview(false);
        }
    };

    const handleRemove = () => {
        if (!vehicle) return;
        if (window.confirm('Are you sure you want to permanently remove this listing?')) {
            removeVehicle(vehicle.id);
            navigate('/browse');
        }
    };

    if (!vehicle) {
        return <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Vehicle not found</h2>
            <Link to="/browse" className="mt-4 inline-block text-brand-primary hover:underline">Go back to browse</Link>
        </div>;
    }

    const isComparing = compareList.some(v => v.id === vehicle.id);
    const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-brand-dark">{vehicle.brand} {vehicle.name}</h1>
                    <p className="text-3xl font-semibold text-brand-primary mt-4">{formatPrice(vehicle.price)}</p>
                    <p className="text-sm text-gray-500">Ex-showroom Price</p>
                    <p className="mt-4 text-gray-700">{vehicle.description}</p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button className="flex-1 bg-brand-secondary text-white py-3 px-6 rounded-md font-semibold hover:bg-emerald-600 transition-colors">
                            Book a Test Ride
                        </button>
                        <button onClick={() => toggleCompare(vehicle)} className={`flex-1 py-3 px-6 rounded-md font-semibold transition-colors ${isComparing ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                            {isComparing ? 'Remove from Compare' : 'Add to Compare'}
                        </button>
                        {myVehicleIds.includes(vehicle.id) && (
                            <button onClick={handleRemove} className="flex-grow w-full sm:flex-1 sm:w-auto bg-red-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-700 transition-colors">
                                Remove Listing
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(vehicle.specs).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-md flex justify-between">
                            <span className="font-semibold text-gray-600">{key}</span>
                            <span className="text-gray-800">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">AI-Powered Review</h2>
                {!aiReview && !isLoadingReview && (
                    <div className="text-center">
                        <button onClick={handleGenerateReview} className="bg-brand-primary text-white py-3 px-8 rounded-md font-semibold hover:bg-blue-800 transition-colors">
                            ✨ Generate Review
                        </button>
                    </div>
                )}
                {isLoadingReview && <div className="text-center">Generating...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}
                {aiReview && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-green-800 mb-2">Pros 👍</h3>
                            <ul className="list-disc list-inside space-y-1 text-green-700">
                                {aiReview.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                            </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-red-800 mb-2">Cons 👎</h3>
                            <ul className="list-disc list-inside space-y-1 text-red-700">
                                {aiReview.cons.map((con, i) => <li key={i}>{con}</li>)}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleDetailPage;
