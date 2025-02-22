'use client';

import Link from 'next/link';
import Navbar from './(marketing)/navigation/navbar';
import { ChevronRight } from 'lucide-react';
import Footer from './(marketing)/navigation/footer';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[150vh] font-sans flex-col bg-black">
      <Navbar />
      <div className="flex flex-grow flex-col items-center justify-center px-4 overflow-hidden">
        <div className="flex items-center mt-28 justify-center">
          <h1 className="text-[150px] md:text-[400px] font-sans font-normal">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">4</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">0</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-700">4</span>
          </h1>
        </div>

        <div className="relative z-10 -mt-20 md:-mt-60 bg-black/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center shadow-lg max-w-md w-full">
          <h2 className="mb-4 text-2xl md:text-4xl font-sans text-white">
            Page not found
          </h2>

          <p className="mb-8 text-sm md:text-base text-gray-400">
          The page you are looking for might have been moved, deleted, or perhaps it never existed. Please check the URL or return to the homepage.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 md:px-6 md:py-3 text-black transition-colors hover:bg-gray-200"
          >
            Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
