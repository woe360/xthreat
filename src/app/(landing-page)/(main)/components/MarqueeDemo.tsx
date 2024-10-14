// import { cn } from "@/lib/utils";
// import Marquee from "@/components/ui/marquee";

// const reviews = [
//   {
//     name: "Jack",
//     username: "@jack",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

// const ReviewCard = ({
//   img,
//   name,
//   username,
//   body,
// }: {
//   img: string;
//   name: string;
//   username: string;
//   body: string;
// }) => {
//   return (
//     <figure
//       className={cn(
//         "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
//         // light styles
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         // dark styles
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         <img className="rounded-full" width="32" height="32" alt="" src={img} />
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white">
//             {name}
//           </figcaption>
//           <p className="text-xs font-medium dark:text-white/40">{username}</p>
//         </div>
//       </div>
//       <blockquote className="mt-2 text-sm">{body}</blockquote>
//     </figure>
//   );
// };

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:20s]">
//         {firstRow.map((review) => (
//           <ReviewCard key={review.username} {...review} />
//         ))}
//       </Marquee>
//       <Marquee reverse pauseOnHover className="[--duration:20s]">
//         {secondRow.map((review) => (
//           <ReviewCard key={review.username} {...review} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
//     </div>
//   );
// }



// import { cn } from "@/lib/utils";
// import Marquee from "@/components/ui/marquee";

// const jobFunctions = [
//   {
//     role: "IT Manager",
//     description: "Learn to develop and implement security policies and procedures.",
//     icon: "👨‍💼",
//   },
//   {
//     role: "Software Developer",
//     description: "Master secure coding practices and vulnerability assessment.",
//     icon: "👩‍💻",
//   },
//   {
//     role: "Network Administrator",
//     description: "Focus on network security, firewall management, and intrusion detection.",
//     icon: "🖧",
//   },
//   {
//     role: "Data Analyst",
//     description: "Understand data protection regulations and secure data handling practices.",
//     icon: "📊",
//   },
//   {
//     role: "Human Resources",
//     description: "Learn about employee data protection and security awareness programs.",
//     icon: "👥",
//   },
//   {
//     role: "Executive",
//     description: "Develop cybersecurity leadership skills and risk management strategies.",
//     icon: "🕴️",
//   },
// ];

// const firstRow = jobFunctions.slice(0, jobFunctions.length / 2);
// const secondRow = jobFunctions.slice(jobFunctions.length / 2);

// const JobFunctionCard = ({
//   icon,
//   role,
//   description,
// }: {
//   icon: string;
//   role: string;
//   description: string;
// }) => {
//   return (
//     <figure
//       className={cn(
//         "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-950/[.15]",
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         <div className="text-3xl">{icon}</div>
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white">
//             {role}
//           </figcaption>
//         </div>
//       </div>
//       <blockquote className="mt-2 text-sm">{description}</blockquote>
//     </figure>
//   );
// };

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-800 bg-gray-900/10 md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:30s]">
//         {firstRow.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <Marquee reverse pauseOnHover className="[--duration:30s]">
//         {secondRow.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-gray-900/70"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-gray-900/70"></div>
//     </div>
//   );
// }



// import { cn } from "@/lib/utils";
// import Marquee from "@/components/ui/marquee";
// import Image from "next/image";

// const jobFunctions = [
//   {
//     role: "IT Manager",
//     description: "Security policies and risk management",
//     icon: "👨‍💼",
//     image: "/assets/modelDemo.jpg"
//   },
//   {
//     role: "Software Developer",
//     description: "Secure coding and vulnerability assessment",
//     icon: "👩‍💻",
//     image: "/images/software-developer.jpg"
//   },
//   {
//     role: "Network Admin",
//     description: "Network security and intrusion detection",
//     icon: "🖧",
//     image: "/images/network-admin.jpg"
//   },
//   {
//     role: "Data Analyst",
//     description: "Data protection and secure handling",
//     icon: "📊",
//     image: "/images/data-analyst.jpg"
//   },
//   {
//     role: "HR Specialist",
//     description: "Employee data protection awareness",
//     icon: "👥",
//     image: "/images/hr-specialist.jpg"
//   },
//   {
//     role: "Executive",
//     description: "Cybersecurity leadership strategies",
//     icon: "🕴️",
//     image: "/images/executive.jpg"
//   },
// ];

// const JobFunctionCard = ({
//   icon,
//   role,
//   description,
//   image,
// }: {
//   icon: string;
//   role: string;
//   description: string;
//   image: string;
// }) => {
//   return (
//     <figure
//       className={cn(
//         "relative w-48 h-64 cursor-pointer overflow-hidden rounded-lg border m-2",
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
//       )}
//     >
//       <div className="relative h-32 w-full">
//         <Image 
//           src={image} 
//           alt={role} 
//           layout="fill" 
//           objectFit="cover"
//         />
//       </div>
//       <div className="p-3">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="text-2xl">{icon}</span>
//           <h3 className="text-sm font-medium dark:text-white truncate">
//             {role}
//           </h3>
//         </div>
//         <p className="text-xs text-gray-600 dark:text-gray-300">
//           {description}
//         </p>
//       </div>
//     </figure>
//   );
// };

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-background"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-background"></div>
//     </div>
//   );
// }


// import { cn } from "@/lib/utils";
// import Marquee from "@/components/ui/marquee";

// const jobFunctions = [
//   {
//     role: "IT Manager",
//     description: "Security policies and risk management",
//     icon: "🛡️",
//   },
//   {
//     role: "Software Dev",
//     description: "Secure coding practices",
//     icon: "💻",
//   },
//   {
//     role: "Network Admin",
//     description: "Network security and firewalls",
//     icon: "🌐",
//   },
//   {
//     role: "Data Analyst",
//     description: "Data protection compliance",
//     icon: "📊",
//   },
//   {
//     role: "HR Specialist",
//     description: "Employee security awareness",
//     icon: "👥",
//   },
//   {
//     role: "Executive",
//     description: "Cybersecurity strategy",
//     icon: "🎯",
//   },
// ];

