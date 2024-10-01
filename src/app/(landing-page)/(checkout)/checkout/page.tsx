'use client'

// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft } from 'lucide-react';

// const CheckoutPage = () => {
//   const plans = {
//     monthly99: { name: 'Basic Monthly Plan', price: 99 },
//     monthly499: { name: 'Premium Monthly Plan', price: 499 },
//     yearly990: { name: 'Basic Yearly Plan', price: 990 },
//     yearly4999: { name: 'Premium Yearly Plan', price: 4999 }
//   };

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

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-xl overflow-hidden relative">
//         <Button 
//           onClick={() => console.log('Navigate back to pricing')} 
//           className="absolute top-4 left-4 p-2 bg-transparent hover:bg-gray-800 rounded-full"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </Button>
        
//         <div className="p-8 pt-16">
//           <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
          
//           <form onSubmit={handleSubmit}>
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(plans).map(([id, plan]) => (
//                   <Card 
//                     key={id}
//                     className={`bg-gray-900 border-2 transition-all cursor-pointer ${selectedPlan === id ? 'border-gray-500 scale-105' : 'border-gray-800 hover:border-gray-700'}`}
//                     onClick={() => setSelectedPlan(id)}
//                   >
//                     <CardContent className="p-4">
//                       <h3 className="font-bold text-lg">{plan.name}</h3>
//                       <p className="text-2xl font-bold mt-2">
//                         ${plan.price}
//                         <span className="text-sm font-normal">
//                           /{id.includes('yearly') ? 'year' : 'month'}
//                         </span>
//                       </p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="bg-gray-900 border-gray-800 text-white"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="bg-gray-900 border-gray-800 text-white"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <Label htmlFor="cardNumber">Card Number</Label>
//                 <Input
//                   id="cardNumber"
//                   name="cardNumber"
//                   value={formData.cardNumber}
//                   onChange={handleInputChange}
//                   required
//                   className="bg-gray-900 border-gray-800 text-white"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="expiryDate">Expiry Date</Label>
//                   <Input
//                     id="expiryDate"
//                     name="expiryDate"
//                     value={formData.expiryDate}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="MM / YY"
//                     className="bg-gray-900 border-gray-800 text-white"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="cvv">CVV</Label>
//                   <Input
//                     id="cvv"
//                     name="cvv"
//                     value={formData.cvv}
//                     onChange={handleInputChange}
//                     required
//                     className="bg-gray-900 border-gray-800 text-white"
//                   />
//                 </div>
//               </div>
//             </div>

//             <Button type="submit" className="mt-8 w-full bg-white text-black hover:bg-gray-200">
//               Complete Purchase
//             </Button>
//           </form>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default CheckoutPage;



import React, { useState } from 'react';
import { Card, CardContent } from '@/components/global/ui/card';
import { Input } from '@/components/global/ui/input';
import { Label } from '@/components/global/ui/label';
import { Button } from '@/components/global/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'

const plans = {
  monthly99: { name: 'Basic Monthly Plan', price: 99 },
  monthly499: { name: 'Premium Monthly Plan', price: 499 },
  yearly990: { name: 'Basic Yearly Plan', price: 990 },
  yearly4999: { name: 'Premium Yearly Plan', price: 4999 }
};



const PlanSelection = ({ selectedPlan, setSelectedPlan }) => (
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

const PersonalInformation = ({ formData, handleInputChange }) => (
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

const CardInformation = ({ formData, handleInputChange }) => (
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

const CheckoutPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly99');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted', { plan: plans[selectedPlan], formData });
  };

  const router = useRouter()

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

export default CheckoutPage;




// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft } from 'lucide-react';

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
//           className={`cursor-pointer transition-all ${selectedPlan === id ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
//           onClick={() => setSelectedPlan(id)}
//         >
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-sm mb-1">{plan.name}</h3>
//             <p className="text-lg font-bold">
//               ${plan.price}
//               <span className="text-xs font-normal ml-1">
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
//   <div className="mb-6">
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

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl bg-gray rounded-lg shadow-lg overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-blue-600 p-8 text-white">
//             <Button 
//               onClick={() => console.log('Navigate back to pricing')} 
//               className="mb-6 p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center"
//             >
//               <ChevronLeft className="h-5 w-5 mr-1" /> Back to Pricing
//             </Button>
            
//             <h1 className="text-3xl font-bold mb-4">Checkout</h1>
//             <p className="mb-8">Complete your purchase and get started with our amazing service!</p>
            
//             <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
//           </div>
          
//           <div className="md:w-1/2 p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
//               <CardInformation formData={formData} handleInputChange={handleInputChange} />

//               <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 text-lg font-semibold rounded transition-colors">
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


// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft } from 'lucide-react';

// const plans = {
//   monthly99: { name: 'Basic Monthly Plan', price: 99 },
//   monthly499: { name: 'Premium Monthly Plan', price: 499 },
//   yearly990: { name: 'Basic Yearly Plan', price: 990 },
//   yearly4999: { name: 'Premium Yearly Plan', price: 4999 }
// };

// const PlanSelection = ({ selectedPlan, setSelectedPlan }) => (
//   <Card className="bg-gray-900 border-gray-800">
//     <CardContent className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {Object.entries(plans).map(([id, plan]) => (
//           <Card 
//             key={id}
//             className={`bg-gray-800 border-2 transition-all cursor-pointer ${selectedPlan === id ? 'border-gray-500 scale-105' : 'border-gray-700 hover:border-gray-600'}`}
//             onClick={() => setSelectedPlan(id)}
//           >
//             <CardContent className="p-4">
//               <h3 className="font-bold text-lg">{plan.name}</h3>
//               <p className="text-2xl font-bold mt-2">
//                 ${plan.price}
//                 <span className="text-sm font-normal">
//                   /{id.includes('yearly') ? 'year' : 'month'}
//                 </span>
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </CardContent>
//   </Card>
// );

// const PersonalInformation = ({ formData, handleInputChange }) => (
//   <Card className="bg-gray-900 border-gray-800">
//     <CardContent className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="name">Full Name</Label>
//           <Input
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// );

// const CardInformation = ({ formData, handleInputChange }) => (
//   <Card className="bg-gray-900 border-gray-800">
//     <CardContent className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Card Information</h2>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="cardNumber">Card Number</Label>
//           <Input
//             id="cardNumber"
//             name="cardNumber"
//             value={formData.cardNumber}
//             onChange={handleInputChange}
//             required
//             className="bg-gray-800 border-gray-700 text-white"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="expiryDate">Expiry Date</Label>
//             <Input
//               id="expiryDate"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleInputChange}
//               required
//               placeholder="MM / YY"
//               className="bg-gray-800 border-gray-700 text-white"
//             />
//           </div>
//           <div>
//             <Label htmlFor="cvv">CVV</Label>
//             <Input
//               id="cvv"
//               name="cvv"
//               value={formData.cvv}
//               onChange={handleInputChange}
//               required
//               className="bg-gray-800 border-gray-700 text-white"
//             />
//           </div>
//         </div>
//       </div>
//     </CardContent>
//   </Card>
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

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-xl overflow-hidden relative">
//         <Button 
//           onClick={() => console.log('Navigate back to pricing')} 
//           className="absolute top-4 left-4 p-2 bg-transparent bg-gray-800 text-white rounded-full"
//         >
//           <ChevronLeft className="h-6 w-6 "/> Back
//         </Button>
        
//         <div className="p-8 pt-16">
//           <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <PlanSelection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
//             <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
//             <CardInformation formData={formData} handleInputChange={handleInputChange} />

//             <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
//               Complete Purchase
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;