"use client";
import {
  fromLeftVariant,
  opacityVariant,
} from "@/lib/content/FramerMotionVariants";
import AnimatedHeading from "@/components/FramerMotion/animated-heading";
import AnimatedText from "@/components/FramerMotion/animated-text";

export default function PageTop({
  pageTitle,
  headingClass,
  children,
}: {
  pageTitle: string;
  headingClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`w-full flex justify-center gap-3 py-5 select-none `}
    >
      <AnimatedHeading
        variants={fromLeftVariant}
        className={`text-xl sm:text-3xl md:text-4xl justify-center font-chivo text-neutral-900 dark:text-neutral-200 ${headingClass}`}
      >
        {pageTitle}
      </AnimatedHeading>
      <AnimatedText
        variants={opacityVariant}
        className="text-lg text-gray-600 dark:text-gray-400"
      >
        {children}
      </AnimatedText>
    </div>
  );
}
