// DynamicRenderer.jsx
import { MapPin, Calendar, CheckSquare } from 'lucide-react';
import { SceneManager } from '../3d/SceneManager';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function DynamicRenderer({ responseData }) {
  const { t } = useLanguage();
  const viz = t.viz || { awaiting: 'Awaiting...', interact: 'Interact with chat', ready: 'Ready', locationDetails: 'Location', openInMaps: 'Open Maps', electionCalendar: 'Calendar' };

  if (!responseData) {
    return (
      <div className="h-full flex items-center justify-center text-gov-gray">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gov-light-gray flex items-center justify-center border border-gov-gray/20">
            <span className="text-gov-navy text-2xl font-bold">★</span>
          </div>
          <p className="font-medium">{viz.awaiting}</p>
        </div>
      </div>
    );
  }

  const { ui_action, payload } = responseData;

  switch (ui_action) {
    case '3d_scene':
      return <SceneManager sceneConfig={payload} />;

    case 'checklist':
      return (
        <div className="gov-card p-6 h-full flex flex-col border-t-4 border-t-gov-blue">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gov-navy">
            <CheckSquare className="text-gov-blue" />
            {payload.title}
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {payload.steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={step.id}
                className="flex items-center gap-4 p-4 rounded bg-gov-bg border border-gov-light-gray hover:border-gov-blue transition-colors shadow-sm"
              >
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${step.status === 'completed' ? 'bg-gov-blue border-gov-blue' : 'border-gov-gray bg-white'}`}>
                  {step.status === 'completed' && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <span className="text-lg font-medium text-gov-navy">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'map':
      return (
        <div className="gov-card p-6 h-full flex flex-col border-t-4 border-t-gov-blue">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gov-navy">
            <MapPin className="text-gov-blue" />
            {viz.locationDetails}
          </h3>
          <div className="flex-1 bg-gov-bg rounded border border-gov-light-gray flex items-center justify-center relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=12&size=600x400&maptype=roadmap&style=feature:all|element:labels|visibility:off')] bg-cover bg-center opacity-50 mix-blend-multiply grayscale" />
            <div className="z-10 text-center p-6 bg-white border border-gov-light-gray rounded shadow-md">
              <MapPin className="w-8 h-8 text-gov-red mx-auto mb-2" />
              <p className="font-bold text-gov-navy">{payload.query}</p>
              <button className="mt-4 px-4 py-2 bg-gov-blue text-white rounded font-bold hover:bg-gov-navy transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gov-blue">
                {viz.openInMaps}
              </button>
            </div>
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="gov-card p-6 h-full flex flex-col border-t-4 border-t-gov-blue">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gov-navy">
            <Calendar className="text-gov-blue" />
            {viz.electionCalendar}
          </h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gov-light-gray" />
            {payload.events.map((event, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="relative pl-12"
              >
                <div className={`absolute left-0 top-1.5 w-10 h-10 -ml-[10px] rounded-full flex items-center justify-center ${event.type === 'election_day' ? 'bg-gov-red' : 'bg-gov-navy'} border-2 border-white shadow-sm`}>
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gov-bg p-4 rounded border border-gov-light-gray">
                  <div className="text-sm text-gov-blue font-bold mb-1 uppercase tracking-wide">{event.date}</div>
                  <h4 className="font-bold text-lg text-gov-navy">{event.label}</h4>
                  <p className="text-gov-gray text-sm mt-1">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'plain':
    default:
      return (
        <div className="h-full flex items-center justify-center">
          <div className="max-w-md text-center bg-white p-8 rounded border border-gov-light-gray shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-gov-light-gray rounded-full flex items-center justify-center text-gov-blue text-2xl font-bold">
              ★
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gov-navy">{viz.ready}</h3>
            <p className="text-gov-gray font-medium">{viz.interact}</p>
          </div>
        </div>
      );
  }
}
