'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CompanyData {
  name: string;
  completionRate: number;
  completionTrend: number;
  awarenessLevel: number;
  awarenessTrend: number;
  activeUsers: number;
  activeUsersTrend: number;
  securityScore: string;
  securityTrend: number;
}

const mockCompanies: CompanyData[] = [
  {
    name: "TechCorp Solutions",
    completionRate: 94,
    completionTrend: 5.2,
    awarenessLevel: 92,
    awarenessTrend: 4.8,
    activeUsers: 1248,
    activeUsersTrend: 12.5,
    securityScore: "A+",
    securityTrend: 3.2
  },
  {
    name: "Global Finance Inc",
    completionRate: 88,
    completionTrend: 3.5,
    awarenessLevel: 86,
    awarenessTrend: 2.9,
    activeUsers: 856,
    activeUsersTrend: 8.4,
    securityScore: "A",
    securityTrend: 2.1
  },
  {
    name: "HealthCare Plus",
    completionRate: 91,
    completionTrend: 4.7,
    awarenessLevel: 89,
    awarenessTrend: 3.8,
    activeUsers: 972,
    activeUsersTrend: 10.2,
    securityScore: "A+",
    securityTrend: 2.8
  },
  {
    name: "Retail Masters",
    completionRate: 85,
    completionTrend: 2.8,
    awarenessLevel: 83,
    awarenessTrend: 2.4,
    activeUsers: 645,
    activeUsersTrend: 5.6,
    securityScore: "B+",
    securityTrend: 1.5
  },
  {
    name: "Manufacturing Pro",
    completionRate: 87,
    completionTrend: 3.2,
    awarenessLevel: 85,
    awarenessTrend: 2.7,
    activeUsers: 734,
    activeUsersTrend: 6.8,
    securityScore: "A-",
    securityTrend: 1.9
  }
];

export default function CompanyComparisonTable() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom sx={{ mb: 3 }}>
          Company Performance Comparison
        </Typography>
        <div className="rounded-md border bg-[#181b24] border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-500/10 transition-colors">
                <TableHead>Company</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Awareness Level</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Security Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCompanies.map((company) => (
                <TableRow key={company.name} className="hover:bg-gray-500/10 transition-colors">
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{company.completionRate}%</span>
                      <span className={`flex items-center text-sm ${company.completionTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {company.completionTrend >= 0 ? 
                          <ArrowUp className="w-4 h-4 mr-1" /> : 
                          <ArrowDown className="w-4 h-4 mr-1" />}
                        {Math.abs(company.completionTrend)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{company.awarenessLevel}%</span>
                      <span className={`flex items-center text-sm ${company.awarenessTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {company.awarenessTrend >= 0 ? 
                          <ArrowUp className="w-4 h-4 mr-1" /> : 
                          <ArrowDown className="w-4 h-4 mr-1" />}
                        {Math.abs(company.awarenessTrend)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{company.activeUsers.toLocaleString()}</span>
                      <span className={`flex items-center text-sm ${company.activeUsersTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {company.activeUsersTrend >= 0 ? 
                          <ArrowUp className="w-4 h-4 mr-1" /> : 
                          <ArrowDown className="w-4 h-4 mr-1" />}
                        {Math.abs(company.activeUsersTrend)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        company.securityScore === 'A+' ? 'bg-green-500/20 text-green-400' :
                        company.securityScore === 'A' ? 'bg-green-500/20 text-green-400' :
                        company.securityScore === 'A-' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {company.securityScore}
                      </span>
                      <span className={`flex items-center text-sm ${company.securityTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {company.securityTrend >= 0 ? 
                          <ArrowUp className="w-4 h-4 mr-1" /> : 
                          <ArrowDown className="w-4 h-4 mr-1" />}
                        {Math.abs(company.securityTrend)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 