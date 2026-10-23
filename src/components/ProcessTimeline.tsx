import React from 'react';
import { WORKFLOW_STEPS } from '../data/priceData';
import { ShieldCheck, CalendarCheck, Clock } from 'lucide-react';

interface ProcessTimelineProps {
  onOpenBooking: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenBooking }) => {
  return (
    <section id="process" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            Прозрачность и контроль
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Как строится работа с клиентом
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Пошаговый процесс от первого знакомства до стабильно работающей системы продаж. Никаких серых зон и скрытых условий.
          </p>
        </div>

        {/* 7 Steps Visual Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-12">
          {WORKFLOW_STEPS.map((stepItem, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-colors relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Шаг {stepItem.step}
                  </span>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{stepItem.duration}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {stepItem.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-slate-800 z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Legal & Pricing Guarantee Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                Юридическая чистота и NDA до старта работ
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                Мы подписываем NDA до предоставления доступов к телефонии, чатам и CRM. Точная стоимость услуг с диапазоном или пометкой «от» окончательно фиксируется в договоре без скрытых доплат.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Назначить встречу</span>
          </button>
        </div>

      </div>
    </section>
  );
};
