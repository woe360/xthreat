// 'use client'
// import { useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
// import Link from 'next/link';

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Sign in attempted with:', email);
//   };

//   const handleGoogleSignIn = () => {
//     console.log('Google Sign-In attempted');
//   };

//   const handleSSOSignIn = () => {
//     console.log('SSO Sign-In attempted');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       {/* <Head>
//         <title>XThreat</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head> */}

//       <div className="max-w-md w-full space-y-8">
//         {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
//           Sign In
//         </h2> */}

//         <div className="mt-8 bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <div className=" bg-black py-4 mb-4 px-4 shadow sm:rounded-lg sm:px-10">
//             <Link href="/">
//               <Image
//                 src={XLogo}
//                 alt="X Logo"
//                 width={16}
//                 height={16}
//                 className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
//               />
//             </Link>
//           </div>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-600 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//               <div>
//               <label htmlFor="password" className="block text-sm sr-only font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   placeholder="Password"
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-600 sm:text-sm"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 onClick={(e) => {
//                     e.preventDefault();
//                     // Here you would typically handle form submission
//                     // After successful sign-in:
//                     window.location.href = '/dashboard';
//                   }}
                
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-black text-gray-400">Or continue with</span>
//               </div>
//             </div>

//             <div className="mt-6 space-y-4">
//               <button
//                 onClick={handleSSOSignIn}
//                 className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
//                 </svg>
//                 Login with SSO
//               </button>

//               <button
//                 onClick={handleGoogleSignIn}
//                 className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
//                 </svg>
//                 Sign in with Google
//               </button>
//             </div>

//             <div className="relative">
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 mt-5 bg-black text-gray-400">support@xthreat.eu</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client'
// import { useState } from 'react';
// import Image from 'next/image';
// import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
// import Link from 'next/link';
// import { Copy } from 'lucide-react';

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Sign in attempted with:', email);
//   };

//   const handleGoogleSignIn = () => {
//     console.log('Google Sign-In attempted');
//   };

//   const handleSSOSignIn = () => {
//     console.log('SSO Sign-In attempted');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
//           <div className="bg-transparent py-4 mb-4 px-4 shadow rounded-xl sm:px-10">
//             <Link href="/">
//               <Image
//                 src={XLogo}
//                 alt="X Logo"
//                 width={16}
//                 height={16}
//                 className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
//               />
//             </Link>
//           </div>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <BottomGradient />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <BottomGradient />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm sr-only font-medium text-gray-700">
//                 Password
//               </label>
//               <BottomGradient />

//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   placeholder="Password"
//                   required
//                   className="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] sm:text-sm"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />              <BottomGradient />

//               </div>
//               <BottomGradient />

//             </div>

//             <div>
//               <button
//                 type="submit"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   window.location.href = '/dashboard';
//                 }}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
//               >
//                 Continue
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-gray-900 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] font-serif italic text-gray-400">OR</span>
//               </div>
//             </div>

