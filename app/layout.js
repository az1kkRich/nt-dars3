import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-800">
          <div className="container mx-auto  flex items-center justify-between px-5 py-2">
            <header className="">
              <Link href="/" className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">My Next.js App</h1>
              <p className="text-gray-600">Welcome to my Next.js application!</p>
              </Link>
            </header>
            <nav className="flex items-center gap-10">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-cell">
                Add New Product
              </button>
              <ul className="flex space-x-4">
                <li className="text-blue-600 hover:underline">


                    Home
                </li>
                <li className="text-blue-600 hover:underline">
                    About
                </li>
              </ul>
            </nav>
          </div>

        </div>
        <div className="container mx-auto px-5 py-1">
        {children}
        </div>
      </body>
    </html>
  );
}
