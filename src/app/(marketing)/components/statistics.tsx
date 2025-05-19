// 'use client';
// import React from 'react';

// interface StatisticItem {
//   value: number;
//   unit?: string;
//   text: string;
//   specialCount?: boolean;
//   source: string;
//   explanation: string;
// }

// const statisticsData: StatisticItem[] = [
//   {
//     value: 68,
//     unit: '%',
//     text: "of data breaches involve human error",
//     source: "Cybersecurity Ventures, 2024",
//     explanation: "Human error remains the most significant vulnerability in cybersecurity. Organizations that invest in comprehensive security awareness training see up to 70% reduction in successful attacks."
//   },
//   {
//     value: 1,
//     unit: '/ 3',
//     text: "Share of breaches that involved shadow data",
//     specialCount: true,
//     source: "Dark Reading Report, 2024",
//     explanation: "Shadow data—information stored without proper oversight or security protocols—represents a growing blind spot for security teams, leading to unexpected vulnerabilities and compliance violations."
//   },
//   {
//     value: 62,
//     unit: '%',
//     text: "of cyberattacks happen with stolen credentials",
//     source: "Verizon DBIR, 2024",
//     explanation: "Password reuse and credential theft continue to be the easiest path for attackers. Multi-factor authentication can reduce account compromise risk by up to 99%, yet only 22% of businesses enforce it consistently."
//   },
//   {
//     value: 4.46,
//     unit: 'M',
//     text: "the global average cost of a data breach in 2024",
//     specialCount: true,
//     source: "IBM Data Breach Report, 2024",
//     explanation: "Beyond direct financial impact, breaches damage customer trust, brand reputation, and operational capacity. Organizations with strong security training reduce breach costs by an average of 38%."
//   },
// ];

// interface StatisticItemContentProps {
//   stat: StatisticItem;
// }

// const StatisticItemContent: React.FC<StatisticItemContentProps> = ({ stat }) => {
//   return (
//     <span className="text-8xl font-light text-white flex items-baseline leading-none">
//       {stat.unit === 'M' && <span className="text-5xl mr-1">€</span>}
//       <span>{stat.value}</span>
//       {stat.unit && (
//         <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-7xl' : 'text-5xl'}`}>
//           {stat.unit === '/ 3' ? (
//             <>
//               <span>&nbsp;</span>/
//               <span className="inline-block ml-2">3</span>
//             </>
//           ) : stat.unit}
//         </span>
//       )}
//     </span>
//   );
// };

// interface StatisticItemProps {
//   stat: StatisticItem;
//   index: number;
// }

// const StatisticItem: React.FC<StatisticItemProps> = ({ stat, index }) => {
//   let headingText = "";
//   if (stat.text === "of data breaches involve human error") headingText = "HUMAN ERROR CAUSED BREACHES";
//   if (stat.text === "Share of breaches that involved shadow data") headingText = "SHADOW DATA";
//   if (stat.text === "of cyberattacks happen with stolen credentials") headingText = "STOLEN CREDENTIALS";
//   if (stat.text === "the global average cost of a data breach in 2024") headingText = "AVERAGE COST OF BREACH";

//   return (
//     <div className={`grid grid-cols-12 py-12 border-t border-white/10 ${index === 0 ? 'mt-12' : ''}`}>
//       {/* Left side - Big number */}
//       <div className="col-span-3 pl-10 px-6 sm:px-6 lg:px-8 mt-8">
//         <StatisticItemContent stat={stat} />
//       </div>
      
//       {/* Right side - Explanatory text */}
//       <div className="col-span-9 pt-4 pl-40 pr-20">
//         <div className="text-gray-400 text-base mb-4">
//           <span className="uppercase text-sm tracking-wider text-gray-500 mb-2 block">
//             {headingText}
//           </span>
//           {stat.text}
//         </div>
        
//         <p className="text-gray-400 text-sm mb-6 pr-24 leading-relaxed">
//           {stat.explanation}
//         </p>
        
//         <p className="text-xs text-gray-600">{stat.source}</p>
//       </div>
//     </div>
//   );
// };

// const StatisticsHack: React.FC = () => {
//   return (
//     <div className="py-24 px-2">
//       <div className="max-w-7xl mx-auto">
//         <div className="w-full mb-16 grid grid-cols-12 gap-16 mt-20">
//           <h2 className="text-5xl font-sans font-normal text-white col-span-4">
//             Reality
//           </h2>
//           {/* <p className="text-gray-400 px-6 sm:px-6 lg:px-8 text-xl mt-4 col-span-8">
//             Cybersecurity statistics make it clear that organizations must prioritize security awareness training to prevent costly breaches.
//           </p> */}
//         </div>
        
//         <div className="w-full">
//           {statisticsData.map((stat, index) => (
//             <StatisticItem
//               key={index}
//               stat={stat}
//               index={index}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatisticsHack;

'use client';
import React from 'react';

interface StatisticItem {
  value: number;
  unit?: string;
  text: string;
  specialCount?: boolean;
  source: string;
}

const statisticsData: StatisticItem[] = [
  {
    value: 68,
    unit: '%',
    text: "of data breaches involve human error",
    source: "Cybersecurity Ventures, 2024"
  },
  {
    value: 1,
    unit: '/ 3',
    text: "Share of breaches that involved shadow data",
    specialCount: true,
    source: "Dark Reading Report, 2024"
  },
  {
    value: 62,
    unit: '%',
    text: "of cyberattacks happen with stolen credentials",
    source: "Verizon DBIR, 2024"
  },
  {
    value: 4.46,
    unit: 'M',
    text: "the global average cost of a data breach in 2024",
    specialCount: true,
    source: "IBM Data Breach Report, 2024"
  },
];

interface StatisticItemContentProps {
  stat: StatisticItem;
}

const StatisticItemContent: React.FC<StatisticItemContentProps> = ({ stat }) => {
  return (
    <div className="flex items-baseline">
      {stat.unit === 'M' && <span className="text-5xl mr-1">€</span>}
      <span className="text-6xl font-light">{stat.value}</span>
      {stat.unit && (
        <span className="ml-1 text-6xl">
          {stat.unit === '/ 3' ? (
            <span className="font-light">/3</span>
          ) : stat.unit}
        </span>
      )}
    </div>
  );
};

const StatisticsHack: React.FC = () => {
  return (
    <div className="py-12 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl font-sans font-normal text-white">
            Reality
          </h2>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {statisticsData.map((stat, index) => (
            <div key={index} className=" border-white/10 pt-8 pb-6 flex flex-col">
              <div className="text-white mb-6">
                <StatisticItemContent stat={stat} />
              </div>
              
              <div className="text-neutral-400 text-lg mb-4">
                {stat.text}
              </div>
              
              <div className="mt-auto">
                <p className="text-xs text-neutral-600">{stat.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsHack;