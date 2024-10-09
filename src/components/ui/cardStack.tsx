// File: src/components/ui/card-stack.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface CardStackProps {
  items: { id: number; tip: string }[];
}

export const CardStack: React.FC<CardStackProps> = ({ items }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto h-[400px]">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="absolute w-full p-6 bg-neutral-800 rounded-lg shadow-lg"
          initial={{ scale: 1, y: index * 30, zIndex: items.length - index }}
          whileHover={{ scale: 1.05, y: -10, zIndex: items.length + 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-2">Tip #{item.id}</h3>
          <p className="text-gray-300">{item.tip}</p>
        </motion.div>
      ))}
    </div>
  );
};