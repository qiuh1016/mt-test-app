'use client'
 
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      Home
      <button type="button" onClick={() => router.push('/dashboard')}>
         to Dashboard
      </button>
    </main>
  );
}