import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';
import { FOUNDERS, PDF_DOWNLOAD_URL } from '../data/priceData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
      {/* Background ambient lighting - multi-colored aura */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-10 w-[450px] h-[350px] bg-blue-600/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-1/2 w-[400px] h-[250px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-4">
              <span className="w-2 h-0.5 bg-amber-400" />
              <span>Официальный интерактивный прайс-лист</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-normal">Актуально на 2026 год</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Консалтинг отдела продаж <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                и РОП-шеринг
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-6 max-w-2xl">
              Два руководителя. Один клиент. Два взгляда. <br />
              <span className="text-white font-medium">Один конкретный следующий шаг к росту выручки.</span>
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Мы не продаём абстрактные теории и не лезем в рекламу или логистику. Мы разбираем, что происходит с клиентом после обращения, находим главные финансовые утечки и выстраиваем систему, которая стабильно закрывает сделки.
            </p>

            {/* Main Action Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer group"
              >
                <span>Начать с разбора вдвоём</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-slate-200 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-700/80 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Рассчитать стоимость по прайсу</span>
              </button>
            </div>

            {/* Zero-Pill Key Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">16</div>
                <div className="text-xs text-slate-400 mt-0.5">услуг в 4 направлениях</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">4</div>
                <div className="text-xs text-slate-400 mt-0.5">готовых решения под ключ</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums">до −25%</div>
                <div className="text-xs text-slate-400 mt-0.5">система лояльности</div>
              </div>
            </div>

          </div>

          {/* Right Column: Founders & Low-Risk Offer Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
              
              {/* Highlight Tag */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-5 pb-4 border-b border-slate-800">
                <span className="font-semibold text-amber-400 uppercase tracking-wider">Формат входа</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Без риска для вас
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Первый шаг — Разбор вдвоём
              </h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                40–60 минут онлайн-сессии с обоими основателями. Находим, где ваш отдел теряет клиентов, и даем один конкретный следующий шаг.
              </p>

              {/* Donation Reversal Box */}
              <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 mb-6">
                <div className="text-xs text-amber-400 font-semibold mb-1">Условия первой встречи:</div>
                <div className="text-sm text-slate-200">
                  <span className="font-bold text-white">Добровольный донат по результатам.</span> Если мы поймём, что не подходим друг другу — вы не платите ничего.
                </div>
              </div>

              {/* Founders Contacts Strip */}
              <div className="space-y-3 mb-6">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Руководители проекта:
                </div>
                
                {FOUNDERS.map((founder, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800/80">
                    <div>
                      <div className="text-sm font-semibold text-white">{founder.name}</div>
                      <div className="text-xs text-slate-400">{founder.role}</div>
                    </div>
                    <a
                      href={founder.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded-md transition-colors whitespace-nowrap"
                    >
                      <Send className="w-3 h-3" />
                      <span>{founder.telegram}</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Action Link to PDF */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Прайс утверждён на октябрь 2026 г.</span>
                <a
                  href={PDF_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
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
