// 'use client'
// import React, { useState } from 'react';
// import { CreditCard, Download, DollarSign, ArrowUpRight, Clock, AlertTriangle, Filter } from 'lucide-react';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';

// interface Invoice {
//   id: string;
//   companyName: string;
//   amount: number;
//   status: 'paid' | 'pending' | 'overdue';
//   dueDate: string;
//   issuedDate: string;
//   paymentMethod: string;
// }

// const FinancialsPage = () => {
//   const revenueData = [
//     { month: 'Jan', value: 45000 },
//     { month: 'Feb', value: 52000 },
//     { month: 'Mar', value: 58000 },
//     { month: 'Apr', value: 65000 },
//     { month: 'May', value: 72000 },
//     { month: 'Jun', value: 80000 },
//   ];

//   const overdueData = [
//     { month: 'Jan', value: 2 },
//     { month: 'Feb', value: 3 },
//     { month: 'Mar', value: 2 },
//     { month: 'Apr', value: 4 },
//     { month: 'May', value: 3 },
//     { month: 'Jun', value: 2 },
//   ];

//   const [invoices, setInvoices] = useState<Invoice[]>([
//     {
//       id: "INV-2024-001",
//       companyName: "TechCorp Solutions",
//       amount: 2500,
//       status: 'paid',
//       dueDate: "2024-11-30",
//       issuedDate: "2024-11-01",
//       paymentMethod: "Credit Card"
//     },
//     {
//       id: "INV-2024-002",
//       companyName: "Global Finance Inc",
//       amount: 4500,
//       status: 'pending',
//       dueDate: "2024-11-28",
//       issuedDate: "2024-11-01",
//       paymentMethod: "Bank Transfer"
//     },
//     {
//       id: "INV-2024-003",
//       companyName: "Healthcare Plus",
//       amount: 3500,
//       status: 'overdue',
//       dueDate: "2024-11-15",
//       issuedDate: "2024-10-15",
//       paymentMethod: "Credit Card"
//     }
//   ]);

//   const StatCard = ({ title, value, trend, data, color, percentageChange, prefix = '' }) => (
//     <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-gray-400 text-sm">{title}</h3>
//         <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
//           {percentageChange > 0 ? '+' : ''}{percentageChange}%
//         </span>
//       </div>
//       <div className="flex items-end justify-between">
//         <div>
//           <p className="text-3xl font-bold mb-1">{prefix}{value}</p>
//           <p className="text-sm text-gray-400">{trend}</p>
//         </div>
//         <div className="w-32 h-16">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke={`var(--${color}-500)`}
//                 strokeWidth={2}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );

//   const getStatusBadge = (status: string) => {
//     const styles = {
//       paid: 'bg-green-500/20 text-green-400',
//       pending: 'bg-yellow-500/20 text-yellow-400',
//       overdue: 'bg-red-500/20 text-red-400'
//     };
//     return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{status}</span>;
//   };

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//       <div>
//         <div className="flex justify-between items-center mb-8 mt-1">
//           <h1 className="text-xl font-base text-white">Financials</h1>
//           <div className="flex space-x-4">
//             <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
//               <CreditCard size={20} className="mr-2" />
//               Payment Methods
//             </button>
//             <button className="bg-green-500/30 text-green-400 hover:bg-green-500/50 hover:text-green-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
//               <Download size={20} className="mr-2" />
//               Export
//             </button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatCard
//             title="Monthly Revenue"
//             value="80,000"
//             trend="vs last month"
//             data={revenueData}
//             color="green"
//             percentageChange={12}
//             prefix="$"
//           />
          
//           <StatCard
//             title="Outstanding Balance"
//             value="12,500"
//             trend="across 3 clients"
//             data={overdueData}
//             color="yellow"
//             percentageChange={-8}
//             prefix="$"
//           />
          
//           <StatCard
//             title="Overdue Invoices"
//             value="2"
//             trend="requiring attention"
//             data={overdueData}
//             color="red"
//             percentageChange={-25}
//           />
//         </div>

//         {/* Alerts Section */}
//         <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
//           <div className="flex items-center">
//             <AlertTriangle className="text-yellow-500 mr-3" size={24} />
//             <div>
//               <h3 className="text-yellow-500 font-medium">Payment Alerts</h3>
//               <p className="text-yellow-500/80 text-sm">3 invoices are due within the next 7 days</p>
//             </div>
//           </div>
//         </div>

