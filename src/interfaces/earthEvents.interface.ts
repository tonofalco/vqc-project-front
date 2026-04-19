export interface EarthEvent {
  id: number;
  transportNumber: string;
  transport: string;
  seats: string;
  nameClient: string;
  phone: string;
  departure: string;
  destination: string;
  price: number;
  advance: number;
  start: string;
  end: string;
  status: string;
  notes: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
  };
}

export interface EarthEventCreate {
  transportNumber: string;
  transport: string;
  seats: string;
  nameClient: string;
  phone: string;
  departure: string;
  destination: string;
  price: number;
  advance: number;
  start: number;
  end: number;
  title: string;
  status: string;
  notes?: string;
}

export interface EarthEventUpdate {
  transportNumber: string;
  transport: string;
  seats: string;
  nameClient: string;
  phone: string;
  departure: string;
  destination: string;
  price: number;
  advance: number;
  start: number;
  end: number;
  notes?: string;
  title?: string;
  status: string;
}
