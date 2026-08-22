let counter = 1000;

export function generateId(prefix: string): string {
  counter++;
  const timestamp = Date.now().toString(36);
  const count = counter.toString(36);
  return `${prefix}-${timestamp}-${count}`;
}

export function generateBookingRef(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `PW-${num}`;
}
