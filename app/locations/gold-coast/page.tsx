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
  Cloud,
  Wind,
  Droplets,
  Home,
  Umbrella,
  Sun
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function GoldCoastLocationPage() {
  // Comprehensive local SEO schema for Gold Coast
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/gold-coast#business",
        "name": "Disaster Recovery Gold Coast",
        "description": "24/7 IICRC-certified disaster restoration services in Gold Coast and Southeast Queensland. Specialists in storm damage, water damage, high-rise restoration across Surfers Paradise, Broadbeach, Robina, Nerang, and Hinterland areas.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/gold-coast",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gold Coast",
          "addressRegion": "QLD",
          "postalCode": "4217",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -28.0167,
          "longitude": 153.4000
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
            "name": "Surfers Paradise"
          },
          {
            "@type": "Place",
            "name": "Broadbeach"
          },
          {
            "@type": "Place",
            "name": "Southport"
          },
          {
            "@type": "Place",
            "name": "Robina"
          },
          {
            "@type": "Place",
            "name": "Nerang"
          },
          {
            "@type": "Place",
            "name": "Burleigh Heads"
          },
          {
            "@type": "Place",
            "name": "Gold Coast Hinterland"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to emergencies in Gold Coast high-rises?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide 45-minute emergency response to Gold Coast CBD and beachfront high-rises, with specialised equipment for accessing upper floors. Our teams are experienced with Gold Coast's unique high-rise challenges including balcony flooding, wind damage on upper floors, and complex strata requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle storm damage from East Coast Lows?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in East Coast Low storm damage across the Gold Coast. Our teams are pre-positioned during storm season and equipped for severe wind damage, storm surge flooding, and the intense rainfall these systems bring to Southeast Queensland."
            }
          },
          {
            "@type": "Question",
            "name": "What Gold Coast suburbs do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Gold Coast areas from Beenleigh to Tweed Heads, beaches to hinterland. This includes Surfers Paradise, Broadbeach, Southport, Robina, Nerang, Burleigh Heads, Palm Beach, Coolangatta, and all hinterland communities including Mount Tamborine and Springbrook."
            }
          }
        ]
      }
    ]
  };

  const goldCoastSuburbs = [
    { area: "Surfers Paradise", response: "45 min", population: "28,000", risk: "High-rise flooding" },
    { area: "Broadbeach", response: "45 min", population: "24,000", risk: "Storm surge" },
    { area: "Southport", response: "50 min", population: "35,000", risk: "Flooding" },
    { area: "Robina", response: "55 min", population: "30,000", risk: "Flash flooding" },
    { area: "Nerang", response: "60 min", population: "25,000", risk: "River flooding" },
    { area: "Burleigh Heads", response: "50 min", population: "18,000", risk: "Coastal storms" },
    { area: "Coolangatta", response: "65 min", population: "15,000", risk: "Storm damage" },
    { area: "Hinterland", response: "75 min", population: "20,000", risk: "Landslides" }
  ];

  const goldCoastDisasters = [
    {
      type: "East Coast Lows",
      frequency: "Annual threat",
      areas: "Entire coastline",
      season: "Autumn/Winter",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      type: "Severe Thunderstorms",
      frequency: "Regular",
      areas: "All suburbs",
      season: "October-March",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Flash Flooding",
      frequency: "Common",
      areas: "CBD, Nerang River",
      season: "Summer storms",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Hail Storms",
      frequency: "Seasonal",
      areas: "Supercell corridor",
      season: "Spring/Summer",
      icon: <Umbrella className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "High-Rise Water Damage",
      location: "Surfers Paradise",
      damage: "50th floor burst pipe",
      response: "40 minutes",
      outcome: "20 apartments restored"
    },
    {
      type: "Storm Surge",
      location: "Main Beach",
      damage: "Ground floor flooding",
      response: "45 minutes",
      outcome: "Salt damage remediation"
    },
    {
      type: "Hinterland Landslide",
      location: "Springbrook",
      damage: "Property undermined",
      response: "70 minutes",
      outcome: "Emergency stabilisation"
    },
    {
      type: "Resort Complex",
      location: "Broadbeach",
      damage: "Conference centre flooding",
      response: "35 minutes",
      outcome: "Event space saved"
    }
  ];

  const uniqueChallenges = [
    {
      challenge: "High-Rise Density",
      impact: "200+ residential towers requiring specialised access",
      solution: "High-rise specialist teams with vertical equipment"
    },
    {
      challenge: "Tourism Infrastructure",
      impact: "Hotels and resorts need immediate response",
      solution: "Priority commercial response teams"
    },
    {
      challenge: "Coastal Exposure",
      impact: "Salt damage and storm surge vulnerability",
      solution: "Marine-grade restoration techniques"
    },
    {
      challenge: "Subtropical Climate",
      impact: "Rapid mould growth in humidity",
      solution: "Aggressive drying and antimicrobial protocols"
    }
  ];

  return (
    <>
      <Script
        id="gold-coast-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section with Local Focus */}
        <section className="relative bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Local Trust Signals */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-blue-500/20 border border-blue-400 px-3 py-1 rounded-full text-sm">
                  ✓ High-Rise Specialists
                </span>
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ QLD Licensed
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ 45min Response
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Gold Coast
                <span className="block text-cyan-300 text-3xl md:text-4xl mt-2">
                  High-Rise & Coastal Storm Damage Specialists
                </span>
              </h1>
              
              <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
                From Surfers Paradise high-rises to Hinterland properties - our IICRC-certified technicians 
                provide <strong>45-minute emergency response</strong> across the Gold Coast. 
                Specialists in high-rise water damage, East Coast Low storms, and subtropical 
                mould remediation for Australia&apos;s premier coastal city.
              </p>

              {/* Gold Coast-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">600K</div>
                  <div className="text-sm">Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm">High-Rises</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Service</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">70km</div>
                  <div className="text-sm">Coastline Covered</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-cyan-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Gold Coast Emergency Response
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              {/* Storm Warning */}
              <div className="mt-8 bg-orange-600/30 border-2 border-orange-400 rounded-lg p-4">
                <p className="font-semibold flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Storm Season Active: East Coast Lows and severe thunderstorms possible
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Gold Coast's Unique Challenges */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Gold Coast&apos;s Unique Restoration Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {uniqueChallenges.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-blue-800 mb-2">{item.challenge}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.impact}</p>
                  <p className="text-sm text-green-700 font-semibold">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gold Coast Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Gold Coast Service Areas & Risk Zones
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Strategic coverage from Beenleigh to Coolangatta, beaches to hinterland
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {goldCoastSuburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-cyan-600 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{suburb.area}</h3>
                  <p className="text-cyan-600 font-semibold mb-1">
                    {suburb.response} response
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    Population: {suburb.population}
                  </p>
                  <p className={`text-sm font-semibold ${
                    suburb.risk.includes('flooding') ? 'text-blue-600' :
                    suburb.risk.includes('High-rise') ? 'text-purple-600' :
                    'text-orange-600'
                  }`}>
                    Primary Risk: {suburb.risk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Gold Coast Coverage:</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Northern Beaches:</strong> Main Beach, Surfers Paradise, Broadbeach, Mermaid Beach • 
                <strong>Central Coast:</strong> Miami, Burleigh Heads, Burleigh Waters, Varsity Lakes • 
                <strong>Southern Beaches:</strong> Palm Beach, Currumbin, Tugun, Coolangatta • 
                <strong>Inland Areas:</strong> Southport, Labrador, Ashmore, Benowa, Bundall • 
                <strong>Growth Corridor:</strong> Robina, Mudgeeraba, Reedy Creek, Nerang • 
                <strong>Hinterland:</strong> Mount Tamborine, Springbrook, Beechmont, Canungra
              </p>
            </div>
          </div>
        </section>

        {/* Gold Coast Disaster Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Gold Coast&apos;s Climate Disaster Risks
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Specialised response for coastal subtropical extremes
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {goldCoastDisasters.map((disaster, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-cyan-100 rounded-lg text-cyan-600">
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

            <div className="mt-12 p-6 bg-cyan-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-cyan-800">High-Rise Vulnerability</h3>
              <p className="text-gray-700">
                Gold Coast&apos;s 200+ residential towers face unique challenges including balcony flooding, 
                wind-driven rain on upper floors, and complex water damage affecting multiple units. 
                Our high-rise specialist teams are equipped with equipment for accessing all floors 
                and managing strata coordination.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Gold Coast Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Gold Coast Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Proven expertise from high-rises to hinterland
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
                    <Building className="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.type}</h3>
                      <p className="text-cyan-600 font-semibold mb-1">{project.location}</p>
                      <p className="text-gray-700 mb-2">{project.damage}</p>
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

        {/* Why Choose Gold Coast Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Gold Coast Properties Need Specialist Care
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-cyan-600">Gold Coast Challenges</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>High-rise density:</strong> 200+ towers need specialist access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Storm exposure:</strong> East Coast Lows bring extreme weather</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Tourist infrastructure:</strong> Hotels/resorts need priority</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Subtropical humidity:</strong> Rapid mould growth risk</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-cyan-600">Our Gold Coast Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <span><strong>Local teams:</strong> Know Gold Coast&apos;s unique needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <span><strong>High-rise equipped:</strong> Specialist vertical access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <span><strong>45-min response:</strong> CBD and beachfront priority</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <span><strong>Strata experienced:</strong> Body corporate coordination</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-cyan-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Gold Coast&apos;s Premier Disaster Recovery Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Surfers Paradise penthouses to Springbrook retreats, from Main Beach resorts to 
                Nerang family homes - we protect Gold Coast properties against subtropical storms, 
                flooding, and water damage 24/7.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">45-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Gold Coast teams understand the unique challenges of high-rise living and 
                  coastal exposure. Equipped for vertical access and rapid response.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-cyan-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Get Gold Coast Emergency Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/storm-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Storm Emergency Guide
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Gold Coast postcodes: 4207-4230 • Beenleigh to Tweed • Beach to Hinterland</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}