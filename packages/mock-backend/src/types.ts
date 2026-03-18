export interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  reservationDate: string; // YYYY-MM-DD
  reservationTime: string; // HH:mm
  serviceType: string;
  staffId?: string;
  roomId?: string;
  partySize?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: number;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  subject: string;
  message: string;
  type: 'general' | 'estimate' | 'consultation';
  status: 'new' | 'read' | 'replied';
  createdAt: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface MockResponse<T> {
  data: T | null;
  error: string | null;
  status: 'success' | 'error';
  timestamp: number;
}

export interface MockBackendConfig {
  enabledFeatures: ('reservation' | 'inquiry' | 'order')[];
  seedDataFile: string;
  simulateErrors: boolean;
}
