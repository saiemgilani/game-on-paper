import "@/styles/globals.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "@fontsource/chivo/400.css";
import "@fontsource/chivo/500.css";
import "@fontsource/chivo/700.css";
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSansSerif, fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import Footer  from "@/components/footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import PlausibleProvider from 'next-plausible'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning >
        <head>
          {/* Barlow */}
          <link
            rel="preload"
            href="/fonts/Barlow/Barlow-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Barlow/Barlow-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Barlow/Barlow-600.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Barlow/Barlow-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Barlow/Barlow-800.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Inter */}
          <link
            rel="preload"
            href="/fonts/Inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* Sarina */}
          <link
            rel="preload"
            href="/fonts/Sarina/Sarina-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* Chivo */}
          <link
            rel="preload"
            href="/fonts/chivo/Chivo-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/chivo/Chivo-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          {/* FiraMono */}
          <link
            rel="preload"
            href="/fonts/fira-mono/FiraMono-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          {/* Avengero */}
          <link
            rel="preload"
            href="/fonts/Avengero/Avengero-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </head>
        <body className={"min-h-screen bg-background font-sans-serif antialiased --font-chivo"}>
          <PlausibleProvider domain="thegameonpaper.com">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </PlausibleProvider>
        </body>
      </html>
    </>
  )
}
