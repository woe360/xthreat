// 'use client'
// import React, { useState, useRef, useEffect } from 'react'
// import { ModeToggle } from '../global/mode-toggle'
// import { Book, Headphones, Search, User, Settings, UserCircle, LogOut, X, Upload } from 'lucide-react'
// import Templates from '../icons/cloud_download'
// import { Input } from '@/components/ui/input'
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CircleCheck } from "lucide-react"
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
// import { ScrollArea } from '@radix-ui/react-scroll-area';

// type Props = {}

// const UserDropdown = ({ isOpen, onClose }) => {
//   const router = useRouter()

//   if (!isOpen) return null;

//   const handleLinkClick = (href) => {
//     router.push(href)
//     onClose()
//   }

//   return (
//     <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black mb-4 border border-gray-700 z-10 overflow-hidden">
//       <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//         <button onClick={() => handleLinkClick('/settings')} className="flex border-b items-center px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors duration-150 w-full text-left" role="menuitem">
//           <Settings className="mr-3" size={18} />
//           Settings
//         </button>
//         <button onClick={() => handleLinkClick('/account')} className="flex border-b items-center px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors duration-150 w-full text-left" role="menuitem">
//           <UserCircle className="mr-3" size={18} />
//           Account
//         </button>
//         <button onClick={() => handleLinkClick('/')} className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-800 transition-colors duration-150 w-full text-left" role="menuitem">
//           <LogOut className="mr-3" size={18} />
//           Sign out
//         </button>
//       </div>
//     </div>
//   )
// }

// const BugReportModal = ({ isOpen, onClose }) => {
//   const [issueType, setIssueType] = useState('')
//   const [description, setDescription] = useState('')
//   const [image, setImage] = useState(null)
//   const [url, setUrl] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle form submission here
//     console.log({ issueType, description, image, url })
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[425px] text-white" 
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Report a Bug</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Issue Type Dropdown */}
//           <div>
//             <Label htmlFor="issue-type">Issue Type</Label>
//             <div className="flex items-center mt-2"></div>
//               <Select value={issueType} onValueChange={setIssueType}>
//                 <SelectTrigger 
//                   id="issue-type" 
//                   className="w-full bg-gray-700 focus:outline-none focus:border-none border-none focus:ring-0 focus:ring-offset-0"
//                   style={{
//                     boxShadow: 'none',
//                     border: 'none',     
//                   }}
//                 >
//                   <SelectValue placeholder="Select an issue type" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-700">
//                   <SelectItem className="hover:bg-gray-600 focus:bg-gray-600" value="ui">UI Problem</SelectItem>
//                   <SelectItem className="hover:bg-gray-600 focus:bg-gray-600" value="functionality">Functionality Issue</SelectItem>
//                   <SelectItem className="hover:bg-gray-600 focus:bg-gray-600" value="performance">Performance Problem</SelectItem>
//                   <SelectItem className="hover:bg-gray-600 focus:bg-gray-600" value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
          
//           </div>

//           {/* Image Upload */}
//           <div>
//             <Label htmlFor="image">Attach Image (optional)</Label>
//             <div className="flex items-center mt-2">
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 className="w-full bg-gray-700 hover:bg-gray-600 text-white border-none focus:outline-none"
//                 onClick={() => document.getElementById('image').click()}
//               >
//                 <Upload className="mr-2 h-4 w-4" /> Upload Image
//               </Button>
//             </div>
//             {image && <span className="text-sm mt-1 block">{image.name}</span>}
//           </div>

//           {/* URL Input */}
//           <div>
//             <Label htmlFor="url">URL (optional)</Label>
//             <div className="flex items-center mt-2"></div>
//               <Input
//                 id="url"
//                 type="url"
//                 placeholder="Enter the URL where the issue occurred"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 className="bg-gray-700 text-white border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
//                 style={{
//                   boxShadow: 'none', 
//                   border: 'none',    
//                 }}
//               />
            
//           </div>

