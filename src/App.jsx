import { useState } from 'react';
import { Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { HeroSection } from './components/sections/HeroSection';
import { ChatInterface } from './components/chat/ChatInterface';
import { DynamicRenderer } from './components/visualization/DynamicRenderer';
import { VoterResources } from './components/pages/VoterResources';
import { ElectionsFAQ } from './components/pages/ElectionsFAQ';
import { ContactOffice } from './components/pages/ContactOffice';
import { translations } from './i18n/translations';

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
  const [page, setPage] = useState('home');
  const [langOpen, setLangOpen] = useState(false);

  const goHome = () => {
    setPage('home');
    setJourneyStarted(false);
    setCurrentResponse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinkClass = (p) =>
    `text-sm font-bold transition-colors pb-1 ${
      page === p
        ? 'text-gov-navy border-b-2 border-gov-red'
        : 'text-gov-blue hover:text-gov-navy hover:underline'
    }`;

  return (
    <div className="min-h-screen bg-gov-bg text-gov-navy flex flex-col">
      {/* Header */}
      <header className="py-3 px-6 flex justify-between items-center bg-white border-b border-gov-light-gray shadow-sm sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={goHome}>
          <div className="w-10 h-10 rounded-full bg-gov-blue flex items-center justify-center font-bold text-white shadow-sm">★</div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-gov-navy leading-none">ElectVoice</span>
            <span className="text-xs text-gov-gray font-medium tracking-wide uppercase">{t.nav.subtitle}</span>
          </div>
        </div>

        {/* Nav + Language switcher */}
        <div className="flex items-center gap-5">
          <nav className="hidden md:flex gap-5 items-center">
            <button onClick={() => setPage('resources')} className={navLinkClass('resources')}>{t.nav.voterResources}</button>
            <button onClick={() => setPage('faq')} className={navLinkClass('faq')}>{t.nav.electionsFaq}</button>
            <button onClick={() => setPage('contact')} className={navLinkClass('contact')}>{t.nav.contactOffice}</button>
          </nav>

          {/* Language Switcher */}
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
                      lang === l.code
                        ? 'bg-gov-blue text-white'
                        : 'text-gov-navy hover:bg-gov-bg'
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

      {/* Mobile nav */}
      <div className="md:hidden flex gap-4 px-6 py-2 bg-white border-b border-gov-light-gray text-sm">
        <button onClick={() => setPage('resources')} className={navLinkClass('resources')}>{t.nav.voterResources}</button>
        <button onClick={() => setPage('faq')} className={navLinkClass('faq')}>{t.nav.electionsFaq}</button>
        <button onClick={() => setPage('contact')} className={navLinkClass('contact')}>{t.nav.contactOffice}</button>
      </div>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {page === 'resources' && <VoterResources />}
        {page === 'faq' && <ElectionsFAQ />}
        {page === 'contact' && <ContactOffice />}

        {page === 'home' && (
          <>
            {!journeyStarted ? (
              <HeroSection onStart={() => {
                setJourneyStarted(true);
                setTimeout(() => document.getElementById('assistant-view')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} />
            ) : (
              <div id="assistant-view" className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[80vh] min-h-[700px]">
                  <div className="lg:col-span-5 h-full flex flex-col">
                    <ChatInterface 
                      onActionTriggered={(r) => setCurrentResponse(r)} 
                      onClose={() => setJourneyStarted(false)}
                    />
                  </div>
                  <div className="lg:col-span-7 h-full">
                    <DynamicRenderer responseData={currentResponse} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gov-navy text-white py-8 px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg">ElectVoice</span>
              <span className="text-white/50 text-xs uppercase tracking-wide border border-white/20 rounded-sm px-1">ECI</span>
            </div>
            <p className="text-white/60 text-xs max-w-xs">{t.footer.desc}</p>
          </div>
          <div className="flex gap-8 text-sm text-white/70">
            <div className="space-y-1">
              <p className="text-white font-bold text-xs uppercase tracking-wide mb-2">{t.footer.quickLinks}</p>
              <button onClick={() => setPage('resources')} className="block hover:text-white text-left">{t.nav.voterResources}</button>
              <button onClick={() => setPage('faq')} className="block hover:text-white text-left">{t.nav.electionsFaq}</button>
              <button onClick={() => setPage('contact')} className="block hover:text-white text-left">{t.nav.contactOffice}</button>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold text-xs uppercase tracking-wide mb-2">{t.footer.helpline}</p>
              <p>{t.footer.helplineNum}</p>
              <p>{t.footer.helplineHours}</p>
              <a href="mailto:complaints@eci.gov.in" className="hover:text-white block">complaints@eci.gov.in</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-white/10 text-xs text-white/40 text-center">
          {t.footer.copyright}
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
