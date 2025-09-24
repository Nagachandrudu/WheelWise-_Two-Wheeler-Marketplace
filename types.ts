
export enum VehicleType {
  BIKE = 'Bike',
  SCOOTER = 'Scooter',
}

export enum FuelType {
  PETROL = 'Petrol',
  ELECTRIC = 'Electric',
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
