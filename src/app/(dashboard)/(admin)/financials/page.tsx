'use client'
import React, { useState } from 'react';
import { CreditCard, Download, DollarSign, ArrowUpRight, Clock, AlertTriangle, Filter, Plus, X, ArrowRight, Trash2, MoreVertical, Mail, CheckSquare, Square, ChevronDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface Invoice {
  id: string;
  companyName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issuedDate: string;
  paymentMethod: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  data: Array<{ month: string; value: number }>;
  color: 'green' | 'yellow' | 'red' | 'blue';
  percentageChange: number;
  prefix?: string;
  onClick?: () => void;
}

const FinancialsPage = () => {
  const [showDueInvoices, setShowDueInvoices] = useState(false);
  const [showMetricDetails, setShowMetricDetails] = useState<string | null>(null);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    companyName: '',
    amount: '',
    dueDate: '',
    paymentMethod: 'Credit Card'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: ''
  });
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

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

  const getDueInvoices = () => {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    
    return invoices.filter(invoice => {
      const dueDate = new Date(invoice.dueDate);
      return dueDate >= today && dueDate <= sevenDaysFromNow && invoice.status === 'pending';
    });
  };

  const handleSendReminder = async (invoiceId: string) => {
    // In a real application, this would integrate with your email service
    console.log(`Sending reminder for invoice ${invoiceId}`);
    // Add notification to show success
    alert('Payment reminder sent successfully');
  };

  const handleCreateInvoice = () => {
    const newInvoiceData: Invoice = {
      id: `INV-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      companyName: newInvoice.companyName,
      amount: parseFloat(newInvoice.amount),
      status: 'pending',
      dueDate: newInvoice.dueDate,
      issuedDate: new Date().toISOString().split('T')[0],
      paymentMethod: newInvoice.paymentMethod
    };

    setInvoices([...invoices, newInvoiceData]);
    setShowCreateInvoice(false);
    setNewInvoice({
      companyName: '',
      amount: '',
      dueDate: '',
      paymentMethod: 'Credit Card'
    });
  };

  const getFilteredInvoices = () => {
    return invoices.filter(invoice => {
      // Status filter
      if (filters.status !== 'all' && invoice.status !== filters.status) {
        return false;
      }

      // Payment method filter
      if (filters.paymentMethod !== 'all' && invoice.paymentMethod !== filters.paymentMethod) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const invoiceDate = new Date(invoice.dueDate);
        const today = new Date();
        
        switch (filters.dateRange) {
          case 'thisWeek':
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            if (invoiceDate < weekAgo) return false;
            break;
          case 'thisMonth':
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            if (invoiceDate < monthAgo) return false;
            break;
          case 'thisQuarter':
            const quarterAgo = new Date();
            quarterAgo.setMonth(today.getMonth() - 3);
            if (invoiceDate < quarterAgo) return false;
            break;
        }
      }

      // Amount range filter
      const amount = invoice.amount;
      if (filters.minAmount && amount < parseFloat(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) {
        return false;
      }

      return true;
    });
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === getFilteredInvoices().length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(getFilteredInvoices().map(invoice => invoice.id));
    }
  };

  const handleSelectInvoice = (invoiceId: string) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    }
  };

  const handleBulkDelete = async () => {
    setInvoices(invoices.filter(invoice => !selectedInvoices.includes(invoice.id)));
    setSelectedInvoices([]);
    setShowBulkActions(false);
  };

  const handleBulkDownload = () => {
    // In a real application, this would generate PDFs and trigger downloads
    selectedInvoices.forEach(id => {
      const invoice = invoices.find(inv => inv.id === id);
      console.log(`Downloading invoice ${invoice?.id}`);
    });
    alert('Downloads started');
  };

  const handleBulkReminders = async () => {
    // In a real application, this would send actual email reminders
    selectedInvoices.forEach(id => {
      handleSendReminder(id);
    });
    setSelectedInvoices([]);
    setShowBulkActions(false);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    setShowDeleteConfirm(null);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real application, this would generate a PDF and trigger download
    console.log(`Downloading invoice ${invoiceId}`);
    alert('Download started');
  };

  const StatCard = ({ title, value, trend, data, color, percentageChange, prefix = '', onClick }: StatCardProps) => (
    <div 
      className={`bg-[#181b24] border border-gray-800 rounded-lg p-6 ${onClick ? 'cursor-pointer hover:bg-[#1e2230] transition-colors' : ''}`}
      onClick={onClick}
    >
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

  const getStatusBadge = (status: 'paid' | 'pending' | 'overdue') => {
    const styles = {
      paid: 'bg-green-500/20 text-green-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
      overdue: 'bg-red-500/20 text-red-400'
    };
    return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{status}</span>;
  };

  const dueInvoicesDialog = showDueInvoices && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Invoices Due Within 7 Days</h3>
          <button 
            onClick={() => setShowDueInvoices(false)}
            className="text-gray-400 hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {getDueInvoices().map(invoice => (
            <div key={invoice.id} className="bg-[#181b24] border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-white">{invoice.companyName}</p>
                  <p className="text-xs text-gray-400">Due: {invoice.dueDate}</p>
                  <p className="text-sm font-medium text-white mt-1">${invoice.amount.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleSendReminder(invoice.id)}
                  className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 px-3 py-1.5 rounded text-sm"
                >
                  Send Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const createInvoiceDialog = showCreateInvoice && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Create New Invoice</h3>
          <button 
            onClick={() => setShowCreateInvoice(false)}
            className="text-gray-400 hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Company Name</label>
            <input
              type="text"
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newInvoice.companyName}
              onChange={(e) => setNewInvoice({ ...newInvoice, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount</label>
            <input
              type="number"
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newInvoice.amount}
              onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Due Date</label>
            <input
              type="date"
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newInvoice.dueDate}
              onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
            <select
              className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
              value={newInvoice.paymentMethod}
              onChange={(e) => setNewInvoice({ ...newInvoice, paymentMethod: e.target.value })}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
              onClick={() => setShowCreateInvoice(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/50"
              onClick={handleCreateInvoice}
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-hidden bg-[#050607]">
      <div className="h-full overflow-y-auto">
        <div className="p-2 px-10">
          <div className="flex justify-between items-center mb-7 mt-1">
            <h1 className="text-xl font-base text-white">Financials</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCreateInvoice(true)}
                className="bg-green-500/30 text-green-400 hover:bg-green-500/50 hover:text-green-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
              >
                <Plus size={20} className="mr-2" />
                Create Invoice
              </button>
              <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
                <CreditCard size={20} className="mr-2" />
                Payment Methods
              </button>
              <button className="bg-gray-500/30 text-gray-400 hover:bg-gray-500/50 hover:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
                <Download size={20} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Monthly Revenue"
              value="8.000.000"
              trend="vs last month"
              data={revenueData}
              color="green"
              percentageChange={12}
              prefix="$"
              onClick={() => setShowMetricDetails('revenue')}
            />
            
            <StatCard
              title="Outstanding Balance"
              value="12,500"
              trend="across 3 clients"
              data={overdueData}
              color="yellow"
              percentageChange={-8}
              prefix="$"
              onClick={() => setShowMetricDetails('outstanding')}
            />
            
            <StatCard
              title="Overdue Invoices"
              value="2"
              trend="requiring attention"
              data={overdueData}
              color="red"
              percentageChange={-25}
              onClick={() => setShowMetricDetails('overdue')}
            />
          </div>

          {/* Alerts Section */}
          <div 
            className="bg-yellow-500/10 border-white/[0.06] border rounded-lg p-4 mb-8 cursor-pointer hover:bg-yellow-500/20 transition-colors"
            onClick={() => setShowDueInvoices(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="text-yellow-500 mr-3" size={24} />
                <div>
                  <h3 className="text-yellow-500 font-medium">Payment Alerts</h3>
                  <p className="text-yellow-500/80 text-sm">{getDueInvoices().length} invoices are due within the next 7 days</p>
                </div>
              </div>
              <button className="text-yellow-500/80 hover:text-yellow-400">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-gray-800 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-medium">Recent Invoices</h2>
                  {selectedInvoices.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        {selectedInvoices.length} selected
                      </span>
                      <div className="relative">
                        <button
                          className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 px-3 py-1.5 rounded text-sm flex items-center"
                          onClick={() => setShowBulkActions(!showBulkActions)}
                        >
                          Bulk Actions
                          <ChevronDown size={16} className="ml-2" />
                        </button>
                        {showBulkActions && (
                          <div className="absolute left-0 mt-2 w-48 bg-[#050607] border border-gray-800 rounded-lg shadow-lg z-10">
                            <div className="py-1">
                              <button
                                className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center"
                                onClick={handleBulkDownload}
                              >
                                <Download size={16} className="mr-2" />
                                Download Selected
                              </button>
                              <button
                                className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center"
                                onClick={handleBulkReminders}
                              >
                                <Mail size={16} className="mr-2" />
                                Send Reminders
                              </button>
                              <button
                                className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center"
                                onClick={handleBulkDelete}
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete Selected
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  className={`text-gray-400 hover:text-gray-300 transition-colors ${showFilters ? 'text-blue-400' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={20} />
                </button>
              </div>
              
              {/* Inline Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Status</label>
                      <select
                        className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      >
                        <option value="all">All Statuses</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
                      <select
                        className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                        value={filters.paymentMethod}
                        onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
                      >
                        <option value="all">All Methods</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="PayPal">PayPal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                      <select
                        className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                        value={filters.dateRange}
                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      >
                        <option value="all">All Time</option>
                        <option value="thisWeek">This Week</option>
                        <option value="thisMonth">This Month</option>
                        <option value="thisQuarter">This Quarter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Amount Range</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                          value={filters.minAmount}
                          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="bg-[#181b24] border border-gray-800 text-white px-3 py-2 rounded-lg w-full"
                          value={filters.maxAmount}
                          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      className="text-gray-400 hover:text-gray-300 text-sm"
                      onClick={() => {
                        setFilters({
                          status: 'all',
                          paymentMethod: 'all',
                          dateRange: 'all',
                          minAmount: '',
                          maxAmount: ''
                        });
                      }}
                    >
                      Reset Filters
                    </button>
                    <button
                      className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 px-3 py-1.5 rounded text-sm"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-gray-800 border-b">
                  <th className="px-6 py-4 text-left">
                    <button
                      className="text-gray-400 hover:text-gray-300"
                      onClick={handleSelectAll}
                    >
                      {selectedInvoices.length === getFilteredInvoices().length ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {getFilteredInvoices().map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-900/50 transition-colors group">
                    <td className="px-6 py-4">
                      <button
                        className="text-gray-400 hover:text-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectInvoice(invoice.id);
                        }}
                      >
                        {selectedInvoices.includes(invoice.id) ? (
                          <CheckSquare size={20} />
                        ) : (
                          <Square size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/financials/${invoice.id}`} className="block">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{invoice.id}</div>
                            <div className="text-sm text-gray-400">{invoice.companyName}</div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/financials/${invoice.id}`} className="block">
                        <div className="text-sm text-gray-300">${invoice.amount.toLocaleString()}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/financials/${invoice.id}`} className="block">
                        {getStatusBadge(invoice.status)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/financials/${invoice.id}`} className="block">
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-300">{invoice.dueDate}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/financials/${invoice.id}`} className="block">
                        <div className="text-sm text-gray-300">{invoice.paymentMethod}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-3">
                        <button 
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadInvoice(invoice.id);
                          }}
                          title="Download Invoice"
                        >
                          <Download size={20} />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-yellow-400 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendReminder(invoice.id);
                          }}
                          title="Send Reminder"
                        >
                          <Mail size={20} />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(invoice.id);
                          }}
                          title="Delete Invoice"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {getFilteredInvoices().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No invoices match the selected filters
              </div>
            )}
          </div>
        </div>
      </div>
      {dueInvoicesDialog}
      {createInvoiceDialog}

      {/* Delete Confirmation Dialog */}
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
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500/30 text-red-400 rounded-lg hover:bg-red-500/50"
                onClick={() => handleDeleteInvoice(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialsPage;