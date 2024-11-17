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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="antialiased mt-8 mx-[5%] sm:mx-[10%] md:mx-[15%]">
            <Header />

            <main className="mt-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
