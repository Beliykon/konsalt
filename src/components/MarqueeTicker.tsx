import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Zap, Award, Clock } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: '+400% выручки без роста рекламы', icon: TrendingUp, color: 'text-emerald-600' },
    { text: 'Строгий NDA до передачи доступов', icon: ShieldCheck, color: 'text-blue-600' },
    { text: 'Окупаемость с первых 1–2 сохранённых сделок', icon: Sparkles, color: 'text-amber-600' },
    { text: '2 руководителя по цене трети штатного РОПа', icon: Award, color: 'text-purple-600' },
    { text: 'Ответ клиенту за 2 минуты по скрипту', icon: Clock, color: 'text-cyan-600' },
    { text: 'Фиксация цены в договоре без доплат', icon: Zap, color: 'text-rose-600' }
  ];

  return (
    <div className="relative w-full overflow-hidden py-3.5 bg-white/90 border-y border-slate-200">
      
      {/* Left and Right blur gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex w-max animate-marquee space-x-8 select-none">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span className="text-slate-800">{item.text}</span>
              <span className="text-slate-300 mx-2" aria-hidden="true">·</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
