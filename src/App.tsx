import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Globe, MessageSquare, 
  Linkedin, Instagram, Twitter, Youtube, ArrowRight, 
  ArrowUpRight, Scale, Briefcase, FileText, CheckCircle2,
  Shield, ShieldCheck, Send, BookOpen, Clock, Building2, ChevronRight,
  HelpCircle, Sparkles, AlertCircle, Compass, Layers, CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { AppRoute, DetailDrawerData } from './types';
import { DetailDrawer } from './components/DetailDrawer';
import { BusinessSetupView } from './components/BusinessSetupView';
import { 
  BUSINESS_STRUCTURES, 
  INTERNATIONAL_BUSINESS_ENTRIES,
  REGISTRATION_PATHWAYS,
  ONGOING_COMPLIANCE_ITEMS
} from './data/businessData';

// --- DATA LAYER (Zero-Inference & Demo Mode) ---
const DEMO_MODE = true;

const PROF_INFO = {
  practitioner: {
    name: DEMO_MODE ? "Arjun Mehra" : null,
    label: DEMO_MODE ? "DEMO PROFILE" : null,
    officeTag: DEMO_MODE ? "DEMO OFFICE" : null,
    contactTag: DEMO_MODE ? "DEMO CONTACT" : null,
    designation: DEMO_MODE ? "Advocate & Strategic Legal Counsel" : null,
    location: DEMO_MODE ? "Central Delhi & Supreme Court of India" : null,
    email: DEMO_MODE ? "counsel@thelegalguardian.example" : null,
    phone: DEMO_MODE ? "+91 11 4820 9000" : null,
    enrolment: DEMO_MODE ? "DEMO/D/1482/2012" : null,
    chambers: DEMO_MODE ? "Chambers of Arjun Mehra, Bar Council Enclave, New Delhi (Demo Office)" : null,
    specializations: [
      "Commercial Dispute Resolution & High-Stakes Litigation",
      "Corporate Insolvency & Bankruptcy Code (IBC)",
      "Cross-Border NRI Real Estate & Estate Structuring",
      "Financial Crimes & Regulatory Defense (PMLA / SFIO)"
    ]
  }
};

interface ServiceItem {
  name: string;
  scope: string;
  statute: string;
  forums: string[];
}

interface ServiceCategory {
  id: string;
  title: string;
  type: 'issue-card' | 'panel' | 'timeline' | 'checklist';
  description: string;
  items: string[];
  detailedItems: ServiceItem[];
}

const SERVICES: ServiceCategory[] = [
  {
    id: "legal",
    title: "Legal Dispute Services",
    type: "issue-card",
    description: "Private counsel for high-stakes contentious disputes and strategic appellate litigation.",
    items: [
      "Family & Matrimonial Disputes", 
      "Section 138 NI Act (Cheque Dishonour)", 
      "RERA & SARFAESI Proceedings", 
      "IBC Corporate Insolvency", 
      "NCLT & NCLAT High-Value Disputes", 
      "PMLA Regulatory Defense", 
      "NRI Jurisdictional Consultancy"
    ],
    detailedItems: [
      {
        name: "Family & Matrimonial Disputes",
        scope: "High-net-worth cross-border matrimonial litigation, custody arrangements, and confidential family settlement deeds.",
        statute: "Hindu Marriage Act, 1955 / Special Marriage Act, 1954",
        forums: ["High Court of Delhi", "Family Courts", "Supreme Court of India"]
      },
      {
        name: "Section 138 NI Act (Cheque Dishonour)",
        scope: "High-value commercial instrument dishonour, statutory 15-day demand notices, summary trials, and compounding proceedings.",
        statute: "Negotiable Instruments Act, 1881 (Sec 138–142)",
        forums: ["Metropolitan Magistrate Courts", "Sessions Courts"]
      },
      {
        name: "RERA & SARFAESI Proceedings",
        scope: "Representing institutional homebuyers, developers, and secured lenders in possession delays, refund decrees, and auction disputes.",
        statute: "Real Estate (Regulation & Development) Act, 2016 & SARFAESI Act, 2002",
        forums: ["RERA Authority", "Real Estate Appellate Tribunal (REAT)", "DRT / DRAT"]
      },
      {
        name: "IBC Corporate Insolvency",
        scope: "Advising Financial Creditors, Operational Creditors, and Corporate Debtors on Section 7, 9 & 10 petitions, CIRP resolution plans, and avoidance transactions.",
        statute: "Insolvency and Bankruptcy Code, 2016",
        forums: ["NCLT Principal Bench", "NCLAT New Delhi"]
      },
      {
        name: "PMLA Regulatory Defense",
        scope: "Representation during Directorate of Enforcement (ED) summons, attachment proceedings, and appellate tribunal appeals under anti-money laundering frameworks.",
        statute: "Prevention of Money Laundering Act, 2002",
        forums: ["Adjudicating Authority (PMLA)", "Appellate Tribunal for PMLA", "High Courts"]
      },
      {
        name: "NRI Jurisdictional Consultancy",
        scope: "Comprehensive estate protection, power of attorney validation, ancestral property recovery, and partition suits for non-resident Indian citizens.",
        statute: "Foreign Exchange Management Act (FEMA), 1999 & Civil Procedure Code",
        forums: ["Civil Courts", "Revenue Authorities", "High Courts"]
      }
    ]
  },
  {
    id: "financial",
    title: "Financial & Tax Services",
    type: "panel",
    description: "Institutional audit alignment, GST dispute mitigation, and statutory balance sheet compliance oversight.",
    items: [
      "Statutory Audit & Balance Sheet Defense",
      "GST Litigation & Show Cause Representation",
      "Direct Tax Dispute Resolution",
      "Corporate Capital Structuring"
    ],
    detailedItems: [
      {
        name: "Statutory Audit & Balance Sheet Defense",
        scope: "Verification of corporate disclosures, CARO reporting adherence, and accounting standard compliance prior to statutory filings.",
        statute: "Companies Act, 2013 (Section 143)",
        forums: ["NFRA", "Ministry of Corporate Affairs (MCA)"]
      },
      {
        name: "GST Litigation & Show Cause Representation",
        scope: "Defending against input tax credit (ITC) reversals, fake invoicing notices, and filing appeals before GST Appellate Authorities.",
        statute: "Central Goods and Services Tax (CGST) Act, 2017",
        forums: ["GST Appellate Authority", "High Court Writ Benches"]
      },
      {
        name: "Direct Tax Dispute Resolution",
        scope: "Faceless assessment appeals, transfer pricing audits, and search and seizure advisory before appellate commissioners.",
        statute: "Income Tax Act, 1961",
        forums: ["CIT (Appeals)", "ITAT"]
      }
    ]
  },
  {
    id: "corporate",
    title: "Corporate Advisory",
    type: "timeline",
    description: "Strategic boardroom counsel for cross-border mergers, minority shareholder protection, and governance hygiene.",
    items: [
      "Mergers, Amalgamations & Joint Ventures",
      "Boardroom Governance & Shareholder Agreements",
      "Cross-Border Contract Architecture",
      "Venture Financing & Term Sheet Advisory"
    ],
    detailedItems: [
      {
        name: "Mergers, Amalgamations & Joint Ventures",
        scope: "Structuring schemes of arrangement, drafting scheme petitions, and securing regulatory clearances from antitrust and regional directors.",
        statute: "Companies Act, 2013 (Sections 230–232) & Competition Act, 2002",
        forums: ["NCLT Benches", "Competition Commission of India (CCI)"]
      },
      {
        name: "Boardroom Governance & Shareholder Agreements",
        scope: "Drafting SHA, SSA, voting trust deeds, and resolving oppression and mismanagement disputes under Sections 241-242.",
        statute: "Companies Act, 2013",
        forums: ["NCLT", "Arbitration Tribunals"]
      },
      {
        name: "Cross-Border Contract Architecture",
        scope: "High-value commercial supply, technology licensing, and bespoke dispute resolution clauses under UNCITRAL/SIAC/LCIA rules.",
        statute: "Indian Contract Act, 1872 & Arbitration and Conciliation Act, 1996",
        forums: ["International Commercial Arbitration"]
      }
    ]
  },
  {
    id: "regulatory",
    title: "Regulatory & Statutory Compliance",
    type: "checklist",
    description: "Navigating regulatory mandates across RBI, SEBI, environmental authorities, and statutory corporate registries.",
    items: [
      "FDI & FEMA Compliance Registrations",
      "Environmental Clearances & NGT Litigation",
      "Secretarial Due Diligence & Annual Compliance",
      "Data Protection & Digital Personal Data Act"
    ],
    detailedItems: [
      {
        name: "FDI & FEMA Compliance Registrations",
        scope: "Overseeing FIRMS portal filings, Single Master Form (SMF), FLA returns, and compounding of contraventions before RBI.",
        statute: "Foreign Exchange Management Act, 1999",
        forums: ["Reserve Bank of India (FMD)"]
      },
      {
        name: "Environmental Clearances & NGT Litigation",
        scope: "Defending manufacturing units and industrial infrastructure projects before the National Green Tribunal against closure notices.",
        statute: "Environment (Protection) Act, 1986 & NGT Act, 2010",
        forums: ["National Green Tribunal (NGT) Principal Bench"]
      },
      {
        name: "Data Protection & Digital Personal Data Act",
        scope: "Institutional data audit, cross-border data transfer impact assessments, and consent framework overhaul.",
        statute: "Digital Personal Data Protection Act (DPDPA), 2023",
        forums: ["Data Protection Board of India"]
      }
    ]
  }
];

