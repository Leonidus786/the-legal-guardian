import {
  BusinessStructure,
  SetupStep,
  AdditionalRegistration,
  OngoingComplianceItem,
  InternationalBusinessEntry
} from '../types';

export const BUSINESS_STRUCTURES: BusinessStructure[] = [
  {
    id: "pvt-ltd",
    name: "Private Limited Company",
    subtitle: "Most preferred vehicle for institutional capital, VC funding, and limited liability protection.",
    overview: "A Private Limited Company is an independent statutory legal entity distinct from its shareholders and directors. Governed by the Companies Act, 2013, it offers limited liability, seamless equity transferability, and the gold standard of institutional credibility in India.",
    bestFor: "Startups planning equity fundraising, scalable businesses, cross-border joint ventures, and ventures with two or more promoters.",
    covers: [
      "SPICe+ Part A (Name Reservation) and Part B (Incorporation)",
      "Drafting bespoke Memorandum & Articles of Association (MoA & AoA)",
      "Digital Signature Certificates (DSC) & Director Identification Numbers (DIN)",
      "Electronic PAN, TAN, and EPFO/ESIC integrated registration",
      "Capital structure definition and authorized share capital allocation"
    ],
    requirements: [
      "Minimum 2 Directors (at least one Indian resident) and 2 Shareholders",
      "PAN card, Identity Proof (Passport/Voter ID/Driving License) of directors",
      "Address proof of directors (Bank statement or utility bill < 2 months old)",
      "Registered office address proof (Electricity bill + NOC from property owner)",
      "Digital Signature Certificate (DSC Class 3) for authorized signatories"
    ],
    turnaround: "5 to 9 business days (subject to CRC / MCA processing)",
    governingLaw: "Companies Act, 2013 · Ministry of Corporate Affairs (MCA)"
  },
  {
    id: "llp",
    name: "Limited Liability Partnership (LLP)",
    subtitle: "Combines corporate limited liability with partnership operational flexibility and zero dividend distribution tax.",
    overview: "Governed by the Limited Liability Partnership Act, 2008, an LLP is a hybrid corporate vehicle offering the benefits of limited liability to partners while permitting internal organizational flexibility governed purely by the contractual LLP Agreement.",
    bestFor: "Professional service firms, consulting practices, boutique advisory agencies, and family-held operating businesses not actively seeking external venture capital.",
    covers: [
      "RUN-LLP Name Approval application with Ministry of Corporate Affairs",
      "FiLLiP Incorporation Form execution and Partner DPIN allocation",
      "Drafting and statutory filing of the formal LLP Agreement (Form 3)",
      "Partner capital contribution schedules and profit-sharing clauses",
      "PAN and TAN issuance alongside incorporation certificate"
    ],
    requirements: [
      "Minimum 2 Designated Partners (at least one resident in India)",
      "KYC documents (PAN, Aadhaar/Passport, Utility bills of partners)",
      "Registered office utility bill and NOC from title holder",
      "Class 3 DSC for Designated Partners",
      "Formulation and execution of mutually agreed LLP Agreement within 30 days"
    ],
    turnaround: "7 to 10 business days",
    governingLaw: "Limited Liability Partnership Act, 2008"
  },
  {
    id: "opc",
    name: "One Person Company (OPC)",
    subtitle: "Corporate status and limited liability protection for solo entrepreneurs and single-owner enterprises.",
    overview: "Introduced under the Companies Act, 2013, the OPC structure enables a single entrepreneur to operate a registered corporate entity with limited liability, separate legal personality, and perpetual succession without needing a co-promoter.",
    bestFor: "Solo founders, individual professional practitioners, e-commerce solo operators, and consultants wanting corporate protection without partner dilution.",
    covers: [
      "Name reservation via SPICe+ Part A",
      "Mandatory Nominee Director consent filing (Form INC-3)",
      "MoA & AoA drafting suited for single-member corporate governance",
      "Integrated PAN, TAN, and statutory tax registrations",
      "Statutory conversion roadmap when capital or turnover exceeds thresholds"
    ],
    requirements: [
      "1 Natural Person as Sole Director & Shareholder (Indian citizen)",
      "1 Nominee Director nominated in the MoA with written consent",
      "PAN, identity, and residential address proof of promoter and nominee",
      "Registered office utility bill and landlord NOC",
      "Valid DSC for the sole promoter"
    ],
    turnaround: "5 to 8 business days",
    governingLaw: "Companies Act, 2013 (Section 2(62))"
  },
  {
    id: "section-8",
    name: "Section 8 Company",
    subtitle: "Non-profit corporate entity for charitable, scientific, educational, social welfare, and research objectives.",
    overview: "A Section 8 Company is registered under the Companies Act, 2013 for the promotion of commerce, art, science, education, sports, healthcare, social welfare, religion, or environmental protection. Profits are applied solely toward organizational objectives, with zero dividend payouts.",
    bestFor: "Social impact enterprises, philanthropic foundations, research institutions, educational trusts, and CSR-funded non-governmental organizations.",
    covers: [
      "Central Government License under Section 8(1) application (Form INC-12)",
      "Detailed financial and organizational statement of charitable objects",
      "Drafting restrictive MoA/AoA prohibiting dividend or asset distribution",
      "SPICe+ Incorporation and certificate of incorporation issuance",
      "Application guidance for 12AB and 80G tax exemptions under the Income Tax Act"
    ],
    requirements: [
      "Minimum 2 Directors and 2 Members",
      "Clear statement of charitable objects and projected 3-year budget",
      "KYC documentation of founding members and directors",
      "Registered office proof and owner NOC",
      "Approval from Regional Director / Central Registration Centre"
    ],
    turnaround: "15 to 25 business days (requires prior Central Government license)",
    governingLaw: "Companies Act, 2013 (Section 8)"
  },
  {
    id: "proprietorship",
    name: "Sole Proprietorship",
    subtitle: "Uncomplicated trading or service structure owned, controlled, and managed by a single individual.",
    overview: "A Sole Proprietorship is the simplest, most rapid business structure in India. While it lacks separate corporate personality (meaning the proprietor carries unlimited liability), it offers full autonomy, zero MCA filing requirements, and minimal statutory overhead.",
    bestFor: "Small retail businesses, freelance professionals, local service agencies, and micro-enterprises testing market feasibility before formal incorporation.",
    covers: [
      "Procurement of foundational business identity licenses",
      "Udyam (MSME) statutory registration certificate",
      "GST registration under the proprietor's PAN",
      "Shops & Establishment Act registration in the relevant municipal jurisdiction",
      "Assistance with current bank account opening resolution and KYC"
    ],
    requirements: [
      "Proprietor's PAN card and Aadhaar card",
      "Bank statement / cancelled cheque of proprietor",
      "Commercial address proof (Electricity bill / Rent deed + NOC)",
      "Trade name selection matching commercial activities"
    ],
    turnaround: "3 to 5 business days",
    governingLaw: "State Shops & Establishment Acts · MSMED Act · GST Acts"
  }
];

export const SETUP_STEPS: SetupStep[] = [
  {
    number: "01",
    id: "choose-structure",
    title: "Choose Business Structure",
    subtitle: "Strategic corporate architecture aligned with liability, capital roadmap, and governance needs.",
    overview: "The initial choice of business structure defines the company's liability profile, tax obligations, regulatory burden, and attractiveness to institutional investors. Private counsel evaluates whether a Private Limited, LLP, OPC, Section 8, or Proprietorship best achieves your commercial goals.",
    covers: [
      "Comparative liability and tax impact advisory",
      "Co-founder equity split and vesting structure alignment",
      "Evaluation of institutional fundraising vs bootstrapped operating model",
      "Cross-border holding structure and FDI compliance check",
      "Selection of appropriate MCA corporate form"
    ],
    requirements: [
      "Clear summary of planned commercial activities",
      "Number and residency status of initial promoters and directors",
      "Initial authorized and paid-up capital requirements",
      "Target timeline for external venture or debt capital"
    ],
    mandatoryFor: "All founding teams, startups, and expanding enterprises prior to statutory filings.",
    statutoryRef: "Companies Act, 2013 · LLP Act, 2008 · Income Tax Act, 1961"
  },
  {
    number: "02",
    id: "incorporation",
    title: "Incorporation / Registration",
    subtitle: "Statutory reservation of corporate identity, charter drafting, and certificate issuance.",
    overview: "Formal incorporation brings the corporate body into existence. In India, this is executed through the Ministry of Corporate Affairs SPICe+ (SPICe Plus) integrated system, culminating in the issuance of the Certificate of Incorporation (CoI) and Corporate Identity Number (CIN).",
    covers: [
      "SPICe+ Part A name availability search and reservation (2 name choices)",
      "Drafting MoA and AoA customized to corporate goals and dispute clauses",
      "DIN (Director Identification Number) allocation for up to 3 directors",
      "Execution of statutory declarations in Forms INC-9 and INC-8",
      "Filing with the Central Registration Centre (CRC) and Certificate of Incorporation (CoI)"
    ],
    requirements: [
      "Unique proposed corporate names aligned with MCA Rule 8 guidelines",
      "PAN, Passport/Voter ID, and residential proof of all promoters",
      "Registered office ownership proof, electricity bill (<2 months), and owner NOC",
      "Class 3 Digital Signatures for proposed directors"
    ],
    mandatoryFor: "All corporate entities (Private Limited, LLP, OPC, Section 8).",
    statutoryRef: "Companies Act 2013 (Sections 3, 4, 7) · MCA CRC Guidelines"
  },
  {
    number: "03",
    id: "pan-tan",
    title: "PAN / TAN Allocation",
    subtitle: "Statutory tax identification credentials for corporate income and withholding tax compliance.",
    overview: "Permanent Account Number (PAN) is the central 10-digit alphanumeric corporate tax identifier, while Tax Deduction and Collection Account Number (TAN) is mandatory for deducting and remitting tax at source (TDS) under the Income Tax Act, 1961.",
    covers: [
      "Automatic electronic generation of PAN (e-PAN) during SPICe+ incorporation",
      "Issuance of TAN under Section 203A of the Income Tax Act",
      "Income tax e-filing portal corporate profile registration",
      "Verification of corporate PAN details with NSDL/UTIITSL databases",
      "Guidance on statutory TDS rates and deduction thresholds"
    ],
    requirements: [
      "Certificate of Incorporation (CoI)",
      "Authorized signatory DSC and board authorization",
      "Corporate registered address verification",
      "Incorporated entity details"
    ],
    mandatoryFor: "Mandatory for all incorporated entities and operating businesses in India.",
    statutoryRef: "Income Tax Act, 1961 (Sections 139A & 203A)"
  },
  {
    number: "04",
    id: "gst",
    title: "GST Registration",
    subtitle: "Unified indirect tax registration under the Goods and Services Tax Act.",
    overview: "GST registration is mandatory for businesses exceeding turnover thresholds (₹40 Lakhs for goods / ₹20 Lakhs for services in standard states), entities engaged in inter-state commerce, e-commerce suppliers, and those requiring input tax credit (ITC) efficiency.",
    covers: [
      "Application on the GST Common Portal (Form GST REG-01)",
      "Proper classification of Harmonized System of Nomenclature (HSN) and SAC codes",
      "Aadhaar biometric authentication and authorized signatory setup",
      "Registration of principal place of business and additional godowns/branches",
      "Issuance of Goods and Services Tax Identification Number (GSTIN) certificate"
    ],
    requirements: [
      "Certificate of Incorporation / Partnership Deed",
      "PAN of entity and authorized signatory",
      "Electricity bill / Municipal tax receipt + rent deed and landlord NOC",
      "Bank statement / cancelled cheque showing corporate account details",
      "Letter of Authorization / Board Resolution for authorized signatory"
    ],
    mandatoryFor: "Businesses crossing turnover thresholds, inter-state trade, or e-commerce operators.",
    statutoryRef: "Central Goods and Services Tax (CGST) Act, 2017 (Sections 22–25)"
  },
  {
    number: "05",
    id: "other-registrations",
    title: "Other Mandatory Registrations",
    subtitle: "Sector-specific licenses, municipal clearances, and industry recognition certifications.",
    overview: "Beyond baseline incorporation and tax IDs, operating businesses require sector-specific licenses depending on industry, employment thresholds, foreign trade, and physical shop presence. Counsel coordinates these clearances to prevent statutory closures.",
    covers: [
      "Import Export Code (IEC) from Directorate General of Foreign Trade (DGFT)",
      "FSSAI food business manufacturing, trading, or restaurant licensing",
      "Municipal Shops and Establishment Act registration",
      "Startup India (DPIIT) statutory recognition for tax and funding exemptions",
      "Employee Provident Fund (EPFO) and Employee State Insurance (ESIC) setups"
    ],
    requirements: [
      "Entity PAN and incorporation certificate",
      "Premises lease deed and layout specifications",
      "List of key goods/services and manufacturing details (if applicable)",
      "Employee count and payroll structure details"
    ],
    mandatoryFor: "Businesses involved in physical premises operations, manufacturing, food, cross-border trade, or hiring $\\ge 10/20$ staff.",
    statutoryRef: "Foreign Trade Act · FSSAI Act 2006 · State Shops & Establishment Acts"
  },
  {
    number: "06",
    id: "post-incorporation",
    title: "Post-Incorporation Compliance",
    subtitle: "Strict statutory 30-day and 180-day mandates to preserve active corporate standing.",
    overview: "Incorporation is only the beginning. Within statutory time limits, newly incorporated companies must complete critical mandates—including capital subscription deposit, statutory auditor appointment, and filing Commencement of Business declarations.",
    covers: [
      "Opening Corporate Current Bank Account with authorized resolutions",
      "Deposit of subscribed share capital by initial subscribers into corporate bank account",
      "Filing Form INC-20A (Declaration for Commencement of Business) within 180 days",
      "Appointment of First Statutory Auditor in Form ADT-1 within 30 days of incorporation",
      "Issue and stamping of Physical / Demat Share Certificates within 60 days",
      "Maintaining corporate office signboard and statutory disclosures under Section 12"
    ],
    requirements: [
      "Corporate bank statement proving subscriber share capital deposit",
      "Written consent (Form ADT-1) and eligibility certificate from chartered accountant",
      "Photograph of registered office with exterior signboard display (Section 12)",
      "Board resolution approving share certificate issuance and common seal (if any)"
    ],
    mandatoryFor: "Mandatory for all companies incorporated under Companies Act 2013.",
    statutoryRef: "Companies Act, 2013 (Sections 10A, 12, 56, 139) · MCA Penal Provisions"
  },
  {
    number: "07",
    id: "ongoing-compliance",
    title: "Ongoing Corporate / Secretarial Compliance",
    subtitle: "Annual filings, statutory registers, board minutes, and director compliance maintenance.",
    overview: "Corporate entities must maintain continuous regulatory hygiene to avoid heavy daily late fees, director disqualification, and strike-off proceedings by the Registrar of Companies (ROC). Counsel provides comprehensive secretarial management.",
    covers: [
      "Annual ROC Filings: AOC-4 (Financials) and MGT-7/7A (Annual Return)",
      "Annual Director KYC filings (DIR-3 KYC / DIR-3 KYC Web)",
      "Statutory registers maintenance under Sections 88, 170, and 186",
      "Drafting agendas, notices, and formal minutes for Board Meetings & Annual General Meetings (AGM)",
      "Filing DPT-3 (Return of Deposits) and MSME-1 periodic disclosures"
    ],
    requirements: [
      "Audited balance sheet, profit & loss statement, and auditor's report",
      "Directors' Report under Section 134 with mandatory disclosures",
      "Director active mobile number and email verification for KYC",
      "Shareholding pattern and list of shareholders as on AGM date"
    ],
    mandatoryFor: "All operating companies and LLPs on an annual recurring cycle.",
    statutoryRef: "Companies Act, 2013 (Sections 92, 137, 173, 196) · Secretarial Standards (SS-1, SS-2)"
  }
];