//           {/* Description */}
//           <div>
//             <Label htmlFor="description">Description</Label>
//             <div className="flex items-center mt-2"></div>
//             <Textarea
//               id="description"
//               placeholder="Describe the issue in detail"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="h-32 bg-gray-700 text-white border-none focus:outline-none focus:ring-0 focus:ring-offset-0 resize-none"
//               style={{
//                 boxShadow: 'none', 
//                 border: 'none',     
//               }}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="ghost" className=" hover:bg-gray-600" onClick={onClose}>Cancel</Button>
//             <Button type="submit" className="bg-gray-300 hover:bg-gray-100">Submit Report</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// const UserGuideModal = ({ isOpen, onClose }) => {
//   const [activeSection, setActiveSection] = useState("getting-started");

//   const guideContent = [
//     {
//       id: "getting-started",
//       title: "Getting Started",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Welcome to our platform! Here's how to get started:</p>
//           <ol className="list-decimal list-inside space-y-2 pl-4">
//             <li>Sign up for an account using your work email address.</li>
//             <li>Verify your email to activate your account.</li>
//             <li>Log in to access your dashboard.</li>
//             <li>Familiarize yourself with the platform.</li>
//             <li>Explore the different sections of the platform using the navigation menu.</li>
//             <li>Start improving your cyber security knowledge and gain points.</li>
//           </ol>
//         </div>
//       ),
//     },
//     {
//       id: "features",
//       title: "Key Features",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Explore our main features including:</p>
//           <ul className="list-disc list-inside space-y-2 pl-4">
//             <li>
//               <strong>Top Bar:</strong> Quick access to important information and actions.
//               <ul className="list-circle list-inside ml-8 mt-2 space-y-1">
//                 <li>Points System: Track your engagement and rewards.</li>
//                 <li>Bug Reporting: Easily report issues you encounter.</li>
//                 <li>Guide: Access this guide anytime for help.</li>
//                 <li>User: Manage your account and settings.</li>
//               </ul>
//             </li>
//             <li><strong>Dashboard:</strong> Get an overview of your activities and progress.</li>
//             <li><strong>Modules:</strong> Improve by completing learning pathways, quizes to get points.</li>
//             <li><strong>Practice:</strong> Practice! Improve spoting threats through immersive simulations.</li>
//             <li><strong>Progress:</strong> Track your performance and gain insights.</li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       id: "account",
//       title: "Account Management",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Learn how to manage your account settings:</p>
//           <ol className="list-decimal list-inside space-y-2 pl-4">
//             <li>Access your account settings by clicking on your profile icon in the InfoBar.</li>
//             <li>Update your personal information, including name, role & email.</li>
//             <li>Manage your notification preferences to stay informed.</li>
//             <li>Set up two-factor authentication for enhanced security.</li>
//             <li>Review your account activity and sessions for any suspicious behavior.</li>
//           </ol>
//         </div>
//       ),
//     },
//     {
//       id: "troubleshooting",
//       title: "Troubleshooting",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Having issues? Here are some common problems and solutions:</p>
//           <div className="space-y-4">
//             <div>
//               <h4 className="font-semibold">1. Can't log in?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Ensure you're using the correct email and password.</li>
//                 <li>Try resetting your password using the "Forgot Password" link.</li>
//                 <li>Check if your account has been verified.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">2. InfoBar not loading?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Refresh the page or clear your browser cache.</li>
//                 <li>Ensure you have a stable internet connection.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">3. Points not updating?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>There might be a delay in point calculation. Wait for a few minutes and refresh.</li>
//                 <li>Contact support if the issue persists for more than 24 hours.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">4. Bug report not submitting?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Ensure all required fields are filled out.</li>
//                 <li>Try using a different browser or device.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">5. Performance issues?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Close unnecessary browser tabs and applications.</li>
//                 <li>Clear your browser cache and cookies.</li>
//                 <li>Check your internet connection speed.</li>
//               </ul>
//             </div>
//           </div>
//           <p className="mt-4 italic">If you continue to experience issues, please contact support@xthreat.eu</p>
//         </div>
//       ),
//     },
//     {
//       id: "faq",
//       title: "FAQ",
//       content: (
//         <div className="space-y-6">
//           <p className="text-lg">Frequently asked questions and their answers:</p>
//           <div className="space-y-4">
//             <div>
//               <h4 className="font-semibold">Q: How do I earn points?</h4>
//               <p>A: You can earn points by completing tasks, reporting bugs, and actively participating in the community.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold flex flex-row">Q: How do I report a bug?</h4>
//               <p>A: Click on the <Bug className="h-5 inline-block"/> icon in the top bar to open the bug report form. Fill out the details and submit.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: Is my data secure?</h4>
//               <p>A: We take data security seriously. All data is encrypted, and we regularly update our security measures.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: Can I delete my account?</h4>
//               <p>A: In Short No. Your account can be removed by your manager.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: How often is the platform updated?</h4>
//               <p>A: We release updates and new features regularly. Check our blog or announcements section for the latest information.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: How can I contact support?</h4>
//               <p>A: You can reach our support team through the Help Center or by emailing support@xthreat.eu</p>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[900px] h-[80vh] text-white"
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold">User Guide</DialogTitle>
//         </DialogHeader>

