export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `KES ${(price / 1000000).toFixed(1)}M`;
  }
  return `KES ${price.toLocaleString()}`;
}

export function formatMileage(mileage: number): string {
  if (!mileage) return 'Brand New';
  return `${mileage.toLocaleString()} km`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}