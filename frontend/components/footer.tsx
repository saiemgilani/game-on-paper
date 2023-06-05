"use client";
import Link from "next/link";
import {
  FadeContainer,
  opacityVariant,
  popUp,
} from "@/lib/content/FramerMotionVariants";
import { siteConfig } from "@/config/site"
import { NavItem } from "@/lib/types"
import { motion } from "framer-motion";


function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href === "/home" ? "/" : href}>
      <motion.p
        className="capitalize hover:text-black dark:hover:text-white w-fit gap-2  md:gap-2"
        variants={popUp}
      >
        {text}
      </motion.p>
    </Link>
  );
}




export default function Footer() {


  return (
    <>
    <footer className="w-full text-center text-gray-600 dark:text-gray-400/50 font-inter mb-14 print:hidden">
      <p>Built by <a href="https://github.com/akeaswaran/">Akshay Easwaran</a>, <a href="https://github.com/saiemgilani">Saiem Gilani</a>, and others. Data from <a href="https://espn.com/college-football">ESPN.com</a>. Learn more about the stats used in our <a href="/cfb/glossary">Glossary</a>.</p>
      <p>Contribute on <a href="https://github.com/saiemgilani/game-on-paper">GitHub</a>.</p>
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>
    </>
  );
}



