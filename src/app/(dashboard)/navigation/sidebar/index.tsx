// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';
// import { menuOptions } from '@/lib/constant';
// import { LogOut, Bug, Upload } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Separator } from '@/components/ui/separator';
// import { cn } from "@/lib/utils";
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import XLogo from '../../../../(landing-page)/assets/XThreat_icon_primary_white_to_gradient.svg'
// import XLogoFull from '../../../../(landing-page)/assets/XThreat_Logotype_primary_white_to_gradient.svg'

// const HOVER_THRESHOLD = 65;
// const CLOSE_DELAY = 150;
// const MOBILE_BREAKPOINT = 768;

// interface BugReportModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const BugReportModal: React.FC<BugReportModalProps> = ({ isOpen, onClose }) => {
//   const [issueType, setIssueType] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [url, setUrl] = useState('');
//   const supabase = createClientComponentClient();

//   const resetForm = () => {
//     setIssueType('');
//     setDescription('');
//     setImage(null);
//     setUrl('');
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setImage(files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
      
//       if (userError) throw userError;

//       console.log({ 
//         userId: user?.id,
//         issueType, 
//         description, 
//         image, 
//         url 
//       });
      
//       resetForm();
//       onClose();
//     } catch (error) {
//       console.error('Error submitting bug report:', error);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent 
//         className="sm:max-w-[425px] text-white [&>button]:hidden" 
//         style={{
//           background: '#050607',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-sans text-center font-base">Report a Bug</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Select value={issueType} onValueChange={setIssueType}>
//               <SelectTrigger 
//                 className={cn(
//                   "w-full px-5 py-6 rounded-lg bg-gray-700/30 hover:bg-gray-700/40 text-gray-300 border border-gray-800",
//                   "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 )}
//               >
//                 <div className="flex items-center text-neutral-400 justify-center w-full gap-2">
//                   <SelectValue placeholder="Select an issue type" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent className="bg-[#050607] border border-gray-800">
//                 <SelectItem value="ui" className="text-center text-gray-300 focus:bg-neutral-800/30">UI Problem</SelectItem>
//                 <SelectItem value="functionality" className="text-center text-gray-300 focus:bg-neutral-800">Functionality Issue</SelectItem>
//                 <SelectItem value="performance" className="text-center text-gray-300 focus:bg-neutral-800">Performance Problem</SelectItem>
//                 <SelectItem value="other" className="text-center text-gray-300 focus:bg-neutral-800">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <div className="flex items-start mt-2">
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 className="w-full bg-gray-700/30 hover:bg-gray-700/40 h-12 text-neutral-400 border border-gray-800 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 onClick={() => document.getElementById('image')?.click()}
//               >
//                 <Upload className="mr-2 h-4 w-4 text-neutral-400" /> Upload Image
//               </Button>
//             </div>
//             {image && <span className="text-sm mt-1 block text-gray-400">{image.name}</span>}
//           </div>

//           <div>
//             <Input
//               id="url"
//               type="url"
//               placeholder="Enter the URL where the issue occurred"
//               value={url}
//               required
//               className={cn(
//                 "bg-gray-700/30 hover:bg-gray-700/40 text-gray-300 border border-gray-800 px-3 py-6 rounded-lg",
//                 "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//               )}
//               onChange={(e) => setUrl(e.target.value)}
//             />
//           </div>

//           <div>
//             <Textarea
//               id="description"
//               placeholder="Describe the issue in detail"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className={cn(
//                 "h-32 bg-gray-700/30 hover:bg-gray-700/40 text-gray-300 border border-gray-800 resize-none px-3 py-4 rounded-lg",
//                 "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//               )}
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button 
//               type="button" 
//               variant="ghost" 
//               className="bg-transparent hover:bg-transparent border border-transparent hover:border-gray-500 text-gray-300" 
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit" 
//               className="bg-gray-300 hover:bg-gray-100 text-gray-900"
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const MenuOptions = () => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(true);
//   const [isBugReportOpen, setIsBugReportOpen] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const closeTimeoutRef = useRef<NodeJS.Timeout>();
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   const handleClose = useCallback(() => {
//     if (closeTimeoutRef.current) {
//       clearTimeout(closeTimeoutRef.current);
//     }
//     closeTimeoutRef.current = setTimeout(() => {
//       setIsCollapsed(true);
//       setIsTransitioning(false);
//     }, CLOSE_DELAY);
//   }, []);

//   const handleMouseEnter = useCallback(() => {
//     if (closeTimeoutRef.current) {
//       clearTimeout(closeTimeoutRef.current);
//     }
//     setIsTransitioning(true);
//     setIsCollapsed(false);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     handleClose();
//   }, [handleClose]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current && 
//         !sidebarRef.current.contains(event.target as Node) &&
//         !isCollapsed && 
//         window.innerWidth <= MOBILE_BREAKPOINT
//       ) {
//         handleClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isCollapsed, handleClose]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= MOBILE_BREAKPOINT) {
//         setIsCollapsed(true);
//         setIsTransitioning(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (closeTimeoutRef.current) {
//         clearTimeout(closeTimeoutRef.current);
//       }
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       router.push('/');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <nav 
//       ref={sidebarRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className={cn(
//         "dark:bg-black h-screen font-sans flex flex-col sticky justify-between py-6",
//         "transition-[width] duration-200 ease-in-out will-change-[width]",
//         "border-r border-gray-800/20",
//         isCollapsed ? "w-16" : "w-[155px]",
//         isTransitioning && "shadow-lg"
//       )}
//       aria-expanded={!isCollapsed}
//     >
//       {/* Logo Container */}
//       <div className="px-2 mb-2">
//         <div className="flex justify-center items-center w-full">
//           <div className="relative w-full h-8 flex justify-center items-center">
//             <div className={cn(
//               "absolute transition-opacity ml-1 duration-200",
//               isCollapsed ? "opacity-100" : "opacity-0"
//             )}>
//               <Image
//                 src={XLogo}
//                 alt="X Logo"
//                 width={20}
//                 height={20}
//                 className="select-none"
//               />
//             </div>
//             <div className={cn(
//               "absolute transition-opacity duration-200",
//               isCollapsed ? "opacity-0" : "opacity-100"
//             )}>
//               <Image
//                 src={XLogoFull}
//                 alt="X Logo Full"
//                 width={80}
//                 height={20}
//                 className="select-none"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col items-start justify-start flex-grow gap-1 px-2 overflow-hidden">
//         {menuOptions.map((menuItem) => (
//           <Link
//             key={menuItem.name}
//             href={menuItem.href}
//             className={cn(
//               'group h-10 flex text-[15px] items-center rounded-lg py-2 px-[10px]',
//               'cursor-pointer transition-all duration-200 w-full',
//               'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500',
//               {
//                 'transition-all duration-200 bg-gradient-to-b from-[#21222f]/80 to-[#21222f]/60  text-gray-200': pathName === menuItem.href,
//                 'transition-all duration-200 hover:bg-gradient-to-b hover:from-[#21222f]/80 hover:to-[#21222f]/60  text-gray-400 hover:text-gray-200': pathName !== menuItem.href,
//               }
//             )}
//           >
//             <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//               <menuItem.Component 
//                 selected={pathName === menuItem.href}
//                 className="transition-transform duration-200 group-hover:scale-110" 
//               />
//             </div>
//             <span className={cn(
//               "ml-1 whitespace-nowrap overflow-hidden transition-all duration-200",
//               isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"
//             )}>
//               {menuItem.name}
//             </span>
//           </Link>
//         ))}
//       </div>

//       <div className="flex flex-col items-start mt-auto gap-2 w-full px-2 overflow-hidden">
//         <button           
//           onClick={() => setIsBugReportOpen(true)}           
//           className={cn(
//             "flex items-center w-full rounded-lg py-2 px-[10px]",
//             "text-gray-400 hover:text-gray-200 cursor-pointer",
//             "hover:bg-[#21222f] transition-all duration-200 group",
//             "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//           )}        
//         >           
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">             
//             <Bug 
//               className="text-gray-400 transition-all group-hover:text-gray-200 duration-200 group-hover:scale-110"              
//               size={20}  
//             />           
//           </div>           
//           <span className={cn(             
//             "mr-6 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-200",             
//             isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"          
//           )}>             
//             Report           
//           </span>         
//         </button>          

//         <Separator className="my-1" />
        
//         <button           
//           onClick={handleLogout}           
//           className={cn(
//             "flex items-center w-full rounded-lg py-2 px-[10px]",
//             "text-gray-400 hover:text-gray-200 cursor-pointer",
//             "hover:bg-[#21222f] transition-all duration-200 group",
//             "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//           )}         
//         >           
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">             
//             <LogOut 
//               className="text-gray-400 transition-all group-hover:text-gray-200 duration-200 group-hover:scale-110" 
//               size={20} 
//             />           
//           </div>           
//           <span className={cn(             
//             "mr-5 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-200",             
//             isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"           
//           )}>             
//             Log out           
//           </span>         
//         </button>
//       </div>

//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />
//     </nav>
//   );
// };

// export default MenuOptions;



// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';
// import { menuOptions } from '@/lib/constant';
// import { LogOut, Bug } from 'lucide-react';
// import XLogo from '../../../../(landing-page)/assets/XThreat_icon_primary_white_to_gradient.svg';
// import { Separator } from '@/components/ui/separator';
// import { cn } from "@/lib/utils";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { BugReportModal } from './BugReport';

// const MenuOptions = () => {
//   const pathName = usePathname();
//   const [isBugReportOpen, setIsBugReportOpen] = React.useState(false);
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       router.push('/');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const MenuItem = ({ href, name, icon: Icon }: { 
//     href: string; 
//     name: string; 
//     icon: React.ComponentType<any>;
//   }) => {
//     const isActive = pathName === href;

//     return (
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Link
//               href={href}
//               className={cn(
//                 'group h-10 flex items-center justify-center rounded-lg p-2',
//                 'cursor-pointer transition-colors duration-150',
//                 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500',
//                 {
//                   'bg-gradient-to-b from-[#21222f]/80 to-[#21222f]/60 text-gray-200': isActive,
//                   'hover:bg-gradient-to-b hover:from-[#21222f]/80 hover:to-[#21222f]/60 text-gray-400 hover:text-gray-200': !isActive,
//                 }
//               )}
//             >
//               <div className="w-7 h-7 flex items-center justify-center">
//                 <Icon 
//                   selected={isActive}
//                   className="transition-transform duration-150 group-hover:scale-110" 
//                 />
//               </div>
//             </Link>
//           </TooltipTrigger>
//           <TooltipContent 
//             side="right" 
//             sideOffset={5}
//             className="bg-gray-800 text-gray-200 border-gray-700 z-50"
//           >
//             {name}
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     );
//   };

//   return (
//     <nav 
//       className="dark:bg-black w-16 h-screen font-sans flex flex-col sticky justify-between py-6 border-r border-gray-800/20"
//     >
//       {/* Logo */}
//       <div className="px-2 mb-2 flex justify-center">
//         <Image
//           src={XLogo}
//           alt="X Logo"
//           width={20}
//           height={20}
//           className="select-none"
//         />
//       </div>

//       {/* Menu Items */}
//       <div className="flex flex-col items-center justify-start flex-grow gap-1 px-2">
//         {menuOptions.map((menuItem) => (
//           <MenuItem
//             key={menuItem.name}
//             href={menuItem.href}
//             name={menuItem.name}
//             icon={menuItem.Component}
//           />
//         ))}
//       </div>

//       {/* Bottom Actions */}
//       <div className="flex flex-col items-center mt-auto gap-2 w-full px-2">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button           
//                 onClick={() => setIsBugReportOpen(true)}           
//                 className={cn(
//                   "flex items-center justify-center w-10 h-10 rounded-lg",
//                   "text-gray-400 hover:text-gray-200 cursor-pointer",
//                   "hover:bg-[#21222f] transition-colors duration-150 group",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//                 )}        
//               >           
//                 <Bug 
//                   className="transition-transform group-hover:scale-110"              
//                   size={20}  
//                 />           
//               </button>
//             </TooltipTrigger>
//             <TooltipContent 
//               side="right" 
//               className="bg-gray-800 text-gray-200 border-gray-700"
//             >
//               Report
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//         <Separator className="my-1" />
        
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button           
//                 onClick={handleLogout}           
//                 className={cn(
//                   "flex items-center justify-center w-10 h-10 rounded-lg",
//                   "text-gray-400 hover:text-gray-200 cursor-pointer",
//                   "hover:bg-[#21222f] transition-colors duration-150 group",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//                 )}         
//               >           
//                 <LogOut 
//                   className="transition-transform group-hover:scale-110" 
//                   size={20} 
//                 />           
//               </button>
//             </TooltipTrigger>
//             <TooltipContent 
//               side="right" 
//               className="bg-gray-800 text-gray-200 border-gray-700"
//             >
//               Log out
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>

//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />
//     </nav>
//   );
// };

// export default MenuOptions;



// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';
// import { menuOptions } from '@/lib/constant';
// import { LogOut, Bug } from 'lucide-react';
// import XLogo from '../../../../(landing-page)/assets/XThreat_icon_primary_white_to_gradient.svg';
// import { Separator } from '@/components/ui/separator';
// import { cn } from "@/lib/utils";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { BugReportModal } from './BugReport';

// const MenuOptions = () => {
//   const pathName = usePathname();
//   const [isBugReportOpen, setIsBugReportOpen] = React.useState(false);
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       router.push('/');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const MenuItem = ({ href, name, icon: Icon }: { 
//     href: string; 
//     name: string; 
//     icon: React.ComponentType<any>;
//   }) => {
//     const isActive = pathName === href;

//     return (
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Link
//               href={href}
//               className={cn(
//                 'group h-10 flex items-center justify-center rounded-lg p-2',
//                 'cursor-pointer transition-colors duration-150',
//                 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500',
//                 {
//                   'bg-gradient-to-b from-[#21222f]/80 to-[#21222f]/60 text-gray-200': isActive,
//                   'hover:bg-gradient-to-b hover:from-[#21222f]/80 hover:to-[#21222f]/60 text-gray-400 hover:text-gray-200': !isActive,
//                 }
//               )}
//             >
//               <div className="w-7 h-7 flex items-center justify-center">
//                 <Icon 
//                   selected={isActive}
//                   className="transition-transform duration-150 group-hover:scale-110" 
//                 />
//               </div>
//             </Link>
//           </TooltipTrigger>
//           <TooltipContent 
//             side="right" 
//             sideOffset={5}
//             className="bg-gray-800 text-gray-200 border-gray-700 z-50"
//           >
//             {name}
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     );
//   };

//   return (
//     <nav 
//       className="dark:bg-black w-16 h-screen font-sans flex flex-col sticky justify-between py-6 border-r border-gray-800/20"
//     >
//       {/* Logo */}
//       <div className="px-2 mb-2 flex justify-center">
//         <Image
//           src={XLogo}
//           alt="X Logo"
//           width={20}
//           height={20}
//           className="select-none"
//         />
//       </div>

//       {/* Menu Items */}
//       <div className="flex flex-col items-center justify-start flex-grow gap-1 px-2">
//         {menuOptions.map((menuItem) => (
//           <MenuItem
//             key={menuItem.name}
//             href={menuItem.href}
//             name={menuItem.name}
//             icon={menuItem.Component}
//           />
//         ))}
//       </div>

//       {/* Bottom Actions */}
//       <div className="flex flex-col items-center mt-auto gap-2 w-full px-2">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button           
//                 onClick={() => setIsBugReportOpen(true)}           
//                 className={cn(
//                   "flex items-center justify-center w-10 h-10 rounded-lg",
//                   "text-gray-400 hover:text-gray-200 cursor-pointer",
//                   "hover:bg-[#21222f] transition-colors duration-150 group",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//                 )}        
//               >           
//                 <Bug 
//                   className="transition-transform group-hover:scale-110"              
//                   size={20}  
//                 />           
//               </button>
//             </TooltipTrigger>
//             <TooltipContent 
//               side="right" 
//               className="bg-gray-800 text-gray-200 border-gray-700"
//             >
//               Report
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//         <Separator className="my-1" />
        
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button           
//                 onClick={handleLogout}           
//                 className={cn(
//                   "flex items-center justify-center w-10 h-10 rounded-lg",
//                   "text-gray-400 hover:text-gray-200 cursor-pointer",
//                   "hover:bg-[#21222f] transition-colors duration-150 group",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//                 )}         
//               >           
//                 <LogOut 
//                   className="transition-transform group-hover:scale-110" 
//                   size={20} 
//                 />           
//               </button>
//             </TooltipTrigger>
//             <TooltipContent 
//               side="right" 
//               className="bg-gray-800 text-gray-200 border-gray-700"
//             >
//               Log out
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>

//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />
//     </nav>
//   );
// };

// export default MenuOptions;




// 'use client'

// import Link from 'next/link'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React, { useState, useEffect } from 'react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { useRouter } from 'next/navigation'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/tooltip'
// import { getMenuOptions } from '@/lib/constant'
// import { LogOut, Bug } from 'lucide-react'
// import { Separator } from '@/components/separator'
// import { cn } from "@/lib/utils"
// import XLogo from '../../../../(marketing)/assets/XThreat_icon_primary_white_to_gradient.svg'
// import { BugReportModal } from './BugReport'

// const MenuOptions = () => {
//   const pathName = usePathname()
//   const [isBugReportOpen, setIsBugReportOpen] = useState(false)
//   const [userRole, setUserRole] = useState<'admin' | 'manager' | 'user' | undefined>()
//   const [menuItems, setMenuItems] = useState(getMenuOptions())
//   const supabase = createClientComponentClient()
//   const router = useRouter()

//   useEffect(() => {
//     const getUserRole = async () => {
//       try {
//         const { data: { user }, error } = await supabase.auth.getUser()
//         if (error) throw error

//         console.log('User ID:', user?.id) // Debug log

//         // Fetch user role from your database
//         const { data: profile, error: profileError } = await supabase
//           .from('users')
//           .select('role')
//           .eq('id', user?.id)
//           .single()

//         if (profileError) throw profileError

//         console.log('User Role from DB:', profile?.role) // Debug log
        
//         setUserRole(profile?.role as 'admin' | 'manager' | 'user')
//         const roleSpecificMenuItems = getMenuOptions(profile?.role as 'admin' | 'manager' | 'user')
//         console.log('Menu Items for role:', roleSpecificMenuItems) // Debug log
        
//         setMenuItems(roleSpecificMenuItems)
//       } catch (error) {
//         console.error('Error fetching user role:', error)
//         // Default to user role if there's an error
//         setMenuItems(getMenuOptions('user'))
//       }
//     }

//     getUserRole()
//   }, [supabase])

//   const isPathActive = (href: string) => {
//     return pathName.startsWith(href)
//   }

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut()
//       if (error) throw error
//       router.push('/')
//     } catch (error) {
//       console.error('Error logging out:', error)
//     }
//   }

//   return (
//     <nav className="dark:bg-black w-16 h-screen font-sans flex flex-col sticky justify-between py-6 border-r border-gray-800/20 z-[100] flex-shrink-0">
//       {/* Logo */}
//       <div className="px-2 mb-3 flex justify-center">
//         <Image
//           src={XLogo}
//           alt="X Logo"
//           width={20}
//           height={20}
//           className="select-none"
//         />
//       </div>

//       {/* Menu Items */}
//       <div className="flex flex-col items-center justify-start flex-grow gap-1 px-2">
//         <TooltipProvider delayDuration={0}>
//           {menuItems.map((menuItem) => (
//             <Tooltip key={menuItem.name}>
//               <TooltipTrigger asChild>
//                 <Link
//                   href={menuItem.href}
//                   className={cn(
//                     'group h-10 flex items-center justify-center rounded-lg p-2',
//                     'cursor-pointer transition-colors duration-150',
//                     'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500',
//                     {
//                       'bg-gradient-to-b from-[#21222f]/80 to-[#21222f]/60 text-gray-200': isPathActive(menuItem.href),
//                       'hover:bg-gradient-to-b hover:from-[#21222f]/80 hover:to-[#21222f]/60 text-gray-400 hover:text-gray-200': !isPathActive(menuItem.href),
//                     }
//                   )}
//                 >
//                   <div className="w-7 h-7 flex items-center justify-center">
//                     <menuItem.Component 
//                       selected={isPathActive(menuItem.href)}
//                       className="transition-transform duration-150 group-hover:scale-110" 
//                     />
//                   </div>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent 
//                 side="right" 
//                 sideOffset={10}
//                 className="bg-[#181b24] text-gray-200 border-gray-700 z-[9999]"
//               >
//                 {menuItem.name}
//               </TooltipContent>
//             </Tooltip>
//           ))}
//         </TooltipProvider>
//       </div>

//       {/* Bottom Actions */}
//       <div className="flex flex-col items-center mt-auto gap-2 w-full px-2">
//         <TooltipProvider delayDuration={0}>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button           
//                 onClick={() => setIsBugReportOpen(true)}           
//                 className={cn(
//                   "flex items-center justify-center w-10 h-10 rounded-lg",
//                   "text-gray-400 hover:text-gray-200 cursor-pointer",
//                   "hover:bg-[#21222f] transition-colors duration-150 group",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//                 )}        
//               >           
//                 <Bug 
//                   className="transition-transform group-hover:scale-110"              
//                   size={20}  
//                 />           
//               </button>
//             </TooltipTrigger>
//             <TooltipContent 
//               side="right" 
//               sideOffset={10}
//               className="bg-[#181b24] text-gray-200 border-gray-700 z-[9999]"
//             >
//               Report
//             </TooltipContent>
//           </Tooltip>

//           <Separator className="my-1" />
          
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <button           
//                 onClick={handleLogout}           
//                 className={cn(
//                   "flex items-center justify-center w-10 h-10 rounded-lg",
//                   "text-gray-400 hover:text-gray-200 cursor-pointer",
//                   "hover:bg-[#21222f] transition-colors duration-150 group",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
//                 )}         
//               >           
//                 <LogOut 
//                   className="transition-transform group-hover:scale-110" 
//                   size={20} 
//                 />           
//               </button>
//             </TooltipTrigger>
//             <TooltipContent 
//               side="right" 
//               sideOffset={10}
//               className="bg-[#181b24] text-gray-200 border-gray-700 z-[9999]"
//             >
//               Log out
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>

//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />
//     </nav>
//   )
// }

// export default MenuOptions

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip'
import { getMenuOptions } from '@/lib/constant'
import { LogOut, Bug } from 'lucide-react'
import { Separator } from '@/components/separator'
import { cn } from "@/lib/utils"
import { getDeviceInfo } from '@/lib/utils/session'
import XLogo from '../../../../app/(marketing)/assets/XThreat_icon_primary_white_to_gradient.svg'
import { BugReportModal } from './BugReport'

const MenuOptions = () => {
  const pathName = usePathname()
  const [isBugReportOpen, setIsBugReportOpen] = useState(false)
  const [userRole, setUserRole] = useState<'admin' | 'manager' | 'user' | undefined>()
  const [menuItems, setMenuItems] = useState<ReturnType<typeof getMenuOptions>>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUserRole = async () => {
      setIsLoading(true)
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()
        
        if (authError) {
          console.error('Auth error:', authError)
          throw authError
        }

        if (!user?.id) {
          console.error('No user ID found')
          setMenuItems(getMenuOptions('user'))
          return
        }

        const { data: userData, error: dbError } = await supabase
          .from('users')
          .select('id, email, role, first_name, last_name')
          .eq('email', user.email)
          .single()

        let role: 'admin' | 'manager' | 'user'

        if (dbError) {
          console.error('Database error details:', dbError)
          role = 'user'
        } else if (!userData) {
          console.log('No user found in database, creating new user record')
          const { data: insertData, error: insertError } = await supabase
            .from('users')
            .insert([
              { 
                id: user.id,
                email: user.email,
                role: 'user',
                first_name: user.user_metadata?.first_name || '',
                last_name: user.user_metadata?.last_name || ''
              }
            ])
            .select()
            .single()

          if (insertError) {
            console.error('Error inserting new user:', insertError)
            role = 'user'
          } else {
            console.log('Created new user record:', insertData)
            role = insertData.role as 'admin' | 'manager' | 'user'
          }
        } else {
          role = (userData.role as 'admin' | 'manager' | 'user') || 'user'
          console.log('Using role from database:', role)
        }

        setUserRole(role)
        setMenuItems(getMenuOptions(role))
      } catch (error) {
        console.error('Error in getUserRole:', error)
        setMenuItems(getMenuOptions('user'))
      } finally {
        setIsLoading(false)
      }
    }

    getUserRole()
  }, [supabase])

  const isPathActive = (href: string) => {
    if (href === '/' || href === '') {
      return pathName === href
    }
    
    const pathSegments = pathName.split('/')
    const hrefSegments = href.split('/')
    
    for (let i = 0; i < hrefSegments.length; i++) {
      if (hrefSegments[i] !== pathSegments[i]) {
        return false
      }
    }
    
    return true
  }

  const handleLogout = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.id) {
        try {
          // Get the last login session for this user
          const { data: lastLoginSession, error: sessionError } = await supabase
            .from('user_sessions')
            .select('*')
            .eq('user_id', user.id)
            .eq('event_type', 'login')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          if (sessionError) {
            console.error('Error fetching last login session:', sessionError);
          }

          // Calculate session duration if we have a last login
          const sessionDuration = lastLoginSession 
            ? Math.floor((new Date().getTime() - new Date(lastLoginSession.created_at).getTime()) / 1000) // Duration in seconds
            : null;

          console.log('Last login session:', lastLoginSession);
          console.log('Calculated session duration:', sessionDuration);

          // Track logout event with all session info
          const { error: insertError } = await supabase
            .from('user_sessions')
            .insert({
              user_id: user.id,
              event_type: 'logout',
              timestamp: new Date().toISOString(),
              ip_address: window.location.hostname,
              user_agent: navigator.userAgent,
              device_info: getDeviceInfo(),
              session_id: lastLoginSession?.session_id || null,
              session_status: 'terminated',
              last_active_at: new Date().toISOString(),
              session_duration: sessionDuration,
              created_at: new Date().toISOString()
            });

          if (insertError) {
            console.error('Error inserting logout session:', insertError);
          }
        } catch (error) {
          console.error('Error tracking logout:', error);
          // Continue with logout even if tracking fails
        }
      }

      // Always attempt to sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="dark:bg-black w-16 h-screen font-sans flex flex-col sticky justify-between py-6 z-[100] flex-shrink-0">
      <div className="px-2 mb-4 flex justify-center">
        <Image
          src={XLogo}
          alt="X Logo"
          width={20}
          height={20}
          className="select-none"
        />
      </div>

      <div className="flex flex-col items-center justify-start flex-grow gap-1 px-2">
        <TooltipProvider delayDuration={0}>
          {!isLoading && menuItems.map((menuItem) => (
            <Tooltip key={menuItem.name}>
              <TooltipTrigger asChild>
                <Link
                  href={menuItem.href}
                  className={cn(
                    'group h-10 flex items-center justify-center rounded-md p-2',
                    'cursor-pointer transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500',
                    {
                      'bg-gradient-to-b from-[#21222f]/80 to-[#21222f]/60 text-gray-200': isPathActive(menuItem.href),
                      'hover:bg-gradient-to-b hover:from-[#21222f]/80 hover:to-[#21222f]/60 text-gray-400 hover:text-gray-200': !isPathActive(menuItem.href),
                    }
                  )}
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <div className="transition-transform duration-150 group-hover:scale-110">
                      <menuItem.Component selected={isPathActive(menuItem.href)} />
                    </div>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                sideOffset={10}
                className="bg-[#181b24] text-gray-200 border-gray-700 z-[9999]"
              >
                {menuItem.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div className="flex flex-col items-center mt-auto gap-2 w-full px-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button           
                onClick={() => setIsBugReportOpen(true)}           
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  "text-gray-400 hover:text-gray-200 cursor-pointer",
                  "hover:bg-[#21222f] transition-colors duration-150 group",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                )}        
              >           
                <Bug 
                  className="transition-transform group-hover:scale-110"              
                  size={20}  
                />           
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="right" 
              className="bg-gray-800 text-gray-200 border-gray-700"
            >
              Report
            </TooltipContent>
          </Tooltip>

          <Separator className="my-1" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button           
                onClick={handleLogout}           
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  "text-gray-400 hover:text-gray-200 cursor-pointer",
                  "hover:bg-[#21222f] transition-colors duration-150 group",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                )}         
              >           
                <LogOut 
                  className="transition-transform group-hover:scale-110" 
                  size={20} 
                />           
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="right" 
              className="bg-gray-800 text-gray-200 border-gray-700"
            >
              Log out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
      />
    </nav>
  )
}

export default MenuOptions
