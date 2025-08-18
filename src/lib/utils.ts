import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { useState, useEffect } from "react";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};



// export function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number;
//     const step = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);
//       setCount(Math.floor(progress * target));
//       if (progress < 1) {
//         requestAnimationFrame(step);
//       }
//     };
//     requestAnimationFrame(step);
//   }, [target, duration]);

//   return <span>{count}</span>;
// }