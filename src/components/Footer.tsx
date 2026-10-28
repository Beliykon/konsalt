import React from 'react';
import { FOUNDERS, PDF_DOWNLOAD_URL } from '../data/priceData';
import { FileDown, Send } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs inline-block" />
              <span>Кубышкин & Паринов</span>
            </div>
            
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Консалтинг отдела продаж и РОП-шеринг. Два руководителя. Один клиент. Два взгляда. Один конкретный следующий шаг к выполнению плана.
            </p>

            <div className="pt-2">
              <a
                href={PDF_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-bold bg-amber-100/80 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors border border-amber-300"
              >
                <FileDown className="w-4 h-4 text-amber-700" />
                <span>Скачать исходный PDF-прайс (11 страниц)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Mirror */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Навигация
            </div>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <a href="#packages" className="hover:text-slate-900 transition-colors">
                  Решения под ключ
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-slate-900 transition-colors">
                  Шведский стол и калькулятор
                </a>
              </li>
              <li>
                <a href="#stages" className="hover:text-slate-900 transition-colors">
                  Ступени бизнеса
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-slate-900 transition-colors">
                  Кейсы и цифры
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-slate-900 transition-colors">
                  Порядок работы и NDA
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Прямая связь в Telegram
            </div>

            <div className="space-y-2 text-xs">
              {FOUNDERS.map((founder, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div>
                    <div className="text-slate-900 font-bold">{founder.name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{founder.telegram}</div>
                  </div>
                  <a
                    href={founder.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-amber-400 hover:text-slate-950 transition-colors border border-slate-200"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full mt-2 py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-2xs active:scale-[0.99] cursor-pointer"
            >
              Записаться на Разбор вдвоём (донат)
            </button>
          </div>

        </div>

        {/* Legal notice & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>
            © 2026 Кубышкин & Паринов. Все права защищены. Цены актуальны на октябрь 2026 года.
          </p>
          <p className="max-w-md text-center md:text-right">
            Точная стоимость услуг с диапазоном или пометкой «от» окончательно фиксируется в официальном договоре после проведения стартовой встречи.
          </p>
        </div>

      </div>
    </footer>
  );
};
