import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
};

const securitySkills = [
  { subject: 'Threat Detection', A: 120, B: 110, fullMark: 150 },
  { subject: 'Incident Response', A: 98, B: 130, fullMark: 150 },
  { subject: 'Network Security', A: 86, B: 130, fullMark: 150 },
  { subject: 'Cryptography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Security Policies', A: 85, B: 90, fullMark: 150 },
  { subject: 'Ethical Hacking', A: 65, B: 85, fullMark: 150 },
];

const chartConfig = {
  gridColor: 'rgba(255, 255, 255, 0.3)',
  textColor: '#E0E0E0',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded shadow-lg">
        <p className="text-white font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProgressSpiderWeb = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl" style={componentStyle}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Security Skills Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securitySkills}>
            <PolarGrid stroke={chartConfig.gridColor} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: chartConfig.textColor, fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 150]}
              tick={{ fill: chartConfig.textColor, fontSize: 10 }}
            />
            <Radar
              name="Your Skills"
              dataKey="A"
              stroke="#4CAF50"
              fill="#4CAF50"
              fillOpacity={0.6}
            />
            <Radar
              name="Industry Average"
              dataKey="B"
              stroke="#2196F3"
              fill="#2196F3"
              fillOpacity={0.6}
            />
            <Legend 
              wrapperStyle={{ color: chartConfig.textColor }}
              formatter={(value, entry, index) => <span style={{color: chartConfig.textColor}}>{value}</span>}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressSpiderWeb;