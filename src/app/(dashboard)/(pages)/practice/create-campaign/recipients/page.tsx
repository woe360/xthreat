'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CampaignState from '@/lib/state/campaignState';

const RecipientsPage = () => {
  const router = useRouter();
  const campaignState = CampaignState.getInstance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [checkedEmployees, setCheckedEmployees] = useState({});

  const employees = [
    { firstName: 'Gabriel', lastName: 'Garcia', email: 'gabriel_garcia@example.com', role: 'Software Engineer' },
    { firstName: 'Virginia', lastName: 'Woolf', email: 'virginia.woolf@example.com', role: 'Product Manager' },
    { firstName: 'Ana', lastName: 'Lee', email: 'ana.lee@example.com', role: 'UI Designer' },
    { firstName: 'Emily', lastName: 'Dickinson', email: 'emily.d@example.com', role: 'Marketing Specialist' },
    { firstName: 'Allan', lastName: 'Poe', email: 'allan.poe@example.com', role: 'Data Analyst' },
    { firstName: 'Jane', lastName: 'Austen', email: 'jane.austen@example.com', role: 'HR Manager' }
  ];

  // Load saved recipients on mount
  useEffect(() => {
    const savedRecipients = campaignState.getData('recipients');
    if (savedRecipients) {
      setSelectedRecipients(savedRecipients);
    }
  }, []);

  const handleCheckboxChange = (email) => {
    setCheckedEmployees(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  const handleAddRecipients = () => {
    const newRecipients = employees.filter(emp => checkedEmployees[emp.email]);
    const updatedRecipients = [...selectedRecipients, ...newRecipients];
    setSelectedRecipients(updatedRecipients);
    campaignState.updateData('recipients', updatedRecipients);
    setCheckedEmployees({});
    setIsModalOpen(false);
  };

  const handleRemoveRecipient = (email) => {
    const updatedRecipients = selectedRecipients.filter(r => r.email !== email);
    setSelectedRecipients(updatedRecipients);
    campaignState.updateData('recipients', updatedRecipients);
  };

  const handleNext = () => {
    if (selectedRecipients.length === 0) {
      alert('Please select at least one recipient');
      return;
    }
    campaignState.updateData('recipients', selectedRecipients);
    router.push('/practice/create-campaign/template');
  };

  return (
    <div className="space-y-6">
      {selectedRecipients.length > 0 ? (
        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-white">Recipients</h2>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-blue-500/30 text-blue-400 py-2 px-4 rounded-lg"
            >
              Add More
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-2 text-left text-gray-400 font-medium">Name</th>
                <th className="px-4 py-2 text-left text-gray-400 font-medium">Email</th>
                <th className="px-4 py-2 text-left text-gray-400 font-medium">Role</th>
                <th className="px-4 py-2 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {selectedRecipients.map((recipient, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="px-4 py-2 text-gray-300">{`${recipient.firstName} ${recipient.lastName}`}</td>
                  <td className="px-4 py-2 text-gray-300">{recipient.email}</td>
                  <td className="px-4 py-2 text-gray-300">{recipient.role}</td>
                  <td className="px-4 py-2 text-right">
                    <button 
                      onClick={() => handleRemoveRecipient(recipient.email)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleNext}
              className="bg-blue-500/30 text-blue-400 py-2 px-6 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-12 mt-8 text-center">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-medium text-gray-100">No recipients added yet</h2>
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-blue-500/30 text-blue-400 py-2 px-6 rounded-lg"
            >
              Select from employees
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <div className="bg-[#181b24] rounded-lg w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-white">Select Employees</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="w-8 px-4 py-2" />
                    <th className="px-4 py-2 text-left text-gray-400 font-medium">First Name</th>
                    <th className="px-4 py-2 text-left text-gray-400 font-medium">Last Name</th>
                    <th className="px-4 py-2 text-left text-gray-400 font-medium">Email</th>
                    <th className="px-4 py-2 text-left text-gray-400 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr 
                      key={index} 
                      className="cursor-pointer hover:bg-[#1f2937] hover:rounded-lg [&>td:first-child]:hover:rounded-l-lg [&>td:last-child]:hover:rounded-r-xl"
                      onClick={() => handleCheckboxChange(employee.email)}
                    >
                      <td className="px-4 py-2">
                        <input 
                          type="checkbox" 
                          checked={checkedEmployees[employee.email] || false}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleCheckboxChange(employee.email);
                          }}
                          className="form-checkbox"
                        />
                      </td>
                      <td className="px-4 py-2 text-gray-300">{employee.firstName}</td>
                      <td className="px-4 py-2 text-gray-300">{employee.lastName}</td>
                      <td className="px-4 py-2 text-gray-300">{employee.email}</td>
                      <td className="px-4 py-2 text-gray-300">{employee.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-[#050607] border border-gray-800 text-gray-400 py-2 px-4 rounded-lg hover:border-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRecipients}
                className="bg-blue-500/30 text-blue-400 py-2 px-6 rounded-lg"
              >
                Add recipients
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientsPage; 