//         <div className="flex h-full mt-4 overflow-hidden">
//           {/* Sidebar */}
//           <div className="w-1/4 pr-5 border-r border-gray-700 h-full overflow-auto">
//             <Accordion type="single" collapsible className="w-full">
//               {guideContent.map((section) => (
//                 <AccordionItem value={section.id} key={section.id}>
//                   <AccordionTrigger
//                     onClick={() => setActiveSection(section.id)}
//                     className={`${
//                       activeSection === section.id ? 'bg-gray-700' : ''
//                     } hover:bg-gray-600 px-2 py-2 rounded text-left mt-3`}
//                   >
//                     {section.title}
//                   </AccordionTrigger>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </div>

//           {/* Content Area */}
//           <div className="w-3/4 pl-6">
//             <ScrollArea className="h-[calc(80vh-100px)] pr-4">
//               {guideContent.map((section) => (
//                 <div
//                   key={section.id}
//                   className={`${
//                     activeSection === section.id ? 'block' : 'hidden'
//                   }`}
//                 >
//                   <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
//                   <div className="text-gray-200">{section.content}</div>
//                 </div>
//               ))}
//             </ScrollArea>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const InfoBar = (props: Props) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isBugReportOpen, setIsBugReportOpen] = useState(false);
//   const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleDropdownClose = () => {
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="flex flex-row justify-end gap-6 sticky items-center px-4 py-4 w-full dark:bg-black">
//       <span className="flex items-center gap-2">
//         <p>Points: 250</p>
//       </span>
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <TooltipTrigger onClick={() => setIsBugReportOpen(true)}>
//             <Bug />
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Report</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
      
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <TooltipTrigger onClick={() => setIsUserGuideOpen(true)}>
//             <Book />
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Guide</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       {/* User Profile Icon with Enhanced Dropdown */}
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <TooltipTrigger>
//             <div ref={dropdownRef}>
//               <User 
//                 className="cursor-pointer w-6 h-6"
//                 onClick={handleDropdownToggle}
//               />
//               <UserDropdown 
//                 isOpen={isDropdownOpen}
//                 onClose={handleDropdownClose}
//               />
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>User</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       {/* Bug Report Modal */}
//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />

//       {/* User Guide Modal */}
//       <UserGuideModal
//         isOpen={isUserGuideOpen}
//         onClose={() => setIsUserGuideOpen(false)}
//       />
//     </div>
//   )
// }

// export default InfoBar









import React, { useState, useRef, useEffect } from 'react'
import { Bug, Book, User, Settings, UserCircle, LogOut, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ScrollArea } from '@radix-ui/react-scroll-area';

type Props = {}

