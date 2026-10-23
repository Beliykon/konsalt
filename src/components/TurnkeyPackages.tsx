import React from 'react';
import { TURNKEY_PACKAGES, TurnkeyPackage } from '../data/priceData';
import { Check, ShieldCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface TurnkeyPackagesProps {
  onSelectPackage: (pkg: TurnkeyPackage) => void;
  onOpenBookingForPackage: (pkg: TurnkeyPackage) => void;
}

export const TurnkeyPackages: React.FC<TurnkeyPackagesProps> = ({
  onSelectPackage,
  onOpenBookingForPackage
}) => {
  return (
    <section id="packages" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Готовые комплекты</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Решения под ключ
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Если задач несколько и они связаны между собой — выгоднее брать готовый комплект. Состав гибкий: любую услугу можно заменить на другую из «Шведского стола».
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TURNKEY_PACKAGES.map((pkg) => {
            const colorTheme = 
              pkg.id === 'diagnostics' 
                ? { border: 'border-cyan-500/40 hover:border-cyan-400', badge: 'text-cyan-400 bg-cyan-500/10', check: 'text-cyan-400', glow: 'hover:shadow-cyan-500/10' }
                : pkg.id === 'sales-system'
                ? { border: 'border-amber-400/80 shadow-amber-500/15', badge: 'text-amber-400 bg-amber-500/10', check: 'text-amber-400', glow: 'shadow-lg' }
                : pkg.id === 'turnkey-hiring'
                ? { border: 'border-purple-500/40 hover:border-purple-400', badge: 'text-purple-400 bg-purple-500/10', check: 'text-purple-400', glow: 'hover:shadow-purple-500/10' }
                : { border: 'border-emerald-500/40 hover:border-emerald-400', badge: 'text-emerald-400 bg-emerald-500/10', check: 'text-emerald-400', glow: 'hover:shadow-emerald-500/10' };

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  pkg.isPopular
                    ? `bg-slate-900/90 border-2 ${colorTheme.border} ${colorTheme.glow} relative`
                    : `bg-slate-950/80 border ${colorTheme.border} ${colorTheme.glow}`
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider py-0.5 px-3 rounded-full shadow-md animate-pulse">
                    Хит внедрения
                  </div>
                )}

                <div>
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${colorTheme.badge}`}>
                      {pkg.discountBadge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5">
                    {pkg.title}
                  </h3>
                  
                  <div className="text-xs font-medium text-amber-400/90 mb-4 line-clamp-2">
                    {pkg.subtitle}
                  </div>

                  {/* Price Block */}
                  <div className="pb-5 mb-5 border-b border-slate-800">
                    <div className="text-xs text-slate-400 line-through mb-0.5">
                      По прайсу: {pkg.originalPriceText}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                      {pkg.priceText}
                    </div>
                  </div>

                  {/* Services Included */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Входит в комплект:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {pkg.includedServices.map((svc, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                  <button
                    onClick={() => onOpenBookingForPackage(pkg)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Заказать этот пакет</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    Настроить в калькуляторе
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Box: What's included in all packages */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Стандарт безопасности и качества</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
            В каждый пакет входит то, чего нет при сборке услуг вручную:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-bold text-white mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                Итоговый отчёт
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Пошаговый план конкретных действий команды на 30 дней вперед с контрольными точками.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-bold text-white mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                Чат-поддержка 14 дней
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Отвечаем на любые вопросы по внедрению и оперативно корректируем материалы после финальной сессии.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-bold text-white mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                Твердая цена в договоре
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Стоимость фиксируется после согласования состава. Никаких внезапных доплат по ходу работы.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
