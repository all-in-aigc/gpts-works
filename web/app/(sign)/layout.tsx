import "@/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "GPTs Works",
  description: "Third-party GPTs store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
