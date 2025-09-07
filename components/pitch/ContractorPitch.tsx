'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  DollarSign,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Maximize2,
  Volume2,
  CreditCard,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

export default function ContractorPitch() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = "https://youtube.com/embed/UhMs__-D2z4";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-slate-900 to-gray-900">
      {/* Header */}
      <div className="relative z-20 px-6 py-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/pitch" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Pitch Selection</span>
          </Link>
          <h1 className="text-xl font-semibold text-white">Contractor Presentation</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get Paid in 24 Hours
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Not 90 Days.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join Australia's fastest-growing contractor network. Instant KPI-based payments, 
              quality leads, and Clean Claims integration that actually works.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
            style={{ aspectRatio: '16/9' }}
          >
            <iframe
              src={`${videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1`}
              title="Disaster Recovery Contractor Presentation"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* KPI Payment Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Instant KPI-Based Payments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$550</div>
                <div className="text-white font-semibold mb-1">KPI 01: First Contact</div>
                <div className="text-gray-400 text-sm">Released instantly when you contact within 60 mins</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$550</div>
                <div className="text-white font-semibold mb-1">KPI 02: Initial Report</div>
                <div className="text-gray-400 text-sm">Released when report filed in Clean Claims</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">$1,100</div>
                <div className="text-white font-semibold mb-1">KPI 03: Make Safe</div>
                <div className="text-gray-400 text-sm">Released upon initial make safe completion</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-xl text-white font-semibold">
                Total: <span className="text-green-400">$2,200</span> in your account within 24 hours
              </p>
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <DollarSign className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No More Waiting</h3>
              <p className="text-gray-400 text-sm">
                Get paid within 24 hours, not 90 days
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
              <Users className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Leads</h3>
              <p className="text-gray-400 text-sm">
                Pre-qualified insurance claims, not tire kickers
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <FileCheck className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Clean Claims</h3>
              <p className="text-gray-400 text-sm">
                34% better approval rates with our system
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <TrendingUp className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Grow Your Business</h3>
              <p className="text-gray-400 text-sm">
                Focus on work, not chasing payments
              </p>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-2">Lead Generation</h3>
              <div className="text-3xl font-bold text-green-400 mb-4">$550<span className="text-lg text-gray-400">/lead</span></div>
              <p className="text-gray-400">Qualified insurance claims delivered directly to you</p>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/50">
              <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded inline-block mb-2">MOST POPULAR</div>
              <h3 className="text-xl font-bold text-white mb-2">Professional Platform</h3>
              <div className="text-3xl font-bold text-green-400 mb-4">$299<span className="text-lg text-gray-400">/month</span></div>
              <p className="text-gray-400">Full platform access with Clean Claims integration</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-green-400 mb-4">$999<span className="text-lg text-gray-400">/month</span></div>
              <p className="text-gray-400">Priority leads, dedicated support, custom integrations</p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Join 127+ Contractors Already Getting Paid Faster
            </h2>
            <p className="text-gray-300 mb-8">
              Stop waiting 90 days for payment. Start getting paid in 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all hover:scale-105">
                Join the Network Now
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-gray-600 hover:bg-white/20 transition-all">
                Schedule a Demo
              </button>
            </div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-400">127+</div>
                <div className="text-gray-400">Active Contractors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">3,450</div>
                <div className="text-gray-400">Leads Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">24hrs</div>
                <div className="text-gray-400">Average Payment Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">34%</div>
                <div className="text-gray-400">Better Approval Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}