import { useState } from 'react';
import { Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { HeroSection } from './components/sections/HeroSection';
import { ChatInterface } from './components/chat/ChatInterface';
import { DynamicRenderer } from './components/visualization/DynamicRenderer';

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
    <div className="min-h-screen bg-gov-bg text-gov-navy flex flex-col">
      {/* Header */}
      <header className="py-3 px-6 flex justify-between items-center bg-white border-b border-gov-light-gray shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={goHome}>
          <div className="w-10 h-10 rounded-full bg-gov-blue flex items-center justify-center font-bold text-white shadow-sm">★</div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-gov-navy leading-none">ElectVoice</span>
            <span className="text-xs text-gov-gray font-medium tracking-wide uppercase">{t.nav.subtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gov-light-gray rounded text-sm font-bold text-gov-blue hover:bg-gov-bg transition-colors"
            >
              <Globe size={14} />
              {LANGS.find(l => l.code === lang)?.label}
              <span className="text-gov-gray text-xs">▾</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gov-light-gray rounded shadow-lg z-50 min-w-[140px] overflow-hidden">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                      lang === l.code ? 'bg-gov-blue text-white' : 'text-gov-navy hover:bg-gov-bg'
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
      <main className="flex-1 flex flex-col overflow-hidden">
        {!journeyStarted ? (
          <HeroSection onStart={() => setJourneyStarted(true)} />
        ) : (
          <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 overflow-hidden flex flex-col lg:flex-row gap-6">
            <div className="lg:w-[40%] h-[70vh] lg:h-full">
              <ChatInterface 
                onActionTriggered={(r) => setCurrentResponse(r)} 
                onClose={() => setJourneyStarted(false)}
              />
            </div>
            <div className="lg:w-[60%] h-[50vh] lg:h-full">
              <DynamicRenderer responseData={currentResponse} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gov-navy text-white py-6 px-8 mt-auto flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">ElectVoice</span>
            <span className="text-white/40 text-[10px] uppercase tracking-widest border border-white/10 rounded px-1">Official ECI Guide</span>
          </div>
          <div className="text-xs text-white/50 text-center md:text-right">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