export const REGISTRATION_PATHWAYS: AdditionalRegistration[] = [
  {
    id: "fssai",
    name: "FSSAI Food Business Registration / License",
    code: "FSSAI",
    overview: "Mandatory statutory license under the Food Safety and Standards Act, 2006 for any entity engaged in manufacturing, processing, packaging, storage, transportation, or distribution of food products.",
    covers: [
      "Basic FSSAI Registration (Turnover up to ₹12 Lakhs)",
      "State FSSAI License (Turnover ₹12 Lakhs to ₹20 Crores)",
      "Central FSSAI License (Large manufacturers, importers, 100% EOUs, or multi-state operators)",
      "Food Safety Management System (FSMS) plan formulation",
      "Product labeling and packaging statutory conformity audits"
    ],
    requirements: [
      "Entity constitution documents and authorized signatory KYC",
      "Layout plan of the processing / storage unit with equipment details",
      "Water testing laboratory report from accredited testing body",
      "NOC from local municipality / panchayat",
      "List of food categories proposed to be handled"
    ],
    regulatoryAuthority: "Food Safety and Standards Authority of India (FSSAI)"
  },
  {
    id: "iec",
    name: "Import Export Code (IEC)",
    code: "DGFT-IEC",
    overview: "The primary 10-digit identification code issued by the Directorate General of Foreign Trade (DGFT), mandatory for commercial export or import of goods and specific cross-border services to/from India.",
    covers: [
      "Online application on the DGFT portal matching corporate PAN",
      "Linking with ICEGATE (Indian Customs EDI Gateway) profile",
      "Annual online re-validation of IEC details as mandated by DGFT",
      "Letter of Undertaking (LUT) guidance for zero-rated export under GST",
      "Authorized Dealer (AD) Code registration at customs ports"
    ],
    requirements: [
      "Corporate / Proprietor PAN",
      "Incorporation certificate / partnership deed",
      "Bank certificate / cancelled cheque showing corporate account",
      "Proof of business address (Electricity bill, lease deed)",
      "Class 3 Digital Signature Certificate (DSC)"
    ],
    regulatoryAuthority: "Directorate General of Foreign Trade (DGFT) · Ministry of Commerce"
  },
  {
    id: "shops-establishment",
    name: "Shops & Establishment Registration",
    code: "GUMASTA / S&E",
    overview: "State-level statutory registration regulating terms of employment, work hours, rest intervals, statutory leaves, wages, and health/safety conditions in commercial establishments and offices.",
    covers: [
      "Registration with the State Labor Department / Municipal Corporation",
      "Statutory employment registers and attendance records setup",
      "Display notices and workplace safety compliance documentation",
      "Renewal and amendment filings upon office relocation or expansion",
      "Exemption applications for IT/ITES 24x7 operations where permissible"
    ],
    requirements: [
      "Proof of commercial premises ownership or valid lease deed",
      "Utility bill of premises (less than 2 months old)",
      "PAN and Aadhaar card of employer / authorized director",
      "Employee count, designation, and salary scale summary",
      "Photograph of establishment with bilingual signboard"
    ],
    regulatoryAuthority: "State Department of Labour / Municipal Corporations"
  },
  {
    id: "startup-india",
    name: "Startup India Recognition (DPIIT)",
    code: "DPIIT",
    overview: "Official certification under the Startup India initiative by the Department for Promotion of Industry and Internal Trade (DPIIT), unlocking corporate tax holidays, patent rebates, and self-certification benefits.",
    covers: [
      "Preparation and drafting of the innovation and scalability dossier",
      "Filing on the National Startup Portal for DPIIT Recognition Certificate",
      "Application for Section 80-IAC 3-year income tax exemption before Inter-Ministerial Board",
      "Angel Tax exemption under Section 56(2)(viib) documentation",
      "Fast-track patent and trademark filing assistance with 80% government fee rebate"
    ],
    requirements: [
      "Entity must be incorporated as Private Limited or LLP < 10 years ago",
      "Turnover must not have exceeded ₹100 Crores in any preceding financial year",
      "Entity must be working toward innovation, development, or improvement of products/services",
      "Brief write-up and video pitch deck detailing scalability and employment generation"
    ],
    regulatoryAuthority: "DPIIT · Ministry of Commerce and Industry"
  },
  {
    id: "pf-esi",
    name: "PF / ESI Registration (EPFO & ESIC)",
    code: "EPFO & ESIC",
    overview: "Mandatory statutory social security registrations protecting employee welfare, healthcare, and provident retirement benefits under central labor codes.",
    covers: [
      "Employee Provident Fund (EPF) registration (mandatory upon 20+ employees)",
      "Employee State Insurance (ESI) registration (mandatory upon 10+ employees in notified districts)",
      "Voluntary early registration for startups to attract talent",
      "Digital unified portal access for monthly contribution filings (ECR)",
      "Drafting employment contracts reflecting statutory salary deductions"
    ],
    requirements: [
      "Certificate of Incorporation and corporate PAN",
      "List of directors / partners with KYC and contact details",
      "Primary commercial premises address proof and utility bill",
      "List of employees with date of joining and gross salary breakdown",
      "Specimen signature of authorized signatory"
    ],
    regulatoryAuthority: "Employees' Provident Fund Organisation (EPFO) & ESIC Corporation"
  }
];

