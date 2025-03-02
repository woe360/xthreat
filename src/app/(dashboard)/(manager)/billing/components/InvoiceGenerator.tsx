// import React from 'react';  


// import { format } from 'date-fns';

// // Types and Interfaces
// interface BillingInfo {
//   currentPlan: 'Basic' | 'Professional' | 'Enterprise';
//   nextBillingDate: string;
//   amount: string;
//   paymentMethod: string;
//   activeUsers: number;
//   costPerUser: string;
// }

// interface Transaction {
//   date: string;
//   amount: string;
//   status: 'Paid' | 'Pending' | 'Failed';
// }

// interface InvoiceData {
//   companyName: string;
//   companyAddress: string;
//   companyCity: string;
//   companyZip: string;
//   customerName: string;
// }

// // Default invoice data (you can modify this or pass it as a prop)
// const defaultInvoiceData: InvoiceData = {
//   companyName: "Your Company Name",
//   companyAddress: "123 Business Street",
//   companyCity: "Business City",
//   companyZip: "BS 12345",
//   customerName: "Customer Name"
// };

// // Utility function to generate invoice number
// const generateInvoiceNumber = (date: string, index: number): string => {
//   const year = new Date(date).getFullYear();
//   const month = new Date(date).getMonth() + 1;
//   return `INV-${year}${month.toString().padStart(2, '0')}${(index + 1).toString().padStart(3, '0')}`;
// };

// // Utility function to convert invoice data to blob
// const generateInvoiceHTML = (
//   transaction: Transaction, 
//   billingInfo: BillingInfo, 
//   invoiceData: InvoiceData = defaultInvoiceData
// ): string => {
//   const invoiceNumber = generateInvoiceNumber(transaction.date, 0);
//   const invoiceDate = format(new Date(transaction.date), 'MMMM dd, yyyy');
  
//   return `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Invoice ${invoiceNumber}</title>
//         <style>
//           body { 
//             font-family: Arial, sans-serif; 
//             margin: 0; 
//             padding: 40px;
//             color: #333;
//           }
//           .invoice-header { 
//             display: flex; 
//             justify-content: space-between; 
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 1px solid #eee;
//           }
//           .invoice-details { 
//             margin-bottom: 40px; 
//           }
//           .table { 
//             width: 100%; 
//             border-collapse: collapse; 
//             margin-bottom: 40px; 
//           }
//           .table th { 
//             background-color: #f8f9fa;
//             font-weight: 600;
//           }
//           .table th, .table td { 
//             padding: 12px; 
//             text-align: left; 
//             border-bottom: 1px solid #eee; 
//           }
//           .total { 
//             text-align: right;
//             padding: 20px;
//             background-color: #f8f9fa;
//             border-radius: 4px;
//           }
//           .total h3 {
//             margin: 0;
//             color: #2563eb;
//           }
//           .meta-data {
//             color: #666;
//             font-size: 0.9em;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-header">
//           <div>
//             <h1 style="color: #2563eb; margin: 0;">INVOICE</h1>
//             <p class="meta-data">Invoice Number: ${invoiceNumber}</p>
//             <p class="meta-data">Date: ${invoiceDate}</p>
//           </div>
//           <div style="text-align: right;">
//             <h2>${invoiceData.companyName}</h2>
//             <p class="meta-data">${invoiceData.companyAddress}</p>
//             <p class="meta-data">${invoiceData.companyCity}, ${invoiceData.companyZip}</p>
//           </div>
//         </div>
        
//         <div class="invoice-details">
//           <h3>Bill To:</h3>
//           <p>${invoiceData.customerName}</p>
//           <p class="meta-data">Plan: ${billingInfo.currentPlan}</p>
//           <p class="meta-data">Active Users: ${billingInfo.activeUsers}</p>
//         </div>
        
//         <table class="table">
//           <thead>
//             <tr>
//               <th>Description</th>
//               <th>Quantity</th>
//               <th>Rate</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>${billingInfo.currentPlan} Plan - Monthly Subscription</td>
//               <td>${billingInfo.activeUsers} users</td>
//               <td>${billingInfo.costPerUser}/user</td>
//               <td>${transaction.amount}</td>
//             </tr>
//           </tbody>
//         </table>
        
//         <div class="total">
//           <h3>Total: ${transaction.amount}</h3>
//         </div>
        
//         <div style="margin-top: 40px; text-align: center;">
//           <p class="meta-data">Thank you for your business!</p>
//         </div>
//       </body>
//     </html>
//   `;
// };

