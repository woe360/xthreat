'use client'
import React, { useState } from 'react';
import { CreditCard, Download, DollarSign, Users, X } from 'lucide-react';
import { downloadInvoice } from './components/InvoiceGenerator';

interface BillingInfo {
  currentPlan: 'Essential' | 'Advanced' | 'Tailored';
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

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const BillingPage = () => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [isUpdatingCard, setIsUpdatingCard] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    currentPlan: 'Tailored',
    nextBillingDate: 'October 1, 2024',
    amount: '$1,999.00',
    paymentMethod: '**** **** **** 1234',
    activeUsers: 150,
    costPerUser: '$13.33'
  });

  const recentTransactions: Transaction[] = [
    { date: 'Sep 1, 2024', amount: '$1,999.00', status: 'Paid' },
    { date: 'Aug 1, 2024', amount: '$1,999.00', status: 'Paid' },
    { date: 'Jul 1, 2024', amount: '$1,999.00', status: 'Paid' },
  ];

  const handleUpgradePlan = (): void => {
    console.log('Upgrading plan...');
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
    }
    
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }
    
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmitCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingCard(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const lastFour = cardDetails.cardNumber.slice(-4);
      setBillingInfo(prev => ({
        ...prev,
        paymentMethod: `**** **** **** ${lastFour}`
      }));
      
      setShowCardModal(false);
      setCardDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      });
    } catch (error) {
      console.error('Failed to update card:', error);
    } finally {
      setIsUpdatingCard(false);
    }
  };

  const handleDownloadInvoice = (date: string): void => {
    const transaction = recentTransactions.find(t => t.date === date);
    if (transaction) {
      const invoiceData = {
        companyName: "Your Company Name",
        companyAddress: "123 Business Street",
        companyCity: "Business City",
        companyZip: "BS 12345",
        customerName: "Customer Name"
      };
      
      downloadInvoice(transaction, billingInfo, invoiceData);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Billing</h1>
          <div className="flex space-x-4">
            <button 
              className="px-4 py-2 bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 rounded-lg transition-colors"
              onClick={handleUpgradePlan}
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm">Monthly Cost</h3>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">+2.3%</span>
            </div>
            <p className="text-2xl font-bold">{billingInfo.amount}</p>
            <div className="text-sm text-gray-400 mt-2">Next billing on {billingInfo.nextBillingDate}</div>
          </div>
          
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm">Active Users</h3>
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">+12%</span>
            </div>
            <p className="text-2xl font-bold">{billingInfo.activeUsers}</p>
            <div className="text-sm text-gray-400 mt-2">{billingInfo.costPerUser} per user</div>
          </div>
          
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm">Current Plan</h3>
              <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">Enterprise</span>
            </div>
            <p className="text-2xl font-bold">Tailored</p>
            <div className="text-sm text-gray-400 mt-2">All features included</div>
          </div>
          
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm">Payment Status</h3>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Active</span>
            </div>
            <p className="text-2xl font-bold">Current</p>
            <div className="text-sm text-gray-400 mt-2">Last payment successful</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#181b24] border border-gray-800 rounded-lg mb-8">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-base">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentTransactions.map((transaction: Transaction, index: number) => (
                  <tr key={index} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4 font-medium">{transaction.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                        transaction.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
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
        <div className="bg-[#181b24] border border-gray-800 rounded-lg">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-base">Payment Method</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between bg-[#050607] border border-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{billingInfo.paymentMethod}</p>
                  <p className="text-sm text-gray-400">Expires 12/24</p>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                onClick={() => setShowCardModal(true)}
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Card Update Modal */}
        {showCardModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#181b24] border border-gray-800 rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-base">Payment Method</h2>
                <button 
                  onClick={() => setShowCardModal(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitCard} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={cardDetails.cardholderName}
                    onChange={handleCardInputChange}
                    className="w-full bg-[#050607] border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-400">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    className="w-full bg-[#050607] border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardInputChange}
                      className="w-full bg-[#050607] border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="block text-sm text-gray-400">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      className="w-full bg-[#050607] border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUpdatingCard}
                  className="w-full bg-green-500/30 text-green-400 hover:bg-green-500/40 hover:text-green-200 rounded-lg px-4 py-2 mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdatingCard ? 'Updating...' : 'Update'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPage;