import React, { useState, useRef } from 'react';
import { Sparkles, Gift, Send, RotateCw, CheckCircle2 } from 'lucide-react';

interface BonusWheelProps {
  onOpenBooking: () => void;
  onWinBonus?: () => void;
}

export const BonusWheel: React.FC<BonusWheelProps> = ({ onOpenBooking, onWinBonus }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [hasSpun, setHasSpun] = useState(false);

  const bonuses = [
    { text: 'Бесплатный аудит 1 звонка менеджера', color: '#f59e0b', tag: 'Аудит' },
    { text: 'Чек-лист 15 скрытых дыр в AmoCRM', color: '#10b981', tag: 'Чек-лист' },
    { text: 'Боевой скрипт отработки «Дорого»', color: '#3b82f6', tag: 'Скрипт' },
    { text: 'Доп. скидка −5% на первый месяц', color: '#ec4899', tag: 'Скидка' },
    { text: 'Шаблон структуры Книги продаж', color: '#8b5cf6', tag: 'Шаблон' },
    { text: 'Экспресс-аудит карточек сделок', color: '#06b6d4', tag: 'Анализ' }
  ];

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setSelectedBonus(null);

    // Pick random index
    const randomIndex = Math.floor(Math.random() * bonuses.length);
    const sectorAngle = 360 / bonuses.length;
    // Calculate final angle (spin at least 5 full rotations = 1800 deg + offset to center of sector)
    const extraTurns = 5 * 360;
    const targetAngle = extraTurns + (bonuses.length - randomIndex) * sectorAngle - (sectorAngle / 2);

    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedBonus(bonuses[randomIndex].text);
      setHasSpun(true);
      if (onWinBonus) onWinBonus();
    }, 4000);
  };

  const getTelegramBonusLink = () => {
    if (!selectedBonus) return 'https://t.me/Beliykon1987';
    const msg = `Здравствуйте! Я крутанул колесо на сайте и выиграл подарок: «${selectedBonus}». Хочу зафиксировать его за своей компанией при проведении Разбора вдвоём!`;
    return `https://t.me/Beliykon1987?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Интерактивный подарок к первой встрече</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Крутите колесо и заберите ценный бонус
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Каждый сектор — это реальный практический инструмент, который мы подарим вам на стартовой сессии «Разбор вдвоём».
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Wheel Graphic (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
              
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-amber-400/40 shadow-[0_0_40px_rgba(245,158,11,0.25)] animate-pulse" />

              {/* Pin Indicator at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 filter drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />

              {/* Wheel Container with CSS rotation */}
              <div
                className="w-full h-full rounded-full overflow-hidden shadow-2xl relative border-4 border-slate-900"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
                }}
              >
                {/* SVG Sectors */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {bonuses.map((b, idx) => {
                    const angle = 360 / bonuses.length;
                    const startAngle = idx * angle;
                    const endAngle = (idx + 1) * angle;
                    const startRad = (startAngle - 90) * (Math.PI / 180);
                    const endRad = (endAngle - 90) * (Math.PI / 180);
                    const x1 = 50 + 50 * Math.cos(startRad);
                    const y1 = 50 + 50 * Math.sin(startRad);
                    const x2 = 50 + 50 * Math.cos(endRad);
                    const y2 = 50 + 50 * Math.sin(endRad);

                    const midRad = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
                    const textX = 50 + 32 * Math.cos(midRad);
                    const textY = 50 + 32 * Math.sin(midRad);

                    return (
                      <g key={idx}>
                        <path
                          d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                          fill={idx % 2 === 0 ? '#0f172a' : '#1e293b'}
                          stroke="#334155"
                          strokeWidth="0.5"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill={b.color}
                          fontSize="3.6"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${idx * angle + angle / 2}, ${textX}, ${textY})`}
                        >
                          {b.tag}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Center Hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-amber-400 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                </div>

              </div>

            </div>

            {/* Spin Trigger Button */}
            <button
              onClick={spinWheel}
              disabled={isSpinning || hasSpun}
              className={`mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-sm sm:text-base font-extrabold rounded-xl transition-all cursor-pointer shadow-lg ${
                hasSpun
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : isSpinning
                  ? 'bg-amber-400 text-slate-950 opacity-80 cursor-wait'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/25 active:scale-95'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Колесо крутится...' : hasSpun ? 'Подарок зафиксирован!' : 'Крутить колесо бонусов'}</span>
            </button>

          </div>

          {/* Right: Results or Instructions (6 Cols) */}
          <div className="lg:col-span-6">
            
            {!selectedBonus ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Правила розыгрыша
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  1 попытка для каждого нового клиента
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Крутаните колесо перед тем, как записаться на разбор. Любой выпавший бонус имеет рыночную стоимость от 5 000 до 15 000 ₽ и передается вам абсолютно бесплатно.
                </p>

                <div className="space-y-2 text-xs text-slate-400">
                  {bonuses.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                      <span className="text-slate-300">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 border-2 border-amber-400 rounded-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300 shadow-2xl relative">
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Поздравляем с победой!</span>
                </div>

                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Ваш персональный бонус:
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4 text-amber-400">
                  {selectedBonus}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Мы закрепили этот подарок за вашим диалогом. Чтобы воспользоваться бонусом, отправьте сообщение в Telegram или запишитесь на онлайн-разбор прямо сейчас:
                </p>

                <div className="space-y-3">
                  <a
                    href={getTelegramBonusLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Забрать в Telegram (@Beliykon1987)</span>
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Записаться на Разбор вдвоём через сайт
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
