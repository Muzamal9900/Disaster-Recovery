'use client';

import { Building, DollarSign, FileText, CheckCircle, AlertCircle, ExternalLink, Download, Calendar } from 'lucide-react';

export default function GovernmentFundingPage() {
  const fundingPrograms = [
    {
      name: 'Disaster Recovery Funding Arrangements (DRFA)',
      agency: 'Australian Government',
      type: 'Grant',
      amount: 'Up to $75,000',
      eligibility: 'Primary producers and small businesses affected by declared disasters',
      status: 'active',
      deadline: 'Ongoing',
      description: 'Financial assistance for disaster-affected communities to rebuild essential infrastructure'
    },
    {
      name: 'Queensland Reconstruction Authority Grants',
      agency: 'QLD Government',
      type: 'Grant',
      amount: 'Variable',
      eligibility: 'Queensland residents affected by natural disasters',
      status: 'active',
      deadline: '30 June 2024',
      description: 'Support for flood and cyclone recovery efforts across Queensland'
    },
    {
      name: 'NSW Disaster Relief Grants',
      agency: 'NSW Government',
      type: 'Grant',
      amount: 'Up to $50,000',
      eligibility: 'NSW property owners with uninsured disaster damage',
      status: 'active',
      deadline: 'Applications open',
      description: 'Emergency assistance for bushfire and flood-affected properties'
    },
    {
      name: 'Small Business Recovery Grant',
      agency: 'Federal Government',
      type: 'Grant',
      amount: 'Up to $50,000',
      eligibility: 'Small businesses in declared disaster zones',
      status: 'active',
      deadline: 'Rolling applications',
      description: 'Help small businesses recover and rebuild after natural disasters'
    },
    {
      name: 'Primary Producer Recovery Grant',
      agency: 'Department of Agriculture',
      type: 'Grant/Loan',
      amount: 'Up to $100,000',
      eligibility: 'Primary producers affected by drought, flood, or fire',
      status: 'active',
      deadline: 'Ongoing',
      description: 'Financial support for agricultural businesses to recover from disasters'
    }
  ];

  const applicationSteps = [
    'Check eligibility criteria for your situation',
    'Gather required documentation (damage assessments, quotes, insurance)',
    'Register on the relevant government portal',
    'Complete online application form',
    'Submit supporting documents',
    'Await assessment (typically 2-4 weeks)',
    'Receive funding decision',
    'Complete acquittal requirements'
  ];

  const requiredDocuments = [
    'Proof of property ownership or lease',
    'Evidence of disaster damage (photos, reports)',
    'Insurance claim documentation',
    'Professional restoration quotes',
    'Business registration (if applicable)',
    'Financial statements',
    'Statutory declarations',
    'Council rates notices'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Government Funding & Assistance</h1>
          <p className="text-gray-200">Access disaster recovery grants and financial support programs</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">New Funding Available</h2>
              <p className="mb-3">Recent disaster declarations have triggered additional funding programs. Check your eligibility for emergency assistance.</p>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Check Eligibility Now
              </button>
            </div>
          </div>
        </div>

        {/* Funding Programs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Available Funding Programs</h2>
          <div className="grid gap-6">
            {fundingPrograms.map((program, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Building className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-semibold text-white">{program.name}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {program.status === 'active' ? 'Active' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{program.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-200">Agency:</span>
                        <span className="text-white ml-2">{program.agency}</span>
                      </div>
                      <div>
                        <span className="text-gray-200">Type:</span>
                        <span className="text-white ml-2">{program.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-200">Amount:</span>
                        <span className="text-green-400 font-semibold ml-2">{program.amount}</span>
                      </div>
                      <div>
                        <span className="text-gray-200">Deadline:</span>
                        <span className="text-yellow-400 ml-2">{program.deadline}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-200 text-sm mb-1">Eligibility:</p>
                      <p className="text-gray-300 text-sm">{program.eligibility}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Apply Now
                    </button>
                    <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Process */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Application Process</h2>
              <ol className="space-y-3">
                {applicationSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-300 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Resources */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Resources & Forms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Disaster Declaration Map',
                  'Eligibility Calculator',
                  'Application Form Template',
                  'Damage Assessment Guide',
                  'Insurance Gap Calculator',
                  'Grant Acquittal Forms'
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="text-white">{resource}</span>
                    <button className="p-2 text-blue-400 hover:text-blue-300">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Required Documents</h3>
              <ul className="space-y-2">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { name: 'National Emergency Management Agency', url: '#' },
                  { name: 'Services Australia Disaster Support', url: '#' },
                  { name: 'State Emergency Services', url: '#' },
                  { name: 'Red Cross Disaster Relief', url: '#' }
                ].map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <span className="text-white group-hover:text-blue-400">{link.name}</span>
                    <ExternalLink className="w-4 h-4 text-gray-200 group-hover:text-blue-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-3">Need Help?</h3>
              <p className="text-white/90 text-sm mb-4">Our team can assist with grant applications and documentation</p>
              <button className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Application Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}