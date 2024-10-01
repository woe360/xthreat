// import React from 'react';
// import Link from 'next/link';
// import { ChevronLeft } from 'lucide-react';

// const EscapeRooms = () => {
//   return (
//     <div className="min-h-min font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-8 text-white">
//       <div className="flex justify-between items-center mb-8">
//         {/* <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
//           ‹ Back
//         </Link> */}
//         <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
//         <ChevronLeft/> Back
//         </Link>
//       </div>
//       <h1 className="text-4xl font-bold mb-8">Escape Rooms</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        
//         <Link href="/practice/escape-rooms/cyber-security" passHref>
//           <div className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700">
//             <h2 className="text-2xl font-semibold mb-2">Cyber Security</h2>
//             <p className="text-gray-400">
//               Test your skills in identifying and mitigating cyber threats in this high-stakes escape room.
//             </p>
//           </div>
//         </Link>
        
//         <Link href="/practice/escape-rooms/data-breach" passHref>
//           <div className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700">
//             <h2 className="text-2xl font-semibold mb-2">Data Breach</h2>
//             <p className="text-gray-400">
//               Navigate through a simulated data breach scenario to secure sensitive information.
//             </p>
//           </div>
//         </Link>
        
//         <Link href="/practice/escape-rooms/social-engineering" passHref>
//           <div className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700">
//             <h2 className="text-2xl font-semibold mb-2">Social Engineering</h2>
//             <p className="text-gray-400">
//               Outsmart the social engineers and protect your organization's most valuable assets.
//             </p>
//           </div>
//         </Link>
        
//       </div>
//     </div>
//   );
// };

// export default EscapeRooms;


import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Clock, Users } from 'lucide-react';

