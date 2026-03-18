const DELAY_CONFIG = {
  create: { min: 500, max: 1500 },
  read: { min: 200, max: 500 },
  delete: { min: 300, max: 800 },
} as const;

type Operation = keyof typeof DELAY_CONFIG;

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function simulateDelay(operation: Operation): Promise<void> {
  const { min, max } = DELAY_CONFIG[operation];
  const ms = randomBetween(min, max);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function simulateError(shouldSimulate: boolean): void {
  if (!shouldSimulate) return;
  // 5% probability of throwing a simulated network error
  if (Math.random() < 0.05) {
    throw new Error('Simulated network error');
  }
}
