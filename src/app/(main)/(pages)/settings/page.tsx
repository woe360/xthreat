// 'use client'
// import React, { useState } from 'react'
// import { Lock, Shield, Settings as SettingsIcon, ChevronLeft, Eye, EyeOff } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const SettingsPage = () => {
//   const router = useRouter()

//   const [settings, setSettings] = useState({
//     twoFactorAuth: false,
//     darkMode: true,
//     language: 'English',
//   })

//   const [showPassword, setShowPassword] = useState(false)

//   const handleSettingChange = (setting, value) => {
//     setSettings(prevSettings => ({
//       ...prevSettings,
//       [setting]: value
//     }))
//   }

//   return (
//     <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
//       <div className="max-w-3xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-6 sm:mb-8">
//           <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition flex items-center">
//             <ChevronLeft/> Back
//           </button>
//         </div>

//         <h1 className="text-3xl font-bold mb-8">Settings</h1>

//         <div className="p-6 rounded-lg mb-8" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <Lock className="mr-2" size={24} />
//             Change Password
//           </h2>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Current Password:</label>
//               <div className="w-2/3 relative">
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   className="w-full bg-gray-700 text-white p-2 rounded"
//                 />
//                 <button 
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <label className="w-1/3 text-sm font-medium text-gray-400">New Password:</label>
//               <input type="password" className="w-2/3 bg-gray-700 text-white p-2 rounded" />
//             </div>
//             <div className="flex items-center">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Confirm New Password:</label>
//               <input type="password" className="w-2/3 bg-gray-700 text-white p-2 rounded" />
//             </div>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//               Change Password
//             </button>
//           </div>
//         </div>

//         <div className="p-6 rounded-lg mb-8" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <Shield className="mr-2" size={24} />
//             Security Settings
//           </h2>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <label className="w-2/3 text-sm font-medium text-gray-400">Two-Factor Authentication:</label>
//               <div className="w-1/3">
//                 <input 
//                   type="checkbox" 
//                   checked={settings.twoFactorAuth} 
//                   onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)} 
//                   className="mr-2"
//                 />
//                 <span>{settings.twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 rounded-lg" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <SettingsIcon className="mr-2" size={24} />
//             General Settings
//           </h2>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Dark Mode:</label>
//               <div className="w-2/3">
//                 <input 
//                   type="checkbox" 
//                   checked={settings.darkMode} 
//                   onChange={(e) => handleSettingChange('darkMode', e.target.checked)} 
//                   className="mr-2"
//                 />
//                 <span>{settings.darkMode ? 'Enabled' : 'Disabled'}</span>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Language:</label>
//               <select 
//                 value={settings.language} 
//                 onChange={(e) => handleSettingChange('language', e.target.value)}
//                 className="w-2/3 bg-gray-700 text-white p-2 rounded"
//               >
//                 <option value="English">English</option>
//                 <option value="Spanish">Spanish</option>
//                 <option value="French">French</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SettingsPage


'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Settings, BarChart, Shield, ChevronLeft, Bell } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const AdminSettingsPage = () => {
  const router = useRouter()

  const [settings, setSettings] = useState({
    userManagement: {
      enableUserRegistration: true,
      defaultUserRole: 'user',
    },
    systemSettings: {
      maintenanceMode: false,
      debugMode: false,
    },
    analytics: {
      trackUserBehavior: true,
      dataRetentionPeriod: '30days',
    },
    notifications: {
      emailAlerts: true,
      slackIntegration: false,
    }
  })

  useEffect(() => {
    // Load saved settings from localStorage (replace with API call in production)
    const savedSettings = localStorage.getItem('adminSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (category, setting, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    }
    setSettings(newSettings)
    // Save to localStorage (replace with API call in production)
    localStorage.setItem('adminSettings', JSON.stringify(newSettings))
  }

  return (
    <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white relative">
      <div className="max-w-3xl mx-auto p-3">
      {/* <button 
      onClick={() => router.back()} 
      className="absolute mt-3 left-5 text-gray-400 hover:text-white transition flex items-center"
    >
      <ChevronLeft className="mr-1"/> Back
    </button> */}

        <h1 className="text-3xl mt-6 font-bold mb-8">Admin Settings</h1>

        {/* User Management Settings */}
        <div className="mb-8 p-6 rounded-lg" style={componentStyle}>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Users className="mr-2" size={24} />
            User Management
          </h2>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-registration" className="text-white">Enable User Registration</Label>
              <Switch 
                id="enable-registration"
                checked={settings.userManagement.enableUserRegistration}
                onCheckedChange={(checked) => handleSettingChange('userManagement', 'enableUserRegistration', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="default-role" className="text-white">Default User Role</Label>
              <Select 
                value={settings.userManagement.defaultUserRole} 
                onValueChange={(value) => handleSettingChange('userManagement', 'defaultUserRole', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </div>

        {/* System Settings */}
        <div className="mb-8 p-6 rounded-lg" style={componentStyle}>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Settings className="mr-2" size={24} />
            System Settings
          </h2>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode" className="text-white">Maintenance Mode</Label>
              <Switch 
                id="maintenance-mode"
                checked={settings.systemSettings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('systemSettings', 'maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="debug-mode" className="text-white">Debug Mode</Label>
              <Switch 
                id="debug-mode"
                checked={settings.systemSettings.debugMode}
                onCheckedChange={(checked) => handleSettingChange('systemSettings', 'debugMode', checked)}
              />
            </div>
          </CardContent>
        </div>

        {/* Analytics Settings */}
        <div className="mb-8 p-6 rounded-lg" style={componentStyle}>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <BarChart className="mr-2" size={24} />
            Analytics
          </h2>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="track-user-behavior" className="text-white">Track User Behavior</Label>
              <Switch 
                id="track-user-behavior"
                checked={settings.analytics.trackUserBehavior}
                onCheckedChange={(checked) => handleSettingChange('analytics', 'trackUserBehavior', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-retention" className="text-white">Data Retention Period</Label>
              <Select 
                value={settings.analytics.dataRetentionPeriod} 
                onValueChange={(value) => handleSettingChange('analytics', 'dataRetentionPeriod', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="60days">60 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </div>

        {/* Notification Settings */}
        <div className="p-6 rounded-lg" style={componentStyle}>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Bell className="mr-2" size={24} />
            Notifications
          </h2>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts" className="text-white">Email Alerts</Label>
              <Switch 
                id="email-alerts"
                checked={settings.notifications.emailAlerts}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="slack-integration" className="text-white">Slack Integration</Label>
              <Switch 
                id="slack-integration"
                checked={settings.notifications.slackIntegration}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'slackIntegration', checked)}
              />
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsPage

// 'use client'
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };

// const Settings = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Form submitted');
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <h1 className="text-3xl font-bold mb-6">Settings</h1>
//       <div className="max-w-md space-y-6">
//         <Card className="w-full" style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="text-white">Profile Information</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-white">Name</Label>
//                 <Input id="name" placeholder="Enter your name" className="bg-gray-800 text-white" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="surname" className="text-white">Surname</Label>
//                 <Input id="surname" placeholder="Enter your surname" className="bg-gray-800 text-white" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="position" className="text-white">Company Position/Role</Label>
//                 <Input id="position" placeholder="Enter your position or role" className="bg-gray-800 text-white" />
//               </div>
//               <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Save Changes</Button>
//             </form>
//           </CardContent>
//         </Card>

//         <Card className="w-full" style={componentStyle}>
//           <CardHeader>
//             <CardTitle className="text-white">Notification Preferences</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
//               <Switch id="email-notifications" />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
//               <Switch id="push-notifications" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Settings;