interface InsightArticle {
  date: string;
  cat: string;
  readTime: string;
  title: string;
  summary: string;
  fullContent: string[];
}

const INSIGHTS_DATA: InsightArticle[] = [
  {
    date: "October 2024",
    cat: "Corporate Insolvency",
    readTime: "6 min read",
    title: "Structural Evolution of the IBC Framework in Emerging Economies",
    summary: "An analysis of Section 7 threshold amendments, pre-packaged insolvency viability for MSMEs, and jurisprudence governing avoidance transactions.",
    fullContent: [
      "The Insolvency and Bankruptcy Code (IBC) has completed nearly a decade of operational life in India, fundamentally shifting the credit culture from debtor-in-possession to creditor-in-control. Recent judicial interpretations from the Supreme Court have continually fine-tuned the boundary between commercial wisdom and judicial intervention.",
      "The mandatory threshold hike to ₹1 Crore for instituting CIRP has substantially curtailed vexatious filings against solvent enterprises. However, operational creditors continue to navigate significant procedural thresholds when establishing undisputed debts under Section 9.",
      "In cross-border matters, the absence of an enacted UNCITRAL Model Law framework poses challenges when corporate debtors hold concurrent assets across Dubai, London, and Singapore. The Legal Guardian continues to advise institutional creditors on asset tracing and recognition of foreign insolvency judgments under bilateral civil arrangements."
    ]
  },
  {
    date: "September 2024",
    cat: "Private Wealth & NRI",
    readTime: "8 min read",
    title: "Navigating Multi-Jurisdictional Family Trusts & Asset Protection",
    summary: "Strategic structuring of private family trusts in India for non-resident family members, addressing tax treaties and FEMA compliance.",
    fullContent: [
      "High-net-worth families with second-generation diaspora in North America and Western Europe increasingly face bifurcated tax jurisdictions. Establishing discretionary versus specific private trusts in India requires rigorous adherence to both the Indian Trusts Act, 1882 and Chapter XII-E of the Income Tax Act.",
      "The intersection of FEMA regulations with trust distributions is an area requiring surgical precision. When a non-resident is a beneficiary, trust income remitted offshore falls under current account transactions subject to liberalized remittance limits and Form 15CA/CB certifications.",
      "Protecting ancestral immoveable property in prime urban centers from partition dilution or adverse possession remains a premier requirement. Well-structured testamentary instruments paired with registered settlement deeds provide the strongest safeguard."
    ]
  },
  {
    date: "August 2024",
    cat: "Regulatory Defense",
    readTime: "5 min read",
    title: "Industrial Compliance Thresholds: A Comparative Study",
    summary: "Statutory mandates under updated environmental tribunal guidelines and the procedural defense against arbitrary bank account freezing.",
    fullContent: [
      "Industrial compliance has evolved from an annual routine into a continuous real-time disclosure mandate. The National Green Tribunal's recent doctrine of 'polluter pays' has imposed exemplary damages on commercial manufacturing units absent demonstrable mitigation plans.",
      "Simultaneously, regulatory agencies like the SFIO and ED have increased their reliance on provisional attachment orders under Section 5 of the PMLA. Immediate invocation of writ jurisdiction under Article 226 remains the primary constitutional recourse to preserve operating business capital while statutory show-cause proceedings unfold."
    ]
  },
  {
    date: "July 2024",
    cat: "Commercial Arbitration",
    readTime: "7 min read",
    title: "Interim Relief Strategies in High-Value Commercial Arbitrations",
    summary: "Navigating Section 9 applications before Indian courts vs Section 17 emergency arbitrator relief under institutional arbitration rules.",
    fullContent: [
      "In high-stakes corporate disputes, the window between dispute emergence and arbitral tribunal constitution is the most vulnerable period for asset dissipation. Section 9 of the Arbitration and Conciliation Act, 1996 empowers Indian courts to grant robust interim injunctions prior to commencement.",
      "The Supreme Court's landmark ruling in Amazon v. Future Retail affirmed that emergency arbitrator orders under institutional rules (such as SIAC) possess enforceability in India. Consequently, corporate parties must strategically calibrate whether court-directed pre-arbitral relief or institutional emergency mechanisms provide swifter asset security."
    ]
  }
];

