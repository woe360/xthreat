import { cn } from '@/lib/utils'
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconShieldCheck,
} from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
  {
    title: "Comprehensive Training Modules",
    description: "Explore training modules on phishing awareness, password management, malware protection, and social engineering defenses.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconShieldCheck className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Interactive Simulations",
    description: "Hands-on experience with simulations for phishing, ransomware response, and incident handling.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Customized Learning Paths",
    description: "Personalized learning paths for different roles, from general staff to IT professionals.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Real-Time Reporting and Analytics",
    description: "Monitor progress and understand training impact through real-time reporting and analytics.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];

const CyberSecurityGrid = () => {
  return (
    <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

export default CyberSecurityGrid;

