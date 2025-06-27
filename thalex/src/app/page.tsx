"use client";

import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Eye,
  Lock,
  ArrowRight,
  ChevronDown,
  Brain,
  Database,
  Settings,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const AnimatedCounter = ({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};

const ArchitectureStep = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
  >
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-muted-foreground text-center text-sm">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "15%", left: "5%" }}
          />
          <motion.div
            className="absolute w-64 h-64 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 60, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "20%", right: "5%" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-left lg:pr-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Enterprise-Grade Privacy Protection
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Secure Your AI
                <span className="block text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Conversations
                </span>
              </motion.h1>

              <motion.p
                className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Protect sensitive information in LLM interactions with
                intelligent data masking. Prevent PII leakage while maintaining
                full AI functionality and productivity.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Shield className="w-5 h-5" />
                  Install Extension
                  <motion.div
                    className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </motion.button>

                <Link href="/functionality">
                  <motion.button
                    className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try Demo
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-8 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div>
                  <div className="text-2xl font-bold text-blue-600">99%</div>
                  <div className="text-slate-600 dark:text-slate-400">
                    PII Detection
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">75%</div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Risk Reduction
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">40%</div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Productivity Gain
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Demo Video Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                {/* Video Container */}
                <motion.div
                  className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 border border-slate-200/50 dark:border-slate-700/50"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-1 text-xs text-slate-500 dark:text-slate-400 ml-4">
                      https://thalex-demo.com
                    </div>
                  </div>

                  {/* Demo Video/Placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-700 dark:to-blue-900 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>

                    {/* Simulated UI Elements */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            Sensitive Data Detected
                          </div>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 2, delay: 1 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 text-xs text-green-700 dark:text-green-300 flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        Data Protected & Anonymized
                      </div>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Real-time Detection
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Smart Masking
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Zero Config
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Full Privacy
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-60"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-xl opacity-60"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Critical Security Gap
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-red-700 to-orange-600 dark:from-slate-100 dark:via-red-300 dark:to-orange-300 bg-clip-text text-transparent">
              The Hidden Risk
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Organizations are unknowingly exposing sensitive data through AI
              interactions, creating compliance risks and security
              vulnerabilities.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-8 h-full border border-red-100 dark:border-red-800/30 group-hover:shadow-2xl group-hover:shadow-red-500/10 transition-all duration-500">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                  Data Exposure
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  PII, financial data, and confidential information leak through
                  AI prompts, creating regulatory and business risks that can
                  cost millions.
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  High Risk Impact
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-3xl p-8 h-full border border-orange-100 dark:border-orange-800/30 group-hover:shadow-2xl group-hover:shadow-orange-500/10 transition-all duration-500">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                  Compliance Violations
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  GDPR, HIPAA, and other regulations require strict data
                  protection that traditional AI solutions cannot guarantee.
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                  Regulatory Risk
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-8 h-full border border-purple-100 dark:border-purple-800/30 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                  Lost Productivity
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Teams avoid AI tools due to security concerns, missing
                  productivity gains and competitive advantages in the market.
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Business Impact
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Advanced Privacy Architecture
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-700 dark:from-slate-100 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Our Solution
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Advanced privacy-preserving architecture that secures data while
              maintaining AI functionality
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-lg opacity-60"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Filter className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">
                  NER Detection
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Advanced named entity recognition identifies sensitive data
                  patterns in real-time
                </p>
                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-lg opacity-60"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Context Classification
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  AI-powered context analysis determines data sensitivity and
                  handling requirements
                </p>
                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-lg opacity-60"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Policy Engine
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Configurable privacy policies enforce data protection rules
                  and compliance requirements
                </p>
                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-600 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "95%" }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 group-hover:-translate-y-2 transition-all duration-500">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-lg opacity-60"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Pseudonymization
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Intelligent data masking preserves utility while protecting
                  sensitive information
                </p>
                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1.1 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Flow Animation */}
          <motion.div
            className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    Raw Data Input
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Sensitive information detected
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 mx-8">
                <div className="relative">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <motion.div
                    className="absolute top-0 w-4 h-2 bg-white rounded-full shadow-lg"
                    initial={{ x: 0 }}
                    animate={{ x: "calc(100vw - 100px)" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>

              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 text-right">
                    Protected Output
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 text-right">
                    Privacy preserved, utility maintained
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Proven Results
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-green-700 to-emerald-700 dark:from-slate-100 dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
              Measurable Impact
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Real results for enterprise security and compliance
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 text-center border border-green-100 dark:border-green-800/30 group-hover:shadow-2xl group-hover:shadow-green-500/10 transition-all duration-500">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl opacity-40"></div>
                <div className="text-6xl lg:text-7xl font-bold text-green-600 mb-4">
                  <AnimatedCounter end={99} />%
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4"></div>
                <p className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  PII Detection Rate
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Industry-leading accuracy in identifying sensitive data
                  patterns across all communication channels
                </p>
                <div className="mt-6 inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Verified Performance
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 text-center border border-blue-100 dark:border-blue-800/30 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-40"></div>
                <div className="text-6xl lg:text-7xl font-bold text-blue-600 mb-4">
                  <AnimatedCounter end={75} />%
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4"></div>
                <p className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Risk Reduction
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Significant decrease in data exposure incidents and compliance
                  violations across enterprise systems
                </p>
                <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Security Enhancement
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-8 text-center border border-purple-100 dark:border-purple-800/30 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full blur-xl opacity-40"></div>
                <div className="text-6xl lg:text-7xl font-bold text-purple-600 mb-4">
                  <AnimatedCounter end={40} />%
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mx-auto mb-4"></div>
                <p className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  Productivity Gain
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Teams confidently adopt AI tools with built-in privacy
                  protection, accelerating innovation
                </p>
                <div className="mt-6 inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Business Growth
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-white to-blue-200 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "10%", right: "10%" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Ready to Transform Your AI Security?
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              Experience the Future of
              <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Privacy-First AI
              </span>
            </h2>

            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              See how our technology protects sensitive data while maintaining
              AI functionality. Join thousands of organizations already securing
              their AI conversations.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/functionality">
                <motion.button
                  className="px-12 py-6 bg-white text-blue-600 font-bold rounded-2xl text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-4 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Interactive Demo
                  <motion.div
                    className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </motion.div>
                </motion.button>
              </Link>

              <motion.button
                className="px-12 py-6 border-2 border-white/30 text-white font-semibold rounded-2xl text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo Call
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center items-center gap-8 text-sm opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                No Setup Required
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Enterprise Ready
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                GDPR Compliant
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
