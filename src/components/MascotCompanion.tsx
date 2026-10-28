import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  MessageSquare, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  HelpCircle, 
  Minimize2, 
  Maximize2,
  Gift,
  Send,
  Zap
} from 'lucide-react';
import { TurnkeyPackage } from '../data/priceData';

interface MascotCompanionProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
  onSelectPackage?: (pkg: TurnkeyPackage) => void;
}

interface SectionHint {
  id: string;
  badge: string;
  message: string;
  actionText?: string;
  actionTarget?: string;
}

const SECTION_HINTS: SectionHint[] = [
  {
    id: 'hero',
    badge: 'Приветствие',
    message: 'Привет! Я РОПик — ваш проводник по услугам и прайсу. С чего начнем прокачку продаж?',
    actionText: 'Подобрать тариф',
    actionTarget: '#packages'
  },
  {
    id: 'packages',
    badge: 'Совет по тарифам',
    message: 'Пакет «Быстрый старт» за 450 000 ₽ окупается уже в первый месяц за счет конверсий!',
    actionText: 'Собрать по частям',
    actionTarget: '#calculator'
  },
  {
    id: 'rop-comparison',
    badge: 'Экономика РОПа',
    message: 'Штатный РОП обходится в 4,7 млн ₽ в год. РОП-шеринг дает тот же уровень втрое дешевле!',
    actionText: 'Сравнить цифры',
    actionTarget: '#rop-comparison'
  },
  {
    id: 'simulator',
    badge: 'Скрипты продаж',
    message: '68% клиентов уходят, если менеджер сухо отвечает ценой. Попробуйте эталонный диалог!',
    actionText: 'Проверить скрипт',
    actionTarget: '#simulator'
  },
  {
    id: 'calculator',
    badge: 'Шведский стол',
    message: 'Скидка растет автоматически: от 4 услуг — 10%, от 7 услуг — 20%! Выбирайте только нужное.',
    actionText: 'Рассчитать проект',
    actionTarget: '#calculator'
  },
  {
    id: 'roi-calculator',
    badge: 'Утечка выручки',
    message: 'Сдвиньте ползунок скорости первого ответа: каждая минута промедления сжигает до 15% маржи.',
    actionText: 'Посчитать потери',
    actionTarget: '#roi-calculator'
  },
  {
    id: 'quiz',
    badge: 'Экспресс-диагностика',
    message: 'Ответьте на 4 вопроса — алгоритм определит точное узкое горлышко в ваших продажах.',
    actionText: 'Пройти тест',
    actionTarget: '#quiz'
  },
  {
    id: 'stages',
    badge: 'Ступени роста',
    message: 'Для каждого оборота — свои инструменты. Найдите ваш масштаб и получите рецепт!',
    actionText: 'Узнать решение',
    actionTarget: '#stages'
  },
  {
    id: 'cases',
    badge: 'Факты и цифры',
    message: 'Обратите внимание на кейс IT: рост выручки на +400% без расширения штата.',
    actionText: 'Смотреть кейсы',
    actionTarget: '#cases'
  },
  {
    id: 'bonus-wheel',
    badge: 'Колесо фортуны',
    message: 'Крутите колесо бонусов! Можно выиграть бесплатный аудит звонков или скидку до 25%.',
    actionText: 'Крутить колесо!',
    actionTarget: '#bonus-wheel'
  },
  {
    id: 'founders',
    badge: 'Гарантия основателей',
    message: 'Артем Кубышкин и Виктор Паринов лично сопровождают проекты и подписывают строгий NDA.',
    actionText: 'Записаться на разбор',
    actionTarget: '#booking'
  }
];

