import React, { useState } from 'react';
import { TrendingUp, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react';

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
    <section className="py-20 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-6">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Оцифровка потерь
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Сколько денег утекает из вашей воронки каждый месяц?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Большинство компаний тратят миллионы на рекламу, но теряют до 70% клиентов на этапе разговора, задержки с ответом в мессенджере или неумении назвать цену. Проверьте ваш бизнес на реальных цифрах:
            </p>

            <div className="space-y-6 bg-slate-950/70 border border-slate-800 p-6 rounded-2xl">
              
              {/* Slider 1: Leads */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
                  <span>Входящих обращений / заявок в месяц:</span>
                  <span className="font-mono text-base font-bold text-amber-400">{leadsPerMonth} заявок</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={leadsPerMonth}
                  onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>20</span>
                  <span>500</span>
                  <span>1000+</span>
                </div>
              </div>

              {/* Slider 2: Average check */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
                  <span>Средний чек одной сделки:</span>
                  <span className="font-mono text-base font-bold text-amber-400">{formatCurrency(avgDealValue)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>5 000 ₽</span>
                  <span>250 000 ₽</span>
                  <span>500 000 ₽+</span>
                </div>
              </div>

              {/* Slider 3: Current conversion */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-2">
                  <span>Примерная конверсия в оплату сейчас:</span>
                  <span className="font-mono text-base font-bold text-amber-400">{currentConversion}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={currentConversion}
                  onChange={(e) => setCurrentConversion(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>1%</span>
                  <span>15%</span>
                  <span>30%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Calculations Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
              
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Финансовый срез упущенной выгоды</span>
              </div>

              <div className="text-xl font-bold text-white mb-6">
                Что происходит с вашими деньгами прямо сейчас:
              </div>

              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-800 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 mb-1">Текущие продажи:</div>
                  <div className="text-lg font-bold text-white font-mono">
                    {currentDeals} сделок
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {formatCurrency(currentRevenue)} / мес
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <div className="text-rose-400 mb-1">Упущенная выручка в год:</div>
                  <div className="text-lg font-bold text-rose-400 font-mono">
                    {formatCurrency(annualLeakedRevenue)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    достаётся вашим конкурентам
                  </div>
                </div>
              </div>

              <div className="py-6 border-b border-slate-800 space-y-4">
                <div className="text-xs font-semibold text-slate-300">
                  Прирост при внедрении стандартов и скрипта:
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">Прирост конверсии всего на +3%</div>
                    <div className="text-[11px] text-slate-400">+{newDealsConservative - currentDeals} дополнительных сделок в месяц</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-emerald-400 font-mono">
                      +{formatCurrency(extraRevenueConservative)}
                    </div>
                    <div className="text-[10px] text-slate-400">к чистой выручке в месяц</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-amber-400/40">
                  <div>
                    <div className="text-xs font-bold text-amber-300">Прирост конверсии на +6% (стандарт РОПа)</div>
                    <div className="text-[11px] text-slate-400">+{newDealsRealistic - currentDeals} дополнительных сделок в месяц</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-amber-400 font-mono">
                      +{formatCurrency(extraRevenueRealistic)}
                    </div>
                    <div className="text-[10px] text-slate-400">к чистой выручке в месяц</div>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance */}
              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Любой наш пакет окупается <br />
                  <span className="text-white font-medium">с первых 1–2 сохранённых клиентов</span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <span>Найти утечки на встрече</span>
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
