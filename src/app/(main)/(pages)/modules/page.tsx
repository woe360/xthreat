// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// interface TagColors {
//   border: string;
//   bg: string;
// }

// interface Module {
//   id: number;
//   title: string;
//   description: string;
//   slug: string;
//   tags: string[];
//   created_at: string;
//   updated_at: string;
// }

// interface ComponentStyle {
//   background: string;
//   boxShadow: string;
// }

// const tagColors: Record<string, TagColors> = {
//   All: { border: 'border-gray-500 hover:bg-gray-500', bg: 'bg-gray-500' },
//   Phishing: { border: 'border-blue-700 hover:bg-blue-700', bg: 'bg-blue-700' },
//   "Risk management": { border: 'border-green-900 hover:bg-green-900', bg: 'bg-green-900' },
//   Compliance: { border: 'border-yellow-700 hover:bg-yellow-700', bg: 'bg-yellow-700' },
//   "Incident response": { border: 'border-red-800 hover:bg-red-800', bg: 'bg-red-800' },
//   "Role-based": { border: 'border-purple-800 hover:bg-purple-800', bg: 'bg-purple-800' },
// };

// const componentStyle: ComponentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };

// const Lessons: React.FC = () => {
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [modules, setModules] = useState<Module[]>([]);

//   useEffect(() => {
//     const fetchModules = async (): Promise<void> => {
//       try {
//         const response = await fetch('http://localhost:5000/api/modules');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Module[] = await response.json();
//         setModules(data);
//       } catch (error) {
//         console.error('Error fetching modules:', error);
//       }
//     };

//     fetchModules();
//   }, []);

//   const handleTagClick = (tag: string): void => {
//     setSelectedTag(tag === 'All' ? null : tag);
//   };

//   const filteredModules = selectedTag
//     ? modules.filter((module) => module.tags.includes(selectedTag))
//     : modules;

//   const tags: string[] = Object.keys(tagColors);

//   return (
//     <div className="min-h-min flex flex-col gap-4 p-6 font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
//       <h1 className="text-xl top-0 font-light z-10 bg-transparent flex items-center">
//         Modules
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
//         {filteredModules.map((module) => (
//           <Link href={`/modules/${module.slug}`} key={module.id}> 
//             <div 
//               className="p-4 rounded-lg bg-black border border-neutral-700 hover:background: linear-gradient(180deg, #1F2429 0%, #000000 100%);] cursor-pointer flex flex-col justify-between h-full" 
//               style={componentStyle}
//             >
//               <div className="flex flex-col flex-grow">
//                 <h2 className="text-2xl font-base">{module.title}</h2>
//                 <p className="mt-2 text-gray-400 flex-grow">{module.description}</p>
//               </div>
//               <div className="mt-2 flex flex-wrap gap-2 justify-end">
//                 {module.tags.map((tag, tagIndex) => (
//                   <span 
//                     key={`${module.id}-${tagIndex}`} 
//                     className={`text-sm rounded-lg px-3 py-1 ${tagColors[tag]?.bg || 'bg-gray-500'} text-white`}
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Lessons;


'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TagColors {
  border: string;
  bg: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const tagColors: Record<string, TagColors> = {
  All: { border: 'border-gray-500', bg: 'bg-gray-200/70 text-gray-900' },
  Phishing: { border: 'border-blue-500', bg: 'bg-blue-500/20 text-blue-400' },
  "Risk management": { border: 'border-green-500', bg: 'bg-green-500/20 text-green-400' },
  Compliance: { border: 'border-yellow-500', bg: 'bg-yellow-500/20 text-yellow-400' },
  "Incident response": { border: 'border-red-500', bg: 'bg-red-500/20 text-red-400' },
  "Role-based": { border: 'border-purple-500', bg: 'bg-purple-500/20 text-purple-400' },
};

const Lessons: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchModules = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:5000/api/modules');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Module[] = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  const handleTagClick = (tag: string): void => {
    setSelectedTag(tag === 'All' ? null : tag);
  };

  const filteredModules = selectedTag
    ? modules.filter((module) => module.tags.includes(selectedTag))
    : modules;

  const tags: string[] = Object.keys(tagColors);

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6">
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-xl font-base text-white">Modules</h1>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-lg ${
                selectedTag === tag || (tag === 'All' && !selectedTag)
                  ? tagColors[tag].bg
                  : 'bg-[#050607] border border-gray-800 hover:border-gray-700 text-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Link href={`/modules/${module.slug}`} key={module.id}>
            <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 hover:border-gray-700 cursor-pointer flex flex-col justify-between h-full">
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-gray-100">{module.title}</h2>
                <p className="text-gray-400 text-sm flex-grow">{module.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {module.tags.map((tag, tagIndex) => (
                  <span
                    key={`${module.id}-${tagIndex}`}
                    className={`text-sm rounded-lg px-3 py-1 ${tagColors[tag]?.bg || 'bg-gray-500/20 text-gray-400'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lessons;