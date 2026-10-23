import React, { useState } from 'react';
import { Sliders, XCircle, CheckCircle2, ArrowLeftRight, TrendingDown, TrendingUp } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Интерактивное сравнение</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Потяните слайдер: хаос против системы
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Двигайте ползунок влево-вправо, чтобы увидеть контраст между типичным отделом продаж и отделом после внедрения стандартов.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          {/* Slider input control */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-rose-400 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> До (Хаос)
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                После (Система) <TrendingUp className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gradient-to-r from-rose-900/60 via-slate-800 to-emerald-900/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
            <div className="text-center text-[11px] text-slate-500 mt-2 flex items-center justify-center gap-1">
              <ArrowLeftRight className="w-3 h-3 text-amber-400" />
              <span>Перетаскивайте ползунок для изменения пропорции</span>
            </div>
          </div>

          {/* Dynamic 2-Col cards reacting to slider position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chaos Card (Left) */}
            <div 
              className="p-6 rounded-2xl border transition-all duration-200"
              style={{
                opacity: Math.max(0.2, (100 - sliderPos) / 60),
                backgroundColor: sliderPos < 60 ? 'rgba(30, 15, 20, 0.7)' : 'rgba(15, 23, 42, 0.3)',
                borderColor: sliderPos < 60 ? 'rgba(244, 63, 94, 0.5)' : 'rgba(51, 65, 85, 0.4)'
              }}
            >
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-4">
                <XCircle className="w-5 h-5" />
                <span>Типичный отдел без регламентов</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Конверсия в оплату:</div>
                  <div className="font-mono font-bold text-rose-400 text-lg">3% – 5%</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Скорость реакции:</div>
                  <div className="font-semibold text-slate-200">От 2 часов до суток, заявки остывают в CRM</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Разговор о цене:</div>
                  <div className="font-semibold text-slate-200">Менеджеры стесняются, спорят или сразу дают скидку</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Время собственника:</div>
                  <div className="font-semibold text-rose-300">15–20 часов в неделю на ручные разборы и конфликты</div>
                </div>
              </div>
            </div>

            {/* System Card (Right) */}
            <div 
              className="p-6 rounded-2xl border transition-all duration-200"
              style={{
                opacity: Math.max(0.2, sliderPos / 60),
                backgroundColor: sliderPos > 40 ? 'rgba(6, 40, 30, 0.5)' : 'rgba(15, 23, 42, 0.3)',
                borderColor: sliderPos > 40 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(51, 65, 85, 0.4)'
              }}
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span>Система Кубышкина & Паринова</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Конверсия в оплату:</div>
                  <div className="font-mono font-bold text-emerald-400 text-lg">15% – 22%</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Скорость реакции:</div>
                  <div className="font-semibold text-white">До 3 минут по скрипту первого контакта</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Разговор о цене:</div>
                  <div className="font-semibold text-white">Аргументация ценности по Книге продаж без необоснованных скидок</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-500 text-[11px] mb-0.5">Время собственника:</div>
                  <div className="font-semibold text-emerald-300">1 час в неделю на контроль итоговой сводки выручки</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
