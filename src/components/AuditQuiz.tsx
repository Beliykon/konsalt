import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, HelpCircle, Sparkles } from 'lucide-react';

interface AuditQuizProps {
  onSelectRecommendedService: (serviceCode: string) => void;
  onOpenBooking: () => void;
}

export const AuditQuiz: React.FC<AuditQuizProps> = ({
  onSelectRecommendedService,
  onOpenBooking
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      title: 'Как сейчас фиксируются лиды и разговоры с клиентами?',
      options: [
        { text: 'В блокнотах, личных чатах или памяти сотрудников', score: 3, pain: 'Лиды теряются безвозвратно' },
        { text: 'В таблицах Excel / Google Sheets, часть забывается', score: 2, pain: 'Нет автоматического контроля перезвонов' },
        { text: 'В CRM, но карточки заполняются как попало, задачи висят', score: 1, pain: 'Воронка течёт на этапах дожима' },
        { text: 'В настроенной CRM со строгим контролем каждого шага', score: 0, pain: 'Системный контур' }
      ]
    },
    {
      title: 'Что делает продавец, когда клиент говорит «Дорого» или «Я подумаю»?',
      options: [
        { text: 'Тушуется, соглашается и отпускает клиента с концами', score: 3, pain: 'Слив до 60% теплых обращений' },
        { text: 'Сразу просит у руководства скидку, роняя маржу бизнеса', score: 2, pain: 'Потеря маржинальности на ровном месте' },
        { text: 'Пытается спорить или давить, вызывая раздражение', score: 2, pain: 'Порча репутации компании' },
        { text: 'Спокойно отрабатывает возражения по регламенту и скрипту', score: 0, pain: 'Профессиональная аргументация' }
      ]
    },
    {
      title: 'Сколько времени занимает ввод нового продавца в строй?',
      options: [
        { text: 'Больше месяца в хаосе, и часто он сразу увольняется', score: 3, pain: 'Деньги и время на найм сгорают впустую' },
        { text: '2–3 недели, собственник сидит рядом и всё объясняет лично', score: 2, pain: 'Собственник работает бесплатным наставником' },
        { text: 'Около недели, есть разрозненные инструкции в Google Docs', score: 1, pain: 'Знания фрагментарны' },
        { text: '2–3 дня по интерактивной Книге продаж компании', score: 0, pain: 'Стандартизированный конвейер' }
      ]
    },
    {
      title: 'Кто осуществляет оперативное управление продажами?',
      options: [
        { text: 'Сам основатель по вечерам и выходным между объектами', score: 3, pain: 'Собственник — узкое горлышко бизнеса' },
        { text: 'Старший менеджер, который сам продаёт и не успевает контролировать', score: 2, pain: 'Конфликт интересов и расфокус' },
        { text: 'Штатный РОП, но планы не выполняются, а отчеты размыты', score: 2, pain: 'Переплата за неэффективный менеджмент' },
        { text: 'Системный руководитель с регулярными планёрками и аудитом звонков', score: 0, pain: 'Управляемый отдел' }
      ]
    }
  ];

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Finished
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  // Score calculation
  const totalScore = answers.reduce((acc, ansIdx, qIdx) => {
    return acc + (questions[qIdx]?.options[ansIdx]?.score || 0);
  }, 0);

  // Diagnosis logic
  let diagnosisTitle = '';
  let diagnosisDescription = '';
  let recommendedCode = '01';
  let recommendedName = 'Разбор вдвоём (за донат)';
  let leakRiskPercent = 85;

  if (totalScore >= 9) {
    diagnosisTitle = 'Критический уровень финансовых утечек';
    diagnosisDescription = 'Отдел продаж держится на героизме или случайностях. До 60–80% рекламного бюджета уходит конкурентам из-за отсутствия стандартов, скриптов и контроля звонков.';
    recommendedCode = 'diagnostics';
    recommendedName = 'Пакет «Диагностика под ключ» (от 30 800 ₽)';
    leakRiskPercent = 85;
  } else if (totalScore >= 5) {
    diagnosisTitle = 'Умеренные утечки: воронка работает нестабильно';
    diagnosisDescription = 'Базовые продажи есть, но собственник перегружен операционкой, а менеджеры работают вразнобой. При росте трафика система начинает сбоить.';
    recommendedCode = 'sales-system';
    recommendedName = 'Пакет «Отдел продаж под ключ» (от 63 400 ₽)';
    leakRiskPercent = 55;
  } else {
    diagnosisTitle = 'Хорошая база: фокус на масштабировании и контроле';
    diagnosisDescription = 'У вас выстроены базовые процессы. Главная точка роста — регулярный независимый контроль качества звонков и повышение среднего чека.';
    recommendedCode = 'rop-sharing';
    recommendedName = 'РОП-шеринг (от 105 800 ₽/мес)';
    leakRiskPercent = 25;
  }

  return (
    <section className="py-20 border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Экспресс-диагностика за 1 минуту</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Тест: где ваш отдел продаж теряет деньги?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Ответьте на 4 ключевых вопроса и узнайте степень управляемости отдела продаж и персональную рекомендацию по усилению.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          
          {currentStep < questions.length ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
                <span>Вопрос {currentStep + 1} из {questions.length}</span>
                <span className="text-amber-400 font-bold">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>

              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-8">
                <div 
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                {questions[currentStep].title}
              </h3>

              <div className="space-y-3">
                {questions[currentStep].options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className="w-full text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 hover:border-amber-400/60 border border-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-sm font-medium pr-4">
                      {option.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-2 animate-in fade-in duration-300">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-4 font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Оценка риска утечки лидов: ~{leakRiskPercent}%</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3">
                {diagnosisTitle}
              </h3>

              <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                {diagnosisDescription}
              </p>

              {/* Recommendation Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 mb-8 max-w-lg mx-auto text-left">
                <div className="text-xs text-amber-400 uppercase tracking-wider font-semibold mb-1">
                  Рекомендуемый первый шаг:
                </div>
                <div className="text-base font-bold text-white mb-2">
                  {recommendedName}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Начнём с детального разбора вашего процесса и покажем, какие 2–3 изменения дадут максимальный рост конверсии уже в первый месяц.
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Записаться на разбор (донат)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectRecommendedService(recommendedCode)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Открыть в прайсе
                  </button>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Пройти тест заново</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
