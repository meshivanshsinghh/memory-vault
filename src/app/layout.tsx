import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "MemoryVault",
  description: "Preserve and Share Timeless Moments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <NextTopLoader showSpinner={false} />
          <NavBar user={user}/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