export default function TheLegalGuardianApp() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDrawerData, setSelectedDrawerData] = useState<DetailDrawerData | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<InsightArticle | null>(null);
  const [prefilledInquiry, setPrefilledInquiry] = useState<string>('');
  const [socialToast, setSocialToast] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [currentRoute]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const containerClass = theme === 'dark' 
    ? "bg-[#0D0F12] text-[#F2EEE5] selection:bg-[#B89A62] selection:text-white" 
    : "bg-[#F5F1E8] text-[#171717] selection:bg-[#A98750] selection:text-white";

  const handleOpenDrawer = (data: DetailDrawerData) => {
    setSelectedDrawerData(data);
  };

  const handleInitiateEnquiry = (title: string, entityType?: string) => {
    setPrefilledInquiry(`Inquiry regarding ${title}${entityType ? ` (${entityType})` : ''}: `);
    setSelectedDrawerData(null);
    if (title.includes('Structure') || title.includes('Company') || title.includes('LLP') || title.includes('FSSAI') || title.includes('ROC') || title.includes('Setup')) {
      setCurrentRoute('business-setup');
      setTimeout(() => {
        const elem = document.getElementById('setup-form');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setCurrentRoute('contact');
    }
  };

  const handleSocialClick = (platform: string) => {
    if (DEMO_MODE) {
      setSocialToast(`Demo ${platform} profile — replace before production.`);
      setTimeout(() => setSocialToast(null), 3500);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 flex flex-col ${containerClass}`}>
      {/* Social Toast Notification */}
      <AnimatePresence>
        {socialToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] px-4 py-2 text-xs font-mono bg-[#B89A62] text-[#0D0F12] rounded shadow-xl flex items-center gap-2 font-semibold"
          >
            <AlertCircle size={14} />
            <span>{socialToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar - Clean One-Row Contract */}
      <header className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-5 flex justify-between items-center border-b transition-all duration-300 ${
        theme === 'dark' 
          ? 'border-[#B89A62]/15 bg-[#0D0F12]/90' 
          : 'border-[#A98750]/15 bg-[#F5F1E8]/90'
      } backdrop-blur-md`}>
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          className="font-serif text-lg lg:text-2xl tracking-[0.12em] font-medium text-left hover:text-[#B89A62] transition-colors focus:outline-none whitespace-nowrap"
          onClick={() => setCurrentRoute('home')}
        >
          THE LEGAL GUARDIAN
        </button>

        {/* Zone 2: 5-6 Clean Nav Links */}
        <nav className="hidden xl:flex gap-7 items-center text-[11px] font-mono uppercase tracking-[0.2em]">
          {[
            { id: 'business-setup', label: 'Business Setup' },
            { id: 'services', label: 'Domains' },
            { id: 'international', label: 'International' },
            { id: 'profile', label: 'Counsel' },
            { id: 'consult', label: 'Advisory AI' },
            { id: 'insights', label: 'Insights' },
            { id: 'contact', label: 'Contact' }
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setCurrentRoute(item.id as AppRoute)}
              className={`hover:text-[#B89A62] transition-colors relative py-1 focus:outline-none whitespace-nowrap ${
                currentRoute === item.id ? 'text-[#B89A62] font-semibold' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {item.label}
              {currentRoute === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B89A62]" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Theme Toggle & CTA) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle visual theme"
            className={`px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase border rounded transition-all ${
              theme === 'dark' 
                ? 'border-[#B89A62]/30 text-[#B89A62] hover:bg-[#B89A62]/10' 
                : 'border-[#A98750]/40 text-[#A98750] hover:bg-[#A98750]/10'
            }`}
          >
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </button>
          <button
            onClick={() => setCurrentRoute('business-setup')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              theme === 'dark'
                ? 'bg-[#B89A62] text-[#0D0F12] font-semibold hover:bg-[#F2EEE5]'
                : 'bg-[#171717] text-[#F5F1E8] font-semibold hover:bg-[#A98750]'
            }`}
          >
            <span>Start Business</span>
            <ArrowRight size={12} />
          </button>
          <button 
            className="xl:hidden p-2 opacity-80 hover:opacity-100 focus:outline-none" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-50 p-8 flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#FBF9F4]'
            }`}
          >
            <div className="flex justify-between items-center border-b border-current/10 pb-6">
              <span className="font-serif text-xl tracking-wider">THE LEGAL GUARDIAN</span>
              <button 
                className="p-2 border border-current/20 rounded-full" 
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-5 my-auto">
              {[
                { id: 'home', label: 'Overview' },
                { id: 'business-setup', label: 'Business Setup & Compliance' },
                { id: 'services', label: 'Advisory Domains' },
                { id: 'international', label: 'International & NRI' },
                { id: 'profile', label: 'Counsel Profile' },
                { id: 'consult', label: 'Interactive Advisory AI' },
                { id: 'insights', label: 'Editorial Insights' },
                { id: 'contact', label: 'Initiate Consultation' },
                { id: 'disclaimer', label: 'Legal Disclaimer' }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => {
                    setCurrentRoute(item.id as AppRoute);
                    setIsMenuOpen(false);
                  }}
                  className={`font-serif text-2xl sm:text-3xl text-left capitalize hover:text-[#B89A62] transition-colors flex items-center justify-between ${
                    currentRoute === item.id ? 'text-[#B89A62] italic' : 'opacity-80'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={18} className="opacity-40" />
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-current/10 text-[10px] font-mono opacity-50 uppercase tracking-widest flex justify-between items-center">
              <span>{PROF_INFO.practitioner.officeTag}</span>
              <span>Bar Council of Delhi</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Router */}
      <main className="flex-1 pt-24 pb-16">
        {currentRoute === 'home' && (
          <HomeView 
            setRoute={setCurrentRoute} 
            theme={theme} 
            onOpenDrawer={handleOpenDrawer}
          />
        )}
        {currentRoute === 'business-setup' && (
          <BusinessSetupView
            theme={theme}
            onOpenDrawer={handleOpenDrawer}
            onNavigateRoute={(route) => setCurrentRoute(route as AppRoute)}
          />
        )}
        {currentRoute === 'profile' && <AboutView theme={theme} setRoute={setCurrentRoute} />}
        {currentRoute === 'services' && (
          <ServicesView 
            theme={theme} 
            onOpenDrawer={handleOpenDrawer}
            setRoute={setCurrentRoute}
          />
        )}
        {currentRoute === 'international' && (
          <InternationalView 
            theme={theme} 
            setRoute={setCurrentRoute}
            onOpenDrawer={handleOpenDrawer}
          />
        )}
        {currentRoute === 'consult' && <ConsultView theme={theme} setRoute={setCurrentRoute} />}
        {currentRoute === 'insights' && (
          <InsightsView 
            theme={theme} 
            onSelectInsight={(item) => setSelectedInsight(item)}
          />
        )}
        {currentRoute === 'contact' && (
          <ContactView 
            theme={theme} 
            prefill={prefilledInquiry} 
            setPrefill={setPrefilledInquiry}
          />
        )}
        {currentRoute === 'disclaimer' && <DisclaimerView theme={theme} />}
      </main>

      {/* Reusable Detail Drawer for all clickable items */}
      <DetailDrawer
        data={selectedDrawerData}
        onClose={() => setSelectedDrawerData(null)}
        onInitiateEnquiry={handleInitiateEnquiry}
        theme={theme}
      />

      {/* Insight Reader Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12 overflow-y-auto"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-3xl w-full p-8 lg:p-12 border shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto custom-scrollbar ${
                theme === 'dark' 
                  ? 'bg-[#121417] text-[#F2EEE5] border-[#B89A62]/30' 
                  : 'bg-[#FBF9F4] text-[#171717] border-[#A98750]/30'
              }`}
            >
              <button 
                onClick={() => setSelectedInsight(null)}
                className="absolute top-6 right-6 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono opacity-60 mb-4">
                <span>{selectedInsight.date}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#B89A62] uppercase tracking-wider">{selectedInsight.cat}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedInsight.readTime}</span>
              </div>

              <h2 className="font-serif text-3xl lg:text-4xl italic mb-6 leading-tight">
                {selectedInsight.title}
              </h2>

              <div className="space-y-6 font-light text-base leading-relaxed opacity-85 border-t border-current/10 pt-6">
                {selectedInsight.fullContent.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-current/10 flex justify-between items-center text-xs font-mono opacity-50">
                <span>Author: Chambers Research Group</span>
                <span>For Educational & Scholarly Reference</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`px-6 lg:px-24 py-16 border-t transition-colors ${
        theme === 'dark' ? 'border-[#B89A62]/15 bg-[#0A0C0E]' : 'border-[#A98750]/15 bg-[#EFECE3]'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-3xl italic tracking-wide">The Legal Guardian</h3>
              <p className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Private Counsel · Business Setup · Corporate & Regulatory Advisory
              </p>
              <p className="font-light text-xs max-w-md opacity-60 leading-relaxed">
                Integrated chambers providing end-to-end entity incorporation, cross-border inward investment, 
                tax litigation, and ongoing secretarial hygiene across Indian jurisdictions.
              </p>
              
              {/* Social Channels with DEMO_MODE handling */}
              <div className="flex items-center gap-4 pt-2">
                <button 
                  onClick={() => handleSocialClick('LinkedIn')} 
                  className="opacity-40 hover:text-[#B89A62] hover:opacity-100 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </button>
                <button 
                  onClick={() => handleSocialClick('Instagram')} 
                  className="opacity-40 hover:text-[#B89A62] hover:opacity-100 transition-all"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={18} />
                </button>
                <button 
                  onClick={() => handleSocialClick('X')} 
                  className="opacity-40 hover:text-[#B89A62] hover:opacity-100 transition-all"
                  aria-label="X Profile"
                >
                  <Twitter size={18} />
                </button>
                <button 
                  onClick={() => handleSocialClick('YouTube')} 
                  className="opacity-40 hover:text-[#B89A62] hover:opacity-100 transition-all"
                  aria-label="YouTube Channel"
                >
                  <Youtube size={18} />
                </button>
                <button 
                  onClick={() => setCurrentRoute('consult')} 
                  className="opacity-40 hover:text-[#B89A62] hover:opacity-100 transition-all flex items-center gap-1 text-[10px] font-mono uppercase ml-2"
                >
                  <MessageSquare size={16} />
                  <span>Advisory AI</span>
                </button>
              </div>
              {DEMO_MODE && (
                <div className="text-[10px] font-mono text-[#B89A62] opacity-75">
                  Demo social profile — replace before production.
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#B89A62] font-semibold mb-2">
                Corporate & Setup
              </div>
              <div className="flex flex-col gap-2.5 text-xs font-mono uppercase tracking-wider opacity-60">
                <button onClick={() => setCurrentRoute('business-setup')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">Company Incorporation</button>
                <button onClick={() => setCurrentRoute('business-setup')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">Business Structures</button>
                <button onClick={() => setCurrentRoute('business-setup')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">GST & PAN/TAN</button>
                <button onClick={() => setCurrentRoute('business-setup')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">Ongoing Secretarial (ROC)</button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#B89A62] font-semibold mb-2">
                Advisory & Legal
              </div>
              <div className="flex flex-col gap-2.5 text-xs font-mono uppercase tracking-wider opacity-60">
                <button onClick={() => setCurrentRoute('international')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">International Business Entry</button>
                <button onClick={() => setCurrentRoute('services')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">Commercial Litigation</button>
                <button onClick={() => setCurrentRoute('consult')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">Advisory Intelligence</button>
                <button onClick={() => setCurrentRoute('disclaimer')} className="text-left hover:text-[#B89A62] hover:opacity-100 transition-opacity">BCI Rule 36 Disclaimer</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-current/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
            <div>© {new Date().getFullYear()} The Legal Guardian. {DEMO_MODE && "(Demo Environment - BCI Compliant)"}</div>
            <div>Advocates Act 1961 · Companies Act 2013 Compliance</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-VIEWS ---

function HomeView({ 
  setRoute, 
  theme, 
  onOpenDrawer 
}: { 
  setRoute: (r: AppRoute) => void; 
  theme: string; 
  onOpenDrawer: (data: DetailDrawerData) => void; 
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-28">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 lg:px-24 overflow-hidden border-b border-[#B89A62]/15">
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="chambers-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={theme === 'dark' ? '#B89A62' : '#A98750'} strokeWidth="0.5" strokeOpacity="0.25" />
              </pattern>
              <linearGradient id="hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme === 'dark' ? '#171918' : '#ECE7DA'} stopOpacity="0.8" />
                <stop offset="100%" stopColor={theme === 'dark' ? '#0D0F12' : '#F5F1E8'} stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grad)" />
            <rect width="100%" height="100%" fill="url(#chambers-grid)" />
            <circle cx="85%" cy="35%" r="320" fill="none" stroke={theme === 'dark' ? '#B89A62' : '#A98750'} strokeWidth="1" strokeOpacity="0.12" />
            <circle cx="85%" cy="35%" r="480" fill="none" stroke={theme === 'dark' ? '#B89A62' : '#A98750'} strokeWidth="0.5" strokeOpacity="0.08" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 text-[#B89A62] font-mono text-xs tracking-[0.4em] mb-6 uppercase"
          >
            <Scale size={14} className="opacity-80" />
            <span>Private Counsel · Corporate & Business Setup</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.88] tracking-tight mb-8"
          >
            THE LEGAL<br />GUARDIAN
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-36 h-[2px] bg-[#4A2528] mb-8 origin-left"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-light text-lg lg:text-2xl max-w-2xl leading-relaxed opacity-85 mb-10 text-balance"
          >
            Independent private counsel for complex legal, corporate, business setup, and regulatory landscapes. Defined by institutional trust and quiet authority.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-5"
          >
            <button 
              onClick={() => setRoute('business-setup')}
              className={`px-7 py-4 font-mono text-xs uppercase tracking-[0.25em] flex items-center gap-3 transition-transform hover:-translate-y-0.5 font-semibold ${
                theme === 'dark' 
                  ? 'bg-[#B89A62] text-[#0D0F12] hover:bg-[#F2EEE5]' 
                  : 'bg-[#171717] text-[#F5F1E8] hover:bg-[#A98750]'
              }`}
            >
              <span>Setup Your Business</span>
              <ArrowRight size={14} />
            </button>

            <button 
              onClick={() => setRoute('services')}
              className={`px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] border transition-colors flex items-center gap-2 ${
                theme === 'dark'
                  ? 'border-[#B89A62]/40 text-[#B89A62] hover:bg-[#B89A62]/10'
                  : 'border-[#A98750]/50 text-[#A98750] hover:bg-[#A98750]/10'
              }`}
            >
              <span>Explore Practice Domains</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy of Discretion */}
      <section className={`py-24 px-6 lg:px-24 transition-colors ${
        theme === 'dark' ? 'bg-[#F2EEE5] text-[#171717]' : 'bg-[#EBE5D8] text-[#171717]'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#4A2528] mb-4 block font-semibold">
              01. Foundation
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl italic leading-tight">
              A Philosophy of Discretion & Strategic Foresight.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 font-light text-lg leading-relaxed opacity-90">
            <p>
              True corporate advocacy requires more than standard forms; it demands a forensic understanding of statutory nuances and commercial ramifications.
            </p>
            <p>
              The Legal Guardian bridges local regulatory enforcement with international governance standards, serving as personal counsel to founders, promoters, family offices, and foreign entities requiring confidential legal safeguarding.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setRoute('profile')} 
                className="inline-flex items-center gap-3 border-b-2 border-[#4A2528] pb-1 text-xs font-mono uppercase tracking-widest font-bold hover:text-[#4A2528]/80 transition-colors"
              >
                <span>Examine Chambers Credentials</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Pillars */}
      <section className="px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 border-b border-current/15 pb-8 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] mb-2 block">
              02. Practice Core
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl italic">Advisory Pillars</h2>
          </div>
          <button 
            onClick={() => setRoute('services')} 
            className="font-mono text-xs uppercase tracking-widest opacity-70 hover:opacity-100 hover:text-[#B89A62] transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span>View All Statutory Domains</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, idx) => (
            <div 
              key={s.id} 
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-[#121417] border-[#B89A62]/15 hover:border-[#B89A62]/50 hover:bg-[#171918]' 
                  : 'bg-white border-black/10 hover:border-[#A98750] hover:bg-[#FBF9F4]'
              }`}
              onClick={() => {
                if (s.detailedItems && s.detailedItems[0]) {
                  const item = s.detailedItems[0];
                  onOpenDrawer({
                    category: s.title,
                    title: item.name,
                    subtitle: `Governing: ${item.statute}`,
                    overview: item.scope,
                    covers: [
                      `Statutory review under ${item.statute}`,
                      `Strategic representation before ${item.forums.join(', ')}`,
                      "Pre-litigation negotiation and dispute mitigation",
                      "Evidence compilation and petition drafting"
                    ],
                    requirements: [
                      "Chronology of dispute and key transaction records",
                      "Executed agreements and dispute notices",
                      "Statutory communications and demand letters"
                    ],
                    statutoryRef: item.statute,
                    actionLabel: `Inquire for ${item.name}`
                  });
                } else {
                  setRoute('services');
                }
              }}
            >
              <div>
                <div className="text-xs font-mono text-[#B89A62] mb-6 flex justify-between items-center">
                  <span>0{idx+1}</span>
                  <span className="text-[10px] tracking-widest uppercase opacity-60">Domain</span>
                </div>
                <h3 className="font-serif text-2xl mb-4 italic group-hover:text-[#B89A62] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs opacity-70 leading-relaxed mb-6 font-light">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
                <span>Explore Scope</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW HOMEPAGE SECTION: START OR STRUCTURE YOUR BUSINESS */}
      <section className={`py-24 px-6 lg:px-24 border-y transition-colors ${
        theme === 'dark' ? 'bg-[#121417] border-[#B89A62]/20' : 'bg-[#EFECE3] border-[#A98750]/20'
      }`}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
              03. Corporate Enterprise Gateway
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl italic leading-tight">
              Start or Structure Your Business
            </h2>
            <p className="font-light text-base lg:text-lg opacity-80 leading-relaxed">
              Navigate four foundational commercial pathways designed to engineer, scale, and insulate your enterprise under Indian regulatory law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pathway 1: Business Setup */}
            <div
              onClick={() => setRoute('business-setup')}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#0E1013] border-[#B89A62]/20 hover:border-[#B89A62] hover:bg-[#14171A]'
                  : 'bg-white border-neutral-300 hover:border-[#A98750] hover:bg-[#FBF9F4]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded border border-[#B89A62]/40 flex items-center justify-center text-[#B89A62] mb-6">
                  <Building2 size={22} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89A62] block mb-2">Pathway 01</span>
                <h3 className="font-serif text-2xl italic mb-3 group-hover:text-[#B89A62] transition-colors">
                  Business Setup
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed mb-6">
                  Complete formation covering Private Limited, LLP, OPC, Section 8, and Proprietorship from charter drafting to bank account opening.
                </p>
              </div>
              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
                <span>Launch Journey</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pathway 2: Corporate Advisory */}
            <div
              onClick={() => setRoute('services')}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#0E1013] border-[#B89A62]/20 hover:border-[#B89A62] hover:bg-[#14171A]'
                  : 'bg-white border-neutral-300 hover:border-[#A98750] hover:bg-[#FBF9F4]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded border border-[#B89A62]/40 flex items-center justify-center text-[#B89A62] mb-6">
                  <Briefcase size={22} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89A62] block mb-2">Pathway 02</span>
                <h3 className="font-serif text-2xl italic mb-3 group-hover:text-[#B89A62] transition-colors">
                  Corporate Advisory
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed mb-6">
                  Strategic governance, shareholders' agreements (SHA), mergers & acquisitions, and minority shareholder defense before the NCLT.
                </p>
              </div>
              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
                <span>Examine Advisory</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pathway 3: Regulatory Compliance */}
            <div
              onClick={() => setRoute('business-setup')}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#0E1013] border-[#B89A62]/20 hover:border-[#B89A62] hover:bg-[#14171A]'
                  : 'bg-white border-neutral-300 hover:border-[#A98750] hover:bg-[#FBF9F4]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded border border-[#B89A62]/40 flex items-center justify-center text-[#B89A62] mb-6">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89A62] block mb-2">Pathway 03</span>
                <h3 className="font-serif text-2xl italic mb-3 group-hover:text-[#B89A62] transition-colors">
                  Regulatory Compliance
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed mb-6">
                  Ongoing ROC secretarial hygiene, AOC-4, MGT-7, DIR-3 Director KYC, FSSAI, Import Export Code (IEC), and statutory social security.
                </p>
              </div>
              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
                <span>Review Filings</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pathway 4: International / NRI */}
            <div
              onClick={() => setRoute('international')}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#0E1013] border-[#B89A62]/20 hover:border-[#B89A62] hover:bg-[#14171A]'
                  : 'bg-white border-neutral-300 hover:border-[#A98750] hover:bg-[#FBF9F4]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded border border-[#B89A62]/40 flex items-center justify-center text-[#B89A62] mb-6">
                  <Globe size={22} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89A62] block mb-2">Pathway 04</span>
                <h3 className="font-serif text-2xl italic mb-3 group-hover:text-[#B89A62] transition-colors">
                  International / NRI
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed mb-6">
                  Foreign subsidiaries, FDI automatic route, NRI estate repatriation under FEMA, and local legal liaison for overseas entities.
                </p>
              </div>
              <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
                <span>International Entry</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Intelligence Demo Banner */}
      <section className="px-6 lg:px-24 max-w-7xl mx-auto">
        <div className={`p-8 lg:p-14 border relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-[#121417] border-[#B89A62]/25' 
            : 'bg-[#FBF9F4] border-[#A98750]/30 shadow-lg'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block">
                04. Technology & Triage
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
                Discreet Matter Categorization via Advisory AI
              </h2>
              <p className="opacity-75 text-sm lg:text-base leading-relaxed max-w-xl">
                Before initiating formal representation, utilize our proprietary interactive intake engine to classify statutory jurisdiction, preliminary limitation periods, and initial documentation requirements under Indian law.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setRoute('consult')}
                  className={`px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    theme === 'dark' 
                      ? 'bg-[#B89A62] text-[#0D0F12] font-semibold hover:bg-[#F2EEE5]' 
                      : 'bg-[#171717] text-[#F5F1E8] font-semibold hover:bg-[#A98750]'
                  }`}
                >
                  <MessageSquare size={14} />
                  <span>Launch Interactive Consultation</span>
                </button>
              </div>
            </div>

            <div className={`lg:col-span-5 p-6 border rounded-sm font-mono text-xs space-y-4 ${
              theme === 'dark' 
                ? 'bg-[#0D0F12] border-[#B89A62]/20 text-[#F2EEE5]' 
                : 'bg-white border-neutral-300 text-neutral-800'
            }`}>
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <span className="text-[10px] uppercase text-[#B89A62] tracking-wider">Jurisdictional Triage Preview</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="p-3 bg-black/10 dark:bg-white/5 border border-current/10 rounded">
                <span className="text-[10px] text-[#B89A62] block mb-1">INQUIRY</span>
                "What is the statutory limitation period for filing Section 7 under IBC after corporate default?"
              </div>
              <div className="p-3 bg-[#B89A62]/10 border border-[#B89A62]/30 rounded">
                <span className="text-[10px] text-[#B89A62] block mb-1">STATUTORY ASSESSMENT</span>
                "Under Article 137 of Limitation Act 1963, the limitation period is 3 years from default date. Section 18 acknowledgements can extend limitation..."
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function AboutView({ theme, setRoute }: { theme: string; setRoute: (r: AppRoute) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Portrait & Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="aspect-[4/5] overflow-hidden relative border border-[#B89A62]/30 shadow-2xl flex items-center justify-center bg-[#171918]">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#1E2224] to-[#0D0F12]">
              <div className="w-24 h-24 rounded-full border border-[#B89A62]/50 flex items-center justify-center mb-6">
                <Scale size={40} className="text-[#B89A62]" />
              </div>
              <span className="font-serif text-3xl italic text-[#F2EEE5] mb-2">{PROF_INFO.practitioner.name}</span>
              <span className="text-[10px] font-mono text-[#B89A62] uppercase tracking-[0.25em] mb-4">
                Chambers of Arjun Mehra
              </span>
              <div className="w-16 h-[1px] bg-[#B89A62]/30 mb-4" />
              <p className="text-xs font-light text-[#F2EEE5]/70 max-w-xs leading-relaxed">
                Advocate enrolled with Bar Council of Delhi. Standing counsel and strategic advisor for corporate & private clients.
              </p>
            </div>
            {DEMO_MODE && (
              <div className="absolute bottom-4 right-4 bg-[#B89A62] text-[#0D0F12] text-[9px] font-mono px-2.5 py-0.5 uppercase tracking-widest font-semibold">
                {PROF_INFO.practitioner.label}
              </div>
            )}
          </div>

          <div className="space-y-3 font-mono text-xs uppercase tracking-wider p-5 border border-current/10">
            <div className="flex justify-between border-b border-current/10 pb-2">
              <span className="opacity-50">Enrolment No</span>
              <span className="text-[#B89A62] font-semibold">{PROF_INFO.practitioner.enrolment}</span>
            </div>
            <div className="flex justify-between border-b border-current/10 pb-2">
              <span className="opacity-50">Primary Seat</span>
              <span>{PROF_INFO.practitioner.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-50">Key Forums</span>
              <span>SC, DHC, NCLAT</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Core Mandates */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <span className="font-mono text-xs uppercase text-[#B89A62] tracking-[0.3em] mb-2 block font-semibold">
              {PROF_INFO.practitioner.label}
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl italic mb-4">{PROF_INFO.practitioner.name}</h1>
            <p className="text-[#B89A62] font-mono text-xs uppercase tracking-widest">{PROF_INFO.practitioner.designation}</p>
          </div>

          <div className="font-light text-lg leading-relaxed space-y-6 opacity-85">
            <p>
              Operating from the legal center of New Delhi, {PROF_INFO.practitioner.name} provides independent, high-caliber legal counsel on contentious disputes, regulatory investigations, and corporate restructuring.
            </p>
            <p>
              Drawing on extensive courtroom experience across the Supreme Court of India, Delhi High Court, and the National Company Law Appellate Tribunal (NCLAT), the chambers represent institutional entities, family business promoters, and high-net-worth global citizens.
            </p>
            <p>
              Our guiding doctrine centers on procedural supremacy—combining rigorous statutory interpretation with tactical dispute management to preserve client reputation, financial value, and long-term autonomy.
            </p>
          </div>

          <div className="pt-8 border-t border-current/15">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#B89A62] mb-6 font-semibold">
              Primary Practice Competencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROF_INFO.practitioner.specializations.map((spec, i) => (
                <div key={i} className="p-4 border border-current/10 flex items-start gap-3">
                  <span className="text-[10px] font-mono text-[#B89A62] pt-0.5">0{i+1}</span>
                  <span className="text-sm font-light leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-current/15 flex items-center justify-between">
            <div className="text-xs font-mono opacity-60">Direct Chamber Consultation</div>
            <button 
              onClick={() => setRoute('contact')}
              className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 ${
                theme === 'dark' 
                  ? 'bg-[#B89A62] text-[#0D0F12] hover:bg-[#F2EEE5]' 
                  : 'bg-[#171717] text-[#F5F1E8] hover:bg-[#A98750]'
              }`}
            >
              <span>Schedule Intake</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesView({ 
  theme, 
  onOpenDrawer, 
  setRoute 
}: { 
  theme: string; 
  onOpenDrawer: (data: DetailDrawerData) => void; 
  setRoute: (r: AppRoute) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 lg:px-24 py-12 space-y-32 max-w-7xl mx-auto">
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block">
          Practice Architecture
        </span>
        <h1 className="font-serif text-5xl lg:text-6xl italic">Domains of Advisory</h1>
        <p className="font-light text-xl opacity-75 leading-relaxed">
          Structured private counsel spanning corporate insolvency, commercial litigation, taxation enforcement, and cross-border statutory compliance.
        </p>
      </div>

      {SERVICES.map((cat, idx) => (
        <div key={cat.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-current/15 pt-16">
          <div className="lg:col-span-4 space-y-3">
            <span className="font-mono text-xs uppercase text-[#B89A62] tracking-widest block font-semibold">
              Category 0{idx+1} · {cat.id}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl italic">{cat.title}</h2>
            <p className="text-sm opacity-70 leading-relaxed max-w-sm font-light">{cat.description}</p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.detailedItems.map((item) => (
                <div 
                  key={item.name} 
                  onClick={() => onOpenDrawer({
                    category: cat.title,
                    title: item.name,
                    subtitle: `Governing: ${item.statute}`,
                    overview: item.scope,
                    covers: [
                      `Statutory review under ${item.statute}`,
                      `Strategic representation before ${item.forums.join(', ')}`,
                      "Pre-litigation negotiation and dispute mitigation",
                      "Evidence compilation and petition drafting"
                    ],
                    requirements: [
                      "Chronology of dispute and key transaction records",
                      "Executed agreements and dispute notices",
                      "Statutory communications and demand letters"
                    ],
                    statutoryRef: item.statute,
                    actionLabel: `Inquire for ${item.name}`
                  })}
                  className={`p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    theme === 'dark' 
                      ? 'border-[#B89A62]/20 hover:border-[#B89A62] bg-[#121417]/50 hover:bg-[#121417]' 
                      : 'border-neutral-300 hover:border-[#A98750] bg-white hover:bg-[#FBF9F4]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-serif text-xl italic group-hover:text-[#B89A62] transition-colors">
                        {item.name}
                      </span>
                      <ArrowUpRight size={16} className="text-[#B89A62] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </div>
                    <p className="text-xs opacity-70 line-clamp-2 leading-relaxed font-light">
                      {item.scope}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-[11px] font-mono text-[#B89A62]">
                    <span className="truncate max-w-[200px]">{item.statute.split('/')[0]}</span>
                    <span className="opacity-60 uppercase text-[9px]">Details</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Conversion Banner */}
      <div className="p-8 border border-[#B89A62]/30 flex flex-col sm:flex-row items-center justify-between gap-6 bg-black/5 dark:bg-white/5">
        <div>
          <h4 className="font-serif text-2xl italic mb-1">Require Specific Jurisdictional Analysis?</h4>
          <p className="text-xs opacity-70">Schedule a privileged chamber discussion with Advocate {PROF_INFO.practitioner.name}.</p>
        </div>
        <button 
          onClick={() => setRoute('contact')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${
            theme === 'dark' ? 'bg-[#B89A62] text-[#0D0F12]' : 'bg-[#171717] text-[#F5F1E8]'
          }`}
        >
          Initiate Intake
        </button>
      </div>
    </motion.div>
  );
}

function InternationalView({ 
  theme, 
  setRoute,
  onOpenDrawer 
}: { 
  theme: string; 
  setRoute: (r: AppRoute) => void;
  onOpenDrawer: (data: DetailDrawerData) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 lg:px-24 py-12 max-w-7xl mx-auto space-y-28">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full border border-[#B89A62]/40 flex items-center justify-center text-[#B89A62]">
          <Globe size={32} />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block">
          Cross-Border Practice
        </span>
        <h1 className="font-serif text-5xl lg:text-6xl italic">International & NRI Pathway</h1>
        <p className="font-light text-lg opacity-80 leading-relaxed">
          Comprehensive, reliable counsel for overseas citizens of India (OCI), foreign corporations entering the Indian market, and multi-jurisdictional family trusts.
        </p>
      </div>

      {/* DEDICATED PATH: INTERNATIONAL BUSINESS ENTRY */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-current/15 pb-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
              Dedicated Corporate Routing
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl italic">
              International Business Entry Pathways
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60 uppercase tracking-widest max-w-xs text-right">
            Enquiry-routing classifications under RBI & FEMA regulations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERNATIONAL_BUSINESS_ENTRIES.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onOpenDrawer({
                category: 'International Business Entry',
                title: entry.title,
                subtitle: entry.targetProfile,
                overview: entry.overview,
                covers: entry.covers,
                requirements: entry.requirements,
                statutoryRef: entry.femaFdiRoute,
                actionLabel: `Route ${entry.title}`
              })}
              className={`p-8 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                theme === 'dark'
                  ? 'border-[#B89A62]/20 bg-[#121417] hover:border-[#B89A62]'
                  : 'border-neutral-300 bg-white hover:border-[#A98750]'
              }`}
            >
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-[#B89A62] uppercase tracking-widest block">
                  {entry.targetProfile.split(',')[0]}
                </span>
                <h3 className="font-serif text-2xl italic group-hover:text-[#B89A62] transition-colors leading-snug">
                  {entry.title}
                </h3>
                <p className="text-xs opacity-75 font-light leading-relaxed">
                  {entry.overview}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between text-xs font-mono text-[#B89A62]">
                <span className="truncate max-w-[190px] text-[10px] opacity-70">
                  {entry.femaFdiRoute.split('·')[0]}
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Video Conference Section */}
      <div className={`p-10 border border-[#B89A62]/30 text-center space-y-4 ${
        theme === 'dark' ? 'bg-[#171918]' : 'bg-[#EFECE3]'
      }`}>
        <h3 className="font-serif text-3xl italic">International Video Conference Facilities</h3>
        <p className="font-light text-sm max-w-xl mx-auto opacity-80 leading-relaxed">
          The chambers host encrypted, secure video consultations synchronized to Eastern Standard Time (EST), Pacific Time (PST), GMT, and Gulf Standard Time (GST).
        </p>
        <div className="pt-2">
          <button 
            onClick={() => setRoute('contact')}
            className={`px-8 py-3.5 font-mono text-xs uppercase tracking-widest ${
              theme === 'dark' ? 'bg-[#B89A62] text-[#0D0F12]' : 'bg-[#171717] text-[#F5F1E8]'
            }`}
          >
            Schedule Global Video Conference
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ConsultView({ theme, setRoute }: { theme: string; setRoute: (r: AppRoute) => void }) {
  const [chat, setChat] = useState<Array<{ role: 'user' | 'assistant'; text: string; statute?: string }>>([
    {
      role: 'assistant',
      text: "Welcome to The Legal Guardian Advisory Intelligence. Select a matter archetype below or enter your inquiry to review jurisdictional procedures, statutory limitation periods, and prerequisite filings under Indian law."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const getKnowledgeResponse = (query: string): { text: string; statute: string } => {
    const q = query.toLowerCase();
    if (q.includes('ibc') || q.includes('insolvency') || q.includes('nclt')) {
      return {
        text: "Under the Insolvency and Bankruptcy Code (IBC) 2016, Section 7 petitions (Financial Creditors) and Section 9 petitions (Operational Creditors) require establishing an undisputed default of at least ₹1 Crore. For Operational Creditors, a formal statutory Demand Notice in Form 3 or Form 4 under Section 8 is mandatory with a 10-day notice window prior to filing before the NCLT.",
        statute: "Insolvency and Bankruptcy Code, 2016 (Sec 7, 8, 9) · Limitation Act 1963 (Art 137)"
      };
    } else if (q.includes('138') || q.includes('cheque') || q.includes('negotiable')) {
      return {
        text: "Proceedings under Section 138 of the Negotiable Instruments Act require strict adherence to procedural milestones: (1) Cheque must be presented within 3 months; (2) Statutory demand notice must be dispatched within 30 days of receiving the bank memo; (3) 15-day cure period must elapse without payment; (4) Formal criminal complaint must be filed before the Magistrate within 30 days of the cause of action arising.",
        statute: "Negotiable Instruments Act, 1881 (Sec 138–142)"
      };
    } else if (q.includes('nri') || q.includes('property') || q.includes('fema')) {
      return {
        text: "For Non-Resident Indians managing property in India: Under FEMA regulations, sale proceeds of inherited residential property can be repatriated up to USD 1,000,000 per financial year through authorized dealer banks, subject to producing Form 15CA/15CB certificates from a chartered accountant. Adverse possession challenges require showing clear title documents, municipal property tax receipts, and registered deeds.",
        statute: "Foreign Exchange Management (Remittance of Assets) Regulations, 2016"
      };
    } else if (q.includes('rera') || q.includes('builder') || q.includes('flat') || q.includes('possession')) {
      return {
        text: "Under Section 18 of RERA (Real Estate Regulation & Development Act, 2016), if an allottee wishes to withdraw from the project due to project delay, the promoter is liable to return the invested amount with prescribed interest (SBI MCLR + 2%). Alternatively, allottees electing to remain in the project are entitled to monthly delay compensation until possession is delivered.",
        statute: "Real Estate (Regulation and Development) Act, 2016 (Sec 18 & 19)"
      };
    } else if (q.includes('pmla') || q.includes('ed') || q.includes('money laundering')) {
      return {
        text: "Under the Prevention of Money Laundering Act (PMLA), 2002, summons issued under Section 50 require immediate legal scrutiny. Provisional attachment orders issued under Section 5 must be adjudicated by the PMLA Adjudicating Authority within 180 days. Constitutional relief under Article 226 before the High Court is available where jurisdictional parameters are breached.",
        statute: "Prevention of Money Laundering Act, 2002 (Sec 5, 8, 50)"
      };
    } else if (q.includes('incorporation') || q.includes('company') || q.includes('llp')) {
      return {
        text: "Under the Companies Act, 2013, incorporation of a Private Limited Company is executed via the SPICe+ integrated web form with the Central Registration Centre (CRC). Key requirements include RUN name approval, Digital Signature Certificates (DSC Class 3), Director Identification Numbers (DIN), drafting bespoke MoA/AoA, and mandatory subsequent INC-20A Commencement of Business filing within 180 days.",
        statute: "Companies Act, 2013 (Section 3, 7, 10A) · SPICe+ MCA System"
      };
    } else {
      return {
        text: `Regarding your query on "${query}": Preliminary review indicates this involves multi-forum consideration under Indian civil, corporate, and regulatory jurisprudence. We recommend formal document intake and chamber review to evaluate forum jurisdiction, statutory compliance requirements, and interim protection strategy.`,
        statute: "General Corporate & Civil Jurisprudence"
      };
    }
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputVal;
    if (!q.trim() || loading) return;

    setChat(prev => [...prev, { role: 'user', text: q }]);
    setInputVal('');
    setLoading(true);

    setTimeout(() => {
      const response = getKnowledgeResponse(q);
      setChat(prev => [...prev, { 
        role: 'assistant', 
        text: response.text,
        statute: response.statute
      }]);
      setLoading(false);
    }, 900);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 lg:px-24 py-8 max-w-5xl mx-auto">
      <div className={`border overflow-hidden shadow-2xl flex flex-col h-[78vh] ${
        theme === 'dark' 
          ? 'bg-[#101215] text-[#F2EEE5] border-[#B89A62]/30' 
          : 'bg-[#FBF9F4] text-[#171717] border-[#A98750]/30'
      }`}>
        {/* Terminal Header */}
        <div className={`p-5 border-b flex justify-between items-center ${
          theme === 'dark' ? 'border-[#B89A62]/20 bg-[#171918]' : 'border-[#A98750]/20 bg-[#ECE7DA]'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#B89A62]" />
              <h3 className="font-serif text-xl italic font-medium">Advisory Intelligence Interface</h3>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">
              Indian Jurisdictional Discovery · Procedural & Statutory Reference
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono opacity-60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Statutory Database Active</span>
          </div>
        </div>
        
        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
          {chat.map((m, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 8 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 text-sm leading-relaxed rounded-sm ${
                m.role === 'user' 
                  ? 'bg-[#B89A62]/20 border-r-2 border-[#B89A62]' 
                  : theme === 'dark'
                    ? 'border border-[#B89A62]/20 bg-[#171918]/90'
                    : 'border border-neutral-300 bg-white'
              }`}>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#B89A62] mb-1">
                  {m.role === 'user' ? 'Client Inquiry' : 'Advisory Intelligence'}
                </div>
                <p className="font-light">{m.text}</p>
                {m.statute && (
                  <div className="mt-3 pt-2 border-t border-current/10 text-[11px] font-mono opacity-70 flex items-center gap-1.5">
                    <Scale size={12} className="text-[#B89A62] shrink-0" />
                    <span>{m.statute}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#B89A62] animate-pulse">
              <span className="w-2 h-2 bg-[#B89A62] rounded-full animate-bounce" />
              <span>Analyzing statutes and judicial precedents...</span>
            </div>
          )}
        </div>

        {/* Preset Archetypes */}
        <div className="px-6 py-2 border-t border-current/10 flex flex-wrap gap-2 text-xs font-mono">
          <span className="text-[10px] uppercase opacity-50 self-center tracking-wider mr-1">Archetypes:</span>
          {[
            { label: 'IBC Default Notice', q: 'What are the steps for filing Section 7 vs Section 9 under IBC?' },
            { label: 'Section 138 Timeline', q: 'What is the statutory timeline for Section 138 cheque bounce notice?' },
            { label: 'NRI Property Sale', q: 'How does an NRI repatriate proceeds from ancestral property under FEMA?' },
            { label: 'Company Setup Process', q: 'What are the key steps for Private Limited Company incorporation under Companies Act?' }
          ].map(opt => (
            <button 
              key={opt.label} 
              onClick={() => handleSend(opt.q)}
              className={`text-[10px] uppercase border px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                theme === 'dark' 
                  ? 'border-[#B89A62]/30 hover:bg-[#B89A62]/10 text-[#F2EEE5]/80' 
                  : 'border-neutral-300 hover:bg-[#A98750]/10 text-neutral-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-[#B89A62]/20 bg-[#171918]' : 'border-[#A98750]/20 bg-[#ECE7DA]'
        }`}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3"
          >
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Inquire on statutory procedure, limitation, incorporation, or regulatory defense..."
              className={`flex-1 bg-transparent px-4 py-2.5 text-xs font-mono border focus:outline-none transition-colors ${
                theme === 'dark' 
                  ? 'border-[#B89A62]/30 focus:border-[#B89A62] text-[#F2EEE5]' 
                  : 'border-neutral-400 focus:border-[#A98750] text-[#171717]'
              }`}
            />
            <button 
              type="submit"
              disabled={loading || !inputVal.trim()}
              className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-40 ${
                theme === 'dark' 
                  ? 'bg-[#B89A62] text-[#0D0F12] font-semibold hover:bg-white' 
                  : 'bg-[#171717] text-[#F5F1E8] font-semibold hover:bg-[#A98750]'
              }`}
            >
              <span>Transmit</span>
              <Send size={12} />
            </button>
          </form>

          <p className="text-[9px] font-mono opacity-40 text-center uppercase tracking-widest mt-3">
            Notice: Advisory Intelligence generates informational analysis. It does not substitute individualized legal counsel or establish an advocate-client relationship.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView({ 
  theme, 
  prefill, 
  setPrefill 
}: { 
  theme: string; 
  prefill?: string; 
  setPrefill?: (val: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [matterCode, setMatterCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'legal',
    country: 'India',
    statement: prefill || '',
    urgency: 'standard',
    confidentialityAgreed: false
  });

  useEffect(() => {
    if (prefill) {
      setFormData(prev => ({ ...prev, statement: prefill }));
    }
  }, [prefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'TLG-' + Math.floor(1000 + Math.random() * 9000);
    setMatterCode(randomCode);
    setSubmitted(true);
    if (setPrefill) setPrefill('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-12">
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block font-semibold">
            Confidential Chambers Intake · {PROF_INFO.practitioner.contactTag}
          </span>
          <h1 className="font-serif text-5xl lg:text-6xl italic">Initiate Privileged Consultation.</h1>
          <div className="flex items-start gap-3 p-4 border border-[#4A2528]/30 bg-[#4A2528]/5 text-xs opacity-85 leading-relaxed font-light">
            <Shield size={18} className="text-[#4A2528] shrink-0 mt-0.5" />
            <p>
              Communications through this intake portal are received directly by the chambers of Advocate {PROF_INFO.practitioner.name}. Information submitted is treated with strict professional confidentiality under the Indian Evidence Act, 1872.
            </p>
          </div>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`py-16 px-8 text-center space-y-6 border ${
              theme === 'dark' 
                ? 'bg-[#121417] border-[#B89A62]/30 text-[#F2EEE5]' 
                : 'bg-white border-[#A98750]/30 text-[#171717]'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B89A62]">Intake Logged</span>
              <h3 className="font-serif text-4xl italic">Chamber Matter Reference #{matterCode}</h3>
            </div>
            <p className="opacity-75 max-w-lg mx-auto text-sm leading-relaxed">
              Your inquiry has been encrypted and submitted to the personal chamber docket. The designated counsel will review jurisdictional details and reply within 24 business hours to arrange a formal preliminary conference.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button 
                onClick={() => { setSubmitted(false); setFormData({ ...formData, statement: '' }); }}
                className="font-mono text-xs uppercase tracking-widest border border-current/20 px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Submit Additional Matter
              </button>
            </div>
          </motion.div>
        ) : (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Full Name / Representative Name *
              </label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vikramaditya Singhania"
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Professional / Direct Email *
              </label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="counsel@corporation.com"
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Telephone / WhatsApp with Country Code
              </label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98100 00000 / +1 415 000 0000"
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Category of Legal Matter *
              </label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
              >
                <option value="legal" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Contentious Litigation & High Court Dispute</option>
                <option value="ibc" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>IBC Corporate Insolvency & NCLT</option>
                <option value="corporate" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Corporate M&A & Boardroom Advisory</option>
                <option value="regulatory" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Regulatory Defense (PMLA / ED / SEBI / NGT)</option>
                <option value="nri" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>NRI Ancestral Property & FEMA Matters</option>
                <option value="tax" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>GST & Direct Tax Appeals</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Jurisdiction / Country of Residence *
              </label>
              <input 
                type="text" 
                required 
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. India / United States / United Kingdom / UAE"
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Time Sensitivity / Hearing Urgency
              </label>
              <select 
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors"
              >
                <option value="standard" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Standard Consultation (Within 48 Hours)</option>
                <option value="urgent" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Urgent / Hearing Scheduled Within 7 Days</option>
                <option value="immediate" className={theme === 'dark' ? 'bg-[#0D0F12]' : 'bg-[#F5F1E8]'}>Immediate / Search, Seizure or Arrest Anticipated</option>
              </select>
            </div>

            <div className="col-span-full space-y-2">
              <label className="font-mono text-xs uppercase opacity-70 tracking-wider">
                Concise Statement of Dispute / Counsel Requirements *
              </label>
              <textarea 
                rows={5} 
                required 
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                placeholder="Briefly state key facts, dates, existing court forums (if any), and specific legal outcome sought..."
                className="w-full bg-transparent border-b border-current/20 py-3 text-sm focus:outline-none focus:border-[#B89A62] transition-colors resize-none leading-relaxed" 
              />
            </div>

            <div className="col-span-full flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="confidentiality" 
                required
                checked={formData.confidentialityAgreed}
                onChange={(e) => setFormData({ ...formData, confidentialityAgreed: e.target.checked })}
                className="mt-1 accent-[#B89A62]"
              />
              <label htmlFor="confidentiality" className="text-xs opacity-70 font-light leading-relaxed cursor-pointer">
                I confirm that I am seeking professional legal counsel of my own volition and acknowledge that formal engagement is subject to conflict check and mutual chamber fee agreement.
              </label>
            </div>

            <button 
              type="submit" 
              className={`col-span-full py-5 font-mono text-xs uppercase tracking-[0.3em] font-semibold transition-all flex items-center justify-center gap-3 ${
                theme === 'dark' 
                  ? 'bg-[#B89A62] text-[#0D0F12] hover:bg-white' 
                  : 'bg-[#171717] text-[#F5F1E8] hover:bg-[#A98750]'
              }`}
            >
              <span>Transmit Privileged Intake</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

function InsightsView({ 
  theme, 
  onSelectInsight 
}: { 
  theme: string; 
  onSelectInsight: (item: InsightArticle) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 lg:px-24 py-12 max-w-7xl mx-auto space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block">
          Editorial & Jurisprudence
        </span>
        <h1 className="font-serif text-5xl lg:text-6xl italic">Insights & Intelligence</h1>
        <p className="font-light text-xl opacity-75">
          Scholarly commentary and procedural analysis published by the chambers on emerging statutory shifts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {INSIGHTS_DATA.map((post) => (
          <div 
            key={post.title} 
            onClick={() => onSelectInsight(post)}
            className={`p-10 border transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
              theme === 'dark' 
                ? 'bg-[#121417] border-[#B89A62]/20 hover:border-[#B89A62]' 
                : 'bg-white border-neutral-300 hover:border-[#A98750]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-6">
                <span>{post.date}</span>
                <span className="uppercase tracking-widest text-[#B89A62]">{post.cat}</span>
              </div>
              <h3 className="font-serif text-3xl leading-snug mb-4 group-hover:text-[#B89A62] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm opacity-70 leading-relaxed font-light mb-8">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#B89A62]">
              <span>Read Full Briefing</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DisclaimerView({ theme }: { theme: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-sm leading-relaxed opacity-85">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B89A62] block">
          Statutory Compliance
        </span>
        <h1 className="font-serif text-5xl italic">Bar Council of India Disclaimer.</h1>
      </div>

      <div className="p-4 border border-[#B89A62]/30 bg-[#B89A62]/5 font-mono text-xs leading-relaxed text-[#B89A62]">
        Rule 36 of the Bar Council of India Rules (Standards of Professional Conduct and Etiquette)
      </div>

      <div className="space-y-6 font-light">
        <p>
          As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising their practice directly or indirectly through any media, print, broadcast, or internet forums.
        </p>
        <p>
          By accessing this digital portal (<strong>The Legal Guardian</strong>), the user acknowledges and confirms that:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            The user is seeking information regarding Advocate {PROF_INFO.practitioner.name} and chambers of their own accord and volition, and there has been no form of solicitation, invitation, advertisement, or inducement whatsoever.
          </li>
          <li>
            The content presented herein is made available solely for general informational and educational purposes and should not be construed as legal advice, formal opinion, or an invitation to enter into an advocate-client relationship.
          </li>
          <li>
            Any transmission, reception, or use of this website, including queries transmitted via the 'Advisory Intelligence' interface, does not establish or constitute an advocate-client engagement.
          </li>
          <li>
            Advocate {PROF_INFO.practitioner.name} and The Legal Guardian expressly disclaim all liability with respect to actions taken or not taken based on any or all contents of this portal.
          </li>
        </ul>
        <p>
          Visitors requiring definitive legal advice should retain independent legal counsel qualified in the relevant jurisdiction.
        </p>
      </div>

      <div className="pt-8 border-t border-current/15 font-mono text-[10px] uppercase tracking-widest opacity-60 flex justify-between">
        <span>Effective: Current Term</span>
        <span>BCI / New Delhi Jurisdiction</span>
      </div>
    </motion.div>
  );
}
