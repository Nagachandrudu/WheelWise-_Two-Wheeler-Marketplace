
import React from 'react';
import { EMICalculator, FuelCostCalculator } from '../components/Calculators';

const CalculatorsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold text-center text-brand-dark">Financial Tools</h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
        Plan your purchase and estimate your savings with our easy-to-use calculators. Make an informed decision for your next two-wheeler.
      </p>
      
      <EMICalculator />
      <FuelCostCalculator />

    </div>
  );
};

export default CalculatorsPage;
