// App.jsx
import { useState } from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { HeroSection } from './components/sections/HeroSection';
import { ChatInterface } from './components/chat/ChatInterface';
import { DynamicRenderer } from './components/visualization/DynamicRenderer';
import { QuickFAQ } from './components/sections/QuickFAQ';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'te', label: 'తెలుగు' },
];

function AppContent() {
  const { lang, setLang, t } = useLanguage();
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [langOpen, setLangOpen] = useState(false);

  const goHome = () => {
    setJourneyStarted(false);
    setCurrentResponse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-gov-navy flex flex-col selection:bg-gov-blue selection:text-white">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-all active:scale-95" onClick={goHome}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gov-navy to-gov-blue flex items-center justify-center font-black text-white shadow-xl rotate-3">
            <span className="text-2xl">★</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-gov-navy leading-none">ElectVoice</span>
            <div className="flex items-center gap-1 mt-1">
              <ShieldCheck size={10} className="text-gov-blue" />
              <span className="text-[10px] text-gov-gray font-black tracking-widest uppercase opacity-60">Verified Guide</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gov-light-gray rounded-2xl text-sm font-black text-gov-navy hover:border-gov-blue hover:shadow-lg transition-all"
            >
              <Globe size={16} className="text-gov-blue" />
              {LANGS.find(l => l.code === lang)?.label}
              <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-xl border-2 border-gov-light-gray rounded-2xl shadow-2xl z-50 min-w-[180px] overflow-hidden p-1.5 animate-in fade-in slide-in-from-top-2">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm font-black rounded-xl transition-all ${
                      lang === l.code ? 'bg-gov-blue text-white shadow-lg' : 'text-gov-navy hover:bg-gov-bg'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {!journeyStarted ? (
          <HeroSection onStart={() => setJourneyStarted(true)} />
        ) : (
          <div className="flex-1 w-full max-w-[1600px] mx-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8">
            {/* Left: Chat & FAQ */}
            <div className="lg:w-[350px] xl:w-[450px] flex flex-col gap-8 flex-shrink-0">
              <div className="h-[600px] lg:h-[650px]">
                <ChatInterface 
                  onActionTriggered={(r) => setCurrentResponse(r)} 
                  onClose={() => setJourneyStarted(false)}
                />
              </div>
              <QuickFAQ />
            </div>

            {/* Right: Dynamic Viz */}
            <div className="flex-1 min-h-[600px] lg:min-h-0">
              <DynamicRenderer responseData={currentResponse} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gov-light-gray py-8 px-8 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-black text-xl tracking-tighter">ElectVoice</span>
            <span className="text-gov-gray/40 text-[10px] uppercase tracking-[0.3em] font-black">Official ECI Digital Partner</span>
          </div>
          <div className="text-[10px] text-gov-gray/50 font-black uppercase tracking-widest text-center md:text-right">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}

const ChevronDown = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
