// 'use client'


// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation'

// const plans = {
//   monthly99: { name: 'Basic Monthly Plan', price: 99 },
//   monthly499: { name: 'Premium Monthly Plan', price: 499 },
//   yearly990: { name: 'Basic Yearly Plan', price: 990 },
//   yearly4999: { name: 'Premium Yearly Plan', price: 4999 }
// };



// const PlanSelection = ({ selectedPlan, setSelectedPlan }) => (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
//     <div className="grid grid-cols-2 gap-4">
//       {Object.entries(plans).map(([id, plan]) => (
//         <Card 
//           key={id}
//           className={`cursor-pointer transition-all ${selectedPlan === id ? 'border-blue-400 shadow-md bg-blue-900' : 'border-gray-700 hover:border-gray-500 bg-gray-800'}`}
//           onClick={() => setSelectedPlan(id)}
//         >
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-sm mb-1">{plan.name}</h3>
//             <p className="text-xl font-bold">
//               ${plan.price}
//               <span className="font-normal ml-1">
//                 /{id.includes('yearly') ? 'year' : 'month'}
//               </span>
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   </div>
// );

// const PersonalInformation = ({ formData, handleInputChange }) => (
//   <div className="mb-6 border-b">
//     <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="name" className="mb-1 block">Full Name</Label>
//         <Input
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           required
//           className="bg-gray-800 border-gray-700 text-white"
//         />
//       </div>
//       <div>
//         <Label htmlFor="email" className="mb-1 block">Email</Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           required
//           className="bg-gray-800 border-gray-700 text-white"
//         />
//       </div>
//     </div>
//   </div>
// );

