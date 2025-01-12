// 'use client'
// import React, { useState, useEffect } from 'react'
// import { User, Bell, Globe } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { Switch } from '@/components/ui/switch'
// import { Label } from "@/components/ui/label"
// import { CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type NotificationType = 'email' | 'push'

// interface UserState {
//   firstName: string
//   lastName: string
//   email: string
//   joinDate: string
//   notifications: {
//     email: boolean
//     push: boolean
//   }
//   language: string
//   country: string
// }

// const europeanCountries = [
//   "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
//   "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
//   "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
//   "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
// ];

// const AccountPage = () => {
//   const router = useRouter()

//   const [user, setUser] = useState<UserState>({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@company.com',
//     joinDate: 'January 1, 2023',
//     notifications: {
//       email: false,
//       push: false
//     },
//     language: 'english',
//     country: ''
//   })

//   useEffect(() => {
//     const savedNotifications = localStorage.getItem('userNotifications')
//     if (savedNotifications) {
//       setUser(prevUser => ({
//         ...prevUser,
//         notifications: JSON.parse(savedNotifications)
//       }))
//     }
//   }, [])

//   const handleNotificationChange = (type: NotificationType) => {
//     const newNotifications = {
//       ...user.notifications,
//       [type]: !user.notifications[type]
//     }
//     setUser(prevUser => ({
//       ...prevUser,
//       notifications: newNotifications
//     }))
//     localStorage.setItem('userNotifications', JSON.stringify(newNotifications))
//   }

//   const handleLanguageChange = (value: string) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       language: value
//     }))
//   }

//   const handleCountryChange = (value: string) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       country: value
//     }))
//   }

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//       {/* Removed max-w-4xl mx-auto to match other pages */}
//       <div>
//         <div className="flex justify-between items-center mb-8 mt-1">
//           <h1 className="text-xl font-base text-white">Account</h1>
//           <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
//             Save
//           </button>
//         </div>

//         {/* Profile Information Card */}
//         <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
            
//             Profile Information
//           </h2>
//           <div className="space-y-4">
//             <div className="flex items-center border-b border-gray-800 pb-4">
//               <label className="w-1/3 text-sm font-medium text-gray-400">First Name</label>
//               <p className="w-2/3 text-gray-100">{user.firstName}</p>
//             </div>
//             <div className="flex items-center border-b border-gray-800 pb-4">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Last Name</label>
//               <p className="w-2/3 text-gray-100">{user.lastName}</p>
//             </div>
//             <div className="flex items-center border-b border-gray-800 pb-4">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Work Email</label>
//               <p className="w-2/3 text-gray-100">{user.email}</p>
//             </div>
//             <div className="flex items-center">
//               <label className="w-1/3 text-sm font-medium text-gray-400">Member Since</label>
//               <p className="w-2/3 text-gray-100">{user.joinDate}</p>
//             </div>
//           </div>
//         </div>

//         {/* Notifications Card */}
//         <div className="bg-[#050607] border border-gray-800 rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
           
//             Notifications
//           </h2>
//           <CardContent className="space-y-6 p-0">
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="email-notifications" className="text-gray-100 font-medium">
//                   Email Notifications
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Receive updates via email</p>
//               </div>
//               <Switch 
//                 id="email-notifications"
//                 checked={user.notifications.email}
//                 onCheckedChange={() => handleNotificationChange('email')}
//               />
//             </div>
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <Label htmlFor="push-notifications" className="text-gray-100 font-medium">
//                   Push Notifications
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Receive browser notifications</p>
//               </div>
//               <Switch 
//                 id="push-notifications"
//                 checked={user.notifications.push}
//                 onCheckedChange={() => handleNotificationChange('push')}
//               />
//             </div>
//           </CardContent>
//         </div>

//         {/* Preferences Card */}
//         <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-6 flex items-center text-gray-100">
            
