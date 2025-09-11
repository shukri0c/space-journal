"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#0b0f2b]">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-[#311d1b]">
        <Image
          src="/space.jpg"
          alt="Starry space background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to the Stargazer&apos;s Journal!
          </h1>
          <p className="mb-8 sm:mb-10 text-base sm:text-lg">
            Store your observations of the night sky!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/login"
              className="px-5 py-2 bg-[#0b0f2b] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-[#0b0f2b] text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative w-full py-16 sm:py-20 text-center text-gray-200 bg-[#0b0f2b] overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600 rounded-full opacity-20 -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400 rounded-full opacity-20 translate-x-24 translate-y-24"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="px-4"
        >
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold">About</h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed text-gray-300">
            Having trouble keeping your observations tidy? Want somewhere you
            can store your notes as well as receive astronomical data about the
            night sky? Look no further! The Stargazer&apos;s Journal helps you
            keep track of your stargazing adventures. Whether you’re a beginner
            or an intermediate stargazer, this app is perfect for you.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full py-16 sm:py-20 bg-[#0b0f2b] px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 sm:p-6 rounded-2xl shadow-md bg-blue-950 hover:shadow-xl transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
              Log Your Observations
            </h3>
            <p className="text-sm sm:text-gray-300">
              Keep track of stars, planets, and celestial events you observe.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 sm:p-6 rounded-2xl shadow-md bg-blue-950 hover:shadow-xl transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
              Discover Events
            </h3>
            <p className="text-sm sm:text-gray-300">
              Get updates on upcoming astronomical events and never miss a
              spectacle.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 sm:p-6 rounded-2xl shadow-md bg-blue-950 hover:shadow-xl transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
              Interactive Sky Map
            </h3>
            <p className="text-sm sm:text-gray-300">
              (Work in progress) Explore how the sky looked when you logged your
              observation.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
