'use client';

import { Brain, Bot, LineChart, Shield, Zap, Target, MessageSquare, TrendingUp } from 'lucide-react';

export default function TechnologyAIPage() {
  const aiCapabilities = [
    {
      icon: Bot,
      title: '24/7 AI Assistant',
      description: 'Intelligent chatbot handles customer inquiries instantly, providing damage assessment guidance and connecting to appropriate contractors',
      features: ['Natural language processing', 'Multi-language support', 'Instant quote generation', 'Smart triage system']
    },
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'Machine learning algorithms predict damage severity, restoration timelines, and cost estimates with 95% accuracy',
      features: ['Damage pattern recognition', 'Cost prediction models', 'Timeline optimization', 'Risk assessment']
    },
    {
      icon: LineChart,
      title: 'Smart Routing',
      description: 'AI-powered job distribution system matches claims to the best available contractors based on expertise, location, and capacity',
      features: ['Real-time contractor matching', 'Load balancing', 'Performance tracking', 'Geographic optimization']
    },
    {
      icon: Shield,
      title: 'Fraud Detection',
      description: 'Advanced algorithms detect fraudulent claims and suspicious patterns, protecting insurers and legitimate customers',
      features: ['Anomaly detection', 'Pattern analysis', 'Image verification', 'Cross-reference checking']
    }
  ];

  const aiStats = [
    { label: 'Response Time', value: '<30 sec', improvement: '95% faster' },
    { label: 'Accuracy Rate', value: '98.5%', improvement: '+23% vs manual' },
    { label: 'Claims Processed', value: '10,000+', improvement: 'Per month' },
    { label: 'Cost Reduction', value: '45%', improvement: 'Operational savings' }
  ];

  const workflowSteps = [
    { step: 1, title: 'Claim Received', description: 'AI instantly analyzes claim details and severity' },
    { step: 2, title: 'Assessment', description: 'Computer vision analyzes damage photos and documents' },
    { step: 3, title: 'Contractor Match', description: 'Algorithm selects optimal contractor based on 20+ factors' },
    { step: 4, title: 'Real-time Updates', description: 'AI monitors progress and predicts completion times' },
    { step: 5, title: 'Quality Assurance', description: 'Machine learning validates work quality and compliance' },
    { step: 6, title: 'Continuous Learning', description: 'System improves with every claim processed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">AI-Powered Restoration</h1>
          <p className="text-gray-200 text-lg">Revolutionary artificial intelligence transforming disaster recovery</p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Next-Generation AI Technology</h2>
              <p className="text-white/90 mb-6">
                Our proprietary AI system processes thousands of claims daily, learning from each interaction to deliver 
                faster, more accurate, and cost-effective disaster recovery solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  See AI in Action
                </button>
                <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors">
                  Technical Specs
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <Brain className="w-24 h-24 text-white mx-auto mb-4" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white mb-2">Neural Network</p>
                  <p className="text-gray-300">Processing 1M+ data points/second</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiStats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-gray-300 mb-1">{stat.label}</p>
              <p className="text-green-400 text-sm font-semibold">{stat.improvement}</p>
            </div>
          ))}
        </div>

        {/* AI Capabilities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">AI Capabilities</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{capability.title}</h3>
                    <p className="text-gray-300 mb-4">{capability.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {capability.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Workflow */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Intelligent Workflow Automation</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-0"></div>
                )}
                <div className="relative bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                    <h3 className="text-white font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Demo Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 mb-12">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Experience Our AI Assistant</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Chat with our AI bot now to see how it can assess damage, provide instant quotes, 
              and connect you with the right restoration professionals in seconds.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              Start AI Chat Demo
            </button>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Processing Power', value: '500 TFLOPS', icon: Zap },
              { label: 'Response Latency', value: '<100ms', icon: Target },
              { label: 'Uptime SLA', value: '99.99%', icon: Shield },
              { label: 'Languages Supported', value: '25+', icon: MessageSquare },
              { label: 'Daily Transactions', value: '1M+', icon: TrendingUp },
              { label: 'Model Accuracy', value: '98.5%', icon: Brain }
            ].map((spec, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <spec.icon className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">{spec.label}</p>
                  <p className="text-white font-semibold text-lg">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}