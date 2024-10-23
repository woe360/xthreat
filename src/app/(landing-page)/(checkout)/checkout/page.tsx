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

'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'

// Define types
interface Plan {
  name: string;
  price: number;
}

interface Plans {
  [key: string]: Plan;
}

interface FormData {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PlanSelectionProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

interface PersonalInformationProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CardInformationProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const plans: Plans = {
  monthly99: { name: 'Basic Monthly Plan', price: 99 },
  monthly499: { name: 'Premium Monthly Plan', price: 499 },
  yearly990: { name: 'Basic Yearly Plan', price: 990 },
  yearly4999: { name: 'Premium Yearly Plan', price: 4999 }
};

const PlanSelection: React.FC<PlanSelectionProps> = ({ selectedPlan, setSelectedPlan }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(plans).map(([id, plan]) => (
        <Card 
          key={id}
          className={`cursor-pointer transition-all ${selectedPlan === id ? 'border-blue-400 shadow-md bg-blue-900' : 'border-gray-700 hover:border-gray-500 bg-gray-800'}`}
          onClick={() => setSelectedPlan(id)}
        >
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-1">{plan.name}</h3>
            <p className="text-xl font-bold">
              ${plan.price}
              <span className="font-normal ml-1">
                /{id.includes('yearly') ? 'year' : 'month'}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const PersonalInformation: React.FC<PersonalInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-6 border-b">
    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-1 block">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-1 block">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </div>
  </div>
);

const CardInformation: React.FC<CardInformationProps> = ({ formData, handleInputChange }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4">Card Information</h2>
    <div className="space-y-4">
      <div>
        <Label htmlFor="cardNumber" className="mb-1 block">Card Number</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate" className="mb-1 block">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            required
            placeholder="MM / YY"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="cvv" className="mb-1 block">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  </div>
);

const CheckoutPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly99');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Replace console.log with proper API call or error handling
      const response = await submitOrder({ plan: plans[selectedPlan], formData });
      // Handle successful submission
      router.push('/success'); // Redirect to success page
    } catch (error) {
      // Handle error appropriately
      if (error instanceof Error) {
        // Show error message to user
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-black flex items-center justify-center p-4 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
      <div className="w-full max-w-6xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gradient-to-br from-black to-gray-700 p-8 text-white">
            <Button 
              onClick={() => router.back()} 
              className="mb-5 px-3 bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-300 rounded-full flex items-center"
            >
              <ChevronLeft className="h-5 w-5 mr-1" /> Back
            </Button>
            
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <p className="mb-8">Complete your purchase and improve your business cyber security!</p>
            
            <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
          </div>
          
          <div className="md:w-1/2 p-8 text-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
              <CardInformation formData={formData} handleInputChange={handleInputChange} />

              <Button type="submit" className="w-full bg-blue-900 text-white hover:bg-blue-800 py-2 text-lg rounded transition-colors">
                Complete Purchase
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this function to handle order submission
async function submitOrder(data: { plan: Plan; formData: FormData }): Promise<any> {
  // Implement your API call here
  return Promise.resolve(); // Temporary placeholder
}

export default CheckoutPage;