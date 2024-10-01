// File: src/components/ui/accordion.tsx

import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <span className="transform transition-transform duration-200 ease-in-out">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="py-4 px-6 text-gray-300">
          {content}
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
  items: AccordionItemProps[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.question} content={item.answer} />
      ))}
    </div>
  );
};