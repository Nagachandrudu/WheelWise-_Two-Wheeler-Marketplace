

import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { VehicleContext } from '../context/VehicleContext';
import { VehicleType } from '../types';
import { StarIcon, BikeIcon, ScooterIcon, BicycleIcon } from '../components/Icons';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-brand-light p-3 rounded-full mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-brand-dark">{value}</p>
        </div>
    </div>
);

const InventoryChart: React.FC<{ data: { type: VehicleType, count: number }[] }> = ({ data }) => {
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    if (totalCount === 0) {
        return <p className="text-gray-500 text-center">No inventory to display.</p>;
    }

    const typeColors: { [key in VehicleType]: string } = {
        [VehicleType.BIKE]: 'bg-blue-500',
        [VehicleType.SCOOTER]: 'bg-emerald-500',
        [VehicleType.BICYCLE]: 'bg-amber-500',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Inventory Breakdown</h3>
            <div className="flex w-full h-8 rounded-full overflow-hidden bg-gray-200">
                {data.map(({ type, count }) => (
                    <div
                        key={type}
                        className={`${typeColors[type]}`}
                        style={{ width: `${(count / totalCount) * 100}%` }}
                        title={`${type}: ${count}`}
                    ></div>
                ))}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                {data.map(({ type, count }) => (
                    <div key={type} className="flex items-center text-sm">
                        <span className={`h-3 w-3 rounded-full mr-2 ${typeColors[type]}`}></span>
                        <span>{type} ({count})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const DealerDashboardPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { vehicles, myVehicleIds } = useContext(VehicleContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isDealer) {
            navigate('/login');
        }
    }, [user, navigate]);

    const myVehicles = useMemo(() => vehicles.filter(v => myVehicleIds.includes(v.id)), [vehicles, myVehicleIds]);
    
    const stats = useMemo(() => {
        const totalListings = myVehicles.length;
        const totalValue = myVehicles.reduce((sum, v) => sum + v.price, 0);
        const totalRatingSum = myVehicles.reduce((sum, v) => sum + (v.rating > 0 ? v.rating * v.reviews.length : 0), 0);
        const totalReviews = myVehicles.reduce((sum, v) => sum + v.reviews.length, 0);
        const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews) : 0;
        
        return {
            totalListings,
            totalValue,
            averageRating
        };
    }, [myVehicles]);

    const inventoryByType = useMemo(() => {
        const counts = {
            [VehicleType.BIKE]: 0,
            [VehicleType.SCOOTER]: 0,
            [VehicleType.BICYCLE]: 0,
        };
        myVehicles.forEach(v => {
            if (v.type in counts) {
                counts[v.type]++;
            }
        });
        return Object.entries(counts).map(([type, count]) => ({ type: type as VehicleType, count })).filter(item => item.count > 0);
    }, [myVehicles]);

    const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

    if (!user || !user.isDealer) {
        return null; // Render nothing while redirecting
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-brand-dark">Dealer Dashboard</h1>
                <Link to="/sell-bike" className="px-6 py-2 bg-brand-primary text-white rounded-md font-semibold btn-animated-primary">
                    + Add New Vehicle
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Listings" value={stats.totalListings.toString()} icon={<BikeIcon className="h-6 w-6 text-brand-primary" />} />
                <StatCard title="Total Inventory Value" value={formatPrice(stats.totalValue)} icon={<span className="text-2xl font-bold text-brand-primary">₹</span>} />
                <StatCard title="Average Rating" value={stats.averageRating.toFixed(1)} icon={<StarIcon className="h-6 w-6 text-brand-primary" />} />
            </div>

            {/* Inventory Chart */}
            <InventoryChart data={inventoryByType} />

            {/* Listings Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Your Listings</h3>
                <div className="overflow-x-auto">
                    {myVehicles.length > 0 ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-3">Vehicle</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Rating</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myVehicles.map(vehicle => (
                                    <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-semibold">{vehicle.brand} {vehicle.name}</td>
                                        <td className="p-3">{formatPrice(vehicle.price)}</td>
                                        <td className="p-3">{vehicle.type}</td>
                                        <td className="p-3 flex items-center">
                                            <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                            {vehicle.rating} ({vehicle.reviews.length})
                                        </td>
                                        <td className="p-3">
                                            <Link to={`/vehicle/${vehicle.id}`} className="text-brand-primary hover:underline font-semibold">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                         <div className="text-center py-8">
                            <p className="text-gray-600">You haven't listed any vehicles yet.</p>
                            <Link to="/sell-bike" className="mt-4 inline-block bg-brand-secondary text-white px-5 py-2 rounded-md font-semibold btn-animated-secondary">
                                List Your First Vehicle
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DealerDashboardPage;