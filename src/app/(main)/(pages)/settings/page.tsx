// 'use client'
// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Users, Settings, BarChart, Shield, ChevronLeft, Bell } from 'lucide-react'
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const AdminSettingsPage = () => {
//   const router = useRouter()

//   const [settings, setSettings] = useState({
//     userManagement: {
//       enableUserRegistration: true,
//       defaultUserRole: 'user',
//     },
//     systemSettings: {
//       maintenanceMode: false,
//       debugMode: false,
//     },
//     analytics: {
//       trackUserBehavior: true,
//       dataRetentionPeriod: '30days',
//     },
//     notifications: {
//       emailAlerts: true,
//       slackIntegration: false,
//     }
//   })

//   useEffect(() => {
//     // Load saved settings from localStorage (replace with API call in production)
//     const savedSettings = localStorage.getItem('adminSettings')
//     if (savedSettings) {
//       setSettings(JSON.parse(savedSettings))
//     }
//   }, [])

//   const handleSettingChange = (category, setting, value) => {
//     const newSettings = {
//       ...settings,
//       [category]: {
//         ...settings[category],
//         [setting]: value
//       }
//     }
//     setSettings(newSettings)
//     // Save to localStorage (replace with API call in production)
//     localStorage.setItem('adminSettings', JSON.stringify(newSettings))
//   }

//   return (
//     <div className="min-h-screen font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white relative">
//       <div className="max-w-3xl mx-auto p-3">
//       {/* <button 
//       onClick={() => router.back()} 
//       className="absolute mt-3 left-5 text-gray-400 hover:text-white transition flex items-center"
//     >
//       <ChevronLeft className="mr-1"/> Back
//     </button> */}

//         <h1 className="text-3xl mt-6 font-bold mb-8">Admin Settings</h1>

//         {/* User Management Settings */}
//         <div className="mb-8 p-6 rounded-lg" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <Users className="mr-2" size={24} />
//             User Management
//           </h2>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="enable-registration" className="text-white">Enable User Registration</Label>
//               <Switch 
//                 id="enable-registration"
//                 checked={settings.userManagement.enableUserRegistration}
//                 onCheckedChange={(checked) => handleSettingChange('userManagement', 'enableUserRegistration', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="default-role" className="text-white">Default User Role</Label>
//               <Select 
//                 value={settings.userManagement.defaultUserRole} 
//                 onValueChange={(value) => handleSettingChange('userManagement', 'defaultUserRole', value)}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="user">User</SelectItem>
//                   <SelectItem value="moderator">Moderator</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </div>

//         {/* System Settings */}
//         <div className="mb-8 p-6 rounded-lg" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <Settings className="mr-2" size={24} />
//             System Settings
//           </h2>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="maintenance-mode" className="text-white">Maintenance Mode</Label>
//               <Switch 
//                 id="maintenance-mode"
//                 checked={settings.systemSettings.maintenanceMode}
//                 onCheckedChange={(checked) => handleSettingChange('systemSettings', 'maintenanceMode', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="debug-mode" className="text-white">Debug Mode</Label>
//               <Switch 
//                 id="debug-mode"
//                 checked={settings.systemSettings.debugMode}
//                 onCheckedChange={(checked) => handleSettingChange('systemSettings', 'debugMode', checked)}
//               />
//             </div>
//           </CardContent>
//         </div>

//         {/* Analytics Settings */}
//         <div className="mb-8 p-6 rounded-lg" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <BarChart className="mr-2" size={24} />
//             Analytics
//           </h2>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="track-user-behavior" className="text-white">Track User Behavior</Label>
//               <Switch 
//                 id="track-user-behavior"
//                 checked={settings.analytics.trackUserBehavior}
//                 onCheckedChange={(checked) => handleSettingChange('analytics', 'trackUserBehavior', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="data-retention" className="text-white">Data Retention Period</Label>
//               <Select 
//                 value={settings.analytics.dataRetentionPeriod} 
//                 onValueChange={(value) => handleSettingChange('analytics', 'dataRetentionPeriod', value)}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select period" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="30days">30 Days</SelectItem>
//                   <SelectItem value="60days">60 Days</SelectItem>
//                   <SelectItem value="90days">90 Days</SelectItem>
//                   <SelectItem value="1year">1 Year</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </div>

//         {/* Notification Settings */}
//         <div className="p-6 rounded-lg" style={componentStyle}>
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <Bell className="mr-2" size={24} />
//             Notifications
//           </h2>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="email-alerts" className="text-white">Email Alerts</Label>
//               <Switch 
//                 id="email-alerts"
//                 checked={settings.notifications.emailAlerts}
//                 onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="slack-integration" className="text-white">Slack Integration</Label>
//               <Switch 
//                 id="slack-integration"
//                 checked={settings.notifications.slackIntegration}
//                 onCheckedChange={(checked) => handleSettingChange('notifications', 'slackIntegration', checked)}
//               />
//             </div>
//           </CardContent>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminSettingsPage


// 'use client'
// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Users, Settings, BarChart, Bell, ChevronLeft } from 'lucide-react'
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// const AdminSettingsPage = () => {
//   const router = useRouter()

//   const [settings, setSettings] = useState({
//     userManagement: {
//       enableUserRegistration: true,
//       defaultUserRole: 'user',
//     },
//     systemSettings: {
//       maintenanceMode: false,
//       debugMode: false,
//     },
//     analytics: {
//       trackUserBehavior: true,
//       dataRetentionPeriod: '30days',
//     },
//     notifications: {
//       emailAlerts: true,
//       slackIntegration: false,
//     }
//   })

//   useEffect(() => {
//     const savedSettings = localStorage.getItem('adminSettings')
//     if (savedSettings) {
//       setSettings(JSON.parse(savedSettings))
//     }
//   }, [])

//   const handleSettingChange = (category, setting, value) => {
//     const newSettings = {
//       ...settings,
//       [category]: {
//         ...settings[category],
//         [setting]: value
//       }
//     }
//     setSettings(newSettings)
//     localStorage.setItem('adminSettings', JSON.stringify(newSettings))
//   }

//   return (
//     <div className="min-h-screen bg-[#0D1018] text-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-semibold text-white">Admin Settings</h1>
//           </div>
//           <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
//             Save Changes
//           </button>
//         </div>

//         {/* User Management Settings */}
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
//             <Users className="mr-2 text-gray-400" size={20} />
//             User Management
//           </h2>
//           <CardContent className="space-y-6 p-0">
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="enable-registration" className="text-gray-100 font-medium">
//                   Enable User Registration
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Allow new users to register accounts</p>
//               </div>
//               <Switch 
//                 id="enable-registration"
//                 checked={settings.userManagement.enableUserRegistration}
//                 onCheckedChange={(checked) => handleSettingChange('userManagement', 'enableUserRegistration', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="default-role" className="text-gray-100 font-medium">
//                   Default User Role
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Set the default role for new users</p>
//               </div>
//               <Select 
//                 value={settings.userManagement.defaultUserRole} 
//                 onValueChange={(value) => handleSettingChange('userManagement', 'defaultUserRole', value)}
//               >
//                 <SelectTrigger className="w-[180px] bg-[#0D1018] border-gray-800">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="user">User</SelectItem>
//                   <SelectItem value="moderator">Moderator</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </div>

//         {/* System Settings */}
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
//             <Settings className="mr-2 text-gray-400" size={20} />
//             System Settings
//           </h2>
//           <CardContent className="space-y-6 p-0">
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="maintenance-mode" className="text-gray-100 font-medium">
//                   Maintenance Mode
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Temporarily disable access to the platform</p>
//               </div>
//               <Switch 
//                 id="maintenance-mode"
//                 checked={settings.systemSettings.maintenanceMode}
//                 onCheckedChange={(checked) => handleSettingChange('systemSettings', 'maintenanceMode', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="debug-mode" className="text-gray-100 font-medium">
//                   Debug Mode
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Enable detailed error logging</p>
//               </div>
//               <Switch 
//                 id="debug-mode"
//                 checked={settings.systemSettings.debugMode}
//                 onCheckedChange={(checked) => handleSettingChange('systemSettings', 'debugMode', checked)}
//               />
//             </div>
//           </CardContent>
//         </div>

//         {/* Analytics Settings */}
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
//             <BarChart className="mr-2 text-gray-400" size={20} />
//             Analytics
//           </h2>
//           <CardContent className="space-y-6 p-0">
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="track-user-behavior" className="text-gray-100 font-medium">
//                   Track User Behavior
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Collect anonymous usage data</p>
//               </div>
//               <Switch 
//                 id="track-user-behavior"
//                 checked={settings.analytics.trackUserBehavior}
//                 onCheckedChange={(checked) => handleSettingChange('analytics', 'trackUserBehavior', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="data-retention" className="text-gray-100 font-medium">
//                   Data Retention Period
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">How long to keep analytics data</p>
//               </div>
//               <Select 
//                 value={settings.analytics.dataRetentionPeriod} 
//                 onValueChange={(value) => handleSettingChange('analytics', 'dataRetentionPeriod', value)}
//               >
//                 <SelectTrigger className="w-[180px] bg-[#0D1018] border-gray-800">
//                   <SelectValue placeholder="Select period" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="30days">30 Days</SelectItem>
//                   <SelectItem value="60days">60 Days</SelectItem>
//                   <SelectItem value="90days">90 Days</SelectItem>
//                   <SelectItem value="1year">1 Year</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </div>

//         {/* Notification Settings */}
//         <div className="bg-[#0D1018] border border-gray-800 rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
//             <Bell className="mr-2 text-gray-400" size={20} />
//             Notifications
//           </h2>
//           <CardContent className="space-y-6 p-0">
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="email-alerts" className="text-gray-100 font-medium">
//                   Email Alerts
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Send notifications via email</p>
//               </div>
//               <Switch 
//                 id="email-alerts"
//                 checked={settings.notifications.emailAlerts}
//                 onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
//               />
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="slack-integration" className="text-gray-100 font-medium">
//                   Slack Integration
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Send notifications to Slack</p>
//               </div>
//               <Switch 
//                 id="slack-integration"
//                 checked={settings.notifications.slackIntegration}
//                 onCheckedChange={(checked) => handleSettingChange('notifications', 'slackIntegration', checked)}
//               />
//             </div>
//           </CardContent>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminSettingsPage

'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Settings, BarChart, Bell, ChevronLeft } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    localStorage.setItem('adminSettings', JSON.stringify(newSettings))
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-white">Settings</h1>
          </div>
          <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>

        {/* User Management Settings */}
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
            <Users className="mr-2 text-gray-400" size={20} />
            User Management
          </h2>
          <CardContent className="space-y-6 p-0">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="enable-registration" className="text-gray-100 font-medium">
                  Enable User Registration
                </Label>
                <p className="text-sm text-gray-400 mt-1">Allow new users to register accounts</p>
              </div>
              <Switch 
                id="enable-registration"
                checked={settings.userManagement.enableUserRegistration}
                onCheckedChange={(checked) => handleSettingChange('userManagement', 'enableUserRegistration', checked)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="default-role" className="text-gray-100 font-medium">
                  Default User Role
                </Label>
                <p className="text-sm text-gray-400 mt-1">Set the default role for new users</p>
              </div>
              <Select 
                value={settings.userManagement.defaultUserRole} 
                onValueChange={(value) => handleSettingChange('userManagement', 'defaultUserRole', value)}
              >
                <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
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
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
            <Settings className="mr-2 text-gray-400" size={20} />
            System Settings
          </h2>
          <CardContent className="space-y-6 p-0">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="maintenance-mode" className="text-gray-100 font-medium">
                  Maintenance Mode
                </Label>
                <p className="text-sm text-gray-400 mt-1">Temporarily disable access to the platform</p>
              </div>
              <Switch 
                id="maintenance-mode"
                checked={settings.systemSettings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('systemSettings', 'maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="debug-mode" className="text-gray-100 font-medium">
                  Debug Mode
                </Label>
                <p className="text-sm text-gray-400 mt-1">Enable detailed error logging</p>
              </div>
              <Switch 
                id="debug-mode"
                checked={settings.systemSettings.debugMode}
                onCheckedChange={(checked) => handleSettingChange('systemSettings', 'debugMode', checked)}
              />
            </div>
          </CardContent>
        </div>

        {/* Analytics Settings */}
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
            <BarChart className="mr-2 text-gray-400" size={20} />
            Analytics
          </h2>
          <CardContent className="space-y-6 p-0">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="track-user-behavior" className="text-gray-100 font-medium">
                  Track User Behavior
                </Label>
                <p className="text-sm text-gray-400 mt-1">Collect anonymous usage data</p>
              </div>
              <Switch 
                id="track-user-behavior"
                checked={settings.analytics.trackUserBehavior}
                onCheckedChange={(checked) => handleSettingChange('analytics', 'trackUserBehavior', checked)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="data-retention" className="text-gray-100 font-medium">
                  Data Retention Period
                </Label>
                <p className="text-sm text-gray-400 mt-1">How long to keep analytics data</p>
              </div>
              <Select 
                value={settings.analytics.dataRetentionPeriod} 
                onValueChange={(value) => handleSettingChange('analytics', 'dataRetentionPeriod', value)}
              >
                <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
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
        <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
            <Bell className="mr-2 text-gray-400" size={20} />
            Notifications
          </h2>
          <CardContent className="space-y-6 p-0">
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="email-alerts" className="text-gray-100 font-medium">
                  Email Alerts
                </Label>
                <p className="text-sm text-gray-400 mt-1">Send notifications via email</p>
              </div>
              <Switch 
                id="email-alerts"
                checked={settings.notifications.emailAlerts}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="slack-integration" className="text-gray-100 font-medium">
                  Slack Integration
                </Label>
                <p className="text-sm text-gray-400 mt-1">Send notifications to Slack</p>
              </div>
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