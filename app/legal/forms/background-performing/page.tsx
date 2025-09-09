import LegalFormLayout from '../../../../src/components/legal/LegalFormLayout';

export default function BackgroundPerformingPage() {
  const sections = [
    {
      title: "1. BACKGROUND VERIFICATION REQUIREMENTS",
      content: `All contractors and key personnel performing restoration services must undergo comprehensive background checks to ensure the safety and security of our clients' properties and maintain the highest standards of professional conduct.`
    },
    {
      title: "2. SCREENING COMPONENTS",
      content: `Background verification includes but is not limited to:
      • Criminal history check (national and state levels)
      • Identity verification and right to work status
      • Professional license verification
      • Insurance and bond verification
      • Previous employment verification
      • Reference checks from previous clients
      • Drug and alcohol screening where required
      • Driving record check for personnel operating vehicles`
    },
    {
      title: "3. PERFORMANCE STANDARDS",
      content: `All contractors performing services must maintain:
      • Minimum performance rating of 4.5/5.0 based on client feedback
      • Response time within agreed service level agreements
      • Completion of work within estimated timeframes (±10%)
      • Compliance with all safety and quality standards
      • Proper documentation and reporting practices
      • Professional conduct and communication standards`
    },
    {
      title: "4. DISQUALIFYING FACTORS",
      content: `The following may result in automatic disqualification:
      • Felony convictions within the past 10 years
      • Theft, fraud, or property crime convictions
      • False information on application or screening documents
      • Failure to maintain required insurance coverage
      • Pattern of client complaints or performance issues
      • Violation of safety protocols or regulations
      • Substance abuse violations`
    },
    {
      title: "5. ONGOING MONITORING",
      content: `Background and performance monitoring is an ongoing process:
      • Annual re-verification of credentials and licenses
      • Continuous monitoring of criminal records
      • Regular performance evaluations based on KPIs
      • Client feedback and satisfaction surveys
      • Random quality audits and inspections
      • Compliance checks with industry standards`
    },
    {
      title: "6. PERFORMANCE IMPROVEMENT",
      content: `Contractors with performance issues will be subject to:
      • Performance improvement plans with specific targets
      • Additional training and certification requirements
      • Increased supervision and quality checks
      • Temporary suspension from high-value projects
      • Probationary periods with enhanced monitoring
      • Potential termination for continued non-compliance`
    },
    {
      title: "7. DATA PROTECTION",
      content: `All background check information will be:
      • Handled in accordance with privacy laws
      • Stored securely with restricted access
      • Used solely for verification and safety purposes
      • Retained only for the required legal period
      • Destroyed securely after retention period expires`
    },
    {
      title: "8. APPEAL PROCESS",
      content: `Contractors may appeal adverse decisions through:
      • Written request within 30 days of notification
      • Opportunity to provide additional information
      • Review by independent committee
      • Final decision within 14 business days
      • Documentation of all appeal proceedings`
    },
    {
      title: "9. CONTRACTOR ACKNOWLEDGMENT",
      content: `By participating in the network, contractors acknowledge and agree to:
      • Consent to initial and ongoing background checks
      • Maintain all required licenses and certifications
      • Meet or exceed performance standards
      • Participate in quality improvement programs
      • Comply with all platform policies and procedures`
    }
  ];

  return (
    <LegalFormLayout
      title="Background & Performance Standards"
      lastUpdated="2024-03-15"
      version="2.0"
      sections={sections}
    />
  );
}