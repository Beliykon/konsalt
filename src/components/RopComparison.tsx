import React from 'react';
import { Check, X, ShieldAlert, Zap, ArrowRight } from 'lucide-react';

interface RopComparisonProps {
  onOpenBooking: () => void;
}

export const RopComparison: React.FC<RopComparisonProps> = ({ onOpenBooking }) => {
  const comparisonRows = [
    {
      criterion: 'Ежемесячный бюджет компании',
      inHouse: '220 000 – 500 000 ₽ / мес (оклад 150–350k + 43% страховые взносы и НДФЛ + рабочее место)',
      ropSharing: 'от 105 800 ₽ / мес (без зарплатных налогов, официальный расход юрлица, уменьшающий налог)',
      winner: 'sharing'
    },
    {
      criterion: 'Скорость включения в работу',
      inHouse: '2–3 месяца поисков на hh.ru + 1–2 месяца испытательного срока и адаптации',
      ropSharing: 'Старт через 3 дня после стартовой встречи и подписания NDA',
      winner: 'sharing'
    },
    {
      criterion: 'Экспертиза и состав команды',
      inHouse: '1 человек со своим субъективным опытом в 2–3 компаниях',
      ropSharing: 'Два действующих топ-руководителя: стратег по воронкам + операционный РОП с опытом в филиальных сетях',
      winner: 'sharing'
    },
    {
      criterion: 'Риск ошибки найма',
      inHouse: 'Если РОП не справился — потеряно 4–6 месяцев и от 800 000 ₽ бюджета',
      ropSharing: 'Оплата помесячная. Вы видите динамику выручки и дисциплины с первой недели',
      winner: 'sharing'
    },
    {
      criterion: 'Контроль стандартов и звонков',
      inHouse: 'Сам ставит задачи — сам перед собой отчитывается. Часто скрывает потери от владельца',
      ropSharing: 'Независимый аудит звонков и переписок по строгим чек-листам, еженедельные честные цифры собственнику',
      winner: 'sharing'
    },
    {
      criterion: 'Юридические обязательства',
      inHouse: 'Трудовой кодекс, больничные, отпуска, сложное расставание с выплатой окладов',
      ropSharing: 'Договор оказания услуг, работа по спринтам и понятным KPI',
      winner: 'sharing'
    }
  ];

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Сравнение моделей управления</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Штатный РОП в офис или РОП-шеринг?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Честный финансовый и управленческий расклад для собственника бизнеса, считающего деньги и время.
          </p>
        </div>

        {/* Table / Grid */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-1/4">Параметр сравнения</th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-5/12 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <span>Штатный руководитель в штате</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-5/12 text-amber-400 bg-amber-400/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>РОП-шеринг «Кубышкин & Паринов»</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-5 sm:px-6 font-semibold text-white align-top">
                      {row.criterion}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-400 align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                        <span>{row.inHouse}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-200 font-medium align-top leading-relaxed bg-amber-400/5">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-white">{row.ropSharing}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Reassurance Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-base font-bold text-white">
              Хотите протестировать формат без долгосрочных рисков?
            </div>
            <div className="text-xs text-slate-400">
              Начните с разового «Разбора вдвоём» за добровольный донат. Мы покажем точки роста до заключения договора.
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <span>Записаться на разбор</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