//         {/* Invoices Table */}
//         <div className="bg-[#050607] border border-gray-800 rounded-lg overflow-hidden">
//           <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//             <h2 className="text-lg font-medium">Recent Invoices</h2>
//             <button className="text-gray-400 hover:text-gray-300 transition-colors">
//               <Filter size={20} />
//             </button>
//           </div>
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-800">
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-800">
//               {invoices.map((invoice) => (
//                 <tr key={invoice.id} className="hover:bg-gray-900/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div>
//                         <div className="text-sm font-medium text-white">{invoice.id}</div>
//                         <div className="text-sm text-gray-400">{invoice.companyName}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-300">${invoice.amount.toLocaleString()}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     {getStatusBadge(invoice.status)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <Clock size={16} className="text-gray-400 mr-2" />
//                       <div className="text-sm text-gray-300">{invoice.dueDate}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-300">{invoice.paymentMethod}</div>
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <div className="flex space-x-3">
//                       <button className="text-gray-400 hover:text-blue-400 transition-colors">
//                         <Download size={20} />
//                       </button>
//                       <button className="text-gray-400 hover:text-blue-400 transition-colors">
//                         <ArrowUpRight size={20} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinancialsPage;

'use client'
import React, { useState } from 'react';
import { CreditCard, Download, DollarSign, ArrowUpRight, Clock, AlertTriangle, Filter } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Invoice {
  id: string;
  companyName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issuedDate: string;
  paymentMethod: string;
}

const FinancialsPage = () => {
  const revenueData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 52000 },
    { month: 'Mar', value: 58000 },
    { month: 'Apr', value: 65000 },
    { month: 'May', value: 72000 },
    { month: 'Jun', value: 80000 },
  ];

  const overdueData = [
    { month: 'Jan', value: 2 },
    { month: 'Feb', value: 3 },
    { month: 'Mar', value: 2 },
    { month: 'Apr', value: 4 },
    { month: 'May', value: 3 },
    { month: 'Jun', value: 2 },
  ];

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-2024-001",
      companyName: "TechCorp Solutions",
      amount: 2500,
      status: 'paid',
      dueDate: "2024-11-30",
      issuedDate: "2024-11-01",
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-2024-002",
      companyName: "Global Finance Inc",
      amount: 4500,
      status: 'pending',
      dueDate: "2024-11-28",
      issuedDate: "2024-11-01",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "INV-2024-003",
      companyName: "Healthcare Plus",
      amount: 3500,
      status: 'overdue',
      dueDate: "2024-11-15",
      issuedDate: "2024-10-15",
      paymentMethod: "Credit Card"
    }
  ]);

  const StatCard = ({ title, value, trend, data, color, percentageChange, prefix = '' }) => (
    <div className="bg-[#050607] border-white/[0.06] border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className={`bg-${color}-500/20 text-${color}-400 text-xs px-2 py-1 rounded`}>
          {percentageChange > 0 ? '+' : ''}{percentageChange}%
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold mb-1">{prefix}{value}</p>
          <p className="text-sm text-gray-400">{trend}</p>
        </div>
        <div className="w-32 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={`var(--${color}-500)`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-500/20 text-green-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      overdue: 'bg-red-500/20 text-red-400'
    };
    return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{status}</span>;
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Financials</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
              <CreditCard size={20} className="mr-2" />
              Payment Methods
            </button>
            <button className="bg-green-500/30 text-green-400 hover:bg-green-500/50 hover:text-green-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
              <Download size={20} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Monthly Revenue"
            value="80,000"
            trend="vs last month"
            data={revenueData}
            color="green"
            percentageChange={12}
            prefix="$"
          />
          
          <StatCard
            title="Outstanding Balance"
            value="12,500"
            trend="across 3 clients"
            data={overdueData}
            color="yellow"
            percentageChange={-8}
            prefix="$"
          />
          
          <StatCard
            title="Overdue Invoices"
            value="2"
            trend="requiring attention"
            data={overdueData}
            color="red"
            percentageChange={-25}
          />
        </div>

        {/* Alerts Section */}
        <div className="bg-yellow-500/10 border-white/[0.06] border rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-500 mr-3" size={24} />
            <div>
              <h3 className="text-yellow-500 font-medium">Payment Alerts</h3>
              <p className="text-yellow-500/80 text-sm">3 invoices are due within the next 7 days</p>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-[#050607] border-white/[0.06] border rounded-lg overflow-hidden">
          <div className="p-4 border-white/[0.06] border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Invoices</h2>
            <button className="text-gray-400 hover:text-gray-300 transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-white/[0.06] border-b">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{invoice.id}</div>
                        <div className="text-sm text-gray-400">{invoice.companyName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">${invoice.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-300">{invoice.dueDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{invoice.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Download size={20} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialsPage;