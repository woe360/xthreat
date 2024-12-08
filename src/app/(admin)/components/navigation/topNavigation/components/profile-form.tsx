// 'use client'

// import React, { use, useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { EditUserProfileSchema } from '@/lib/types'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Loader2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// type Props = {
//   user: any
//   onUpdate?: any
// }

// const ProfileForm = ({ user, onUpdate }: Props) => {
//   const [isLoading, setIsLoading] = useState(false)
//   const form = useForm<z.infer<typeof EditUserProfileSchema>>({
//     mode: 'onChange',
//     resolver: zodResolver(EditUserProfileSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//     },
//   })

//   const handleSubmit = async (
//     values: z.infer<typeof EditUserProfileSchema>
//   ) => {
//     setIsLoading(true)
//     await onUpdate(values.name)
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     form.reset({ name: 'user.name', email: 'user.email' })
//   }, [user])

//   return (
//     <Form {...form}>
//       <form
//         className="flex flex-col gap-6"
//         onSubmit={form.handleSubmit(handleSubmit)}
//       >
//         <FormField
//           disabled={isLoading}
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-lg">Full name</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder="Name"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-lg">Email</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   disabled={true}
//                   placeholder="Email"
//                   type="email"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           type="submit"
//           className="self-start hover:bg-[#2F006B] hover:text-white "
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-2 w-4 animate-spin" />
//               Saving
//             </>
//           ) : (
//             'Save User Settings'
//           )}
//         </Button>
//       </form>
//     </Form>
//   )
// }

// export default ProfileForm




// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { X, Loader2 } from 'lucide-react';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';

// // Assuming EditUserProfileSchema is imported or defined here
// const EditUserProfileSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
// });

// const ProfileFormModal = ({ isOpen, onClose, user, onUpdate }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const form = useForm({
//     mode: 'onChange',
//     resolver: zodResolver(EditUserProfileSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//     },
//   });

//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     await onUpdate(values.name);
//     setIsLoading(false);
//     onClose();
//   };

//   useEffect(() => {
//     if (user) {
//       form.reset({ name: user.name, email: user.email });
//     }
//   }, [user, form]);

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[500px] h-[80vh] text-white"
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
//           <Button
//             className="absolute right-4 top-4"
//             onClick={onClose}
//             variant="ghost"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </DialogHeader>

//         <Form {...form}>
//           <form
//             className="flex flex-col gap-6"
//             onSubmit={form.handleSubmit(handleSubmit)}
//           >
//             <FormField
//               disabled={isLoading}
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-lg">Full name</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Name"
//                       className="bg-gray-700 text-white"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-lg">Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={true}
//                       placeholder="Email"
//                       type="email"
//                       className="bg-gray-700 text-white"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="self-start bg-[#2F006B] hover:bg-[#3F107B] text-white"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving
//                 </>
//               ) : (
//                 'Save User Settings'
//               )}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProfileFormModal;

import React, { useState, useEffect } from 'react'
import { User, Mail, Calendar, Bell, Globe, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from '@/components/ui/switch'
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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

const AccountSettingsModal = ({ isOpen, onClose }) => {
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
    localStorage.setItem('userNotifications', JSON.stringify(newNotifications))
  }

  const handleLanguageChange = (value) => {
    setUser(prevUser => ({
      ...prevUser,
      language: value
    }))
  }

  const handleCountryChange = (value) => {
    setUser(prevUser => ({
      ...prevUser,
      country: value
    }))
  }

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log('Saving changes:', user)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] overflow-y-auto text-white" style={componentStyle}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-8">Account Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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

          <div className="p-6 rounded-lg" style={componentStyle}>
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

          <div className="p-6 rounded-lg" style={componentStyle}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2" size={20} />
              Preferences
            </h2>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="language" className="text-white">Language</Label>
                <Select 
                  value={user.language}
                  onValueChange={handleLanguageChange}
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
                <Label htmlFor="country" className="text-white">Country</Label>
                <Select
                  value={user.country}
                  onValueChange={handleCountryChange}
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
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleSaveChanges} className="bg-white text-black p-4 rounded-xl">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AccountSettingsModal