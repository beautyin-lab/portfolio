'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Inquiry, MockBackendConfig, MockResponse, Order, Reservation } from './types';
import { simulateDelay, simulateError } from './delay';
import * as storage from './storage';

export interface MockBackendContextValue {
  createReservation: (
    data: Omit<Reservation, 'id' | 'createdAt' | 'status'>,
  ) => Promise<MockResponse<Reservation>>;
  getReservations: () => Promise<MockResponse<Reservation[]>>;
  cancelReservation: (id: string) => Promise<MockResponse<void>>;
  submitInquiry: (
    data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>,
  ) => Promise<MockResponse<Inquiry>>;
  createOrder: (
    data: Omit<Order, 'id' | 'createdAt' | 'status'>,
  ) => Promise<MockResponse<Order>>;
  resetAllData: () => void;
  isLoading: boolean;
  lastAction: { type: string; success: boolean; timestamp: number } | null;
}

const MockBackendContext = createContext<MockBackendContextValue | null>(null);

interface MockBackendProviderProps {
  siteSlug: string;
  config: MockBackendConfig;
  seedData?: {
    reservations?: Omit<Reservation, 'id' | 'createdAt'>[];
    inquiries?: Omit<Inquiry, 'id' | 'createdAt'>[];
    orders?: Omit<Order, 'id' | 'createdAt'>[];
  };
  children: React.ReactNode;
}

function makeSuccess<T>(data: T): MockResponse<T> {
  return { data, error: null, status: 'success', timestamp: Date.now() };
}

function makeError<T>(message: string): MockResponse<T> {
  return { data: null, error: message, status: 'error', timestamp: Date.now() };
}

export function MockBackendProvider({
  siteSlug,
  config,
  seedData,
  children,
}: MockBackendProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState<{
    type: string;
    success: boolean;
    timestamp: number;
  } | null>(null);
  const seeded = useRef(false);

  // Inject seed data on first mount if storage is empty
  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;

    if (!seedData) return;

    if (
      config.enabledFeatures.includes('reservation') &&
      seedData.reservations?.length &&
      storage.get(siteSlug, 'reservations').length === 0
    ) {
      seedData.reservations.forEach((r) => {
        storage.append(siteSlug, 'reservations', {
          ...r,
          createdAt: Date.now(),
        });
      });
    }

    if (
      config.enabledFeatures.includes('inquiry') &&
      seedData.inquiries?.length &&
      storage.get(siteSlug, 'inquiries').length === 0
    ) {
      seedData.inquiries.forEach((i) => {
        storage.append(siteSlug, 'inquiries', {
          ...i,
          createdAt: Date.now(),
        });
      });
    }

    if (
      config.enabledFeatures.includes('order') &&
      seedData.orders?.length &&
      storage.get(siteSlug, 'orders').length === 0
    ) {
      seedData.orders.forEach((o) => {
        storage.append(siteSlug, 'orders', {
          ...o,
          createdAt: Date.now(),
        });
      });
    }
  }, [siteSlug, config, seedData]);

  function recordAction(type: string, success: boolean) {
    setLastAction({ type, success, timestamp: Date.now() });
  }

  const createReservation = async (
    data: Omit<Reservation, 'id' | 'createdAt' | 'status'>,
  ): Promise<MockResponse<Reservation>> => {
    setIsLoading(true);
    try {
      await simulateDelay('create');
      simulateError(config.simulateErrors);
      const item = storage.append(siteSlug, 'reservations', {
        ...data,
        status: 'pending' as const,
        createdAt: Date.now(),
      }) as Reservation;
      recordAction('createReservation', true);
      return makeSuccess(item);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      recordAction('createReservation', false);
      return makeError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getReservations = async (): Promise<MockResponse<Reservation[]>> => {
    setIsLoading(true);
    try {
      await simulateDelay('read');
      simulateError(config.simulateErrors);
      const items = storage.get<Reservation>(siteSlug, 'reservations');
      recordAction('getReservations', true);
      return makeSuccess(items);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      recordAction('getReservations', false);
      return makeError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelReservation = async (id: string): Promise<MockResponse<void>> => {
    setIsLoading(true);
    try {
      await simulateDelay('delete');
      simulateError(config.simulateErrors);
      const items = storage.get<Reservation>(siteSlug, 'reservations');
      const index = items.findIndex((r) => r.id === id);
      if (index === -1) {
        recordAction('cancelReservation', false);
        return makeError(`Reservation ${id} not found`);
      }
      (items[index] as Reservation).status = 'cancelled';
      storage.set(siteSlug, 'reservations', items);
      recordAction('cancelReservation', true);
      return makeSuccess(undefined as void);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      recordAction('cancelReservation', false);
      return makeError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitInquiry = async (
    data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>,
  ): Promise<MockResponse<Inquiry>> => {
    setIsLoading(true);
    try {
      await simulateDelay('create');
      simulateError(config.simulateErrors);
      const item = storage.append(siteSlug, 'inquiries', {
        ...data,
        status: 'new' as const,
        createdAt: Date.now(),
      }) as Inquiry;
      recordAction('submitInquiry', true);
      return makeSuccess(item);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      recordAction('submitInquiry', false);
      return makeError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (
    data: Omit<Order, 'id' | 'createdAt' | 'status'>,
  ): Promise<MockResponse<Order>> => {
    setIsLoading(true);
    try {
      await simulateDelay('create');
      simulateError(config.simulateErrors);
      const item = storage.append(siteSlug, 'orders', {
        ...data,
        status: 'pending' as const,
        createdAt: Date.now(),
      }) as Order;
      recordAction('createOrder', true);
      return makeSuccess(item);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      recordAction('createOrder', false);
      return makeError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAllData = () => {
    storage.clear(siteSlug);
    recordAction('resetAllData', true);
  };

  const value: MockBackendContextValue = {
    createReservation,
    getReservations,
    cancelReservation,
    submitInquiry,
    createOrder,
    resetAllData,
    isLoading,
    lastAction,
  };

  return (
    <MockBackendContext.Provider value={value}>{children}</MockBackendContext.Provider>
  );
}

export function useMockBackendContext(): MockBackendContextValue {
  const ctx = useContext(MockBackendContext);
  if (!ctx) {
    throw new Error('useMockBackendContext must be used within a MockBackendProvider');
  }
  return ctx;
}
