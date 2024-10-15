// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/ui/animated-list";
// import { Bell, Mail, MessageCircle, Phone } from "lucide-react";

// import GmailApp from '../assets/GmailApp.svg';
// import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
// import MessagesApp from '../assets/messagesApp.svg';
// import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
// import PhoneApp from '../assets/phoneApp.svg';
// import SlackApp from '../assets/slackApp.svg';

// interface Item {
//   name: string;
//   description: string;
//   icon: string;
//   color: string;
//   time: string;
// }

// let notifications = [
//     {
//       name: "Gmail",
//       description: "Urgent: Account security update required",
//       time: "15m ago",
//       icon: <GmailApp/>,
//       color: "#DB4437",
//     },
//     {
//       name: "Google Docs",
//       description: "Important document shared: Q4_Financial_Report.xlsx",
//       time: "10m ago",
//       icon: <GoogleDocsApp/>,
//       color: "#0F9D58",
//     },
//     {
//       name: "Messages",
//       description: "Unknown: Click here to claim your prize!",
//       time: "5m ago",
//       icon: <MessagesApp/>,
//       color: "#34C759",
//     },
//     {
//       name: "Outlook",
//       description: "HR: Immediate action required on your benefits",
//       time: "30m ago",
//       icon: <MicrosoftOfficeOutlookApp/>,
//       color: "#0078D4",
//     },
//     {
//       name: "Phone",
//       description: "Missed call from +1 (234) 567-8900",
//       time: "2m ago",
//       icon: <PhoneApp/>,
//       color: "#007AFF",
//     },
//     {
//       name: "Slack",
//       description: "IT Support: Please verify your login credentials",
//       time: "1m ago",
//       icon: <SlackApp/>,
//       color: "#4A154B",
//     },
//   ];
  

// notifications = Array.from({ length: 10 }, () => notifications).flat();

// const Notification = ({ name, description, icon, color, time }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         // animation styles
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         // light styles
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         // dark styles
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div
//           className="flex size-10 items-center justify-center rounded-2xl"
//           style={{
//             backgroundColor: color,
//           }}
//         >
//           <span className="text-lg">{icon}</span>
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
//             <span className="text-sm sm:text-lg">{name}</span>
//             <span className="mx-1">·</span>
//             <span className="text-xs text-gray-500">{time}</span>
//           </figcaption>
//           <p className="text-sm font-normal dark:text-white/60">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

// export function AnimatedListDemo({
//   className,
// }: {
//   className?: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
//         className,
//       )}
//     >
//       <AnimatedList>
//         {notifications.map((item, idx) => (
//           <Notification {...item} key={idx} />
//         ))}
//       </AnimatedList>
//     </div>
//   );
// }



// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/ui/animated-list";
// import { Bell, Mail, MessageCircle, Phone } from "lucide-react";
// import Image from 'next/image';

// import GmailApp from '../assets/GmailApp.svg';
// import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
// import MessagesApp from '../assets/messagesApp.svg';
// import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
// import PhoneApp from '../assets/phoneApp.svg';
// import SlackApp from '../assets/slackApp.svg';

// interface Item {
//   name: string;
//   description: string;
//   icon: string;
//   color: string;
//   time: string;
// }

// let notifications = [
//   {
//     name: "Gmail",
//     description: "Urgent: Account security update required",
//     time: "15m ago",
//     icon: GmailApp,
//     color: "#FFF",
//   },
//   {
//     name: "Google Docs",
//     description: "Important document shared: Q4_Financial_Report.xlsx",
//     time: "10m ago",
//     icon: GoogleDocsApp,
//     color: "#FFF",
//   },
//   {
//     name: "Messages",
//     description: "Unknown: Click here to claim your prize!",
//     time: "5m ago",
//     icon: MessagesApp,
//   },
//   {
//     name: "Outlook",
//     description: "HR: Immediate action required on your benefits",
//     time: "30m ago",
//     icon: MicrosoftOfficeOutlookApp,
//     color: "#FFF",
//   },
//   {
//     name: "Phone",
//     description: "Missed call from +1 (234) 567-8900",
//     time: "2m ago",
//     icon: PhoneApp,
//   },
//   {
//     name: "Slack",
//     description: "IT Support: Please verify your login credentials",
//     time: "1m ago",
//     icon: SlackApp,
//     color: "#FFF",
//   },
// ];

