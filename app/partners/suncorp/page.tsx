'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Building,
  Users,
  FileText,
  Star,
  Award,
  Zap,
  Home,
  TrendingUp,
  HeartHandshake,
  BadgeCheck,
  Umbrella,
  Sun,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function SuncorpPartnershipPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://disaster-recovery-seven.vercel.app/partners/suncorp#partnership",
        "name": "Suncorp Insurance Partnership - Disaster Recovery Australia",
        "description": "Official Suncorp Group approved disaster recovery provider. Covering AAMI, GIO, Apia, Shannons, and Suncorp Insurance brands. Direct billing and priority response for all policyholders across Australia.",
        "url": "https://disaster-recovery-seven.vercel.app/partners/suncorp",
        "partner": {
          "@type": "Organization",
          "name": "Suncorp Group",
          "url": "https://www.suncorp.com.au"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Australia"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which Suncorp brands are covered under this partnership?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our partnership covers all Suncorp Group insurance brands including Suncorp Insurance, AAMI, GIO, Apia, Shannons, and other Suncorp subsidiaries. All policyholders receive the same priority service and direct billing benefits."
            }
          },
          {
            "@type": "Question",
            "name": "How does Suncorp direct billing work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We bill Suncorp directly for all approved work. You pay nothing upfront except your policy excess if applicable. We handle all paperwork, assessments, and approvals with Suncorp on your behalf, making the process stress-free."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a claim number before submitting online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, for emergencies submit your claim online immediately. We'll begin make-safe work and help you lodge your Suncorp claim. We're authorised to commence emergency work immediately to prevent further damage."
            }
          }
        ]
      }
    ]
  };

  const suncorpBrands = [
    {
      brand: "Suncorp Insurance",
      focus: "Comprehensive home & contents",
      icon: <Sun className="w-8 h-8" />
    },
    {
      brand: "AAMI",
      focus: "Lucky you're with AAMI",
      icon: <Shield className="w-8 h-8" />
    },
    {
      brand: "GIO",
      focus: "NSW specialist insurer",
      icon: <Umbrella className="w-8 h-8" />
    },
    {
      brand: "Apia",
      focus: "Over 50s specialist",
      icon: <Home className="w-8 h-8" />
    }
  ];

  const partnershipBenefits = [
    {
      benefit: "Multi-Brand Coverage",
      description: "All Suncorp Group brands covered",
      icon: <Building className="w-6 h-6" />,
      detail: "One provider, all brands"
    },
    {
      benefit: "Building Connect",
      description: "Integrated with Suncorp systems",
      icon: <FileText className="w-6 h-6" />,
      detail: "Seamless claims processing"
    },
    {
      benefit: "Express Authority",
      description: "Pre-approved for emergency work",
      icon: <Zap className="w-6 h-6" />,
      detail: "No waiting for approvals"
    },
    {
      benefit: "Preferred Repairer",
      description: "Top-tier partnership status",
      icon: <Award className="w-6 h-6" />,
      detail: "Priority allocation"
    }
  ];

  const servicesCovered = [
    {
      service: "Natural Disasters",
      coverage: "Floods, cyclones, storms, bushfires",
      response: "Pre-event positioning",
      detail: "CAT event specialists"
    },
    {
      service: "Water & Flood",
      coverage: "All water damage types",
      response: "60-minute metro response",
      detail: "Category 1-3 water"
    },
    {
      service: "Fire & Smoke",
      coverage: "Complete fire restoration",
      response: "Immediate make-safe",
      detail: "Soot & odour removal"
    },
    {
      service: "Storm & Impact",
      coverage: "Wind, hail, tree damage",
      response: "24/7 emergency teams",
      detail: "Tarping & boarding"
    }
  ];

  const claimsProcess = [
    {
      step: "1",
      title: "Emergency Claim",
      description: "Submit online 24/7",
      detail: "Immediate Response",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Brand Verification",
      description: "Confirm Suncorp brand",
      detail: "AAMI, GIO, Apia, etc",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Immediate Action",
      description: "Make-safe commenced",
      detail: "Prevent further damage",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Direct Process",
      description: "We handle Suncorp",
      detail: "You pay nothing",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const coverageRegions = [
    {
      state: "Queensland",
      focus: "Cyclone & flood specialists",
      teams: "100+ crews",
      response: "CAT event ready"
    },
    {
      state: "New South Wales",
      focus: "Storm & flood response",
      teams: "80+ crews",
      response: "GIO specialist teams"
    },
    {
      state: "Victoria",
      focus: "Storm & fire ready",
      teams: "60+ crews",
      response: "AAMI priority"
    },
    {
      state: "National Coverage",
      focus: "All states & territories",
      teams: "300+ crews",
      response: "Australia-wide"
    }
  ];

  const catastropheResponse = [
    {
      event: "2022 QLD/NSW Floods",
      response: "5,000+ properties restored",
      outcome: "Record response times"
    },
    {
      event: "2020 Bushfires",
      response: "National deployment",
      outcome: "Complete recovery program"
    },
    {
      event: "2021 Storm Events",
      response: "10,000+ make-safes",
      outcome: "Zero escalations"
    },
    {
      event: "Cyclone Response",
      response: "Pre-positioned teams",
      outcome: "Immediate deployment"
    }
  ];

  return (
    <>
      <Script
        id="suncorp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Partnership Badge */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-white/30">
                  <p className="font-bold text-lg">OFFICIAL SUNCORP GROUP PARTNER</p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                Suncorp Group × Disaster Recovery
                <span className="block text-orange-200 text-3xl md:text-4xl mt-2">
                  Approved Provider for AAMI, GIO, Apia & Suncorp Insurance
                </span>
              </h1>
              
              <p className="text-xl text-orange-100 mb-8 leading-relaxed text-center max-w-4xl mx-auto">
                As an official Suncorp Group partner, we provide priority restoration services to all 
                policyholders across their insurance brands. With <strong>direct billing</strong>, 
                <strong>express authority</strong> for emergency work, and integration with Suncorp&apos;s 
                Building Connect platform, we deliver seamless disaster recovery.
              </p>

              {/* Brand Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {suncorpBrands.map((brand, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-orange-200 mb-2 flex justify-center">
                      {brand.icon}
                    </div>
                    <div className="font-bold">{brand.brand}</div>
                    <div className="text-xs text-orange-200">{brand.focus}</div>
                  </motion.div>
                ))}
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Suncorp Policyholder Emergency
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-orange-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-900 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              <div className="mt-6 text-center text-sm">
                <p>All Suncorp brands accepted • Express authority active • Direct billing available</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Suncorp Group Partnership Benefits
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Exclusive advantages for all Suncorp Group policyholders
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {partnershipBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.benefit}</h3>
                  <p className="text-gray-200 mb-2">{benefit.description}</p>
                  <p className="text-green-600 font-semibold text-sm">{benefit.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Covered */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Comprehensive Coverage for All Events
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Full restoration services for Suncorp Group policyholders
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {servicesCovered.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-orange-900">{service.service}</h3>
                  <p className="text-gray-200 mb-2">{service.coverage}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
                    <Clock className="w-4 h-4" />
                    {service.response}
                  </div>
                  <p className="text-green-600 text-sm font-semibold">{service.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-orange-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-orange-900">Building Connect Integration</h3>
              <p className="text-gray-200">
                Our direct integration with Suncorp&apos;s Building Connect platform enables real-time 
                updates, instant approvals, and seamless communication. This means faster restoration 
                and no paperwork hassles for policyholders.
              </p>
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Simple Claims Process
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Works for all Suncorp Group insurance brands
            </p>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {claimsProcess.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-200 mb-1">{step.description}</p>
                  <p className="text-sm text-orange-600 font-semibold">{step.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-200">
                Works with AAMI • GIO • Apia • Shannons • Suncorp Insurance
              </p>
            </div>
          </div>
        </section>

        {/* Coverage Regions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              National Coverage Network
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Suncorp Group approved teams across Australia
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {coverageRegions.map((region, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3">{region.state}</h3>
                  <p className="text-gray-200 mb-2">{region.focus}</p>
                  <p className="text-orange-600 font-semibold mb-1">{region.teams}</p>
                  <p className="text-green-600 text-sm font-semibold">{region.response}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Catastrophe Response */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Proven CAT Event Response
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Major disaster deployment experience with Suncorp Group
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {catastropheResponse.map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 text-orange-900">{event.event}</h3>
                  <p className="text-gray-200 mb-2">
                    <strong>Response:</strong> {event.response}
                  </p>
                  <p className="text-green-700 font-semibold">
                    <strong>Outcome:</strong> {event.outcome}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">CAT Event Preparedness</h3>
              <p className="text-gray-200">
                As a Suncorp Group preferred partner, we maintain heightened readiness during disaster 
                seasons. Pre-positioned equipment, expanded crew rosters, and direct communication with 
                Suncorp&apos;s CAT response team ensures immediate deployment when disasters strike.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Suncorp Group Trusts Us
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-orange-900">Partnership Excellence</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">15+ Years Partnership</span>
                        <p className="text-gray-200 text-sm">Long-standing Suncorp Group partner</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">100,000+ Claims</span>
                        <p className="text-gray-200 text-sm">Extensive Suncorp claims experience</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">4.8★ Rating</span>
                        <p className="text-gray-200 text-sm">Policyholder satisfaction score</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Tier 1 Status</span>
                        <p className="text-gray-200 text-sm">Highest partnership level</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-orange-900">Service Standards</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">IICRC Certified</span>
                        <p className="text-gray-200 text-sm">Industry-leading standards</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Warranty Backed</span>
                        <p className="text-gray-200 text-sm">Lifetime workmanship guarantee</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">98% First-Time Fix</span>
                        <p className="text-gray-200 text-sm">Industry-leading resolution rate</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">300+ Technicians</span>
                        <p className="text-gray-200 text-sm">National certified team network</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Shield className="w-16 h-16 mx-auto mb-6 text-orange-200" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Suncorp Group Policyholders Get VIP Treatment
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Whether you&apos;re with AAMI, GIO, Apia, Shannons, or Suncorp Insurance, you receive 
                priority online service, direct billing, and guaranteed quality restoration. Our express 
                authority means we start work immediately - no waiting for approvals.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">24/7 Emergency Response Active</p>
                <p className="text-lg">
                  Disaster doesn&apos;t wait - neither do we. Submit online now and we&apos;ll dispatch 
                  immediately while coordinating with your Suncorp brand.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Start Suncorp Claim
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-orange-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-900 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>AAMI • GIO • Apia • Shannons • Suncorp Insurance • All brands covered</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}