import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import { Akshar, Khand, Manrope, Gemunu_Libre } from "next/font/google";

const akshar = Akshar({ subsets: ["latin"] });
const khand = Khand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const manrope = Manrope({ subsets: ["latin"], preload: false });
const gemunuLibre = Gemunu_Libre({ subsets: ["latin"], preload: false });

import * as gtag from "../lib/gtag";
import * as fbq from "../lib/fpixel";
import "../styles/globals.css";
import "../styles/carPay.css";
import "../styles/admin.css";
// import "../styles/calendar.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    fbq.pageview();
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      fbq.pageview();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <div
      className={`${akshar.className} ${khand.className} ${manrope.className} ${gemunuLibre.className}`}
    >
      <Head>
        <title>RND</title>
        <link rel="shortcut icon" href="/img/RNDBlack2.svg" />
        <link rel="icon" href="/img/RNDBlack2.svg" />
        <meta
          name="facebook-domain-verification"
          content="5yr3moibq3quc8mlhc65p4ore1426a"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `}
      </Script>
      {/* Pendo */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(apiKey){
                  (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
                  v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
                      o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
                      y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
                      z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');

                      // Call this whenever information about your visitors becomes available
                      // Please use Strings, Numbers, or Bools for value types.
                      pendo.initialize({
                          visitor: {
                              id:              'VISITOR-UNIQUE-ID'   // Required if user is logged in
                              // email:        // Recommended if using Pendo Feedback, or NPS Email
                              // full_name:    // Recommended if using Pendo Feedback
                              // role:         // Optional

                              // You can add any additional visitor level key-values here,
                              // as long as it's not one of the above reserved names.
                          },

                          account: {
                              id:           'ACCOUNT-UNIQUE-ID' // Required if using Pendo Feedback
                              // name:         // Optional
                              // is_paying:    // Recommended if using Pendo Feedback
                              // monthly_value:// Recommended if using Pendo Feedback
                              // planLevel:    // Optional
                              // planPrice:    // Optional
                              // creationDate: // Optional

                              // You can add any additional account level key-values here,
                              // as long as it's not one of the above reserved names.
                          }
                      });
              })(${process.env.NEXT_PUBLIC_PENDO_KEY});
            `,
        }}
      />
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
            fbq('track', 'PageView');
          `,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;
