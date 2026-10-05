import React, { useState } from 'react';
import { 
  Building2, ArrowRight, ArrowUpRight, CheckCircle2, 
  Scale, FileText, Calendar, Clock, ShieldCheck, ChevronRight,
  Send, Compass, Briefcase, Globe, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BUSINESS_STRUCTURES, 
  SETUP_STEPS, 
  REGISTRATION_PATHWAYS, 
  ONGOING_COMPLIANCE_ITEMS 
} from '../data/businessData';
import { 
  BusinessStructure, 
  SetupStep, 
  AdditionalRegistration, 
  OngoingComplianceItem, 
  DetailDrawerData 
} from '../types';

interface BusinessSetupViewProps {
  theme: 'dark' | 'light';
  onOpenDrawer: (data: DetailDrawerData) => void;
  onNavigateRoute: (route: string) => void;
  preselectedStructure?: string | null;
}

export const BusinessSetupView: React.FC<BusinessSetupViewProps> = ({
  theme,
  onOpenDrawer,
  onNavigateRoute,
  preselectedStructure
}) => {
  const [selectedJourney, setSelectedJourney] = useState<string>('new-business');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [docketCode, setDocketCode] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    country: 'India',
    email: '',
    phone: '',
    businessType: 'I am starting a new business',
    entityType: preselectedStructure || 'Private Limited Company',
    industry: 'Technology',
    currentStage: 'Idea / Pre-incorporation',
    requirement: 'Company Incorporation & Foundational Licenses',
    message: ''
  });

  const JOURNEY_OPTIONS = [
    { id: 'new-business', label: 'I am starting a new business', targetTab: 'structures' },
    { id: 'existing-company', label: 'I already have a company', targetTab: 'compliance' },
    { id: 'gst-compliance', label: 'I need GST / compliance support', targetTab: 'registrations' },
    { id: 'nri-foreign', label: 'I am an NRI / foreign entrepreneur', targetTab: 'international' },
    { id: 'ongoing-secretarial', label: 'I need ongoing compliance', targetTab: 'compliance' },
    { id: 'corporate-advisory', label: 'I need corporate advisory', targetTab: 'advisory' }
  ];

  const handleJourneyClick = (opt: typeof JOURNEY_OPTIONS[0]) => {
    setSelectedJourney(opt.id);
    if (opt.id === 'nri-foreign') {
      onNavigateRoute('international');
      return;
    }
    if (opt.id === 'corporate-advisory') {
      onNavigateRoute('services');
      return;
    }
    const elem = document.getElementById(opt.targetTab);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStepClick = (step: SetupStep) => {
    onOpenDrawer({
      category: `Step ${step.number} · Setup Journey`,
      title: step.title,
      subtitle: step.subtitle,
      overview: step.overview,
      covers: step.covers,
      requirements: step.requirements,
      statutoryRef: step.statutoryRef,
      actionLabel: `Inquire for ${step.title}`
    });
  };

  const handleStructureClick = (structure: BusinessStructure) => {
    onOpenDrawer({
      category: 'Business Structure Architecture',
      title: structure.name,
      subtitle: structure.subtitle,
      overview: structure.overview,
      covers: structure.covers,
      requirements: structure.requirements,
      statutoryRef: structure.governingLaw,
      entityType: structure.name,
      actionLabel: `Select & Form ${structure.name}`
    });
  };

  const handleRegistrationClick = (reg: AdditionalRegistration) => {
    onOpenDrawer({
      category: 'Statutory Registration Pathway',
      title: reg.name,
      subtitle: `Code: ${reg.code}`,
      overview: reg.overview,
      covers: reg.covers,
      requirements: reg.requirements,
      statutoryRef: reg.regulatoryAuthority,
      actionLabel: `Apply for ${reg.code}`
    });
  };

  const handleComplianceClick = (comp: OngoingComplianceItem) => {
    onOpenDrawer({
      category: 'Ongoing Secretarial Compliance',
      title: comp.name,
      subtitle: `Due: ${comp.dueDate} · Filing: ${comp.filingCode}`,
      overview: comp.overview,
      covers: comp.covers,
      requirements: comp.requirements,
      statutoryRef: `Default Penalty: ${comp.penaltiesForDefault}`,
      actionLabel: `Retain Chambers for ${comp.filingCode}`
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'CORP-' + Math.floor(100000 + Math.random() * 900000);
    setDocketCode(code);
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-32">
      {/* Hero Header */}
      <section className="px-6 lg:px-24 max-w-7xl mx-auto pt-4">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-[#B89A62]">
            <Building2 size={16} />
            <span>Institutional Pathway</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl italic leading-[1.05]">
            Business Setup & Corporate Compliance
          </h1>
          <p className="font-light text-lg lg:text-xl opacity-80 leading-relaxed text-balance">
            Private legal counsel guiding founders, promoters, and enterprises from entity architecture and statutory registration through perpetual corporate hygiene.
          </p>
        </div>

        {/* Visual Entry Point: START A BUSINESS Selector */}
        <div className={`mt-14 p-8 border ${
          theme === 'dark' 
            ? 'bg-[#121417] border-[#B89A62]/20' 
            : 'bg-[#FBF9F4] border-[#A98750]/20 shadow-sm'
        }`}>
          <div className="flex items-center justify-between border-b border-current/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-[#B89A62]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B89A62] font-semibold">
                Start Here · Choose Your Corporate Objective
              </span>
            </div>
            <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">
              Interactive Triage
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {JOURNEY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleJourneyClick(opt)}
                className={`p-4 text-left border rounded transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-between group ${
                  selectedJourney === opt.id
                    ? theme === 'dark'
                      ? 'border-[#B89A62] bg-[#B89A62]/10 text-[#F2EEE5]'
                      : 'border-[#A98750] bg-[#A98750]/10 text-[#171717]'
                    : 'border-current/10 hover:border-[#B89A62]/40 opacity-70 hover:opacity-100'
                }`}
              >
                <span>{opt.label}</span>
                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7-Step Interactive Editorial Journey */}
      <section className={`py-24 px-6 lg:px-24 border-y ${
        theme === 'dark' 
          ? 'bg-[#0E1013] border-[#B89A62]/15 text-[#F2EEE5]' 
          : 'bg-[#F2ECE1] border-[#A98750]/15 text-[#171717]'
      }`}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-current/15 pb-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
                Sequential Visual Journey
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl italic">
                The Seven Stages of Enterprise Formation
              </h2>
            </div>
            <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs text-right">
              Click any stage to view scope, regulatory filings & requirements
            </p>
          </div>

          {/* Editorial Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-px bg-current/10 border border-current/10">
            {SETUP_STEPS.map((step) => (
              <div
                key={step.id}
                onClick={() => handleStepClick(step)}
                className={`p-6 cursor-pointer transition-all flex flex-col justify-between group ${
                  theme === 'dark' 
                    ? 'bg-[#121417] hover:bg-[#17191D]' 
                    : 'bg-[#FBF9F4] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl italic text-[#B89A62] group-hover:translate-x-0.5 transition-transform">
                      {step.number}
                    </span>
                    <ArrowUpRight size={14} className="opacity-20 group-hover:opacity-100 text-[#B89A62] transition-opacity" />
                  </div>
                  <h3 className="font-serif text-xl italic mb-3 group-hover:text-[#B89A62] transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs opacity-60 leading-relaxed font-light line-clamp-3">
                    {step.overview}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B89A62] block truncate">
                    {step.mandatoryFor.split(',')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Structures (Source-Provided Only) */}
      <section id="structures" className="px-6 lg:px-24 max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
            Entity Architecture
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl italic">
            Select Your Business Structure
          </h2>
          <p className="text-sm lg:text-base opacity-75 font-light leading-relaxed">
            Statutory entity classifications recognized under Indian commercial and company law. Click any vehicle to inspect governance, liability, and incorporation criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_STRUCTURES.map((structure) => (
            <div
              key={structure.id}
              onClick={() => handleStructureClick(structure)}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'border-[#B89A62]/15 bg-[#121417] hover:border-[#B89A62]/50 hover:bg-[#15171C]'
                  : 'border-neutral-300 bg-white hover:border-[#A98750] hover:bg-[#FBF9F4]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B89A62]">
                    Structure
                  </span>
                  <span className="text-[10px] font-mono opacity-50">{structure.turnaround}</span>
                </div>
                <h3 className="font-serif text-3xl italic group-hover:text-[#B89A62] transition-colors leading-tight">
                  {structure.name}
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed">
                  {structure.subtitle}
                </p>
                <div className="pt-2 text-xs font-light opacity-60">
                  <strong className="font-mono text-[10px] uppercase text-[#B89A62] block mb-1">Optimal Application:</strong>
                  <span>{structure.bestFor}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
                <span>Inspect Architecture</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Registration Pathways */}
      <section id="registrations" className={`py-24 px-6 lg:px-24 transition-colors ${
        theme === 'dark' ? 'bg-[#101215]' : 'bg-[#EFECE3]'
      }`}>
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-current/15 pb-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
                Regulatory Licenses & Clearances
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl italic">
                Statutory Registration Pathways
              </h2>
            </div>
            <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs text-right">
              FSSAI, Import Export, Shops & Establishment, Startup India & Social Security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGISTRATION_PATHWAYS.map((reg) => (
              <div
                key={reg.id}
                onClick={() => handleRegistrationClick(reg)}
                className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  theme === 'dark'
                    ? 'border-[#B89A62]/15 bg-[#14171A] hover:border-[#B89A62]/50'
                    : 'border-neutral-300 bg-white hover:border-[#A98750]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-[#B89A62] border border-[#B89A62]/30 px-2.5 py-1">
                      {reg.code}
                    </span>
                    <ArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 text-[#B89A62] transition-opacity" />
                  </div>
                  <h3 className="font-serif text-2xl italic group-hover:text-[#B89A62] transition-colors">
                    {reg.name}
                  </h3>
                  <p className="text-xs opacity-75 leading-relaxed font-light">
                    {reg.overview}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between text-xs font-mono opacity-70">
                  <span className="truncate max-w-[200px]">{reg.regulatoryAuthority.split('·')[0]}</span>
                  <span className="text-[#B89A62] uppercase text-[10px]">View Scope</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Corporate / Secretarial Compliance */}
      <section id="compliance" className="px-6 lg:px-24 max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
            Perpetual Regulatory Hygiene
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl italic">
            Ongoing Corporate & Secretarial Compliance
          </h2>
          <p className="text-sm lg:text-base opacity-75 font-light leading-relaxed">
            Statutory filings under the Companies Act 2013 and Secretarial Standards. Ensure zero default penalties, continuous director DIN validity, and active corporate status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ONGOING_COMPLIANCE_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleComplianceClick(item)}
              className={`p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'border-[#B89A62]/15 bg-[#121417] hover:border-[#B89A62]/40'
                  : 'border-neutral-300 bg-white hover:border-[#A98750]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#B89A62] font-semibold">{item.filingCode}</span>
                  <span className="opacity-50">{item.frequency}</span>
                </div>
                <h3 className="font-serif text-2xl italic group-hover:text-[#B89A62] transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed">
                  {item.overview}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-current/10 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono opacity-60">
                  <span>Mandatory Due Date</span>
                  <span className="text-[#B89A62]">{item.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62] pt-1">
                  <span>Examine Filing</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialized Business Setup Form */}
      <section id="setup-form" className={`py-24 px-6 lg:px-24 border-t ${
        theme === 'dark' 
          ? 'bg-[#0E1013] border-[#B89A62]/20 text-[#F2EEE5]' 
          : 'bg-[#FBF9F4] border-[#A98750]/20 text-[#171717]'
      }`}>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
              Client Engagement
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl italic">
              Business Setup & Incorporation Intake
            </h2>
            <p className="font-light text-sm lg:text-base opacity-80 leading-relaxed">
              Submit your entity incorporation details or compliance mandate. Chambers will conduct conflict analysis and dispatch formal terms of engagement within one business day.
            </p>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-12 border text-center space-y-6 ${
                theme === 'dark' 
                  ? 'bg-[#14171B] border-[#B89A62]/30 text-[#F2EEE5]' 
                  : 'bg-white border-[#A98750]/30 text-[#171717]'
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B89A62]">
                  Corporate Docket Registered
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl italic">
                  Chambers Matter #{docketCode}
                </h3>
              </div>
              <p className="opacity-75 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed font-light">
                Your business formation and compliance request has been secured. Our corporate advisory team will verify name availability, draft initial resolutions, and contact you at <strong>{formData.email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="font-mono text-xs uppercase tracking-widest border border-current/20 px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Submit Additional Corporate Entity
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Full Name / Founder Representative *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Siddharth Mathur"
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Country of Residence / Principal Seat *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. India / United States / Singapore"
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Corporate / Founder Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="founder@venture.com"
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Direct Phone / WhatsApp with Country Code *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98111 00000"
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                />
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Business Setup Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                >
                  <option value="I am starting a new business" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>I am starting a new business</option>
                  <option value="I already have a company" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>I already have a company</option>
                  <option value="I need GST/compliance support" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>I need GST / compliance support</option>
                  <option value="I am an NRI / foreign entrepreneur" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>I am an NRI / foreign entrepreneur</option>
                  <option value="I need ongoing compliance" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>I need ongoing compliance</option>
                  <option value="I need corporate advisory" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>I need corporate advisory</option>
                </select>
              </div>

              {/* Entity Type */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Proposed / Existing Entity Type *
                </label>
                <select
                  value={formData.entityType}
                  onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                >
                  <option value="Private Limited Company" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Private Limited Company</option>
                  <option value="LLP" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Limited Liability Partnership (LLP)</option>
                  <option value="OPC" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>One Person Company (OPC)</option>
                  <option value="Section 8 Company" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Section 8 Company (Non-profit)</option>
                  <option value="Proprietorship" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Sole Proprietorship</option>
                </select>
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Industry Classification *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                >
                  <option value="Startup" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Startup</option>
                  <option value="MSME" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>MSME</option>
                  <option value="Professional Services" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Professional Services</option>
                  <option value="Trading" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Trading</option>
                  <option value="Manufacturing" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Manufacturing</option>
                  <option value="Technology" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Technology</option>
                  <option value="Food" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Food & Beverage</option>
                  <option value="Import / Export" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Import / Export</option>
                  <option value="Other" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Other</option>
                </select>
              </div>

              {/* Current Stage */}
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Current Corporate Stage *
                </label>
                <select
                  value={formData.currentStage}
                  onChange={(e) => setFormData({ ...formData, currentStage: e.target.value })}
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                >
                  <option value="Idea / Pre-incorporation" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Idea / Pre-incorporation</option>
                  <option value="Incorporation Pending" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Incorporation Pending (Need Filing)</option>
                  <option value="Established / Scaling" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Established / Scaling (Annual Compliance)</option>
                  <option value="Restructuring" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Restructuring / Equity Round</option>
                </select>
              </div>

              {/* Requirement */}
              <div className="col-span-full space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Primary Mandate / Requirement *
                </label>
                <input
                  type="text"
                  required
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="e.g. End-to-end Private Limited incorporation + GST + Startup India recognition"
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
                />
              </div>

              {/* Message */}
              <div className="col-span-full space-y-2">
                <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                  Business Scope & Special Requirements (Optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention proposed business name ideas, number of directors, foreign investment expectations, or specific licensing requirements..."
                  className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`col-span-full py-5 font-mono text-xs uppercase tracking-[0.3em] font-semibold transition-all flex items-center justify-center gap-3 ${
                  theme === 'dark'
                    ? 'bg-[#B89A62] text-[#0D0F12] hover:bg-white'
                    : 'bg-[#171717] text-[#F5F1E8] hover:bg-[#A98750]'
                }`}
              >
                <span>Transmit Business Setup Mandate</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
