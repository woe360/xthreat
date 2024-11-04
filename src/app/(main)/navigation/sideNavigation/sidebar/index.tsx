'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { menuOptions } from '@/lib/constant';
import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
import { LogOut, PanelLeft, Bug } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";


// const BugReportModal = ({ isOpen, onClose }) => {
//   const [issueType, setIssueType] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState('');
//   const supabase = createClientComponentClient();

//   const handleSubmit = async (e) => {
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
      
//       onClose();
//     } catch (error) {
//       console.error('Error submitting bug report:', error);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
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
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 className="w-full bg-gray-700/30 hover:bg-gray-700/40 h-12 text-neutral-400 border border-gray-800 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 onClick={() => document.getElementById('image').click()}
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
//           <Button 
//             type="button" 
//             variant="ghost" 
//             className="bg-transparent hover:bg-transparent border border-transparent hover:border-gray-500 text-gray-300" 
//             onClick={onClose}
//           >
//             Cancel
//           </Button>
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

const BugReportModal = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const supabase = createClientComponentClient();

  // Function to reset all form fields
  const resetForm = () => {
    setIssueType('');
    setDescription('');
    setImage(null);
    setUrl('');
  };

  // Modified close handler
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      console.log({ 
        userId: user?.id,
        issueType, 
        description, 
        image, 
        url 
      });
      
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting bug report:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[425px] text-white [&>button]:hidden" 
        style={{
          background: '#050607',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-sans text-center font-base">Report a Bug</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger 
                className={cn(
                  "w-full px-5 py-6 rounded-lg bg-gray-700/30 hover:bg-gray-700/40 text-gray-300 border border-gray-800",
                  "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                )}
              >
                <div className="flex items-center text-neutral-400 justify-center w-full gap-2">
                  <SelectValue placeholder="Select an issue type" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#050607] border border-gray-800">
                <SelectItem value="ui" className="text-center text-gray-300 focus:bg-neutral-800/30">UI Problem</SelectItem>
                <SelectItem value="functionality" className="text-center text-gray-300 focus:bg-neutral-800">Functionality Issue</SelectItem>
                <SelectItem value="performance" className="text-center text-gray-300 focus:bg-neutral-800">Performance Problem</SelectItem>
                <SelectItem value="other" className="text-center text-gray-300 focus:bg-neutral-800">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-start mt-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
              <Button
                type="button"
                className="w-full bg-gray-700/30 hover:bg-gray-700/40 h-12 text-neutral-400 border border-gray-800 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => document.getElementById('image').click()}
              >
                <Upload className="mr-2 h-4 w-4 text-neutral-400" /> Upload Image
              </Button>
            </div>
            {image && <span className="text-sm mt-1 block text-gray-400">{image.name}</span>}
          </div>

          <div>
            <Input
              id="url"
              type="url"
              placeholder="Enter the URL where the issue occurred"
              value={url}
              required
              className={cn(
                "bg-gray-700/30 hover:bg-gray-700/40 text-gray-300 border border-gray-800 px-3 py-6 rounded-lg",
                "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(
                "h-32 bg-gray-700/30 hover:bg-gray-700/40 text-gray-300 border border-gray-800 resize-none px-3 py-4 rounded-lg",
                "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="ghost" 
              className="bg-transparent hover:bg-transparent border border-transparent hover:border-gray-500 text-gray-300" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gray-300 hover:bg-gray-100 text-gray-900"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const MenuOptions = () => {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarCollapsed');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 768;
      setIsCollapsed(shouldCollapse);
      localStorage.setItem('sidebarCollapsed', JSON.stringify(shouldCollapse));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // After successful logout, redirect to login page
      router.push('/');  // Use Next.js router
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <nav className={clsx(
      "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-[width] duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-[145px]"
    )}>
      <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-1 px-2 overflow-hidden">
        {menuOptions.map((menuItem) => (
          <Link
            key={menuItem.name}
            href={menuItem.href}
            className={clsx(
              'group h-10 flex text-[15px] items-center rounded-lg py-2 px-[10px] cursor-pointer transition-colors duration-200 w-full',
              {
                'dark:bg-gray-900/90 text-gray-200': pathName === menuItem.href,
                'hover:bg-gray-900/90 text-gray-400': pathName !== menuItem.href,
              }
            )}
          >
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <menuItem.Component selected={pathName === menuItem.href} />
            </div>
            <span className={clsx(
              "ml-1 whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
            )}>
              {menuItem.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-start mt-auto gap-2 w-full px-2 overflow-hidden">
      <button           
        onClick={() => setIsBugReportOpen(true)}           
        className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"         
      >           
        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">             
          <Bug 
            className={clsx(                 
              "text-gray-500 transition-transform duration-300",                 
              isBugReportOpen ? "rotate-180" : "rotate-0"               
            )}                
            size={20}  
          />           
        </div>           
        <span className={clsx(             
          "ml-1 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",             
          isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"           
        )}>             
          Report           
        </span>         
      </button>          

      <button           
        className="flex items-center w-full rounded-lg py-2 px-[10px] text-gray-400 hover:text-gray-200 cursor-pointer hover:bg-gray-900/50 transition-colors duration-200"           
        onClick={toggleSidebar}         
      >           
        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">             
          <PanelLeft                
            className={clsx(                 
              "text-gray-500 transition-transform duration-300",                 
              isCollapsed ? "rotate-180" : "rotate-0"               
            )}                
            size={20}              
          />           
        </div>           
        <span className={clsx(             
          "ml-1 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",             
          isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"           
        )}>             
          Sidebar           
        </span>         
      </button>

        <Separator />
        
        <button           
          onClick={handleLogout}           
          className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100 group"         
        >           
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative">             
            <LogOut 
              className="text-gray-500 transition-transform duration-200 transform group-active:translate-x-1" 
              size={20} 
            />           
          </div>           
          <span className={clsx(             
            "ml-1 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",             
            isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"           
          )}>             
            Log out           
          </span>         
        </button>
      </div>

      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
      />
    </nav>
  );
};

export default MenuOptions;

