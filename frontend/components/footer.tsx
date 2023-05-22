"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FadeContainer,
  opacityVariant,
  popUp,
} from "@/lib/content/FramerMotionVariants";
import { siteConfig } from "@/config/site"
import { NavItem } from "@/lib/types"
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "@lib/fetcher";
import { BsDot } from "react-icons/bs";

interface MainNavProps {
  items?: NavItem[]
}
function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href === "/home" ? "/" : href}>
      <motion.p
        className="capitalize hover:text-black dark:hover:text-white w-fit  md:gap-2"
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
    <footer className="w-screen text-gray-600 dark:text-gray-400/50 font-inter mb-14 print:hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="flex flex-col max-w-4xl gap-5 p-5 mx-auto text-sm border-t-2 border-gray-200 2xl:max-w-5xl 3xl:max-w-7xl dark:border-gray-400/10 sm:text-base"
      >

        <section className="grid grid-cols-3 gap-10">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={FadeContainer}
            className="flex items-center md:gap-2"
          >
            {siteConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <FooterLink key={index} href={`/${item.href}`} text={item.title} />
                )
            )}
          </motion.div>

        </section>
      </motion.div>
    </footer>
    </>
  );
}



