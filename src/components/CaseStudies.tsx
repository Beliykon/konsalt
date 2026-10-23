import React, { useState } from 'react';
import { BUSINESS_SEGMENTS } from '../data/priceData';
import { ArrowUpRight, BarChart3, CheckCircle, Clock, Target } from 'lucide-react';

interface CaseStudiesProps {
  onOpenBooking: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentCase = BUSINESS_SEGMENTS[activeTab].caseStudy;
  const currentSegment = BUSINESS_SEGMENTS[activeTab];

  return (
    <section id="cases" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Реальная практика и экономика
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Четыре ступени — четыре ситуации
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Показываем, как меняется конверсия, выручка и занятость собственника при системной настройке процессов.
            </p>
          </div>

          <div className="text-xs text-slate-500 max-w-xs">
            *Условные сценарии на базе реальных моделей внедрения. Прогноз для вашей компании рассчитывается на стартовой встрече по вашим метрикам.
          </div>
        </div>

        {/* Case Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-8">
          {BUSINESS_SEGMENTS.map((seg, idx) => (
            <button
              key={seg.id}
              onClick={() => setActiveTab(idx)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-slate-900 border-amber-400/80 text-white shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1 font-mono">
                <span className="text-amber-400 font-bold">Сценарий 0{seg.id}</span>
                <span className="text-[11px] text-slate-500">{seg.title}</span>
              </div>
              <div className="text-sm font-bold text-white line-clamp-1">
                {seg.caseStudy.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Case Deep Dive Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                {currentSegment.badge} · {currentCase.client}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentCase.title}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              <ArrowUpRight className="w-4 h-4" />
              <span>{currentCase.metrics.growth}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            
            {/* Story / Problem & Solution */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Что теряли до внедрения:
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  {currentCase.challenge}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Что сделали:
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  {currentCase.solution}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Что получилось:
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-emerald-500/20">
                  {currentCase.result}
                </p>
              </div>

            </div>

            {/* Metrics Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/90 border border-slate-800 p-6 rounded-xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-6">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Показатели в цифрах</span>
                </div>

                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-xs text-slate-400 mb-0.5">Исходная точка (До):</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-slate-300">
                      {currentCase.metrics.before}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-xs text-slate-400 mb-0.5">Результат (После):</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-amber-400">
                      {currentCase.metrics.after}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">
                      Окупаемость инвестиций (ROI):
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-300 font-medium leading-relaxed">
                      {currentCase.metrics.roi}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={onOpenBooking}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Разобрать вашу ситуацию</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
