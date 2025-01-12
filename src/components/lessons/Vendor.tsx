import React, { useState } from 'react';
import type { NextPage } from 'next';
import { 
  Building2, 
  AlertTriangle, 
  Shield,
  CheckCircle,
  XCircle,
  Truck,
  FileText,
  DollarSign,
  Package,
  ArrowRight,
  Clock,
  Eye,
  Lock,
  Search,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PortalNotification {
  id: string;
  type: 'order' | 'shipping' | 'invoice' | 'system';
  title: string;
  content: string;
  timestamp: string;
  sender: string;
  urgencyLevel: 'high' | 'medium' | 'low';
  suspicious: boolean;
  suspiciousReason?: string;
  documentLink?: string;
  orderNumber?: string;
  requiredAction: string;
}

const portalNotifications: PortalNotification[] = [
  {
    id: 'ship-1',
    type: 'shipping',
    title: 'Urgent: Shipping Address Update Required',
    content: 'Please update shipping details for order #45789 using the secure form below. Click to verify new address.',
    timestamp: '09:45 AM',
    sender: 'shipping@vendor-portal-update.com',
    urgencyLevel: 'high',
    suspicious: true,
    suspiciousReason: 'Unusual domain and urgent address change request',
    documentLink: 'shipping_update_form.html',
    orderNumber: '45789',
    requiredAction: 'Update shipping address'
  },
  {
    id: 'ord-2',
    type: 'order',
    title: 'Purchase Order Modification Notice',
    content: 'Order quantity has been updated. Please review and confirm changes within 2 hours to maintain delivery schedule.',
    timestamp: '10:15 AM',
    sender: 'orders@legitvendor.com',
    urgencyLevel: 'high',
    suspicious: true,
    suspiciousReason: 'Time pressure and unusual modification request',
    documentLink: 'PO_45789_update.pdf',
    orderNumber: '45789',
    requiredAction: 'Confirm order changes'
  }
];

const VendorPortalSimulator: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<'notifications' | 'orders' | 'documents'>('notifications');
  const [selectedNotification, setSelectedNotification] = useState<PortalNotification | null>(null);
  const [flaggedNotifications, setFlaggedNotifications] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleNotificationFlag = (notification: PortalNotification) => {
    if (!flaggedNotifications.includes(notification.id)) {
      setFlaggedNotifications([...flaggedNotifications, notification.id]);
      if (notification.suspicious) {
        setScore(score + 10);
      } else {
        setScore(score - 5);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold">Vendor Portal Simulator</h1>
            <p className="text-sm text-gray-400">Supply Chain Security Training</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-xl font-bold">{score}</span>
          </div>
        </div>
      </div>

      {/* Portal Navigation */}
      <div className="flex gap-2 border-b border-gray-700">
        {(['notifications', 'orders', 'documents'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-2 font-medium transition-colors ${
              currentTab === tab 
                ? 'border-b-2 border-blue-500 text-blue-400' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications View */}
      <div className="grid gap-4">
        {portalNotifications.map((notification) => (
          <div 
            key={notification.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'shipping' ? 'bg-purple-900 text-purple-400' :
                  notification.type === 'order' ? 'bg-blue-900 text-blue-400' :
                  notification.type === 'invoice' ? 'bg-green-900 text-green-400' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {notification.type === 'shipping' ? <Truck className="w-5 h-5" /> :
                   notification.type === 'order' ? <Package className="w-5 h-5" /> :
                   notification.type === 'invoice' ? <DollarSign className="w-5 h-5" /> :
                   <AlertCircle className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{notification.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {notification.timestamp}
                    </span>
                    {notification.orderNumber && (
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Order #{notification.orderNumber}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleNotificationFlag(notification)}
                  className={`p-2 rounded-lg transition-colors ${
                    flaggedNotifications.includes(notification.id)
                      ? 'bg-red-900 text-red-400'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400"
                  onClick={() => setSelectedNotification(notification)}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {selectedNotification?.id === notification.id && (
              <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h4 className="font-medium mb-2">Security Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>Sender Domain: </span>
                    <code className="px-2 py-1 bg-gray-800 rounded">{notification.sender}</code>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span>Required Action: </span>
                    <span className="text-yellow-400">{notification.requiredAction}</span>
                  </div>
                  {notification.documentLink && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>Linked Document: </span>
                      <code className="px-2 py-1 bg-gray-800 rounded">{notification.documentLink}</code>
                    </div>
                  )}
                </div>
              </div>
            )}

            {flaggedNotifications.includes(notification.id) && notification.suspicious && (
              <Alert className="mt-4 bg-green-900 border-green-800">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <AlertDescription className="text-green-100">
                  Good catch! {notification.suspiciousReason}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ))}
      </div>

      {/* Training Tips */}
      <Alert className="bg-blue-900/50 border-blue-800">
        <Eye className="w-4 h-4 text-blue-400" />
        <AlertDescription className="text-blue-100">
          Look for unusual domain names, urgent requests for information updates, 
          and suspicious document links. Always verify major changes through established channels.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default VendorPortalSimulator;