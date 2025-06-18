'use client'

import Image from 'next/image';
import Link from "next/link";
import React from 'react';
import XLogo from '../assets/XThreat_Logotype_primary_gradient_to_white.svg'

const Footer: React.FC = () => (
  <footer className="font-sans text-white py-4 mt-20">
    <div className="max-w-[1330px] mx-auto px-7 sm:px-6">
      <nav className="hidden lg:flex lg:flex-wrap lg:justify-between items-start text-xs text-neutral-400 mb-8 gap-x-8 gap-y-10">
        {/* Desktop Layout */}
        <div className="space-y-2">
          <span className="text-neutral-400 block font-medium mb-5">Company</span>
          <div className="flex space-y-2 flex-col">
            <Link href="/about" className="text-neutral-500 hover:text-white transition-colors">About</Link>
            <Link href="/services" className="text-neutral-500 hover:text-white transition-colors">Services</Link>
            <Link href="/solutions" className="text-neutral-500 hover:text-white transition-colors">Solutions</Link>
            <a href="mailto:careers@xthreat.com" className="text-neutral-500 hover:text-white transition-colors">Careers</a>
            <Link href="/pricing" className="text-neutral-500 hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block font-medium mb-5">Socials</span>
          <div className="flex space-y-2 flex-col">
            <a href="https://linkedin.com/company/xthreat" className="text-neutral-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://facebook.com/xthreat" className="text-neutral-500 hover:text-white transition-colors">Facebook</a>
            <a href="https://instagram.com/xthreat.eu" className="text-neutral-500 hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com/xthreateu" className="text-neutral-500 hover:text-white transition-colors">X / Twitter</a>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-neutral-400 block font-medium mb-5">Legal</span>
          <div className="flex space-y-2 flex-col">
            <Link href="/terms" className="text-neutral-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-neutral-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-neutral-500 hover:text-white transition-colors">Cookies</Link>
            <Link href="/contact" className="text-neutral-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* <div className="space-y-2">
          <span className="text-neutral-400 block font-medium mb-5">Offices</span>
          <div className="flex space-y-2 flex-col">
            <div className="text-neutral-500">Madrid, Spain</div>
            <div className="text-neutral-500">Vilnius, Lithuania</div>
          </div>
        </div> */}

        <div className="space-y-2 lg:w-[200px]">
          <span className="text-neutral-400 block font-medium mb-5">XThreat © 2025</span>
          <p className="text-neutral-500 leading-loose">
          Training content & methodologies are proprietary. Unauthorized use or distribution is prohibited & subject to legal action.
          </p>
        </div>
      </nav>

      {/* Mobile Layout */}
      <div className="lg:hidden grid grid-cols-2 gap-x-8 gap-y-6 text-xs mb-8">
        <div className="contents">
          <div className="text-neutral-400 font-medium">Company</div>
          <div className="flex flex-col space-y-2 text-neutral-500">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <a href="mailto:careers@xthreat.com" className="hover:text-white transition-colors">Careers</a>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <div className="contents">
          <div className="text-neutral-400 font-medium">Socials</div>
          <div className="flex flex-col space-y-2 text-neutral-500">
            <a href="https://linkedin.com/company/xthreat" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://facebook.com/xthreat" className="hover:text-white transition-colors">Facebook</a>
            <a href="https://instagram.com/xthreat.eu" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com/xthreateu" className="hover:text-white transition-colors">X / Twitter</a>
          </div>
        </div>

        <div className="contents">
          <div className="text-neutral-400 font-medium">Legal</div>
          <div className="flex flex-col space-y-2 text-neutral-500">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

        {/* <div className="contents">
          <div className="text-neutral-400 font-medium">Offices</div>
          <div className="text-neutral-500">
            Madrid, Spain<br />
            Vilnius, Lithuania
          </div>
        </div> */}

        <div className="col-span-2 mt-4">
          <div className="text-neutral-400 font-medium mb-2">XThreat © 2025</div>
          <div className="text-neutral-500">
            All Rights Reserved. Training materials, content, and methodologies
            are proprietary. Unauthorized use or distribution is prohibited
            and subject to legal action.
          </div>
        </div>
      </div>

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