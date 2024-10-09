'use client'
import React, { useState, useEffect } from 'react'
import { User, Mail, Calendar, Bell, ChevronLeft, Globe, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Switch } from "@/components/global/ui/switch"
import { Switch } from '@/components/ui/switch'
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const europeanCountries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
];


const AccountPage = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    joinDate: 'January 1, 2023',
    notifications: {
      email: false,
      push: false
    },
    language: 'english',
    country: ''
  })

  useEffect(() => {
    // Load saved notification settings from localStorage
    const savedNotifications = localStorage.getItem('userNotifications')
    if (savedNotifications) {
      setUser(prevUser => ({
        ...prevUser,
        notifications: JSON.parse(savedNotifications)
      }))
    }
  }, [])

  const handleNotificationChange = (type) => {
    const newNotifications = {
      ...user.notifications,
      [type]: !user.notifications[type]
    }
    setUser(prevUser => ({
      ...prevUser,
      notifications: newNotifications
    }))
    // Save to localStorage (simulate saving to backend)
    localStorage.setItem('userNotifications', JSON.stringify(newNotifications))
  }

  const handleLanguageChange = (value) => {
    setUser(prevUser => ({
      ...prevUser,
      language: value
    }))
    // Here you would typically update the language in your app's state or context
  }

  return (
    <div className="min-h-min font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white relative">
      <div className="max-w-3xl mx-auto p-3">
     
      <button 
      onClick={() => router.back()} 
      className="absolute mt-4 left-5 text-gray-400 hover:text-white transition flex items-center"
    >
      <ChevronLeft className="mr-1"/> Back
    </button>
      
      {/* <div className="max-w-3xl mx-auto p-6"> */}
        {/* <div className="flex justify-between items-center mb-6 sm:mb-8">
          <button onClick={() => router.back()} className="text-gray-400  hover:text-white transition flex items-left">
            <ChevronLeft className="mr-1"/> Back
          </button>
          
        </div> */}
        
        
        <h1 className="text-3xl mt-5 font-bold mb-8">Account Settings</h1>

        <div className="p-6 rounded-lg" style={componentStyle}>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <User className="mr-2" size={24} />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-400">First Name:</label>
              <p className="w-2/3 text-lg">{user.firstName}</p>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-400">Last Name:</label>
              <p className="w-2/3 text-lg">{user.lastName}</p>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-400">Work Email:</label>
              <p className="w-2/3 text-lg">{user.email}</p>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-400">Member Since:</label>
              <p className="w-2/3 text-lg">{user.joinDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-6 rounded-lg" style={componentStyle}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" size={24} />
            Notifications
          </h2>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
              <Switch 
                id="email-notifications"
                checked={user.notifications.email}
                onCheckedChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
              <Switch 
                id="push-notifications"
                checked={user.notifications.push}
                onCheckedChange={() => handleNotificationChange('push')}
              />
            </div>
          </CardContent>
        </div>

        <div className="mt-4 p-6 rounded-lg" style={componentStyle}>

          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="mr-2" size={20} />
            Preferences
          </h2>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="default-role" className="text-white">Language</Label>
              <Select 
                // value={settings.userManagement.defaultUserRole} 
                // onValueChange={(value) => handleSettingChange('userManagement', 'defaultUserRole', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="lithuanian">Lithuanian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="default-role" className="text-white">Country</Label>
              <Select
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {europeanCountries.map((country) => (
                    <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </div>
        <div className="flex justify-center">
            <button className="bg-white text-black p-4 rounded-xl mt-4 flex items-center">Save Changes</button>
          </div>
      </div>
     </div>
  )
}

export default AccountPage
