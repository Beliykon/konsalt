import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  TrendingUp, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  X, 
  HelpCircle,
  BarChart3,
  Bot,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { TURNKEY_PACKAGES, SERVICES, TurnkeyPackage } from '../data/priceData';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (pkg: TurnkeyPackage) => void;
  onOpenBooking: () => void;
}

type TabType = 'packages' | 'calculator' | 'stages' | 'cases' | 'tools';

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('packages');

  if (!isOpen) return null;

  const handleNavigate = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChoosePackage = (pkg: TurnkeyPackage) => {
    onClose();
    onSelectPackage(pkg);
  };

  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Header bar inside Mega Menu */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Интерактивный навигатор по прайс-листу и услугам
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium"
          >
            <span>Закрыть</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Nav Tabs */}
          <div className="lg:col-span-3 space-y-1.5 border-r border-slate-100 pr-4">
            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'packages'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className={`w-4 h-4 ${activeTab === 'packages' ? 'text-slate-950' : 'text-amber-500'}`} />
                <span>Решения под ключ</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'packages' ? 'text-slate-950' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className={`w-4 h-4 ${activeTab === 'calculator' ? 'text-slate-950' : 'text-amber-500'}`} />
                <span>Шведский стол (18 услуг)</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'calculator' ? 'text-slate-950' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('stages')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'stages'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className={`w-4 h-4 ${activeTab === 'stages' ? 'text-slate-950' : 'text-amber-500'}`} />
                <span>Ступени бизнеса (0 → 1 млрд)</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'stages' ? 'text-slate-950' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('cases')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'cases'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className={`w-4 h-4 ${activeTab === 'cases' ? 'text-slate-950' : 'text-amber-500'}`} />
                <span>Кейсы & Результаты</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'cases' ? 'text-slate-950' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className={`w-4 h-4 ${activeTab === 'tools' ? 'text-slate-950' : 'text-amber-500'}`} />
                <span>Интерактивные модули</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'tools' ? 'text-slate-950' : 'text-slate-400'}`} />
            </button>

            {/* Quick founders direct block */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Личный аудит
                </div>
                <div className="text-xs text-slate-700 font-medium leading-relaxed mb-2.5">
                  Разбор проводит Артем Кубышкин и Виктор Паринов лично.
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Забронировать слот</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Area: Drilldown Content for Active Tab */}
          <div className="lg:col-span-9 min-h-[340px]">
            {/* TAB 1: Packages */}
            {activeTab === 'packages' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Комплексные пакеты под ключ</h3>
                    <p className="text-xs text-slate-500">
                      Сбалансированные готовые конфигурации услуг со скидкой и фиксированными сроками
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('#packages')}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Смотреть на странице</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {TURNKEY_PACKAGES.map((pkg) => (
                    <div 
                      key={pkg.id}
                      className={`relative p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        pkg.isPopular 
                          ? 'border-amber-400 bg-amber-50/40 shadow-xs ring-1 ring-amber-400/50' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      {pkg.discountBadge && (
                        <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                          {pkg.discountBadge}
                        </span>
                      )}

                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          {pkg.forWhom}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                          {pkg.title}
                        </h4>
                        <div className="text-base font-extrabold text-slate-950 mb-2">
                          {pkg.priceText}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                          {pkg.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => handleChoosePackage(pkg)}
                          className="flex-1 py-1.5 px-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer"
                        >
                          Выбрать
                        </button>
                        <button
                          onClick={() => handleNavigate('#packages')}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs transition-colors cursor-pointer"
                          title="Подробнее о тарифе"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Calculator / Swedish Table */}
            {activeTab === 'calculator' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Шведский стол: 18 модульных услуг</h3>
                    <p className="text-xs text-slate-500">
                      Соберите персональную конфигурацию с автоматической прогрессивной скидкой до 20%
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('#calculator')}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Открыть интерактивный калькулятор</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      category: 'Аудит и стратегия',
                      count: '4 услуги',
                      range: 'от 50 000 ₽',
                      items: ['Экспресс-аудит (01)', 'Аудит звонков (02)', 'Страт-сессия (03)', 'Юнит-экономика (04)'],
                      icon: BarChart3
                    },
                    {
                      category: 'Фундамент и стандарты',
                      count: '5 услуг',
                      range: 'от 70 000 ₽',
                      items: ['Книга продаж (09)', 'Система мотивации (07)', 'Регламенты (06)', 'Портрет ЦА (05)'],
                      icon: Layers
                    },
                    {
                      category: 'Инструменты и найм',
                      count: '5 услуг',
                      range: 'от 80 000 ₽',
                      items: ['Скрипты продаж (08)', 'Найм менеджеров (11)', 'Аттестация (10)', 'Онбординг (12)'],
                      icon: Zap
                    },
                    {
                      category: 'Управление и РОП',
                      count: '4 услуги',
                      range: 'от 120 000 ₽',
                      items: ['РОП-шеринг (15)', 'Дашборд метрик (13)', 'Планерки и разборы (14)', 'Сопровождение (16)'],
                      icon: Bot
                    }
                  ].map((cat, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
                      onClick={() => handleNavigate('#calculator')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                          <cat.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {cat.range}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{cat.category}</h4>
                      <div className="text-[11px] text-slate-400 mb-2">{cat.count}</div>
                      <ul className="space-y-1 mb-3">
                        {cat.items.map((it, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0"></span>
                            <span className="truncate">{it}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-xs font-semibold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                        <span>Настроить в калькуляторе</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Business Stages */}
            {activeTab === 'stages' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">4 ступени зрелости отдела продаж</h3>
                    <p className="text-xs text-slate-500">
                      Точный диагноз узкого горлышка и готовое решение для вашего оборота
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('#stages')}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Перейти к разделу ступеней</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      stage: 'Ступень 1',
                      revenue: 'до 10 млн ₽/год',
                      problem: 'Собственник продает сам, нет регламентов',
                      solution: 'Экспресс-аудит + базовые скрипты',
                      target: '#packages'
                    },
                    {
                      stage: 'Ступень 2',
                      revenue: '10–50 млн ₽/год',
                      problem: 'Менеджеры сливают лиды, хаос в CRM',
                      solution: 'Пакет «Быстрый старт» + РОП-шеринг',
                      target: '#packages'
                    },
                    {
                      stage: 'Ступень 3',
                      revenue: '50–200 млн ₽/год',
                      problem: 'Стеклянный потолок, зависимость от звезд',
                      solution: 'Отдел продаж под ключ + Книга продаж',
                      target: '#packages'
                    },
                    {
                      stage: 'Ступень 4',
                      revenue: '200 млн – 1 млрд+ ₽',
                      problem: 'Нужно масштабирование на филиалы и дилеров',
                      solution: 'Индивидуальный трек и архитектура ОП',
                      target: '#packages'
                    }
                  ].map((stg, i) => (
                    <div 
                      key={i}
                      onClick={() => handleNavigate(stg.target)}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            {stg.stage}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 mb-2">{stg.revenue}</div>
                        <div className="text-xs text-rose-600 font-medium mb-1.5">
                          ⚠️ {stg.problem}
                        </div>
                        <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="font-semibold text-slate-900">Решение:</span> {stg.solution}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-amber-600 group-hover:text-amber-700 flex items-center justify-between">
                        <span>Подобрать решение</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Cases */}
            {activeTab === 'cases' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Кейсы с подтвержденными цифрами</h3>
                    <p className="text-xs text-slate-500">
                      Реальные метрики внедрения: рост конверсий, сокращение цикла сделки и ROI
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('#cases')}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Все 4 кейса детально</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      niche: 'B2B SaaS / IT',
                      metric: '+400%',
                      desc: 'Рост выручки за 4 месяца без увеличения рекламного бюджета',
                      badge: 'Окупаемость: 1-й мес.'
                    },
                    {
                      niche: 'Производство оборудования',
                      metric: '6.2x',
                      desc: 'Увеличение объема закрытых контрактов за счет внедрения Книги продаж',
                      badge: 'Цикл сделки -40%'
                    },
                    {
                      niche: 'Девелопмент / Недвижимость',
                      metric: '1.8x',
                      desc: 'Рост конверсии из встречи в бронь с помощью РОП-шеринга',
                      badge: '+34 млн ₽'
                    },
                    {
                      niche: 'Оптовая торговля',
                      metric: '+12.4 млн',
                      desc: 'Ежемесячный прирост после переработки системы мотивации',
                      badge: 'LTV клиентов +65%'
                    }
                  ].map((cs, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleNavigate('#cases')}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {cs.niche}
                      </div>
                      <div className="text-2xl font-black text-amber-600 tracking-tight mb-1">
                        {cs.metric}
                      </div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {cs.desc}
                      </p>
                      <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {cs.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Interactive tools */}
            {activeTab === 'tools' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Интерактивные виджеты и сервисы</h3>
                    <p className="text-xs text-slate-500">
                      Проверьте свой отдел продаж на прочность прямо на сайте
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      title: 'Симулятор переписки',
                      desc: 'Сравните реальный скрипт со сливом клиента и эталонный ответ',
                      tag: '#simulator',
                      icon: '💬'
                    },
                    {
                      title: 'Калькулятор утечки выручки',
                      desc: 'Посчитайте, сколько денег теряется из-за долгого первого ответа',
                      tag: '#roi-calculator',
                      icon: '📉'
                    },
                    {
                      title: 'Экспресс-аудит (квиз)',
                      desc: '4 вопроса для точного определения текущей стадии и точек роста',
                      tag: '#quiz',
                      icon: '📋'
                    },
                    {
                      title: 'Колесо бонусов',
                      desc: 'Крутите колесо фортуны и выигрывайте персональные скидки до 25%',
                      tag: '#bonus-wheel',
                      icon: '🎡'
                    }
                  ].map((tool, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleNavigate(tool.tag)}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="text-2xl mb-2">{tool.icon}</div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {tool.desc}
                      </p>
                      <div className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                        <span>Запустить</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
