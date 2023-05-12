"use client";
import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/lib/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Logo from "@/components/SVG/logo"
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  popUp,
} from "@lib/content/FramerMotionVariants";

interface MainNavProps {
  items?: NavItem[]
}

// NavItem Container
function NavItems({ href, text }: { href: string; text: string }) {
  return (
    <Link
      className={`${
        "font-bold text-gray-800 dark:text-gray-100"
      } sm:inline-block transition-all text-[17px] hidden px-2 md:px-3 py-[3px] hover:bg-black/10  dark:hover:bg-neutral-700/50 rounded-md`}
      href={href === "/home" ? "/" : href}
    >
      <motion.p className="capitalize" variants={popUp}>
        {text}
      </motion.p>
    </Link>
  );
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Logo className="h-6 w-6" />
        <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </motion.div>
      </Link>
      {items?.length ? (
        <motion.nav className="hidden gap-6 md:flex">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="flex items-center md:gap-2"
          >
            {items?.map(
              (item, index) =>
                item.href && (
                  <NavItems key={index} href={`/${item.href}`} text={item.title} />
                )
            )}
          </motion.div>
        </motion.nav>
      ) : null}
    </div>
  )
}

