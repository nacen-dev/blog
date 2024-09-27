import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/ui/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nacen's blog",
  description: "Vincent's blog site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="antialiased mt-8 mx-[10%] sm:mx-[15%] md:mx-[20%]">
            <Header />

            <main className="mt-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
