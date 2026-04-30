import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const ElectVoiceEngine = {
  processInput: async (input, messageHistory = [], lang = 'en') => {
    const text = input.toLowerCase();

    // 1. Keyword Overrides (Instant Local Logic)
    // These ensure complex UI components are triggered reliably
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
          model: "gemini-2.0-flash",
          systemInstruction: `You are ElectVoice, the official, expert AI assistant for the Election Commission of India (ECI). 

PRIMARY FOCUS:
- Your absolute priority is helping users understand Voter Eligibility, the Election Process, official Timelines, and Step-by-Step guidance.
- Do NOT hallucinate. If you are not 100% certain of a fact, refer the user to the ECI helpline 1950.

OFFICIAL GROUND TRUTH:
1. ELIGIBILITY: 
   - Must be an Indian Citizen.
   - Must be 18 years or older on the qualifying date (Jan 1, April 1, July 1, or Oct 1 of the year).
   - Must be an ordinary resident in the polling area.
   - Not disqualified due to unsound mind, crime, or corrupt practices.
2. PROCESS:
   - Registration (Form 6) -> EPIC Card -> Verification in Electoral Roll -> Polling Day -> Counting.
3. TIMELINES:
   - Registration is open year-round except during the period between the last date for filing nominations and the completion of elections.
4. PORTALS: https://voters.eci.gov.in (Services), https://eci.gov.in (Info).

CRITICAL RULES:
- Respond strictly in ${lang}.
- Use conversation history to provide contextual follow-ups.
- Respond ONLY in valid JSON.
- Cite the official source URL in the "source" field.

JSON STRUCTURE:
{
  "text": "Factual response in ${lang}",
  "audio_hint": "Summary",
  "ui_action": "plain" | "checklist" | "map" | "timeline" | "3d_scene",
  "payload": {},
  "next_prompts": ["Logical suggestion 1", "Logical suggestion 2", "Logical suggestion 3"],
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
      firstTime: { text: "Welcome! Let's get you started as a first-time voter. You'll need to check eligibility, register on NVSP, get your EPIC card, and find your polling booth.", ui_action: "checklist", payload: { title: "First-Time Voter Checklist", steps: [{ id: "age", label: "Check Eligibility (18+ years)", status: "pending" }, { id: "register", label: "Register on NVSP (Form 6)", status: "pending" }, { id: "epic", label: "Apply for EPIC / Voter ID", status: "pending" }, { id: "booth", label: "Find Your Polling Booth", status: "pending" }] }, next_prompts: ["How to register on NVSP?", "What is an EPIC card?"], source: "https://eci.gov.in" },
      polling: { text: "Find your polling booth using the Voter Helpline App, voterportal.eci.gov.in, or by calling 1950.", ui_action: "map", payload: { query: "Polling booth near me", zoom: 14 }, next_prompts: ["What ID to bring?", "Polling booth timings?"], source: "https://voterportal.eci.gov.in" },
      timeline: { text: "Here is the 2025-26 Indian election calendar.", ui_action: "timeline", payload: { events: [{ date: "2025-10-30", label: "Election Day", type: "election_day", description: "Polls open 7 AM – 6 PM." }] }, next_prompts: ["State election dates?"], source: "https://eci.gov.in/elections" },
      postal: { text: "Postal ballots are available to specific categories. Submit Form 12D.", ui_action: "3d_scene", payload: { scene: "ballot_box", camera: "orbit", annotation: "Indian Postal Ballot" }, next_prompts: ["How to fill Form 12D?"], source: "https://eci.gov.in" },
      fallbacks: ["I'm ElectVoice — ECI's official AI guide. Ask me about registration or EPIC cards.", "You can call ECI Helpline 1950."]
    },
    hi: {
      firstTime: { text: "स्वागत है! पहली बार मतदान के लिए पात्रता जाँचें, NVSP पर Form 6 भरें, EPIC कार्ड प्राप्त करें।", ui_action: "checklist", payload: { title: "नए मतदाता पंजीकरण की प्रक्रिया", steps: [{ id: "age", label: "आयु जाँचें (18+ वर्ष)", status: "pending" }, { id: "register", label: "Form 6 भरें", status: "pending" }] }, next_prompts: ["रजिस्ट्रेशन कैसे करें?", "EPIC कार्ड क्या है?"], source: "https://eci.gov.in" },
      timeline: { text: "2025-26 चुनाव कैलेंडर यहाँ है।", ui_action: "timeline", payload: { events: [{ date: "2025-10-30", label: "मतदान दिवस", type: "election_day", description: "सुबह 7 – शाम 6 बजे।" }] }, next_prompts: ["चुनाव तिथियाँ?"], source: "https://eci.gov.in/elections" },
      fallbacks: ["मैं ElectVoice हूँ — ECI का AI मार्गदर्शक। रजिस्ट्रेशन या EPIC कार्ड के बारे में पूछें।"]
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

