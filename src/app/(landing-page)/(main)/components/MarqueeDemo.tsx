// import { cn } from "@/lib/utils";
// import Marquee from "@/components/ui/marquee";
// import Image from "next/image";
// import { StaticImageData } from "next/image";

// // Import all images
// import ITImage from "../assets/images/IT.jpg";
// import SoftwareImage from "../assets/images/Software.jpg";
// import NetworkImage from "../assets/images/Network.jpg";
// import DataImage from "../assets/images/Data.jpg";
// import HRImage from "../assets/images/HR.jpg";
// import ExecutiveImage from "../assets/images/Executive.jpg";

// interface JobFunction {
//   role: string;
//   description: string;
//   image: StaticImageData;
// }

// const jobFunctions: JobFunction[] = [
//   {
//     role: "IT Manager",
//     description: "Security policies and risk management",
//     image: ITImage,
//   },
//   {
//     role: "Software Dev",
//     description: "Secure coding practices",
//     image: SoftwareImage,
//   },
//   {
//     role: "Network Admin",
//     description: "Network security and firewalls",
//     image: NetworkImage,
//   },
//   {
//     role: "Data Analyst",
//     description: "Data protection compliance",
//     image: DataImage,
//   },
//   {
//     role: "HR Specialist",
//     description: "Employee security awareness",
//     image: HRImage,
//   },
//   {
//     role: "Executive",
//     description: "Cybersecurity strategy",
//     image: ExecutiveImage,
//   },
// ];

// interface JobFunctionCardProps {
//   image: StaticImageData;
//   role: string;
//   description: string;
// }

// const JobFunctionCard = ({
//   image,
//   role,
//   description,
// }: JobFunctionCardProps) => {
//   return (
//     <div
//       className={cn(
//         "relative w-64 h-28 flex items-center cursor-pointer overflow-hidden rounded-lg border m-2 p-4",
//         "border-gray-700 bg-black",
//         "transition-colors duration-300"
//       )}
//     >
//       <div className="flex-shrink-0 w-12 h-12 select-none pointer-events-none rounded-xl overflow-hidden mr-4">
//         <Image
//           src={image}
//           alt={role}
//           width={48}
//           height={48}
//           className="object-cover w-full h-full"
//           quality={100}
//           priority
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
//     <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
//       <Marquee pauseOnHover className="[--duration:45s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <Marquee pauseOnHover reverse className="[--duration:45s]">
//         {jobFunctions.map((job) => (
//           <JobFunctionCard key={job.role} {...job} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-gray-900/10 to-transparent"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-gray-900/10 to-transparent"></div>
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import { StaticImageData } from "next/image";

// Import all images
import ITImage from "../assets/images/IT.jpg";
import SoftwareImage from "../assets/images/Software.jpg";
import NetworkImage from "../assets/images/Network.jpg";
import DataImage from "../assets/images/Data.jpg";
import HRImage from "../assets/images/HR.jpg";
import ExecutiveImage from "../assets/images/Executive.jpg";

interface JobFunction {
  role: string;
  description: string;
  image: StaticImageData;
  imagePosition?: string;
}

const jobFunctions: JobFunction[] = [
  {
    role: "IT Manager",
    description: "Security policies and risk management",
    image: ITImage,
    imagePosition: "object-[center_30%]",
  },
  {
    role: "Software Developer",
    description: "Secure coding practices",
    image: SoftwareImage,
    imagePosition: "object-[center_5%]",
  },
  {
    role: "Network Admin",
    description: "Network security and firewalls",
    image: NetworkImage,
    imagePosition: "object-[center_50%]",
  },
  {
    role: "Data Analyst",
    description: "Data protection compliance",
    image: DataImage,
    imagePosition: "object-[center_30%]",
  },
  {
    role: "HR Specialist",
    description: "Employee security awareness",
    image: HRImage,
    imagePosition: "object-[center_35%]",
  },
  {
    role: "Executive",
    description: "Cybersecurity strategy",
    image: ExecutiveImage,
    imagePosition: "object-[center_5%]",
  },
];

interface JobFunctionCardProps {
  image: StaticImageData;
  role: string;
  description: string;
  imagePosition?: string;
}

const JobFunctionCard = ({
  image,
  role,
  description,
  imagePosition = "object-center",
}: JobFunctionCardProps) => {
  return (
    <div
      className={cn(
        "relative w-64 h-28 flex items-center cursor-pointer overflow-hidden rounded-lg border m-2 p-4",
        "border-gray-700 bg-black",
        "transition-colors duration-300"
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 select-none pointer-events-none rounded-xl overflow-hidden mr-4">
        <Image
          src={image}
          alt={role}
          width={48}
          height={48}
          className={cn("object-cover w-full h-full", imagePosition)}
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
  // Create a shifted version of jobFunctions for the second row
  const shiftedJobs = [...jobFunctions.slice(3), ...jobFunctions.slice(0, 3)];

  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:45s]">
        {jobFunctions.map((job) => (
          <JobFunctionCard 
            key={job.role} 
            {...job} 
            imagePosition={job.imagePosition}
          />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:45s]">
        {shiftedJobs.map((job) => (
          <JobFunctionCard 
            key={job.role} 
            {...job} 
            imagePosition={job.imagePosition}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-gray-900/10 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-gray-900/10 to-transparent"></div>
    </div>
  );
}