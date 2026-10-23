import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { TurnkeyPackage } from '../data/priceData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: TurnkeyPackage | null;
  calculatorSummary?: string;
  calculatorTotal?: number;
  onSubmitSuccess?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  calculatorSummary,
  calculatorTotal,
  onSubmitSuccess
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [teamSize, setTeamSize] = useState('1–3 менеджера');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setIsSubmitted(true);
    if (onSubmitSuccess) onSubmitSuccess();
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const generatedTelegramText = () => {
    let subject = 'Заявка на Разбор вдвоём (за донат)';
    if (selectedPackage) {
      subject = `Заявка на пакет «${selectedPackage.title}» (${selectedPackage.priceText})`;
    } else if (calculatorSummary) {
      subject = `Заявка по калькулятору (сумма: ${calculatorTotal ? new Intl.NumberFormat('ru-RU').format(calculatorTotal) + ' ₽' : 'по прайсу'})`;
    }

    const lines = [
      `Здравствуйте! Меня зовут ${name}.`,
      `Тема: ${subject}`,
      `Сфера бизнеса: ${businessType || 'Не указана'}`,
      `Команда: ${teamSize}`,
      notes ? `Что беспокоит: ${notes}` : null,
      calculatorSummary ? `\nДетализация выбранных услуг:\n${calculatorSummary}` : null,
      `\nМой контакт: ${contact}`
    ].filter(Boolean);

    return encodeURIComponent(lines.join('\n'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {selectedPackage 
                  ? 'Выбран пакет услуг' 
                  : calculatorSummary 
                  ? 'Индивидуальный расчет' 
                  : 'Стартовая сессия'}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedPackage 
                  ? selectedPackage.title 
                  : calculatorSummary 
                  ? 'Обсудить расчёт услуг' 
                  : 'Записаться на Разбор вдвоём'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {selectedPackage
                  ? selectedPackage.subtitle
                  : '40–60 минут онлайн. Находим узкие места отдела продаж и даём 1 конкретный следующий шаг. Оплата — добровольный донат.'}
              </p>
            </div>

            {/* Calculated estimate badge if present */}
            {calculatorTotal && calculatorTotal > 0 && !selectedPackage && (
              <div className="p-3 rounded-xl bg-slate-950 border border-amber-400/30 mb-5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Сумма по вашему расчету:</span>
                <span className="font-mono text-sm font-bold text-amber-400">
                  {new Intl.NumberFormat('ru-RU').format(calculatorTotal)} ₽
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ваше имя: <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Константин"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Telegram или телефон: <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username или +7 (999) 000-00-00"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Чем занимается бизнес:
                  </label>
                  <input
                    type="text"
                    placeholder="Например: мебель на заказ"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Сколько менеджеров:
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="Работаю один">Работаю один / Эксперт</option>
                    <option value="1–2 менеджера">1–2 продавца</option>
                    <option value="3–5 менеджеров">3–5 продавцов</option>
                    <option value="6–10 менеджеров">6–10 продавцов</option>
                    <option value="Больше 10 менеджеров / филиалы">Больше 10 / филиалы</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Что беспокоит сильнее всего (кратко):
                </label>
                <textarea
                  rows={2}
                  placeholder="Сливают лиды после цены, план не выполняется, не успеваю контролировать..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Отправить заявку</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Строгая конфиденциальность. Никакого спама.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Заявка успешно принята!
            </h3>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed max-w-sm mx-auto">
              Спасибо, {name}! Мы свяжемся с вами в течение рабочего дня для согласования удобного времени созвона.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-left text-xs space-y-2">
              <div className="font-semibold text-slate-300">
                Хотите начать диалог прямо сейчас без ожидания?
              </div>
              <p className="text-slate-400">
                Нажмите на кнопку ниже, чтобы сразу открыть переписку в Telegram с готовым текстом:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <a
                href={`https://t.me/Beliykon1987?text=${generatedTelegramText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Написать Евгению</span>
              </a>

              <a
                href={`https://t.me/beckham0503?text=${generatedTelegramText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Написать Роману</span>
              </a>
            </div>

            <button
              onClick={handleResetAndClose}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Закрыть окно
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
