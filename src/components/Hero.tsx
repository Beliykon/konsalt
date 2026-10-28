import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';
import { FOUNDERS, PDF_DOWNLOAD_URL } from '../data/priceData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
      {/* Background ambient lighting - warm sunny glow */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-amber-200/25 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-10 w-[450px] h-[350px] bg-blue-100/40 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-amber-700 uppercase mb-4 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 w-max">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Официальный интерактивный прайс-лист</span>
              <span className="text-amber-300">·</span>
              <span className="text-slate-600 font-medium">Актуально на 2026 год</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Консалтинг отдела продаж <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
                и РОП-шеринг
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-6 max-w-2xl">
              Два руководителя. Один клиент. Два взгляда. <br />
              <span className="text-slate-900 font-bold">Один конкретный следующий шаг к росту выручки.</span>
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Мы не продаём абстрактные теории и не лезем в рекламу или логистику. Мы разбираем, что происходит с клиентом после обращения, находим главные финансовые утечки и выстраиваем систему, которая стабильно закрывает сделки.
            </p>

            {/* Main Action Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 whitespace-nowrap cursor-pointer group"
              >
                <span>Начать с разбора вдвоём</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>Рассчитать стоимость по прайсу</span>
              </button>
            </div>

            {/* Zero-Pill Key Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">16</div>
                <div className="text-xs text-slate-600 mt-0.5 font-medium">услуг в 4 направлениях</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">4</div>
                <div className="text-xs text-slate-600 mt-0.5 font-medium">готовых решения под ключ</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono tabular-nums">до −25%</div>
                <div className="text-xs text-slate-600 mt-0.5 font-medium">система лояльности</div>
              </div>
            </div>

          </div>

          {/* Right Column: Founders & Low-Risk Offer Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 relative shadow-xl">
              
              {/* Highlight Tag */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-5 pb-4 border-b border-slate-100">
                <span className="font-bold text-amber-700 uppercase tracking-wider">Формат входа</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1.5 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Без риска для вас
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                Первый шаг — Разбор вдвоём
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                40–60 минут онлайн-сессии с обоими основателями. Находим, где ваш отдел теряет клиентов, и даем один конкретный следующий шаг.
              </p>

              {/* Donation Reversal Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 mb-6">
                <div className="text-xs text-amber-800 font-bold mb-1">Условия первой встречи:</div>
                <div className="text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Добровольный донат по результатам.</span> Если мы поймём, что не подходим друг другу — вы не платите ничего.
                </div>
              </div>

              {/* Founders Contacts Strip */}
              <div className="space-y-3 mb-6">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                  Руководители проекта:
                </div>
                
                {FOUNDERS.map((founder, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{founder.name}</div>
                      <div className="text-xs text-slate-500">{founder.role}</div>
                    </div>
                    <a
                      href={founder.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 hover:text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>{founder.telegram}</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Action Link to PDF */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Прайс утверждён на октябрь 2026 г.</span>
                <a
                  href={PDF_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Открыть PDF</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
