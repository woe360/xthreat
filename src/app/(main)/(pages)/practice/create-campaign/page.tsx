// import React from 'react';
// import Link from 'next/link';

// const CreateCampaign = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Back Button */}
//       <div className="flex justify-between items-center mb-6">
//         <Link className="text-gray-600 hover:text-gray-900 transition flex items-center" href="/practice/phishing-simulation" passHref> 
//             ‹ Campaigns
//         </Link>
//       </div>

//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
//         <p className="text-gray-600 mt-2">Set up the details for your new phishing campaign.</p>
//       </div>

//       {/* Form Section */}
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">Campaign Name</label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
//           />
//         </div>
//         <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
//           Save Campaign
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateCampaign;

'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const CreateCampaign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-min font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/practice/phishing-simulation" className="text-gray-400 hover:text-white transition flex items-center">
          ‹ Campaigns
        </Link>
        <div className="flex items flex-col -center">
          <h1 className="text-3xl font-bold text-white">Campaign 57</h1>
          <div className="ml-6 flex items-center space-x-4 text-gray-500">
            <p className="flex items-center">
              <span className="ml-1">0 recipients</span>
            </p>
            <p className="flex items-center">
              <span className="ml-1">0 days left</span>
            </p>
          </div>
        </div>
        <button className="bg-gray-800 text-gray-400 py-2 px-4 rounded-lg transition hover:bg-gray-700 hover:text-white">Draft</button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 text-gray-400 mb-12">
        <Link href="/practice/create-campaign/overview" className="hover:text-purple-400">
          Overview
        </Link>
        <span>›</span>
        <Link href="/practice/create-campaign/recipients" className="text-purple-400 font-semibold">
          Recipients
        </Link>
        <span>›</span>
        <Link href="/practice/create-campaign/template" className="hover:text-purple-400">
          Template
        </Link>
        <span>›</span>
        <Link href="/practice/create-campaign/schedule" className="hover:text-purple-400">
          Schedule
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="text-6xl text-purple-400 mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-300">No recipients added yet</h2>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-700 border border-gray-600 text-gray-300 py-2 px-6 rounded-xl hover:bg-gray-600">
            Import CSV
          </button>
          <button
            onClick={openModal}
            className="bg-gray-300 text-black py-2 px-6 rounded-xl hover:bg-white"
          >
            Select from employees
          </button>
        </div>
      </div>

      {/* Dark Themed Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Select Employees</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-300">
                ✕
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              <table className="min-w-full rounded-xl bg-gray-800">
                <thead>
                  <tr>
                    <th className="w-1/4 px-4 py-2 text-left text-gray-400 font-medium">First Name</th>
                    <th className="w-1/4 px-4 py-2 text-left text-gray-400 font-medium">Last Name</th>
                    <th className="w-1/2 px-4 py-2 text-left text-gray-400 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { firstName: 'Gabriel', lastName: 'Garcia', email: 'gabriel_garcia@example.com' },
                    { firstName: 'Virginia', lastName: 'Woolf', email: 'virginia.woolf@example.com' },
                    { firstName: 'Ana', lastName: 'Lee', email: 'ana.lee@example.com' },
                    { firstName: 'Emily', lastName: 'Dickinson', email: 'emily.d@example.com' },
                    { firstName: 'Allan', lastName: 'Poe', email: 'allan.poe@example.com' },
                    { firstName: 'Jane', lastName: 'Austen', email: 'jane.austen@example.com' },
                    // Add more employees as needed
                  ].map((employee, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-t border-gray-700">
                        <input type="checkbox" className="form-checkbox" />
                      </td>
                      <td className="px-4 py-2 border-t border-gray-700 text-gray-300">{employee.firstName}</td>
                      <td className="px-4 py-2 border-t border-gray-700 text-gray-300">{employee.lastName}</td>
                      <td className="px-4 py-2 border-t border-gray-700 text-gray-300">{employee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeModal}
                className="bg-red-900 text-gray-300 py-2 px-4 rounded-xl mr-4 hover:bg-red-800"
              >
                Cancel
              </button>
              <button className="bg-gray-300 text-black py-2 px-6 rounded-xl hover:bg-white">
                Add recipients
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;



// import React from 'react';
// import Link from 'next/link';

// const CreateCampaign = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <Link href="/practice/phishing-simulation" className="text-gray-600 hover:text-gray-900 transition flex items-center">
//           ‹ Campaigns
//         </Link>
//         <div className="flex items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Campaign 57</h1>
//           <div className="ml-6 flex items-center space-x-4 text-gray-500">
//             <p className="flex items-center">
//               👥 <span className="ml-1">0 recipients</span>
//             </p>
//             <p className="flex items-center">
//               📅 <span className="ml-1">0 days left</span>
//             </p>
//           </div>
//         </div>
//         <button className="bg-gray-200 text-gray-900 py-2 px-4 rounded-lg transition">Draft</button>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex space-x-4 text-gray-600 mb-12">
//         <Link href="/practice/create-campaign/overview" className="hover:text-purple-500">
//           OVERVIEW
//         </Link>
//         <span>›</span>
//         <Link href="/practice/create-campaign/recipients" className="text-purple-500 font-semibold">
//           RECIPIENTS
//         </Link>
//         <span>›</span>
//         <Link href="/practice/create-campaign/template" className="hover:text-purple-500">
//           TEMPLATE
//         </Link>
//         <span>›</span>
//         <Link href="/practice/create-campaign/schedule" className="hover:text-purple-500">
//           SCHEDULE
//         </Link>
//       </div>

//       {/* Main Content Area */}
//       <div className="bg-white p-12 rounded-lg shadow-lg text-center">
//         <div className="flex flex-col items-center mb-8">
//           <div className="text-6xl text-purple-600 mb-4">👥</div>
//           <h2 className="text-2xl font-semibold text-gray-700">No recipients added yet</h2>
//         </div>
//         <div className="flex justify-center space-x-4">
//           <button className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-100">
//             Import CSV
//           </button>
//           <button className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700">
//             Select from employees
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCampaign;
