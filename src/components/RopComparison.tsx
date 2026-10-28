import React from 'react';
import { Check, X, Zap, ArrowRight } from 'lucide-react';

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
    <section id="rop-comparison" className="py-20 border-b border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Сравнение моделей управления</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Штатный РОП в штат или РОП-шеринг?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Честный финансовый и управленческий расклад для собственника бизнеса, считающего деньги и время.
          </p>
        </div>

        {/* Table / Grid */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-1/4">Параметр сравнения</th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-5/12 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Штатный руководитель в штате</span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-5/12 text-slate-900 bg-amber-50/60 font-extrabold border-l border-amber-200/50">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>РОП-шеринг «Кубышкин & Паринов»</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 sm:px-6 font-bold text-slate-900 align-top">
                      {row.criterion}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-600 align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <span>{row.inHouse}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-900 font-semibold align-top leading-relaxed bg-amber-50/30 border-l border-amber-200/40">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{row.ropSharing}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Reassurance Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-base font-bold text-slate-900">
              Хотите протестировать формат без долгосрочных рисков?
            </div>
            <div className="text-xs text-slate-600">
              Начните с разового «Разбора вдвоём» за добровольный донат. Мы покажем точки роста до заключения договора.
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer shrink-0"
          >
            <span>Записаться на разбор</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