// notifications = Array.from({ length: 10 }, () => notifications).flat();

// const Notification = ({ name, description, icon, color, time }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div
//           className="flex size-10 items-center justify-center rounded-2xl"
//           style={{
//             backgroundColor: color,
//           }}
//         >
//           <Image src={icon} alt={name} width={24} height={24} />
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
//             <span className="text-sm sm:text-lg">{name}</span>
//             <span className="mx-1">·</span>
//             <span className="text-xs text-gray-500">{time}</span>
//           </figcaption>
//           <p className="text-sm font-normal dark:text-white/60">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

// export function AnimatedListDemo({
//   className,
// }: {
//   className?: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
//         className,
//       )}
//     >
//       <AnimatedList>
//         {notifications.map((item, idx) => (
//           <Notification {...item} key={idx} />
//         ))}
//       </AnimatedList>
//     </div>
//   );
// }



// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/ui/animated-list";
// import Image from 'next/image';

// import GmailApp from '../assets/GmailApp.svg';
// import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
// import MessagesApp from '../assets/messagesApp.svg';
// import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
// import PhoneApp from '../assets/phoneApp.svg';
// import SlackApp from '../assets/slackApp.svg';

// interface Item {
//   name: string;
//   description: string;
//   icon: string;
//   time: string;
//   iconSize?: number;
//   whiteBackground?: boolean;
// }

// let notifications: Item[] = [
//   {
//     name: "Gmail",
//     description: "Urgent: Account security update required",
//     time: "15m ago",
//     icon: GmailApp,
//     iconSize: 40,
//     whiteBackground: true,
//   },
//   {
//     name: "Google Docs",
//     description: "Important document shared: Q4_Financial_Report.xlsx",
//     time: "10m ago",
//     icon: GoogleDocsApp,
//     iconSize: 30,
//     whiteBackground: true,
//   },
//   {
//     name: "Messages",
//     description: "Unknown: Click here to claim your prize!",
//     time: "5m ago",
//     icon: MessagesApp,
//     iconSize: 60,
//   },
//   {
//     name: "Outlook",
//     description: "HR: Immediate action required on your benefits",
//     time: "30m ago",
//     icon: MicrosoftOfficeOutlookApp,
//     iconSize: 40,
//     whiteBackground: true,
//   },
//   {
//     name: "Phone",
//     description: "Missed call from +1 (234) 567-8900",
//     time: "2m ago",
//     icon: PhoneApp,
//     iconSize: 60,
//   },
//   {
//     name: "Slack",
//     description: "IT Support: Please verify your login credentials",
//     time: "1m ago",
//     icon: SlackApp,
//     iconSize: 40,
//     whiteBackground: true,
//   },
// ];

// notifications = Array.from({ length: 10 }, () => notifications).flat();

// const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div 
//           className="flex items-center justify-center rounded-xl"
//           style={{ 
//             width: `${iconSize}px`, 
//             height: `${iconSize}px`,
//             backgroundColor: whiteBackground ? 'white' : 'transparent',
//             overflow: 'hidden'
//           }}
//         >
//           <Image 
//             src={icon} 
//             alt={name} 
//             width={iconSize * 0.8} 
//             height={iconSize * 0.8}
//             className="object-contain"
//           />
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
//             <span className="text-sm sm:text-lg">{name}</span>
//             <span className="mx-1">·</span>
//             <span className="text-xs text-gray-500">{time}</span>
//           </figcaption>
//           <p className="text-sm font-normal dark:text-white/60">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

