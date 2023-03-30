import { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from "../lib/fpixel";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView
        &noscript=1`}
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
