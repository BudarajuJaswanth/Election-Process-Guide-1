import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight, Info, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FAQS = [
  { 
    cat: "Eligibility",
    items: [
      { q: "Who is eligible to vote in India?", a: "Any Indian citizen aged 18 or older on the qualifying date (Jan 1, Apr 1, Jul 1, Oct 1) who is an ordinary resident of the constituency and not otherwise disqualified." },
      { q: "Can I vote if I don't have an EPIC card?", a: "Yes, you can vote using other official ID documents like Aadhaar, PAN, or Passport, provided your name is in the Electoral Roll." }
    ]
  },
  {
    cat: "Registration",
    items: [
      { q: "How do I register to vote?", a: "You can register online via voters.eci.gov.in using Form 6, or through the Voter Helpline App." },
      { q: "What is Form 8 used for?", a: "Form 8 is used for correction of entries, shifting of residence, and replacement of EPIC card." }
    ]
  },
  {
    cat: "Polling",
    items: [
      { q: "How do I find my polling booth?", a: "Visit the ECI portal and search with your EPIC number, or use the 'Know Your Polling Station' feature on the Voter Helpline App." },
      { q: "What are the polling hours?", a: "Standard polling hours are usually 7:00 AM to 6:00 PM, though they may vary in specific regions." }
    ]
  }
];

export function FAQPage({ onBack }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-2xl bg-white border-2 border-gov-light-gray flex items-center justify-center hover:bg-gov-bg transition-all shadow-sm active:scale-90"
            >
              <ChevronRight className="rotate-180 w-6 h-6 text-gov-navy" />
            </button>
            <div>
              <h1 className="text-4xl font-black text-gov-navy tracking-tighter">Election FAQ</h1>
              <p className="text-gov-gray font-bold text-sm uppercase tracking-widest mt-1 opacity-60">Authorized Knowledge Base</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gov-blue/10 rounded-full border border-gov-blue/20">
            <ShieldCheck className="text-gov-blue w-4 h-4" />
            <span className="text-[10px] font-black text-gov-blue uppercase tracking-widest">Verified by ECI</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {FAQS.map((cat, i) => (
              <section key={i}>
                <h2 className="text-xl font-black text-gov-navy uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-gov-blue rounded-full" />
                  {cat.cat}
                </h2>
                <div className="space-y-4">
                  {cat.items.map((item, j) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.1 }}
                      key={j} 
                      className="bg-white rounded-3xl p-8 border border-gov-light-gray shadow-sm hover:shadow-xl hover:border-gov-blue/20 transition-all group"
                    >
                      <h3 className="text-lg font-black text-gov-navy mb-4 flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-gov-blue shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        {item.q}
                      </h3>
                      <p className="text-gov-gray font-medium leading-relaxed pl-8 border-l-2 border-gov-bg">
                        {item.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gov-navy rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <Info className="w-10 h-10 mb-6 text-gov-blue" />
                <h3 className="text-2xl font-black tracking-tight mb-4 leading-tight">Need More Help?</h3>
                <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">
                  Our official Voter Helpline is available 24/7 to assist you with complex queries.
                </p>
                <div className="space-y-3">
                  <a href="tel:1950" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white hover:text-gov-navy transition-all group">
                    <span className="font-black text-sm">Call 1950</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="https://voters.eci.gov.in" target="_blank" rel="noopener" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white hover:text-gov-navy transition-all group">
                    <span className="font-black text-sm text-left">voters.eci.gov.in</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
