// ContactOffice.jsx — India specific (ECI)
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const offices = [
  {
    name: 'ECI Voter Helpline',
    phone: '1950 (निःशुल्क)',
    email: 'complaints@eci.gov.in',
    hours: 'सोम–शनि, सुबह 8 बजे से रात 10 बजे',
    note: 'मतदाता पंजीकरण, EPIC, मतदान केंद्र सहित सभी सामान्य प्रश्नों के लिए।'
  },
  {
    name: 'निर्वाचन शिकायत हेल्पलाइन',
    phone: '1800-111-1950',
    email: 'shikayat@eci.gov.in',
    hours: 'सोम–शनि, सुबह 9 बजे से शाम 5 बजे',
    note: 'चुनाव आचार संहिता उल्लंघन और चुनावी गड़बड़ी की शिकायत के लिए।'
  },
  {
    name: 'विकलांग मतदाता सहायता',
    phone: '1800-111-0007',
    email: 'pwd@eci.gov.in',
    hours: 'सोम–शनि, सुबह 9 बजे से शाम 5 बजे',
    note: 'दिव्यांग और बुज़ुर्ग मतदाताओं के लिए विशेष सहायता, व्हीलचेयर और ब्रेल EVM।'
  },
];

const regionalOffices = [
  { region: 'भारत निर्वाचन आयोग मुख्यालय', address: 'निर्वाचन सदन, अशोक रोड, नई दिल्ली — 110001', phone: '011-23052205' },
  { region: 'उत्तर प्रदेश CEO कार्यालय', address: '15, एमजी मार्ग, लखनऊ — 226001', phone: '0522-2238144' },
  { region: 'महाराष्ट्र CEO कार्यालय', address: 'एनेक्स बिल्डिंग, मंत्रालय, मुंबई — 400032', phone: '022-22794150' },
  { region: 'तमिलनाडु CEO कार्यालय', address: 'फोर्ट सेंट जॉर्ज, चेन्नई — 600009', phone: '044-25672421' },
  { region: 'पश्चिम बंगाल CEO कार्यालय', address: '11, एसएन बनर्जी रोड, कोलकाता — 700001', phone: '033-22143500' },
  { region: 'गुजरात CEO कार्यालय', address: 'पुराना सचिवालय, गांधीनगर — 382010', phone: '079-23254040' },
];

export function ContactOffice() {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="border-b-4 border-gov-blue pb-4 mb-10">
          <h1 className="text-3xl font-extrabold text-gov-navy">{t.contact.title}</h1>
          <p className="text-gov-gray mt-2 font-medium">{t.contact.subtitle}</p>
        </div>

        <h2 className="text-lg font-extrabold text-gov-navy mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gov-red rounded-full inline-block"></span>
          {t.contact.nationalLines}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {offices.map((office, i) => (
            <motion.div key={office.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-gov-light-gray rounded shadow-sm p-5 flex flex-col gap-3">
              <h3 className="font-bold text-gov-navy text-base leading-snug border-b border-gov-light-gray pb-3">{office.name}</h3>
              <div className="space-y-2 text-sm text-gov-gray">
                <div className="flex items-start gap-2">
                  <Phone size={14} className="text-gov-blue mt-0.5 flex-shrink-0" />
                  <a href={`tel:${office.phone}`} className="text-gov-blue font-bold hover:underline">{office.phone}</a>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={14} className="text-gov-blue mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${office.email}`} className="text-gov-blue font-bold hover:underline">{office.email}</a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-gov-gray mt-0.5 flex-shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>
              <p className="text-xs text-gov-gray border-t border-gov-light-gray pt-3 mt-auto">{office.note}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-lg font-extrabold text-gov-navy mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gov-red rounded-full inline-block"></span>
          {t.contact.sendMessage}
        </h2>
        <div className="bg-white border border-gov-light-gray rounded shadow-sm p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gov-navy uppercase tracking-wide mb-1">{t.contact.form.first}</label>
              <input type="text" className="w-full border border-gov-light-gray rounded px-3 py-2 text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gov-navy uppercase tracking-wide mb-1">{t.contact.form.last}</label>
              <input type="text" className="w-full border border-gov-light-gray rounded px-3 py-2 text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gov-navy uppercase tracking-wide mb-1">{t.contact.form.email}</label>
              <input type="email" className="w-full border border-gov-light-gray rounded px-3 py-2 text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gov-navy uppercase tracking-wide mb-1">{t.contact.form.state}</label>
              <select className="w-full border border-gov-light-gray rounded px-3 py-2 text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm bg-white">
                <option>Select State...</option>
                <option>Uttar Pradesh</option><option>Maharashtra</option><option>West Bengal</option>
                <option>Tamil Nadu</option><option>Gujarat</option><option>Rajasthan</option>
                <option>Madhya Pradesh</option><option>Bihar</option><option>Delhi</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gov-navy uppercase tracking-wide mb-1">{t.contact.form.subject}</label>
              <select className="w-full border border-gov-light-gray rounded px-3 py-2 text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm bg-white">
                {(t.contact.form.subjects || []).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gov-navy uppercase tracking-wide mb-1">{t.contact.form.msg}</label>
              <textarea rows={4} className="w-full border border-gov-light-gray rounded px-3 py-2 text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-blue text-sm resize-none" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button className="px-6 py-2.5 bg-gov-blue text-white rounded font-bold text-sm hover:bg-gov-navy transition-colors">
              {t.contact.submit}
            </button>
            <p className="text-xs text-gov-gray">{t.contact.responseTime}</p>
          </div>
        </div>

        <h2 className="text-lg font-extrabold text-gov-navy mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gov-red rounded-full inline-block"></span>
          {t.contact.regionalOffices}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {regionalOffices.map((office, i) => (
            <motion.div key={office.region} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white border border-gov-light-gray rounded p-4 flex gap-3 shadow-sm">
              <MapPin size={18} className="text-gov-red mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gov-navy text-sm">{office.region}</h3>
                <p className="text-gov-gray text-xs mt-1">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-gov-blue text-xs font-bold hover:underline mt-1 inline-block">{office.phone}</a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gov-bg border border-gov-light-gray rounded p-6 flex flex-col sm:flex-row items-center gap-4">
          <Globe size={28} className="text-gov-blue flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gov-navy">{t.contact.onlineNote}</h3>
            <p className="text-gov-gray text-sm mt-1">{t.contact.onlineDesc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
