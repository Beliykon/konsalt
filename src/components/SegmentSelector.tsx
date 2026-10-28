import React, { useState } from 'react';
import { BUSINESS_SEGMENTS } from '../data/priceData';
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

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
    <section id="stages" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ступени зрелости бизнеса</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Для кого мы работаем
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            На каждой ступени отдел продаж теряет деньги по-разному. Мы не продаём одно универсальное решение всем подряд, а подбираем точный шаг под текущий этап развития вашей компании.
          </p>
        </div>

        {/* 4 Interactive Segment Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-slate-200/70 rounded-2xl mb-8">
          {BUSINESS_SEGMENTS.map((seg) => {
            const isActive = seg.id === activeSegmentId;
            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegmentId(seg.id)}
                className={`flex flex-col text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-mono text-xs font-bold text-amber-700">0{seg.id}</span>
                  {isActive && <span className="w-2 h-2 bg-amber-500 rounded-full" />}
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1">{seg.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-medium">{seg.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Segment View Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                Ступень {currentSegment.id}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                {currentSegment.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {currentSegment.audience}
              </p>
            </div>

            <div className="shrink-0 bg-slate-50 border border-slate-200 p-4 rounded-xl lg:max-w-xs">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                Рекомендуемый старт:
              </div>
              <div className="text-sm font-bold text-slate-900 mb-3">
                {currentSegment.recommendedStartingPoint}
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-2xs active:scale-[0.99] cursor-pointer"
              >
                <span>Обсудить на разборе</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Pains / Losses */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-3">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Где вы теряете продажи и деньги</span>
              </div>
              <ul className="space-y-2.5">
                {currentSegment.pains.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How We Help & What you get */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Чем поможем</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentSegment.howWeHelp}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                  Что вы получите в итоге
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-950">
                  {currentSegment.whatYouGet}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">Ключевые услуги для этой ступени:</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {currentSegment.servicesIncluded.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Decider Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 mb-4">
            Не уверены, с чего начать? Экспресс-навигатор:
          </h4>
          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {quickDecider.map((row, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-slate-700 font-medium">{row.situation}</div>
                <button
                  onClick={() => {
                    if (row.type === 'modal') {
                      onOpenBooking();
                    } else {
                      onSelectServiceOrPackage(row.target);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <span>{row.solution}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
