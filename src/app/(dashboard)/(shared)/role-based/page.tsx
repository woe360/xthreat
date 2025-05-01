'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Clock, AlertTriangle, ArrowRight, Shield, Users, Building } from 'lucide-react';

interface Department {
  id: string;
  title: string;
  description: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  estimatedTime: number;
  available?: boolean;
  icon?: React.ReactNode;
  preview: string;
  keyTopics: string[];
}

const DepartmentTraining = () => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const departments: Department[] = [
    {
      id: 'finance',
      title: 'Finance & Accounting',
      description: 'Security training for handling financial data, preventing fraud, and securing financial transactions.',
      riskLevel: 'High',
      estimatedTime: 4,
      available: true,
      icon: <Building className="h-5 w-5 text-blue-400" />,
      preview: 'Learn to protect financial assets, secure transactions, and prevent cyber fraud. This training covers secure banking protocols, financial data protection, and identifying financial fraud attempts.',
      keyTopics: [
        'Secure financial transaction handling',
        'Protection of banking credentials',
        'Financial data encryption',
        'Fraud prevention protocols'
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      description: 'Training focused on protecting employee data, preventing social engineering attacks, and maintaining personnel information security.',
      riskLevel: 'High',
      estimatedTime: 3,
      icon: <Users className="h-5 w-5 text-purple-400" />,
      preview: 'Master the protection of sensitive employee information and prevent social engineering attacks. Learn about secure data handling and privacy compliance.',
      keyTopics: [
        'Employee data protection',
        'Social engineering defense',
        'Privacy compliance',
        'Secure document handling'
      ]
    },
    {
      id: 'it',
      title: 'IT & Technology',
      description: 'Advanced security protocols, system protection, and infrastructure security best practices.',
      riskLevel: 'High',
      estimatedTime: 6,
      icon: <Shield className="h-5 w-5 text-green-400" />,
      preview: 'Advanced security training covering system protection, infrastructure security, and technical safeguards. Designed for IT professionals managing company systems.',
      keyTopics: [
        'System security protocols',
        'Infrastructure protection',
        'Access control management',
        'Security incident response'
      ]
    },
    {
      id: 'sales',
      title: 'Sales & Business Development',
      description: 'Security practices for CRM data, mobile device protection, and defense against targeted phishing.',
      riskLevel: 'Medium',
      estimatedTime: 2.5,
      preview: 'Learn to protect customer data and secure mobile devices while working remotely. Focus on preventing phishing attacks and securing customer information.',
      keyTopics: [
        'CRM data protection',
        'Mobile security',
        'Anti-phishing techniques',
        'Customer data privacy'
      ]
    },
    {
      id: 'operations',
      title: 'Operations & Administration',
      description: 'Essential security practices for document handling, vendor management, and daily operations.',
      riskLevel: 'Medium',
      estimatedTime: 2,
      preview: 'Essential security training for daily operations, including document handling, vendor management, and operational security practices.',
      keyTopics: [
        'Document security',
        'Vendor access management',
        'Operational security',
        'Communication security'
      ]
    },
    {
      id: 'executive',
      title: 'Executive & Management',
      description: 'Critical security awareness for leadership, focusing on high-level threats and strategic security decisions.',
      riskLevel: 'High',
      estimatedTime: 3,
      preview: 'Executive-focused security training covering strategic security decisions, leadership responsibilities, and high-level threat awareness.',
      keyTopics: [
        'Strategic security planning',
        'Executive-level threats',
        'Security leadership',
        'Risk management'
      ]
    }
  ];

  if (selectedDept) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          {/* Header with back button */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedDept(null)}
              className="text-gray-400 inline-flex items-center hover:text-white mb-6 group"
            >
              <ChevronLeft className="h-4 w-4 mr-1 group-hover:transform group-hover:-translate-x-0.5 transition-transform" />
              Back to departments
            </button>
            
            <h1 className="text-3xl md:text-4xl font-light bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-4">
              {selectedDept.title}
            </h1>
            
            <p className="text-gray-400 max-w-3xl mb-6">
              {selectedDept.preview}
            </p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                selectedDept.riskLevel === 'High' 
                  ? 'bg-red-500/10 text-red-400' 
                  : 'bg-orange-500/10 text-orange-400'
              }`}>
                <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                {selectedDept.riskLevel} Risk Level
              </span>
              
              <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm inline-flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                {selectedDept.estimatedTime} hours estimated
              </span>
            </div>
          </div>

          {/* Key Topics */}
          <div className="mb-8">
            <h2 className="text-xl font-light text-white mb-6">Key Topics Covered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDept.keyTopics.map((topic, index) => (
                <div 
                  key={index} 
                  className="bg-black/20 border border-gray-800/40 hover:border-gray-700/70 p-5 rounded-lg transition-all"
                >
                  <p className="text-gray-200">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            href={`/training/${selectedDept.id}/start`}
            className="inline-flex items-center bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-6 py-3 rounded-lg transition-colors border border-blue-500/30 hover:border-blue-500/50 group mt-4"
          >
            Start Training
            <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-4">
            Role-Based Security Training
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Select your department to access specialized cybersecurity training modules tailored to your role's specific security requirements and risk factors.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <button 
              key={dept.id}
              onClick={() => dept.id === 'finance' ? setSelectedDept(dept) : null}
              className={`text-left ${dept.id !== 'finance' ? 'cursor-not-allowed' : 'hover:transform hover:-translate-y-1'} transition-all duration-200`}
              disabled={dept.id !== 'finance'}
            >
              <div className={`bg-black/20 border border-gray-800/40 ${dept.id === 'finance' ? 'hover:border-gray-700/70' : 'opacity-70'} rounded-lg h-full transition-all`}>
                <div className="p-6 flex flex-col h-full">
                  {/* Department Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {dept.icon ? dept.icon : null}
                      <h3 className="text-xl font-light text-white ml-2">
                        {dept.title}
                      </h3>
                    </div>
                    {dept.id !== 'finance' && (
                      <span className="bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-xs font-medium">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {dept.description}
                  </p>
                  
                  {/* Info Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className={`text-xs rounded-full px-2.5 py-1 inline-flex items-center ${
                      dept.riskLevel === 'High' 
                        ? 'bg-red-500/10 text-red-300' 
                        : 'bg-orange-500/10 text-orange-300'
                    }`}>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {dept.riskLevel} Risk
                    </span>
                    
                    <span className="bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded-full text-xs inline-flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {dept.estimatedTime} hours
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentTraining;