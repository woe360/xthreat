'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const DepartmentTraining = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  const departments = [
    {
      id: 'finance',
      title: 'Finance & Accounting',
      description: 'Security training for handling financial data, preventing fraud, and securing financial transactions.',
      riskLevel: 'High',
      estimatedTime: 4,
      available: true,
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
      <div className="h-[calc(100vh-theme(spacing.3))] font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3 overflow-auto">
        <div className="border-b border-gray-800/40 pb-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedDept(null)}
            className="text-gray-400 justify-center hover:bg-[#181b24] border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
            
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
            <h1 className="text-2xl font-medium text-white">{selectedDept.title}</h1>
          </div>
          
          {/* <h1 className="text-2xl font-medium text-white mb-4">{selectedDept.title}</h1> */}
          <p className="text-gray-400 text-sm max-w-3xl mb-6">
            {selectedDept.preview}
          </p>
          
          <div className="flex gap-3">
            <span className={`${selectedDept.riskLevel === 'High' ? 'text-red-400' : 'text-orange-400'} px-3 py-1 rounded-lg text-sm`}>
              {selectedDept.riskLevel} Risk Level
            </span>
            <span className="text-gray-400 text-sm">
              {selectedDept.estimatedTime} hours estimated
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">Key Topics Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDept.keyTopics.map((topic, index) => (
              <div key={index} className="bg-[#181b24] p-4 rounded-lg">
                <p className="text-gray-300">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        <Link 
          href={`/training/${selectedDept.id}/start`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Start Training
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.3))] font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3 overflow-auto">
      <div className="border-b border-gray-800/40 pb-6 mb-8">
        <h1 className="text-2xl font-medium text-white mb-4">Security Awareness Training</h1>
        <p className="text-gray-400 text-sm max-w-3xl">
          Select your department to access specialized cybersecurity training modules tailored to your role's specific security requirements and risk factors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <button 
            key={dept.id}
            onClick={() => dept.id === 'finance' ? setSelectedDept(dept) : null}
            className={`text-left ${dept.id !== 'finance' ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            <div className="bg-[#181b24] border border-gray-800/50 hover:border-gray-700 rounded-lg transition-all duration-200">
              <div className="p-6">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">
                      {dept.title}
                    </h3>
                    {dept.id !== 'finance' && (
                      <span className="bg-amber-500/10 text-amber-500 px-4 py-1.5 rounded-lg text-sm font-medium ml-4">
                        In Development
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {dept.description}
                  </p>
                  <span className="text-sm text-gray-500">
                    Estimated completion: {dept.estimatedTime} hours
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTraining;