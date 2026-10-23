import React, { useState } from 'react';
import { BUSINESS_SEGMENTS } from '../data/priceData';
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface SegmentSelectorProps {
  onSelectServiceOrPackage: (serviceIdOrPackageId: string) => void;
  onOpenBooking: () => void;
}

export const SegmentSelector: React.FC<SegmentSelectorProps> = ({
  onSelectServiceOrPackage,
  onOpenBooking
}) => {
  const [activeSegmentId, setActiveSegmentId] = useState<number>(1);
  const currentSegment = BUSINESS_SEGMENTS.find(s => s.id === activeSegmentId) || BUSINESS_SEGMENTS[0];

  const quickDecider = [
    { situation: 'Работаю один, не знаю, как продавать', solution: 'Разбор вдвоём', target: '01', type: 'service' },
    { situation: 'Продаю сам, появился первый помощник', solution: 'Диагностика под ключ', target: 'diagnostics', type: 'package' },
    { situation: 'Есть отдел, но он работает по-разному', solution: 'Отдел продаж под ключ', target: 'sales-system', type: 'package' },
    { situation: 'Руковожу отделом, не хватает времени и системы', solution: 'РОП-шеринг', target: 'rop-sharing', type: 'package' },
    { situation: 'Несколько команд, нужен независимый аудит', solution: 'Индивидуальный проект', target: 'booking', type: 'modal' }
  ];

  return (
    <section id="stages" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            Ступени бизнеса
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Для кого мы работаем
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            На каждой ступени продажи теряют деньги по-разному. Поэтому мы не продаём одно и то же решение всем подряд, а точно подбираем шаг под вашу ступень развития.
          </p>
        </div>

        {/* 4 Interactive Segment Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 mb-8">
          {BUSINESS_SEGMENTS.map((seg) => {
            const isActive = seg.id === activeSegmentId;
            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegmentId(seg.id)}
                className={`flex flex-col text-left p-3.5 sm:p-4 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-mono text-xs font-bold text-amber-400">0{seg.id}</span>
                  {isActive && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
                </div>
                <div className="text-sm sm:text-base font-bold text-white line-clamp-1">{seg.title}</div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">{seg.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Segment View Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Ступень {currentSegment.id}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentSegment.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                {currentSegment.audience}
              </p>
            </div>

            <div className="shrink-0 bg-slate-900 border border-slate-800 p-4 rounded-xl lg:max-w-xs">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                Рекомендуемый старт:
              </div>
              <div className="text-sm font-bold text-white mb-3">
                {currentSegment.recommendedStartingPoint}
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <span>Обсудить на разборе</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Pains / Losses */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">
                <AlertCircle className="w-4 h-4" />
                <span>Где вы теряете продажи и деньги</span>
              </div>
              <ul className="space-y-2.5">
                {currentSegment.pains.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80 mt-2 shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How We Help & What you get */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Чем поможем</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentSegment.howWeHelp}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Что вы получите в итоге
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-sm font-medium text-emerald-300">
                  {currentSegment.whatYouGet}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-2">Ключевые услуги для этой ступени:</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {currentSegment.servicesIncluded.map((s, idx) => (
                    <span key={idx} className="text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Decider Navigator (Table from PDF Page 3) */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Навигатор: как понять, с чего начать</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-6">
            Выберите вашу текущую ситуацию:
          </h3>

          <div className="grid grid-cols-1 divide-y divide-slate-800/80">
            {quickDecider.map((row, idx) => (
              <div 
                key={idx} 
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/50 px-2 rounded-lg transition-colors"
              >
                <div className="text-sm sm:text-base font-medium text-slate-200">
                  {row.situation}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                    {row.solution}
                  </span>
                  <button
                    onClick={() => {
                      if (row.type === 'modal') {
                        onOpenBooking();
                      } else {
                        onSelectServiceOrPackage(row.target);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Перейти</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
