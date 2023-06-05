"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { NavItem } from "@/lib/types"
import { siteConfig } from "@/config/site"
import Logo from "@/components/SVG/logo"
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  popUp,
} from "@lib/content/FramerMotionVariants";
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
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
    <div className="flex gap-6 lg:gap-10">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        {/* <Logo className="h-6 w-6" /> */}
        <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </motion.div>
      </Link>
      {items?.length ? (
        <motion.nav className="hidden gap-6 lg:flex">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="flex items-center lg:gap-2"
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

// Hamburger Button
function HamBurger({
  open,
  handleClick,
}: {
  open: boolean;
  handleClick: () => void;
}) {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial="hidden"
      animate="visible"
      variants={popUp}
      className="lg:hidden"
    >
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 duration-300 transform rounded-md cursor-pointer select-none active:scale-50"
          onClick={handleClick}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 duration-300 transform rounded-md cursor-pointer select-none active:scale-50"
          onClick={handleClick}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </motion.div>
  );
}

// Mobile navigation menu
const MobileMenu = ({
  items,
  handleClick,
}: {
  items: NavItem[];
  handleClick: () => void;
}) => {
  return (
    <motion.div
      className="absolute top-0 left-0 z-10 w-screen h-screen font-normal bg-secondary dark:bg-secondary lg:hidden"
      variants={hamFastFadeContainer}
      initial="hidden"
      animate="visible"
      exit="hidden">
    {items?.length ? (
      <motion.nav className="flex flex-col mx-8 mt-28 ">
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
                href={item.href}
                key={`mobileNav-${index}`}
                onClick={handleClick}
                className="flex w-auto py-4 text-base font-semibold text-gray-900 capitalize border-b border-gray-300 cursor-pointer dark:border-gray-700 dark:text-gray-100"
              >
              <motion.p variants={mobileNavItemSideways} >
                {item.title}
              </motion.p>
              </Link>
            )
        )}
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className={buttonVariants({ size: "sm", variant: "ghost"})}>
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </motion.div>
        </Link>
        <Link
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.twitter className="h-5 w-5 fill-current" />
            <span className="sr-only">Twitter</span>
          </motion.div>
        </Link>
        <div>
        <motion.div
                initial="hidden"
                animate="visible"
                variants={FadeContainer}
                className={buttonVariants({ size: "sm", variant: "ghost"})}>
          <ThemeToggle />
        </motion.div>
        </div>
      </motion.nav>
      ) : null}
    </motion.div>
  );
};

export function SiteHeader() {
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  /*  Using to control animation as I'll show the name to the mobile navbar when you scroll a bit
   */
  const control = useAnimation();
  const [navOpen, setNavOpen] = useState(false);
  function lockScroll() {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("lock-scroll"); // class is define in the global.css
  }

  /* To Lock  the Scroll when user visit the mobile nav page */
  function handleClick() {
    lockScroll();
    setNavOpen(!navOpen);
  }
  return (
    <header className="top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 md:justify-between md:space-x-0 ">
      {/* Mobile Navigation Hamburger and MobileMenu */}
      <HamBurger open={navOpen} handleClick={handleClick} />
      <AnimatePresence>
        {navOpen && (
          <MobileMenu items={siteConfig.mainNav} handleClick={handleClick} />
        )}
      </AnimatePresence>
        <MainNav items={siteConfig.mainNav} />
        <div className="flex-1 items-center justify-end space-x-4 hidden lg:flex">
          <motion.nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={FadeContainer}
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </motion.div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={FadeContainer}
                className={buttonVariants({ size: "sm", variant: "ghost"})}>
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </motion.div>
            </Link>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={FadeContainer}
                className={buttonVariants({ size: "sm", variant: "ghost"})}>
              <ThemeToggle />
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </header>
  )
}
