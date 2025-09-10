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
  Anchor,
  Factory
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function NewcastleLocationPage() {
  // Comprehensive local SEO schema for Newcastle
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/newcastle#business",
        "name": "Disaster Recovery Newcastle",
        "description": "24/7 IICRC-certified disaster restoration services in Newcastle and Hunter Valley. Specialists in storm damage, flooding, industrial disasters across Newcastle CBD, Lake Macquarie, Maitland, Port Stephens, and Hunter Region.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/newcastle",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Newcastle",
          "addressRegion": "NSW",
          "postalCode": "2300",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -32.9283,
          "longitude": 151.7817
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
            "name": "Newcastle CBD"
          },
          {
            "@type": "Place",
            "name": "Lake Macquarie"
          },
          {
            "@type": "Place",
            "name": "Maitland"
          },
          {
            "@type": "Place",
            "name": "Port Stephens"
          },
          {
            "@type": "Place",
            "name": "Cessnock"
          },
          {
            "@type": "Place",
            "name": "Hunter Valley"
          },
          {
            "@type": "Place",
            "name": "Central Coast"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to emergencies in Newcastle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide 60-minute emergency response across Newcastle, Lake Macquarie, and inner Hunter areas. Outer regions like Port Stephens and Upper Hunter typically see 75-90 minute response times. Our teams are strategically positioned across the Hunter Region for rapid deployment during storms and floods."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle industrial disasters in Newcastle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in industrial disaster recovery across Newcastle's port, manufacturing, and mining sectors. Our teams are equipped for chemical spills, industrial flooding, and large-scale commercial restoration with appropriate safety certifications and equipment."
            }
          },
          {
            "@type": "Question",
            "name": "What Hunter Region areas do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service the entire Hunter Region including Newcastle, Lake Macquarie, Maitland, Cessnock, Port Stephens, Singleton, Muswellbrook, and all surrounding areas. Our coverage extends from the coast to the Upper Hunter, including wine regions and mining communities."
            }
          }
        ]
      }
    ]
  };

  const newcastleSuburbs = [
    { area: "Newcastle CBD", response: "45 min", population: "160,000", risk: "Coastal storms" },
    { area: "Lake Macquarie", response: "60 min", population: "200,000", risk: "Lake flooding" },
    { area: "Maitland", response: "70 min", population: "85,000", risk: "River flooding" },
    { area: "Port Stephens", response: "75 min", population: "75,000", risk: "Coastal exposure" },
    { area: "Charlestown", response: "55 min", population: "50,000", risk: "Flash flooding" },
    { area: "Hunter Valley", response: "90 min", population: "120,000", risk: "Bushfire/floods" },
    { area: "Cessnock", response: "80 min", population: "60,000", risk: "Mine subsidence" },
    { area: "Central Coast", response: "85 min", population: "340,000", risk: "Coastal storms" }
  ];

  const newcastleDisasters = [
    {
      type: "East Coast Lows",
      frequency: "Annual threat",
      areas: "Entire coastline",
      season: "Autumn/Winter",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      type: "Hunter Flooding",
      frequency: "Regular",
      areas: "Maitland, Singleton",
      season: "La Niña years",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Severe Storms",
      frequency: "Common",
      areas: "All suburbs",
      season: "Spring/Summer",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Industrial Incidents",
      frequency: "Risk present",
      areas: "Port, Kooragang",
      season: "Year-round",
      icon: <Factory className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Pasha Bulker Storm",
      location: "Nobby's Beach",
      damage: "100+ properties affected",
      response: "Immediate deployment",
      outcome: "Complete restoration program"
    },
    {
      type: "Hunter River Flooding",
      location: "Maitland",
      damage: "300 homes flooded",
      response: "Pre-positioned teams",
      outcome: "Rapid water extraction"
    },
    {
      type: "Industrial Spill",
      location: "Kooragang Island",
      damage: "Chemical contamination",
      response: "Hazmat response",
      outcome: "Safe decontamination"
    },
    {
      type: "Mine Subsidence",
      location: "Lake Macquarie",
      damage: "Structural damage",
      response: "Engineering assessment",
      outcome: "Stabilisation completed"
    }
  ];

  const uniqueChallenges = [
    {
      challenge: "Industrial Heritage",
      impact: "Port and heavy industry create unique hazards",
      solution: "Industrial disaster response specialists"
    },
    {
      challenge: "Mine Subsidence",
      impact: "Underground mining affects property stability",
      solution: "Structural engineering partnerships"
    },
    {
      challenge: "Dual Water Threats",
      impact: "Ocean storms and river flooding",
      solution: "Multi-hazard response capability"
    },
    {
      challenge: "East Coast Lows",
      impact: "Extreme weather events like Pasha Bulker storm",
      solution: "Pre-storm positioning and rapid scale-up"
    }
  ];

  return (
    <>
      <Script
        id="newcastle-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section with Local Focus */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 overflow-hidden">
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
                  ✓ Industrial Certified
                </span>
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ Hunter Licensed
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ 60min Response
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Newcastle
                <span className="block text-blue-700 text-3xl md:text-4xl mt-2">
                  Hunter Region&apos;s Industrial & Storm Damage Specialists
                </span>
              </h1>
              
              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                From Newcastle&apos;s industrial heart to Hunter Valley vineyards - our IICRC-certified 
                technicians provide <strong>60-minute emergency response</strong> across the Hunter Region. 
                Specialists in East Coast Low storms, Hunter River flooding, industrial disasters, 
                and mine subsidence damage restoration.
              </p>

              {/* Newcastle-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">500K</div>
                  <div className="text-sm">Hunter Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Service</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Anchor className="w-8 h-8 mx-auto" />
                  <div className="text-sm">Port City Ready</div>
                </div>
              </div>

              {/* Emergency CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/claim"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Newcastle Emergency Response
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              {/* Flood Warning */}
              <div className="mt-8 bg-blue-600/30 border-2 border-blue-400 rounded-lg p-4">
                <p className="font-semibold flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  Hunter River Flood Watch: Teams on standby for rapid deployment
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Newcastle's Unique Challenges */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Newcastle&apos;s Unique Restoration Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {uniqueChallenges.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-slate-800 mb-2">{item.challenge}</h3>
                  <p className="text-sm text-gray-200 mb-2">{item.impact}</p>
                  <p className="text-sm text-green-700 font-semibold">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newcastle Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Hunter Region Service Areas & Risk Zones
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Strategic coverage from Port Stephens to Upper Hunter
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {newcastleSuburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
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
                    suburb.risk.includes('flooding') ? 'text-blue-600' :
                    suburb.risk.includes('subsidence') ? 'text-orange-600' :
                    suburb.risk.includes('Coastal') ? 'text-cyan-600' :
                    'text-purple-600'
                  }`}>
                    Primary Risk: {suburb.risk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Hunter Coverage:</h3>
              <p className="text-gray-200 leading-relaxed">
                <strong>Newcastle:</strong> CBD, Hamilton, Merewether, Bar Beach, The Junction, Mayfield • 
                <strong>Lake Macquarie:</strong> Charlestown, Belmont, Warners Bay, Toronto, Morisset • 
                <strong>Maitland:</strong> East Maitland, Rutherford, Thornton, Morpeth, Lorn • 
                <strong>Port Stephens:</strong> Nelson Bay, Raymond Terrace, Salamander Bay, Tanilba Bay • 
                <strong>Hunter Valley:</strong> Cessnock, Singleton, Muswellbrook, Scone, Pokolbin • 
                <strong>Central Coast:</strong> Wyong, Tuggerah, The Entrance, Toukley, Lake Haven
              </p>
            </div>
          </div>
        </section>

        {/* Newcastle Disaster Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Newcastle&apos;s Disaster Risk Profile
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Specialised response for industrial and natural disasters
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {newcastleDisasters.map((disaster, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg"
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
                    <p><strong>Frequency:</strong> {disaster.frequency}</p>
                    <p><strong>High-risk areas:</strong> {disaster.areas}</p>
                    <p><strong>Peak season:</strong> {disaster.season}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-slate-800">Industrial Disaster Preparedness</h3>
              <p className="text-gray-200">
                Newcastle&apos;s port and industrial facilities require specialised disaster response 
                capabilities. Our teams are trained and equipped for chemical spills, industrial 
                flooding, and contamination events with appropriate safety certifications and 
                protective equipment for hazardous environments.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Newcastle Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Hunter Region Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Proven expertise from coast to coalfields
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

        {/* Why Choose Newcastle Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Newcastle Properties Need Specialist Protection
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Newcastle&apos;s Unique Risks</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>East Coast Lows:</strong> Extreme storms like Pasha Bulker</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Hunter flooding:</strong> River system flood risks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Industrial hazards:</strong> Port and heavy industry</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Mine subsidence:</strong> Underground coal mining legacy</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Our Newcastle Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Local teams:</strong> Know Hunter&apos;s unique challenges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Factory className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Industrial certified:</strong> Port and hazmat ready</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Rapid response:</strong> 60-minute metro guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Mine subsidence:</strong> Structural specialists</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Newcastle&apos;s Most Trusted Disaster Recovery Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Nobby&apos;s lighthouse to Hunter Valley vineyards, from Kooragang industry to 
                Lake Macquarie shores - we protect Hunter Region properties against storms, floods, 
                and industrial disasters 24/7.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">60-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Hunter teams understand the region&apos;s unique challenges from East Coast Lows 
                  to industrial incidents. Equipped and ready for any disaster.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Get Newcastle Emergency Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/water-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Flood Emergency Guide
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Hunter postcodes: 2280-2337 • Coast to coalfields • CBD to vineyards</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}