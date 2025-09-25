import React, { createContext, useState, ReactNode } from 'react';
import { Vehicle } from '../types';
import { VEHICLES as initialVehicles } from '../constants';

interface VehicleContextType {
  vehicles: Vehicle[];
  myVehicleIds: number[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  removeVehicle: (id: number) => void;
}

export const VehicleContext = createContext<VehicleContextType>({
  vehicles: initialVehicles,
  myVehicleIds: [],
  addVehicle: () => {},
  removeVehicle: () => {},
});

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const userAddedVehiclesJSON = localStorage.getItem('userAddedVehicles');
      const userAddedVehicles: Vehicle[] = userAddedVehiclesJSON ? JSON.parse(userAddedVehiclesJSON) : [];
      return [...initialVehicles, ...userAddedVehicles];
    } catch (error) {
      console.error("Failed to parse user vehicles from localStorage", error);
      return initialVehicles;
    }
  });

  const [myVehicleIds, setMyVehicleIds] = useState<number[]>(() => {
    try {
      const myIdsJSON = localStorage.getItem('myVehicleIds');
      return myIdsJSON ? JSON.parse(myIdsJSON) : [];
    } catch (error) {
      console.error("Failed to parse my vehicle IDs from localStorage", error);
      return [];
    }
  });

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newId = (vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) : 0) + 1;
    const newVehicle: Vehicle = {
      id: newId,
      ...vehicleData,
      isUserAdded: true,
    };
    
    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    
    const userAdded = updatedVehicles.filter(v => v.isUserAdded);
    localStorage.setItem('userAddedVehicles', JSON.stringify(userAdded));

    const updatedMyIds = [...myVehicleIds, newId];
    setMyVehicleIds(updatedMyIds);
    localStorage.setItem('myVehicleIds', JSON.stringify(updatedMyIds));
  };

  const removeVehicle = (id: number) => {
    const vehicleToRemove = vehicles.find(v => v.id === id);
    // Ensure vehicle exists, is user-added, and is "owned" by this user (in their browser storage)
    if (!vehicleToRemove || !vehicleToRemove.isUserAdded || !myVehicleIds.includes(id)) {
      return;
    }

    // Update vehicles state and storage
    const updatedVehicles = vehicles.filter(v => v.id !== id);
    setVehicles(updatedVehicles);
    const userAdded = updatedVehicles.filter(v => v.isUserAdded);
    localStorage.setItem('userAddedVehicles', JSON.stringify(userAdded));
    
    // Update "my vehicles" state and storage
    const updatedMyIds = myVehicleIds.filter(myId => myId !== id);
    setMyVehicleIds(updatedMyIds);
    localStorage.setItem('myVehicleIds', JSON.stringify(updatedMyIds));
  };

  return (
    <VehicleContext.Provider value={{ vehicles, myVehicleIds, addVehicle, removeVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};
