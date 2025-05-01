import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Upload, AlertCircle } from 'lucide-react';
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
        className="bg-[#050607] border border-gray-800/40 text-gray-100 rounded-xl max-w-md mx-auto overflow-hidden" 
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
            Report an Issue
          </DialogTitle>
          <p className="text-gray-400 text-sm mt-1">
            Help us improve by reporting bugs or issues you encounter
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-gray-400 text-sm block mb-1">Issue Type</label>
            <Select value={issueType} onValueChange={setIssueType} required>
              <SelectTrigger 
                className="w-full bg-black/20 border-gray-800/40 hover:border-gray-700/70 text-gray-300 transition-colors"
              >
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent className="bg-[#050607] border border-gray-800/40">
                <SelectItem value="ui">UI Problem</SelectItem>
                <SelectItem value="functionality">Functionality Issue</SelectItem>
                <SelectItem value="performance">Performance Problem</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-1">Screenshot (Optional)</label>
            <div className="flex items-start">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                className="w-full bg-black/20 hover:bg-black/30 h-10 text-gray-400 border border-gray-800/40 hover:border-gray-700/70 transition-colors"
                onClick={() => document.getElementById('image')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Screenshot
              </Button>
            </div>
            {image && (
              <p className="text-sm mt-1.5 text-gray-400 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                {image.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-1">URL Where Issue Occurred</label>
            <Input
              id="url"
              type="url"
              placeholder="e.g. https://xthreat.com/modules/..."
              value={url}
              required
              className="bg-black/20 hover:bg-black/30 text-gray-300 border border-gray-800/40 hover:border-gray-700/70 transition-colors w-full"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-1">Describe the Issue</label>
            <Textarea
              id="description"
              placeholder="Please provide details about what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-28 bg-black/20 hover:bg-black/30 text-gray-300 border border-gray-800/40 hover:border-gray-700/70 resize-none transition-colors w-full"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button 
              type="button" 
              className="bg-transparent hover:bg-black/20 border border-transparent hover:border-gray-800/40 text-gray-400 hover:text-gray-300 transition-colors" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit" 
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 border border-transparent transition-colors"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};