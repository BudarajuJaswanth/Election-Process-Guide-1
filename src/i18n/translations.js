// src/i18n/translations.js
export const translations = {
  en: {
    lang: 'English',
    nav: {
      voterResources: 'Voter Resources',
      electionsFaq: 'Elections FAQ',
      contactOffice: 'Contact Office',
      subtitle: 'Official Voter Guide'
    },
    hero: {
      badge: 'ECI — Official Election Guide 2025-26',
      title: 'Your Trusted',
      titleHighlight: 'Election Assistant',
      subtitle: 'From voter registration and EPIC cards to finding your polling booth and understanding EVM — we guide you at every step.',
      cta: 'Start Your Guide'
    },
    chat: {
      headerTitle: 'ElectVoice Assistant',
      status: 'Election Commission of India • Online',
      placeholder: 'Ask about registration, EPIC, polling booth...',
      listen: 'Listen',
      source: 'Source',
      welcome: "Hello! I'm ElectVoice — the official AI guide of the Election Commission of India. I can help with voter registration, EPIC cards, polling booths, and the election process.",
      quickReplies: ['I am a first-time voter', 'When is the election?', 'Where do I vote?'],
      back: 'Back to Home',
      clear: 'Clear Chat'
    },
    viz: {
      awaiting: 'Awaiting your input...',
      interact: 'Please interact using the chat to view official voting information and guidance.',
      ready: 'ElectVoice Ready',
      locationDetails: 'Location Details',
      openInMaps: 'Open in Maps',
      electionCalendar: 'Election Calendar'
    },
    resources: {
      title: 'Voter Resources',
      subtitle: 'Official guides and tools provided by the Election Commission of India (ECI).',
      helpBanner: 'Need personal assistance? Call ECI Voter Helpline: 1950 (Free, Mon–Sat, 8 AM–10 PM)',
      items: [
        { title: 'Voter Registration', desc: 'Register online via Form 6 on NVSP portal. You can also register offline through BLO.', links: ['Register on NVSP', 'Check Status', 'Update Address'] },
        { title: 'Find Polling Booth', desc: 'Find your nearest booth on Voter Helpline App or voterportal.eci.gov.in.', links: ['Locate Booth', 'Polling Hours', 'PWD Facilities'] },
        { title: 'Election Dates', desc: 'Check official dates for Lok Sabha, Vidhan Sabha and local body elections.', links: ['2025-26 Calendar', 'State-wise Dates', 'Model Code of Conduct'] },
        { title: 'EPIC / Voter ID', desc: 'Apply for new EPIC, download e-EPIC or make corrections.', links: ['Download e-EPIC', 'Corrections', 'New Application'] },
        { title: 'EVM & VVPAT Info', desc: 'Learn how Electronic Voting Machines and VVPAT work in India.', links: ['What is EVM?', 'VVPAT Details', 'Counting Process'] },
        { title: 'Downloads', desc: 'Official voter guides, manuals and multi-language materials.', links: ['Voter Guide (PDF)', 'Multi-lang Kit', 'First-time Voter Kit'] }
      ]
    },
    faq: {
      title: 'Elections FAQ',
      subtitle: 'Frequently asked questions about the Indian election process.',
      stillHaveQ: 'Still have questions?',
      callUs: 'Call ECI Voter Helpline: 1950 (Free) or ask our ElectVoice AI assistant.',
      categories: [
        {
          name: 'Voter Registration',
          items: [
            { q: 'How to check my name in the voter list?', a: 'Check on nvsp.in, Voter Helpline App, or SMS. Use your EPIC number or name and address.' },
            { q: 'What documents are needed for registration?', a: 'Age proof (Birth Cert, 10th Marksheet), Address proof (Passport, Bill), and a photo. Aadhaar is also accepted.' }
          ]
        },
        {
          name: 'EPIC Card',
          items: [
            { q: 'What is e-EPIC and how to download?', a: 'e-EPIC is a digital version of your voter ID. Download from NVSP portal after OTP verification.' }
          ]
        }
      ]
    },
    contact: {
      title: 'Contact Office',
      subtitle: 'Get in touch with the Election Commission of India voter assistance teams.',
      nationalLines: 'National Helpline Numbers',
      sendMessage: 'Send a Message',
      regionalOffices: 'State CEO Offices',
      submit: 'Submit Message',
      responseTime: 'We typically respond within 1–2 business days.',
      onlineNote: 'Find answers online',
      onlineDesc: 'Visit the official website eci.gov.in or use the ElectVoice AI Assistant for instant answers.',
      form: {
        first: 'First Name', last: 'Last Name', email: 'Email', state: 'State', subject: 'Subject', msg: 'Message',
        subjects: ['Voter Registration', 'EPIC Correction', 'Polling Booth Info', 'EVM/Counting', 'MCC Violation', 'PWD Support', 'Other']
      }
    },
    footer: {
      desc: 'Official voter information service of the Election Commission of India. All information is neutral and based on official sources.',
      quickLinks: 'Quick Links',
      helpline: 'ECI Helpline',
      helplineNum: '1950 (Free)',
      helplineHours: 'Mon–Sat, 8 AM–10 PM',
      copyright: '© 2026 ElectVoice — Election Commission of India. All information is non-partisan.'
    }
  },
  hi: {
    lang: 'हिन्दी',
    nav: {
      voterResources: 'मतदाता संसाधन',
      electionsFaq: 'चुनाव FAQ',
      contactOffice: 'संपर्क करें',
      subtitle: 'भारत निर्वाचन आयोग — ECI'
    },
    hero: {
      badge: 'ECI — आधिकारिक चुनाव गाइड 2025-26',
      title: 'आपका विश्वसनीय',
      titleHighlight: 'चुनाव सहायक',
      subtitle: 'मतदाता पंजीकरण, EPIC कार्ड, मतदान केंद्र खोजने से लेकर EVM प्रक्रिया तक — हम हर कदम पर मदद करेंगे।',
      cta: 'शुरू करें'
    },
    chat: {
      headerTitle: 'ElectVoice सहायक',
      status: 'भारत निर्वाचन आयोग • ऑनलाइन',
      placeholder: 'पूछें: पंजीकरण, EPIC कार्ड, मतदान केंद्र...',
      listen: 'सुनें',
      source: 'स्रोत',
      welcome: 'नमस्ते! मैं ElectVoice हूँ — भारत निर्वाचन आयोग का आधिकारिक AI मार्गदर्शक। मतदाता पंजीकरण, EPIC कार्ड, मतदान केंद्र, और चुनाव प्रक्रिया में मैं आपकी मदद कर सकता हूँ।',
      quickReplies: ['मैं पहली बार मतदाता हूँ', 'चुनाव कब है?', 'मतदान कहाँ करें?'],
      back: 'होम पर वापस',
      clear: 'चैट साफ़ करें'
    },
    viz: {
      awaiting: 'आपके इनपुट की प्रतीक्षा है...',
      interact: 'आधिकारिक मतदान जानकारी और मार्गदर्शन देखने के लिए कृपया चैट का उपयोग करें।',
      ready: 'ElectVoice तैयार है',
      locationDetails: 'स्थान का विवरण',
      openInMaps: 'मैप्स में खोलें',
      electionCalendar: 'चुनाव कैलेंडर'
    },
    resources: {
      title: 'मतदाता संसाधन',
      subtitle: 'भारत निर्वाचन आयोग (ECI) द्वारा प्रदत्त आधिकारिक मार्गदर्शिकाएँ।',
      helpBanner: 'सहायता चाहिए? ECI Voter Helpline: 1950 (निःशुल्क, सोम–शनि, सुबह 8 – रात 10)',
      items: [
        { title: 'मतदाता पंजीकरण', desc: 'NVSP पोर्टल पर Form 6 भरकर ऑनलाइन पंजीकरण करें। BLO के माध्यम से ऑफलाइन भी कर सकते हैं।', links: ['NVSP पर पंजीकरण', 'स्थिति जाँचें', 'पता बदलें'] },
        { title: 'मतदान केंद्र खोजें', desc: 'Voter Helpline App या voterportal.eci.gov.in पर अपना नज़दीकी केंद्र खोजें।', links: ['केंद्र खोजें', 'मतदान का समय', 'दिव्यांग सुविधा'] },
        { title: 'चुनाव तिथियाँ', desc: 'लोकसभा, विधानसभा और स्थानीय चुनावों की आधिकारिक तिथियाँ यहाँ देखें।', links: ['2025-26 कैलेंडर', 'राज्यवार तिथियाँ', 'आचार संहिता'] },
        { title: 'EPIC / वोटर ID', desc: 'नए कार्ड के लिए आवेदन करें, e-EPIC डाउनलोड करें या सुधार करें।', links: ['e-EPIC डाउनलोड', 'सुधार करें', 'नया आवेदन'] },
        { title: 'EVM और VVPAT', desc: 'जानें कि भारत में इलेक्ट्रॉनिक वोटिंग मशीन और VVPAT कैसे काम करते हैं।', links: ['EVM क्या है?', 'VVPAT विवरण', 'मतगणना प्रक्रिया'] },
        { title: 'डाउनलोड', desc: 'आधिकारिक मतदाता गाइड, नियमावली और बहुभाषी सामग्री यहाँ से प्राप्त करें।', links: ['मतदाता गाइड (PDF)', 'बहुभाषी सामग्री', 'मतदाता किट'] }
      ]
    },
    faq: {
      title: 'चुनाव संबंधी प्रश्न',
      subtitle: 'भारतीय चुनाव प्रक्रिया से जुड़े अक्सर पूछे जाने वाले प्रश्न।',
      stillHaveQ: 'और प्रश्न हैं?',
      callUs: 'ECI Helpline: 1950 (निःशुल्क) पर कॉल करें या हमारे AI सहायक से पूछें।',
      categories: [
        {
          name: 'मतदाता पंजीकरण',
          items: [
            { q: 'मतदाता सूची में अपना नाम कैसे देखें?', a: 'nvsp.in, Voter Helpline App या SMS से देखें। अपने EPIC नंबर या नाम-पते का उपयोग करें।' },
            { q: 'पंजीकरण के लिए कौन से दस्तावेज़ चाहिए?', a: 'आयु प्रमाण (जन्म प्रमाण पत्र), निवास प्रमाण (बिजली बिल, पासपोर्ट) और फोटो। आधार भी मान्य है।' }
          ]
        },
        {
          name: 'EPIC कार्ड',
          items: [
            { q: 'e-EPIC क्या है और कैसे डाउनलोड करें?', a: 'e-EPIC आपके वोटर ID का डिजिटल रूप है। NVSP पोर्टल से OTP सत्यापन के बाद डाउनलोड करें।' }
          ]
        }
      ]
    },
    contact: {
      title: 'संपर्क करें',
      subtitle: 'भारत निर्वाचन आयोग की मतदाता सहायता टीम से संपर्क करें।',
      nationalLines: 'राष्ट्रीय हेल्पलाइन नंबर',
      sendMessage: 'संदेश भेजें',
      regionalOffices: 'राज्यवार CEO कार्यालय',
      submit: 'संदेश भेजें',
      responseTime: 'हम 1–2 कार्य दिवसों में उत्तर देते हैं।',
      onlineNote: 'ऑनलाइन उत्तर खोजें',
      onlineDesc: 'eci.gov.in पर जाएं या हमारे ElectVoice AI सहायक से तुरंत जानकारी पाएं।',
      form: {
        first: 'पहला नाम', last: 'अंतिम नाम', email: 'ईमेल', state: 'राज्य', subject: 'विषय', msg: 'संदेश',
        subjects: ['मतदाता पंजीकरण', 'EPIC सुधार', 'मतदान केंद्र जानकारी', 'EVM/मतगणना', 'आचार संहिता', 'दिव्यांग सहायता', 'अन्य']
      }
    },
    footer: {
      desc: 'भारत निर्वाचन आयोग की आधिकारिक मतदाता सूचना सेवा। सभी जानकारी तटस्थ एवं आधिकारिक है।',
      quickLinks: 'त्वरित लिंक',
      helpline: 'ECI हेल्पलाइन',
      helplineNum: '1950 (निःशुल्क)',
      helplineHours: 'सोम–शनि, सुबह 8 – रात 10',
      copyright: '© 2026 ElectVoice — भारत निर्वाचन आयोग। सभी जानकारी गैर-पक्षपाती है।'
    }
  },
  ta: { lang: 'தமிழ்' /* Simplified for brevity, usually full content would go here */ },
  bn: { lang: 'বাংলা' },
  mr: { lang: 'मराठी' },
  te: { lang: 'తెలుగు' }
};
