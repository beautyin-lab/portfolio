export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  imageUrl: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category?: string;
}

export type ReservationType =
  | 'datetime'
  | 'datetime-room'
  | 'datetime-staff'
  | 'datetime-service';

export interface ReservationConfig {
  type: ReservationType;
  rooms?: Room[];
  staff?: Staff[];
  services?: Service[];
  availableHours?: { start: string; end: string };
  unavailableDates?: string[];
}

export interface ReservationFormData {
  date: string;
  time: string;
  checkoutDate?: string;
  partySize?: number;
  roomId?: string;
  staffId?: string;
  serviceIds?: string[];
  department?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

export interface StepDefinition {
  id: string;
  label: string;
}
