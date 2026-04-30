import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://shubhkamalsharma.vercel.app"
  ),
  title: {
    default: "Shubh Kamal Sharma — Full-Stack SDE & AI Builder",
    template: "%s | Shubh Kamal Sharma",
  },
  description:
    "Full-Stack SDE & AI Builder with 2+ years of experience at Microsoft, Prodevans & ModelX AI. Building production-grade systems with FastAPI, Next.js, Kafka, LangChain, and cloud-native infra on AWS & Azure.",
  keywords: [
    "Shubh Kamal Sharma",
    "Full Stack Developer",
    "AI Builder",
    "Next.js",
    "FastAPI",
    "LangChain",
    "React",
    "TypeScript",
    "AWS",
    "Portfolio",
  ],
  authors: [{ name: "Shubh Kamal Sharma" }],
  creator: "Shubh Kamal Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Shubh Kamal Sharma — Full-Stack SDE & AI Builder",
    description:
      "Full-Stack SDE & Generative AI engineer. Building event-driven backends, agentic AI pipelines, and cloud-native systems.",
    siteName: "Shubh Kamal Sharma",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shubh Kamal Sharma — Full-Stack SDE & AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubh Kamal Sharma — Full-Stack SDE & AI Builder",
    description:
      "Full-Stack SDE & Generative AI engineer. Building event-driven backends, agentic AI pipelines, and cloud-native systems.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
