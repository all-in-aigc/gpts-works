import "@/app/globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s in Third-party GPT store | GPTs Works",
    default: "Third-party GPT store | GPTs Works",
  },
  description:
    "GPTs Works is a Third-party GPTs store. Collect awesome GPTs, Seach GPTs by chatting.",
  keywords:
    "GPTs Works, GPTs, GPT Store, GPTs store, ChatGPT, OpenAI GPTs, vector search GPTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2123767634383915"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body className={inter.className}>
          <main>
            <Header />
            {children}
            <Footer />
          </main>

          <Analytics />

          {/* <script
            async
            src="https://chatgpt-umami.vercel.app/script.js"
            data-website-id="c2b6b677-76f4-4003-aa3e-6b54d345fefe"
          ></script> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
