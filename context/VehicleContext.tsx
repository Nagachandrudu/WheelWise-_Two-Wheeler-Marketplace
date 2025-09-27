
import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { Vehicle, Review } from '../types';
import { VEHICLES as initialVehicles } from '../constants';
import { AuthContext } from './AuthContext';

type PriceAlerts = { [vehicleId: number]: number };

interface VehicleContextType {
  vehicles: Vehicle[];
  myVehicleIds: number[];
  favorites: number[];
  priceAlerts: PriceAlerts;
  priceDropNotifications: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'rating' | 'reviews'>) => void;
  removeVehicle: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addReview: (vehicleId: number, review: Omit<Review, 'id' | 'date'>) => void;
  togglePriceAlert: (vehicleId: number, currentPrice: number) => void;
  isAlertSet: (id: number) => boolean;
  dismissPriceDropNotification: (vehicleId: number) => void;
}

export const VehicleContext = createContext<VehicleContextType>({
  vehicles: [],
  myVehicleIds: [],
  favorites: [],
  priceAlerts: {},
  priceDropNotifications: [],
  addVehicle: () => {},
  removeVehicle: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  addReview: () => {},
  togglePriceAlert: () => {},
  isAlertSet: () => false,
  dismissPriceDropNotification: () => {},
});

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const userAddedVehiclesJSON = localStorage.getItem('userAddedVehicles');
      const userAddedVehicles: Vehicle[] = userAddedVehiclesJSON ? JSON.parse(userAddedVehiclesJSON) : [];
      return [...initialVehicles.map(v => ({...v})), ...userAddedVehicles]; // Deep copy initial vehicles
    } catch (error) {
      console.error("Failed to parse user vehicles from localStorage", error);
      return initialVehicles.map(v => ({...v}));
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

  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlerts>({});
  const [priceDropNotifications, setPriceDropNotifications] = useState<Vehicle[]>([]);

  // Effect for simulating price drop for demo
  useEffect(() => {
    const hasSimulated = sessionStorage.getItem('priceDropSimulated');
    if (!hasSimulated) {
        setTimeout(() => {
            setVehicles(currentVehicles => {
                const updatedVehicles = [...currentVehicles];
                const vehicleToUpdate = updatedVehicles.find(v => v.id === 1); // Splendor Plus
                if (vehicleToUpdate) {
                    vehicleToUpdate.price = Math.round(vehicleToUpdate.price * 0.95); // 5% drop
                }
                return updatedVehicles;
            });
            sessionStorage.setItem('priceDropSimulated', 'true');
        }, 5000); // 5 seconds after load
    }
  }, []);

  useEffect(() => {
    if (user) {
        try {
            const userFavoritesJSON = localStorage.getItem(`favorites_${user.name}`);
            setFavorites(userFavoritesJSON ? JSON.parse(userFavoritesJSON) : []);
            const userPriceAlertsJSON = localStorage.getItem(`price_alerts_${user.name}`);
            setPriceAlerts(userPriceAlertsJSON ? JSON.parse(userPriceAlertsJSON) : {});
        } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
            setFavorites([]);
            setPriceAlerts({});
        }
    } else {
        setFavorites([]);
        setPriceAlerts({});
    }
  }, [user]);

  // Effect to check for price drops
  useEffect(() => {
    const notifications: Vehicle[] = [];
    for (const vehicleId in priceAlerts) {
        const alertPrice = priceAlerts[vehicleId];
        const vehicle = vehicles.find(v => v.id === Number(vehicleId));
        if (vehicle && vehicle.price < alertPrice) {
            notifications.push(vehicle);
        }
    }
    setPriceDropNotifications(notifications);
  }, [vehicles, priceAlerts]);


  const toggleFavorite = (id: number) => {
    if (!user) return;
    const updatedFavorites = favorites.includes(id)
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
    
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${user.name}`, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const togglePriceAlert = (vehicleId: number, currentPrice: number) => {
    if (!user) return;
    const updatedAlerts = { ...priceAlerts };
    if (updatedAlerts[vehicleId]) {
        delete updatedAlerts[vehicleId];
    } else {
        updatedAlerts[vehicleId] = currentPrice;
    }
    setPriceAlerts(updatedAlerts);
    localStorage.setItem(`price_alerts_${user.name}`, JSON.stringify(updatedAlerts));
  };

  const isAlertSet = (id: number) => priceAlerts.hasOwnProperty(id);

  const dismissPriceDropNotification = (vehicleId: number) => {
      // Dismissing a notification removes the alert to prevent it from showing again
      togglePriceAlert(vehicleId, 0); // Price doesn't matter as it's being deleted
  };


  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'rating' | 'reviews'>) => {
    const newId = (vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) : 0) + 1;
    const newVehicle: Vehicle = {
      id: newId,
      ...vehicleData,
      rating: 0,
      reviews: [],
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
    if (!vehicleToRemove || !vehicleToRemove.isUserAdded || !myVehicleIds.includes(id)) {
      return;
    }

    const updatedVehicles = vehicles.filter(v => v.id !== id);
    setVehicles(updatedVehicles);
    const userAdded = updatedVehicles.filter(v => v.isUserAdded);
    localStorage.setItem('userAddedVehicles', JSON.stringify(userAdded));
    
    const updatedMyIds = myVehicleIds.filter(myId => myId !== id);
    setMyVehicleIds(updatedMyIds);
    localStorage.setItem('myVehicleIds', JSON.stringify(updatedMyIds));
  };

  const addReview = (vehicleId: number, reviewData: Omit<Review, 'id' | 'date'>) => {
    setVehicles(prevVehicles => {
        return prevVehicles.map(vehicle => {
            if (vehicle.id === vehicleId) {
                const newReview: Review = {
                    id: (vehicle.reviews.length > 0 ? Math.max(...vehicle.reviews.map(r => r.id)) : 0) + 1,
                    ...reviewData,
                    date: new Date().toISOString().split('T')[0],
                };

                const updatedReviews = [...vehicle.reviews, newReview];
                const newRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
                
                const updatedVehicle = {
                    ...vehicle,
                    reviews: updatedReviews,
                    rating: parseFloat(newRating.toFixed(1)),
                };

                // Persist changes for user-added vehicles
                if (updatedVehicle.isUserAdded) {
                    const userAddedVehiclesJSON = localStorage.getItem('userAddedVehicles');
                    let userAddedVehicles: Vehicle[] = userAddedVehiclesJSON ? JSON.parse(userAddedVehiclesJSON) : [];
                    userAddedVehicles = userAddedVehicles.map(v => v.id === vehicleId ? updatedVehicle : v);
                    localStorage.setItem('userAddedVehicles', JSON.stringify(userAddedVehicles));
                }
                
                return updatedVehicle;
            }
            return vehicle;
        });
    });
  };

  return (
    <VehicleContext.Provider value={{ vehicles, myVehicleIds, addVehicle, removeVehicle, favorites, toggleFavorite, isFavorite, addReview, priceAlerts, togglePriceAlert, isAlertSet, priceDropNotifications, dismissPriceDropNotification }}>
      {children}
    </VehicleContext.Provider>
  );
};