// export function AnimatedListDemo({
//   className,
// }: {
//   className?: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
//         className,
//       )}
//     >
//       <AnimatedList>
//         {notifications.map((item, idx) => (
//           <Notification {...item} key={idx} />
//         ))}
//       </AnimatedList>
//     </div>
//   );
// }



// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/ui/animated-list";
// import Image from 'next/image';

// import GmailApp from '../assets/GmailApp.svg';
// import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
// import MessagesApp from '../assets/messagesApp.svg';
// import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
// import PhoneApp from '../assets/phoneApp.svg';
// import SlackApp from '../assets/slackApp.svg';

// interface Item {
//   name: string;
//   description: string;
//   icon: string;
//   time: string;
//   iconSize?: number;
//   whiteBackground?: boolean;
// }

// let notifications: Item[] = [
//   {
//     name: "Gmail",
//     description: "Urgent: Account security update required",
//     time: "15m ago",
//     icon: GmailApp,
//     iconSize: 40,
//     whiteBackground: true,
//   },
//   {
//     name: "Google Docs",
//     description: "Important document shared: Q4_Financial_Report.xlsx",
//     time: "10m ago",
//     icon: GoogleDocsApp,
//     iconSize: 45,
//   },
//   {
//     name: "Messages",
//     description: "Unknown: Click here to claim your prize!",
//     time: "5m ago",
//     icon: MessagesApp,
//     iconSize: 60,
//   },
//   {
//     name: "Outlook",
//     description: "HR: Immediate action required on your benefits",
//     time: "30m ago",
//     icon: MicrosoftOfficeOutlookApp,
//     iconSize: 40,
//   },
//   {
//     name: "Phone",
//     description: "Missed call from +1 (234) 567-8900",
//     time: "2m ago",
//     icon: PhoneApp,
//     iconSize: 60,
//   },
//   {
//     name: "Slack",
//     description: "IT Support: Please verify your login credentials",
//     time: "1m ago",
//     icon: SlackApp,
//     iconSize: 40,
//   },
// ];

// notifications = Array.from({ length: 10 }, () => notifications).flat();

// const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div 
//           className="flex items-center justify-center rounded-xl"
//           style={{ 
//             width: `${iconSize}px`, 
//             height: `${iconSize}px`,
//             backgroundColor: whiteBackground ? 'white' : 'transparent',
//             overflow: 'hidden'
//           }}
//         >
//           <Image 
//             src={icon} 
//             alt={name} 
//             width={iconSize * 0.8} 
//             height={iconSize * 0.8}
//             className="object-contain"
//           />
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
//             <span className="text-sm sm:text-lg">{name}</span>
//             <span className="mx-1">·</span>
//             <span className="text-xs text-gray-500">{time}</span>
//           </figcaption>
//           <p className="text-sm font-normal dark:text-white/60">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

// export function AnimatedListDemo({
//   className,
// }: {
//   className?: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
//         className,
//       )}
//     >
//       <AnimatedList>
//         {notifications.map((item, idx) => (
//           <Notification {...item} key={idx} />
//         ))}
//       </AnimatedList>
//     </div>
//   );
// }



// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/ui/animated-list";
// import Image from 'next/image';

// import GmailApp from '../assets/GmailApp.svg';
// import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
// import MessagesApp from '../assets/messagesApp.svg';
// import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
// import PhoneApp from '../assets/phoneApp.svg';
// import SlackApp from '../assets/slackApp.svg';

// interface Item {
//   name: string;
//   description: string;
//   icon: string;
//   time: string;
//   iconSize?: number;
//   whiteBackground?: boolean;
//   className?: string;
// }

