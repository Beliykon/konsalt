import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Zap, Award, Clock } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: '+400% выручки без роста рекламы', icon: TrendingUp, color: 'text-emerald-400' },
    { text: 'Строгий NDA до передачи доступов', icon: ShieldCheck, color: 'text-blue-400' },
    { text: 'Окупаемость с первых 1–2 сохранённых сделок', icon: Sparkles, color: 'text-amber-400' },
    { text: '2 руководителя по цене трети штатного РОПа', icon: Award, color: 'text-purple-400' },
    { text: 'Ответ клиенту за 2 минуты по скрипту', icon: Clock, color: 'text-cyan-400' },
    { text: 'Фиксация цены в договоре без доплат', icon: Zap, color: 'text-rose-400' }
  ];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-amber-950/30 border-y border-slate-800/80">
      
      {/* Left and Right blur gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#070c18] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#070c18] to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex w-max animate-marquee space-x-8 select-none">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-slate-200">{item.text}</span>
              <span className="text-slate-600 mx-2">·</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
