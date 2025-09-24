
import React, { createContext, useState, ReactNode } from 'react';
import { Vehicle } from '../types';

interface CompareContextType {
  compareList: Vehicle[];
  toggleCompare: (vehicle: Vehicle) => void;
}

export const CompareContext = createContext<CompareContextType>({
  compareList: [],
  toggleCompare: () => {},
});

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Vehicle[]>([]);

  const toggleCompare = (vehicle: Vehicle) => {
    setCompareList(prevList => {
      const exists = prevList.some(item => item.id === vehicle.id);
      if (exists) {
        return prevList.filter(item => item.id !== vehicle.id);
      } else {
        if (prevList.length < 4) {
            return [...prevList, vehicle];
        }
        // Optionally add a notification here that max 4 items can be compared
        return prevList;
      }
    });
  };

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare }}>
      {children}
    </CompareContext.Provider>
  );
};
