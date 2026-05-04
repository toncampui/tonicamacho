"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

export default function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if consent is already saved
    const savedConsent = localStorage.getItem("cookie_consent");
    if (savedConsent) {
      setConsent(savedConsent === "true");
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    localStorage.setItem("cookie_consent", "true");
  };

  const handleDecline = () => {
    setConsent(false);
    localStorage.setItem("cookie_consent", "false");
  };

  // Google Tag Manager ID
  const GTM_ID = "GTM-WHTMVWGD";

  // Prevent hydration errors by rendering only on the client
  if (!mounted) return null;

  return (
    <>
      {/* Load Google Tag Manager only if consent is given */}
      {consent === true && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {/* Show the banner if no decision has been made */}
      {consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/90 backdrop-blur-md border-t border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-300">
              <p>
                We use our own and third-party cookies (Google Analytics) to analyze web traffic and improve your user experience. 
                You can read more information in our <a href="/legal" className="text-white underline hover:text-[#863ecc] transition-colors">Privacy Policy</a>.
              </p>
            </div>
            <div className="flex gap-3 whitespace-nowrap">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-md transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-md transition-colors"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
