import React, { useState } from 'react';
import { Language, ScheduledEvent } from '../types';
import { scheduledEvents } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, ChevronRight } from 'lucide-react';

interface ScheduleProps {
  currentLang: Language;
}

export default function Schedule({ currentLang }: ScheduleProps) {
  const [filter, setFilter] = useState<'all' | 'annual' | 'weekly'>('all');
  const events = scheduledEvents[currentLang];

  const filteredEvents = events.filter((ev) => {
    if (filter === 'all') return true;
    return ev.category === filter;
  });

  // Dynamically generate Google Calendar Link
  const getGoogleCalendarLink = (linkData: ScheduledEvent['calendarLink']) => {
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(linkData.title);
    const dates = encodeURIComponent(`${linkData.startDate}/${linkData.endDate}`);
    const details = encodeURIComponent(linkData.description);
    const location = encodeURIComponent(linkData.location);
    return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 sm:py-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1E3F20] font-bold">
            {currentLang === 'my' ? 'ရိပ်သာ၏နှစ်စဉ်နှင့် အပတ်စဉ်ကုသိုလ်ပွဲတော်များ' : currentLang === 'de' ? 'Aktivitäten & Feste' : 'Calendar of Events'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {currentLang === 'my' ? 'ယဉ်ကျေးမှုပွဲတော်များနှင့် တရားပွဲအချိန်ဇယား' : currentLang === 'de' ? 'Veranstaltungskalender & Zeremonien' : 'Ceremonies & Meditation Schedule'}
          </h2>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter categories tabs */}
        <div className="flex items-center justify-center space-x-2 mb-12">
          {(['all', 'annual', 'weekly'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                filter === cat
                  ? 'bg-[#1E3F20] text-white shadow-sm'
                  : 'bg-[#F4F1EA] text-[#334155] border border-[#E5E1D4] hover:bg-[#E5E1D4]'
              }`}
            >
              {cat === 'all' 
                ? (currentLang === 'my' ? 'အားလုံးပြရန်' : currentLang === 'de' ? 'Alle anzeigen' : 'Show All')
                : cat === 'annual'
                  ? (currentLang === 'my' ? 'နှစ်စဉ်ပွဲတော်များ' : currentLang === 'de' ? 'Jährliche Feste' : 'Annual Ceremonies')
                  : (currentLang === 'my' ? 'အပတ်စဉ်တရားပွဲများ' : currentLang === 'de' ? 'Wöchentlich' : 'Weekly Schedule')}
            </button>
          ))}
        </div>

        {/* Timeline / Event Cards list */}
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((ev, idx) => (
              <motion.div
                key={ev.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-6"
                id={`event-card-${ev.id}`}
              >
                
                {/* Event Core block */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded uppercase ${
                      ev.category === 'annual'
                        ? 'bg-[#D4AF37]/20 text-[#8A6D1C] border border-[#D4AF37]/25'
                        : 'bg-[#1E3F20]/15 text-[#1E3F20] border border-[#1E3F20]/20'
                    }`}>
                      {ev.category === 'annual' 
                        ? (currentLang === 'my' ? 'နန်းစဉ်ပွဲတော်' : currentLang === 'de' ? 'Großes Fest' : 'Annual Assembly')
                        : (currentLang === 'my' ? 'အပတ်စဉ်' : currentLang === 'de' ? 'Wochenkreis' : 'Weekly Gathering')}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-slate-800 leading-tight">
                    {ev.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#334155]/90 leading-relaxed max-w-2xl text-justify">
                    {ev.description}
                  </p>

                  {/* Scheduling and location indexes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs font-mono text-[#334155]/75 border-t border-[#E5E1D4]/45">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-[#1E3F20]" />
                      <span>{ev.dateStr}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-[#1E3F20]" />
                      <span>{ev.timeStr}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-[#1E3F20]" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>

                {/* Calendar action buttons */}
                <div className="w-full md:w-auto flex md:flex-col items-center justify-end gap-3 shrink-0">
                  <a
                    href={getGoogleCalendarLink(ev.calendarLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 w-full md:w-auto px-4 py-2.5 bg-white hover:bg-slate-50 border border-[#E5E1D4] text-[#1E3F20] font-bold text-xs rounded-md shadow-sm transition-colors text-center"
                    title="Add into Google calendar"
                  >
                    <CalendarPlus className="h-4 w-4 mr-1.5" />
                    <span>{currentLang === 'my' ? 'Google ပြက္ခဒိန်ထည့်ရန်' : currentLang === 'de' ? 'In Kalender eintragen' : 'Google Calendar'}</span>
                  </a>

                  {/* Zoom Classroom helper shortcut link if weekly meditation */}
                  {ev.category === 'weekly' && (
                    <button
                      className="flex items-center justify-center w-full md:w-auto px-4 py-2.5 bg-[#1E3F20] text-white hover:bg-emerald-800 font-bold text-xs rounded-md shadow-sm transition-colors text-center"
                      onClick={() => {
                        const courseBtn = document.getElementById('nav-courses');
                        if (courseBtn) courseBtn.click();
                      }}
                    >
                      <span>{currentLang === 'my' ? 'တိုက်ရိုက်လင့်ခ်' : currentLang === 'de' ? 'Zoom-Link' : 'Access Zoom Link'}</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </button>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
