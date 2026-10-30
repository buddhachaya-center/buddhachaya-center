'use client';

import React, { useState } from 'react';
import type { CourseDetail } from '@/content/types';
import { Locale } from '@/lib/i18n';
import { contentSuffix } from '@/lib/i18n';
import { courseTranslations } from '@/content/site';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Video, Calendar, Clock, Users, ChevronRight, X, Sparkles } from 'lucide-react';

interface CoursesProps {
  locale: Locale;
}

export default function Courses({ locale }: CoursesProps) {
  const contentLocale = contentSuffix[locale];
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const courses = courseTranslations[contentLocale];

  const courseIcons: Record<string, React.ReactNode> = {
    'course-abha': <GraduationCap className="h-6 w-6 text-[#1E3F20]" />,
    'course-visu': <BookOpen className="h-6 w-6 text-[#1E3F20]" />,
    'course-sutta': <Sparkles className="h-6 w-6 text-[#1E3F20]" />,
    'course-vinaya': <Users className="h-6 w-6 text-[#1E3F20]" />,
    'course-youth': <Users className="h-6 w-6 text-[#1E3F20]" />,
    'course-children': <GraduationCap className="h-6 w-6 text-[#1E3F20]" />
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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1E3F20] font-bold">
            {contentLocale === 'my' ? 'ဘာသာရပ်အလိုက် လေ့လာသင်တန်းများ' : contentLocale === 'de' ? 'Offene Studienprogramme' : 'Academic Study Programs'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E3F20] mt-2 leading-tight">
            {contentLocale === 'my' ? 'ဓမ္မသင်တန်းများနှင့် ကလေး/လူငယ်သင်တန်းများ' : contentLocale === 'de' ? 'Dhamma-Kurse & Jugendklassen' : 'Dhamma Courses & Youth Classes'}
          </h2>
          <div className="h-1 w-20 bg-[#1E3F20] mx-auto mt-4 rounded-full" />
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#F4F1EA] rounded-2xl border border-[#E5E1D4] p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group"
              onClick={() => setSelectedCourse(course)}
              id={`course-card-${course.id}`}
            >
              <div>
                {/* Course Header Icon */}
                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm border border-[#E5E1D4]/50 group-hover:scale-105 transition-transform">
                  {courseIcons[course.id] || <BookOpen className="h-6 w-6 text-[#1E3F20]" />}
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest text-[#334155]/60 uppercase">
                  {course.duration}
                </span>
                
                <h3 className="font-display font-extrabold text-xl text-slate-800 group-hover:text-[#1E3F20] transition-colors mt-2 mb-3 leading-snug">
                  {course.title}
                </h3>
                
                <p className="text-xs text-[#1E3F20]/90 font-semibold tracking-tight italic">
                  {course.subtitle}
                </p>
                
                <p className="text-sm text-[#334155]/85 mt-4 leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5E1D4]/50 flex items-center justify-between text-xs font-bold text-[#1E3F20]">
                <span className="truncate max-w-[190px]">{course.targetAudience}</span>
                <span className="flex items-center space-x-1 hover:underline shrink-0">
                  <span>{contentLocale === 'my' ? 'အသေးစိတ်ကြည့်ရန်' : contentLocale === 'de' ? 'Details ansehen' : 'View Schedule'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#FAF9F5] border border-[#E5E1D4] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F4F1EA] text-[#334155] hover:bg-[#1E3F20] hover:text-[#FAF9F5] transition-all"
                  title="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Course Header */}
                <div className="mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#1E3F20] uppercase bg-[#1E3F20]/10 px-3 py-1 rounded">
                    {selectedCourse.duration}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E3F20] leading-tight mt-4">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-base text-[#334155]/90 italic mt-1 font-medium">
                    {selectedCourse.subtitle}
                  </p>
                </div>

                <div className="border-t border-[#E5E1D4] py-6 space-y-6 text-[#334155]">
                  {/* General Description */}
                  <p className="text-base leading-relaxed text-justify">
                    {selectedCourse.description}
                  </p>

                  {/* Learning Objectives */}
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#1E3F20] mb-3 uppercase tracking-wider">
                      {selectedCourse.objectivesTitle}
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedCourse.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="h-5 w-5 rounded-full bg-[#1E3F20]/10 flex items-center justify-center shrink-0 mt-0.5 mr-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1E3F20]" />
                          </span>
                          <span className="leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Scheduling block */}
                  <div className="rounded-xl bg-[#F4F1EA] p-5 border border-[#E5E1D4]">
                    <h4 className="font-display font-bold text-sm text-[#1E3F20] mb-2 uppercase tracking-wide flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{selectedCourse.scheduleTitle}</span>
                    </h4>
                    <p className="text-sm leading-relaxed font-semibold">
                      {selectedCourse.scheduleDetails}
                    </p>
                    <p className="text-xs text-[#334155]/60 mt-1 font-mono">
                      Target Group: {selectedCourse.targetAudience}
                    </p>
                  </div>

                  {/* Zoom Classroom Integration if available */}
                  {selectedCourse.zoomLink && (
                    <div className="rounded-xl border border-dashed border-[#1E3F20] bg-white p-5">
                      <h4 className="font-display font-bold text-sm text-slate-800 mb-2 uppercase tracking-wide flex items-center">
                        <Video className="h-4.5 w-4.5 text-[#1E3F20] mr-2" />
                        <span>Online Classroom (Zoom)</span>
                      </h4>
                      <p className="text-xs text-[#334155]/75 leading-relaxed mb-3">
                        {selectedCourse.zoomInstructions || (contentLocale === 'my' 
                          ? 'သင်တန်းကို တိုက်ရိုက်ဝင်ရောက်ရန် အောက်ပါ ခလုတ်ကို နှိပ်ပါ။' 
                          : 'Click below to instantly access the live session inside your web browser.')}
                      </p>
                      
                      <a
                        href={selectedCourse.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-[#1E3F20] text-white font-bold text-xs px-5 py-2.5 hover:bg-emerald-800 transition-colors shadow-sm"
                      >
                        <Video className="h-3.5 w-3.5 mr-1.5" />
                        <span>{contentLocale === 'my' ? 'တိုက်ရိုက်အတန်းဝင်ရန် (Zoom)' : contentLocale === 'de' ? 'Raum beitreten (Zoom)' : 'Join Live Classroom'}</span>
                      </a>
                    </div>
                  )}

                </div>

                <div className="border-t border-[#E5E1D4] pt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-6 py-2.5 rounded-md bg-[#F4F1EA] hover:bg-[#E5E1D4] text-[#334155] font-semibold text-sm transition-colors"
                  >
                    {contentLocale === 'my' ? 'ပိတ်မည်' : contentLocale === 'de' ? 'Schließen' : 'Close Details'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
