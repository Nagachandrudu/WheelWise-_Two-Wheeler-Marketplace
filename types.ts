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