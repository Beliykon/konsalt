import React, { useState } from 'react';
import { Send, X, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import { FOUNDERS } from '../data/priceData';

interface FloatingTelegramBarProps {
  onOpenBooking: () => void;
}

export const FloatingTelegramBar: React.FC<FloatingTelegramBarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div 
          className="mb-3 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Написать основателям:</span>
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-3">
            {FOUNDERS.map((founder, idx) => (
              <a
                key={idx}
                href={founder.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {founder.name}
                  </div>
                  <div className="text-[10px] text-slate-400">{founder.telegram}</div>
                </div>
                <Send className="w-3.5 h-3.5 text-amber-400" />
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenBooking();
            }}
            className="w-full py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer text-center"
          >
            Записаться на Разбор (донат)
          </button>
        </div>
      )}

      {/* Main Pill Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-850 text-white hover:text-amber-400 border border-slate-700/80 hover:border-amber-400/50 rounded-full shadow-xl transition-all cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <Send className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold whitespace-nowrap">Связаться в Telegram</span>
      </button>

    </div>
  );
};
