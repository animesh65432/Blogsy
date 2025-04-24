"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import TanStackProvider from '@/components/TanStackProvider'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, "hello")
  return (
    <html lang="en">
      <body
      >
        <SessionProvider>
          <TanStackProvider>
            {children}
          </TanStackProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
