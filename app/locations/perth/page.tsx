'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Users,
  Building,
  Flame,
  Wind,
  Droplets,
  Home
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function PerthLocationPage() {
  // Comprehensive local SEO schema for Perth
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/perth#business",
        "name": "Disaster Recovery Perth",
        "description": "24/7 IICRC-certified disaster restoration services in Perth and Western Australia. Specialist bushfire recovery, storm damage, water damage restoration across Perth CBD, Northern Suburbs, Southern Suburbs, Eastern Suburbs, Fremantle, Rockingham.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/perth",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Perth",
          "addressRegion": "WA",
          "postalCode": "6000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -31.9505,
          "longitude": 115.8605
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", 
            "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Perth CBD"
          },
          {
            "@type": "Place",
            "name": "Perth Northern Suburbs"
          },
          {
            "@type": "Place",
            "name": "Perth Southern Suburbs"
          },
          {
            "@type": "Place",
            "name": "Perth Hills"
          },
          {
            "@type": "Place",
            "name": "Fremantle"
          },
          {
            "@type": "Place",
            "name": "Rockingham"
          },
          {
            "@type": "Place",
            "name": "Mandurah"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to emergencies in Perth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide 60-minute emergency response across Perth metro areas including CBD, Fremantle, and inner suburbs. Outer areas like Perth Hills and Mandurah typically see 75-90 minute response times. Our IICRC-certified technicians are strategically positioned across Perth for rapid 24/7 deployment, with special readiness during bushfire season."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle bushfire damage in Perth Hills?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in bushfire damage restoration throughout the Perth Hills and WA bushfire-prone areas. Our teams are experienced with Perth's extreme summer conditions and provide emergency response for smoke damage, structural assessment, and complete restoration. We maintain heightened readiness during December-April bushfire season."
            }
          },
          {
            "@type": "Question",
            "name": "What Perth suburbs do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Perth suburbs from Joondalup to Mandurah, Perth Hills to the coast. This includes Perth CBD, Subiaco, Fremantle, Cottesloe, Scarborough, Joondalup, Midland, Cannington, Rockingham, Mandurah, and all surrounding areas. Our coverage extends throughout the Perth metropolitan area and beyond."
            }
          }
        ]
      }
    ]
  };

  const perthSuburbs = [
    { area: "Perth CBD", response: "45 min", population: "30,000", risk: "Storm/Water" },
    { area: "Northern Coastal", response: "60 min", population: "400,000", risk: "Storm Surge" },
    { area: "Northern Suburbs", response: "70 min", population: "350,000", risk: "Storms" },
    { area: "Eastern Suburbs", response: "65 min", population: "280,000", risk: "Bushfire" },
    { area: "Perth Hills", response: "75 min", population: "80,000", risk: "Extreme Bushfire" },
    { area: "Southern Suburbs", response: "75 min", population: "300,000", risk: "Storms" },
    { area: "Fremantle Area", response: "60 min", population: "150,000", risk: "Coastal" },
    { area: "Rockingham/Mandurah", response: "90 min", population: "200,000", risk: "Coastal Storms" }
  ];

  const perthDisasters = [
    {
      type: "Bushfires",
      frequency: "Annual high risk",
      areas: "Perth Hills, Yanchep, Serpentine",
      season: "November-April",
      icon: <Flame className="w-6 h-6" />
    },
    {
      type: "Winter Storms",
      frequency: "Regular",
      areas: "Coastal suburbs, CBD",
      season: "May-September",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Flash Flooding",
      frequency: "Winter peaks",
      areas: "CBD, Bayswater, Belmont",
      season: "June-August",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Extreme Heat",
      frequency: "Summer",
      areas: "All suburbs - pipe bursts",
      season: "December-February",
      icon: <Home className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Bushfire Recovery",
      location: "Perth Hills",
      damage: "2023 fires - 15 properties",
      response: "Immediate deployment",
      outcome: "Complete restoration achieved"
    },
    {
      type: "Storm Damage",
      location: "Fremantle",
      damage: "Winter storm - 40 homes",
      response: "45 minutes",
      outcome: "Emergency tarping same day"
    },
    {
      type: "Commercial Building",
      location: "Perth CBD",
      damage: "Burst pipe - 10 floors",
      response: "40 minutes",
      outcome: "Business continuity maintained"
    },
    {
      type: "Coastal Property",
      location: "Cottesloe",
      damage: "Storm surge flooding",
      response: "55 minutes",
      outcome: "Salt damage remediation"
    }
  ];

  const uniqueChallenges = [
    {
      challenge: "Extreme Summer Heat",
      impact: "40°C+ temperatures increase fire risk and pipe failures",
      solution: "Heat-adapted equipment and rapid response protocols"
    },
    {
      challenge: "Mediterranean Climate",
      impact: "Dry summers create extreme bushfire conditions",
      solution: "Pre-positioned teams during fire season"
    },
    {
      challenge: "Coastal Exposure",
      impact: "Salt damage from Indian Ocean storms",
      solution: "Specialised salt remediation techniques"
    },
    {
      challenge: "Urban-Bushland Interface",
      impact: "Many suburbs border bushfire-prone areas",
      solution: "Bushfire specialist teams on standby"
    }
  ];

  return (
    <>
      <Script
        id="perth-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section with Local Focus */}
        <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-orange-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Local Trust Signals */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-red-500/20 border border-red-400 px-3 py-1 rounded-full text-sm">
                  ✓ Bushfire Ready
                </span>
                <span className="bg-blue-500/20 border border-blue-400 px-3 py-1 rounded-full text-sm">
                  ✓ WA Licensed
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ 60min Response
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Perth
                <span className="block text-orange-300 text-3xl md:text-4xl mt-2">
                  Western Australia&apos;s Bushfire & Storm Damage Specialists
                </span>
              </h1>
              
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                From Perth Hills bushfires to Indian Ocean storms - our IICRC-certified technicians 
                provide <strong>60-minute emergency response</strong> across Greater Perth. 
                Specialists in extreme heat damage, bushfire recovery, and coastal storm restoration 
                for WA&apos;s unique Mediterranean climate.
              </p>

              {/* Perth-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">2.1M</div>
                  <div className="text-sm">Perth Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">350+</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Service</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">45°C</div>
                  <div className="text-sm">Heat Prepared</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Perth Emergency Response
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-orange-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Start Online Claim
                </motion.a>
              </div>

              {/* Bushfire Warning */}
              <div className="mt-8 bg-red-600/30 border-2 border-red-400 rounded-lg p-4">
                <p className="font-semibold flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Extreme Fire Danger: Perth Hills residents - ensure bushfire action plan ready
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Perth's Unique Challenges */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Perth&apos;s Unique Restoration Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {uniqueChallenges.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-orange-800 mb-2">{item.challenge}</h3>
                  <p className="text-sm text-gray-200 mb-2">{item.impact}</p>
                  <p className="text-sm text-green-700 font-semibold">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perth Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Perth Service Areas & Risk Zones
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Strategic coverage from Yanchep to Mandurah, coast to hills
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {perthSuburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{suburb.area}</h3>
                  <p className="text-orange-600 font-semibold mb-1">
                    {suburb.response} response
                  </p>
                  <p className="text-gray-200 text-sm mb-1">
                    Population: {suburb.population}
                  </p>
                  <p className={`text-sm font-semibold ${
                    suburb.risk.includes('Extreme') ? 'text-red-600' :
                    suburb.risk.includes('Bushfire') ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    Primary Risk: {suburb.risk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-orange-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Perth Metropolitan Coverage:</h3>
              <p className="text-gray-200 leading-relaxed">
                <strong>Northern Beaches:</strong> Scarborough, Trigg, Sorrento, Hillarys, Mullaloo, Burns Beach • 
                <strong>Northern Suburbs:</strong> Joondalup, Wanneroo, Karrinyup, Warwick, Greenwood, Kingsley • 
                <strong>Eastern Suburbs:</strong> Midland, Guildford, Bassendean, Bayswater, Morley, Noranda • 
                <strong>Perth Hills:</strong> Kalamunda, Mundaring, Darlington, Glen Forrest, Parkerville, Roleystone • 
                <strong>Southern Suburbs:</strong> Cannington, Bentley, Victoria Park, Como, Manning, Bull Creek • 
                <strong>Coastal South:</strong> Fremantle, Rockingham, Mandurah, Safety Bay, Secret Harbour
              </p>
            </div>
          </div>
        </section>

        {/* Perth Disaster Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Perth&apos;s Climate Disaster Risks
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Specialised response for WA&apos;s Mediterranean climate extremes
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {perthDisasters.map((disaster, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                      {disaster.icon}
                    </div>
                    <h3 className="text-xl font-bold">{disaster.type}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Frequency:</strong> {disaster.frequency}</p>
                    <p><strong>High-risk areas:</strong> {disaster.areas}</p>
                    <p><strong>Peak season:</strong> {disaster.season}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-red-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-red-800">Perth Bushfire Preparedness</h3>
              <p className="text-gray-200">
                Perth Hills and urban-bushland interface suburbs face extreme bushfire risk during summer. 
                Our teams maintain heightened readiness from November to April, with pre-positioned 
                equipment in high-risk areas including Mundaring, Kalamunda, and Roleystone.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Perth Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Perth Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Proven expertise across Perth&apos;s diverse property types
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <Building className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.type}</h3>
                      <p className="text-orange-600 font-semibold mb-1">{project.location}</p>
                      <p className="text-gray-200 mb-2">{project.damage}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-green-600">✓ {project.response}</span>
                        <span className="text-green-600">✓ {project.outcome}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Perth Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Perth Properties Need Climate-Ready Specialists
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-orange-600">Perth&apos;s Extreme Conditions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Summer extremes:</strong> 40°C+ heat causes pipe failures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Bushfire threat:</strong> Urban-bushland interface risk</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Winter storms:</strong> Indian Ocean fronts bring flooding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Salt damage:</strong> Coastal properties need special care</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-orange-600">Our Perth Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span><strong>Local teams:</strong> Know Perth&apos;s unique challenges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span><strong>Fire season ready:</strong> Pre-positioned November-April</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span><strong>Heat-adapted:</strong> Equipment rated for extreme temps</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span><strong>Coastal experience:</strong> Salt damage remediation experts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-orange-900 to-red-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Perth&apos;s Most Trusted Disaster Recovery Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Cottesloe beachfront to Perth Hills bushland, from Joondalup to Mandurah - 
                we protect Perth properties against WA&apos;s extreme climate challenges 24/7.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">60-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Perth teams understand WA&apos;s unique challenges. Whether it&apos;s a 
                  bushfire emergency or winter storm damage, we&apos;re equipped and ready.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-orange-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Get Perth Emergency Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/bushfire"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bushfire Emergency Guide
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Perth postcodes: 6000-6199 • Yanchep to Mandurah • Coast to Perth Hills</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}