const UserDropdown = ({ isOpen, onClose }) => {
  const router = useRouter()
  const handleLinkClick = (href) => {
    onClose()
    router.push(href)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[400px] p-6 text-white [&>button]:hidden"
        style={{
          background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex flex-row items-center justify-between space-x-4" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
          <Link
            href="/settings"
            onClick={() => handleLinkClick('/settings')}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-150 text-center"
            role="menuitem"
          >
            <Settings size={32} className="mb-2" />
            <span className="text-sm">Settings</span>
          </Link>
          <Link
            href="/account"
            onClick={() => handleLinkClick('/account')}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-150 text-center"
            role="menuitem"
          >
            <UserCircle size={32} className="mb-2" />
            <span className="text-sm">Account</span>
          </Link>
          <Link
            href="/"
            onClick={() => handleLinkClick('/')}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-150 text-center"
            role="menuitem"
          >
            <LogOut size={32} className="mb-2" />
            <span className="text-sm">Sign out</span>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}


// const UserDropdown = ({ isOpen, onClose }) => {
//   const router = useRouter()

//   const handleLinkClick = (href) => {
//     onClose()
//     router.push(href)
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[400px] p-0 text-white [&>button]:hidden"
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//           <Link
//             href="/settings"
//             onClick={() => handleLinkClick('/settings')}
//             className="flex items-center px-6 py-4 text-base text-white hover:bg-gray-700 transition-colors duration-150 w-full text-left border-b border-gray-700"
//             role="menuitem"
//           >
//             <Settings className="mr-4" size={22} />
//             Settings
//           </Link>
//           <Link
//             href="/account"
//             onClick={() => handleLinkClick('/account')}
//             className="flex items-center px-6 py-4 text-base text-white hover:bg-gray-700 transition-colors duration-150 w-full text-left border-b border-gray-700"
//             role="menuitem"
//           >
//             <UserCircle className="mr-4" size={22} />
//             Account
//           </Link>
//           <Link
//             href="/"
//             onClick={() => handleLinkClick('/')}
//             className="flex items-center px-6 py-4 text-base text-white hover:bg-gray-700 transition-colors duration-150 w-full text-left"
//             role="menuitem"
//           >
//             <LogOut className="mr-4" size={22} />
//             Sign out
//           </Link>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

//remove that fucking white select border


const BugReportModal = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ issueType, description, image, url })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px] text-white [&>button]:hidden" 
        style={{
          background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Report a Bug</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger id="issue-type" className="w-full bg-gray-700 focus:outline-none border-none">
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700">
                <SelectItem value="ui">UI Problem</SelectItem>
                <SelectItem value="functionality">Functionality Issue</SelectItem>
                <SelectItem value="performance">Performance Problem</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image">Attach Image (optional)</Label>
            <div className="flex items-center mt-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
              <Button
                type="button"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white border-none focus:outline-none"
                onClick={() => document.getElementById('image').click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
            </div>
            {image && <span className="text-sm mt-1 block">{image.name}</span>}
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="Enter the URL where the issue occurred"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-700 text-white border-none focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 bg-gray-700 text-white border-none focus:outline-none resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" className="hover:bg-gray-600" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-gray-300 hover:bg-gray-100">Submit Report</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const UserGuideModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const guideContent = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Welcome to our platform! Here's how to get started:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Sign up for an account using your work email address.</li>
            <li>Verify your email to activate your account.</li>
            <li>Log in to access your dashboard.</li>
            <li>Familiarize yourself with the platform.</li>
            <li>Explore the different sections of the platform using the navigation menu.</li>
            <li>Start improving your cyber security knowledge and gain points.</li>
          </ol>
        </div>
      ),
    },
    {
      id: "features",
      title: "Key Features",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Explore our main features including:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Top Bar:</strong> Quick access to important information and actions.
              <ul className="list-circle list-inside ml-8 mt-2 space-y-1">
                <li>Points System: Track your engagement and rewards.</li>
                <li>Bug Reporting: Easily report issues you encounter.</li>
                <li>Guide: Access this guide anytime for help.</li>
                <li>User: Manage your account and settings.</li>
              </ul>
            </li>
            <li><strong>Dashboard:</strong> Get an overview of your activities and progress.</li>
            <li><strong>Modules:</strong> Improve by completing learning pathways, quizzes to get points.</li>
            <li><strong>Practice:</strong> Practice spotting threats through immersive simulations.</li>
            <li><strong>Progress:</strong> Track your performance and gain insights.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "account",
      title: "Account Management",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Learn how to manage your account settings:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Access your account settings by clicking on your profile icon in the InfoBar.</li>
            <li>Update your personal information, including name, role & email.</li>
            <li>Manage your notification preferences to stay informed.</li>
            <li>Set up two-factor authentication for enhanced security.</li>
            <li>Review your account activity and sessions for any suspicious behavior.</li>
          </ol>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: (
        <div className="space-y-4">
          <p className="text-lg">Having issues? Here are some common problems and solutions:</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">1. Can't log in?</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Ensure you're using the correct email and password.</li>
                <li>Try resetting your password using the "Forgot Password" link.</li>
                <li>Check if your account has been verified.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">2. InfoBar not loading?</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Refresh the page or clear your browser cache.</li>
                <li>Ensure you have a stable internet connection.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">3. Points not updating?</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>There might be a delay in point calculation. Wait for a few minutes and refresh.</li>
                <li>Contact support if the issue persists for more than 24 hours.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">4. Bug report not submitting?</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Ensure all required fields are filled out.</li>
                <li>Try using a different browser or device.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">5. Performance issues?</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Close unnecessary browser tabs and applications.</li>
                <li>Clear your browser cache and cookies.</li>
                <li>Check your internet connection speed.</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 italic">If you continue to experience issues, please contact support@xthreat.eu</p>
        </div>
      ),
    },
    {
      id: "faq",
      title: "FAQ",
      content: (
        <div className="space-y-6">
          <p className="text-lg">Frequently asked questions and their answers:</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Q: How do I earn points?</h4>
              <p>A: You can earn points by completing tasks, reporting bugs, and actively participating in the community.</p>
            </div>
            <div>
              <h4 className="font-semibold flex flex-row">Q: How do I report a bug?</h4>
              <p>A: Click on the <Bug className="h-5 inline-block"/> icon in the top bar to open the bug report form. Fill out the details and submit.</p>
            </div>
            <div>
              <h4 className="font-semibold">Q: Is my data secure?</h4>
              <p>A: We take data security seriously. All data is encrypted, and we regularly update our security measures.</p>
            </div>
            <div>
              <h4 className="font-semibold">Q: Can I delete my account?</h4>
              <p>A: In Short No. Your account can be removed by your manager.</p>
            </div>
            <div>
              <h4 className="font-semibold">Q: How often is the platform updated?</h4>
              <p>A: We release updates and new features regularly. Check our blog or announcements section for the latest information.</p>
            </div>
            <div>
              <h4 className="font-semibold">Q: How can I contact support?</h4>
              <p>A: You can reach our support team through the Help Center or by emailing support@xthreat.eu</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[800px] max-w-full h-[80vh] [&>button]:hidden md:h-[85vh] lg:h-[70vh] text-white"
        style={{
          background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">User Guide</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row h-full mt-4 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 pr-5 border-b md:border-b-0 md:border-r border-gray-700 h-auto md:h-full overflow-y-auto">
            <div className="w-full">
              {guideContent.map((section) => (
                <div 
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    cursor-pointer px-4 py-3 text-left border-b border-gray-700 transition-colors duration-200
                    ${activeSection === section.id 
                      ? ' text-white' 
                      : 'bg-transprent text-gray-400 hover:text-gray-300'}
                  `}
                >
                  {section.title}
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full md:w-3/4 pl-6 h-full overflow-y-auto">
            <ScrollArea className="h-[calc(80vh-120px)] md:h-[calc(85vh-100px)] lg:h-[calc(90vh-120px)] pr-4">
              {guideContent.map((section) => (
                <div
                  key={section.id}
                  className={`${
                    activeSection === section.id ? 'block' : 'hidden'
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                  <div className="text-gray-200">{section.content}</div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// const UserGuideModal = ({ isOpen, onClose }) => {
//   const [activeSection, setActiveSection] = useState("getting-started");

//   const guideContent = [
//     {
//       id: "getting-started",
//       title: "Getting Started",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Welcome to our platform! Here's how to get started:</p>
//           <ol className="list-decimal list-inside space-y-2 pl-4">
//             <li>Sign up for an account using your work email address.</li>
//             <li>Verify your email to activate your account.</li>
//             <li>Log in to access your dashboard.</li>
//             <li>Familiarize yourself with the platform.</li>
//             <li>Explore the different sections of the platform using the navigation menu.</li>
//             <li>Start improving your cyber security knowledge and gain points.</li>
//           </ol>
//         </div>
//       ),
//     },
//     {
//       id: "features",
//       title: "Key Features",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Explore our main features including:</p>
//           <ul className="list-disc list-inside space-y-2 pl-4">
//             <li>
//               <strong>Top Bar:</strong> Quick access to important information and actions.
//               <ul className="list-circle list-inside ml-8 mt-2 space-y-1">
//                 <li>Points System: Track your engagement and rewards.</li>
//                 <li>Bug Reporting: Easily report issues you encounter.</li>
//                 <li>Guide: Access this guide anytime for help.</li>
//                 <li>User: Manage your account and settings.</li>
//               </ul>
//             </li>
//             <li><strong>Dashboard:</strong> Get an overview of your activities and progress.</li>
//             <li><strong>Modules:</strong> Improve by completing learning pathways, quizzes to get points.</li>
//             <li><strong>Practice:</strong> Practice spotting threats through immersive simulations.</li>
//             <li><strong>Progress:</strong> Track your performance and gain insights.</li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       id: "account",
//       title: "Account Management",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Learn how to manage your account settings:</p>
//           <ol className="list-decimal list-inside space-y-2 pl-4">
//             <li>Access your account settings by clicking on your profile icon in the InfoBar.</li>
//             <li>Update your personal information, including name, role & email.</li>
//             <li>Manage your notification preferences to stay informed.</li>
//             <li>Set up two-factor authentication for enhanced security.</li>
//             <li>Review your account activity and sessions for any suspicious behavior.</li>
//           </ol>
//         </div>
//       ),
//     },
//     {
//       id: "troubleshooting",
//       title: "Troubleshooting",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Having issues? Here are some common problems and solutions:</p>
//           <div className="space-y-4">
//             <div>
//               <h4 className="font-semibold">1. Can't log in?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Ensure you're using the correct email and password.</li>
//                 <li>Try resetting your password using the "Forgot Password" link.</li>
//                 <li>Check if your account has been verified.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">2. InfoBar not loading?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Refresh the page or clear your browser cache.</li>
//                 <li>Ensure you have a stable internet connection.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">3. Points not updating?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>There might be a delay in point calculation. Wait for a few minutes and refresh.</li>
//                 <li>Contact support if the issue persists for more than 24 hours.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">4. Bug report not submitting?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Ensure all required fields are filled out.</li>
//                 <li>Try using a different browser or device.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">5. Performance issues?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Close unnecessary browser tabs and applications.</li>
//                 <li>Clear your browser cache and cookies.</li>
//                 <li>Check your internet connection speed.</li>
//               </ul>
//             </div>
//           </div>
//           <p className="mt-4 italic">If you continue to experience issues, please contact support@xthreat.eu</p>
//         </div>
//       ),
//     },
//   ]

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[900px] max-w-full h-[80vh] md:h-[85vh] lg:h-[70vh] text-white rounded-lg [&>button]:hidden" // Added rounded-lg for border radius
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold">User Guide</DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-col md:flex-row h-full mt-4 overflow-hidden px-4"> {/* Added padding for both mobile and desktop */}
//           {/* Sidebar */}
//           <div className="w-full md:w-1/4 md:pr-5 md:border-r border-gray-700 mb-4 md:mb-0">
//             {/* Sticky Sidebar */}
//             <div className="sticky top-0">
//               {guideContent.map((section) => (
//                 <div
//                   key={section.id}
//                   onClick={() => setActiveSection(section.id)}
//                   className={`
//                     cursor-pointer px-4 py-2 text-left transition-colors duration-200 border border-gray-600 rounded-full mt-2
//                     ${activeSection === section.id 
//                       ? 'text-white border-white font-semibold'  // Tag-like with border highlight for active section
//                       : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'}
//                   `}
//                 >
//                   {section.title}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="w-full md:w-3/4 h-full overflow-y-auto">
//             <div className="h-[calc(80vh-120px)] md:h-[calc(85vh-100px)] lg:h-[calc(90vh-120px)] pr-4 pl-6"> {/* Added padding on the left */}
//               {guideContent.map((section) => (
//                 <div
//                   key={section.id}
//                   className={`${
//                     activeSection === section.id ? 'block' : 'hidden'
//                   }`}
//                 >
//                   <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
//                   <div className="text-gray-200 space-y-4">{section.content}</div> {/* Added space between text elements */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };


// const UserGuideModal = ({ isOpen, onClose }) => {
//   const [activeSection, setActiveSection] = useState("getting-started");

//   const guideContent = [
//     {
//       id: "getting-started",
//       title: "Getting Started",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Welcome to our platform! Here's how to get started:</p>
//           <ol className="list-decimal list-inside space-y-2 pl-4">
//             <li>Sign up for an account using your work email address.</li>
//             <li>Verify your email to activate your account.</li>
//             <li>Log in to access your dashboard.</li>
//             <li>Familiarize yourself with the platform.</li>
//             <li>Explore the different sections of the platform using the navigation menu.</li>
//             <li>Start improving your cyber security knowledge and gain points.</li>
//           </ol>
//         </div>
//       ),
//     },
//     {
//       id: "features",
//       title: "Key Features",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Explore our main features including:</p>
//           <ul className="list-disc list-inside space-y-2 pl-4">
//             <li>
//               <strong>Top Bar:</strong> Quick access to important information and actions.
//               <ul className="list-circle list-inside ml-8 mt-2 space-y-1">
//                 <li>Points System: Track your engagement and rewards.</li>
//                 <li>Bug Reporting: Easily report issues you encounter.</li>
//                 <li>Guide: Access this guide anytime for help.</li>
//                 <li>User: Manage your account and settings.</li>
//               </ul>
//             </li>
//             <li><strong>Dashboard:</strong> Get an overview of your activities and progress.</li>
//             <li><strong>Modules:</strong> Improve by completing learning pathways, quizzes to get points.</li>
//             <li><strong>Practice:</strong> Practice spotting threats through immersive simulations.</li>
//             <li><strong>Progress:</strong> Track your performance and gain insights.</li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       id: "account",
//       title: "Account Management",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Learn how to manage your account settings:</p>
//           <ol className="list-decimal list-inside space-y-2 pl-4">
//             <li>Access your account settings by clicking on your profile icon in the InfoBar.</li>
//             <li>Update your personal information, including name, role & email.</li>
//             <li>Manage your notification preferences to stay informed.</li>
//             <li>Set up two-factor authentication for enhanced security.</li>
//             <li>Review your account activity and sessions for any suspicious behavior.</li>
//           </ol>
//         </div>
//       ),
//     },
//     {
//       id: "troubleshooting",
//       title: "Troubleshooting",
//       content: (
//         <div className="space-y-4">
//           <p className="text-lg">Having issues? Here are some common problems and solutions:</p>
//           <div className="space-y-4">
//             <div>
//               <h4 className="font-semibold">1. Can't log in?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Ensure you're using the correct email and password.</li>
//                 <li>Try resetting your password using the "Forgot Password" link.</li>
//                 <li>Check if your account has been verified.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">2. InfoBar not loading?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Refresh the page or clear your browser cache.</li>
//                 <li>Ensure you have a stable internet connection.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">3. Points not updating?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>There might be a delay in point calculation. Wait for a few minutes and refresh.</li>
//                 <li>Contact support if the issue persists for more than 24 hours.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">4. Bug report not submitting?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Ensure all required fields are filled out.</li>
//                 <li>Try using a different browser or device.</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold">5. Performance issues?</h4>
//               <ul className="list-disc list-inside ml-4 space-y-1">
//                 <li>Close unnecessary browser tabs and applications.</li>
//                 <li>Clear your browser cache and cookies.</li>
//                 <li>Check your internet connection speed.</li>
//               </ul>
//             </div>
//           </div>
//           <p className="mt-4 italic">If you continue to experience issues, please contact support@xthreat.eu</p>
//         </div>
//       ),
//     },
//     {
//       id: "faq",
//       title: "FAQ",
//       content: (
//         <div className="space-y-6">
//           <p className="text-lg">Frequently asked questions and their answers:</p>
//           <div className="space-y-4">
//             <div>
//               <h4 className="font-semibold">Q: How do I earn points?</h4>
//               <p>A: You can earn points by completing tasks, reporting bugs, and actively participating in the community.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold flex flex-row">Q: How do I report a bug?</h4>
//               <p>A: Click on the <Bug className="h-5 inline-block"/> icon in the top bar to open the bug report form. Fill out the details and submit.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: Is my data secure?</h4>
//               <p>A: We take data security seriously. All data is encrypted, and we regularly update our security measures.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: Can I delete my account?</h4>
//               <p>A: In Short No. Your account can be removed by your manager.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: How often is the platform updated?</h4>
//               <p>A: We release updates and new features regularly. Check our blog or announcements section for the latest information.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Q: How can I contact support?</h4>
//               <p>A: You can reach our support team through the Help Center or by emailing support@xthreat.eu</p>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[900px] max-w-full h-[80vh] md:h-[85vh] lg:h-[70vh] text-white rounded-lg" // Added rounded-lg for border radius
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-3xl font-bold">User Guide</DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-col md:flex-row h-full mt-4 overflow-hidden px-4"> {/* Added padding for both mobile and desktop */}
//           {/* Sidebar */}
//           <div className="w-full md:w-1/4 md:pr-5 md:border-r border-gray-700 mb-4 md:mb-0">
//             {/* Sidebar styled as a grid for mobile */}
//             <div className="grid grid-cols-2 gap-2 md:flex md:flex-col sticky top-0">
//               {guideContent.map((section) => (
//                 <div
//                   key={section.id}
//                   onClick={() => setActiveSection(section.id)}
//                   className={`
//                     cursor-pointer px-4 py-2 text-left transition-colors duration-200 border border-gray-600 rounded-full mt-2
//                     ${activeSection === section.id 
//                       ? 'text-white border-white font-semibold'  // Highlight active section
//                       : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'}
//                   `}
//                 >
//                   {section.title}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="w-full md:w-3/4 h-full overflow-y-auto">
//             <div className="h-[calc(80vh-120px)] md:h-[calc(85vh-100px)] lg:h-[calc(90vh-120px)] pr-4 pl-6">
//               {guideContent.map((section) => (
//                 <div
//                   key={section.id}
//                   className={`${
//                     activeSection === section.id ? 'block' : 'hidden'
//                   }`}
//                 >
//                   <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
//                   <div className="text-gray-200 space-y-4">{section.content}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };


const InfoBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-row justify-end gap-6 fixed top-0 right-0 left-0 items-center px-4 py-4 w-full dark:bg-black z-50">
      <span className="flex items-center gap-2">
        <p>Points: 250</p>
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger onClick={() => setIsBugReportOpen(true)}>
            <Bug />
          </TooltipTrigger>
          <TooltipContent>
            <p>Report</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger onClick={() => setIsUserGuideOpen(true)}>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
      />

      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
      />
    </div>
  )
}

export default InfoBar







// const InfoBar = (props: Props) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isBugReportOpen, setIsBugReportOpen] = useState(false);
//   const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleDropdownClose = () => {
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="flex flex-row justify-end gap-6 sticky items-center px-4 py-4 w-full dark:bg-black">
//       <span className="flex items-center gap-2">
//         <p>Points: 250</p>
//       </span>
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <TooltipTrigger onClick={() => setIsBugReportOpen(true)}>
//             <Bug />
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Report</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
      
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <TooltipTrigger onClick={() => setIsUserGuideOpen(true)}>
//             <Book />
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Guide</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       {/* User Profile Icon with Enhanced Dropdown */}
//       <TooltipProvider>
//         <Tooltip delayDuration={0}>
//           <TooltipTrigger>
//             <div ref={dropdownRef}>
//               <User 
//                 className="cursor-pointer w-6 h-6"
//                 onClick={handleDropdownToggle}
//               />
//               <UserDropdown 
//                 isOpen={isDropdownOpen}
//                 onClose={handleDropdownClose}
//               />
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>User</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       {/* Bug Report Modal */}
//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />

//       {/* User Guide Modal */}
//       <UserGuideModal
//         isOpen={isUserGuideOpen}
//         onClose={() => setIsUserGuideOpen(false)}
//       />
//     </div>
//   )
// }

// export default InfoBar










