import React, { useState } from 'react';
import { Send, FileDown, ChevronDown, Menu, X, Sparkles, Package, Layers, TrendingUp, Award } from 'lucide-react';
import { PDF_DOWNLOAD_URL, TurnkeyPackage } from '../data/priceData';
import { MegaMenu } from './MegaMenu';

interface HeaderProps {
  onOpenBooking: () => void;
  onSelectPackage?: (pkg: TurnkeyPackage) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onSelectPackage }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(prev => !prev);
  };

  const handleSelectPackageAndClose = (pkg: TurnkeyPackage) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
  };

  const handleMobileNav = (hash: string) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-600 transition-colors flex items-center gap-2 group"
          >
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm inline-block shadow-xs group-hover:scale-110 transition-transform"></span>
            <span>Кубышкин & Паринов</span>
          </a>

          {/* Quick interactive drilldown toggle pill */}
          <button
            onClick={toggleMegaMenu}
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              isMegaMenuOpen 
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/80'
            }`}
            title="Интерактивный навигатор по разделам"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Каталог & Навигатор</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Zone 2: Navigation links with drilldown preview */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              if (!isMegaMenuOpen) setIsMegaMenuOpen(true);
              else handleMobileNav('#packages');
            }}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Решения под ключ</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </button>

          <button
            onClick={() => {
              if (!isMegaMenuOpen) setIsMegaMenuOpen(true);
              else handleMobileNav('#calculator');
            }}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Калькулятор услуг</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </button>

          <button
            onClick={() => {
              if (!isMegaMenuOpen) setIsMegaMenuOpen(true);
              else handleMobileNav('#stages');
            }}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Ступени бизнеса</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
          </button>

          <a href="#cases" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Кейсы в цифрах
          </a>
          <a href="#process" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
            Порядок работы
          </a>
        </nav>

        {/* Zone 3: Actions + Mobile Menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={PDF_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Оригинальный PDF прайс-листа"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-600" />
            <span>Скачать PDF</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-amber-400/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Записаться на разбор</span>
            <span className="xs:hidden">Разбор</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Открыть мобильное меню"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu 
        isOpen={isMegaMenuOpen} 
        onClose={() => setIsMegaMenuOpen(false)} 
        onSelectPackage={handleSelectPackageAndClose}
        onOpenBooking={onOpenBooking}
      />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-lg space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Разделы и калькуляторы
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleMobileNav('#packages')}
              className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800 text-left transition-colors"
            >
              <Package className="w-4 h-4 text-amber-500" />
              <span>Решения под ключ (4 пакета)</span>
            </button>
            <button
              onClick={() => handleMobileNav('#calculator')}
              className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800 text-left transition-colors"
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Шведский стол: калькулятор 18 услуг</span>
            </button>
            <button
              onClick={() => handleMobileNav('#stages')}
              className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800 text-left transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Ступени бизнеса и где начать</span>
            </button>
            <button
              onClick={() => handleMobileNav('#cases')}
              className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800 text-left transition-colors"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Кейсы с цифрами (+400%)</span>
            </button>
            <button
              onClick={() => handleMobileNav('#process')}
              className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800 text-left transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Порядок работы и NDA</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={PDF_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4 text-amber-600" />
              <span>Скачать PDF прайс-листа</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Записаться на разбор с основателями</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
