import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stargazer's Journal",
  description: "Store your observations of the night sky!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <Providers>
          <Container>
            <Header />
            <main className="flex-1 flex items-center justify-center">
              {children}
            </main>
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
