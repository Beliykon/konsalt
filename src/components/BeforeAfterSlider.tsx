import React, { useState } from 'react';
import { Sliders, XCircle, CheckCircle2, ArrowLeftRight, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="py-20 border-b border-slate-200/80 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Интерактивное сравнение</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Потяните слайдер: хаос против системы
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Двигайте ползунок влево-вправо, чтобы увидеть контраст между типичным отделом продаж и отделом после внедрения стандартов.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Slider input control */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-rose-600 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" /> До (Хаос)
              </span>
              <span className="text-emerald-700 flex items-center gap-1">
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
                className="w-full h-3 bg-gradient-to-r from-rose-200 via-slate-200 to-emerald-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            <div className="text-center text-[11px] font-medium text-slate-500 mt-2 flex items-center justify-center gap-1">
              <ArrowLeftRight className="w-3 h-3 text-amber-500" />
              <span>Перетаскивайте ползунок для изменения пропорции</span>
            </div>
          </div>

          {/* Dynamic 2-Col cards reacting to slider position */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chaos Card (Left) */}
            <div 
              className="p-6 rounded-2xl border transition-all duration-200"
              style={{
                opacity: Math.max(0.3, (100 - sliderPos) / 70),
                backgroundColor: sliderPos < 60 ? '#fff1f2' : '#ffffff',
                borderColor: sliderPos < 60 ? '#fda4af' : '#e2e8f0'
              }}
            >
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-4">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Типичный отдел без регламентов</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Конверсия в оплату:</div>
                  <div className="font-mono font-bold text-rose-700 text-lg">3% – 5%</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Скорость реакции:</div>
                  <div className="font-semibold text-slate-900">От 2 часов до суток, заявки остывают в CRM</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Разговор о цене:</div>
                  <div className="font-semibold text-slate-900">Менеджеры стесняются, спорят или сразу дают скидку</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Время собственника:</div>
                  <div className="font-semibold text-rose-700">15–20 часов в неделю на ручные разборы и конфликты</div>
                </div>
              </div>
            </div>

            {/* System Card (Right) */}
            <div 
              className="p-6 rounded-2xl border transition-all duration-200"
              style={{
                opacity: Math.max(0.3, sliderPos / 70),
                backgroundColor: sliderPos > 40 ? '#f0fdf4' : '#ffffff',
                borderColor: sliderPos > 40 ? '#86efac' : '#e2e8f0'
              }}
            >
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Система Кубышкина & Паринова</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Конверсия в оплату:</div>
                  <div className="font-mono font-bold text-emerald-700 text-lg">15% – 22%</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Скорость реакции:</div>
                  <div className="font-semibold text-slate-900">До 3 минут по скрипту первого контакта</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Разговор о цене:</div>
                  <div className="font-semibold text-slate-900">Аргументация ценности по Книге продаж без необоснованных скидок</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-medium">Время собственника:</div>
                  <div className="font-semibold text-emerald-700">1 час в неделю на контроль итоговой сводки выручки</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