//             Preferences
//           </h2>
//           <CardContent className="space-y-6 p-0">
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label htmlFor="language-select" className="text-gray-100 font-medium">
//                   Language
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Select your preferred language</p>
//               </div>
//               <Select 
//                 value={user.language}
//                 onValueChange={handleLanguageChange}
//               >
//                 <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="english">English</SelectItem>
//                   <SelectItem value="lithuanian">Lithuanian</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label htmlFor="country-select" className="text-gray-100 font-medium">
//                   Country
//                 </Label>
//                 <p className="text-sm text-gray-400 mt-1">Select your country</p>
//               </div>
//               <Select
//                 value={user.country}
//                 onValueChange={handleCountryChange}
//               >
//                 <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {europeanCountries.map((country) => (
//                     <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AccountPage



// 'use client'
// import React, { useState, useEffect } from 'react'
// import { User, Bell, Globe } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { Switch } from '@/components/ui/switch'
// import { Label } from "@/components/ui/label"
// import { CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type NotificationType = 'email' | 'push'

// interface UserState {
//   firstName: string
//   lastName: string
//   email: string
//   joinDate: string
//   notifications: {
//     email: boolean
//     push: boolean
//   }
//   language: string
//   country: string
// }

// const europeanCountries = [
//   "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
//   "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
//   "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
//   "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
// ];

// const AccountPage = () => {
//   const router = useRouter()

//   const [user, setUser] = useState<UserState>({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@company.com',
//     joinDate: 'January 1, 2023',
//     notifications: {
//       email: false,
//       push: false
//     },
//     language: 'english',
//     country: ''
//   })

//   useEffect(() => {
//     const savedNotifications = localStorage.getItem('userNotifications')
//     if (savedNotifications) {
//       setUser(prevUser => ({
//         ...prevUser,
//         notifications: JSON.parse(savedNotifications)
//       }))
//     }
//   }, [])

//   const handleNotificationChange = (type: NotificationType) => {
//     const newNotifications = {
//       ...user.notifications,
//       [type]: !user.notifications[type]
//     }
//     setUser(prevUser => ({
//       ...prevUser,
//       notifications: newNotifications
//     }))
//     localStorage.setItem('userNotifications', JSON.stringify(newNotifications))
//   }

//   const handleLanguageChange = (value: string) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       language: value
//     }))
//   }

//   const handleCountryChange = (value: string) => {
//     setUser(prevUser => ({
//       ...prevUser,
//       country: value
//     }))
//   }

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//       <div>
//         <div className="flex justify-between items-center mb-8 mt-1">
//           <h1 className="text-xl font-base text-white">Account</h1>
//           <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
//             Save
//           </button>
//         </div>

//         {/* 2x2 Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Profile Information Card */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               Profile Information
//             </h2>
//             <div className="space-y-4">
//               <div className="flex items-center border-b border-gray-800 pb-4">
//                 <label className="w-1/3 text-sm font-medium text-gray-400">First Name</label>
//                 <p className="w-2/3 text-gray-100">{user.firstName}</p>
//               </div>
//               <div className="flex items-center border-b border-gray-800 pb-4">
//                 <label className="w-1/3 text-sm font-medium text-gray-400">Last Name</label>
//                 <p className="w-2/3 text-gray-100">{user.lastName}</p>
//               </div>
//               <div className="flex items-center border-b border-gray-800 pb-4">
//                 <label className="w-1/3 text-sm font-medium text-gray-400">Work Email</label>
//                 <p className="w-2/3 text-gray-100">{user.email}</p>
//               </div>
//               <div className="flex items-center">
//                 <label className="w-1/3 text-sm font-medium text-gray-400">Member Since</label>
//                 <p className="w-2/3 text-gray-100">{user.joinDate}</p>
//               </div>
//             </div>
//           </div>

