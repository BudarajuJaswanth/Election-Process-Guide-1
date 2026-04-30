// VoterResources.jsx — India specific
import { motion } from 'framer-motion';
import { FileText, MapPin, Clock, Shield, Book, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const resources = []; // Now using translations.js

export function VoterResources() {
  const { t } = useLanguage();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="border-b-4 border-gov-blue pb-4 mb-10">
          <h1 className="text-3xl font-extrabold text-gov-navy">{t.resources.title}</h1>
          <p className="text-gov-gray mt-2 font-medium">{t.resources.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.resources.items.map((res, i) => {
            const Icon = [FileText, MapPin, Clock, Shield, Book, Download][i] || FileText;
            return (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-gov-light-gray rounded shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gov-bg border border-gov-light-gray flex items-center justify-center">
                    <Icon size={20} className="text-gov-blue" />
                  </div>
                  <h2 className="font-bold text-base text-gov-navy leading-snug">{res.title}</h2>
                </div>
                <p className="text-gov-gray text-sm leading-relaxed">{res.desc}</p>
                <ul className="mt-auto space-y-2">
                  {res.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gov-blue text-sm font-bold hover:underline flex items-center gap-1">
                        → {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 bg-gov-blue text-white rounded p-6 flex flex-col sm:flex-row items-center gap-4">
          <Shield size={32} className="flex-shrink-0" />
          <div>
            <p className="text-sm opacity-90">{t.resources.helpBanner}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
