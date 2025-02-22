// src/app/(landing-page)/(solutions)/solutions/components/display-cards.tsx
"use client";

import { cn } from "@/lib/utils";
import { Brain, Shield, Target } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Shield className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Core Feature",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
    //   className={cn(
    //     "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm px-4 py-3 transition-all duration-700",
    //     "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-black after:to-transparent after:content-['']",
    //     "hover:border-white/20 hover:bg-gray-800/30",
    //     "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
    //     className
    //   )}
    className={cn(
        "relative flex h-36 w-[25rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm px-4 py-3 transition-all duration-700",
        "hover:border-white/20 hover:bg-gray-800/30",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-gray-800/80 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium text-gray-200", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-gray-400">{description}</p>
      <p className="text-gray-500">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

const defaultCards = [
  {
    icon: <Brain className="size-4 text-blue-300" />,
    title: "AI Assistant for cyber security",
    description: "Can differentiate between phishing and non-phishing emails",
    date: "Core Feature",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Target className="size-4 text-green-300" />,
    title: "Risk Assessment",
    description: "Real-time threat monitoring",
    date: "Core Feature",
    className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Shield className="size-4 text-purple-300" />,
    title: "Security Protocols",
    description: "Enterprise-grade protection",
    date: "Core Feature",
    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export default function DisplayCards({ cards = defaultCards }: DisplayCardsProps) {
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}