// const JobFunctionCard = ({
//   icon,
//   role,
//   description,
// }: {
//   icon: string;
//   role: string;
//   description: string;
// }) => {
//   return (
//     <div
//       className={cn(
//         "relative w-56 h-24 flex items-center cursor-pointer overflow-hidden rounded-lg border m-2 p-3",
//         "border-gray-200 bg-white hover:bg-gray-50",
//         "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700",
//       )}
//     >
//       <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
//         <span className="text-2xl">{icon}</span>
//       </div>
//       <div className="flex-grow">
//         <h3 className="text-sm font-medium text-gray-900 dark:text-white">
//           {role}
//         </h3>
//         <p className="text-xs text-gray-500 dark:text-gray-300">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-gray-100 dark:bg-gray-900 md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <Marquee pauseOnHover reverse className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-gray-100 dark:from-gray-900"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-gray-100 dark:from-gray-900"></div>
//     </div>
//   );
// }


// import { cn } from "@/lib/utils";
// import Marquee from "@/components/ui/marquee";
// import { Shield, Code, Network, Database, Users, Target } from 'lucide-react';

// const jobFunctions = [
//   {
//     role: "IT Manager",
//     description: "Security policies and risk management",
//     Icon: Shield,
//   },
//   {
//     role: "Software Dev",
//     description: "Secure coding practices",
//     Icon: Code,
//   },
//   {
//     role: "Network Admin",
//     description: "Network security and firewalls",
//     Icon: Network,
//   },
//   {
//     role: "Data Analyst",
//     description: "Data protection compliance",
//     Icon: Database,
//   },
//   {
//     role: "HR Specialist",
//     description: "Employee security awareness",
//     Icon: Users,
//   },
//   {
//     role: "Executive",
//     description: "Cybersecurity strategy",
//     Icon: Target,
//   },
// ];

// const JobFunctionCard = ({
//   Icon,
//   role,
//   description,
// }) => {
//   return (
//     <div
//       className={cn(
//         "relative w-64 h-28 flex items-center cursor-pointer overflow-hidden rounded-lg border m-2 p-4",
//         "border-gray-700 bg-gray-900/20 hover:bg-black",
//         "transition-colors duration-300"
//       )}
//     >
//       <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-4">
//         <Icon className="w-6 h-6 text-blue-200" />
//       </div>
//       <div className="flex-grow">
//         <h3 className="text-md font-medium text-gray-100">
//           {role}
//         </h3>
//         <p className="text-sm text-gray-400 mt-1">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-800 bg-gray-900/10 md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <Marquee pauseOnHover reverse className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12"></div>
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

// Import all images
import ITImage from "../assets/images/IT.jpg";
import SoftwareImage from "../assets/images/Software.jpg";
import NetworkImage from "../assets/images/Network.jpg";
import DataImage from "../assets/images/Data.jpg";
import HRImage from "../assets/images/HR.jpg";
import ExecutiveImage from "../assets/images/Executive.jpg";

const jobFunctions = [
  {
    role: "IT Manager",
    description: "Security policies and risk management",
    image: ITImage,
  },
  {
    role: "Software Dev",
    description: "Secure coding practices",
    image: SoftwareImage,
  },
  {
    role: "Network Admin",
    description: "Network security and firewalls",
    image: NetworkImage,
  },
  {
    role: "Data Analyst",
    description: "Data protection compliance",
    image: DataImage,
  },
  {
    role: "HR Specialist",
    description: "Employee security awareness",
    image: HRImage,
  },
  {
    role: "Executive",
    description: "Cybersecurity strategy",
    image: ExecutiveImage,
  },
];

const JobFunctionCard = ({
  image,
  role,
  description,
}) => {
  return (
    <div
      className={cn(
        "relative w-64 h-28 flex items-center cursor-pointer overflow-hidden rounded-lg border m-2 p-4",
        "border-gray-700 bg-gray-900/20 hover:bg-black",
        "transition-colors duration-300"
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden mr-4">
        <Image
          src={image}
          alt={role}
          width={48}
          height={48}
          className="object-cover w-full h-full"
          quality={100}
          priority
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-md font-medium text-gray-100">
          {role}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:45s]">
        {jobFunctions.map((job) => (
          <JobFunctionCard key={job.role} {...job} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:45s]">
        {jobFunctions.map((job) => (
          <JobFunctionCard key={job.role} {...job} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-gray-900/10 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-gray-900/10 to-transparent"></div>
    </div>
  );
}

// const JobFunctionCard = ({
//   image,
//   role,
//   description,
// }) => {
//   return (
//     <div
//       className={cn(
//         "relative w-64 h-28 flex items-center cursor-pointer overflow-hidden rounded-lg border m-2 p-4",
//         "border-gray-700 bg-gray-900/20 hover:bg-black",
//         "transition-colors duration-300"
//       )}
//     >
//       <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden mr-4">
//         <Image
//           src={image}
//           alt={role}
//           width={48}
//           height={48}
//           className="object-cover w-full h-full"
//         />
//       </div>
//       <div className="flex-grow">
//         <h3 className="text-md font-medium text-gray-100">
//           {role}
//         </h3>
//         <p className="text-sm text-gray-400 mt-1">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-800 bg-gray-900/10 md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <Marquee pauseOnHover reverse className="[--duration:40s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-gray-900/10 to-transparent"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-gray-900/10 to-transparent"></div>
//     </div>
//   );
// }