//           {/* Notifications Card */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               Notifications
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="email-notifications" className="text-gray-100 font-medium">
//                     Email Notifications
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Receive updates via email</p>
//                 </div>
//                 <Switch 
//                   id="email-notifications"
//                   checked={user.notifications.email}
//                   onCheckedChange={() => handleNotificationChange('email')}
//                 />
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <div>
//                   <Label htmlFor="push-notifications" className="text-gray-100 font-medium">
//                     Push Notifications
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Receive browser notifications</p>
//                 </div>
//                 <Switch 
//                   id="push-notifications"
//                   checked={user.notifications.push}
//                   onCheckedChange={() => handleNotificationChange('push')}
//                 />
//               </div>
//             </CardContent>
//           </div>

//           {/* Language Card */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               Language
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Label htmlFor="language-select" className="text-gray-100 font-medium">
//                     Language
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Select your preferred language</p>
//                 </div>
//                 <Select 
//                   value={user.language}
//                   onValueChange={handleLanguageChange}
//                 >
//                   <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
//                     <SelectValue placeholder="Select" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="english">English</SelectItem>
//                     <SelectItem value="lithuanian">Lithuanian</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </div>

//           {/* Country Card */}
//           <div className="bg-[#050607] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
//               Country
//             </h2>
//             <CardContent className="space-y-6 p-0">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Label htmlFor="country-select" className="text-gray-100 font-medium">
//                     Country
//                   </Label>
//                   <p className="text-sm text-gray-400 mt-1">Select your country</p>
//                 </div>
//                 <Select
//                   value={user.country}
//                   onValueChange={handleCountryChange}
//                 >
//                   <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
//                     <SelectValue placeholder="Select" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {europeanCountries.map((country) => (
//                       <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AccountPage

'use client'
import React, { useState, useEffect } from 'react'
import { User, Bell, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type NotificationType = 'email' | 'push'

interface UserState {
  firstName: string
  lastName: string
  email: string
  joinDate: string
  notifications: {
    email: boolean
    push: boolean
  }
  language: string
  country: string
}

const europeanCountries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
];

const AccountPage = () => {
  const router = useRouter()

  const [user, setUser] = useState<UserState>({
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

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Account</h1>
          <button className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors">
            Save
          </button>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information Card */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center border-b border-gray-800 pb-4">
                <label className="w-1/3 text-sm font-medium text-gray-400">First Name</label>
                <p className="w-2/3 text-gray-100">{user.firstName}</p>
              </div>
              <div className="flex items-center border-b border-gray-800 pb-4">
                <label className="w-1/3 text-sm font-medium text-gray-400">Last Name</label>
                <p className="w-2/3 text-gray-100">{user.lastName}</p>
              </div>
              <div className="flex items-center border-b border-gray-800 pb-4">
                <label className="w-1/3 text-sm font-medium text-gray-400">Work Email</label>
                <p className="w-2/3 text-gray-100">{user.email}</p>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-sm font-medium text-gray-400">Member Since</label>
                <p className="w-2/3 text-gray-100">{user.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
              Notifications
            </h2>
            <CardContent className="space-y-6 p-0">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="email-notifications" className="text-gray-100 font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">Receive updates via email</p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={user.notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="push-notifications" className="text-gray-100 font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">Receive browser notifications</p>
                </div>
                <Switch 
                  id="push-notifications"
                  checked={user.notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
            </CardContent>
          </div>

          {/* Language Card */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
              Language
            </h2>
            <CardContent className="space-y-6 p-0">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="language-select" className="text-gray-100 font-medium">
                    Language
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">Select your preferred language</p>
                </div>
                <Select 
                  value={user.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="lithuanian">Lithuanian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </div>

          {/* Country Card */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-base mb-6 flex items-center text-gray-100">
              Country
            </h2>
            <CardContent className="space-y-6 p-0">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="country-select" className="text-gray-100 font-medium">
                    Country
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">Select your country</p>
                </div>
                <Select
                  value={user.country}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger className="w-[180px] bg-[#050607] border-gray-800">
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
        </div>
      </div>
    </div>
  )
}

export default AccountPage