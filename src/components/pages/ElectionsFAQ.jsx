// ElectionsFAQ.jsx — India specific
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const faqCategories = []; // Now using translations.js

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gov-light-gray rounded bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gov-bg transition-colors gap-4"
      >
        <span className="font-bold text-gov-navy">{q}</span>
        <ChevronDown size={18} className={`text-gov-blue flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-gov-gray leading-relaxed text-sm border-t border-gov-light-gray pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ElectionsFAQ() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="border-b-4 border-gov-blue pb-4 mb-10">
          <h1 className="text-3xl font-extrabold text-gov-navy">{t.faq.title}</h1>
          <p className="text-gov-gray mt-2 font-medium">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-10">
          {(t.faq.categories || []).map((cat, i) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <h2 className="text-lg font-extrabold text-gov-blue uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gov-red rounded-full inline-block"></span>
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gov-bg border border-gov-light-gray rounded p-6 text-center">
          <p className="text-gov-navy font-bold text-lg mb-1">{t.faq.stillHaveQ}</p>
          <p className="text-gov-gray text-sm">{t.faq.callUs}</p>
        </div>
      </motion.div>
    </div>
  );
}