const EscapeRooms = () => {
  const rooms = [
    {
      title: "Cyber Security Challenge",
      description: "Test your skills in identifying and mitigating cyber threats in this high-stakes escape room.",
      difficulty: 3,
      time: 60,
      players: "2-4",
      href: "/practice/escape-rooms/cyber-security"
    },
    {
      title: "Data Breach Dilemma",
      description: "Navigate through a simulated data breach scenario to secure sensitive information and prevent further leaks.",
      difficulty: 4,
      time: 75,
      players: "3-5",
      href: "/practice/escape-rooms/data-breach"
    },
    {
      title: "Social Engineering Trap",
      description: "Outsmart the social engineers and protect your organization's most valuable assets in this psychological thriller.",
      difficulty: 3,
      time: 60,
      players: "2-4",
      href: "/practice/escape-rooms/social-engineering"
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 text-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <Link href="/practice" className="text-gray-400 hover:text-white transition flex items-center">
          <ChevronLeft/> Back
        </Link>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Escape Rooms</h1>
      <p className="text-gray-300 mb-8 max-w-3xl">
        Welcome to our Cybersecurity Escape Rooms! Test your skills, knowledge, and problem-solving abilities in these immersive digital challenges. Each room presents unique scenarios designed to simulate real-world cybersecurity threats and situations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {rooms.map((room, index) => (
          <Link href={room.href} key={index} passHref>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl h-full">
              <div>
                <h2 className="text-2xl font-semibold mb-3">{room.title}</h2>
                <p className="text-gray-400 text-base mb-6">
                  {room.description}
                </p>
              </div>
              <div className="flex flex-wrap justify-between items-center text-sm text-gray-300 gap-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Difficulty: {Array(room.difficulty).fill('★').join('')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>{room.time} min</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>{room.players}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );


  // return (
  //   <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 text-white overflow-y-auto">
  //     <div className="flex justify-between items-center mb-6 sm:mb-8">
  //       <Link href="/practice" className="text-gray-400 hover:text-white transition flex items-center">
  //         <ChevronLeft/> Back
  //       </Link>
  //     </div>
  //     <h1 className="text-3xl sm:text-4xl font-bold mb-4">Escape Rooms</h1>
  //     <p className="text-gray-300 mb-8 max-w-3xl">
  //       Welcome to our Cybersecurity Escape Rooms! Test your skills, knowledge, and problem-solving abilities in these immersive digital challenges. Each room presents unique scenarios designed to simulate real-world cybersecurity threats and situations.
  //     </p>
  //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
  //       {rooms.map((room, index) => (
  //         <Link href={room.href} key={index} passHref>
  //           <div className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl h-full">
  //             <div>
  //               <h2 className="text-2xl font-semibold mb-3">{room.title}</h2>
  //               <p className="text-gray-400 text-base mb-6">
  //                 {room.description}
  //               </p>
  //             </div>
  //             <div className="flex flex-wrap justify-between items-center text-sm text-gray-300 gap-4">
  //               <div className="flex items-center">
  //                 <Star className="w-5 h-5 mr-2 flex-shrink-0" />
  //                 <span>Difficulty: {Array(room.difficulty).fill('★').join('')}</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
  //                 <span>{room.time} min</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <Users className="w-5 h-5 mr-2 flex-shrink-0" />
  //                 <span>{room.players}</span>
  //               </div>
  //             </div>
  //           </div>
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
};


  // return (
  //   <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 text-white">
  //     <div className="flex justify-between items-center mb-6 sm:mb-8">
  //       <Link href="/practice" className="text-gray-400 hover:text-white transition flex items-center">
  //         <ChevronLeft/> Back
  //       </Link>
  //     </div>
  //     <h1 className="text-3xl sm:text-4xl font-bold mb-4">Escape Rooms</h1>
  //     <p className="text-gray-300 mb-8 max-w-2xl">
  //       Welcome to our Cybersecurity Escape Rooms! Test your skills, knowledge, and problem-solving abilities in these immersive digital challenges. Each room presents unique scenarios designed to simulate real-world cybersecurity threats and situations.
  //     </p>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  //       {rooms.map((room, index) => (
  //         <Link href={room.href} key={index} passHref>
  //           <div className="bg-gray-800 overflow-visible  p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 aspect-square flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
  //             <div>
  //               <h2 className="text-xl sm:text-2xl font-semibold mb-2">{room.title}</h2>
  //               <p className="text-gray-400 text-sm sm:text-base mb-4">
  //                 {room.description}
  //               </p>
  //             </div>
  //             <div className="flex justify-between items-center text-sm text-gray-300">
  //               <div className="flex items-center">
  //                 <Star className="w-4 h-4 mr-1" />
  //                 <span>Difficulty: {Array(room.difficulty).fill('★').join('')}</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <Clock className="w-4 h-4 mr-1" />
  //                 <span>{room.time} min</span>
  //               </div>
  //               <div className="flex items-center">
  //                 <Users className="w-4 h-4 mr-1" />
  //                 <span>{room.players}</span>
  //               </div>
  //             </div>
  //           </div>
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
// };

export default EscapeRooms;

// import React from 'react';
// import Link from 'next/link';
// import { ChevronLeft } from 'lucide-react';

// const EscapeRooms = () => {
//   return (
//     <div className="min-h-min font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4 sm:p-8 text-white">
//       <div className="flex justify-between items-center mb-6 sm:mb-8">
//         <Link href="/practice" className="text-gray-400 hover:text-white transition flex items-center">
//           <ChevronLeft/> Back
//         </Link>
//       </div>
//       <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Escape Rooms</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
//         <Link href="/practice/escape-rooms/cyber-security" passHref>
//           <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 aspect-square flex flex-col justify-between">
//             <h2 className="text-xl sm:text-2xl font-semibold mb-2">Cyber Security</h2>
//             <p className="text-gray-400 text-sm sm:text-base">
//               Test your skills in identifying and mitigating cyber threats in this high-stakes escape room.
//             </p>
//           </div>
//         </Link>
        
//         <Link href="/practice/escape-rooms/data-breach" passHref>
//           <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 aspect-square flex flex-col justify-between">
//             <h2 className="text-xl sm:text-2xl font-semibold mb-2">Data Breach</h2>
//             <p className="text-gray-400 text-sm sm:text-base">
//               Navigate through a simulated data breach scenario to secure sensitive information.
//             </p>
//           </div>
//         </Link>
        
//         <Link href="/practice/escape-rooms/social-engineering" passHref>
//           <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 aspect-square flex flex-col justify-between">
//             <h2 className="text-xl sm:text-2xl font-semibold mb-2">Social Engineering</h2>
//             <p className="text-gray-400 text-sm sm:text-base">
//               Outsmart the social engineers and protect your organization's most valuable assets.
//             </p>
//           </div>
//         </Link>
        
//       </div>
//     </div>
//   );
// };

// export default EscapeRooms;