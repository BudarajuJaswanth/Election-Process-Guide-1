import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MapPin, Calendar, FileText, ChevronLeft, CalendarClock, ExternalLink } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const getTimelineSteps = (profile) => {
  const baseSteps = [
    {
      id: 'reg',
      title: 'Voter Registration',
      icon: FileText,
      desc: 'Ensure you are registered to vote before the deadline.',
      action: 'Check Registration Status',
      details: 'You must register at least 15 days before the election. You will need a valid ID or Social Security Number.'
    },
    {
      id: 'dates',
      title: 'Important Dates',
      icon: CalendarClock,
      desc: 'Mark your calendar for early voting and election day.',
      action: 'Add to Google Calendar',
      details: 'Early voting starts Oct 20. Election Day is Nov 3. Polls are open from 7 AM to 8 PM.'
    },
    {
      id: 'location',
      title: 'Polling Location',
      icon: MapPin,
      desc: 'Find out exactly where you need to go.',
      action: 'Find on Maps',
      details: 'Your polling location is determined by your residential address. Bring an accepted form of ID if required by your state.'
    },
    {
      id: 'vote',
      title: 'Election Day',
      icon: CheckCircle2,
      desc: 'Cast your ballot.',
      action: 'View Sample Ballot',
      details: 'If you are in line before the polls close, you have the right to vote. Do not leave the line!'
    }
  ];

  if (profile === 'student') {
    baseSteps.splice(1, 0, {
      id: 'absentee',
      title: 'Absentee Ballot',
      icon: Calendar,
      desc: 'Request an absentee ballot if voting out of state.',
      action: 'Request Ballot',
      details: 'If you are registered at your home address but attending school elsewhere, request your ballot at least 30 days in advance.'
    });
  }

  return baseSteps;
};

export function ElectionTimeline({ profile, onBack }) {
  const steps = getTimelineSteps(profile);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto min-h-[80vh]">
      <button 
        onClick={onBack}
        className="flex items-center text-text-secondary hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Setup
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Your Election Journey</h2>
        <p className="text-text-secondary">Step-by-step guide tailored for you.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Timeline Navigation */}
        <div className="md:w-1/3 relative">
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-white/10" />
          <div className="space-y-2">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`relative w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                  activeStep === idx 
                    ? 'bg-white/10 shadow-lg' 
                    : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`relative z-10 w-4 h-4 rounded-full flex-shrink-0 transition-colors duration-300 ${
                  activeStep >= idx ? 'bg-electric-blue glow-box' : 'bg-text-secondary'
                }`} />
                <span className={`font-semibold ${activeStep === idx ? 'text-electric-blue' : 'text-white'}`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Details */}
        <div className="md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col p-8 border-t-2 border-t-electric-blue/50">
                <div className="flex items-center gap-4 mb-6">
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return <Icon className="w-10 h-10 text-electric-blue" />;
                  })()}
                  <h3 className="text-3xl font-bold">{steps[activeStep].title}</h3>
                </div>
                
                <p className="text-xl text-text-secondary mb-8">
                  {steps[activeStep].desc}
                </p>

                <div className="bg-dark-blue/50 rounded-xl p-6 mb-8 border border-white/5">
                  <h4 className="text-sm font-semibold text-deep-purple uppercase tracking-wider mb-2">Details</h4>
                  <p className="text-lg leading-relaxed">
                    {steps[activeStep].details}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <button className="flex items-center justify-center w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric-blue/50 transition-all group font-semibold text-lg">
                    {steps[activeStep].action}
                    <ExternalLink className="w-5 h-5 ml-2 text-text-secondary group-hover:text-electric-blue transition-colors" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
