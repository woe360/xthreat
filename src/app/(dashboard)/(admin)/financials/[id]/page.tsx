'use client'

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Download, Mail, Trash2, Clock, CreditCard, Building2, Calendar, AlertTriangle, Package, Receipt } from 'lucide-react';
import { useState } from 'react';

interface InvoiceDetails {
  id: string;
  companyName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issuedDate: string;
  paymentMethod: string;
  // Additional fields we might want to show in the details view
  billingAddress?: string;
  notes?: string;
  lastReminder?: string;
  reminderCount?: number;
  plan: {
    name: string;
    price: number;
    billingCycle: 'monthly' | 'annual';
    startDate: string;
    features: string[];
  };
}

export default function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const resolvedParams = use(params);
  
  // In a real app, this would fetch from your API/database
  const [invoice, setInvoice] = useState<InvoiceDetails>({
    id: resolvedParams.id,
    companyName: "TechCorp Solutions",
    amount: 2500,
    status: 'pending',
    dueDate: "2024-11-30",
    issuedDate: "2024-11-01",
    paymentMethod: "Credit Card",
    billingAddress: "123 Tech Street, Silicon Valley, CA 94025",
    notes: "Annual subscription renewal",
    lastReminder: "2024-11-15",
    reminderCount: 1,
    plan: {
      name: "Enterprise Plan",
      price: 2500,
      billingCycle: 'annual',
      startDate: "2023-11-01",
      features: [
        "Unlimited Users",
        "24/7 Support",
        "Custom Integrations",
        "Advanced Analytics"
      ]
    }
  });

  // Sample previous invoices data
  const previousInvoices = [
    {
      id: "INV-2023-156",
      amount: 2500,
      status: 'paid',
      dueDate: "2023-11-30",
      issuedDate: "2023-11-01",
      paymentMethod: "Credit Card"
    },
    {
      id: "INV-2023-089",
      amount: 2500,
      status: 'paid',
      dueDate: "2023-05-30",
      issuedDate: "2023-05-01",
      paymentMethod: "Credit Card"
    }
  ];

  const handleSendReminder = async () => {
    // In a real application, this would integrate with your email service
    console.log(`Sending reminder for invoice ${invoice.id}`);
    alert('Payment reminder sent successfully');
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF and trigger download
    console.log(`Downloading invoice ${invoice.id}`);
    alert('Download started');
  };

  const handleDelete = () => {
    // In a real application, this would call your API
    console.log(`Deleting invoice ${invoice.id}`);
    router.push('/financials');
  };

  const getStatusColor = (status: 'paid' | 'pending' | 'overdue') => {
    const colors = {
      paid: 'bg-green-500/20 text-green-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      overdue: 'bg-red-500/20 text-red-400'
    };
    return colors[status];
  };

  return (
    <div className="h-screen overflow-hidden bg-[#050607]">
      <div className="h-full overflow-y-auto">
        <div className="p-2 px-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-7 mt-1">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/financials')}
                className="text-gray-400 hover:text-gray-300 mr-4"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h1 className="text-xl font-base text-white">Invoice {invoice.id}</h1>
                <p className="text-gray-400">{invoice.companyName}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDownload}
                className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Download size={20} className="mr-2" />
                Download Invoice
              </button>
              <button
                onClick={handleSendReminder}
                className="bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/50 hover:text-yellow-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Mail size={20} className="mr-2" />
                Send Reminder
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500/30 text-red-400 hover:bg-red-500/50 hover:text-red-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Trash2 size={20} className="mr-2" />
                Delete Invoice
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Amount</p>
                <CreditCard size={20} className="text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-white">${invoice.amount.toLocaleString()}</p>
            </div>
            
            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Status</p>
                <AlertTriangle size={20} className="text-gray-400" />
              </div>
              <span className={`${getStatusColor(invoice.status)} text-sm px-2 py-1 rounded`}>
                {invoice.status}
              </span>
            </div>

            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Due Date</p>
                <Calendar size={20} className="text-gray-400" />
              </div>
              <p className="text-white">{invoice.dueDate}</p>
            </div>

            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Plan</p>
                <Package size={20} className="text-gray-400" />
              </div>
              <p className="text-white">{invoice.plan.name}</p>
              <p className="text-sm text-gray-400">{invoice.plan.billingCycle} billing</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Invoice Details */}
            <div className="col-span-2 space-y-6">
              {/* Details Card */}
              <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Invoice Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Company</p>
                      <p className="text-white">{invoice.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                      <p className="text-white">{invoice.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Issue Date</p>
                      <p className="text-white">{invoice.issuedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Due Date</p>
                      <p className="text-white">{invoice.dueDate}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Billing Address</p>
                    <p className="text-white">{invoice.billingAddress}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Notes</p>
                    <p className="text-white">{invoice.notes}</p>
                  </div>
                </div>
              </div>

              {/* Plan Details */}
              <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Plan Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Plan Name</p>
                      <p className="text-white">{invoice.plan.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Billing Cycle</p>
                      <p className="text-white capitalize">{invoice.plan.billingCycle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Price</p>
                      <p className="text-white">${invoice.plan.price.toLocaleString()}/year</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Start Date</p>
                      <p className="text-white">{invoice.plan.startDate}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">Features Included</p>
                    <div className="grid grid-cols-2 gap-2">
                      {invoice.plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-white text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Reminder History */}
              <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Reminder History</h2>
                {invoice.reminderCount && invoice.reminderCount > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-gray-400">Last reminder sent:</p>
                      <p className="text-white">{invoice.lastReminder}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-400">Total reminders sent:</p>
                      <p className="text-white">{invoice.reminderCount}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No reminders sent yet</p>
                )}
              </div>

              {/* Payment History */}
              <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Payment History</h2>
                <div className="text-gray-400 text-sm">
                  No payments recorded yet.
                </div>
              </div>

              {/* Previous Invoices */}
              <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">Previous Invoices</h2>
                  <Receipt size={20} className="text-gray-400" />
                </div>
                <div className="space-y-4">
                  {previousInvoices.length > 0 ? (
                    <div className="divide-y divide-gray-800">
                      {previousInvoices.map((prevInvoice) => (
                        <div key={prevInvoice.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-3">
                                <p className="text-sm font-medium text-white">{prevInvoice.id}</p>
                                <span className={`${getStatusColor(prevInvoice.status as 'paid' | 'pending' | 'overdue')} text-xs px-2 py-0.5 rounded`}>
                                  {prevInvoice.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mt-1">Issued: {prevInvoice.issuedDate}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="text-sm font-medium text-white">${prevInvoice.amount.toLocaleString()}</p>
                              <button
                                onClick={() => handleDownload()}
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                title="Download Invoice"
                              >
                                <Download size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No previous invoices found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Delete Invoice</h3>
            <p className="text-gray-400 mb-4">
              Are you sure you want to delete this invoice? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-400 hover:text-gray-300"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500/30 text-red-400 rounded-lg hover:bg-red-500/50"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 