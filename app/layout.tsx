import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devdirectory.app"),
  title: "the dev directory",
  description:
    "The developer resource index. Search and discover frameworks, libraries, APIs, AI tools, deployment platforms, and everything you need to build software.",
  keywords: [
    "developer tools",
    "dev directory",
    "programming resources",
    "react libraries",
    "nextjs",
    "ai tools",
    "deployment",
    "web development",
  ],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "the dev directory",
    description: "The developer resource index. Discover frameworks, libraries, APIs, AI tools, and more.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "the dev directory",
    description: "The developer resource index. Discover frameworks, libraries, APIs, AI tools, and more.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
