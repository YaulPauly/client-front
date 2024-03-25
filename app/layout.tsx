import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import HeaderMenu from "@/components/HeaderMenu";

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: "Gestor de Clientes",
  description: "Una herramienta eficiente para gestionar y organizar clientes de manera efectiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body >
        <HeaderMenu />
        {children}</body>
    </html>
  );
}
