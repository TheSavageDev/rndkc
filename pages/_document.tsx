import { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

export default function Document() {
  return (
    <Html>
      <Head>
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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            indow.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=6248757275142634&ev=PageView
        &noscript=1"
          />
        </noscript>
      </body>
    </Html>
  );
}