// let notifications: Item[] = [
//   {
//     name: "Gmail",
//     description: "Urgent: Account security update required",
//     time: "15m ago",
//     icon: GmailApp,
//     iconSize: 45,
//     whiteBackground: true,
//     className: "ml-2 mr-2 ",
//   },
//   {
//     name: "Google Docs",
//     description: "Important document shared: Q4_Financial_Report.xlsx",
//     time: "10m ago",
//     icon: GoogleDocsApp,
//     iconSize: 40,
//     className: "ml-2",
//      whiteBackground: true,
//   },
//   {
//     name: "Messages",
//     description: "Unknown: Click here to claim your prize!",
//     time: "5m ago",
//     icon: MessagesApp,
//     iconSize: 60,
//     className: "ml-0",
//   },
//   {
//     name: "Outlook",
//     description: "HR: Immediate action required on your benefits",
//     time: "30m ago",
//     icon: MicrosoftOfficeOutlookApp,
//     iconSize: 45,
//     whiteBackground: true,
//     className: "ml-2 p-2 mr-3",
//   },
//   {
//     name: "Phone",
//     description: "Missed call from +1 (234) 567-8900",
//     time: "2m ago",
//     icon: PhoneApp,
//     iconSize: 60,
//     className: "ml-0",
//   },
//   {
//     name: "Slack",
//     description: "IT Support: Please verify your login credentials",
//     time: "1m ago",
//     icon: SlackApp,
//     iconSize: 40,
//     className: "ml-3 mr-3",
//     whiteBackground: true,
//   },
// ];

// notifications = Array.from({ length: 10 }, () => notifications).flat();

// const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false, className = "" }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div 
//           className={cn("flex items-center justify-center rounded-xl", className)}
//           style={{ 
//             width: `${iconSize}px`, 
//             height: `${iconSize}px`,
//             backgroundColor: whiteBackground ? 'white' : 'transparent',
//             overflow: 'hidden'
//           }}
//         >
//           <div className="flex items-center justify-center w-full h-full">
//             <Image 
//               src={icon} 
//               alt={name} 
//               width={iconSize * 0.8} 
//               height={iconSize * 0.8}
//               className="object-contain"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
//             <span className="text-sm sm:text-lg">{name}</span>
//             <span className="mx-1">·</span>
//             <span className="text-xs text-gray-500">{time}</span>
//           </figcaption>
//           <p className="text-sm font-normal dark:text-white/60">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

// export function AnimatedListDemo({
//   className,
// }: {
//   className?: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
//         className,
//       )}
//     >
//       <AnimatedList>
//         {notifications.map((item, idx) => (
//           <Notification {...item} key={idx} />
//         ))}
//       </AnimatedList>
//     </div>
//   );
// }


// "use client";

// import { cn } from "@/lib/utils";
// import { AnimatedList } from "@/components/ui/animated-list";
// import Image from 'next/image';

// import GmailApp from '../assets/GmailApp.svg';
// import GoogleDocsApp from '../assets/GoogleDocsApp.svg';
// import MessagesApp from '../assets/messagesApp.svg';
// import MicrosoftOfficeOutlookApp from '../assets/MicrosoftOfficeOutlookApp.svg';
// import PhoneApp from '../assets/phoneApp.svg';
// import SlackApp from '../assets/slackApp.svg';

// interface Item {
//   name: string;
//   description: string;
//   icon: string;
//   time: string;
//   iconSize?: number;
//   whiteBackground?: boolean;
//   className?: string;
// }

