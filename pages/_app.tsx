import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as ga from "../lib/ga";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>RND KC</title>
        <link rel="shortcut icon" href="/img/RNDBlack2.svg" />
        <link rel="icon" href="/img/RNDBlack2.svg" />
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Akshar:wght@300;400;500;600;700&display=swap");
          @import
          url("https://fonts.googleapis.com/css2?family=Khand:wght@300;400;500;600;700&display=swap");
          @import
          url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
          @import
          url("https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@200;300;400;500;600;700;800&display=swap");
        </style>
      </Head>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTMID}');
      `}
      </Script>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}`}
      ></script>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID}');
      `}
      </Script>
      <Script id="facebook-pixel">
        {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
         fbq('init', '6248757275142634');
        fbq('track', 'PageView');

        `}
      </Script>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
