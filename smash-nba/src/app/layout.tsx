"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>SMASH NBA</title>
        <link rel="icon" href="/images/logo.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
