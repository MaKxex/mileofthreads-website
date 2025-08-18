"use client";
import { useRouter } from "next/navigation";
export default function GlobalNotFound() {
  const router = useRouter();
  router.replace('/not-found');
}