export const ONGOING_COMPLIANCE_ITEMS: OngoingComplianceItem[] = [
  {
    id: "roc-annual",
    name: "ROC Annual Compliance Package",
    filingCode: "ANNUAL-MCA",
    frequency: "Annual",
    dueDate: "Within 30 & 60 days of AGM",
    overview: "The comprehensive statutory package encompassing financial statements, annual return, directors' disclosures, and secretarial certifications required under the Companies Act 2013.",
    covers: [
      "Preparation of Director's Report with statutory disclosures",
      "Formulation of notice and resolutions for the Annual General Meeting (AGM)",
      "Consolidated filing of Form AOC-4 and Form MGT-7 with MCA",
      "Secretarial certification and adherence to ICSI Secretarial Standards",
      "Resolution of any technical queries or resubmission notices from CRC"
    ],
    requirements: [
      "Audited financial statements signed by directors and statutory auditor",
      "Auditor's Report and notes to accounts",
      "List of shareholders, transfers, and debenture holders (if any)",
      "Board meeting records approving financials"
    ],
    penaltiesForDefault: "₹100 per day of delay per form without ceiling; potential prosecution of officers in default."
  },
  {
    id: "aoc-4",
    name: "Form AOC-4 (Financial Statements)",
    filingCode: "AOC-4 / AOC-4 XBRL",
    frequency: "Annual",
    dueDate: "Within 30 days of AGM (typically Oct 30)",
    overview: "The statutory electronic form for filing audited balance sheet, profit and loss statement, auditor's report, and director's report with the Registrar of Companies.",
    covers: [
      "Conversion into MCA-compliant PDF attachments and structured data",
      "XBRL taxonomy tagging (for qualifying capital or turnover companies)",
      "Disclosure of CSR spend and related-party transactions under Section 188",
      "Verification of auditor eligibility certificate and appointment validity",
      "Sign-off with Class 3 DSC of Director and practicing professional"
    ],
    requirements: [
      "Final signed and audited Balance Sheet, P&L, Cash Flow Statement",
      "Auditor's Report and Annexures (CARO 2020 where applicable)",
      "Board approval resolution date and AGM convening date"
    ],
    penaltiesForDefault: "₹100 per day additional fee + fine on company and directors under Section 137."
  },
  {
    id: "mgt-7",
    name: "Form MGT-7 / MGT-7A (Annual Return)",
    filingCode: "MGT-7",
    frequency: "Annual",
    dueDate: "Within 60 days of AGM (typically Nov 29)",
    overview: "The official statutory snapshot of corporate structure, shareholding pattern, indebtedness, board meetings held, and director remuneration over the financial year.",
    covers: [
      "Full disclosure of equity and preference capital movements",
      "Detailed list of promoters, public shareholders, and significant beneficial owners (SBO)",
      "Record of Board, Committee, and General meetings conducted during the year",
      "Form MGT-8 Secretarial Certification (where paid-up capital/turnover mandates it)",
      "Filing MGT-7A for small companies and One Person Companies (OPCs)"
    ],
    requirements: [
      "Complete register of members as on financial year closing",
      "Details of director attendance in board and committee meetings",
      "Summary of fines, penalties, or compounding orders (if any)"
    ],
    penaltiesForDefault: "₹100 per day ongoing late fee without cap."
  },
  {
    id: "statutory-registers",
    name: "Maintenance of Statutory Registers",
    filingCode: "SEC-88 / 170",
    frequency: "Continuous / Perpetual",
    dueDate: "Updated immediately upon corporate event",
    overview: "Mandatory corporate records kept at the registered office under the Companies Act 2013, available for inspection by members, auditors, and statutory inspectors.",
    covers: [
      "Register of Members (MGT-1) and Debenture Holders (MGT-2)",
      "Register of Directors and Key Managerial Personnel (Section 170)",
      "Register of Loans, Guarantees, Securities, and Investments (MBP-2 / Section 186)",
      "Register of Contracts with Related Parties in which Directors are Interested (MBP-4)",
      "Register of Charges (CHG-7) and Significant Beneficial Ownership (BEN-4)"
    ],
    requirements: [
      "Board resolutions documenting equity allotments, transfers, and director changes",
      "Executed loan and guarantee agreements",
      "Formal disclosures of interest (Form MBP-1) submitted by directors at first board meeting"
    ],
    penaltiesForDefault: "Penalties ranging from ₹50,000 to ₹3,00,000 on the company and every officer in default."
  },
  {
    id: "board-agm",
    name: "Board, AGM & EGM Compliance",
    filingCode: "SS-1 & SS-2",
    frequency: "Quarterly & Annual",
    dueDate: "Minimum 4 Board Meetings/year (gap < 120 days) + Annual AGM",
    overview: "Corporate governance protocols governing notice dispatch, quorum, voting, agenda drafting, and preservation of minutes under ICSI Secretarial Standards 1 and 2.",
    covers: [
      "Drafting and issuing formal 7-day advance notice with explanatory agenda notes",
      "Conducting quarterly board meetings ensuring maximum 120-day interval",
      "Preparation of formal Minutes Book entries signed by the Chairman",
      "Convening Annual General Meeting (AGM) within 6 months of financial year end",
      "Drafting and convening Extraordinary General Meetings (EGM) for special business"
    ],
    requirements: [
      "Attendance register signed by directors and attendees",
      "Certified copies of draft resolutions",
      "Proof of dispatch of notice to all directors and statutory auditor"
    ],
    penaltiesForDefault: "Invalidation of resolutions; fine on company and company secretary/directors."
  },
  {
    id: "director-kyc",
    name: "Director Identification Number (DIN) KYC",
    filingCode: "DIR-3 KYC / WEB",
    frequency: "Annual",
    dueDate: "September 30 of every financial year",
    overview: "Mandatory annual verification of personal contact information and identity for every individual holding an active Director Identification Number (DIN).",
    covers: [
      "Filing Form DIR-3 KYC Web (for directors with unchanged details via OTP)",
      "Filing full e-Form DIR-3 KYC (for first-time KYC or updated mobile/email/passport)",
      "Mobile number and personal email OTP authentication",
      "Digital signature certification by practicing advocate, CA, or CS",
      "Re-activation and regularization of 'De-activated DIN due to non-filing of DIR-3 KYC'"
    ],
    requirements: [
      "Active DIN of director",
      "Personal mobile number and personal email (not corporate domain)",
      "PAN, Passport (mandatory for foreign nationals), and current residential proof",
      "Valid personal Class 3 DSC"
    ],
    penaltiesForDefault: "DIN de-activation preventing any MCA filings + ₹5,000 statutory government penalty per de-activated DIN."
  },
  {
    id: "compliance-calendar",
    name: "Annual Statutory Compliance Calendar",
    filingCode: "CALENDAR-365",
    frequency: "Monthly / Periodic Track",
    dueDate: "Continuous Multi-Agency Calendar",
    overview: "An institutional compliance matrix synchronizing MCA corporate filings, direct tax TDS returns, GST monthly GSTR-1/3B filings, and labor welfare reporting.",
    covers: [
      "Monthly GST GSTR-1 (11th) and GSTR-3B (20th) tracking",
      "Quarterly TDS return filings (Form 24Q, 26Q, 27Q)",
      "Advance Corporate Tax installments (June 15, Sept 15, Dec 15, March 15)",
      "Annual MCA filings (DPT-3 in June, DIR-3 KYC in Sept, AOC-4 in Oct, MGT-7 in Nov)",
      "Automated chamber alerts before statutory lapse dates"
    ],
    requirements: [
      "Entity fiscal year turnover bracket",
      "Tax filing history and active registration credentials",
      "Payroll and supplier reconciliation statements"
    ],
    penaltiesForDefault: "Cumulative compound interest, loss of input tax credits, and director de-activation."
  }
];

