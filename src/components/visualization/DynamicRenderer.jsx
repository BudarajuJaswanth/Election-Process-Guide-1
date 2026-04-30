// DynamicRenderer.jsx
import { MapPin, Calendar, CheckSquare } from 'lucide-react';
import { SceneManager } from '../3d/SceneManager';
import { EVMScene } from '../3d/EVMScene';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function DynamicRenderer({ responseData }) {
  const { t } = useLanguage();
  const viz = t.viz || { awaiting: 'Awaiting...', interact: 'Interact with chat', ready: 'Ready', locationDetails: 'Location', openInMaps: 'Open Maps', electionCalendar: 'Calendar' };

  if (!responseData) {
    return <EVMScene />;
  }

  const { ui_action, payload } = responseData;

  switch (ui_action) {
    case '3d_scene':
      return <SceneManager sceneConfig={payload} />;

    case 'checklist':
      return (
        <div className="gov-card p-8 h-full flex flex-col border-t-8 border-t-gov-blue bg-white/80 backdrop-blur-md">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gov-navy uppercase tracking-tight">
            <CheckSquare className="text-gov-blue w-8 h-8" />
            {payload.title}
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-3 custom-scrollbar">
            {payload.steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={step.id}
                className="flex items-center gap-5 p-5 rounded-2xl bg-gov-bg border-2 border-gov-light-gray hover:border-gov-blue hover:bg-white transition-all shadow-sm hover:shadow-md cursor-default"
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  step.status === 'completed' ? 'bg-gov-blue border-gov-blue scale-110' : 'border-gov-gray bg-white'
                }`}>
                  {step.status === 'completed' && <span className="text-white text-sm font-black">✓</span>}
                </div>
                <span className={`text-lg font-bold ${step.status === 'completed' ? 'text-gov-navy' : 'text-gov-gray'}`}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'map':
      return (
        <div className="gov-card p-8 h-full flex flex-col border-t-8 border-t-gov-red bg-white/80 backdrop-blur-md">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-gov-navy uppercase tracking-tight">
            <MapPin className="text-gov-red w-8 h-8" />
            {viz.locationDetails}
          </h3>
          <div className="flex-1 bg-slate-100 rounded-3xl border-2 border-gov-light-gray flex items-center justify-center relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.2090,28.6139,12/600x400?access_token=REDACTED_FOR_SECURITY')] bg-cover bg-center opacity-40 grayscale group-hover:opacity-60 transition-opacity" />
            <div className="z-10 text-center p-8 bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-2xl scale-110">
              <MapPin className="w-12 h-12 text-gov-red mx-auto mb-4 animate-bounce" />
              <p className="font-black text-xl text-gov-navy">{payload.query}</p>
              <button className="mt-6 px-8 py-3 bg-gov-navy text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-gov-red hover:scale-105 transition-all shadow-lg active:scale-95">
                {viz.openInMaps}
              </button>
            </div>
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="gov-card p-8 h-full flex flex-col border-t-8 border-t-gov-navy bg-white/80 backdrop-blur-md">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gov-navy uppercase tracking-tight">
            <Calendar className="text-gov-navy w-8 h-8" />
            {viz.electionCalendar}
          </h3>
          <div className="space-y-8 flex-1 overflow-y-auto pr-3 relative custom-scrollbar">
            <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-gov-light-gray rounded-full" />
            {payload.events.map((event, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="relative pl-16 group"
              >
                <div className={`absolute left-0 top-1 w-12 h-12 -ml-[1px] rounded-2xl flex items-center justify-center ${
                  event.type === 'election_day' ? 'bg-gov-red shadow-gov-red/30' : 'bg-gov-navy shadow-gov-navy/30'
                } border-4 border-white shadow-xl group-hover:scale-110 transition-transform z-10`}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-5 rounded-3xl border-2 border-gov-light-gray group-hover:border-gov-navy transition-all shadow-sm group-hover:shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-gov-blue font-black uppercase tracking-[0.2em]">{event.date}</div>
                    <a 
                      href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.label)}&dates=${event.date.replace(/-/g, '')}/${event.date.replace(/-/g, '')}&details=${encodeURIComponent(event.description)}&sf=true&output=xml`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gov-bg rounded-xl text-gov-navy hover:bg-gov-blue hover:text-white transition-all shadow-sm"
                      title="Add to Google Calendar"
                      aria-label={`Add ${event.label} to Google Calendar`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h4 className="font-black text-xl text-gov-navy leading-tight">{event.label}</h4>
                  <p className="text-gov-gray text-sm mt-2 leading-relaxed font-medium">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'plain':
    default:
      return <EVMScene />;
  }
}
