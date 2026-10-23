import React, { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, Gift, ShieldCheck, X } from 'lucide-react';

export const LiveActivityToasts: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  const notifications = [
    {
      title: 'Только что забронирован Разбор',
      detail: 'Оптовая компания, 3 менеджера',
      time: '1 мин назад',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Выигран подарок в Колесе бонусов',
      detail: '«Чек-лист 15 скрытых дыр в AmoCRM»',
      time: '3 мин назад',
      icon: Gift,
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Кейс: +2.8 млн ₽ выручки без роста рекламы',
      detail: 'Сеть мебельных салонов, 20 менеджеров',
      time: '6 мин назад',
      icon: TrendingUp,
      color: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Подписан NDA и согласован план',
      detail: 'Пакет «Отдел продаж под ключ»',
      time: '9 мин назад',
      icon: ShieldCheck,
      color: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 border-purple-500/20'
    }
  ];

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast after 4 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Interval to cycle through
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 800);
    }, 13000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [dismissed, notifications.length]);

  if (dismissed) return null;

  const current = notifications[currentIdx];
  const Icon = current.icon;

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-sm transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl flex items-start gap-3 relative pr-8">
        
        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2.5 right-2.5 text-slate-500 hover:text-white p-0.5 rounded transition-colors"
          title="Скрыть уведомления"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Icon */}
        <div className={`p-2 rounded-xl ${current.badgeBg} border shrink-0 mt-0.5`}>
          <Icon className={`w-4 h-4 ${current.color}`} />
        </div>

        {/* Text info */}
        <div>
          <div className="text-xs font-bold text-white leading-snug">
            {current.title}
          </div>
          <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
            {current.detail}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>{current.time}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
