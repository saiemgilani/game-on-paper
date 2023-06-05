"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ThemeToggle() {
  const {  theme, setTheme } = useTheme()

  function updateTheme() {
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => updateTheme()}
      className="h-5 w-5 items-left align-left text-left justify-left"
    >
      <Icons.sun className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
