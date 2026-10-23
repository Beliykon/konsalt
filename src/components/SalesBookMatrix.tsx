import React from 'react';
import { SALES_BOOK_BENEFITS } from '../data/priceData';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface SalesBookMatrixProps {
  onSelectSalesBook: () => void;
}

export const SalesBookMatrix: React.FC<SalesBookMatrixProps> = ({ onSelectSalesBook }) => {
  return (
    <section className="py-20 bg-slate-900/30 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Флагманский инструмент · Услуга 09</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Зачем компании нужна Книга продаж?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Главная причина нестабильной выручки — когда методики хранятся в головах отдельных сотрудников, а не в системном активе компании.
            </p>
          </div>

          <button
            onClick={onSelectSalesBook}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>Выбрать Книгу продаж в прайсе</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-1/4">Ценность для бизнеса</th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-1/3 text-rose-400">Какую проблему закрывает</th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-5/12 text-emerald-400">Что вы получаете на выходе</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {SALES_BOOK_BENEFITS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-5 sm:px-6 font-semibold text-white align-top">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                        <span>{item.value}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-300 align-top leading-relaxed">
                      {item.problem}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-emerald-300 font-medium align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item.outcome}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
