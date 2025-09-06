'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Brain, 
  Heart, 
  AlertTriangle,
  Award,
  TrendingUp,
  Users,
  Activity,
  Building
} from 'lucide-react';

export default function WhyFirstPage() {
  const criticalStats = [
    {
      number: "4,000",
      label: "Annual deaths from building hazards",
      detail: "More than the national road toll"
    },
    {
      number: "24-48",
      label: "Critical hours",
      detail: "Window to prevent permanent damage"
    },
    {
      number: "$1.37B",
      label: "Australian market value",
      detail: "Growing at 5.88% annually"
    },
    {
      number: "1 in 3",
      label: "Homes affected by mould",
      detail: "Impacting millions of Australians"
    }
  ];

  const scientificEvidence = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Cognitive Performance",
      stat: "9% productivity loss",
      description: "Poor indoor air quality reduces cognitive function by up to 9%. Professional restoration prevents this invisible threat."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Protection",
      stat: "688 mesothelioma deaths annually",
      description: "Australia has the second-highest mesothelioma death rate globally. Professional assessment prevents deadly exposure."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      stat: "50% faster recovery",
      description: "Professional restoration reduces recovery time by half compared to general contractors. Every hour matters."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Economic Impact",
      stat: "50% cost reduction",
      description: "Professional intervention saves 20-50% on recovery costs while preventing secondary damage."
    }
  ];

  const catalystRole = [
    {
      discipline: "Building Science",
      connection: "Material toxicity identification, structural drying physics, moisture dynamics"
    },
    {
      discipline: "Medical Science",
      connection: "Environmental health assessment, exposure pathway analysis, respiratory protection"
    },
    {
      discipline: "Environmental Chemistry",
      connection: "VOC detection, mycotoxin identification, chemical contamination protocols"
    },
    {
      discipline: "Insurance Law",
      connection: "Damage documentation, causation analysis, compliance verification"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Shield className="w-16 h-16 mx-auto mb-4 text-blue-300" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Science Behind
              <span className="block text-blue-300 mt-2">Who&apos;s First</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Restoration professionals are not cleanup crews. They are critical first responders 
              protecting 25 million Australians from invisible killers in our built environment.
            </p>

            <div className="bg-red-600/20 border-2 border-red-400 rounded-lg p-6 mt-8">
              <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-red-300" />
              <p className="text-lg font-semibold">
                Every minute without professional intervention increases health risks exponentially.
                The difference between restoration and renovation is the difference between life and death.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Critical Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {criticalStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.detail}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Invisible Killers */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              The Invisible Killers in Your Walls
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/30 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-400">Asbestos Reality</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▶</span>
                    <span>Kills more Australians annually than road accidents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▶</span>
                    <span>Found in 79 Sydney sites in 2024, including playgrounds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▶</span>
                    <span>57% increase in removal notifications since 2019</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black/30 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">VOC Contamination</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">▶</span>
                    <span>Indoor levels 5x higher than outdoor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">▶</span>
                    <span>91% of formaldehyde released in first 50 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">▶</span>
                    <span>Causes cancer, respiratory illness, neurological damage</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-600/20 border-2 border-blue-400 rounded-lg p-8 text-center">
              <p className="text-xl font-semibold mb-4">
                General builders use &quot;rip and tear&quot; methods that release these toxins.
              </p>
              <p className="text-lg">
                Certified restoration professionals use containment protocols that save lives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scientific Evidence */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
              The Science Is Undeniable
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Peer-reviewed research proves professional restoration saves lives and money
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {scientificEvidence.map((evidence, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {evidence.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{evidence.title}</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">{evidence.stat}</div>
                      <p className="text-gray-600">{evidence.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Catalyst Role */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">
              The Critical Catalyst
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Restoration professionals connect multiple disciplines to save lives
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {catalystRole.map((role, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-blue-600 pl-6 py-2"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{role.discipline}</h3>
                    <p className="text-gray-600">{role.connection}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
                <Activity className="w-8 h-8 mb-3" />
                <p className="text-lg font-semibold">
                  No other profession combines this expertise. Restoration professionals are the only 
                  specialists trained to identify, contain, and eliminate multiple simultaneous threats 
                  while coordinating with insurance, medical, and construction sectors.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Climate Change Reality */}
      <section className="py-20 bg-gradient-to-br from-red-900 to-orange-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-8">
              The Climate Crisis Demands Professional Response
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black/30 p-6 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400 mb-2">40%</div>
                <p>Increase in weather disasters since 2019</p>
              </div>
              <div className="bg-black/30 p-6 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400 mb-2">1.51°C</div>
                <p>Temperature increase since 1910</p>
              </div>
              <div className="bg-black/30 p-6 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400 mb-2">30%</div>
                <p>Expected rainfall increase by 2030</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-xl leading-relaxed">
                Every disaster creates a cascade of health hazards. Water damage leads to mould. 
                Fire releases toxins. Storms disturb asbestos. Without professional intervention 
                within 24-48 hours, temporary damage becomes permanent health threats.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
              The Professional Difference
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-lg shadow-lg">
                <Award className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Certified Professionals</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>IICRC certification requiring continuous education</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Specialized training in 30+ disaster categories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>24/7 availability for emergency response</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Advanced equipment worth $100,000+</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-lg shadow-lg">
                <Building className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">General Builders</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>No disaster-specific training required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>&quot;Rip and tear&quot; approach releases toxins</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>Business hours only - delays increase damage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>Basic tools inadequate for contamination</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <p className="text-2xl font-bold mb-4">
                Less than 10,000 IICRC-certified technicians serve 25 million Australians
              </p>
              <p className="text-lg">
                Only 3.7% achieve Master Technician status. This elite group represents 
                fewer than 370 Master Technicians protecting an entire nation.
              </p>
            </div>
          </motion.div>
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
              When Disaster Strikes, Seconds Count
            </h2>
            
            <p className="text-xl mb-12 leading-relaxed">
              The question is not whether you need professional restoration. 
              The question is whether you can afford to wait.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <p className="text-2xl font-bold mb-4">Who&apos;s First?</p>
              <p className="text-lg">
                The certified professionals who arrive within hours, not days. 
                The specialists who see invisible dangers. The experts who turn 
                disaster zones back into safe homes.
              </p>
            </div>

            <motion.a
              href="/emergency"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Emergency Help Now
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}