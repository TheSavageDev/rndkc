import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
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