//             {/* <div className="mt-6 space-y-4">
//               <button
//                 onClick={handleSSOSignIn}
//                 className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-900/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <div className="mb-1">
//                   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,300,150">
//                   <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M29,8.53125c-5.215,0 -9.629,3.12125 -11.75,7.53125c-1.129,-0.777 -2.43825,-1.34375 -3.90625,-1.34375c-3.727,0 -6.69925,2.949 -6.90625,6.625c-3.727,1.345 -6.4375,4.82 -6.4375,9c0,5.328 4.32825,9.65625 9.65625,9.65625h31.4375c4.906,0 8.90625,-4.00025 8.90625,-8.90625c0,-4.551 -3.49225,-8.1675 -7.90625,-8.6875c0.016,-0.242 0.0625,-0.46875 0.0625,-0.71875c0,-7.249 -5.90625,-13.15625 -13.15625,-13.15625zM29,10.53125c6.172,0 11.15625,4.98825 11.15625,11.15625c0,0.457 -0.03475,0.906 -0.09375,1.375l-0.15625,1.125h1.1875c3.824,0 6.90625,3.08225 6.90625,6.90625c0,3.824 -3.08225,6.90625 -6.90625,6.90625h-31.4375c-4.25,0 -7.65625,-3.41025 -7.65625,-7.65625c0,-3.535 2.383,-6.51225 5.625,-7.40625l0.75,-0.1875l-0.03125,-0.8125c-0.004,-0.141 0,-0.21075 0,-0.21875c0,-2.777 2.223,-5 5,-5c1.391,0 2.6565,0.55875 3.5625,1.46875l1.09375,1.125l0.53125,-1.46875c1.574,-4.249 5.65975,-7.3125 10.46875,-7.3125zM30.54688,16.20898l-6.18359,6.18164c-0.60221,-0.18504 -1.20098,-0.39062 -1.86328,-0.39062c-3.57827,0 -6.5,2.92173 -6.5,6.5c0,3.57827 2.92173,6.5 6.5,6.5c3.57827,0 6.5,-2.92173 6.5,-6.5c0,-0.67292 -0.21117,-1.28014 -0.40234,-1.89062l0.5957,-0.59375h1.53906v-1.49805h1.49805v-1.51172h1.53516v-1.53711h-0.02734l1.04297,-1.04297l-0.05078,-0.47656l-0.36523,-3.41797zM31.30273,18.2793l1.25,0.10547l0.13867,1.30273l-6.36133,6.35938l0.28125,0.62695c0.2498,0.56123 0.38867,1.17541 0.38867,1.82617c0,2.49773 -2.00227,4.5 -4.5,4.5c-2.49773,0 -4.5,-2.00227 -4.5,-4.5c0,-2.49773 2.00227,-4.5 4.5,-4.5c0.64317,0 1.24938,0.13575 1.80469,0.37891l0.625,0.27344zM21.5,28c-0.82843,0 -1.5,0.67157 -1.5,1.5c0,0.82843 0.67157,1.5 1.5,1.5c0.82843,0 1.5,-0.67157 1.5,-1.5c0,-0.82843 -0.67157,-1.5 -1.5,-1.5z"></path></g></g>
//                   </svg>
//                 </div>  
//                 <span className="mt-[8px] ml-2">SSO</span>
//               </button>

//               <button
//                 onClick={handleGoogleSignIn}
//                 className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-900/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
//                 <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8,8)"><path d="M16.00391,14.0625v4.20313h5.98828c-0.78125,2.54688 -2.91016,4.37109 -5.98828,4.37109c-3.66406,0 -6.63672,-2.97266 -6.63672,-6.63672c0,-3.66406 2.96875,-6.63672 6.63672,-6.63672c1.64844,0 3.15234,0.60547 4.3125,1.60156l3.09375,-3.09766c-1.95312,-1.78125 -4.55469,-2.86719 -7.40625,-2.86719c-6.07812,0 -11.00391,4.92578 -11.00391,11c0,6.07422 4.92578,11 11.00391,11c9.23438,0 11.27344,-8.63672 10.36719,-12.92187z"></path></g></g>
//                 </svg>
//                 Google
//               </button>
//             </div> */}