// const CardInformation = ({ formData, handleInputChange }) => (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-4">Card Information</h2>
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="cardNumber" className="mb-1 block">Card Number</Label>
//         <Input
//           id="cardNumber"
//           name="cardNumber"
//           value={formData.cardNumber}
//           onChange={handleInputChange}
//           required
//           className="bg-gray-800 border-gray-700 text-white"
//         />
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="expiryDate" className="mb-1 block">Expiry Date</Label>
//           <Input
//             id="expiryDate"
//             name="expiryDate"
//             value={formData.expiryDate}
//             onChange={handleInputChange}
//             required
//             placeholder="MM / YY"
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//         <div>
//           <Label htmlFor="cvv" className="mb-1 block">CVV</Label>
//           <Input
//             id="cvv"
//             name="cvv"
//             value={formData.cvv}
//             onChange={handleInputChange}
//             required
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const CheckoutPage = () => {
//   const [selectedPlan, setSelectedPlan] = useState('monthly99');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Order submitted', { plan: plans[selectedPlan], formData });
//   };

//   const router = useRouter()

//   return (
//     <div className="min-h-screen font-sans bg-black flex items-center justify-center p-4 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
//       <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-gradient-to-br from-black to-gray-700 p-8 text-white">
//             <Button 
//               onClick={() => router.back()} 
//               className="mb-5 px-3 bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-300 rounded-full flex items-center"
//             >
//               <ChevronLeft className="h-5 w-5 mr-1" /> Back
//             </Button>
            
//             <h1 className="text-3xl font-bold mb-4">Checkout</h1>
//             <p className="mb-8">Complete your purchase and improve your business cyber security!</p>
            
//             <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
//           </div>
          
//           <div className="md:w-1/2 p-8 text-white">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
//               <CardInformation formData={formData} handleInputChange={handleInputChange} />

//               <Button type="submit" className="w-full bg-blue-900 text-white hover:bg-blue-800 py-2 text-lg rounded transition-colors">
//                 Complete Purchase
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;




// 'use client'

// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft } from 'lucide-react';
// import { useRouter } from 'next/navigation'

// // Define types
// interface Plan {
//   name: string;
//   price: number;
// }

// interface Plans {
//   [key: string]: Plan;
// }

// interface FormData {
//   name: string;
//   email: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// interface PlanSelectionProps {
//   selectedPlan: string;
//   setSelectedPlan: (plan: string) => void;
// }

// interface PersonalInformationProps {
//   formData: FormData;
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// interface CardInformationProps {
//   formData: FormData;
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const plans: Plans = {
//   monthly99: { name: 'Basic Monthly Plan', price: 99 },
//   monthly499: { name: 'Premium Monthly Plan', price: 499 },
//   yearly990: { name: 'Basic Yearly Plan', price: 990 },
//   yearly4999: { name: 'Premium Yearly Plan', price: 4999 }
// };

// const PlanSelection: React.FC<PlanSelectionProps> = ({ selectedPlan, setSelectedPlan }) => (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
//     <div className="grid grid-cols-2 gap-4">
//       {Object.entries(plans).map(([id, plan]) => (
//         <Card 
//           key={id}
//           className={`cursor-pointer transition-all ${selectedPlan === id ? 'border-blue-400 shadow-md bg-blue-900' : 'border-gray-700 hover:border-gray-500 bg-gray-800'}`}
//           onClick={() => setSelectedPlan(id)}
//         >
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-sm mb-1">{plan.name}</h3>
//             <p className="text-xl font-bold">
//               ${plan.price}
//               <span className="font-normal ml-1">
//                 /{id.includes('yearly') ? 'year' : 'month'}
//               </span>
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   </div>
// );

// const PersonalInformation: React.FC<PersonalInformationProps> = ({ formData, handleInputChange }) => (
//   <div className="mb-6 border-b">
//     <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="name" className="mb-1 block">Full Name</Label>
//         <Input
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           required
//           className="bg-gray-800 border-gray-700 text-white"
//         />
//       </div>
//       <div>
//         <Label htmlFor="email" className="mb-1 block">Email</Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           required
//           className="bg-gray-800 border-gray-700 text-white"
//         />
//       </div>
//     </div>
//   </div>
// );

// const CardInformation: React.FC<CardInformationProps> = ({ formData, handleInputChange }) => (
//   <div className="mb-6">
//     <h2 className="text-xl font-semibold mb-4">Card Information</h2>
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="cardNumber" className="mb-1 block">Card Number</Label>
//         <Input
//           id="cardNumber"
//           name="cardNumber"
//           value={formData.cardNumber}
//           onChange={handleInputChange}
//           required
//           className="bg-gray-800 border-gray-700 text-white"
//         />
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="expiryDate" className="mb-1 block">Expiry Date</Label>
//           <Input
//             id="expiryDate"
//             name="expiryDate"
//             value={formData.expiryDate}
//             onChange={handleInputChange}
//             required
//             placeholder="MM / YY"
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//         <div>
//           <Label htmlFor="cvv" className="mb-1 block">CVV</Label>
//           <Input
//             id="cvv"
//             name="cvv"
//             value={formData.cvv}
//             onChange={handleInputChange}
//             required
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const CheckoutPage: React.FC = () => {
//   const [selectedPlan, setSelectedPlan] = useState<string>('monthly99');
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const router = useRouter();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     try {
//       // Replace console.log with proper API call or error handling
//       const response = await submitOrder({ plan: plans[selectedPlan], formData });
//       // Handle successful submission
//       router.push('/success'); // Redirect to success page
//     } catch (error) {
//       // Handle error appropriately
//       if (error instanceof Error) {
//         // Show error message to user
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black flex items-center justify-center p-4 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
//       <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-gradient-to-br from-black to-gray-700 p-8 text-white">
//             <Button 
//               onClick={() => router.back()} 
//               className="mb-5 px-3 bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-300 rounded-full flex items-center"
//             >
//               <ChevronLeft className="h-5 w-5 mr-1" /> Back
//             </Button>
            
//             <h1 className="text-3xl font-bold mb-4">Checkout</h1>
//             <p className="mb-8">Complete your purchase and improve your business cyber security!</p>
            
//             <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
//           </div>
          
//           <div className="md:w-1/2 p-8 text-white">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
//               <CardInformation formData={formData} handleInputChange={handleInputChange} />

//               <Button type="submit" className="w-full bg-blue-900 text-white hover:bg-blue-800 py-2 text-lg rounded transition-colors">
//                 Complete Purchase
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Add this function to handle order submission
// async function submitOrder(data: { plan: Plan; formData: FormData }): Promise<any> {
//   // Implement your API call here
//   return Promise.resolve(); // Temporary placeholder
// }

// export default CheckoutPage;

// 'use client'

// import React, { useState } from 'react';
// import { Check, ChevronLeft, CreditCard, Mail, User } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { cn } from "@/lib/utils";

// interface Plan {
//   name: string;
//   price: number | string;
//   cycle: string;
//   description: string;
//   features: string[];
// }

// interface FormData {
//   name: string;
//   email: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// const CheckoutPage: React.FC = () => {
//   const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(1);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const router = useRouter();

//   const plans: Plan[] = [
//     {
//       name: "Essential",
//       price: 1.8,
//       cycle: "user/month",
//       description: "Ideal for small teams looking to protect their business.",
//       features: [
//         "Access to essential cybersecurity awareness training modules",
//         "Core analytics",
//         "Email support",
//         "1 administrator seat"
//       ]
//     },
//     {
//       name: "Advanced",
//       price: 3.5,
//       cycle: "user/month",
//       description: "Comprehensive cybersecurity awareness training.",
//       features: [
//         "Everything in Essential",
//         "Access to all core and advanced training modules",
//         "Advanced analytics",
//         "3 administrator seats"
//       ]
//     },
//   ];

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     try {
//       // Handle submission logic here
//       router.push('/success');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <Button 
//           onClick={() => router.back()} 
//           variant="ghost"
//           className="mb-8 text-gray-400 hover:text-gray-300"
//         >
//           <ChevronLeft className="h-5 w-5 mr-2" />
//           Back to Pricing
//         </Button>

//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Left Column - Plan Selection */}
//           <div className="lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1">
//                 Complete Your Purchase
//               </h1>
//               <p className="mt-4 text-xl font-serif italic text-gray-400 mb-8">
//                 Select your plan and enter your details.
//               </p>

//               <div className="space-y-4">
//                 {plans.map((plan, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     onClick={() => setSelectedPlanIndex(index)}
//                     className={cn(
//                       "cursor-pointer rounded-lg overflow-hidden border p-6",
//                       "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset]",
//                       selectedPlanIndex === index 
//                         ? "border-gray-600" 
//                         : "border-gray-800 hover:border-gray-700"
//                     )}
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
//                         <p className="text-gray-400 mt-1">{plan.description}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                           {typeof plan.price === 'number' ? `€${plan.price}` : plan.price}
//                         </div>
//                         <div className="text-sm text-gray-400">{plan.cycle}</div>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       {plan.features.map((feature, idx) => (
//                         <div key={idx} className="flex items-center text-gray-300">
//                           <Check className="h-5 w-5 text-green-500/80 mr-2 flex-shrink-0" />
//                           <span className="text-sm">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Payment Form */}
//           <div className="lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="border border-gray-800 rounded-lg bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] p-8"
//             >
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <div className="space-y-6">
//                   <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                     Personal Information
//                   </h2>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="name" className="text-gray-300">Full Name</Label>
//                       <div className="mt-1 relative">
//                         <Input
//                           id="name"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           className="pl-10 bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                         <User className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="email" className="text-gray-300">Email</Label>
//                       <div className="mt-1 relative">
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className="pl-10 bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                         <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                     Payment Details
//                   </h2>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
//                       <div className="mt-1 relative">
//                         <Input
//                           id="cardNumber"
//                           name="cardNumber"
//                           value={formData.cardNumber}
//                           onChange={handleInputChange}
//                           className="pl-10 bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                         <CreditCard className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
//                         <Input
//                           id="expiryDate"
//                           name="expiryDate"
//                           value={formData.expiryDate}
//                           onChange={handleInputChange}
//                           placeholder="MM / YY"
//                           className="bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
//                         <Input
//                           id="cvv"
//                           name="cvv"
//                           value={formData.cvv}
//                           onChange={handleInputChange}
//                           className="bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <Button 
//                     type="submit"
//                     className="w-full bg-gray-200 text-black hover:bg-gray-300 py-6 text-lg rounded-md transition-colors"
//                   >
//                     Complete Purchase
//                   </Button>
//                 </motion.div>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;



// 'use client'

// import React from 'react';
// import { Check, ChevronLeft, CreditCard, Mail, User } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { cn } from "@/lib/utils";

// interface Plan {
//   id: string;
//   name: string;
//   price: number;
//   cycle: string;
//   description: string;
//   features: string[];
// }

// interface FormData {
//   name: string;
//   email: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// const plans: Record<string, Plan> = {
//   essential: {
//     id: 'essential',
//     name: "Essential",
//     price: 1.8,
//     cycle: "user/month",
//     description: "Ideal for small teams looking to protect their business.",
//     features: [
//       "Access to essential cybersecurity awareness training modules",
//       "Core analytics",
//       "Email support",
//       "1 administrator seat"
//     ]
//   },
//   advanced: {
//     id: 'advanced',
//     name: "Advanced",
//     price: 3.5,
//     cycle: "user/month",
//     description: "Comprehensive cybersecurity awareness training.",
//     features: [
//       "Everything in Essential",
//       "Access to all core and advanced training modules",
//       "Advanced analytics",
//       "3 administrator seats"
//     ]
//   }
// };

// const CheckoutPage: React.FC = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const selectedPlanId = searchParams.get('plan') || 'essential';
//   const selectedPlan = plans[selectedPlanId];

//   const [formData, setFormData] = React.useState<FormData>({
//     name: '',
//     email: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     try {
//       // Handle submission logic here
//       router.push('/success');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (!selectedPlan) {
//     router.push('/pricing');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <Button 
//           onClick={() => router.push('/pricing')} 
//           variant="ghost"
//           className="mb-8 text-gray-400 hover:text-gray-300"
//         >
//           <ChevronLeft className="h-5 w-5 mr-2" />
//           Back to Pricing
//         </Button>

//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* Left Column - Selected Plan */}
//           <div className="lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1">
//                 Complete Your Purchase
//               </h1>
//               <p className="mt-4 text-xl font-serif italic text-gray-400 mb-8">
//                 Review your plan and enter your details.
//               </p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className={cn(
//                   "rounded-lg overflow-hidden border p-6",
//                   "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset]",
//                   "border-gray-600"
//                 )}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-semibold text-white">{selectedPlan.name}</h3>
//                     <p className="text-gray-400 mt-1">{selectedPlan.description}</p>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                       €{selectedPlan.price}
//                     </div>
//                     <div className="text-sm text-gray-400">{selectedPlan.cycle}</div>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   {selectedPlan.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-center text-gray-300">
//                       <Check className="h-5 w-5 text-green-500/80 mr-2 flex-shrink-0" />
//                       <span className="text-sm">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Right Column - Payment Form */}
//           <div className="lg:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="border border-gray-800 rounded-lg bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] p-8"
//             >
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <div className="space-y-6">
//                   <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                     Personal Information
//                   </h2>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="name" className="text-gray-300">Full Name</Label>
//                       <div className="mt-1 relative">
//                         <Input
//                           id="name"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           className="pl-10 bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                         <User className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="email" className="text-gray-300">Email</Label>
//                       <div className="mt-1 relative">
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className="pl-10 bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                         <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                     Payment Details
//                   </h2>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
//                       <div className="mt-1 relative">
//                         <Input
//                           id="cardNumber"
//                           name="cardNumber"
//                           value={formData.cardNumber}
//                           onChange={handleInputChange}
//                           className="pl-10 bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                         <CreditCard className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
//                         <Input
//                           id="expiryDate"
//                           name="expiryDate"
//                           value={formData.expiryDate}
//                           onChange={handleInputChange}
//                           placeholder="MM / YY"
//                           className="bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
//                         <Input
//                           id="cvv"
//                           name="cvv"
//                           value={formData.cvv}
//                           onChange={handleInputChange}
//                           className="bg-gray-800/50 border-gray-700 text-white"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <Button 
//                     type="submit"
//                     className="w-full bg-gray-200 text-black hover:bg-gray-300 py-6 text-lg rounded-md transition-colors"
//                   >
//                     Complete Purchase
//                   </Button>
//                 </motion.div>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

'use client'

import React from 'react';
import { Check, ChevronLeft, CreditCard, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/label';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  cycle: string;
  description: string;
  features: string[];
}

interface FormData {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const plans: Record<string, Plan> = {
  essential: {
    id: 'essential',
    name: "Essential",
    price: 1.8,
    yearlyPrice: 21.6,
    cycle: "user/month",
    description: "Ideal for small teams looking to protect their business.",
    features: [
      "Access to essential cybersecurity awareness training modules",
      "Core analytics",
      "Email support",
      "1 administrator seat",
      "Role Based training"
    ]
  },
  advanced: {
    id: 'advanced',
    name: "Advanced",
    price: 3.5,
    yearlyPrice: 42,
    cycle: "user/month",
    description: "Comprehensive cybersecurity awareness training.",
    features: [
      "Everything in Essential",
      "Access to all core and advanced training modules",
      "Advanced analytics",
      "3 administrator seats",
      "Weak Points"
    ]
  }
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const selectedPlanId = searchParams.get('plan') || 'essential';
  const billingCycle = searchParams.get('billing') || 'monthly';
  const userCount = parseInt(searchParams.get('users') || '1', 10);
  
  const selectedPlan = plans[selectedPlanId];
  const isYearly = billingCycle === 'yearly';

  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateTotalPrice = () => {
    const basePrice = isYearly ? selectedPlan.yearlyPrice : selectedPlan.price;
    return (basePrice * userCount).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Handle submission logic here
      router.push('/success');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!selectedPlan) {
    router.push('/pricing');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          onClick={() => router.push('/pricing')} 
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-gray-300"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Pricing
        </Button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Selected Plan */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1">
                Complete Your Purchase
              </h1>
              <p className="mt-4 text-xl font-serif italic text-gray-400 mb-8">
                Review your plan and enter your details.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "rounded-lg overflow-hidden border p-6",
                  "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset]",
                  "border-gray-600"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedPlan.name}</h3>
                    <p className="text-gray-400 mt-1">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                      €{calculateTotalPrice()}
                    </div>
                    <div className="text-sm text-gray-400">
                      {isYearly ? 'per year' : 'per month'} for {userCount} user{userCount > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-500/80 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border border-gray-800 rounded-lg bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      <div className="mt-1 relative">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                          required
                        />
                        <User className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <div className="mt-1 relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                          required
                        />
                        <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                    Payment Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
                      <div className="mt-1 relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                          required
                        />
                        <CreditCard className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                      <Label htmlFor="expiryDate" className="text-gray-300">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM / YY"
                          className="bg-gray-800/50 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-gray-300">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="bg-gray-800/50 border-gray-700 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    className="w-full bg-gray-200 text-black hover:bg-gray-300 py-6 text-lg rounded-md transition-colors"
                  >
                    Complete Purchase
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;