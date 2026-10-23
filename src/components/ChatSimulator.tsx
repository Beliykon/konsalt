import React, { useState, useEffect } from 'react';
import { MessageSquare, Play, RotateCcw, CheckCheck, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

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
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessagesCount(prev => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [visibleMessagesCount, isPlaying, currentDialogue.length]);

  const restart = () => {
    setVisibleMessagesCount(1);
    setIsPlaying(true);
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950/60 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Интерактивный симулятор в реальном времени</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Почувствуйте разницу за 30 секунд
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Посмотрите, как один и тот же вопрос о цене превращается либо в потерю 200 000 ₽, либо в подписанный контракт.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
            <button
              onClick={() => setActiveTab('bad')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bad'
                  ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Типичный слив переписки (96% компаний)</span>
            </button>

            <button
              onClick={() => setActiveTab('good')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'good'
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/60 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>По скрипту Кубышкина & Паринова (конверсия 20%)</span>
            </button>
          </div>
        </div>

        {/* Simulator Device Frame */}
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Messenger Header Bar */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-xs shadow">
                КП
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Отдел продаж</span>
                  {activeTab === 'good' ? (
                    <span className="text-[10px] text-emerald-400 font-normal">● онлайн (ответ за 2 мин)</span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-normal">был в сети давно</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400">
                  {activeTab === 'good' ? 'Стандарт конверсии: 20%' : 'Стандарт: «отвечаю когда успею»'}
                </div>
              </div>
            </div>

            <button
              onClick={restart}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors p-1"
              title="Запустить анимацию заново"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Заново</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 sm:p-6 space-y-4 min-h-[360px] bg-slate-950/40 flex flex-col justify-start">
            {currentDialogue.slice(0, visibleMessagesCount).map((msg, idx) => {
              if (msg.sender === 'system') {
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl text-xs font-bold text-center border animate-in fade-in duration-300 ${
                      activeTab === 'good'
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
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
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                      isClient
                        ? 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700/60'
                        : activeTab === 'good'
                        ? 'bg-amber-400 text-slate-950 font-medium rounded-br-sm shadow-amber-500/10'
                        : 'bg-slate-800 text-slate-200 rounded-br-sm border border-slate-700/60'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 px-1">
                    <span>{msg.time}</span>
                    {!isClient && <CheckCheck className="w-3 h-3 text-amber-400" />}
                  </div>

                  {msg.note && (
                    <div className="mt-1 text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-800/40 px-2 py-1 rounded-md">
                      💡 {msg.note}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-end bg-slate-800 text-slate-400 text-xs px-3.5 py-2 rounded-2xl rounded-br-sm flex items-center gap-1.5 animate-pulse">
                <span>печатает</span>
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-200" />
              </div>
            )}
          </div>

          {/* Bottom Card Action */}
          <div className="bg-slate-900 p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400">
              Хотите такой же конверсионный скрипт под вашу сферу?
            </div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 py-2 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Внедрить скрипт</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
