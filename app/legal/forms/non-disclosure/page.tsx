import LegalFormLayout from '../../../components/legal/LegalFormLayout';

export default function NonDisclosurePage() {
  const sections = [
    {
      title: "1. DEFINITION OF CONFIDENTIAL INFORMATION",
      content: `"Confidential Information" means all information disclosed by one party to the other, whether orally, in writing, or in any other form, including but not limited to:
      • Client personal and property information
      • Insurance claim details and documentation
      • Pricing structures and cost estimates
      • Proprietary restoration techniques and methods
      • Business strategies and operational procedures
      • Software, algorithms, and technical specifications
      • Financial information and projections
      • Marketing plans and customer lists`
    },
    {
      title: "2. OBLIGATIONS OF RECEIVING PARTY",
      content: `The receiving party agrees to:
      • Maintain strict confidentiality of all Confidential Information
      • Not disclose Confidential Information to any third parties
      • Use Confidential Information solely for authorized purposes
      • Protect Confidential Information with reasonable security measures
      • Limit access to employees with a legitimate need to know
      • Ensure all employees are bound by confidentiality obligations
      • Not reverse engineer or derive proprietary methods
      • Return or destroy Confidential Information upon request`
    },
    {
      title: "3. EXCLUSIONS FROM CONFIDENTIALITY",
      content: `Confidential Information does not include information that:
      • Was publicly known at the time of disclosure
      • Becomes publicly known through no breach of this agreement
      • Was rightfully known by receiving party prior to disclosure
      • Is independently developed without use of Confidential Information
      • Is rightfully obtained from a third party without breach
      • Must be disclosed by law or court order (with prior notice)`
    },
    {
      title: "4. TERM AND DURATION",
      content: `This Non-Disclosure Agreement shall:
      • Commence upon execution by both parties
      • Continue for the duration of the business relationship
      • Survive termination of the business relationship
      • Obligations continue for five (5) years after termination
      • Trade secrets remain confidential indefinitely
      • Certain information may be subject to longer periods by law`
    },
    {
      title: "5. PERMITTED DISCLOSURES",
      content: `Confidential Information may be disclosed only:
      • To employees or contractors with a need to know
      • To professional advisors bound by confidentiality
      • As required by law with prior written notice
      • With prior written consent of the disclosing party
      • To insurers as necessary for claim processing
      • To regulatory authorities as required`
    },
    {
      title: "6. BREACH AND REMEDIES",
      content: `In the event of breach or threatened breach:
      • Immediate injunctive relief may be sought
      • Monetary damages including consequential losses
      • Recovery of legal fees and costs
      • Immediate termination of business relationship
      • Notification to affected parties as required
      • Cooperation in mitigation efforts
      • Indemnification for third-party claims`
    },
    {
      title: "7. RETURN OF INFORMATION",
      content: `Upon termination or request, receiving party must:
      • Immediately cease use of Confidential Information
      • Return all documents and materials
      • Delete all electronic copies and databases
      • Provide written certification of compliance
      • Destroy any analyses or derivatives
      • Ensure no copies are retained`
    },
    {
      title: "8. NO LICENSE OR RIGHTS",
      content: `This agreement does not grant:
      • Any license to intellectual property rights
      • Any ownership rights in Confidential Information
      • Any right to use trademarks or trade names
      • Any obligation to disclose Confidential Information
      • Any obligation to enter into further agreements`
    },
    {
      title: "9. GOVERNING LAW AND JURISDICTION",
      content: `This agreement shall be:
      • Governed by the laws of Australia
      • Subject to exclusive jurisdiction of Australian courts
      • Interpreted according to its plain meaning
      • Severable if any provision is deemed invalid
      • The entire agreement between the parties
      • Modified only by written agreement`
    },
    {
      title: "10. ACKNOWLEDGMENT AND ACCEPTANCE",
      content: `By signing below, the parties acknowledge:
      • They have read and understood all terms
      • They have authority to bind their organization
      • They will comply with all obligations
      • Breach may result in irreparable harm
      • This agreement is legally binding and enforceable`
    }
  ];

  return (
    <LegalFormLayout
      title="Non-Disclosure Agreement (NDA)"
      lastUpdated="2024-03-15"
      version="2.0"
      sections={sections}
    />
  );
}