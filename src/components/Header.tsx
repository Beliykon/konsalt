import React from 'react';
import { Send, FileDown } from 'lucide-react';
import { PDF_DOWNLOAD_URL } from '../data/priceData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a 
          href="#" 
          className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm inline-block"></span>
          <span>Кубышкин & Паринов</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#packages" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Решения под ключ
          </a>
          <a href="#calculator" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Калькулятор прайса
          </a>
          <a href="#stages" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Для кого
          </a>
          <a href="#cases" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Кейсы в цифрах
          </a>
          <a href="#process" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Порядок работы
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={PDF_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Оригинальный PDF прайс-листа"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-400" />
            <span>Скачать PDF</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all shadow-sm hover:shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Записаться на разбор</span>
          </button>
        </div>
      </div>
    </header>
  );
};
