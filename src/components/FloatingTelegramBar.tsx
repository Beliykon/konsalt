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
          className="mb-3 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-500" />
              <span>Написать основателям:</span>
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-slate-100"
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
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {founder.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{founder.telegram}</div>
                </div>
                <Send className="w-3.5 h-3.5 text-amber-600" />
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenBooking();
            }}
            className="w-full py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs cursor-pointer text-center active:scale-[0.99]"
          >
            Записаться на Разбор (донат)
          </button>
        </div>
      )}

      {/* Main Pill Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-900 hover:text-amber-700 border border-slate-200 rounded-full shadow-lg transition-all cursor-pointer group active:scale-[0.98]"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <Send className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-extrabold whitespace-nowrap">Связаться в Telegram</span>
      </button>

    </div>
  );
};