// let notifications: Item[] = [
//   {
//     name: "Gmail",
//     description: "Urgent: Account security update required",
//     time: "15m ago",
//     icon: GmailApp,
//     iconSize: 45,
//     whiteBackground: true,
//     className: "ml-2 mr-2 ",
//   },
//   {
//     name: "Google Docs",
//     description: "Important document shared: Q4_Financial_Report.xlsx",
//     time: "10m ago",
//     icon: GoogleDocsApp,
//     iconSize: 40,
//     className: "ml-2",
//     whiteBackground: true,
//   },
//   {
//     name: "Messages",
//     description: "Unknown: Click here to claim your prize!",
//     time: "5m ago",
//     icon: MessagesApp,
//     iconSize: 60,
//     className: "ml-0",
//   },
//   {
//     name: "Outlook",
//     description: "HR: Immediate action required on your benefits",
//     time: "30m ago",
//     icon: MicrosoftOfficeOutlookApp,
//     iconSize: 45,
//     whiteBackground: true,
//     className: "ml-2 p-2 mr-3",
//   },
//   {
//     name: "Phone",
//     description: "Missed call from +1 (234) 567-8900",
//     time: "2m ago",
//     icon: PhoneApp,
//     iconSize: 60,
//     className: "ml-0",
//   },
//   {
//     name: "Slack",
//     description: "IT Support: Please verify your login credentials",
//     time: "1m ago",
//     icon: SlackApp,
//     iconSize: 40,
//     className: "ml-3 mr-3",
//     whiteBackground: true,
//   },
// ];

// notifications = Array.from({ length: 10 }, () => notifications).flat();

// const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false, className = "" }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div 
//           className={cn("flex items-center justify-center rounded-xl", className)}
//           style={{ 
//             width: `${iconSize}px`, 
//             height: `${iconSize}px`,
//             backgroundColor: whiteBackground ? 'white' : 'transparent',
//             overflow: 'hidden'
//           }}
//         >
//           <div className="flex items-center justify-center w-full h-full">
//             <Image 
//               src={icon} 
//               alt={name} 
//               width={iconSize * 0.8} 
//               height={iconSize * 0.8}
//               className="object-contain"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col overflow-hidden flex-grow">
//           <div className="flex justify-between items-center">
//             <span className="text-sm sm:text-lg font-medium dark:text-white">{name}</span>
//             <span className="text-xs text-gray-500 ml-2">{time}</span>
//           </div>
//           <p className="text-sm font-normal dark:text-white/60">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

// export function AnimatedListDemo({
//   className,
// }: {
//   className?: string;
// }) {
//   return (
//     <div
//       className={cn(
//         "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
//         className,
//       )}
//     >
//       <AnimatedList>
//         {notifications.map((item, idx) => (
//           <Notification {...item} key={idx} />
//         ))}
//       </AnimatedList>
//     </div>
//   );
// }




"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
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

// const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false, className = "" }: Item) => {
//   return (
//     <figure
//       className={cn(
//         "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
//         "transition-all duration-200 ease-in-out hover:scale-[103%]",
//         "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//         "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-3">
//         <div 
//           className={cn("flex-shrink-0 flex items-center justify-center rounded-xl", className)}
//           style={{ 
//             width: `${iconSize}px`, 
//             height: `${iconSize}px`,
//             backgroundColor: whiteBackground ? 'white' : 'transparent',
//             overflow: 'hidden'
//           }}
//         >
//           <div className="flex items-center justify-center w-full h-full">
//             <Image 
//               src={icon} 
//               alt={name} 
//               width={iconSize * 0.8} 
//               height={iconSize * 0.8}
//               className="object-contain"
//             />
//           </div>
//         </div>
//         <div className="flex-grow min-w-0 flex flex-col">
//           <div className="flex justify-between items-center">
//             <span className="text-sm font-medium dark:text-white leading-tight mr-2">{name}</span>
//             <span className="text-xs text-gray-500 flex-shrink-0">{time}</span>
//           </div>
//           <p className="text-sm font-normal dark:text-white/60 line-clamp-2">
//             {description}
//           </p>
//         </div>
//       </div>
//     </figure>
//   );
// };

const Notification = ({ name, description, icon, time, iconSize = 40, whiteBackground = false, className = "" }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-3",
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
        "relative flex h-[500px] w-full flex-col p-10 overflow-hidden rounded-lg md:shadow-xl",
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