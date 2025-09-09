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
  Flame,
  Wind,
  Home
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function MelbourneLocationPage() {
  // Comprehensive local SEO schema for Melbourne
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/melbourne#business",
        "name": "Disaster Recovery Melbourne",
        "description": "24/7 IICRC-certified disaster restoration services in Melbourne. Water damage, fire damage, mould remediation across all Melbourne suburbs including CBD, Inner City, Eastern Suburbs, Western Suburbs, Mornington Peninsula.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/melbourne",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Melbourne",
          "addressRegion": "VIC",
          "postalCode": "3000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -37.8136,
          "longitude": 144.9631
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
            "name": "Melbourne CBD"
          },
          {
            "@type": "Place",
            "name": "Inner Melbourne"
          },
          {
            "@type": "Place",
            "name": "Eastern Suburbs"
          },
          {
            "@type": "Place",
            "name": "Western Suburbs"
          },
          {
            "@type": "Place",
            "name": "Northern Suburbs"
          },
          {
            "@type": "Place",
            "name": "Bayside"
          },
          {
            "@type": "Place",
            "name": "Mornington Peninsula"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How fast can you respond to emergencies in Melbourne?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide 60-minute emergency response across Melbourne metro areas including CBD, Inner City, and most suburbs. Outer suburbs like Dandenong Ranges and Mornington Peninsula typically see 75-90 minute response times. Our IICRC-certified technicians are strategically positioned across Melbourne for rapid 24/7 deployment."
            }
          },
          {
            "@type": "Question",
            "name": "What areas in Melbourne do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Melbourne suburbs from Werribee to Belgrave, Craigieburn to Frankston. This includes Melbourne CBD, Inner suburbs (Richmond, South Yarra), Eastern suburbs (Box Hill, Ringwood), Western suburbs (Footscray, Sunshine), Northern suburbs (Brunswick, Preston), Bayside (St Kilda, Brighton), and the Mornington Peninsula."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle storm damage from Melbourne's extreme weather?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in Melbourne's unique weather challenges including storm damage, flash flooding, and hail damage. Our teams are experienced with Melbourne's sudden weather changes and provide emergency tarping, water extraction, and complete restoration services for storm-affected properties."
            }
          }
        ]
      }
    ]
  };

  const melbourneSuburbs = [
    { area: "Melbourne CBD", response: "45 min", population: "180,000" },
    { area: "Inner East", response: "60 min", population: "400,000" },
    { area: "Inner North", response: "50 min", population: "350,000" },
    { area: "Western Suburbs", response: "75 min", population: "500,000" },
    { area: "Eastern Suburbs", response: "75 min", population: "600,000" },
    { area: "Bayside", response: "60 min", population: "300,000" },
    { area: "Northern Suburbs", response: "75 min", population: "450,000" },
    { area: "Mornington Peninsula", response: "90 min", population: "160,000" }
  ];

  const melbourneDisasters = [
    {
      type: "Storm & Hail",
      frequency: "Frequent",
      areas: "All suburbs",
      season: "Year-round peaks Oct-Mar",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Flash Flooding",
      frequency: "Regular",
      areas: "CBD, Elwood, South Melbourne",
      season: "Winter-Spring",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Bushfires",
      frequency: "Seasonal risk",
      areas: "Dandenong Ranges, outer north",
      season: "December-March",
      icon: <Flame className="w-6 h-6" />
    },
    {
      type: "Burst Pipes",
      frequency: "Daily",
      areas: "Older suburbs, apartments",
      season: "Winter peaks",
      icon: <Home className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Apartment Complex",
      location: "Southbank",
      damage: "Storm damage - 50 units",
      response: "40 minutes",
      outcome: "Complete restoration in 7 days"
    },
    {
      type: "Victorian Terrace",
      location: "Carlton",
      damage: "Fire damage - heritage property",
      response: "35 minutes",
      outcome: "Heritage features preserved"
    },
    {
      type: "Shopping Centre",
      location: "Chadstone",
      damage: "Roof leak - multiple stores",
      response: "55 minutes",
      outcome: "Trading continued during repairs"
    },
    {
      type: "Office Building",
      location: "Docklands",
      damage: "Water damage - 8 floors",
      response: "45 minutes",
      outcome: "Business continuity maintained"
    }
  ];

  return (
    <>
      <Script
        id="melbourne-schema"
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
                <span className="bg-green-500/20 border border-green-400 px-3 py-1 rounded-full text-sm">
                  ✓ VIC Licensed
                </span>
                <span className="bg-blue-500/20 border border-blue-400 px-3 py-1 rounded-full text-sm">
                  ✓ 60min Response
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ Storm Specialists
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Melbourne
                <span className="block text-blue-300 text-3xl md:text-4xl mt-2">
                  24/7 Emergency Restoration for Melbourne&apos;s Four Seasons in One Day
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                From CBD high-rises to Mornington Peninsula homes - our IICRC-certified technicians 
                provide <strong>60-minute emergency response</strong> across Greater Melbourne. 
                Specialists in storm damage, water restoration, and Melbourne&apos;s unique 
                weather-related disasters.
              </p>

              {/* Melbourne-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">5.1M</div>
                  <div className="text-sm">Melbourne Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">321</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">All Weather Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">60min</div>
                  <div className="text-sm">Metro Response</div>
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
                  Melbourne Emergency Response
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
            </div>
          </motion.div>
        </section>

        {/* Melbourne Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Melbourne Service Areas & Response Times
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12 max-w-3xl mx-auto">
              Strategic coverage across Melbourne&apos;s diverse suburbs and regions
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {melbourneSuburbs.map((suburb, index) => (
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
                  <p className="text-gray-200 text-sm">
                    Population: {suburb.population}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Melbourne Coverage Including:</h3>
              <p className="text-gray-200 leading-relaxed">
                <strong>Inner City:</strong> Richmond, South Yarra, Prahran, St Kilda, Carlton • 
                <strong>Eastern:</strong> Box Hill, Ringwood, Glen Waverley, Camberwell, Hawthorn • 
                <strong>Western:</strong> Footscray, Sunshine, Werribee, Melton, Caroline Springs • 
                <strong>Northern:</strong> Brunswick, Preston, Coburg, Thomastown, Craigieburn • 
                <strong>Bayside:</strong> Brighton, Sandringham, Black Rock, Beaumaris, Mentone • 
                <strong>South East:</strong> Dandenong, Cranbourne, Narre Warren, Berwick, Pakenham
              </p>
            </div>
          </div>
        </section>

        {/* Melbourne Disaster Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Melbourne&apos;s Weather Challenge Specialists
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Expert response for Melbourne&apos;s infamous &quot;four seasons in one day&quot;
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {melbourneDisasters.map((disaster, index) => (
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
                    <p><strong>Frequency:</strong> {disaster.frequency}</p>
                    <p><strong>High-risk areas:</strong> {disaster.areas}</p>
                    <p><strong>Peak season:</strong> {disaster.season}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-yellow-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-yellow-800">Melbourne Weather Alert</h3>
              <p className="text-gray-200">
                Melbourne&apos;s rapidly changing weather creates unique restoration challenges. 
                Our teams are equipped for sudden storms, flash flooding, and extreme temperature 
                variations that can cause burst pipes and structural damage.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Melbourne Projects */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Melbourne Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-200 mb-12">
              Proven expertise across Melbourne&apos;s diverse architecture
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

        {/* Why Choose Melbourne Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Melbourne Properties Need Specialist Care
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Melbourne&apos;s Unique Challenges</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Extreme weather:</strong> Four seasons in one day creates unique damage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Victorian architecture:</strong> Heritage properties need special care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Flash flooding:</strong> Low-lying areas prone to sudden water damage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Storm damage:</strong> Regular hail and wind events</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Our Melbourne Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Local knowledge:</strong> Teams familiar with Melbourne&apos;s suburbs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Weather ready:</strong> Prepared for Melbourne&apos;s sudden changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Heritage experience:</strong> Skilled in Victorian-era restoration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Apartment specialist:</strong> Expert in high-density living damage</span>
                    </li>
                  </ul>
                </div>
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
                Melbourne&apos;s Most Trusted Emergency Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Southbank apartments to Toorak mansions, from Carlton terraces to 
                Dandenong businesses - we protect Melbourne properties 24/7, rain or shine.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">60-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Melbourne teams are ready for any weather. When disaster strikes, 
                  we navigate Melbourne&apos;s streets to reach you fast.
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
                  Get Melbourne Emergency Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/storm-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Storm Damage Checklist
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Melbourne postcodes: 3000-3207 • Werribee to Belgrave • Craigieburn to Frankston</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}