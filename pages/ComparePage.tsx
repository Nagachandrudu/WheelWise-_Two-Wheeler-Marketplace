
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CompareContext } from '../context/CompareContext';
import { XIcon } from '../components/Icons';
import { Vehicle } from '../types';

const ComparePage: React.FC = () => {
    const { compareList, toggleCompare } = useContext(CompareContext);

    if (compareList.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Compare Vehicles</h1>
                <p className="mt-4 text-gray-600">You haven't selected any vehicles to compare.</p>
                <Link to="/browse" className="mt-6 inline-block bg-brand-primary text-white px-6 py-2 rounded-md font-semibold">
                    Start Browsing
                </Link>
            </div>
        );
    }
    
    const allSpecsKeys = [...new Set(compareList.flatMap(v => Object.keys(v.specs)))];
    const baseInfoKeys: (keyof Pick<Vehicle, 'price' | 'mileage' | 'engine' | 'power' | 'brakes'>)[] = ['price', 'mileage', 'engine', 'power', 'brakes'];

    const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);


    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-8">Compare Specifications</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse text-left">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="p-4 font-semibold text-lg w-1/4">Feature</th>
                            {compareList.map(vehicle => (
                                <th key={vehicle.id} className="p-4 w-1/4">
                                    <div className="flex flex-col items-center text-center relative">
                                        <img src={vehicle.imageUrl} alt={vehicle.name} className="w-40 h-32 object-cover rounded-md mb-2"/>
                                        <h3 className="font-bold text-lg">{vehicle.brand} {vehicle.name}</h3>
                                        <button onClick={() => toggleCompare(vehicle)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {baseInfoKeys.map(key => (
                            <tr key={key} className="border-b border-gray-200">
                                <td className="p-4 font-semibold capitalize">{key}</td>
                                {compareList.map(vehicle => (
                                    <td key={vehicle.id} className="p-4 text-center">
                                        {key === 'price' ? formatPrice(vehicle[key]) : vehicle[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr className="bg-gray-100">
                            <td colSpan={compareList.length + 1} className="p-4 font-bold text-lg">Detailed Specs</td>
                        </tr>
                         {allSpecsKeys.map(key => (
                            <tr key={key} className="border-b border-gray-200">
                                <td className="p-4 font-semibold">{key}</td>
                                {compareList.map(vehicle => (
                                    <td key={vehicle.id} className="p-4 text-center">
                                        {vehicle.specs[key] || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparePage;
