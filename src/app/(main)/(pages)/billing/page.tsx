// 'use client'
// import React from 'react';
// import { CreditCard, Download, DollarSign, Users } from 'lucide-react';

// const BillingPage = () => {
//   const billingInfo = {
//     currentPlan: 'Enterprise',
//     nextBillingDate: 'October 1, 2024',
//     amount: '$1,999.00',
//     paymentMethod: '**** **** **** 1234',
//     activeUsers: 150,
//     costPerUser: '$13.33'
//   };

//   const recentTransactions = [
//     { date: 'Sep 1, 2024', amount: '$1,999.00', status: 'Paid' },
//     { date: 'Aug 1, 2024', amount: '$1,999.00', status: 'Paid' },
//     { date: 'Jul 1, 2024', amount: '$1,999.00', status: 'Paid' },
//   ];

//   return (
//     <div className="min-h-min bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Billing Overview</h1>

//       {/* Current Plan Summary */}
//       <div className="bg-gray-800 rounded-lg p-6 mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Current Plan: {billingInfo.currentPlan}</h2>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Upgrade Plan
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="flex items-center">
//             <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
//             <span>Next billing on {billingInfo.nextBillingDate}</span>
//           </div>
//           <div className="flex items-center">
//             <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
//             <span>Amount: {billingInfo.amount}</span>
//           </div>
//           <div className="flex items-center">
//             <Users className="w-5 h-5 mr-2 text-gray-400" />
//             <span>{billingInfo.activeUsers} active users</span>
//           </div>
//           <div className="flex items-center">
//             <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
//             <span>Cost per user: {billingInfo.costPerUser}</span>
//           </div>
//         </div>
//       </div>

//       {/* Recent Transactions */}
//       <div className="bg-gray-800 rounded-lg p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-400">
//                 <th className="pb-3 font-normal">Date</th>
//                 <th className="pb-3 font-normal">Amount</th>
//                 <th className="pb-3 font-normal">Status</th>
//                 <th className="pb-3 font-normal">Invoice</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentTransactions.map((transaction, index) => (
//                 <tr key={index} className="border-t border-gray-700">
//                   <td className="py-3">{transaction.date}</td>
//                   <td className="py-3">{transaction.amount}</td>
//                   <td className="py-3">
//                     <span className="bg-green-600 text-green-100 py-1 px-2 rounded-full text-xs">
//                       {transaction.status}
//                     </span>
//                   </td>
//                   <td className="py-3">
//                     <button className="text-blue-400 hover:text-blue-300 flex items-center">
//                       <Download className="w-4 h-4 mr-1" /> Download
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Payment Method */}
//       <div className="bg-gray-800 rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
//         <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
//           <div className="flex items-center">
//             <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
//             <span>{billingInfo.paymentMethod}</span>
//           </div>
//           <button className="text-blue-400 hover:text-blue-300">Change</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BillingPage;

'use client'
import React from 'react';
import { CreditCard, Download, DollarSign, Users } from 'lucide-react';

interface BillingInfo {
  currentPlan: 'Basic' | 'Professional' | 'Enterprise';
  nextBillingDate: string;
  amount: string;
  paymentMethod: string;
  activeUsers: number;
  costPerUser: string;
}

interface Transaction {
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

const BillingPage = () => {
  const billingInfo: BillingInfo = {
    currentPlan: 'Enterprise',
    nextBillingDate: 'October 1, 2024',
    amount: '$1,999.00',
    paymentMethod: '**** **** **** 1234',
    activeUsers: 150,
    costPerUser: '$13.33'
  };

  const recentTransactions: Transaction[] = [
    { date: 'Sep 1, 2024', amount: '$1,999.00', status: 'Paid' },
    { date: 'Aug 1, 2024', amount: '$1,999.00', status: 'Paid' },
    { date: 'Jul 1, 2024', amount: '$1,999.00', status: 'Paid' },
  ];

  const handleUpgradePlan = (): void => {
    // Implementation for plan upgrade
    console.log('Upgrading plan...');
  };

  const handleChangePaymentMethod = (): void => {
    // Implementation for payment method change
    console.log('Changing payment method...');
  };

  const handleDownloadInvoice = (date: string): void => {
    // Implementation for invoice download
    console.log(`Downloading invoice for ${date}...`);
  };

  return (
    <div className="min-h-min bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Billing Overview</h1>

      {/* Current Plan Summary */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Plan: {billingInfo.currentPlan}</h2>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpgradePlan}
          >
            Upgrade Plan
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
            <span>Next billing on {billingInfo.nextBillingDate}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
            <span>Amount: {billingInfo.amount}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-gray-400" />
            <span>{billingInfo.activeUsers} active users</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
            <span>Cost per user: {billingInfo.costPerUser}</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal">Amount</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction: Transaction, index: number) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-3">{transaction.date}</td>
                  <td className="py-3">{transaction.amount}</td>
                  <td className="py-3">
                    <span className="bg-green-600 text-green-100 py-1 px-2 rounded-full text-xs">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button 
                      className="text-blue-400 hover:text-blue-300 flex items-center"
                      onClick={() => handleDownloadInvoice(transaction.date)}
                    >
                      <Download className="w-4 h-4 mr-1" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
            <span>{billingInfo.paymentMethod}</span>
          </div>
          <button 
            className="text-blue-400 hover:text-blue-300"
            onClick={handleChangePaymentMethod}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;