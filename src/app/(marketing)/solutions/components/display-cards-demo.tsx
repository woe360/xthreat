// src/components/display-cards-demo.tsx
"use client";

import DisplayCards from "@/components/display-cards";
import { Brain, MessageCircle, Laptop } from "lucide-react";

const featureCards = [
  {
    icon: <Brain className="size-4 text-blue-300" />,
    title: "AI Assistant",
    description: "Can differentiate threats from noise",
    date: "Core Feature",
    iconClassName: "text-blue-500",
    titleClassName: "text-gray-200",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <MessageCircle className="size-4 text-green-300" />,
    title: "Phishing Simulation",
    description: "Simulate phishing attacks for employees",
    date: "Core Feature",
    iconClassName: "text-green-500",
    titleClassName: "text-gray-200",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Laptop className="size-4 text-purple-300" />,
    title: "Browser Extension",
    description: "Allows users to learn in spare time at work",
    date: "Essential Feature",
    iconClassName: "text-purple-500",
    titleClassName: "text-gray-200",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-3xl lg:text-4xl mb-2 text-center font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-500">
          Upcoming Features
        </h2>
        <h3 className="text-lg sm:text-xl md:text-xl mb-14 mx-7 font-serif italic text-gray-400 text-center font-light">
          In development
        </h3>
        
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <div className="w-full max-w-5xl mx-auto mr-20 scale-[0.75] sm:scale-90">
            <DisplayCards cards={featureCards} />
          </div>
        </div>
      </div>
    </section>
  );
}