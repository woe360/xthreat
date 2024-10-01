import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/global/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/global/ui/accordion"
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Button } from "@/components/global/ui/button"
import { X } from 'lucide-react'

const UserGuideModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("getting-started")

  const guideContent = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: "Welcome to our platform! Here's how to get started...",
    },
    {
      id: "features",
      title: "Key Features",
      content: "Explore our main features including...",
    },
    {
      id: "account",
      title: "Account Management",
      content: "Learn how to manage your account settings...",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: "Having issues? Here are some common problems and solutions...",
    },
    {
      id: "faq",
      title: "FAQ",
      content: "Frequently asked questions and their answers...",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[700px] h-[80vh] text-white"
        style={{
          background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">User Guide</DialogTitle>
          <Button 
            className="absolute right-4 top-4" 
            onClick={onClose}
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/3 pr-4 border-r border-gray-700">
            <Accordion type="single" collapsible className="w-full">
              {guideContent.map((section) => (
                <AccordionItem value={section.id} key={section.id}>
                  <AccordionTrigger
                    onClick={() => setActiveSection(section.id)}
                    className={`${
                      activeSection === section.id ? 'bg-gray-700' : ''
                    } hover:bg-gray-600 px-2 py-1 rounded`}
                  >
                    {section.title}
                  </AccordionTrigger>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Content Area */}
          <div className="w-2/3 pl-4">
            <ScrollArea className="h-[calc(80vh-120px)]">
              {guideContent.map((section) => (
                <div
                  key={section.id}
                  className={`${
                    activeSection === section.id ? 'block' : 'hidden'
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserGuideModal