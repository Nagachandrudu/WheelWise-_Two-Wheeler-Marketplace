
import React, { useState } from 'react';

const SellBikePage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h1 className="text-3xl font-bold text-brand-secondary">Thank You!</h1>
                <p className="mt-4 text-lg text-gray-700">Your bike details have been submitted. Our team will review the information and get in touch with you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-2 bg-brand-primary text-white rounded-md font-semibold">
                    Sell Another Bike
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-brand-dark mb-8">Sell Your Bike</h1>
            <p className="text-center text-gray-600 mb-8">Fill out the form below to get the best price for your used bike.</p>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <input type="text" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Model</label>
                        <input type="text" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year of Purchase</label>
                        <input type="number" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kilometers Driven</label>
                        <input type="number" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input type="tel" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
                    <input type="file" multiple className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand-primary hover:file:bg-blue-200"/>
                </div>
                <div className="text-center pt-4">
                    <button type="submit" className="w-full md:w-auto px-12 py-3 bg-brand-primary text-white rounded-md font-semibold text-lg hover:bg-blue-800 transition-colors">
                        Get Valuation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellBikePage;