//               <div className="mt-6 space-y-4">
//                 <button
//                   onClick={handleSSOSignIn}
//                   className="w-full flex items-center justify-center px-4 py-1 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-900/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b87121]"
//                 >
//                   <div className="mb-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,300,150" className="mr-2">
//                       <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(5.12,5.12)"><path d="M29,8.53125c-5.215,0 -9.629,3.12125 -11.75,7.53125c-1.129,-0.777 -2.43825,-1.34375 -3.90625,-1.34375c-3.727,0 -6.69925,2.949 -6.90625,6.625c-3.727,1.345 -6.4375,4.82 -6.4375,9c0,5.328 4.32825,9.65625 9.65625,9.65625h31.4375c4.906,0 8.90625,-4.00025 8.90625,-8.90625c0,-4.551 -3.49225,-8.1675 -7.90625,-8.6875c0.016,-0.242 0.0625,-0.46875 0.0625,-0.71875c0,-7.249 -5.90625,-13.15625 -13.15625,-13.15625zM29,10.53125c6.172,0 11.15625,4.98825 11.15625,11.15625c0,0.457 -0.03475,0.906 -0.09375,1.375l-0.15625,1.125h1.1875c3.824,0 6.90625,3.08225 6.90625,6.90625c0,3.824 -3.08225,6.90625 -6.90625,6.90625h-31.4375c-4.25,0 -7.65625,-3.41025 -7.65625,-7.65625c0,-3.535 2.383,-6.51225 5.625,-7.40625l0.75,-0.1875l-0.03125,-0.8125c-0.004,-0.141 0,-0.21075 0,-0.21875c0,-2.777 2.223,-5 5,-5c1.391,0 2.6565,0.55875 3.5625,1.46875l1.09375,1.125l0.53125,-1.46875c1.574,-4.249 5.65975,-7.3125 10.46875,-7.3125zM30.54688,16.20898l-6.18359,6.18164c-0.60221,-0.18504 -1.20098,-0.39062 -1.86328,-0.39062c-3.57827,0 -6.5,2.92173 -6.5,6.5c0,3.57827 2.92173,6.5 6.5,6.5c3.57827,0 6.5,-2.92173 6.5,-6.5c0,-0.67292 -0.21117,-1.28014 -0.40234,-1.89062l0.5957,-0.59375h1.53906v-1.49805h1.49805v-1.51172h1.53516v-1.53711h-0.02734l1.04297,-1.04297l-0.05078,-0.47656l-0.36523,-3.41797zM31.30273,18.2793l1.25,0.10547l0.13867,1.30273l-6.36133,6.35938l0.28125,0.62695c0.2498,0.56123 0.38867,1.17541 0.38867,1.82617c0,2.49773 -2.00227,4.5 -4.5,4.5c-2.49773,0 -4.5,-2.00227 -4.5,-4.5c0,-2.49773 2.00227,-4.5 4.5,-4.5c0.64317,0 1.24938,0.13575 1.80469,0.37891l0.625,0.27344zM21.5,28c-0.82843,0 -1.5,0.67157 -1.5,1.5c0,0.82843 0.67157,1.5 1.5,1.5c0.82843,0 1.5,-0.67157 1.5,-1.5c0,-0.82843 -0.67157,-1.5 -1.5,-1.5z"></path></g></g>
//                     </svg>
//                   </div>
//                   <span>SSO</span>
//                 </button>

//                 <button
//                   onClick={handleGoogleSignIn}
//                   className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-900/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b87121]"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" className="mr-2">
//                     <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8,8)"><path d="M16.00391,14.0625v4.20313h5.98828c-0.78125,2.54688 -2.91016,4.37109 -5.98828,4.37109c-3.66406,0 -6.63672,-2.97266 -6.63672,-6.63672c0,-3.66406 2.96875,-6.63672 6.63672,-6.63672c1.64844,0 3.15234,0.60547 4.3125,1.60156l3.09375,-3.09766c-1.95312,-1.78125 -4.55469,-2.86719 -7.40625,-2.86719c-6.07812,0 -11.00391,4.92578 -11.00391,11c0,6.07422 4.92578,11 11.00391,11c9.23438,0 11.27344,-8.63672 10.36719,-12.92187z"></path></g></g>
//                   </svg>
//                   <span>Google</span>
//                 </button>
//               </div>