export const INTERNATIONAL_BUSINESS_ENTRIES: InternationalBusinessEntry[] = [
  {
    id: "foreign-subsidiary",
    title: "Foreign Company Entering India",
    targetProfile: "Multinational corporations, offshore enterprises, and overseas parent holding companies.",
    overview: "Structuring the entry of overseas corporations into the Indian market through a Wholly Owned Subsidiary (WOS), Joint Venture (JV), Branch Office (BO), or Liaison Office (LO) under Reserve Bank of India and FEMA regulations.",
    covers: [
      "Evaluation between WOS (Private Limited) vs Branch/Liaison Office",
      "FDI Policy compliance check (100% Automatic Route vs Government Approval Route)",
      "Apostille / Consular legalisation of foreign parent charter and board resolutions",
      "FC-GPR (Foreign Collaboration - General Permission Route) filing on RBI FIRMS portal",
      "Opening of specialized bank accounts (Capital Account / Escrow Accounts)"
    ],
    requirements: [
      "Certificate of Incorporation of the foreign parent company apostilled in home jurisdiction",
      "Board Resolution authorizing Indian subsidiary incorporation and authorized signatory",
      "Apostilled Passport and proof of address of foreign director nominees",
      "Details of ultimate beneficial ownership (UBO) under Press Note 3 compliance"
    ],
    femaFdiRoute: "Automatic FDI Route in 95%+ sectors · RBI FIRMS Single Master Form (SMF) portal"
  },
  {
    id: "nri-business",
    title: "NRI Starting an Indian Business",
    targetProfile: "Non-Resident Indians (NRIs), Overseas Citizens of India (OCI), and Indian diaspora returning founders.",
    overview: "Enabling non-resident Indian citizens and OCI cardholders to establish, capitalize, and operate high-growth businesses in India with flexible repatriation options or domestic parity.",
    covers: [
      "Structuring on a Repatriable basis (Schedule 1) or Non-Repatriable basis (Schedule 4 deemed domestic)",
      "PAN and Class 3 Digital Signature Certificate issuance for overseas passport holders",
      "Setting up Private Limited or LLP with at least one Indian resident director/partner",
      "Remittance coordination from NRE / NRO bank accounts to company subscription account",
      "Tax treaty (DTAA) optimization between India and resident country (USA, UK, UAE, Singapore)"
    ],
    requirements: [
      "Copy of Indian Passport or valid OCI Card with foreign passport",
      "Overseas address proof (Utility bill or bank statement apostilled or verified)",
      "Indian Resident Director nomination (chambers can assist with institutional governance nominee)",
      "Capital remittance bank advice (FIRC - Foreign Inward Remittance Certificate)"
    ],
    femaFdiRoute: "Non-Repatriable investment treated on par with domestic investment under FEMA 20(R)"
  },
  {
    id: "foreign-founder",
    title: "Foreign Founder / Entrepreneur",
    targetProfile: "Foreign nationals seeking to incorporate an operational entity, joint venture, or R&D center in India.",
    overview: "Comprehensive regulatory and legal advisory for foreign citizens who wish to establish tech startups, manufacturing units, or consulting entities in India without prior ancestral ties.",
    covers: [
      "Press Note 3 (2020) geopolitical security compliance and screening",
      "Appointment of Indian Resident Director to satisfy Section 149(3) Companies Act",
      "Drafting Founders' Agreement and Shareholders' Agreement (SHA) under Indian jurisdiction",
      "Intellectual Property (IP) assignment and cross-border licensing agreements",
      "Employment visa documentation and expatriate compensation structuring"
    ],
    requirements: [
      "Apostilled passport copy and home country residential proof",
      "Declaration of beneficial ownership and non-land-border country origins",
      "Commercial plan summary and business bank verification",
      "Selection of registered corporate address in India"
    ],
    femaFdiRoute: "Subject to sectoral caps and FDI Master Directions issued by the Reserve Bank of India"
  },
  {
    id: "india-corporate-enquiry",
    title: "India-Related Corporate Enquiry",
    targetProfile: "Overseas law firms, in-house counsel, and institutional investors with matters in India.",
    overview: "Providing local Indian counsel support for foreign legal teams requiring statutory diligence, legal opinions on Indian law, contract enforcement, or debt recovery proceedings.",
    covers: [
      "Formal legal opinion on Companies Act 2013 and FEMA compliance",
      "Corporate due diligence of Indian acquisition targets and joint-venture partners",
      "Enforceability analysis of foreign arbitral awards and foreign court judgments",
      "Representation before statutory regulators (RBI, SEBI, ED, MCA)",
      "Liaison with local chartered accountants, transfer agents, and custodian banks"
    ],
    requirements: [
      "Statement of legal issue or target company Corporate Identification Number (CIN)",
      "Relevant draft contracts or dispute notices",
      "Identification of specific Indian jurisdiction (Delhi, Mumbai, Bengaluru, etc.)"
    ],
    femaFdiRoute: "Institutional Legal Advisory & Local Counsel Retainers"
  },
  {
    id: "cross-border-compliance",
    title: "Cross-Border Compliance Enquiry",
    targetProfile: "Companies already operating cross-border structures between India and foreign hubs.",
    overview: "Remediating statutory compliance lapses, compounding RBI contraventions, transfer pricing documentation, and annual FLA (Foreign Liabilities and Assets) returns.",
    covers: [
      "Filing Annual Return on Foreign Liabilities and Assets (FLA Return) with RBI by July 15",
      "Compounding of FEMA contraventions (delays in reporting FDI or issuing share certificates)",
      "Transfer Pricing documentation under Section 92D of the Income Tax Act",
      "Withholding tax (TDS) certification under Section 195 / Form 15CA/15CB for foreign remittances",
      "Restructuring holding company chains across Singapore, Delaware, Dubai, and GIFT City"
    ],
    requirements: [
      "Audited balance sheet reflecting foreign equity investment and foreign currency loans",
      "Copies of previous FC-GPR / FCGPR acknowledgment letters",
      "List of cross-border related party transactions"
    ],
    femaFdiRoute: "RBI Compounding Guidelines & Central Board of Direct Taxes (CBDT) Transfer Pricing"
  }
];
