import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  { q: 'What is the eligibility for voting in India?', a: 'You must be an Indian citizen, 18 years or older on the qualifying date, and an ordinary resident of your constituency.' },
  { q: 'How can I register as a new voter?', a: 'Use Form 6 on the official ECI Voters portal (voters.eci.gov.in) or the Voter Helpline App.' },
  { q: 'Can I vote if I am living abroad?', a: 'Yes, Indian citizens living abroad can register as Overseas Electors using Form 6A.' },
  { q: 'What is an EPIC card?', a: 'EPIC stands for Electors Photo Identity Card. It is your official voter ID issued by the ECI.' },
  { q: 'How do I find my polling booth?', a: 'You can find it on the Voter Helpline App or by visiting the ECI portal and entering your EPIC number.' }
];

export function QuickFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gov-navy flex items-center justify-center shadow-lg">
          <HelpCircle className="text-white w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-gov-navy uppercase tracking-tight">Election FAQ</h3>
          <p className="text-gov-gray text-xs font-bold uppercase tracking-widest opacity-60">Essential Knowledge</p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="group">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border-2 ${
                openIdx === idx 
                  ? 'bg-gov-navy border-gov-navy text-white' 
                  : 'bg-white/50 border-transparent hover:border-gov-navy/20 text-gov-navy'
              }`}
            >
              <span className="font-bold text-sm text-left leading-tight">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 text-sm font-medium leading-relaxed opacity-80">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
