'use client'
import React, { useState, useEffect } from 'react'
import { User, Bell, Globe, Upload, ChevronRight, CheckCircle, Settings, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/switch'
import { Label } from "@/components/label"
import { CardContent } from "@/components/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog"

type NotificationType = 'email' | 'push'

interface UserState {
  firstName: string
  lastName: string
  email: string
  role: string
  joinDate: string
  notifications: {
    email: boolean
    push: boolean
  }
  language: string
  country: string
  isLoading: boolean
}

interface RoleRequestForm {
  companySize: string
  industry: string
  reason: string
  documents: File[]
}

const europeanCountries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
];

const AccountPage = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<UserState>({
    firstName: '',
    lastName: '',
    email: '',
    joinDate: '',
    role: '',
    notifications: {
      email: false,
      push: false
    },
    language: 'english',
    country: '',
    isLoading: true
  })
  const [showRoleRequest, setShowRoleRequest] = useState(false)
  const [roleRequest, setRoleRequest] = useState<RoleRequestForm>({
    companySize: '',
    industry: '',
    reason: '',
    documents: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }

        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (error) throw error

        setUser(prevUser => ({
          ...prevUser,
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          email: userData.email || '',
          role: userData.role || '',
          joinDate: new Date(userData.created_at).toLocaleDateString(),
          isLoading: false
        }))

      } catch (error) {
        console.error('Error fetching user data:', error)
        setUser(prev => ({ ...prev, isLoading: false }))
      }
    }

    fetchUserData()
  }, [router])

  useEffect(() => {
    const savedNotifications = localStorage.getItem('userNotifications')
    if (savedNotifications) {
      setUser(prevUser => ({
        ...prevUser,
        notifications: JSON.parse(savedNotifications)
      }))
    }
  }, [])

  const handleNotificationChange = (type: NotificationType) => {
    const newNotifications = {
      ...user.notifications,
      [type]: !user.notifications[type]
    }
    setUser(prevUser => ({
      ...prevUser,
      notifications: newNotifications
    }))
    localStorage.setItem('userNotifications', JSON.stringify(newNotifications))
  }

  const handleLanguageChange = (value: string) => {
    setUser(prevUser => ({
      ...prevUser,
      language: value
    }))
  }

  const handleCountryChange = (value: string) => {
    setUser(prevUser => ({
      ...prevUser,
      country: value
    }))
  }

  const handleFileUpload = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      const { data, error } = await supabase.storage
        .from('role-request-documents')
        .upload(`${user.email}/${file.name}`, file)

      if (error) throw error
      return data.path
    })

    return Promise.all(uploadPromises)
  }

  const handleRoleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const documentPaths = await handleFileUpload(roleRequest.documents)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('No session')

      const { error } = await supabase
        .from('role_requests')
        .insert({
          user_id: session.user.id,
          current_role: user.role,
          requested_role: 'manager',
          company_size: roleRequest.companySize,
          industry: roleRequest.industry,
          reason: roleRequest.reason,
          documents: documentPaths,
          status: 'pending'
        })

      if (error) throw error

      setRoleRequest({
        companySize: '',
        industry: '',
        reason: '',
        documents: []
      })
      setShowRoleRequest(false)
    } catch (error) {
      console.error('Error submitting role request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const RoleRequestDialog = () => (
    <Dialog open={showRoleRequest} onOpenChange={setShowRoleRequest}>
      <DialogContent className="bg-[#050607] border border-gray-800/40 text-gray-100 rounded-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-white">Request Manager Access</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleRoleRequest} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="company-size" className="text-gray-400">Company Size</Label>
            <Select
              value={roleRequest.companySize}
              onValueChange={(value) => setRoleRequest(prev => ({ ...prev, companySize: value }))}
            >
              <SelectTrigger className="w-full bg-black/20 border-gray-800/40 mt-1">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent className="bg-[#050607] border border-gray-800/40">
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="500+">500+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="industry" className="text-gray-400">Industry</Label>
            <Select
              value={roleRequest.industry}
              onValueChange={(value) => setRoleRequest(prev => ({ ...prev, industry: value }))}
            >
              <SelectTrigger className="w-full bg-black/20 border-gray-800/40 mt-1">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-[#050607] border border-gray-800/40">
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason" className="text-gray-400">Reason for Request</Label>
            <textarea
              id="reason"
              className="w-full bg-black/20 border border-gray-800/40 rounded-lg p-2 text-gray-100 mt-1"
              rows={4}
              value={roleRequest.reason}
              onChange={(e) => setRoleRequest(prev => ({ ...prev, reason: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="documents" className="text-gray-400">Business Verification Documents</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                className="hidden"
                id="documents"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  setRoleRequest(prev => ({ ...prev, documents: files }))
                }}
              />
              <label
                htmlFor="documents"
                className="flex items-center justify-center w-full h-32 border border-dashed border-gray-800/60 rounded-lg cursor-pointer hover:border-gray-700/70 transition-all"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-400">
                    {roleRequest.documents.length > 0
                      ? `${roleRequest.documents.length} files selected`
                      : 'Upload documents'}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
              onClick={() => setShowRoleRequest(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )

  const requestManagerButton = user.role === 'user' && (
    <button
      onClick={() => setShowRoleRequest(true)}
      className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
    >
      Request Manager Access
    </button>
  )

  const SettingsTabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 py-3 px-4 rounded-lg w-full text-left transition-colors ${
        activeTab === id
          ? 'bg-black/30 text-white'
          : 'text-gray-400 hover:text-gray-300 hover:bg-black/20'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-black/20 border border-gray-800/40 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-light text-white mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">First Name</Label>
                      <p className="text-white mt-1">{user.firstName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Last Name</Label>
                      <p className="text-white mt-1">{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Email Address</Label>
                    <p className="text-white mt-1">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Account Type</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-white capitalize">{user.role}</p>
                      {requestManagerButton}
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Member Since</Label>
                    <p className="text-white mt-1">{user.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-black/20 border border-gray-800/40 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-light text-white mb-4">Notification Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-800/40">
                    <div>
                      <p className="text-white font-light">Email Notifications</p>
                      <p className="text-sm text-gray-400 mt-0.5">Receive security updates and course completions</p>
                    </div>
                    <Switch 
                      checked={user.notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white font-light">Push Notifications</p>
                      <p className="text-sm text-gray-400 mt-0.5">Receive alerts in your browser</p>
                    </div>
                    <Switch 
                      checked={user.notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="bg-black/20 border border-gray-800/40 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-light text-white mb-4">Regional Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-800/40">
                    <div>
                      <p className="text-white font-light">Language</p>
                      <p className="text-sm text-gray-400 mt-0.5">Select your preferred language</p>
                    </div>
                    <Select 
                      value={user.language}
                      onValueChange={handleLanguageChange}
                    >
                      <SelectTrigger className="w-[180px] bg-black/20 border-gray-800/40">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050607] border border-gray-800/40">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="lithuanian">Lithuanian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white font-light">Country</p>
                      <p className="text-sm text-gray-400 mt-0.5">Select your country</p>
                    </div>
                    <Select
                      value={user.country}
                      onValueChange={handleCountryChange}
                    >
                      <SelectTrigger className="w-[180px] bg-black/20 border-gray-800/40">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050607] border border-gray-800/40 max-h-60">
                        {europeanCountries.map((country) => (
                          <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (user.isLoading) {
    return (
      <div className="min-h-screen bg-[#050607] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Manage your profile information, notification preferences, and regional settings.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="space-y-1 sticky top-4">
              <SettingsTabButton id="profile" label="Profile" icon={User} />
              <SettingsTabButton id="notifications" label="Notifications" icon={Bell} />
              <SettingsTabButton id="preferences" label="Preferences" icon={Settings} />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
      <RoleRequestDialog />
    </div>
  )
}

export default AccountPage