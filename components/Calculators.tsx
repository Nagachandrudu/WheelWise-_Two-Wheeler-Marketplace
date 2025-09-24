
import React, { useState, useMemo } from 'react';

export const EMICalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000);
  const [interest, setInterest] = useState(8.5);
  const [tenure, setTenure] = useState(3); // in years

  const emi = useMemo(() => {
    if (amount <= 0 || interest <= 0 || tenure <= 0) return 0;
    const principal = amount;
    const rate = interest / 12 / 100;
    const time = tenure * 12;
    const calculatedEmi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return isFinite(calculatedEmi) ? calculatedEmi : 0;
  }, [amount, interest, tenure]);

  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - amount;
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-brand-dark">Loan EMI Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            <input type="range" min="10000" max="1000000" step="1000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
            <input type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            <input type="range" min="5" max="20" step="0.1" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
            <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            <input type="range" min="1" max="7" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        {/* Results */}
        <div className="flex flex-col items-center justify-center bg-brand-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Your Monthly EMI</h3>
            <p className="text-4xl font-bold text-brand-primary my-2">{formatCurrency(emi)}</p>
            <div className="w-full mt-4 text-center">
                <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Total Interest Payable</span>
                    <span className="font-semibold text-gray-800">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-600">Total Payment</span>
                    <span className="font-semibold text-gray-800">{formatCurrency(totalPayable)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const FuelCostCalculator: React.FC = () => {
    const [dailyRun, setDailyRun] = useState(40);
    const [petrolPrice, setPetrolPrice] = useState(105);
    const [petrolMileage, setPetrolMileage] = useState(45);
    const [electricityPrice, setElectricityPrice] = useState(8);
    const [evMileage, setEvMileage] = useState(100); // km per charge

    const savings = useMemo(() => {
        const monthlyRun = dailyRun * 30;
        const petrolCost = (monthlyRun / petrolMileage) * petrolPrice;
        const evCost = (monthlyRun / evMileage) * electricityPrice; // Assuming 1 charge = 1 unit of electricity, for simplicity. Better would be battery capacity. Let's use 3kWh battery for 100km.
        const evCostRevised = (monthlyRun / evMileage) * 3 * electricityPrice; // 3kWh battery example

        const monthlySaving = petrolCost - evCostRevised;
        return {
            monthly: isFinite(monthlySaving) ? monthlySaving : 0,
            yearly: isFinite(monthlySaving) ? monthlySaving * 12 : 0,
        }
    }, [dailyRun, petrolPrice, petrolMileage, electricityPrice, evMileage]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-brand-dark">EV vs Petrol Fuel Cost Calculator</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Your Usage</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Daily Running (km)</label>
                        <input type="number" value={dailyRun} onChange={e => setDailyRun(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     <h3 className="text-lg font-semibold text-gray-700 pt-4">Petrol Vehicle</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Petrol Price (₹/litre)</label>
                        <input type="number" value={petrolPrice} onChange={e => setPetrolPrice(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Mileage (km/litre)</label>
                        <input type="number" value={petrolMileage} onChange={e => setPetrolMileage(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     <h3 className="text-lg font-semibold text-gray-700 pt-4">Electric Vehicle</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Electricity Price (₹/unit)</label>
                        <input type="number" value={electricityPrice} onChange={e => setElectricityPrice(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Range (km/charge)</label>
                        <input type="number" value={evMileage} onChange={e => setEvMileage(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-brand-secondary/10 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Your Potential Savings with EV</h3>
                    <div className="my-4 text-center">
                        <p className="text-gray-600">Monthly Savings</p>
                        <p className="text-4xl font-bold text-brand-secondary">{formatCurrency(savings.monthly)}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-gray-600">Yearly Savings</p>
                        <p className="text-5xl font-bold text-brand-secondary">{formatCurrency(savings.yearly)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
