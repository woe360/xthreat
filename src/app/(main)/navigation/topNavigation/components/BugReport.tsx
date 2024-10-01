// 'use client'
// import React, { useState } from 'react'
// import { X, Upload } from 'lucide-react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"

// const BugReportModal = ({ isOpen, onClose }) => {
//   const [issueType, setIssueType] = useState('')
//   const [comment, setComment] = useState('')
//   const [image, setImage] = useState(null)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle form submission here
//     console.log({ issueType, comment, image })
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-gray-400 text-white">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Report a Bug</DialogTitle>
//         </DialogHeader> 
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="issue-type">Issue Type</Label>
//             <Select value={issueType} onValueChange={setIssueType} >
//               <SelectTrigger className="hover:bg-gray-400 focus:outline-none" id="issue-type">
//                 <SelectValue placeholder="Select an issue type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ui">UI Problem</SelectItem>
//                 <SelectItem value="functionality">Functionality Issue</SelectItem>
//                 <SelectItem className="hover:bg-gray-400" value="performance">Performance Problem</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label htmlFor="comment">Description</Label>
//             <Textarea
//               id="comment"
//               placeholder="Describe the issue in detail"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="h-32 no-outline focus:no-outline"
//             />
//           </div>
//           <div>
//             <Label htmlFor="image">Attach Image (optional)</Label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => document.getElementById('image').click()}
//               >
//                 <Upload className="mr-2 h-4 w-4" /> Upload Image
//               </Button>
//               {image && <span className="text-sm">{image.name}</span>}
//             </div>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
//             <Button type="submit">Submit Report</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default BugReportModal



'use client'
import React, { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/global/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/global/ui/select"
import { Label } from "@/components/global/ui/label"
import { Textarea } from "@/components/global/ui/textarea"
import { Button } from "@/components/global/ui/button"
import "./BugReportModal.css"; // Import custom CSS

const BugReportModal = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('')
  const [comment, setComment] = useState('')
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ issueType, comment, image })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Report a Bug</DialogTitle>
        </DialogHeader> 
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger className="hover:bg-gray-400 custom-focus-none" id="issue-type">
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ui">UI Problem</SelectItem>
                <SelectItem value="functionality">Functionality Issue</SelectItem>
                <SelectItem className="hover:bg-gray-400" value="performance">Performance Problem</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="comment">Description</Label>
            <Textarea
              id="comment"
              placeholder="Describe the issue in detail"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-32 custom-focus-none"
            />
          </div>
          <div>
            <Label htmlFor="image">Attach Image (optional)</Label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image').click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              {image && <span className="text-sm">{image.name}</span>}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit Report</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BugReportModal
