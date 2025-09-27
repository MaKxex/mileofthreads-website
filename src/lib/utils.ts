

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};