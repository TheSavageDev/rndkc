import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
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
      <body>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTMID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
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
