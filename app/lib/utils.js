import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Conditional class merge utility used by all shadcn/ui components.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
