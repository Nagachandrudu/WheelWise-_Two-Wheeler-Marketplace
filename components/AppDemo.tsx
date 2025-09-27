
import React, { useState, useEffect } from 'react';
import { BikeIcon, GasPumpIcon } from './Icons';

interface AppDemoProps {
    onFinish: () => void;
}

const steps = [
    { text: "Welcome to WheelWise", duration: 2500 },
    { text: "Explore a vast collection of two-wheelers...", duration: 3500 },
    { text: "Compare your favorites side-by-side...", duration: 3500 },
    { text: "And find your perfect ride!", duration: 3000 },
];

const DemoCard: React.FC<{ brand: string; name: string; price: string; className: string }> = ({ brand, name, price, className }) => (
    <div className={`bg-white rounded-lg shadow-xl p-4 w-48 text-left ${className}`}>
        <div className="w-full h-20 bg-gray-200 rounded-md mb-3"></div>
        <h3 className="font-bold text-sm text-brand-dark">{brand} {name}</h3>
        <p className="font-semibold text-brand-primary mt-1">{price}</p>
        <div className="flex items-center mt-2">
            <GasPumpIcon className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-xs text-gray-500">65 kmpl</span>
        </div>
    </div>
);

const CompareView: React.FC<{ className: string }> = ({ className }) => (
    <div className={`flex space-x-4 ${className}`}>
        <div className="bg-white rounded-lg shadow-xl p-4 w-48 text-left">
            <div className="w-full h-20 bg-gray-200 rounded-md mb-3"></div>
            <h3 className="font-bold text-sm text-brand-dark">Hero Splendor</h3>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-4 w-48 text-left">
            <div className="w-full h-20 bg-gray-200 rounded-md mb-3"></div>
            <h3 className="font-bold text-sm text-brand-dark">Honda Activa</h3>
        </div>
    </div>
);


const AppDemo: React.FC<AppDemoProps> = ({ onFinish }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step >= steps.length) {
            onFinish();
            return;
        }

        const timer = setTimeout(() => {
            setStep(s => s + 1);
        }, steps[step].duration);

        return () => clearTimeout(timer);
    }, [step, onFinish]);

    return (
        <div className="fixed inset-0 bg-brand-dark/90 z-[100] flex flex-col items-center justify-center animate-fade-in">
            <div className="absolute top-5 right-5">
                <button onClick={onFinish} className="text-white/70 hover:text-white font-semibold py-2 px-4 rounded-full">
                    Skip Demo
                </button>
            </div>

            <div className="text-center">
                <div className="h-64 flex items-center justify-center">
                    {step === 0 && <BikeIcon className="h-24 w-24 text-white animate-pulse-slow" />}
                    {step === 1 && (
                        <div className="flex space-x-4">
                            <DemoCard brand="Hero" name="Splendor" price="₹75,000" className="animate-slide-in-up opacity-0" />
                            <DemoCard brand="Honda" name="Activa" price="₹80,000" className="animate-slide-in-up opacity-0 animation-delay-200" />
                            <DemoCard brand="Ather" name="450X" price="₹1,60,000" className="animate-slide-in-up opacity-0 animation-delay-400" />
                        </div>
                    )}
                     {step === 2 && (
                        <CompareView className="animate-fade-in" />
                    )}
                     {step === 3 && (
                        <div className="animate-fade-in">
                             <BikeIcon className="h-24 w-24 text-white" />
                        </div>
                    )}
                </div>

                <div className="h-16">
                    {steps.map((s, index) => (
                        step === index && (
                             <h2 key={index} className="text-3xl font-bold text-white animate-fade-in-slow">
                                {s.text}
                            </h2>
                        )
                    ))}
                </div>
            </div>

            <div className="absolute bottom-10 w-full px-10">
                <div className="w-full bg-white/20 h-1 rounded-full">
                    <div
                        className="bg-white h-1 rounded-full transition-all duration-500 ease-linear"
                        style={{ width: `${(step / (steps.length -1)) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppDemo;
