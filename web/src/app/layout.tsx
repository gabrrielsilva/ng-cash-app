import { Inter } from '@next/font/google';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html className={inter.className} >
        <head />
        <body>{children}</body>
      </html>
    </AuthProvider>
  )
}
