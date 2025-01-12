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
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//       {/* Removed max-w-4xl mx-auto to match other pages */}
//       <div>
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8 mt-1">
//           <h1 className="text-xl font-base text-white">Settings</h1>
//           <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
//             Save
//           </button>
//         </div>

//         {/* Grid Layout for Settings Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* User Management Settings */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               User Management
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="enable-registration" className="text-gray-100 font-medium">
//                     Enable User Registration
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Allow new users to register accounts</p>
//                 </div>
//                 <Switch 
//                   id="enable-registration"
//                   checked={settings.userManagement.enableUserRegistration}
//                   onCheckedChange={(checked) => handleSettingChange('userManagement', 'enableUserRegistration', checked)}
//                 />
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="default-role" className="text-gray-100 font-medium">
//                     Default User Role
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Set the default role for new users</p>
//                 </div>
//                 <Select 
//                   value={settings.userManagement.defaultUserRole} 
//                   onValueChange={(value) => handleSettingChange('userManagement', 'defaultUserRole', value)}
//                 >
//                   <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
//                     <SelectValue placeholder="Select role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="user">User</SelectItem>
//                     <SelectItem value="moderator">Moderator</SelectItem>
//                     <SelectItem value="admin">Admin</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </div>

//           {/* System Settings */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               System Settings
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="maintenance-mode" className="text-gray-100 font-medium">
//                     Maintenance Mode
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Temporarily disable access to the platform</p>
//                 </div>
//                 <Switch 
//                   id="maintenance-mode"
//                   checked={settings.systemSettings.maintenanceMode}
//                   onCheckedChange={(checked) => handleSettingChange('systemSettings', 'maintenanceMode', checked)}
//                 />
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="debug-mode" className="text-gray-100 font-medium">
//                     Debug Mode
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Enable detailed error logging</p>
//                 </div>
//                 <Switch 
//                   id="debug-mode"
//                   checked={settings.systemSettings.debugMode}
//                   onCheckedChange={(checked) => handleSettingChange('systemSettings', 'debugMode', checked)}
//                 />
//               </div>
//             </CardContent>
//           </div>

//           {/* Analytics Settings */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               Analytics
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="track-user-behavior" className="text-gray-100 font-medium">
//                     Track User Behavior
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Collect anonymous usage data</p>
//                 </div>
//                 <Switch 
//                   id="track-user-behavior"
//                   checked={settings.analytics.trackUserBehavior}
//                   onCheckedChange={(checked) => handleSettingChange('analytics', 'trackUserBehavior', checked)}
//                 />
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="data-retention" className="text-gray-100 font-medium">
//                     Data Retention Period
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">How long to keep analytics data</p>
//                 </div>
//                 <Select 
//                   value={settings.analytics.dataRetentionPeriod} 
//                   onValueChange={(value) => handleSettingChange('analytics', 'dataRetentionPeriod', value)}
//                 >
//                   <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
//                     <SelectValue placeholder="Select period" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="30days">30 Days</SelectItem>
//                     <SelectItem value="60days">60 Days</SelectItem>
//                     <SelectItem value="90days">90 Days</SelectItem>
//                     <SelectItem value="1year">1 Year</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </div>

//           {/* Notification Settings */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               Notifications
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="email-alerts" className="text-gray-100 font-medium">
//                     Email Alerts
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Send notifications via email</p>
//                 </div>
//                 <Switch 
//                   id="email-alerts"
//                   checked={settings.notifications.emailAlerts}
//                   onCheckedChange={(checked) => handleSettingChange('notifications', 'emailAlerts', checked)}
//                 />
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="slack-integration" className="text-gray-100 font-medium">
//                     Slack Integration
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Send notifications to Slack</p>
//                 </div>
//                 <Switch 
//                   id="slack-integration"
//                   checked={settings.notifications.slackIntegration}
//                   onCheckedChange={(checked) => handleSettingChange('notifications', 'slackIntegration', checked)}
//                 />
//               </div>
//             </CardContent>
//           </div>
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
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Settings</h1>
          <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
            Save
          </button>
        </div>

        {/* Grid Layout for Settings Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Management Settings */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
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
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
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
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
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
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
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
    </div>
  )
}

export default AdminSettingsPage