"use client";
import { useRouter } from '@/i18n/navigation';
export default function NotFound() {
  const router = useRouter();
  router.replace('/not-found');
}