export const MascotCompanion: React.FC<MascotCompanionProps> = ({
  onOpenBooking,
  onScrollToCalculator
}) => {
  const [currentHint, setCurrentHint] = useState<SectionHint>(SECTION_HINTS[0]);
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sparkleCount, setSparkleCount] = useState(0);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      
      for (const hint of SECTION_HINTS) {
        const el = document.getElementById(hint.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos <= bottom) {
            if (currentHint.id !== hint.id) {
              setCurrentHint(hint);
              setIsBubbleVisible(true);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentHint.id]);

  const handleMascotClick = () => {
    setIsJumping(true);
    setSparkleCount(prev => prev + 1);
    setTimeout(() => setIsJumping(false), 600);
    setIsMenuOpen(prev => !prev);
  };

  const handleAction = (target?: string) => {
    if (!target) return;
    if (target === '#booking') {
      onOpenBooking();
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none flex flex-col items-start font-sans">
      
      {/* Interactive Helper Popup Menu (when mascot is clicked) */}
      {isMenuOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-xs font-bold text-slate-800">Помощник РОПик</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Я знаю всё о тарифах и инструментах продаж. Чем помочь прямо сейчас?
          </p>

          <div className="space-y-1.5">
            <button
              onClick={() => handleAction('#calculator')}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-amber-50 hover:text-amber-900 border border-slate-100 transition-all cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                <span>Рассчитать стоимость</span>
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => handleAction('#quiz')}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-amber-50 hover:text-amber-900 border border-slate-100 transition-all cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Пройти экспресс-тест (2 мин)</span>
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => handleAction('#bonus-wheel')}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-amber-50 hover:text-amber-900 border border-slate-100 transition-all cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span>Крутить колесо бонусов</span>
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer text-left shadow-xs mt-2"
            >
              <span className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                <span>Записаться на разбор</span>
              </span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Speech Bubble (Contextual dynamic hint) */}
      {!isMinimized && isBubbleVisible && !isMenuOpen && (
        <div className="mb-2 max-w-[270px] sm:max-w-[310px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3.5 relative animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Header of speech bubble */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
              <Zap className="w-2.5 h-2.5 text-amber-600" />
              {currentHint.badge}
            </span>
            <button 
              onClick={() => setIsBubbleVisible(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              title="Скрыть подсказку"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Message content */}
          <p className="text-xs text-slate-700 leading-relaxed font-medium mb-2.5">
            {currentHint.message}
          </p>

          {/* Action button inside bubble */}
          {currentHint.actionText && (
            <button
              onClick={() => handleAction(currentHint.actionTarget)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <span>{currentHint.actionText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {/* Chat bubble tail pointing to mascot */}
          <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-slate-200/90 rotate-45 transform"></div>
        </div>
      )}

      {/* Mascot Avatar and Controls */}
      <div className="flex items-end gap-2">
        
        {/* The Animated Mascot Figure */}
        <div 
          onClick={handleMascotClick}
          className={`group relative cursor-pointer select-none transition-transform duration-300 ${
            isJumping ? '-translate-y-4 scale-110' : 'hover:-translate-y-1'
          }`}
          title="Нажмите на РОПика, чтобы открыть меню помощи!"
        >
          {/* Mascot SVG illustration */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 relative filter drop-shadow-lg">
            
            {/* Ambient subtle glow ring */}
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md group-hover:bg-amber-400/35 transition-colors animate-pulse"></div>

            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full relative z-10"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Floating shadow under robot */}
              <ellipse cx="50" cy="94" rx="26" ry="5" fill="#cbd5e1" opacity="0.6" className="animate-pulse" />

              {/* Antenna */}
              <line x1="50" y1="18" x2="50" y2="8" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="6" r="4.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Robot Head & Body (Egg capsule shape) */}
              <rect x="22" y="18" width="56" height="66" rx="28" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2.5" />
              
              {/* Visor / Face Screen */}
              <rect x="30" y="28" width="40" height="26" rx="13" fill="#0f172a" />

              {/* Expressive Glowing Eyes */}
              {/* Left Eye */}
              <circle cx="41" cy="41" r="5" fill="#38bdf8">
                <animate attributeName="ry" values="5;0.5;5" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="42.5" cy="39.5" r="1.5" fill="#ffffff" />

              {/* Right Eye */}
              <circle cx="59" cy="41" r="5" fill="#38bdf8">
                <animate attributeName="ry" values="5;0.5;5" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="60.5" cy="39.5" r="1.5" fill="#ffffff" />

              {/* Smart Consultant Glasses Accent */}
              <circle cx="41" cy="41" r="7.5" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.85" />
              <circle cx="59" cy="41" r="7.5" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.85" />
              <line x1="48.5" y1="41" x2="51.5" y2="41" stroke="#f59e0b" strokeWidth="1.5" />

              {/* Cheerful Mouth smile */}
              <path d="M 45 49 Q 50 53 55 49" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Consultant Tie / Bowtie */}
              <path d="M 47 58 L 53 58 L 51 68 L 50 71 L 49 68 Z" fill="#f59e0b" />
              <circle cx="50" cy="58" r="2.5" fill="#d97706" />

              {/* Left Floating Hand (Waving!) */}
              <g className="origin-top-right animate-bounce">
                <rect x="13" y="38" width="9" height="18" rx="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                <circle cx="17.5" cy="39" r="2.5" fill="#fbbf24" />
              </g>

              {/* Right Floating Hand */}
              <g>
                <rect x="78" y="44" width="9" height="18" rx="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                <circle cx="82.5" cy="60" r="2.5" fill="#fbbf24" />
              </g>

              {/* Chest Badge "РОП" */}
              <rect x="42" y="72" width="16" height="7" rx="3.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
              <text x="50" y="77" fontSize="5" fontWeight="bold" fill="#475569" textAnchor="middle" fontFamily="sans-serif">
                РОП
              </text>
            </svg>

            {/* Sparkle badge indicator */}
            <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow-xs border border-white">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>

        {/* Small toggle button: Minimize/Restore */}
        <div className="flex flex-col gap-1 pb-1">
          <button
            onClick={() => {
              if (isMinimized) {
                setIsMinimized(false);
                setIsBubbleVisible(true);
              } else {
                setIsMinimized(true);
                setIsBubbleVisible(false);
                setIsMenuOpen(false);
              }
            }}
            className="p-1.5 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg shadow-sm border border-slate-200 transition-colors cursor-pointer text-xs"
            title={isMinimized ? "Показать подсказки РОПика" : "Свернуть подсказки"}
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>
        </div>

      </div>

    </div>
  );
};
