import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Index',
}

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Cellar Chart
    </main>
  );
}
