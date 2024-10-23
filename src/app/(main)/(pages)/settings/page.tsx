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
