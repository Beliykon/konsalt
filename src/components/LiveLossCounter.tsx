import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Minimize2, Maximize2 } from 'lucide-react';

interface LiveLossCounterProps {
  onOpenBooking: () => void;
}

export const LiveLossCounter: React.FC<LiveLossCounterProps> = ({ onOpenBooking }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Money lost per second: average ~45 ₽ per second in Russian SMB on uncalled leads & dropped carts
  const lostMoney = Math.round(seconds * 48);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('ru-RU').format(val) + ' ₽';
  };

  return (
    <div className="fixed bottom-20 left-5 z-30 transition-all duration-300">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-rose-500/40 text-xs shadow-xl text-slate-300 hover:text-white transition-all cursor-pointer group"
          title="Смотреть счётчик упущенных денег в реальном времени"
        >
          <Flame className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
          <span className="font-mono text-rose-400 font-bold">{formatMoney(lostMoney)}</span>
          <span className="text-[10px] text-slate-400 group-hover:text-slate-200">утекло</span>
          <Maximize2 className="w-3 h-3 text-slate-500 group-hover:text-white ml-0.5" />
        </button>
      ) : (
        <div className="bg-slate-950/95 backdrop-blur-md border border-rose-500/40 rounded-2xl p-4 shadow-2xl max-w-xs animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>Счётчик упущенных денег</span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-slate-500 hover:text-white p-0.5 rounded"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] text-slate-400 mb-2">
            Вы на сайте: <span className="font-mono text-white font-bold">{formatTime(seconds)}</span>
          </div>

          <div className="text-xl font-extrabold font-mono text-rose-400 mb-2">
            ~{formatMoney(lostMoney)}
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
            Столько в среднем теряет бизнес за это время из-за остывших лидов и звонков без сценария продаж.
          </p>

          <button
            onClick={onOpenBooking}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <span>Остановить потери</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
