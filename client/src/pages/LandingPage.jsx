"use client";

import { motion } from "motion/react";
import { CardSpotlight } from "../components/ui/CardSpotlight.jsx";
import { GlowingEffect } from "../components/ui/GlowingEffect.jsx";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

// Step icon for cards
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4 text-green-500 mt-1 shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
);

const Step = ({ title }) => (
  <li className="flex gap-2 items-start">
    <CheckIcon />
    <p className="text-white">{title}</p>
  </li>
);

const tools = [
  {
    title: "IP Intelligence",
    steps: ["Trace origin", "Uncover geolocation", "Assess reputation"],
  },
  {
    title: "Password Breaches",
    steps: ["Evaluate strength", "Expose breaches", "Get safety tips"],
  },
  {
    title: "URL Analysis",
    steps: ["Inspect link", "Detect risks", "Review detailed report"],
  },
  {
    title: "Live Threat Map",
    steps: [
      "Track attacks in real time",
      "Spot traffic surges",
      "Visualize threat patterns",
    ],
  },
];

export default function HeroToolsPage() {
  return (
    <div className="bg-black min-h-screen font-radar">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
        <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold text-center text-white mb-4">
          {"Track and Secure in Real-Time"
            .split(" ")
            .map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.1,
                  ease: "easeInOut",
                }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="text-center text-lg text-gray-300 max-w-xl mb-8"
        >
          Your real-time threat intelligence dashboard. Analyze IPs, URLs,
          passwords, and visualize live threats across the globe.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/url-lookup"
            className="flex w-60 rounded-lg bg-green-500 border-[2px] border-green-900 px-6 py-2 font-medium text-black hover:bg-green-600 transition"
          >
            <p className="mx-auto">Explore Now</p>
          </Link>
        </motion.div>

        <div className="relative rounded-3xl mt-20">
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={60}
            glow={true}
            disabled={false}
            proximity={96}
            inactiveZone={0.01}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src="/images/tools-page.png"
                alt="Landing page preview"
                className="aspect-[16/9] h-auto w-full"
                height={1000}
                width={1000}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Cards Section */}
      <section
        name="tools-section"
        className="py-20 px-6 flex justify-center"
      >
        <div className="flex gap-8 flex-wrap justify-center lg:flex-nowrap">

          {tools.map((tool) => (
            <div
              key={tool.title}
              className="relative rounded-2xl border border-green-900/40 h-full"
            >
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={60}
                glow={true}
                disabled={false}
                proximity={96}
                inactiveZone={0.01}
              />
              <CardSpotlight
                key={tool.title}
                className="flex-shrink-0 w-72 py-6 h-full rounded-2xl"
              >
                <p className="text-xl font-bold text-white mt-2">
                  {tool.title}
                </p>
                <ul className="list-none mt-4 text-neutral-200">
                  {tool.steps.map((step, idx) => (
                    <Step key={idx} title={step} />
                  ))}
                </ul>
                <p className="text-neutral-300 mt-4 text-sm">
                  {`Learn more about ${tool.title.toLowerCase()} and stay ahead of cyber threats.`}
                </p>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-6 py-4 border-b border-neutral-800 font-radar">
      <div className="flex gap-2 text-green-500 font-bold text-2xl">
        <img src="/images/logo.png" className="w-9 h-9" alt="logo" />
        <span className="my-auto mt-1">thRadar</span>
      </div>
      <Scroll
        to="tools-section"
        smooth={true}
        duration={500}
        className="w-24 bg-green-500 border-[2px] border-green-900 px-6 py-2 font-medium rounded-lg text-black hover:bg-green-600 transition"
      >
        About
      </Scroll>
    </nav>
  );
};