// export const downloadInvoice = (
//   transaction: Transaction, 
//   billingInfo: BillingInfo, 
//   invoiceData?: InvoiceData
// ): void => {
//   // Generate the invoice HTML
//   const invoiceHTML = generateInvoiceHTML(transaction, billingInfo, invoiceData);
  
//   // Create a blob from the HTML
//   const blob = new Blob([invoiceHTML], { type: 'text/html' });
  
//   // Create a URL for the blob
//   const url = window.URL.createObjectURL(blob);
  
//   // Create a temporary link element
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `invoice-${transaction.date.replace(/\s+/g, '-')}.html`;
  
//   // Append link to body, click it, and remove it
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
  
//   // Clean up the URL
//   window.URL.revokeObjectURL(url);
// };

import React from 'react';
import { format } from 'date-fns';

// Types and Interfaces remain the same
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

interface InvoiceData {
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyZip: string;
  customerName: string;
}

const defaultInvoiceData: InvoiceData = {
  companyName: "Xthreat",
  companyAddress: "Bravo Murillo 152",
  companyCity: "Madrid",
  companyZip: "28020",
  customerName: "Customer Name"
};

const generateInvoiceNumber = (date: string, index: number): string => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  return `INV-${year}${month.toString().padStart(2, '0')}${(index + 1).toString().padStart(3, '0')}`;
};

const generateInvoiceHTML = (
  transaction: Transaction, 
  billingInfo: BillingInfo, 
  invoiceData: InvoiceData = defaultInvoiceData
): string => {
  const invoiceNumber = generateInvoiceNumber(transaction.date, 0);
  const invoiceDate = format(new Date(transaction.date), 'MMMM dd, yyyy');
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 40px;
            background-color: #050607;
            color: #e5e7eb;
          }
          .invoice-header { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #1f2937;
          }
          .invoice-details { 
            margin-bottom: 40px; 
            padding: 20px;
            background-color: rgba(31, 41, 55, 0.4);
            border-radius: 8px;
          }
          .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 40px;
            border-radius: 8px;
            overflow: hidden;
          }
          .table th { 
            background-color: rgba(31, 41, 55, 0.6);
            font-weight: 600;
            color: #60a5fa;
          }
          .table th, .table td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #1f2937; 
          }
          .table tr {
            background-color: rgba(31, 41, 55, 0.3);
          }
          .table tr:hover {
            background-color: rgba(31, 41, 55, 0.5);
          }
          .total { 
            text-align: right;
            padding: 20px;
            background-color: rgba(31, 41, 55, 0.4);
            border-radius: 8px;
            margin-top: 20px;
          }
          .total h3 {
            margin: 0;
            color: #60a5fa;
          }
          .meta-data {
            color: #9ca3af;
            font-size: 0.9em;
          }
          .accent {
            color: #60a5fa;
          }
          .card {
            background-color: rgba(31, 41, 55, 0.4);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div>
            <h1 class="accent" style="margin: 0; font-size: 2.5em;">INVOICE</h1>
            <p class="meta-data">Invoice Number: ${invoiceNumber}</p>
            <p class="meta-data">Date: ${invoiceDate}</p>
          </div>
          <div class="card">
            <h2 class="accent">${invoiceData.companyName}</h2>
            <p class="meta-data">${invoiceData.companyAddress}</p>
            <p class="meta-data">${invoiceData.companyCity}, ${invoiceData.companyZip}</p>
          </div>
        </div>
        
        <div class="invoice-details">
          <h3 class="accent">Bill To:</h3>
          <p>${invoiceData.customerName}</p>
          <p class="meta-data">Plan: ${billingInfo.currentPlan}</p>
          <p class="meta-data">Active Users: ${billingInfo.activeUsers}</p>
        </div>
        
        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${billingInfo.currentPlan} Plan - Monthly Subscription</td>
              <td>${billingInfo.activeUsers} users</td>
              <td>${billingInfo.costPerUser}/user</td>
              <td class="accent">${transaction.amount}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="total">
          <h3>Total: ${transaction.amount}</h3>
        </div>
        
        <div style="margin-top: 40px; text-align: center;">
          <p class="meta-data">Thank you for your business!</p>
        </div>
      </body>
    </html>
  `;
};

export const downloadInvoice = (
  transaction: Transaction, 
  billingInfo: BillingInfo, 
  invoiceData?: InvoiceData
): void => {
  const invoiceHTML = generateInvoiceHTML(transaction, billingInfo, invoiceData);
  const blob = new Blob([invoiceHTML], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${transaction.date.replace(/\s+/g, '-')}.html`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  window.URL.revokeObjectURL(url);
};