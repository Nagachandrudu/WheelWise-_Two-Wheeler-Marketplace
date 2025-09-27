export enum VehicleType {
  BIKE = 'Bike',
  SCOOTER = 'Scooter',
  BICYCLE = 'Bicycle',
}

export enum FuelType {
  PETROL = 'Petrol',
  ELECTRIC = 'Electric',
  MANUAL = 'Manual',
}

export interface User {
  name: string;
  isDealer?: boolean;
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  price: number;
  type: VehicleType;
  fuelType: FuelType;
  imageUrl: string;
  mileage: string;
  engine: string;
  power: string;
  brakes: string;
  description: string;
  specs: { [key: string]: string };
  rating: number;
  reviews: Review[];
  isUserAdded?: boolean;
}

export interface Showroom {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
}