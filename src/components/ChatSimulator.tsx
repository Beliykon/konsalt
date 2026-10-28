import React, { useState, useEffect } from 'react';
import { MessageSquare, RotateCcw, XCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const ChatSimulator: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'bad' | 'good'>('good');
  const [visibleMessagesCount, setVisibleMessagesCount] = useState<number>(1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const badDialogue = [
    {
      sender: 'client',
      text: 'Здравствуйте! Подскажите, сколько стоит дизайн-проект 3-комнатной квартиры 85 кв.м?',
      time: '14:20'
    },
    {
      sender: 'manager',
      text: 'Здравствуйте. Полный проект стоит 25 000 руб за комнату или 2 500 руб/метр.',
      time: '17:45 (через 3.5 часа!)',
      note: 'Опоздали с ответом + назвали голую цену без выявления потребностей и ценности'
    },
    {
      sender: 'client',
      text: 'Понятно, спасибо, подумаем.',
      time: '17:46'
    },
    {
      sender: 'system',
      text: '❌ Клиент ушёл к конкуренту, который перезвонил за 5 минут. Потеряно: 212 500 ₽ выручки.',
      time: ''
    }
  ];

  const goodDialogue = [
    {
      sender: 'client',
      text: 'Здравствуйте! Подскажите, сколько стоит дизайн-проект 3-комнатной квартиры 85 кв.м?',
      time: '14:20'
    },
    {
      sender: 'manager',
      text: 'Добрый день! Меня зовут Евгений, студия интерьеров. С удовольствием подскажу по стоимости. 85 кв.м — отличная площадь! Скажите, это новостройка или вторичка, и планируете ли перепланировку?',
      time: '14:22 (через 2 минуты)',
      note: 'Мгновенный контакт + захват инициативы + лёгкий квалификационный вопрос'
    },
    {
      sender: 'client',
      text: 'Новостройка со свободной планировкой. Хотим объединить кухню с гостиной, но боимся нарушить нормы.',
      time: '14:25'
    },
    {
      sender: 'manager',
      text: 'Понял задачу! По нормам согласуем без проблем. У нас вилка проектов от 1 800 до 2 600 ₽/м² в зависимости от сложности 3D и чертежей. Чтобы не гадать, давайте я подключу нашего ведущего архитектора на 15 минут в Zoom — глянем план БТИ, покажем 2 похожих готовых кейса в вашем ЖК и назовем точную смету. Вам завтра в 11:30 или в 16:00 удобнее?',
      time: '14:27',
      note: 'Озвучена вилка + снят страх согласования + продажа следующего легкого шага'
    },
    {
      sender: 'client',
      text: 'Давайте завтра в 11:30! План как раз под рукой. Спасибо большое за оперативность!',
      time: '14:29'
    },
    {
      sender: 'system',
      text: '✅ Сделка закрыта на встречу с 80% вероятностью оплаты. Конверсия выросла в 5 раз!',
      time: ''
    }
  ];

  const currentDialogue = activeTab === 'bad' ? badDialogue : goodDialogue;

  // Auto-play dialogue messages with typing effect
  useEffect(() => {
    setVisibleMessagesCount(1);
    setIsTyping(false);
    setIsPlaying(true);
  }, [activeTab]);

  useEffect(() => {
    if (!isPlaying) return;

    if (visibleMessagesCount < currentDialogue.length) {
      const nextMsg = currentDialogue[visibleMessagesCount];
      const typingDelay = nextMsg.sender === 'system' ? 700 : 1200;

      const timer1 = setTimeout(() => {
        setIsTyping(true);
      }, 500);

      const timer2 = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessagesCount(prev => prev + 1);
      }, 500 + typingDelay);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setIsPlaying(false);
    }
  }, [visibleMessagesCount, isPlaying, currentDialogue]);

  const restart = () => {
    setVisibleMessagesCount(1);
    setIsTyping(false);
    setIsPlaying(true);
  };

  return (
    <section id="simulator" className="py-20 border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Интерактивный симулятор переписки</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Как скрипт спасает переписку от слива
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Посмотрите в реальном времени, почему клиенты читают сообщение и молчат — и как правильный алгоритм переводит холодный вопрос в согласованную встречу за 7 минут.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-100 border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('bad')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bad'
                  ? 'bg-rose-100 text-rose-900 border border-rose-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Типичный слив (96% компаний)</span>
            </button>

            <button
              onClick={() => setActiveTab('good')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'good'
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>По скрипту Кубышкина & Паринова (+20% конверсии)</span>
            </button>
          </div>
        </div>

        {/* Simulator Device Frame */}
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Messenger Header Bar */}
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-extrabold text-slate-950 text-xs shadow-xs">
                КП
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Отдел продаж</span>
                  {activeTab === 'good' ? (
                    <span className="text-[10px] text-emerald-700 font-semibold">● онлайн (ответ за 2 мин)</span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-normal">был в сети давно</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500">
                  {activeTab === 'good' ? 'Стандарт конверсии: 20%' : 'Стандарт: «отвечаю когда успею»'}
                </div>
              </div>
            </div>

            <button
              onClick={restart}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 transition-colors p-1"
              title="Запустить анимацию заново"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Заново</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 sm:p-6 space-y-4 min-h-[360px] bg-slate-50/50 flex flex-col justify-start">
            {currentDialogue.slice(0, visibleMessagesCount).map((msg, idx) => {
              if (msg.sender === 'system') {
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl text-xs font-bold text-center border animate-in fade-in duration-300 ${
                      activeTab === 'good'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}
                  >
                    {msg.text}
                  </div>
                );
              }

              const isClient = msg.sender === 'client';

              return (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] sm:max-w-[75%] animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                    isClient ? 'self-start items-start' : 'self-end items-end'
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isClient
                        ? 'bg-white text-slate-900 rounded-bl-xs border border-slate-200'
                        : activeTab === 'good'
                        ? 'bg-amber-400 text-slate-950 font-medium rounded-br-xs shadow-amber-500/10'
                        : 'bg-slate-200 text-slate-900 rounded-br-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 px-1">
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>

                  {msg.note && (
                    <div
                      className={`text-[11px] p-2 rounded-lg mt-1 max-w-full font-medium ${
                        activeTab === 'good'
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border border-rose-200 text-rose-900'
                      }`}
                    >
                      {activeTab === 'good' ? '💡 Фишка скрипта: ' : '⚠️ Ошибка: '}
                      {msg.note}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-end flex items-center gap-1 bg-amber-100/70 border border-amber-300/80 px-3 py-2 rounded-2xl rounded-br-xs text-xs text-amber-900">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] font-semibold">печатает ответ...</span>
              </div>
            )}
          </div>

          {/* Footer Bar with CTA */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 text-center sm:text-left">
              Хотите такой же скрипт под ваш продукт и средний чек?
            </span>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <span>Заказать аудит переписок (04)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
