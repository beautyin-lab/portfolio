'use client';

import { useMockBackendContext } from './provider';

export function useMockBackend() {
  return useMockBackendContext();
}

export function useMockReservation() {
  const { createReservation, getReservations, cancelReservation, isLoading, lastAction } =
    useMockBackendContext();
  return { createReservation, getReservations, cancelReservation, isLoading, lastAction };
}

export function useMockInquiry() {
  const { submitInquiry, isLoading, lastAction } = useMockBackendContext();
  return { submitInquiry, isLoading, lastAction };
}

export function useMockOrder() {
  const { createOrder, isLoading, lastAction } = useMockBackendContext();
  return { createOrder, isLoading, lastAction };
}
