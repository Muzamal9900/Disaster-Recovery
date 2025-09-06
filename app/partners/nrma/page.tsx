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
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function NRMAPartnershipPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://disaster-recovery-seven.vercel.app/partners/nrma#partnership",
        "name": "NRMA Insurance Partnership - Disaster Recovery Australia",
        "description": "Official NRMA Insurance approved disaster recovery and restoration provider. Direct billing, priority response, and guaranteed quality for all NRMA policyholders across NSW and ACT.",
        "url": "https://disaster-recovery-seven.vercel.app/partners/nrma",
        "partner": {
          "@type": "Organization",
          "name": "NRMA Insurance",
          "url": "https://www.nrma.com.au"
        },
        "areaServed": [
          {
            "@type": "State",
            "name": "New South Wales"
          },
          {
            "@type": "State",
            "name": "Australian Capital Territory"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the NRMA Insurance partnership benefit policyholders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NRMA policyholders receive priority response, direct insurance billing (no upfront payment), guaranteed quality workmanship, and streamlined claims processing. Our partnership ensures faster restoration with less stress during difficult times."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need NRMA approval before submitting online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, in emergencies you can submit your claim online immediately. We'll begin immediate make-safe work and coordinate with NRMA Insurance on your behalf. We handle all documentation and approvals to streamline your claim."
            }
          },
          {
            "@type": "Question",
            "name": "What areas are covered under the NRMA partnership?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide NRMA Insurance approved services throughout NSW and ACT, from Sydney to regional areas, coastal to inland communities. Our network ensures rapid response times for all NRMA policyholders regardless of location."
            }
          }
        ]
      }
    ]
  };

  const partnershipBenefits = [
    {
      benefit: "Priority Response",
      description: "NRMA policyholders jump to front of queue",
      icon: <Zap className="w-6 h-6" />,
      detail: "Guaranteed faster response times"
    },
    {
      benefit: "Direct Billing",
      description: "We bill NRMA directly - no upfront costs",
      icon: <FileText className="w-6 h-6" />,
      detail: "Zero out-of-pocket expenses"
    },
    {
      benefit: "Guaranteed Quality",
      description: "NRMA-audited quality standards",
      icon: <Award className="w-6 h-6" />,
      detail: "Lifetime warranty on workmanship"
    },
    {
      benefit: "Claims Management",
      description: "We handle all NRMA paperwork",
      icon: <BadgeCheck className="w-6 h-6" />,
      detail: "Stress-free claims process"
    }
  ];

  const servicesCovered = [
    {
      service: "Water & Flood Damage",
      coverage: "Full restoration covered",
      response: "60-minute emergency response",
      icon: <Home className="w-6 h-6" />
    },
    {
      service: "Fire & Smoke Damage",
      coverage: "Complete rebuild if required",
      response: "Immediate board-up & securing",
      icon: <Home className="w-6 h-6" />
    },
    {
      service: "Storm & Hail Damage",
      coverage: "Make-safe and full repairs",
      response: "Pre-storm positioning",
      icon: <Home className="w-6 h-6" />
    },
    {
      service: "Mould Remediation",
      coverage: "Professional removal & prevention",
      response: "Health-priority response",
      icon: <Home className="w-6 h-6" />
    }
  ];

  const claimsProcess = [
    {
      step: "1",
      title: "Emergency Claim",
      description: "Submit online claim immediately",
      detail: "Available 24/7 for emergencies"
    },
    {
      step: "2",
      title: "NRMA Verification",
      description: "We verify your policy",
      detail: "Takes less than 5 minutes"
    },
    {
      step: "3",
      title: "Immediate Response",
      description: "Team dispatched immediately",
      detail: "Make-safe work begins"
    },
    {
      step: "4",
      title: "Direct Billing",
      description: "We handle NRMA directly",
      detail: "No payment required from you"
    }
  ];

  const coverageAreas = [
    {
      region: "Sydney Metropolitan",
      suburbs: "All suburbs - CBD to Greater Sydney",
      response: "60-minute guarantee",
      teams: "50+ crews"
    },
    {
      region: "Newcastle & Hunter",
      suburbs: "Newcastle, Lake Macquarie, Maitland",
      response: "75-minute response",
      teams: "15+ crews"
    },
    {
      region: "Illawarra & South Coast",
      suburbs: "Wollongong, Shellharbour, Kiama",
      response: "90-minute response",
      teams: "10+ crews"
    },
    {
      region: "Regional NSW",
      suburbs: "All regional centres",
      response: "Rapid deployment",
      teams: "Network coverage"
    }
  ];

  const whyChoosePartnership = [
    {
      reason: "10+ Years Partnership",
      detail: "Trusted by NRMA Insurance since 2014"
    },
    {
      reason: "50,000+ Claims Handled",
      detail: "Extensive NRMA policyholder experience"
    },
    {
      reason: "4.9★ Customer Rating",
      detail: "Consistently exceeding expectations"
    },
    {
      reason: "100% Compliance",
      detail: "Full NRMA audit compliance"
    }
  ];

  return (
    <>
      <Script
        id="nrma-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
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
                  <p className="font-bold text-lg">OFFICIAL NRMA INSURANCE PARTNER</p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                NRMA Insurance × Disaster Recovery
                <span className="block text-blue-300 text-3xl md:text-4xl mt-2">
                  Approved Restoration Provider for NSW & ACT
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed text-center max-w-4xl mx-auto">
                As an official NRMA Insurance partner, we provide priority emergency response and 
                guaranteed restoration services to all NRMA policyholders. <strong>Direct billing</strong> means 
                no upfront costs, while our <strong>60-minute response guarantee</strong> ensures your 
                property is protected when disaster strikes.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <HeartHandshake className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-2xl font-bold">10+ Years</div>
                  <div className="text-sm">NRMA Partnership</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-2xl font-bold">50,000+</div>
                  <div className="text-sm">Claims Handled</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm">Customer Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Guaranteed</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  NRMA Policyholder Emergency
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              <div className="mt-6 text-center text-sm">
                <p>Have your NRMA policy number ready • We verify coverage instantly</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              NRMA Policyholder Benefits
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Exclusive advantages for NRMA Insurance customers
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {partnershipBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.benefit}</h3>
                  <p className="text-gray-700 mb-2">{benefit.description}</p>
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
              NRMA Insurance Covered Services
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Comprehensive restoration coverage for all disaster types
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
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.service}</h3>
                      <p className="text-gray-700 mb-2">{service.coverage}</p>
                      <p className="text-blue-600 font-semibold">{service.response}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-green-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-green-900">Additional Coverage</h3>
              <p className="text-gray-700">
                NRMA policies also cover temporary accommodation, contents restoration, debris removal, 
                and additional living expenses. We coordinate all aspects of your claim to ensure 
                maximum coverage utilisation.
              </p>
            </div>
          </div>
        </section>

        {/* Claims Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Simple NRMA Claims Process
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              From emergency to restoration in 4 simple steps
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
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-700 mb-1">{step.description}</p>
                  <p className="text-sm text-green-600 font-semibold">{step.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700">
                No claim number needed for emergencies • We handle NRMA coordination
              </p>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              NRMA Partnership Coverage Areas
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Comprehensive coverage across NSW & ACT
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {coverageAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3">{area.region}</h3>
                  <p className="text-gray-700 mb-2 text-sm">{area.suburbs}</p>
                  <p className="text-blue-600 font-semibold mb-1">{area.response}</p>
                  <p className="text-green-600 text-sm">{area.teams}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Partnership */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why NRMA Trusts Us
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-900">Partnership Excellence</h3>
                  <ul className="space-y-3">
                    {whyChoosePartnership.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <span className="font-semibold">{item.reason}</span>
                          <p className="text-gray-600 text-sm">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-900">Service Guarantees</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">60-Minute Response</span>
                        <p className="text-gray-600 text-sm">Guaranteed metro emergency response</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Lifetime Warranty</span>
                        <p className="text-gray-600 text-sm">All workmanship guaranteed</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Direct Billing</span>
                        <p className="text-gray-600 text-sm">No out-of-pocket expenses</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">IICRC Certified</span>
                        <p className="text-gray-600 text-sm">Industry-leading standards</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-bold mb-3">NRMA Quality Assurance</h3>
                <p className="text-gray-700 mb-4">
                  As an approved NRMA partner, we undergo regular quality audits, maintain comprehensive 
                  insurance coverage, and adhere to strict service level agreements. This ensures every 
                  NRMA policyholder receives the highest standard of restoration services.
                </p>
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <BadgeCheck className="w-5 h-5" />
                  Latest Audit Score: 98% Compliance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-green-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Shield className="w-16 h-16 mx-auto mb-6 text-green-300" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                NRMA Policyholders Get Priority Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                Don&apos;t wait in queues. As an NRMA policyholder, you receive immediate online priority 
                response, direct insurance billing, and guaranteed quality restoration. Our decade-long 
                partnership ensures seamless service when you need it most.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">Available 24/7 for NRMA Emergencies</p>
                <p className="text-lg">
                  Water damage at 2am? Storm damage on weekends? We&apos;re always ready. 
                  Submit online now and we&apos;ll dispatch immediately while coordinating with NRMA.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Start NRMA Claim Now
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Official NRMA partner • Direct billing • No excess collection • Guaranteed work</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}