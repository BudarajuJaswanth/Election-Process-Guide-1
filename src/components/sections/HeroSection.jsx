import { motion } from 'framer-motion';
import { ChevronRight, Flag } from 'lucide-react';
import { GovButton } from '../ui/GovButton';
import { useLanguage } from '../../context/LanguageContext';

export function HeroSection({ onStart }) {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 overflow-hidden bg-white border-b border-gov-light-gray">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#565C65_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto space-y-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gov-bg border border-gov-light-gray text-sm font-bold text-gov-blue mb-4 shadow-sm">
          <Flag size={14} className="text-gov-red" />
          {t.hero.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gov-navy leading-tight">
          {t.hero.title} <br />
          <span className="text-gov-blue">{t.hero.titleHighlight}</span>
        </h1>

        <p className="text-lg md:text-xl text-gov-gray max-w-2xl mx-auto leading-relaxed font-medium">
          {t.hero.subtitle}
        </p>

        <div className="pt-8">
          <GovButton onClick={onStart} className="text-lg px-10 py-4 shadow-md">
            {t.hero.cta}
            <ChevronRight className="w-5 h-5 ml-2" />
          </GovButton>
        </div>
      </motion.div>
    </section>
  );
}
