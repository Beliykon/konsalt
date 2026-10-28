import React from 'react';
import { TURNKEY_PACKAGES, TurnkeyPackage } from '../data/priceData';
import { Check, ShieldCheck, Sparkles, ArrowRight, Gift } from 'lucide-react';

interface TurnkeyPackagesProps {
  onSelectPackage: (pkg: TurnkeyPackage) => void;
  onOpenBookingForPackage: (pkg: TurnkeyPackage) => void;
}

export const TurnkeyPackages: React.FC<TurnkeyPackagesProps> = ({
  onSelectPackage,
  onOpenBookingForPackage
}) => {
  return (
    <section id="packages" className="py-20 border-b border-slate-200/80 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Готовые комплексные решения</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Пакеты услуг под ключ
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Если задач несколько и они связаны между собой — выгоднее брать готовый комплект. Состав гибкий: любую услугу можно заменить на другую из «Шведского стола».
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TURNKEY_PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-200 ${
                  pkg.isPopular
                    ? 'bg-white border-2 border-amber-400 shadow-xl shadow-amber-500/10 relative -translate-y-1'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                    Хит внедрения
                  </div>
                )}

                <div>
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {pkg.discountBadge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                    {pkg.title}
                  </h3>
                  
                  <div className="text-xs font-medium text-slate-600 mb-4 line-clamp-2">
                    {pkg.subtitle}
                  </div>

                  {/* Price Block */}
                  <div className="pb-5 mb-5 border-b border-slate-100">
                    <div className="text-xs text-slate-400 line-through mb-0.5">
                      По прайсу: {pkg.originalPriceText}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {pkg.priceText}
                    </div>
                  </div>

                  {/* Services Included */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Входит в комплект:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {pkg.includedServices.map((svc, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => onOpenBookingForPackage(pkg)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    <span>Заказать этот пакет</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1.5"
                  >
                    Настроить в калькуляторе
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Box: What's included in all packages */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Стандарт безопасности и качества</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            В каждый пакет входит то, чего нет при сборке услуг вручную:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Итоговый отчёт
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Пошаговый план конкретных действий команды на 30 дней вперед с контрольными точками.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Чат-поддержка 14 дней
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Отвечаем на любые вопросы по внедрению и оперативно корректируем материалы после финальной сессии.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Твердая цена в договоре
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Стоимость фиксируется после согласования состава. Никаких внезапных доплат по ходу работы.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
