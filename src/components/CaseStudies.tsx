import React, { useState } from 'react';
import { BUSINESS_SEGMENTS } from '../data/priceData';
import { ArrowUpRight, BarChart3, CheckCircle, Clock, Target, Sparkles, ArrowRight } from 'lucide-react';

interface CaseStudiesProps {
  onOpenBooking: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentCase = BUSINESS_SEGMENTS[activeTab].caseStudy;
  const currentSegment = BUSINESS_SEGMENTS[activeTab];

  return (
    <section id="cases" className="py-20 border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Реальная практика и экономика</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Четыре ступени — четыре ситуации
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Показываем, как меняется конверсия, выручка и занятость собственника при системной настройке процессов.
            </p>
          </div>

          <div className="text-xs text-slate-500 max-w-xs font-medium">
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
                  ? 'bg-amber-50/50 border-2 border-amber-400 text-slate-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1 font-mono">
                <span className="text-amber-700 font-bold">Сценарий 0{seg.id}</span>
                <span className="text-[11px] text-slate-500 font-medium">{seg.title}</span>
              </div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1">
                {seg.caseStudy.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Case Deep Dive Card */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                {currentSegment.badge} · {currentCase.client}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentCase.title}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono">
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              <span>{currentCase.metrics.growth}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            
            {/* Story / Problem & Solution */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Что теряли до внедрения:
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentCase.challenge}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Что сделали:
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentCase.solution}
                </p>
              </div>

              <div className="bg-emerald-50/70 p-5 rounded-xl border border-emerald-200 shadow-2xs">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Что получилось:
                </div>
                <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                  {currentCase.result}
                </p>
              </div>

            </div>

            {/* Metrics Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 p-6 rounded-xl shadow-2xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  <span>Показатели в цифрах</span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 mb-0.5 font-medium">Исходная точка (До):</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-slate-700">
                      {currentCase.metrics.before}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 mb-0.5 font-medium">Результат (После):</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-slate-900">
                      {currentCase.metrics.after}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs text-emerald-700 font-bold mb-1">
                      Финансовый прирост:
                    </div>
                    <div className="text-xl font-mono font-extrabold text-emerald-800">
                      {currentCase.metrics.growth}
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">
                      Окупаемость инвестиций: {currentCase.metrics.roi}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <span>Обсудить похожий сценарий</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
