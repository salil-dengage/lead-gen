export type SuggestedQuestion = { text: string; category: string };

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { text: "What are d.engage's main product capabilities and differentiators?", category: "Product" },
  { text: "How does d.engage handle data security and GDPR compliance?", category: "Security" },
  { text: "What is the technical architecture and infrastructure of d.engage?", category: "Technical" },
  { text: "Can you share relevant case studies for the banking or financial services sector?", category: "Case Studies" },
  { text: "What omnichannel use cases does d.engage support?", category: "Use Cases" },
  { text: "How does d.engage compare to competitors like Salesforce Marketing Cloud?", category: "Competitive" },
];

export const RFP_SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { text: "Does your platform support real-time event-triggered campaigns?", category: "Capabilities" },
  { text: "What SLAs and uptime guarantees do you provide?", category: "SLA" },
  { text: "Describe your data residency and sovereignty options.", category: "Security" },
  { text: "What integration methods are available with our existing CRM and data warehouse?", category: "Integration" },
];
