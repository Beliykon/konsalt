import React from 'react';
import { FOUNDERS } from '../data/priceData';
import { Send, Users2, Shield, Target, Sparkles } from 'lucide-react';

interface FoundersSectionProps {
  onOpenBooking: () => void;
}

export const FoundersSection: React.FC<FoundersSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="founders" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Users2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Партнёры проекта</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Два руководителя. Один клиент. Два взгляда.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Почему связка из двух директоров эффективнее штатного РОПа? Стратегия без операционного контроля не работает, а контроль без методологии превращается в пустую рутину. Мы закрываем оба контура одновременно.
          </p>
        </div>

        {/* 2 Founders Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {FOUNDERS.map((founder, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                      {founder.name}
                    </h3>
                    <div className="text-xs font-bold text-amber-700">
                      {founder.role}
                    </div>
                  </div>

                  <a
                    href={founder.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-600" />
                    <span>{founder.telegram}</span>
                  </a>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  {founder.experience}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Фокус в проектах:
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {founder.focus}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Личное ведение встреч</span>
                <span className="text-emerald-700 font-bold">Без передачи стажёрам</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white border-2 border-amber-400/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
              Хотите познакомить нас с вашей компанией?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Напишите нам в Telegram. В первом сообщении достаточно 3 строк: чем занимается бизнес, сколько продавцов и что беспокоит сильнее всего.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://t.me/Beliykon1987"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-2xs active:scale-[0.99]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Написать Евгению</span>
            </a>
            <a
              href="https://t.me/beckham0503"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-amber-600" />
              <span>Написать Роману</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
