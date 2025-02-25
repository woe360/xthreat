// import React, { useState } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { Upload } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { cn } from "@/lib/utils";

// interface BugReportModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const BugReportModal: React.FC<BugReportModalProps> = ({ isOpen, onClose }) => {
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

//       // Here you would typically send the bug report to your backend
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

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/dialog";
import { Button } from '@/components/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { cn } from "@/lib/utils";

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BugReportModal: React.FC<BugReportModalProps> = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const supabase = createClientComponentClient();

  const resetForm = () => {
    setIssueType('');
    setDescription('');
    setImage(null);
    setUrl('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
                  "w-full px-5 py-6 rounded-lg bg-[#181b24] hover:bg-[#181b24]/80 text-gray-300 border border-gray-800",
                  "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                )}
              >
                <div className="flex items-center text-neutral-400 justify-center w-full gap-2">
                  <SelectValue placeholder="Select an issue type" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#181b24] border border-gray-800">
                <SelectItem value="ui" className="text-center text-gray-300 focus:bg-[#181b24]/80">UI Problem</SelectItem>
                <SelectItem value="functionality" className="text-center text-gray-300 focus:bg-[#181b24]/80">Functionality Issue</SelectItem>
                <SelectItem value="performance" className="text-center text-gray-300 focus:bg-[#181b24]/80">Performance Problem</SelectItem>
                <SelectItem value="other" className="text-center text-gray-300 focus:bg-[#181b24]/80">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-start mt-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                className="w-full bg-[#181b24] hover:bg-[#181b24]/80 h-12 text-neutral-400 border border-gray-800 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => document.getElementById('image')?.click()}
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
                "bg-[#181b24] hover:bg-[#181b24]/80 text-gray-300 border border-gray-800 px-3 py-6 rounded-lg",
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
                "h-32 bg-[#181b24] hover:bg-[#181b24]/80 text-gray-300 border border-gray-800 resize-none px-3 py-4 rounded-lg",
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