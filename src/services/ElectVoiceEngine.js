import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const ElectVoiceEngine = {
  processInput: async (input, messageHistory = [], lang = 'en') => {
    const text = input.toLowerCase();

    // 1. Keyword Overrides (Instant Local Logic)
    // These ensure complex UI components are triggered reliably
    if (text.match(/eligibility|eligible|paatrata|patrata|पात्रता/)) {
      return getLocalResponse('eligibility', lang);
    }
    if (text.match(/first.?time|new voter|pehli baar|pahli baar|पहली बार|नया मतदाता/)) {
      return getLocalResponse('firstTime', lang);
    }
    if (text.match(/timeline|calendar|when|election date|चुनाव कब/)) {
      return getLocalResponse('timeline', lang);
    }
    if (text.match(/polling|booth|where.*vote|मतदान केंद्र/)) {
      return getLocalResponse('polling', lang);
    }
    if (text.match(/postal|absentee|डाक/)) {
      return getLocalResponse('postal', lang);
    }

    // 2. Gemini API Call
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-pro",
          systemInstruction: `You are the ElectVoice Agent, a high-intelligence system designed to fetch and deliver authoritative election data for the ECI.

OPERATING PROTOCOL:
- You act as a professional data agent.
- Fetch and deliver precise answers regarding eligibility, voting steps, and timelines.
- Your intelligence level is maximized (Pro-tier).
- Use deep reasoning to ensure zero hallucinations.
- Deliver information directly and clearly.

OFFICIAL GROUND TRUTH:
1. ELIGIBILITY: Indian Citizen, 18+ on Jan 1/Apr 1/Jul 1/Oct 1, ordinary resident.
2. PROCESS: Form 6 (Registration), Form 7 (Deletion), Form 8 (Correction).
3. HELPLINE: 1950.
4. PORTALS: https://voters.eci.gov.in, https://eci.gov.in.

CRITICAL RULES:
- Respond strictly in ${lang}.
- Respond ONLY in valid JSON.
- Cite official URLs in "source".

JSON STRUCTURE:
{
  "text": "Fetched answer in ${lang}",
  "audio_hint": "Summary",
  "ui_action": "plain" | "checklist" | "map" | "timeline" | "3d_scene",
  "payload": {},
  "source": "Official URL"
}`
        });

        // Slice history to exclude the current message which is passed separately to sendMessage
        // Keep last 20 messages for deep context (supports 10+ turns)
        const history = messageHistory.slice(-20, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(input);
        const responseText = result.response.text();
        
        try {
          // Robust JSON Extraction
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          const cleanedJson = jsonMatch ? jsonMatch[0] : responseText;
          return JSON.parse(cleanedJson);
        } catch (e) {
          console.warn("JSON Parse Failed, falling back to plain text", e);
          return {
            text: responseText,
            ui_action: "plain",
            payload: {},
            next_prompts: ["How to register?", "When is the election?", "Find my booth"],
            source: "https://eci.gov.in",
            audio_hint: responseText
          };
        }
      } catch (error) {
        console.error("Gemini API Error:", error);
      }
    }

    // 3. Fallback to Local Logic
    return getLocalResponse('fallback', lang, messageHistory);
  }
};