//             <div className="relative">
//               <div className="relative flex flex-row  justify-center text-sm">
//                 <span className="px-2 mt-5 bg-transparent text-gray-400">support@xthreat.eu</span>
//                 <Copy className=/>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import { useState } from 'react';
import Image from 'next/image';
import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
import Link from 'next/link';
import { Copy } from 'lucide-react';

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in attempted with:', email);
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In attempted');
  };

  const handleSSOSignIn = () => {
    console.log('SSO Sign-In attempted');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('support@xthreat.eu').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
          <div className="bg-transparent py-4 mb-4 px-4 shadow rounded-xl sm:px-10">
            <Link href="/">
              <Image
                src={XLogo}
                alt="X Logo"
                width={16}
                height={16}
                className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
              />
            </Link>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <BottomGradient />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <BottomGradient />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm sr-only font-medium text-gray-700">
                Password
              </label>
              <BottomGradient />
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <BottomGradient />
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/dashboard';
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Continue
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-900/30 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b87121]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" className="mr-2">
                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8,8)"><path d="M16.00391,14.0625v4.20313h5.98828c-0.78125,2.54688 -2.91016,4.37109 -5.98828,4.37109c-3.66406,0 -6.63672,-2.97266 -6.63672,-6.63672c0,-3.66406 2.96875,-6.63672 6.63672,-6.63672c1.64844,0 3.15234,0.60547 4.3125,1.60156l3.09375,-3.09766c-1.95312,-1.78125 -4.55469,-2.86719 -7.40625,-2.86719c-6.07812,0 -11.00391,4.92578 -11.00391,11c0,6.07422 4.92578,11 11.00391,11c9.23438,0 11.27344,-8.63672 10.36719,-12.92187z"></path></g></g>
              </svg>
              <span>Google</span>
            </button>
          </div>

          <div className="relative">
            <div className="relative flex flex-row items-center justify-center text-sm mt-5">
              <span className="text-gray-400">support@xthreat.eu</span>
              <button
                onClick={copyToClipboard}
                className="ml-2 text-gray-400 hover:text-gray-300 focus:outline-none"
                aria-label="Copy email"
              >
                <Copy size={16} />
              </button>
              {copied && (
                <span className="ml-2 text-green-500 text-xs">Copied!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import React from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";

// export function SignupFormDemo() {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted");
//   };
//   return (
//     <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Welcome to Aceternity
//       </h2>
//       <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
//         Login to aceternity if you can because we don&apos;t have a login flow
//         yet
//       </p>

//       <form className="my-8" onSubmit={handleSubmit}>
//         <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
//           <LabelInputContainer>
//             <Label htmlFor="firstname">First name</Label>
//             <Input id="firstname" placeholder="Tyler" type="text" />
//           </LabelInputContainer>
//           <LabelInputContainer>
//             <Label htmlFor="lastname">Last name</Label>
//             <Input id="lastname" placeholder="Durden" type="text" />
//           </LabelInputContainer>
//         </div>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" placeholder="••••••••" type="password" />
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-8">
//           <Label htmlFor="twitterpassword">Your twitter password</Label>
//           <Input
//             id="twitterpassword"
//             placeholder="••••••••"
//             type="twitterpassword"
//           />
//         </LabelInputContainer>

//         <button
//           className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//           type="submit"
//         >
//           Sign up &rarr;
//           <BottomGradient />
//         </button>

//         <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

//         <div className="flex flex-col space-y-4">
//           <button
//             className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
//             type="submit"
//           >
//             <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
//             <span className="text-neutral-700 dark:text-neutral-300 text-sm">
//               GitHub
//             </span>
//             <BottomGradient />
//           </button>
//           <button
//             className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
//             type="submit"
//           >
//             <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
//             <span className="text-neutral-700 dark:text-neutral-300 text-sm">
//               Google
//             </span>
//             <BottomGradient />
//           </button>
//           <button
//             className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
//             type="submit"
//           >
//             <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
//             <span className="text-neutral-700 dark:text-neutral-300 text-sm">
//               OnlyFans
//             </span>
//             <BottomGradient />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };


