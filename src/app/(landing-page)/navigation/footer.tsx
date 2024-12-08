// 'use client'

// import Image from 'next/image';
// import Link from "next/link";
// import React from 'react';
// import XLogo from '../assets/XThreat_Logotype_primary_gradient_to_white.svg'

// const Footer: React.FC = () => (
//   <footer className="bg-black font-sans text-white py-4 mt-20">
//     <div className="max-w-[1330px] mx-auto px-6">
//       <nav className="flex flex-wrap justify-between items-start text-xs text-gray-400 mb-8">
//         <div className="space-y-2">
//           <span className="text-gray-400">Company</span>
//           <div className="flex flex-col space-y-1 mt-2">
//             <Link href="/contact" className="text-gray-500 hover:text-white">Contact</Link>
//             <Link href="/about" className="text-gray-500 hover:text-white">About</Link>
//             <Link href="/pricing" className="text-gray-500 hover:text-white">Pricing</Link>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400">Solutions</span>
//           <div className="flex flex-col space-y-1 mt-2">
//             <Link href="/phishing-awareness" className="text-gray-500 hover:text-white">Phishing Awareness</Link>
//             <Link href="/security-awareness" className="text-gray-500 hover:text-white">Security Awareness</Link>
//             <Link href="/role-based-training" className="text-gray-500 hover:text-white">Role Based Training</Link>
//             <Link href="/custom-trainings" className="text-gray-500 hover:text-white">Custom Trainings</Link>
//             <Link href="/weak-points" className="text-gray-500 hover:text-white">Weak Points</Link>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400">Socials</span>
//           <div className="flex flex-col space-y-1 mt-2">
//             <a href="https://linkedin.com/company/xthreat" className="text-gray-500 hover:text-white">LinkedIn</a>
//             <a href="https://facebook.com/xthreat" className="text-gray-500 hover:text-white">Facebook</a>
//             <a href="https://instagram.com/xthreat.eu" className="text-gray-500 hover:text-white">Instagram</a>
//             <a href="https://x.com/xthreateu" className="text-gray-500 hover:text-white">X / Twitter</a>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400">Legal</span>
//           <div className="flex flex-col space-y-1 mt-2">
//             <Link href="/terms" className="text-gray-500 hover:text-white">Terms</Link>
//             <Link href="/privacy" className="text-gray-500 hover:text-white">Privacy</Link>
//             <Link href="/cookies" className="text-gray-500 hover:text-white">Cookies</Link>
//           </div>
//         </div>

//         <div className="text-left space-y-2">
//           <span className="text-gray-400">Offices</span>
//           <div className="text-xs text-gray-500 mt-2">
//             Madrid, Spain<br />
//             Vilnius, Lithuania<br />
//           </div>
//         </div>

//         <div className="text-xs text-left text-gray-500 w-[200px]">
//           <div>
//             <div className="text-gray-400">© 2024 XThreat</div>
//             All Rights Reserved. Training materials, content, and methodologies
//             are proprietary. Unauthorized use or distribution is prohibited
//             and subject to legal action.
//           </div>
//         </div>
//       </nav>

//       <Link href="/">
//         <div className="w-full relative mt-20 mb-10 select-none pointer-events-none flex justify-center">
          
//           <Image
//             src={XLogo}
//             alt="X Logo"
//             width={280}
//             height={280}
//             className="w-full h-auto"
//           />
//         </div>
//       </Link>

//     </div>
//   </footer>
// );

// export default Footer;


// 'use client'

// import Image from 'next/image';
// import Link from "next/link";
// import React from 'react';
// import XLogo from '../assets/XThreat_Logotype_primary_gradient_to_white.svg'

// const Footer: React.FC = () => (
//   <footer className="bg-black font-sans text-white py-4 mt-20">
//     <div className="max-w-[1330px] mx-auto px-4 sm:px-6">
//       <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 text-xs text-gray-400 mb-8">
        
//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Company</span>
//           <div className="flex flex-col space-y-1">
//             <Link href="/about" className="text-gray-500 hover:text-white transition-colors">About</Link>
//             <a href="mailto:careers@xthreat.com" className="text-gray-500 hover:text-white transition-colors">Careers</a>
//             <Link href="/pricing" className="text-gray-500 hover:text-white transition-colors">Pricing</Link>
//             <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Solutions</span>
//           <div className="flex flex-col space-y-1">
//             <Link href="/phishing-awareness" className="text-gray-500 hover:text-white transition-colors">Phishing Awareness</Link>
//             <Link href="/security-awareness" className="text-gray-500 hover:text-white transition-colors">Security Awareness</Link>
//             <Link href="/role-based-training" className="text-gray-500 hover:text-white transition-colors">Role Based Training</Link>
//             <Link href="/custom-trainings" className="text-gray-500 hover:text-white transition-colors">Custom Trainings</Link>
//             <Link href="/weak-points" className="text-gray-500 hover:text-white transition-colors">Weak Points</Link>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Socials</span>
//           <div className="flex flex-col space-y-1">
//             <a href="https://linkedin.com/company/xthreat" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
//             <a href="https://facebook.com/xthreat" className="text-gray-500 hover:text-white transition-colors">Facebook</a>
//             <a href="https://instagram.com/xthreat.eu" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
//             <a href="https://x.com/xthreateu" className="text-gray-500 hover:text-white transition-colors">X / Twitter</a>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Legal</span>
//           <div className="flex flex-col space-y-">
//             <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
//             <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
//             <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">Cookies</Link>
//           </div>
//         </div>

//         <div className="space-y-2 order-last lg:order-none">
//           <span className="text-gray-400 block font-medium mb-3">Offices</span>
//           <div className="text-gray-500">
//             Madrid, Spain<br />
//             Vilnius, Lithuania<br />
//           </div>
//         </div>

//         <div className="space-y-2 order-last">
//           <div className="text-gray-500">
//             <div className="text-gray-400 mb-2">© 2024 XThreat</div>
//             All Rights Reserved. Training materials, content, and methodologies
//             are proprietary. Unauthorized use or distribution is prohibited
//             and subject to legal action.
//           </div>
//         </div>
//       </nav>

//       <Link href="/">
//         <div className="w-full relative mt-20 mb-10 select-none pointer-events-none flex justify-center">
//           <Image
//             src={XLogo}
//             alt="X Logo"
//             width={280}
//             height={280}
//             priority
//             className="w-full h-auto"
//           />
//         </div>
//       </Link>
//     </div>
//   </footer>
// );

// export default Footer;


// 'use client'

// import Image from 'next/image';
// import Link from "next/link";
// import React from 'react';
// import XLogo from '../assets/XThreat_Logotype_primary_gradient_to_white.svg'

// const Footer: React.FC = () => (
//   <footer className="bg-black font-sans text-white py-4 mt-20">
//     <div className="max-w-[1330px] mx-auto px-4 sm:px-6">
//       {/* <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-between gap-x-8 gap-y-10 text-xs text-gray-400 mb-8"> */}
//       <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 text-xs text-gray-400 mb-8 [&>*:nth-child(6)]:lg:ml-auto">
        
//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Company</span>
//           <div className="flex flex-col">
//             <Link href="/about" className="text-gray-500 hover:text-white transition-colors">About</Link>
//             <a href="mailto:careers@xthreat.com" className="text-gray-500 hover:text-white transition-colors">Careers</a>
//             <Link href="/pricing" className="text-gray-500 hover:text-white transition-colors">Pricing</Link>
//             <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Solutions</span>
//           <div className="flex flex-col">
//             <Link href="/phishing-awareness" className="text-gray-500 hover:text-white transition-colors">Phishing Awareness</Link>
//             <Link href="/security-awareness" className="text-gray-500 hover:text-white transition-colors">Security Awareness</Link>
//             <Link href="/role-based-training" className="text-gray-500 hover:text-white transition-colors">Role Based Training</Link>
//             <Link href="/custom-trainings" className="text-gray-500 hover:text-white transition-colors">Custom Trainings</Link>
//             <Link href="/weak-points" className="text-gray-500 hover:text-white transition-colors">Weak Points</Link>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Socials</span>
//           <div className="flex flex-col">
//             <a href="https://linkedin.com/company/xthreat" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
//             <a href="https://facebook.com/xthreat" className="text-gray-500 hover:text-white transition-colors">Facebook</a>
//             <a href="https://instagram.com/xthreat.eu" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
//             <a href="https://x.com/xthreateu" className="text-gray-500 hover:text-white transition-colors">X / Twitter</a>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <span className="text-gray-400 block font-medium mb-3">Legal</span>
//           <div className="flex flex-col">
//             <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
//             <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
//             <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">Cookies</Link>
//           </div>
//         </div>

//         <div className="space-y-2 order-last lg:order-none">
//           <span className="text-gray-400 block font-medium mb-3">Offices</span>
//           <div className="text-gray-500">
//             Madrid, Spain<br />
//             Vilnius, Lithuania<br />
//           </div>
//         </div>

//         <div className="space-y-2 order-last">
//           <span className="text-gray-400 block font-medium mb-3">© 2024 XThreat</span>
//           <div className="text-gray-500">
//             All Rights Reserved. Training materials, content, and methodologies
//             are proprietary. Unauthorized use or distribution is prohibited
//             and subject to legal action.
//           </div>
//         </div>
//       </nav>

//       <Link href="/">
//         <div className="w-full relative mt-20 mb-10 select-none pointer-events-none flex justify-center">
//           <Image
//             src={XLogo}
//             alt="X Logo"
//             width={280}
//             height={280}
//             priority
//             className="w-full h-auto"
//           />
//         </div>
//       </Link>
//     </div>
//   </footer>
// );

// export default Footer;

'use client'

import Image from 'next/image';
import Link from "next/link";
import React from 'react';
import XLogo from '../assets/XThreat_Logotype_primary_gradient_to_white.svg'

const Footer: React.FC = () => (
  <footer className="bg-black font-sans text-white py-4 mt-20">
    <div className="max-w-[1330px] mx-auto px-4 sm:px-6">
      <nav className="flex flex-wrap grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between items-start text-xs text-gray-400 mb-8 gap-x-8 gap-y-10">
        
        <div className="space-y-2">
          <span className="text-gray-400 block font-medium mb-3">Company</span>
          <div className="flex flex-col">
            <Link href="/about" className="text-gray-500 hover:text-white transition-colors">About</Link>
            <a href="mailto:careers@xthreat.com" className="text-gray-500 hover:text-white transition-colors">Careers</a>
            <Link href="/pricing" className="text-gray-500 hover:text-white transition-colors">Pricing</Link>
            <Link href="/contact" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-gray-400 block font-medium mb-3">Solutions</span>
          <div className="flex flex-col">
            <Link href="/phishing-awareness" className="text-gray-500 hover:text-white transition-colors">Phishing Awareness</Link>
            <Link href="/security-awareness" className="text-gray-500 hover:text-white transition-colors">Security Awareness</Link>
            <Link href="/role-based-training" className="text-gray-500 hover:text-white transition-colors">Role Based Training</Link>
            <Link href="/custom-trainings" className="text-gray-500 hover:text-white transition-colors">Custom Trainings</Link>
            <Link href="/weak-points" className="text-gray-500 hover:text-white transition-colors">Weak Points</Link>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-gray-400 block font-medium mb-3">Socials</span>
          <div className="flex flex-col">
            <a href="https://linkedin.com/company/xthreat" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://facebook.com/xthreat" className="text-gray-500 hover:text-white transition-colors">Facebook</a>
            <a href="https://instagram.com/xthreat.eu" className="text-gray-500 hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com/xthreateu" className="text-gray-500 hover:text-white transition-colors">X / Twitter</a>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-gray-400 block font-medium mb-3">Legal</span>
          <div className="flex flex-col">
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

        <div className="space-y-2 order-last lg:order-none">
          <span className="text-gray-400 block font-medium mb-3">Offices</span>
          <div className="text-gray-500">
            Madrid, Spain<br />
            Vilnius, Lithuania<br />
          </div>
        </div>

        <div className="space-y-2 order-last lg:w-[200px]">
          <span className="text-gray-400 block font-medium mb-3">© 2024 XThreat</span>
          <div className="text-gray-500">
            All Rights Reserved. Training materials, content, and methodologies
            are proprietary. Unauthorized use or distribution is prohibited
            and subject to legal action.
          </div>
        </div>
      </nav>

      <Link href="/">
        <div className="w-full relative mt-20 mb-10 select-none pointer-events-none flex justify-center">
          <Image
            src={XLogo}
            alt="X Logo"
            width={280}
            height={280}
            priority
            className="w-full h-auto"
          />
        </div>
      </Link>
    </div>
  </footer>
);

export default Footer;