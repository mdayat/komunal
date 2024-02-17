import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Muhammad Nur Hidayat" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