function getLocalResponse(key, lang, history = []) {
  const responses = {
    en: {
      eligibility: { text: "To vote in India, you must be: 1. An Indian Citizen. 2. At least 18 years old on the qualifying date. 3. An ordinary resident in the constituency. 4. Not disqualified due to unsound mind or corrupt practices.", ui_action: "checklist", payload: { title: "Voter Eligibility Criteria", steps: [{ id: "citizen", label: "Indian Citizenship", status: "completed" }, { id: "age", label: "18+ Years Old", status: "completed" }, { id: "residency", label: "Ordinary Resident", status: "completed" }] }, source: "https://eci.gov.in" },
      firstTime: { text: "Welcome! Let's get you started as a first-time voter. You'll need to check eligibility, register on NVSP, get your EPIC card, and find your polling booth.", ui_action: "checklist", payload: { title: "First-Time Voter Checklist", steps: [{ id: "age", label: "Check Eligibility (18+ years)", status: "pending" }, { id: "register", label: "Register on NVSP (Form 6)", status: "pending" }, { id: "epic", label: "Apply for EPIC / Voter ID", status: "pending" }, { id: "booth", label: "Find Your Polling Booth", status: "pending" }] }, source: "https://eci.gov.in" },
      polling: { text: "Find your polling booth using the Voter Helpline App, voterportal.eci.gov.in, or by calling 1950.", ui_action: "map", payload: { query: "Polling booth near me", zoom: 14 }, source: "https://voterportal.eci.gov.in" },
      timeline: { text: "Here is the official election calendar.", ui_action: "timeline", payload: { events: [{ date: "2025-10-30", label: "Election Day", type: "election_day", description: "Polls open 7 AM – 6 PM." }] }, source: "https://eci.gov.in/elections" },
      fallbacks: ["I can help with registration, eligibility, and polling booths. What would you like to know?", "Ask me about Form 6, Voter ID, or how to check your name in the list."]
    },
    hi: {
      eligibility: { text: "भारत में मतदान के लिए: 1. भारतीय नागरिक होना चाहिए। 2. आयु 18 वर्ष या उससे अधिक होनी चाहिए। 3. आप अपने निर्वाचन क्षेत्र के सामान्य निवासी होने चाहिए।", ui_action: "checklist", payload: { title: "मतदाता पात्रता मानदंड", steps: [{ id: "citizen", label: "भारतीय नागरिकता", status: "completed" }, { id: "age", label: "18+ वर्ष की आयु", status: "completed" }] }, source: "https://eci.gov.in" },
      firstTime: { text: "स्वागत है! पहली बार मतदान के लिए पात्रता जाँचें, NVSP पर Form 6 भरें, EPIC कार्ड प्राप्त करें।", ui_action: "checklist", payload: { title: "नए मतदाता पंजीकरण की प्रक्रिया", steps: [{ id: "age", label: "आयु जाँचें (18+ वर्ष)", status: "pending" }, { id: "register", label: "Form 6 भरें", status: "pending" }] }, source: "https://eci.gov.in" },
      fallbacks: ["मैं रजिस्ट्रेशन, पात्रता और मतदान केंद्रों में आपकी मदद कर सकता हूँ।"]
    },
    ta: { fallbacks: ["நான் ElectVoice — இந்திய தேர்தல் ஆணையத்தின் AI வழிகாட்டி."], suggestions: ["பதிவு செய்வது எப்படி?", "தேர்தல் எப்போது?", "வாக்குச்சாவடி"] },
    bn: { fallbacks: ["আমি ElectVoice — ভারত নির্বাচন কমিশনের AI গাইড।"], suggestions: ["নিবন্ধন কিভাবে করব?", "নির্বাচন কখন?", "ভোটকেন্দ্র"] },
    mr: { fallbacks: ["मी ElectVoice — भारत निवडणूक आयोगाचा AI मार्गदर्शक आहे."], suggestions: ["नोंदणी कशी करायची?", "निवडणूक कधी आहे?", "मतदान केंद्र"] },
    te: { fallbacks: ["నేను ElectVoice — భారత ఎన్నికల కమిషన్ యొక్క AI మార్గదర్శిని."], suggestions: ["నమోదు ఎలా చేయాలి?", "ఎన్నికలు ఎప్పుడు?", "పోలింగ్ బూత్"] }
  };

  const r = responses[lang] || responses.en;
  const def = responses.en;

  if (key === 'fallback') {
    const userCount = history.filter(m => m.role === 'user').length;
    const fallbacks = r.fallbacks || def.fallbacks;
    const suggestions = r.suggestions || ["Register to vote", "Check status", "ECI Helpline"];
    const fb = fallbacks[userCount % fallbacks.length];
    return { text: fb, ui_action: "plain", payload: {}, next_prompts: suggestions, source: null, audio_hint: fb };
  }
  
  const res = r[key] || def[key];
  return { ...res, audio_hint: res.text };
}

