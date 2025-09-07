"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#0b0f2b] ">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-[#311d1b]">
        <Image
          src="/space.jpg"
          alt="Starry space background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Welcome to the Stargazer&apos;s Journal!
          </h1>
          <p className="mb-10 text-lg text-center">
            Store your observations of the night sky!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 bg-[#0b0f2b] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-[#0b0f2b] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with Animation */}
      <section className="relative w-full px-6 py-20 text-center text-gray-200 bg-[#0b0f2b] overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600 rounded-full opacity-20 -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400 rounded-full opacity-20 translate-x-24 translate-y-24"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-3xl font-bold">About</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-300">
            Having trouble keeping your observations tidy? Want somewhere you
            can store your notes as well as receive astronomical data about the
            night sky? Look no further! The Stargazer&apos;s Journal helps you
            keep track of your stargazing adventures. Whether you’re a beginner
            or an intermediate stargazer, this app is perfect for you.
          </p>
        </motion.div>
      </section>

      {/* Features Section with Animation */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full px-6 py-20 bg-[#0b0f2b]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-blue-950 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              Log Your Observations
            </h3>
            <p className="text-gray-300">
              Keep track of stars, planets, and celestial events you observe.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-blue-950 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              Discover Events
            </h3>
            <p className="text-gray-300">
              Get updates on upcoming astronomical events and never miss a
              spectacle.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-md bg-blue-950 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              Interactive Sky Map
            </h3>
            <p className="text-gray-300">
              (Work in progress) Explore how the sky looked when you logged your
              observation.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
