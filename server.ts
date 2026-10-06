import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize GoogleGenAI with proper User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const ALLOWED_DOMAINS = [
  "Company Formation & Corporate Compliance",
  "GST & Financial Compliance",
  "Corporate Advisory",
  "Contract & Commercial Matters",
  "IBC / Insolvency",
  "NCLT / NCLAT",
  "RERA / SARFAESI",
  "Cheque Dishonour",
  "Family & Matrimonial",
  "Service Matters",
  "Intellectual Property",
  "MSME",
  "PMLA",
  "Immigration / NRI / FEMA",
  "Regulatory & Statutory Compliance",
  "General Legal Information"
] as const;

const ADVISORY_SYSTEM_INSTRUCTION = `You are the Advisory Intelligence Engine for "The Legal Guardian", an elite legal research and strategic analysis system specializing in Indian law, corporate governance, and regulatory frameworks.

CRITICAL INSTRUCTIONS:
1. INTENT CLASSIFICATION FIRST:
You must strictly classify the user's query into exactly ONE of the following 16 matter categories:
1. Company Formation & Corporate Compliance
2. GST & Financial Compliance
3. Corporate Advisory
4. Contract & Commercial Matters
5. IBC / Insolvency
6. NCLT / NCLAT
7. RERA / SARFAESI
8. Cheque Dishonour
9. Family & Matrimonial
10. Service Matters
11. Intellectual Property
12. MSME
13. PMLA
14. Immigration / NRI / FEMA
15. Regulatory & Statutory Compliance
16. General Legal Information

2. STRICT CONTEXT ISOLATION & ZERO CROSS-CONTAMINATION:
- You must ground your answer EXCLUSIVELY in the classified domain.
- A query about Company Formation & Corporate Compliance (e.g. Private Limited incorporation, SPICe+, DIN, MoA/AoA, statutory auditors) MUST NEVER contain references, citations, or concepts regarding PMLA, Directorate of Enforcement (ED), Section 50, Article 226, provisional attachment, or criminal summons unless the user's query explicitly and deliberately asks about anti-money laundering.
- A query about Cheque Dishonour must strictly focus on Section 138-142 of the Negotiable Instruments Act 1881 and magistrate trials, not corporate insolvency or PMLA.
- A query about IBC must strictly focus on the Insolvency and Bankruptcy Code 2016 (CIRP, Section 7/9/10, default thresholds, NCLT), not other unrelated fields.
- A query about NRI property sale must strictly focus on FEMA 1999, RBI remittance guidelines, and Form 15CA/15CB.

3. LEGAL RIGOR & PROHIBITION OF FABRICATION:
- You are an informational legal-research assistant, not a lawyer offering formal advocacy.
- Cite specific statutory sections, rules, or circulars ONLY when you are reasonably confident they exist and apply in current Indian law.
- NEVER invent, hallucinate, or extrapolate non-existent sections, rules, forms, statutory deadlines, or judicial precedents.
- If a statutory detail, filing form, or numerical threshold is subject to frequent change or uncertainty, explicitly state that it requires statutory verification against current gazette notifications rather than guessing.
- Clearly distinguish established statutory provisions from general procedural advice.

4. RESPONSE STRUCTURE:
Provide a structured JSON output with:
- domain: The exact classified category name from the 16 allowed categories.
- directAnswer: Clear, direct, authoritative legal answer answering the user's question concisely.
- relevantLaw: Applicable statutes, sections, and authorities ONLY where confident (e.g. "Companies Act, 2013 (Sections 3, 7, 10A) · SPICe+ MCA System"). If uncertain, state "Requires statutory verification against current notifications".
- nextSteps: Practical, actionable procedural next steps under Indian legal process.
- caveat: Important verification note recommending cross-checking with official portals (e.g., MCA, RBI, CBIC) and clarifying this is informational guidance.
- confidence: "High" if standard settled statutory framework, "Moderate" if procedural interpretation, or "Requires Statutory Verification" if notification-dependent.`;

// Advisory AI Endpoint
app.post('/api/advisory', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'GEMINI_API_KEY is not configured in the server environment.' 
      });
    }

    // Primary model is gemini-3.8-flash; fallback to gemini-3.1-flash-lite if temporary 503/high-demand occurs
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let responseText: string | null = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              {
                role: 'user',
                parts: [{ text: `User Legal / Corporate Inquiry:\n"${query.trim()}"` }]
              }
            ],
            config: {
              systemInstruction: ADVISORY_SYSTEM_INSTRUCTION,
              temperature: 0.1, // Low temperature for factual precision
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  domain: {
                    type: Type.STRING,
                    description: 'One of the 16 exact matter categories',
                  },
                  directAnswer: {
                    type: Type.STRING,
                    description: 'Direct authoritative answer strictly confined to the classified domain',
                  },
                  relevantLaw: {
                    type: Type.STRING,
                    description: 'Applicable Act, Section, and Authority only when confident, or requirement for statutory verification',
                  },
                  nextSteps: {
                    type: Type.STRING,
                    description: 'Practical procedural next steps under Indian legal process',
                  },
                  caveat: {
                    type: Type.STRING,
                    description: 'Important caveat and verification note against current official sources',
                  },
                  confidence: {
                    type: Type.STRING,
                    description: 'High, Moderate, or Requires Statutory Verification',
                  }
                },
                required: ['domain', 'directAnswer', 'relevantLaw', 'nextSteps', 'caveat', 'confidence']
              }
            }
          });

          if (response.text) {
            responseText = response.text;
            break;
          }
        } catch (err: any) {
          lastError = err;
          const msg = String(err.message || '');
          if (msg.includes('503') || msg.includes('429') || msg.includes('UNAVAILABLE')) {
            await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
            continue;
          }
          break;
        }
      }
      if (responseText) break;
    }

    if (!responseText) {
      throw lastError || new Error('Empty response received from Gemini model');
    }

    const parsed = JSON.parse(responseText);

    // Validate domain
    let domain = parsed.domain;
    if (!ALLOWED_DOMAINS.includes(domain)) {
      // Find closest or fallback to General Legal Information
      const matched = ALLOWED_DOMAINS.find(d => d.toLowerCase() === (domain || '').toLowerCase());
      domain = matched || 'General Legal Information';
    }

    return res.json({
      domain,
      directAnswer: parsed.directAnswer,
      relevantLaw: parsed.relevantLaw,
      nextSteps: parsed.nextSteps,
      caveat: parsed.caveat,
      confidence: parsed.confidence || 'High'
    });
  } catch (err: any) {
    console.error('Error in /api/advisory:', err);
    return res.status(500).json({ 
      error: err.message || 'Failed to process inquiry via Gemini API' 
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
