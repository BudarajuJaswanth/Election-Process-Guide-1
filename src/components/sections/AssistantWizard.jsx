import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, RefreshCw, ArrowRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlowingButton } from '../ui/GlowingButton';
import { ElectionTimeline } from './ElectionTimeline';

const profiles = [
  { id: 'first-time', label: 'First-time Voter', icon: User, desc: 'I need to know everything from registration to voting.' },
  { id: 'student', label: 'Student', icon: GraduationCap, desc: 'I need info on absentee ballots and out-of-state voting.' },
  { id: 'returning', label: 'Returning Voter', icon: RefreshCw, desc: 'I just need a quick refresher on dates and location.' },
];

export function AssistantWizard() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleProfileSelect = (id) => {
    setSelectedProfile(id);
  };

  const handleContinue = () => {
    if (selectedProfile) {
      setShowTimeline(true);
    }
  };

  if (showTimeline) {
    return <ElectionTimeline profile={selectedProfile} onBack={() => setShowTimeline(false)} />;
  }

  return (
    <section className="min-h-[60vh] py-12 px-4 max-w-4xl mx-auto" id="wizard">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Personalize Your Guide</h2>
        <p className="text-text-secondary text-lg">Which best describes you?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {profiles.map((profile, idx) => (
          <GlassCard 
            key={profile.id} 
            delay={idx * 0.1}
            onClick={() => handleProfileSelect(profile.id)}
            className={`cursor-pointer transition-all duration-300 ${
              selectedProfile === profile.id 
                ? 'border-electric-blue bg-electric-blue/10 glow-box' 
                : 'hover:border-white/30 hover:bg-white/5'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full ${selectedProfile === profile.id ? 'bg-electric-blue text-dark-blue' : 'bg-white/10 text-white'}`}>
                <profile.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold">{profile.label}</h3>
              <p className="text-sm text-text-secondary">{profile.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center"
          >
            <GlowingButton onClick={handleContinue} className="px-8">
              Generate My Timeline
              <ArrowRight className="w-5 h-5 ml-2" />
            </GlowingButton>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
