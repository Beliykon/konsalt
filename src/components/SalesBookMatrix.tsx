import React from 'react';
import { SALES_BOOK_BENEFITS } from '../data/priceData';
import { BookOpen, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface SalesBookMatrixProps {
  onSelectSalesBook: () => void;
}

export const SalesBookMatrix: React.FC<SalesBookMatrixProps> = ({ onSelectSalesBook }) => {
  return (
    <section className="py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Флагманский инструмент · Услуга 09</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Зачем компании нужна Книга продаж?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Главная причина нестабильной выручки — когда методики хранятся в головах отдельных сотрудников, а не в системном цифровом активе компании.
            </p>
          </div>

          <button
            onClick={onSelectSalesBook}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>Выбрать Книгу продаж в прайсе</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-1/4">Ценность для бизнеса</th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-1/3 text-rose-700">Какую проблему закрывает</th>
                  <th scope="col" className="py-4 px-5 sm:px-6 w-5/12 text-emerald-800">Что вы получаете на выходе</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SALES_BOOK_BENEFITS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 sm:px-6 font-bold text-slate-900 align-top">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />
                        <span>{item.value}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-slate-600 align-top leading-relaxed">
                      {item.problem}
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-emerald-900 font-semibold align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
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
