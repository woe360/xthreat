import React from 'react';
import Head from 'next/head';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';

const CookiePolicy = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>Cookie Policy - XThreat</title>
        <meta name="description" content="XThreat Cookie Policy" />
      </Head>
      <div className="bg-black min-h-screen text-white relative overflow-hidden pt-20">
        {/* Left gradient */}
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        {/* Right gradient */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-8 pb-4 border-b-2 border-gray-700">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-400 mb-8">Last Updated: 2024-09-19</p>

          <div className="prose prose-lg text-gray-300 mx-auto">
            <p>
              This Cookie Policy explains how XThreat ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at www.xthreat.eu ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, XThreat) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Why do we use cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes. This is described in more detail below.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. The specific types of cookies served through our Website and the purposes they perform</h2>
            <p>Essential website cookies: These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
            <p>Performance and functionality cookies: These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
            <p>Analytics and customization cookies: These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>
            <p>Advertising cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. How can I control cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner or you can set or amend your web browser controls to accept or refuse cookies.
            </p>
            <p>
              If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. How often will you update this Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CookiePolicy;