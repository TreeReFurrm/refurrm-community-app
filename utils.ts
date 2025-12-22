import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind CSS classes and other class names into a single string,
 * handling conflicts and ensuring proper merging.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
