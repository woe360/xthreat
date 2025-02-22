"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/animated-list";
import Image from 'next/image';

import GmailApp from '../assets/GmailApp.svg';
import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
import MessagesApp from '../assets/messagesApp.svg';
import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
import PhoneApp from '../assets/phoneApp.svg';
import SlackApp from '../assets/slackApp.svg';

interface Item {
  name: string;
  description: string;
  icon: string;
  time: string;
  iconSize?: number;
  whiteBackground?: boolean;
  className?: string;
}

let notifications: Item[] = [
  {
    name: "Gmail",
    description: "Urgent: Account security update required",
    time: "15m ago",
    icon: GmailApp,
    iconSize: 45,
    whiteBackground: true,
    className: "ml-2 mr-2",
  },
  {
    name: "Google Docs",
    description: "Important document shared: Q4_Financial_Report.xlsx",
    time: "10m ago",
    icon: GoogleDocsApp,
    iconSize: 45,
    className: "ml-2 mr-2 p-[10px]",
    whiteBackground: true,
  },
  {
    name: "Messages",
    description: "Unknown: Click here to claim your prize!",
    time: "5m ago",
    icon: MessagesApp,
    iconSize: 60,
    className: "mt-0",
  },
  {
    name: "Outlook",
    description: "HR: Immediate action required on your benefits",
    time: "30m ago",
    icon: MicrosoftOfficeOutlookApp,
    iconSize: 45,
    whiteBackground: true,
    className: "ml-2 p-2 mr-2",
  },
  {
    name: "Phone",
    description: "Missed call from +1 (234) 567-8900",
    time: "2m ago",
    icon: PhoneApp,
    iconSize: 60,
    className: "ml-0",
  },
  {
    name: "Slack",
    description: "IT Support: Please verify your login credentials",
    time: "1m ago",
    icon: SlackApp,
    iconSize: 45,
    className: "ml-2 mr-3",
    whiteBackground: true,
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false, className = "" }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[480px] cursor-pointer overflow-hidden rounded-2xl p-3",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-gray-900/10 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900/60 backdrop-blur-sm to-transparent"></div>
      <div className="relative z-10 flex flex-row items-center gap-3">
        <div 
          className={cn("flex-shrink-0 flex items-center justify-center rounded-xl", className)}
          style={{ 
            width: `${iconSize}px`, 
            height: `${iconSize}px`,
            backgroundColor: whiteBackground ? 'white' : 'transparent',
            overflow: 'hidden'
          }}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Image 
              src={icon} 
              alt={name} 
              width={iconSize * 0.8} 
              height={iconSize * 0.8}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex-grow min-w-0 flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white leading-tight mr-2">{name}</span>
            <span className="text-xs text-gray-300 flex-shrink-0">{time}</span>
          </div>
          <p className="text-sm font-normal text-white/80 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-5 overflow-hidden rounded-lg md:shadow-xl",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-gray-900/60 backdrop-blur-sm to-transparent"></div> */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

    </div>
  );
}