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
  Thermometer,
  Wind,
  Droplets,
  Home
} from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

export default function AdelaideLocationPage() {
  // Comprehensive local SEO schema for Adelaide
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://disaster-recovery-seven.vercel.app/locations/adelaide#business",
        "name": "Disaster Recovery Adelaide",
        "description": "24/7 IICRC-certified disaster restoration services in Adelaide and South Australia. Specialists in extreme heat damage, storm recovery, and flash flooding across Adelaide CBD, Northern Adelaide, Southern Adelaide, Adelaide Hills, and Barossa Valley.",
        "url": "https://disaster-recovery-seven.vercel.app/locations/adelaide",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Adelaide",
          "addressRegion": "SA",
          "postalCode": "5000",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -34.9285,
          "longitude": 138.6007
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
            "name": "Adelaide CBD"
          },
          {
            "@type": "Place",
            "name": "Northern Adelaide"
          },
          {
            "@type": "Place",
            "name": "Southern Adelaide"
          },
          {
            "@type": "Place",
            "name": "Adelaide Hills"
          },
          {
            "@type": "Place",
            "name": "Barossa Valley"
          },
          {
            "@type": "Place",
            "name": "McLaren Vale"
          },
          {
            "@type": "Place",
            "name": "Mount Barker"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How quickly can you respond to emergencies in Adelaide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide 60-minute emergency response across Adelaide metro areas including CBD, North Adelaide, and inner suburbs. Outer areas like Adelaide Hills and Mount Barker typically see 75-90 minute response times. Our IICRC-certified technicians are strategically positioned across Adelaide for rapid 24/7 deployment, with special readiness during extreme heat events."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle extreme heat damage in Adelaide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialise in extreme heat damage restoration throughout Adelaide. With regular temperatures exceeding 40°C in summer, we handle burst pipes, structural stress damage, and heat-related property issues. Our teams are equipped with heat-adapted equipment and maintain heightened readiness during heatwave warnings."
            }
          },
          {
            "@type": "Question",
            "name": "What Adelaide suburbs do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all Adelaide suburbs from Gawler to Aldinga, Adelaide Hills to the coast. This includes Adelaide CBD, North Adelaide, Glenelg, Unley, Norwood, Prospect, Tea Tree Gully, Marion, and all surrounding areas. Our coverage extends throughout the Adelaide metropolitan area and regional SA."
            }
          }
        ]
      }
    ]
  };

  const adelaideSuburbs = [
    { area: "Adelaide CBD", response: "45 min", population: "25,000", risk: "Flash Flooding" },
    { area: "Northern Suburbs", response: "60 min", population: "300,000", risk: "Heat/Storms" },
    { area: "Eastern Suburbs", response: "55 min", population: "200,000", risk: "Flooding" },
    { area: "Adelaide Hills", response: "75 min", population: "70,000", risk: "Bushfire/Storms" },
    { area: "Southern Suburbs", response: "70 min", population: "250,000", risk: "Coastal Storms" },
    { area: "Western Suburbs", response: "60 min", population: "180,000", risk: "Storm Surge" },
    { area: "Barossa Valley", response: "90 min", population: "25,000", risk: "Heat/Fire" },
    { area: "Mount Barker", response: "85 min", population: "40,000", risk: "Storms/Fire" }
  ];

  const adelaideDisasters = [
    {
      type: "Extreme Heat",
      frequency: "Annual crisis",
      areas: "All suburbs - infrastructure stress",
      season: "December-March",
      icon: <Thermometer className="w-6 h-6" />
    },
    {
      type: "Flash Flooding",
      frequency: "Regular",
      areas: "CBD, Keswick, Thebarton",
      season: "Winter/Spring",
      icon: <Droplets className="w-6 h-6" />
    },
    {
      type: "Severe Storms",
      frequency: "Frequent",
      areas: "Hills, Northern suburbs",
      season: "Year-round peaks",
      icon: <Wind className="w-6 h-6" />
    },
    {
      type: "Bushfires",
      frequency: "High risk",
      areas: "Adelaide Hills, Mount Lofty",
      season: "November-March",
      icon: <Home className="w-6 h-6" />
    }
  ];

  const recentProjects = [
    {
      type: "Extreme Heat Event",
      location: "Adelaide CBD",
      damage: "2024 heatwave - 50 burst pipes",
      response: "Multiple teams deployed",
      outcome: "All properties restored in 48hrs"
    },
    {
      type: "Flash Flooding",
      location: "Keswick",
      damage: "Storm water overflow - 30 properties",
      response: "45 minutes",
      outcome: "Emergency pumping immediate"
    },
    {
      type: "Hills Bushfire",
      location: "Adelaide Hills",
      damage: "2023 fires - 8 properties",
      response: "Immediate deployment",
      outcome: "Smoke remediation completed"
    },
    {
      type: "Commercial Complex",
      location: "North Adelaide",
      damage: "HVAC failure - heat damage",
      response: "50 minutes",
      outcome: "Business continuity maintained"
    }
  ];

  const uniqueChallenges = [
    {
      challenge: "Driest Capital City",
      impact: "Extreme dryness increases fire risk and structural stress",
      solution: "Specialised dry climate restoration techniques"
    },
    {
      challenge: "46.6°C Record Heat",
      impact: "Infrastructure failure and pipe bursts during heatwaves",
      solution: "Heat-emergency rapid response protocols"
    },
    {
      challenge: "Brown Hill Creek",
      impact: "Regular flash flooding in eastern suburbs",
      solution: "Pre-positioned flood response equipment"
    },
    {
      challenge: "Adelaide Hills Fire Zone",
      impact: "Extreme bushfire risk to hillside communities",
      solution: "Dedicated Hills fire response team"
    }
  ];

  return (
    <>
      <Script
        id="adelaide-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section with Local Focus */}
        <section className="relative bg-gradient-to-br from-red-900 via-amber-800 to-red-900 text-white py-20 overflow-hidden">
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
                  ✓ Heatwave Ready
                </span>
                <span className="bg-blue-500/20 border border-blue-400 px-3 py-1 rounded-full text-sm">
                  ✓ SA Licensed
                </span>
                <span className="bg-yellow-500/20 border border-yellow-400 px-3 py-1 rounded-full text-sm">
                  ✓ 60min Response
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Disaster Recovery Adelaide
                <span className="block text-amber-300 text-3xl md:text-4xl mt-2">
                  South Australia&apos;s Extreme Climate Restoration Experts
                </span>
              </h1>
              
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                From record-breaking heatwaves to Adelaide Hills bushfires - our IICRC-certified technicians 
                provide <strong>60-minute emergency response</strong> across Greater Adelaide. 
                Specialists in extreme heat damage, flash flooding, and bushfire recovery 
                for Australia&apos;s driest capital city.
              </p>

              {/* Adelaide-Specific Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">1.4M</div>
                  <div className="text-sm">Adelaide Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">280+</div>
                  <div className="text-sm">Suburbs Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">46.6°C</div>
                  <div className="text-sm">Record Temp Ready</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Emergency Service</div>
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
                  Adelaide Emergency Response
                </motion.a>
                <motion.a
                  href="/claim"
                  className="bg-white text-red-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Submit Online Claim
                </motion.a>
              </div>

              {/* Heatwave Warning */}
              <div className="mt-8 bg-orange-600/30 border-2 border-orange-400 rounded-lg p-4">
                <p className="font-semibold flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  Extreme Heat Warning: Adelaide forecast 40°C+ - check pipes and AC systems
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Adelaide's Unique Challenges */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Adelaide&apos;s Unique Restoration Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {uniqueChallenges.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-amber-800 mb-2">{item.challenge}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.impact}</p>
                  <p className="text-sm text-green-700 font-semibold">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adelaide Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Adelaide Service Areas & Risk Zones
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Strategic coverage from Gawler to Aldinga, coast to Adelaide Hills
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {adelaideSuburbs.map((suburb, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="w-8 h-8 text-amber-600 mb-3" />
                  <h3 className="text-xl font-bold mb-2">{suburb.area}</h3>
                  <p className="text-amber-600 font-semibold mb-1">
                    {suburb.response} response
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    Population: {suburb.population}
                  </p>
                  <p className={`text-sm font-semibold ${
                    suburb.risk.includes('Bushfire') ? 'text-red-600' :
                    suburb.risk.includes('Heat') ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    Primary Risk: {suburb.risk}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-amber-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3">Complete Adelaide Metropolitan Coverage:</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>City & North:</strong> Adelaide CBD, North Adelaide, Prospect, Enfield, Salisbury, Elizabeth, Gawler • 
                <strong>Eastern Suburbs:</strong> Norwood, Burnside, Campbelltown, Paradise, Rostrevor, Magill • 
                <strong>Adelaide Hills:</strong> Stirling, Crafers, Mount Barker, Bridgewater, Aldgate, Belair • 
                <strong>Southern Suburbs:</strong> Marion, Mitchell Park, Bedford Park, Flagstaff Hill, Aberfoyle Park • 
                <strong>Western Suburbs:</strong> West Lakes, Henley Beach, Grange, Semaphore, Port Adelaide • 
                <strong>Coastal South:</strong> Glenelg, Brighton, Hove, Seacliff, Hallett Cove, Aldinga
              </p>
            </div>
          </div>
        </section>

        {/* Adelaide Disaster Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Adelaide&apos;s Climate Disaster Risks
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Specialised response for Australia&apos;s driest capital city
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {adelaideDisasters.map((disaster, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
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

            <div className="mt-12 p-6 bg-orange-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-orange-800">Adelaide Extreme Heat Protocol</h3>
              <p className="text-gray-700">
                As Australia&apos;s driest capital with regular 40°C+ temperatures, Adelaide faces unique 
                heat-related property damage. Our teams maintain constant readiness for burst pipes, 
                HVAC failures, and structural stress damage during heatwaves, with pre-positioned 
                equipment across the metro area.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Adelaide Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Recent Adelaide Emergency Responses
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Proven expertise across Adelaide&apos;s diverse property types
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
                    <Building className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.type}</h3>
                      <p className="text-amber-600 font-semibold mb-1">{project.location}</p>
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

        {/* Why Choose Adelaide Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Adelaide Properties Need Climate-Adapted Specialists
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-amber-600">Adelaide&apos;s Extreme Conditions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Record heat:</strong> 46.6°C extremes cause infrastructure failure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Driest capital:</strong> Extreme dryness increases fire risk</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Flash flooding:</strong> Brown Hill Creek overflow events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>Hills fires:</strong> Extreme bushfire risk zone</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-amber-600">Our Adelaide Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-amber-600 mt-0.5" />
                      <span><strong>Local teams:</strong> Know Adelaide&apos;s unique challenges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <span><strong>Heat-ready:</strong> Equipped for extreme temperatures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <span><strong>Flood response:</strong> Brown Hill Creek specialists</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-amber-600 mt-0.5" />
                      <span><strong>Heritage care:</strong> Experience with Adelaide&apos;s historic buildings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-red-900 to-amber-800 text-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Adelaide&apos;s Most Trusted Disaster Recovery Service
              </h2>
              
              <p className="text-xl mb-8 leading-relaxed">
                From Glenelg beachfront to Adelaide Hills vineyards, from Elizabeth to McLaren Vale - 
                we protect Adelaide properties against SA&apos;s extreme climate challenges 24/7.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
                <p className="text-2xl font-bold mb-4">60-Minute Response Guarantee</p>
                <p className="text-lg">
                  Our Adelaide teams understand SA&apos;s unique challenges. Whether it&apos;s an 
                  extreme heat emergency or flash flooding, we&apos;re equipped and ready.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/claim"
                  className="bg-white text-red-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5" />
                  Get Adelaide Emergency Help
                </motion.a>
                <motion.a
                  href="/emergency/checklists/heat-damage"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Heat Emergency Guide
                </motion.a>
              </div>

              <div className="mt-8 text-sm opacity-90">
                <p>Servicing all Adelaide postcodes: 5000-5199 • Gawler to Aldinga • Coast to Adelaide Hills</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}