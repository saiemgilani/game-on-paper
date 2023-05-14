import { JetBrains_Mono as JetBrains_Mono, Chivo as Chivo } from "next/font/google"

export const fontSansSerif = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  weight: ["400", "500", "700"],
})

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
})

