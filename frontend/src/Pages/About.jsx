"use client"

import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Briefcase, Users, Lock, Globe, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const cardVariant = {
  hidden: { y: 12, opacity: 0, scale: 0.985 },
  show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  hover: { scale: 1.03, transition: { duration: 0.25 } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#031027] text-white antialiased">
      <Navbar />

      <main className="pt-28 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Neon Hero */}
        <section className="text-center mb-14">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.95, ease: "anticipate" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-indigo-300 drop-shadow-[0_12px_30px_rgba(6,182,212,0.12)]"
          >
            CryptoLance — Freelancing, Reimagined
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.15, duration: 0.85 }}
            className="mt-6 max-w-3xl mx-auto text-gray-300 text-base sm:text-lg leading-relaxed"
          >
            A secure, transparent freelance marketplace powered by blockchain escrow and smart contracts —
            fair pay, lower fees, global talent.
          </motion.p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 shadow-[0_12px_40px_rgba(6,182,212,0.18)] ring-0 hover:shadow-[0_20px_60px_rgba(6,182,212,0.22)] transition-shadow duration-300"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg font-medium border border-cyan-700 text-cyan-200 bg-[rgba(8,15,26,0.4)] shadow-inner hover:brightness-110 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </section>

        {/* Mission / Why */}
        <section className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9 }}
            className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-[rgba(6,6,22,0.6)] to-[rgba(10,12,24,0.4)] border border-cyan-800/40 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-9 h-9 text-cyan-300 drop-shadow-[0_8px_26px_rgba(6,182,212,0.16)]" />
              <h2 className="text-2xl font-bold text-cyan-200">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To give freelancers and clients a borderless, low-fee marketplace where trust is enforced by code —
              escrowed milestones, on-chain transparency, and fast payouts.
            </p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="text-sm text-gray-300">• Decentralised escrow</li>
              <li className="text-sm text-gray-300">• Lower platform fees</li>
              <li className="text-sm text-gray-300">• Reputation on-chain</li>
              <li className="text-sm text-gray-300">• Global, compliant payments</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9 }}
            className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-[rgba(6,10,22,0.25)] to-[rgba(4,6,12,0.2)] border border-indigo-800/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-9 h-9 text-cyan-300" />
              <h2 className="text-2xl font-bold text-cyan-200">Why Blockchain?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Smart contracts create predictable, automatic payments and dispute rules. This reduces disputes,
              speeds settlements, and gives both parties a clear audit trail.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(6,182,212,0.08)] text-cyan-200 text-sm border border-cyan-700/30">Escrow</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(99,102,241,0.06)] text-indigo-200 text-sm border border-indigo-700/20">Milestones</span>
            </div>
          </motion.div>
        </section>

        {/* How it works cards */}
        <section className="mb-16">
          <h3 className="text-center text-2xl sm:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300">
            How CryptoLance Works
          </h3>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Clients Post Projects",
                desc: "Describe the project, budget and timeline. Receive proposals from vetted developers.",
                Icon: Briefcase,
              },
              {
                title: "Developers Bid & Work",
                desc: "Choose the best proposal, set milestones and begin collaborating with secure messaging.",
                Icon: Users,
              },
              {
                title: "Secure Payments",
                desc: "Milestone-based payments are held in smart contracts until verification is complete.",
                Icon: Lock,
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                variants={cardVariant}
                whileHover="hover"
                className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-cyan-700/20 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(6,182,212,0.12)] group"
              >
                <div className="flex items-center justify-center mb-4">
                  <card.Icon className="w-12 h-12 text-cyan-300 group-hover:animate-pulse" />
                </div>
                <h4 className="text-lg font-semibold text-center mb-2">{card.title}</h4>
                <p className="text-sm text-gray-300 text-center">{card.desc}</p>

                {/* neon outline effect */}
                <div className="pointer-events-none mt-4 rounded-lg absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Vision */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-cyan-300" />
            <h3 className="text-2xl font-bold text-cyan-200">Our Vision</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            A decentralized future where freelancers and clients collaborate without barriers — transparent
            systems, predictable payouts, and an open marketplace for global talent.
          </p>
        </section>

        {/* CTA with gradient neon panel */}
        <section className="mb-8">
          <div className="rounded-2xl p-8 md:p-10 border border-cyan-700/30 bg-gradient-to-bl from-[rgba(6,10,22,0.6)] to-[rgba(3,6,12,0.4)] shadow-[0_24px_80px_rgba(2,6,23,0.6)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-bold text-cyan-200">Join the Future of Freelancing</h4>
                <p className="text-gray-300 mt-2">Secure, fair, and global — CryptoLance brings the power of blockchain to everyday work.</p>
              </div>

              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 font-semibold shadow-[0_12px_40px_rgba(6,182,212,0.12)] hover:shadow-[0_30px_100px_rgba(6,182,212,0.18)] transition-all duration-300">
                  Create Account
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} className="px-5 py-3 rounded-lg border border-cyan-700/30 text-cyan-200 bg-[rgba(255,255,255,0.02)] hover:brightness-105 transition">
                  Contact Sales
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
