import { BookOpen, Shield, Server, Briefcase, Lightbulb, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SuggestedQuestion = { text: string; category: string; icon: LucideIcon };

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { text: "What are d.engage's main product capabilities and differentiators?", category: "Product", icon: BookOpen },
  { text: "How does d.engage handle data security and GDPR compliance?", category: "Security", icon: Shield },
  { text: "What is the technical architecture and infrastructure of d.engage?", category: "Technical", icon: Server },
  { text: "Can you share relevant case studies for the banking or financial services sector?", category: "Case Studies", icon: Briefcase },
  { text: "What omnichannel use cases does d.engage support?", category: "Use Cases", icon: Lightbulb },
  { text: "How does d.engage compare to competitors like Salesforce Marketing Cloud?", category: "Competitive", icon: FileText },
];

export const RFP_SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { text: "Does your platform support real-time event-triggered campaigns?", category: "Capabilities", icon: Lightbulb },
  { text: "What SLAs and uptime guarantees do you provide?", category: "SLA", icon: Shield },
  { text: "Describe your data residency and sovereignty options.", category: "Security", icon: Server },
  { text: "What integration methods are available with our existing CRM and data warehouse?", category: "Integration", icon: BookOpen },
];
