import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { VehicleContext } from '../context/VehicleContext';
import { Vehicle, Review } from '../types';
import { CompareContext } from '../context/CompareContext';
import { AuthContext } from '../context/AuthContext';
import { generateReview } from '../services/geminiService';
import { StarIcon, UserIcon, BellIcon } from '../components/Icons';
import VehicleCard from '../components/VehicleCard';

interface AIReview {
    pros: string[];
    cons: string[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
    </div>
);

const ReviewForm: React.FC<{ vehicleId: number }> = ({ vehicleId }) => {
    const { addReview } = useContext(VehicleContext);
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0 && comment && user) {
            addReview(vehicleId, { userName: user.name, rating, comment });
            setRating(0);
            setComment('');
        }
    };
    
    return (
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            // FIX: Wrapped StarIcon in a button to correctly handle events.
                            // The StarIcon component is purely presentational and doesn't accept event handlers like `onClick`,
                            // which was causing the type error. This change moves the event handlers to a button element,
                            // which also improves accessibility for the rating input.
                            <button
                                type="button"
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <StarIcon
                                    className={`h-8 w-8 cursor-pointer ${
                                        (hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comment</label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-brand-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-800">
                    Submit Review
                </button>
            </form>
        </div>
    );
};


const VehicleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { vehicles, removeVehicle, myVehicleIds, togglePriceAlert, isAlertSet, priceAlerts } = useContext(VehicleContext);
    const { user } = useContext(AuthContext);
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

    const similarVehicles = useMemo(() => {
        if (!vehicle) return [];
        
        const priceMargin = 0.20; // 20% price difference
        const minPrice = vehicle.price * (1 - priceMargin);
        const maxPrice = vehicle.price * (1 + priceMargin);

        return vehicles
            .filter(v => 
                v.id !== vehicle.id &&
                v.type === vehicle.type &&
                v.price >= minPrice &&
                v.price <= maxPrice
            )
            .slice(0, 3);
    }, [vehicle, vehicles]);

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
    const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);
    const alertIsSet = isAlertSet(vehicle.id);
    const alertPrice = priceAlerts[vehicle.id];

    return (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-brand-dark">{vehicle.brand} {vehicle.name}</h1>
                    <div className="flex items-center mt-2">
                        <StarRating rating={vehicle.rating} />
                        <span className="ml-2 text-gray-600">({vehicle.reviews.length} customer reviews)</span>
                    </div>
                    <p className="text-3xl font-semibold text-brand-primary mt-4">{formatPrice(vehicle.price)}</p>
                    <p className="text-sm text-gray-500">Ex-showroom Price</p>
                    <p className="mt-4 text-gray-700">{vehicle.description}</p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to={`/test-ride?vehicleId=${vehicle.id}`} className="sm:col-span-2 text-center bg-brand-secondary text-white py-3 px-6 rounded-md font-semibold btn-animated-secondary transition-all duration-300">
                            Book a Test Ride
                        </Link>
                        <button onClick={() => toggleCompare(vehicle)} className={`py-3 px-6 rounded-md font-semibold ${isComparing ? 'bg-red-500 text-white btn-animated-danger' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                            {isComparing ? 'Remove from Compare' : 'Add to Compare'}
                        </button>
                        {user ? (
                            <button 
                                onClick={() => togglePriceAlert(vehicle.id, vehicle.price)} 
                                className={`flex items-center justify-center py-3 px-6 rounded-md font-semibold transition-colors ${alertIsSet ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                            >
                                <BellIcon className="h-5 w-5 mr-2" />
                                {alertIsSet ? 'Remove Alert' : 'Set Price Alert'}
                            </button>
                        ) : (
                             <Link to="/login" state={{ from: { pathname: `/vehicle/${vehicle.id}` }}} className="flex items-center justify-center py-3 px-6 rounded-md font-semibold transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300">
                                <BellIcon className="h-5 w-5 mr-2" />
                                Set Price Alert
                            </Link>
                        )}
                        {myVehicleIds.includes(vehicle.id) && (
                            <button onClick={handleRemove} className="sm:col-span-2 bg-red-600 text-white py-3 px-6 rounded-md font-semibold btn-animated-danger">
                                Remove Listing
                            </button>
                        )}
                    </div>
                     {user && alertIsSet && (
                        <p className="text-sm text-center text-gray-600 mt-3">
                            Alert is set for prices below {formatPrice(alertPrice)}.
                        </p>
                    )}
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
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="space-y-6">
                    {vehicle.reviews.length > 0 ? (
                        vehicle.reviews.map(review => (
                            <div key={review.id} className="border-b pb-4">
                                <div className="flex items-center mb-2">
                                    <UserIcon className="h-6 w-6 mr-2 text-gray-500"/>
                                    <span className="font-bold">{review.userName}</span>
                                    <span className="text-gray-500 text-sm mx-2">•</span>
                                    <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                                <StarRating rating={review.rating} />
                                <p className="mt-2 text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to review this vehicle!</p>
                    )}
                </div>
                {user ? (
                    <ReviewForm vehicleId={vehicle.id} />
                ) : (
                    <div className="mt-8 text-center bg-gray-100 p-6 rounded-lg">
                        <p>You must be logged in to write a review.</p>
                        <Link to="/login" state={{ from: { pathname: `/vehicle/${vehicle.id}` }}} className="mt-2 inline-block text-brand-primary font-semibold hover:underline">
                            Login Now
                        </Link>
                    </div>
                )}
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

            {similarVehicles.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-brand-dark mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {similarVehicles.map(v => (
                            <VehicleCard key={v.id} vehicle={v} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleDetailPage;