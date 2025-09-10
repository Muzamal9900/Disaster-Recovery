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
  Droplets,
  Wind,
  CloudRain,
  Home
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function BrisbaneLocationPage() {
  // Comprehensive local SEO schema for Brisbane
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/brisbane#business",
        "name": "Disaster Recovery Brisbane",
        "description": "24/7 IICRC-certified disaster restoration services in Brisbane and South East Queensland. Specialist flood damage, cyclone recovery, storm damage restoration across Brisbane CBD, Northside, Southside, Gold Coast, Sunshine Coast.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/brisbane",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Brisbane",
          "addressRegion": "QLD",
          "postalCode": "4000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -27.4698,
          "longitude": 153.0251
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
            "name": "Brisbane CBD"
          },
          {
            "@type": "Place",
            "name": "Brisbane Northside"
          },
          {
            "@type": "Place",
            "name": "Brisbane Southside"
          },
          {
            "@type": "Place",
            "name": "Ipswich"
          },
          {
            "@type": "Place",
            "name": "Logan"
          },
          {
            "@type": "Place",
            "name": "Moreton Bay"
          },
          {
            "@type": "Place",
            "name": "Redlands"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to flood emergencies in Brisbane?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide immediate flood response across Brisbane with 45-minute response times in CBD and inner suburbs, 60-minute response to most Brisbane areas. During major flood events like 2011 and 2022, we deploy multiple teams with specialised flood extraction equipment. Our teams are experienced with Brisbane River flooding patterns and flash flooding in areas like West End, Milton, and Toowong."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle cyclone damage in Brisbane and SE Queensland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in cyclone and severe storm damage restoration throughout South East Queensland. Our teams are trained in emergency tarping, structural stabilisation, and complete restoration following cyclonic winds. We maintain emergency supplies during cyclone season (November-April) and coordinate with SES for rapid deployment."
            }
          },
          {
            "@type": "Question",
            "name": "What Brisbane suburbs do you service for water damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Brisbane suburbs including CBD, New Farm, Kangaroo Point, South Brisbane, West End, Toowong, Indooroopilly, Chermside, Aspley, Carindale, Mount Gravatt, Sunnybank, and extending to Ipswich, Logan, Redcliffe, and Cleveland. Our South East Queensland coverage includes Gold Coast and Sunshine Coast regions."
            }
          }
        ]
      }
    ]
  };

  const brisbaneSuburbs = [
    { area: "Brisbane CBD", response: "45 min", population: "25,000", floodRisk: "High" },
    { area: "Inner North", response: "50 min", population: "300,000", floodRisk: "Medium" },
    { area: "Inner South", response: "50 min", population: "280,000", floodRisk: "High" },
    { area: "Western Suburbs", response: "60 min", population: "250,000", floodRisk: "Very High" },
    { area: "Eastern Suburbs", response: "60 min", population: "200,000", floodRisk: "Low" },
    { area: "Northern Suburbs", response: "75 min", population: "350,000", floodRisk: "Low" },
    { area: "Southern Suburbs", response: "75 min", population: "400,000", floodRisk: "Medium" },
    { area: "Bayside", response: "70 min", population: "150,000", floodRisk: "Storm Surge" }
  ];

  const brisbaneDisasters = [
    {
      type: "River Flooding",
      frequency: "Major events 2011, 2022",
      areas: "West End, Milton, Toowong, St Lucia",
      season: "November-March (La Niña)",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Flash Flooding",
      frequency: "Multiple yearly",
      areas: "CBD, Valley, South Brisbane",
      season: "Storm season Oct-Mar",
      icon: <CloudRain className="w-6 h-6" />
    },
    {
      type: "Severe Storms",
      frequency: "Regular summer",
      areas: "All suburbs - hail corridor",
      season: "October-March",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Cyclone Impact",
      frequency: "Occasional",
      areas: "Coastal and eastern suburbs",
      season: "November-April",
      icon: <Wind className="w-6 h-6" />
    }
  ];

  const floodHistory = [
    { year: "2022", level: "3.8m", damage: "20,000 homes", areas: "184 suburbs" },
    { year: "2011", level: "4.46m", damage: "28,000 homes", areas: "200+ suburbs" },
    { year: "1974", level: "5.45m", damage: "14,000 homes", areas: "City-wide" }
  ];

  const recentProjects = [
    {
      type: "Flood Recovery",
      location: "West End",
      damage: "2022 floods - 50 properties",
      response: "30 minutes",
      outcome: "Complete restoration in 3 months"
    },
    {
      type: "High-Rise Storm",
      location: "Brisbane CBD",
      damage: "Hail damage - 30 floors",
      response: "45 minutes",
      outcome: "Business continuity maintained"
    },
    {
      type: "Queenslander Home",
      location: "Paddington",
      damage: "Storm water ingress",
      response: "40 minutes",
      outcome: "Heritage features preserved"
    },
    {
      type: "Shopping Centre",
      location: "Chermside",
      damage: "Roof damage - flash flooding",
      response: "55 minutes",
      outcome: "Trading resumed next day"
    }
  ];

  return (
    <>
      <Script
        id="brisbane-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section with Local Focus */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
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
                  ✓ Flood Specialists
                </span>
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ QLD Licensed
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ Cyclone Ready
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Brisbane
                <span className="block text-blue-700 text-3xl md:text-4xl mt-2">
                  Queensland&apos;s Flood & Storm Damage Specialists Since 1974
                </span>
              </h1>
              
              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                From Brisbane River floods to severe storm cells - our IICRC-certified technicians 
                provide <strong>45-minute emergency response</strong> across Greater Brisbane. 
                With extensive experience in the 2011 and 2022 floods, we understand Brisbane&apos;s 
                unique subtropical disaster challenges.
              </p>

              {/* Brisbane-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">2.6M</div>
                  <div className="text-sm">SEQ Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">190</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Flood Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">45min</div>
                  <div className="text-sm">CBD Response</div>
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
                  Brisbane Flood Emergency
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              {/* Flood Warning */}
              <div className="mt-8 bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-4">
                <p className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  La Niña Alert: Increased flood risk for Brisbane 2024-2025 wet season
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Flood History Section */}
        <section className="py-12 bg-blue-50 border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Brisbane Flood Experience</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {floodHistory.map((flood, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-3xl font-bold text-blue-600">{flood.year}</div>
                  <div className="text-sm text-gray-200 mt-2">
                    <p>Peak: {flood.level}</p>
                    <p>{flood.damage} affected</p>
                    <p>{flood.areas}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brisbane Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Brisbane Service Areas & Flood Risk Zones
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Strategic coverage with special focus on flood-prone areas
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {brisbaneSuburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{suburb.area}</h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {suburb.response} response
                  </p>
                  <p className="text-gray-200 text-sm mb-1">
                    Population: {suburb.population}
                  </p>
                  <p className={`text-sm font-semibold ${
                    suburb.floodRisk === 'Very High' ? 'text-red-600' :
                    suburb.floodRisk === 'High' ? 'text-orange-600' :
                    suburb.floodRisk === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    Flood Risk: {suburb.floodRisk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Brisbane & SEQ Coverage:</h3>
              <p className="text-gray-200 leading-relaxed">
                <strong>Inner Brisbane:</strong> CBD, South Brisbane, West End, New Farm, Fortitude Valley, Spring Hill • 
                <strong>Western:</strong> Toowong, Indooroopilly, Kenmore, Brookfield, Chapel Hill, Fig Tree Pocket • 
                <strong>Northern:</strong> Chermside, Aspley, Kedron, Lutwyche, Stafford, Everton Park • 
                <strong>Southern:</strong> Woolloongabba, Greenslopes, Mount Gravatt, Sunnybank, Carindale • 
                <strong>Eastern:</strong> Morningside, Bulimba, Hawthorne, Camp Hill, Carina • 
                <strong>Bayside:</strong> Wynnum, Manly, Cleveland, Redland Bay, Victoria Point
              </p>
            </div>
          </div>
        </section>

        {/* Brisbane Disaster Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Brisbane&apos;s Subtropical Disaster Challenges
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Specialised response for Queensland&apos;s unique weather patterns
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {brisbaneDisasters.map((disaster, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {disaster.icon}
                    </div>
                    <h3 className="text-xl font-bold">{disaster.type}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>History:</strong> {disaster.frequency}</p>
                    <p><strong>High-risk areas:</strong> {disaster.areas}</p>
                    <p><strong>Peak season:</strong> {disaster.season}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-red-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-red-800">Brisbane Flood Warning System</h3>
              <p className="text-gray-200">
                We monitor Brisbane River levels 24/7 during wet season. Our teams pre-position 
                equipment when river levels reach 2.0m at the City Gauge, ensuring immediate 
                response capability for flood-prone suburbs like West End, Milton, Rocklea, and Fairfield.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Brisbane Projects */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Brisbane Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Proven expertise in Brisbane&apos;s major disaster events
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <Building className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.type}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{project.location}</p>
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

        {/* Why Choose Brisbane Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Brisbane Properties Need Flood-Ready Specialists
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Brisbane&apos;s Unique Risks</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>River flooding:</strong> Brisbane River catchment flood patterns</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Flash flooding:</strong> Rapid creek rises in storms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Subtropical climate:</strong> High humidity accelerates damage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Storm cells:</strong> Supercells with destructive hail</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Our Brisbane Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Flood experience:</strong> Active in 1974, 2011, 2022 floods</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Pre-positioned:</strong> Equipment ready during warnings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Council coordination:</strong> Work with BCC flood response</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Queenslander expertise:</strong> Understand unique architecture</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-100 rounded-lg">
                <h3 className="text-xl font-bold mb-3">La Niña Preparedness</h3>
                <p className="text-gray-200">
                  With La Niña conditions increasing flood risk, our Brisbane teams maintain 
                  enhanced readiness from November to March. Extra pumps, generators, and 
                  drying equipment are pre-staged for immediate deployment to flood-prone areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Brisbane&apos;s Most Experienced Flood Recovery Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Queenslanders in Paddington to riverfront apartments in New Farm, 
                from Ipswich to the Bay - we&apos;ve protected Brisbane through every major 
                flood since 1974. When the river rises, Brisbane knows who to call.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">45-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Brisbane teams know every flood-prone street, every evacuation route, 
                  and every shortcut. When waters rise, we&apos;re already mobilising.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Get Brisbane Flood Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/flood"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Flood Emergency Checklist
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Brisbane postcodes: 4000-4179 • Ipswich to Redlands • Moreton Bay to Logan</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}