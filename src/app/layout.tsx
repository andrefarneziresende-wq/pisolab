import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'piso.lab Valencia',
  description: 'Reformas, Parquet y Diseño en Valencia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
