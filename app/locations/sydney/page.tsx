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

export default function SydneyLocationPage() {
  // Comprehensive local SEO schema
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/sydney#business",
        "name": "Disaster Recovery Sydney",
        "description": "24/7 IICRC-certified disaster restoration services in Sydney. Water damage, fire damage, mould remediation across all Sydney suburbs including CBD, North Shore, Eastern Suburbs, Western Sydney.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/sydney",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Sydney",
          "addressRegion": "NSW",
          "postalCode": "2000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -33.8688,
          "longitude": 151.2093
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
            "name": "Sydney CBD"
          },
          {
            "@type": "Place",
            "name": "North Shore"
          },
          {
            "@type": "Place",
            "name": "Eastern Suburbs"
          },
          {
            "@type": "Place",
            "name": "Inner West"
          },
          {
            "@type": "Place",
            "name": "Western Sydney"
          },
          {
            "@type": "Place",
            "name": "Northern Beaches"
          },
          {
            "@type": "Place",
            "name": "Sutherland Shire"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How fast can you respond to emergencies in Sydney?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide 60-minute emergency response across Sydney metro areas including CBD, North Shore, Eastern Suburbs, and Inner West. Western Sydney and outer suburbs typically see 90-minute response times. Our strategically positioned IICRC-certified technicians ensure rapid deployment 24/7."
            }
          },
          {
            "@type": "Question",
            "name": "What areas in Sydney do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Sydney suburbs from Penrith to Bondi, Hornsby to Sutherland. This includes Sydney CBD, North Shore (Chatswood, Mosman), Eastern Suburbs (Bondi, Randwick), Inner West (Newtown, Marrickville), Western Sydney (Parramatta, Blacktown), Northern Beaches (Manly, Dee Why), and Sutherland Shire."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with Sydney insurance companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we work directly with all major insurers operating in Sydney including NRMA, Suncorp, Allianz, QBE, and IAG. Our IICRC certification ensures 100% insurance acceptance, and we handle all claim documentation to maximise your settlement."
            }
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Emergency Disaster Restoration",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Disaster Recovery Sydney"
        },
        "areaServed": {
          "@type": "City",
          "name": "Sydney",
          "containedInPlace": {
            "@type": "State",
            "name": "New South Wales"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Disaster Restoration Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Water Damage Restoration Sydney"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Fire Damage Restoration Sydney"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mould Remediation Sydney"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Storm Damage Repair Sydney"
              }
            }
          ]
        }
      }
    ]
  };

  const sydneySuburbs = [
    { area: "Sydney CBD", response: "45 min", population: "250,000" },
    { area: "North Shore", response: "60 min", population: "450,000" },
    { area: "Eastern Suburbs", response: "60 min", population: "250,000" },
    { area: "Inner West", response: "50 min", population: "300,000" },
    { area: "Western Sydney", response: "90 min", population: "1,000,000" },
    { area: "Northern Beaches", response: "75 min", population: "270,000" },
    { area: "Sutherland Shire", response: "75 min", population: "230,000" },
    { area: "Hills District", response: "90 min", population: "200,000" }
  ];

  const sydneyDisasters = [
    {
      type: "Flooding",
      frequency: "Annual",
      areas: "Hawkesbury-Nepean, Georges River",
      season: "March-April",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Storms & Hail",
      frequency: "Multiple yearly",
      areas: "All suburbs",
      season: "October-March",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Bushfires",
      frequency: "High risk",
      areas: "Blue Mountains interface",
      season: "September-February",
      icon: <Flame className="w-6 h-6" />
    },
    {
      type: "Water Damage",
      frequency: "Daily",
      areas: "Older suburbs, high-rises",
      season: "Year-round",
      icon: <Home className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Commercial High-Rise",
      location: "Sydney CBD",
      damage: "Water damage - 15 floors",
      response: "45 minutes",
      outcome: "Full restoration in 5 days"
    },
    {
      type: "Residential Complex",
      location: "Bondi Beach",
      damage: "Storm damage - 30 units",
      response: "60 minutes",
      outcome: "Emergency tarping, full repair"
    },
    {
      type: "Heritage Building",
      location: "The Rocks",
      damage: "Fire damage restoration",
      response: "30 minutes",
      outcome: "Preserved historical features"
    },
    {
      type: "Shopping Centre",
      location: "Parramatta",
      damage: "Flood damage - basement",
      response: "55 minutes",
      outcome: "Trading resumed in 48 hours"
    }
  ];

  return (
    <>
      <Script
        id="sydney-schema"
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
                  ✓ Sydney Licensed
                </span>
                <span className="bg-blue-500/20 border border-blue-400 px-3 py-1 rounded-full text-sm">
                  ✓ 60min Response
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ All Suburbs
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Sydney
                <span className="block text-blue-300 text-3xl md:text-4xl mt-2">
                  24/7 Emergency Restoration Across All Sydney Suburbs
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                From Bondi to Blacktown, Hornsby to Hurstville - our IICRC-certified technicians 
                provide <strong>60-minute emergency response</strong> across Greater Sydney. 
                Specialising in water damage, fire restoration, and mould remediation for 
                Sydney&apos;s unique climate challenges.
              </p>

              {/* Sydney-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">5.3M</div>
                  <div className="text-sm">Sydney Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">658</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Service</div>
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
                  Sydney Emergency Response
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

        {/* Sydney Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Sydney Service Areas & Response Times
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Strategic positioning across Sydney ensures rapid response to all suburbs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {sydneySuburbs.map((suburb, index) => (
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
                  <p className="text-gray-600 text-sm">
                    Population: {suburb.population}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Sydney Coverage Including:</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Eastern Suburbs:</strong> Bondi, Coogee, Randwick, Waverley, Woollahra • 
                <strong>North Shore:</strong> Chatswood, Mosman, Neutral Bay, Cremorne, Kirribilli • 
                <strong>Inner West:</strong> Newtown, Marrickville, Leichhardt, Balmain, Glebe • 
                <strong>Northern Beaches:</strong> Manly, Dee Why, Brookvale, Mona Vale, Avalon • 
                <strong>Western Sydney:</strong> Parramatta, Blacktown, Penrith, Liverpool, Campbelltown • 
                <strong>South:</strong> Sutherland, Cronulla, Miranda, Hurstville, Kogarah
              </p>
            </div>
          </div>
        </section>

        {/* Sydney Disaster Types */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Sydney&apos;s Common Disaster Risks
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Specialised response for Sydney&apos;s unique climate and infrastructure challenges
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {sydneyDisasters.map((disaster, index) => (
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
          </div>
        </section>

        {/* Recent Sydney Projects */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Sydney Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Proven track record across Sydney&apos;s diverse property types
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

        {/* Sydney Insurance Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Trusted by Sydney&apos;s Major Insurers
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Direct billing with all major insurance companies operating in NSW
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {["NRMA Insurance", "Suncorp", "Allianz", "QBE", "IAG", "Youi", "Budget Direct", "AAMI"].map((insurer, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow text-center font-semibold text-gray-700"
                >
                  {insurer}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Sydney Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Sydney Properties Need Specialist Care
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Sydney&apos;s Unique Challenges</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Coastal humidity:</strong> Accelerates mould growth in Eastern suburbs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>High-rise complexity:</strong> CBD water damage affects multiple floors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Heritage buildings:</strong> Special techniques for Rocks, Paddington</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Bushfire interface:</strong> Blue Mountains smoke damage</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">Our Sydney Advantage</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Local technicians:</strong> Based in Sydney, know every suburb</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Rapid deployment:</strong> Multiple teams across Sydney regions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Council compliance:</strong> Familiar with Sydney council requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span><strong>Strata specialist:</strong> Experienced with Sydney apartment complexes</span>
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
                Sydney&apos;s Trusted Emergency Restoration Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Harbour Bridge high-rises to Sutherland family homes, 
                we protect Sydney properties 24/7. Don&apos;t let damage escalate.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">60-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Sydney-based teams are strategically positioned across all regions. 
                  When disaster strikes your Sydney property, we&apos;re already on our way.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  Get Sydney Emergency Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/water-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Emergency Checklist
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Sydney postcodes: 2000-2234 • Northern Beaches to Sutherland • Blue Mountains to Eastern Suburbs</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}