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
    <span
      className="text-7xl font-light text-white flex items-baseline"
    >
      {stat.unit === 'M' && <span className="text-4xl mr-1">€</span>}
      <span>{stat.value}</span>
      {stat.unit && (
        <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-6xl' : 'text-4xl'}`}>
          {stat.unit === '/ 3' ? (
            <>
              <span>&nbsp;</span>/
              <span className="inline-block ml-2">3</span>
            </>
          ) : stat.unit}
        </span>
      )}
    </span>
  );
};

interface StatisticItemProps {
  stat: StatisticItem;
  index: number;
  totalItems: number;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ stat, index, totalItems }) => {
  let headingText = "";
  if (stat.text === "of data breaches involve human error") headingText = "HUMAN ERROR CAUSED BREACHES";
  if (stat.text === "Share of breaches that involved shadow data") headingText = "SHADOW DATA";
  if (stat.text === "of cyberattacks happen with stolen credentials") headingText = "STOLEN CREDENTIALS";
  if (stat.text === "the global average cost of a data breach in 2024") headingText = "AVERAGE COST OF BREACH";

  return (
    <div
      className="flex flex-col items-center py-8"
    >
      <StatisticItemContent stat={stat} />
      
      <div className="text-gray-500 uppercase text-xs tracking-wider mt-4 mb-1 text-center">
        {headingText}
      </div>

      <p className="text-xs text-gray-500 text-center">{stat.source}</p>
    </div>
  );
};

const StatisticsHack: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full mb-10 lg:mb-16 px-4 lg:px-10">
        <h2 className="text-5xl font-sans font-normal">
          Reality
        </h2>
      </div>
      <div
        className="w-full flex flex-row flex-wrap justify-around gap-x-10 gap-y-8 px-4 lg:px-10"
      >
        {statisticsData.map((stat, index) => (
          <StatisticItem
            key={index}
            stat={stat}
            index={index}
            totalItems={statisticsData.length}
          />
        ))}
      </div>
    </div>
  );
};

export default StatisticsHack;

// galima ideati ir https://vasturiano.github.io/react-globe.gl/example/submarine-cables/