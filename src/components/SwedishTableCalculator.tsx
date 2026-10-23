import React, { useState, useMemo } from 'react';
import { SERVICES, ServiceItem, TURNKEY_PACKAGES } from '../data/priceData';
import { 
  Calculator, Check, Copy, ExternalLink, Filter, HelpCircle, 
  Percent, RefreshCw, RotateCcw, Search, Send, Trash2, CheckCircle2,
  Printer
} from 'lucide-react';

interface SelectedServiceState {
  serviceId: string;
  selectedVariantIdx?: number;
}

interface SwedishTableCalculatorProps {
  onOpenBookingWithServices: (servicesSummary: string, total: number) => void;
  selectedIdsFromParent?: string[];
}

export const SwedishTableCalculator: React.FC<SwedishTableCalculatorProps> = ({
  onOpenBookingWithServices,
  selectedIdsFromParent
}) => {
  const [selectedServices, setSelectedServices] = useState<Record<string, SelectedServiceState>>({
    '01': { serviceId: '01' },
    '04': { serviceId: '04' }
  });
  const [isRepeatClient, setIsRepeatClient] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Sync if parent requested package selection
  React.useEffect(() => {
    if (selectedIdsFromParent && selectedIdsFromParent.length > 0) {
      const nextSelected: Record<string, SelectedServiceState> = {};
      selectedIdsFromParent.forEach(id => {
        nextSelected[id] = { serviceId: id, selectedVariantIdx: 1 };
      });
      setSelectedServices(nextSelected);
    }
  }, [selectedIdsFromParent]);

  // Toggle selection
  const toggleService = (service: ServiceItem) => {
    setSelectedServices(prev => {
      const next = { ...prev };
      if (next[service.id]) {
        delete next[service.id];
      } else {
        next[service.id] = {
          serviceId: service.id,
          selectedVariantIdx: service.variants ? 1 : undefined
        };
      }
      return next;
    });
  };

  // Change variant
  const handleVariantChange = (serviceId: string, variantIdx: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        serviceId,
        selectedVariantIdx: variantIdx
      }
    }));
  };

  // Quick preset loading
  const loadPackagePreset = (packageId: string) => {
    const pkg = TURNKEY_PACKAGES.find(p => p.id === packageId);
    if (!pkg) return;
    const nextSelected: Record<string, SelectedServiceState> = {};
    pkg.serviceCodes.forEach(code => {
      nextSelected[code] = { serviceId: code, selectedVariantIdx: 1 };
    });
    setSelectedServices(nextSelected);
  };

  const clearAll = () => {
    setSelectedServices({});
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    return SERVICES.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.result.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Calculation logic strictly matching page 4 of the PDF
  const { count, baseSum, volumeDiscountPercent, repeatBonusPercent, totalDiscountPercent, discountAmount, finalSum, selectedItemsList } = useMemo(() => {
    const items = Object.values(selectedServices).map(sel => {
      const svc = SERVICES.find(s => s.id === sel.serviceId);
      if (!svc) return null;
      let price = svc.basePrice;
      let variantLabel = '';
      if (svc.variants && sel.selectedVariantIdx !== undefined && svc.variants[sel.selectedVariantIdx]) {
        price = svc.variants[sel.selectedVariantIdx].price;
        variantLabel = ` (${svc.variants[sel.selectedVariantIdx].label})`;
      }
      return {
        ...svc,
        activePrice: price,
        variantLabel
      };
    }).filter(Boolean) as (ServiceItem & { activePrice: number; variantLabel: string })[];

    const count = items.length;
    const baseSum = items.reduce((acc, curr) => acc + curr.activePrice, 0);

    // Discount scale from PDF:
    // 1 item = 0%
    // 2 items = -5%
    // 3 items = -8%
    // 4 items = -12%
    // 5+ items = -15%
    let volumeDiscount = 0;
    if (count === 2) volumeDiscount = 5;
    else if (count === 3) volumeDiscount = 8;
    else if (count === 4) volumeDiscount = 12;
    else if (count >= 5) volumeDiscount = 15;

    const repeatBonus = isRepeatClient ? 5 : 0;
    const totalDiscountPercent = Math.min(volumeDiscount + repeatBonus, 25);

    const discountAmount = Math.round((baseSum * totalDiscountPercent) / 100);
    const finalSum = baseSum - discountAmount;

    return {
      count,
      baseSum,
      volumeDiscountPercent: volumeDiscount,
      repeatBonusPercent: repeatBonus,
      totalDiscountPercent,
      discountAmount,
      finalSum,
      selectedItemsList: items
    };
  }, [selectedServices, isRepeatClient]);

  // Format currency
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('ru-RU').format(val) + ' ₽';
  };

  // Generate Telegram message
  const telegramSummaryText = useMemo(() => {
    if (selectedItemsList.length === 0) return '';
    const lines = [
      'Здравствуйте, Евгений и Роман!',
      'Я составил расчет услуг на сайте:',
      ...selectedItemsList.map(item => `• ${item.number}. ${item.title}${item.variantLabel}: ${formatMoney(item.activePrice)}`),
      '',
      `Итого по прайсу: ${formatMoney(baseSum)}`,
      totalDiscountPercent > 0 ? `Скидка по системе лояльности: −${totalDiscountPercent}% (${formatMoney(discountAmount)})` : null,
      `Итоговая стоимость: ${formatMoney(finalSum)}`,
      '',
      'Хочу обсудить этот состав на встрече.'
    ].filter(Boolean);
    return lines.join('\n');
  }, [selectedItemsList, baseSum, totalDiscountPercent, discountAmount, finalSum]);

  const handleCopyEstimate = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(telegramSummaryText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const openTelegramDirect = () => {
    const encoded = encodeURIComponent(telegramSummaryText);
    window.open(`https://t.me/Beliykon1987?text=${encoded}`, '_blank');
  };

  const handlePrintEstimate = () => {
    window.print();
  };

  return (
    <section id="calculator" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            Интерактивный шведский стол
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Калькулятор стоимости услуг
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Выбирайте точечные услуги под вашу текущую задачу или загрузите готовый комплект. Скидка рассчитывается автоматически по официальной системе лояльности.
          </p>
        </div>

        {/* Ready Presets Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 mr-1">Быстрый выбор:</span>
          {TURNKEY_PACKAGES.map(pkg => (
            <button
              key={pkg.id}
              onClick={() => loadPackagePreset(pkg.id)}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-950 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            >
              + {pkg.title}
            </button>
          ))}
          <button
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Очистить</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List: 16 Services (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between pb-4 border-b border-slate-800">
              
              {/* Category segmented filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'Все (16)' },
                  { id: 'audit', label: 'Аудит (01–05)' },
                  { id: 'tools', label: 'Системы (06–09)' },
                  { id: 'hiring', label: 'Найм (10–14)' },
                  { id: 'management', label: 'РОП (15–16)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Найти услугу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

            </div>

            {/* List of services */}
            <div className="space-y-3">
              {filteredServices.map(service => {
                const isSelected = !!selectedServices[service.id];
                const selectedVariantIdx = selectedServices[service.id]?.selectedVariantIdx ?? 0;

                const catStyle = 
                  service.category === 'audit'
                    ? { numColor: 'text-cyan-400', badgeColor: 'text-cyan-300 bg-cyan-950/50 border-cyan-800/40' }
                    : service.category === 'tools'
                    ? { numColor: 'text-amber-400', badgeColor: 'text-amber-300 bg-amber-950/50 border-amber-800/40' }
                    : service.category === 'hiring'
                    ? { numColor: 'text-purple-400', badgeColor: 'text-purple-300 bg-purple-950/50 border-purple-800/40' }
                    : { numColor: 'text-emerald-400', badgeColor: 'text-emerald-300 bg-emerald-950/50 border-emerald-800/40' };

                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-slate-900/90 border-amber-400/80 shadow-md shadow-amber-500/5'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      
                      {/* Left: Checkbox + Service title & details */}
                      <div className="flex items-start gap-3.5">
                        <div 
                          className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                            isSelected 
                              ? 'bg-amber-400 text-slate-950' 
                              : 'border border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`font-mono text-xs font-bold ${catStyle.numColor}`}>{service.number}</span>
                            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                              {service.title}
                            </h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${catStyle.badgeColor}`}>
                              {service.categoryLabel}
                            </span>
                          </div>

                          <div className="text-xs text-slate-400 mb-2">
                            {service.format}
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed mb-2">
                            {service.description}
                          </p>

                          <div className="text-xs text-emerald-400/90 font-medium">
                            Результат: {service.result}
                          </div>
                        </div>
                      </div>

                      {/* Right: Price */}
                      <div className="text-right shrink-0">
                        <div className="text-sm sm:text-base font-mono font-bold text-white whitespace-nowrap">
                          {service.priceDisplay}
                        </div>
                        {service.isMonthly && (
                          <div className="text-[11px] text-slate-500">ежемесячно</div>
                        )}
                      </div>

                    </div>

                    {/* Variant dropdown if hasVariants and is selected */}
                    {service.hasVariants && service.variants && isSelected && (
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs"
                      >
                        <span className="text-slate-400">Выберите объём:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.variants.map((v, vIdx) => (
                            <button
                              key={vIdx}
                              onClick={() => handleVariantChange(service.id, vIdx)}
                              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                                selectedVariantIdx === vIdx
                                  ? 'bg-amber-400 text-slate-950 font-semibold'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {v.label} — {formatMoney(v.price)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Sticky Summary & Loyalty Calculation (5 / 4 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-22">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Ваш расчёт</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Выбрано: <span className="text-amber-400 font-bold">{count}</span> услуг
                </div>
              </div>

              {/* Selected items list snippet */}
              {selectedItemsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  Отметьте необходимые услуги в списке слева или выберите готовый пакет выше
                </div>
              ) : (
                <div className="max-h-56 overflow-y-auto space-y-2 mb-5 pr-1">
                  {selectedItemsList.map(item => (
                    <div key={item.id} className="flex items-start justify-between text-xs gap-2 py-1 border-b border-slate-800/50">
                      <div className="text-slate-300 line-clamp-1">
                        <span className="text-amber-400 font-mono mr-1">{item.number}</span>
                        {item.title}
                        {item.variantLabel && <span className="text-slate-500 text-[10px] block">{item.variantLabel}</span>}
                      </div>
                      <div className="font-mono text-slate-200 shrink-0 font-medium">
                        {item.basePrice === 0 ? 'Донат' : formatMoney(item.activePrice)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Repeat Client Checkbox (+5% bonus from PDF) */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRepeatClient}
                    onChange={(e) => setIsRepeatClient(e.target.checked)}
                    className="mt-0.5 rounded text-amber-400 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-white">Повторный заказ / следующий месяц</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Дополнительная скидка −5% сверх текущей скидки по системе лояльности (макс. до −25%).
                    </p>
                  </div>
                </label>
              </div>

              {/* Loyalty Discount Tiers Visualizer */}
              <div className="mb-5 pb-5 border-b border-slate-800">
                <div className="text-xs text-slate-400 mb-2 flex justify-between">
                  <span>Система лояльности:</span>
                  <span className="text-amber-400 font-bold">
                    {totalDiscountPercent > 0 ? `−${totalDiscountPercent}%` : '0%'}
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-mono">
                  <div className={`p-1.5 rounded ${count === 1 ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' : 'bg-slate-950 text-slate-500'}`}>
                    <div>1 усл.</div>
                    <div>0%</div>
                  </div>
                  <div className={`p-1.5 rounded ${count === 2 ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' : 'bg-slate-950 text-slate-500'}`}>
                    <div>2 усл.</div>
                    <div>−5%</div>
                  </div>
                  <div className={`p-1.5 rounded ${count === 3 ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' : 'bg-slate-950 text-slate-500'}`}>
                    <div>3 усл.</div>
                    <div>−8%</div>
                  </div>
                  <div className={`p-1.5 rounded ${count === 4 ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' : 'bg-slate-950 text-slate-500'}`}>
                    <div>4 усл.</div>
                    <div>−12%</div>
                  </div>
                  <div className={`p-1.5 rounded ${count >= 5 ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30' : 'bg-slate-950 text-slate-500'}`}>
                    <div>5+ усл.</div>
                    <div>−15%</div>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Сумма по прайсу:</span>
                  <span className="font-mono text-slate-200">{formatMoney(baseSum)}</span>
                </div>

                {totalDiscountPercent > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Скидка ({totalDiscountPercent}%):</span>
                    <span className="font-mono">−{formatMoney(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Итого:</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {formatMoney(finalSum)}
                    </span>
                    {totalDiscountPercent > 0 && (
                      <div className="text-[10px] text-emerald-400">
                        Вы экономите {formatMoney(discountAmount)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() => onOpenBookingWithServices(telegramSummaryText, finalSum)}
                  disabled={count === 0}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Обсудить состав на встрече</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={openTelegramDirect}
                    disabled={count === 0}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>В Telegram</span>
                  </button>

                  <button
                    onClick={handleCopyEstimate}
                    disabled={count === 0}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedNotification ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Скопировать</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handlePrintEstimate}
                  disabled={count === 0}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-950 disabled:opacity-40 border border-slate-800/80 rounded-lg transition-colors cursor-pointer"
                  title="Распечатать или сохранить в PDF для согласования"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Печать КП / сметы для партнёра</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Mobile Sticky Bottom Bar when services are selected */}
      {count > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-400">
              В расчете: <span className="text-white font-bold">{count}</span> усл. {totalDiscountPercent > 0 && <span className="text-amber-400 font-bold">(−{totalDiscountPercent}%)</span>}
            </div>
            <div className="text-base font-extrabold text-white font-mono">
              {formatMoney(finalSum)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenBookingWithServices(telegramSummaryText, finalSum)}
              className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              Обсудить
            </button>
            <button
              onClick={openTelegramDirect}
              className="p-2 text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="Открыть в Telegram"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
