import React, { useState } from 'react';
import { TrendingUp, DollarSign, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

interface RoiLeakCalculatorProps {
  onOpenBooking: () => void;
}

export const RoiLeakCalculator: React.FC<RoiLeakCalculatorProps> = ({ onOpenBooking }) => {
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(120);
  const [avgDealValue, setAvgDealValue] = useState<number>(45000);
  const [currentConversion, setCurrentConversion] = useState<number>(6); // 6%

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(num)) + ' ₽';
  };

  // Calculations
  const currentDeals = Math.round((leadsPerMonth * currentConversion) / 100);
  const currentRevenue = currentDeals * avgDealValue;

  // With a tuned script, CRM discipline, and prompt follow-ups, typical conversion grows by 3% to 6%
  const conservativeTargetConv = currentConversion + 3; // +3%
  const realisticTargetConv = currentConversion + 6;    // +6%

  const newDealsConservative = Math.round((leadsPerMonth * conservativeTargetConv) / 100);
  const newRevenueConservative = newDealsConservative * avgDealValue;
  const extraRevenueConservative = newRevenueConservative - currentRevenue;

  const newDealsRealistic = Math.round((leadsPerMonth * realisticTargetConv) / 100);
  const newRevenueRealistic = newDealsRealistic * avgDealValue;
  const extraRevenueRealistic = newRevenueRealistic - currentRevenue;

  const annualLeakedRevenue = extraRevenueConservative * 12;

  return (
    <section id="roi-calculator" className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Оцифровка потерь в воронке</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Сколько денег утекает из вашей воронки каждый месяц?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Большинство компаний тратят миллионы на рекламу, но теряют до 70% клиентов на этапе звонка, долгого ответа в мессенджере или неумении назвать цену. Проверьте ваш бизнес на реальных цифрах:
            </p>

            <div className="space-y-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              
              {/* Slider 1: Leads */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                  <span>Входящих обращений / заявок в месяц:</span>
                  <span className="font-mono text-base font-bold text-slate-900 bg-amber-100/80 px-2 py-0.5 rounded">{leadsPerMonth} заявок</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={leadsPerMonth}
                  onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>20</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>

              {/* Slider 2: Average check */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                  <span>Средний чек одной сделки:</span>
                  <span className="font-mono text-base font-bold text-slate-900 bg-amber-100/80 px-2 py-0.5 rounded">{formatCurrency(avgDealValue)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>5 000 ₽</span>
                  <span>250 000 ₽</span>
                  <span>500 000 ₽+</span>
                </div>
              </div>

              {/* Slider 3: Current conversion */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                  <span>Примерная конверсия в оплату сейчас:</span>
                  <span className="font-mono text-base font-bold text-slate-900 bg-amber-100/80 px-2 py-0.5 rounded">{currentConversion}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={currentConversion}
                  onChange={(e) => setCurrentConversion(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>1%</span>
                  <span>15%</span>
                  <span>30%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Calculations Card */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative shadow-lg">
              
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 w-fit">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Финансовый срез упущенной выгоды</span>
              </div>

              <div className="text-xl font-extrabold text-slate-900 mb-6">
                Что происходит с вашими деньгами прямо сейчас:
              </div>

              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500 mb-1 font-medium">Текущие продажи:</div>
                  <div className="text-lg font-bold text-slate-900 font-mono">
                    {currentDeals} сделок
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {formatCurrency(currentRevenue)} / мес
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="text-rose-700 mb-1 font-semibold">Упущенная выручка в год:</div>
                  <div className="text-lg font-extrabold text-rose-700 font-mono">
                    {formatCurrency(annualLeakedRevenue)}
                  </div>
                  <div className="text-[11px] text-rose-600 mt-0.5">
                    достаётся вашим конкурентам
                  </div>
                </div>
              </div>

              <div className="py-6 border-b border-slate-100 space-y-4">
                <div className="text-xs font-bold text-slate-900">
                  Потенциал роста выручки без увеличения бюджета на рекламу:
                </div>

                {/* Growth scenario 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                  <div>
                    <span className="font-bold text-emerald-950">Консервативный рост (+3%):</span>
                    <div className="text-[11px] text-emerald-700 mt-0.5">
                      Внедрение регламента первого звонка + дожим в WhatsApp
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-base font-extrabold text-emerald-800">
                      +{formatCurrency(extraRevenueConservative)}
                    </span>
                    <div className="text-[10px] text-emerald-600 font-semibold">в месяц</div>
                  </div>
                </div>

                {/* Growth scenario 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs">
                  <div>
                    <span className="font-bold text-amber-950">Системный рост (+6%):</span>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      Полная Книга продаж + РОП-контроль звонков
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-base font-extrabold text-amber-900">
                      +{formatCurrency(extraRevenueRealistic)}
                    </span>
                    <div className="text-[10px] text-amber-700 font-semibold">в месяц</div>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 text-center sm:text-left">
                  Узнайте, в каком звене воронки теряется больше всего средств на бесплатной диагностической встрече.
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer shrink-0"
                >
                  <span>Найти утечку на разборе</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
