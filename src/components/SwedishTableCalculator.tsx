import React, { useState, useMemo } from 'react';
import { SERVICES, ServiceItem, TURNKEY_PACKAGES } from '../data/priceData';
import { 
  Calculator, Check, Copy, ExternalLink, Filter, HelpCircle, 
  Percent, RefreshCw, RotateCcw, Search, Send, Trash2, CheckCircle2,
  Printer, Clock, X, Sparkles
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
      ...selectedItemsList.map(item => `• ${item.number}. ${item.title}${item.variantLabel}: ${item.basePrice === 0 ? 'Донат' : formatMoney(item.activePrice)}`),
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
    <section id="calculator" className="py-20 border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Интерактивный шведский стол услуг</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Калькулятор стоимости и скидок
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Выбирайте точечные услуги под вашу текущую задачу или загрузите готовый комплект. Скидка рассчитывается автоматически по официальной системе лояльности (до −20% за объём + 5% постоянным клиентам).
          </p>
        </div>

        {/* Ready Presets Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-700 mr-1">Быстрый выбор пакета:</span>
          {TURNKEY_PACKAGES.map(pkg => (
            <button
              key={pkg.id}
              onClick={() => loadPackagePreset(pkg.id)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-300/80 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              + {pkg.title}
            </button>
          ))}
          <button
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Очистить выбор</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List: 16 Services (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between pb-4 border-b border-slate-200">
              
              {/* Category segmented filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto pb-1 sm:pb-1 scrollbar-none">
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
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Найти услугу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-250 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-2xs"
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
                    ? { badgeColor: 'text-blue-700 bg-blue-50 border-blue-200' }
                    : service.category === 'tools'
                    ? { badgeColor: 'text-amber-800 bg-amber-50 border-amber-200' }
                    : service.category === 'hiring'
                    ? { badgeColor: 'text-purple-700 bg-purple-50 border-purple-200' }
                    : { badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' };

                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-amber-50/30 border-2 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Checkbox button */}
                      <div 
                        className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center transition-all shrink-0 ${
                          isSelected 
                            ? 'bg-amber-400 text-slate-950 shadow-xs' 
                            : 'border-2 border-slate-300 bg-white text-transparent hover:border-slate-400'
                        }`}
                      >
                        <Check className={`w-4 h-4 stroke-[3] ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

                      {/* Content Area with guaranteed flex-1 min-w-0 */}
                      <div className="flex-1 min-w-0">
                        {/* Top Header Row with Title and Price */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${catStyle.badgeColor}`}>
                                {service.number} · {service.categoryLabel}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                              {service.title}
                            </h4>
                          </div>

                          {/* Price column on the right */}
                          <div className="sm:text-right shrink-0">
                            <div className="text-base sm:text-lg font-mono font-extrabold text-slate-900 whitespace-nowrap">
                              {service.priceDisplay}
                            </div>
                            {service.isMonthly && (
                              <div className="text-[11px] text-slate-500 font-medium">ежемесячно</div>
                            )}
                            {service.priceNote && (
                              <div className="text-[11px] text-slate-500 mt-0.5 sm:max-w-xs">{service.priceNote}</div>
                            )}
                          </div>
                        </div>

                        {/* Format & timing */}
                        <div className="text-xs text-slate-500 mb-2 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{service.format}</span>
                        </div>

                        {/* Description - spacious and readable */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                          {service.description}
                        </p>

                        {/* Deliverable result */}
                        <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="leading-snug">
                            <span className="font-bold text-emerald-950">Результат: </span>
                            <span>{service.result}</span>
                          </div>
                        </div>

                        {/* Variant Selector */}
                        {service.hasVariants && service.variants && isSelected && (
                          <div 
                            onClick={(e) => e.stopPropagation()} 
                            className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs"
                          >
                            <span className="text-slate-700 font-semibold">Выберите объём услуги:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {service.variants.map((v, vIdx) => (
                                <button
                                  key={vIdx}
                                  onClick={() => handleVariantChange(service.id, vIdx)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    selectedVariantIdx === vIdx
                                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                  }`}
                                >
                                  {v.label} — {formatMoney(v.price)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Sticky Summary & Loyalty Calculation (5 / 4 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-22">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Calculator className="w-4 h-4 text-amber-500" />
                  <span>Ваш расчёт</span>
                </div>
                <div className="text-xs font-mono text-slate-500 font-medium">
                  Выбрано: <span className="text-slate-900 font-bold">{count}</span> услуг
                </div>
              </div>

              {/* Selected items list snippet */}
              {selectedItemsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Отметьте необходимые услуги в списке слева или выберите готовый пакет выше
                </div>
              ) : (
                <div className="max-h-56 overflow-y-auto space-y-2 mb-4 pr-1">
                  {selectedItemsList.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-xs gap-2 py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group">
                      <div className="text-slate-700 line-clamp-1 flex-1 min-w-0 font-medium">
                        <span className="text-amber-600 font-mono font-bold mr-1.5">{item.number}</span>
                        <span>{item.title}</span>
                        {item.variantLabel && <span className="text-slate-400 text-[10px] block truncate">{item.variantLabel}</span>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-slate-900 font-bold text-right">
                          {item.basePrice === 0 ? 'Донат' : formatMoney(item.activePrice)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleService(item);
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Удалить из расчёта"
                          aria-label={`Удалить ${item.title}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Smart Loyalty Discount Next-Tier Progress Nudge */}
              {count > 0 && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <div className="text-amber-900 font-semibold">
                    {count === 1 && '💡 Добавьте ещё 1 услугу — включится скидка −5%'}
                    {count === 2 && '💡 Добавьте ещё 1 услугу — скидка вырастет до −8%'}
                    {count === 3 && '💡 Добавьте ещё 1 услугу — скидка вырастет до −12%'}
                    {count === 4 && '💡 Добавьте ещё 1 услугу — скидка вырастет до −15%!'}
                    {count >= 5 && '🔥 Максимальная скидка за объём (−15%) уже активна!'}
                  </div>
                </div>
              )}

              {/* Repeat Client Checkbox (+5% bonus from PDF) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-5">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRepeatClient}
                    onChange={(e) => setIsRepeatClient(e.target.checked)}
                    className="mt-0.5 rounded text-amber-500 focus:ring-0 bg-white border-slate-300 w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-slate-900">Повторный заказ / следующий месяц</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Дополнительная скидка −5% сверх текущей скидки по системе лояльности (макс. до −25%).
                    </p>
                  </div>
                </label>
              </div>

              {/* Loyalty Discount Tiers Visualizer with Gamified Progress */}
              <div className="mb-5 pb-5 border-b border-slate-100">
                <div className="text-xs text-slate-600 mb-2 flex justify-between font-medium">
                  <span className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Система лояльности:</span>
                  </span>
                  <span className="text-amber-700 font-extrabold bg-amber-100/70 px-2 py-0.5 rounded-full text-[11px]">
                    {totalDiscountPercent > 0 ? `Экономия −${totalDiscountPercent}%` : '0% скидка'}
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-1.5 text-[10px] text-center font-mono font-semibold mb-3">
                  <div className={`p-1.5 rounded-lg transition-all ${count === 1 ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs scale-105' : 'bg-slate-100 text-slate-500'}`}>
                    <div>1 усл.</div>
                    <div>0%</div>
                  </div>
                  <div className={`p-1.5 rounded-lg transition-all ${count === 2 ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs scale-105' : count > 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <div>2 усл.</div>
                    <div>−5%</div>
                  </div>
                  <div className={`p-1.5 rounded-lg transition-all ${count === 3 ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs scale-105' : count > 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <div>3 усл.</div>
                    <div>−8%</div>
                  </div>
                  <div className={`p-1.5 rounded-lg transition-all ${count === 4 ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs scale-105' : count > 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <div>4 усл.</div>
                    <div>−12%</div>
                  </div>
                  <div className={`p-1.5 rounded-lg transition-all ${count >= 5 ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs scale-105' : 'bg-slate-100 text-slate-500'}`}>
                    <div>5+ усл.</div>
                    <div>−15%</div>
                  </div>
                </div>

                {/* Gamified Next-Tier Incentive Tip */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 text-[11px] leading-snug text-slate-600">
                  {count === 0 && (
                    <span>💡 Выберите первую услугу для начала персонального расчета.</span>
                  )}
                  {count === 1 && (
                    <span className="text-amber-800 font-medium">🎯 Добавьте <b>еще 1 услугу</b>, чтобы активировать скидку <b>5%</b>!</span>
                  )}
                  {count === 2 && (
                    <span className="text-amber-800 font-medium">🚀 Скидка 5% уже активна! Добавьте еще 1 услугу для скидки <b>8%</b>.</span>
                  )}
                  {count === 3 && (
                    <span className="text-amber-800 font-medium">🔥 Отличный набор! Добавьте еще 1 модуль до выгоды <b>12%</b>.</span>
                  )}
                  {count === 4 && (
                    <span className="text-amber-800 font-medium">⚡ Еще всего 1 шаг до максимальной оптовой скидки <b>15%</b>!</span>
                  )}
                  {count >= 5 && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span>🏆 Поздравляем! Активирована максимальная скидка за объем 15%!</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Сумма по прайсу:</span>
                  <span className="font-mono text-slate-800 font-semibold">{formatMoney(baseSum)}</span>
                </div>

                {totalDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Скидка ({totalDiscountPercent}%):</span>
                    <span className="font-mono">−{formatMoney(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Итого к оплате:</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                      {formatMoney(finalSum)}
                    </span>
                    {totalDiscountPercent > 0 && (
                      <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
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
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Обсудить состав на встрече</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={openTelegramDirect}
                    disabled={count === 0}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                    <span>В Telegram</span>
                  </button>

                  <button
                    onClick={handleCopyEstimate}
                    disabled={count === 0}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedNotification ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Скопировать</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handlePrintEstimate}
                  disabled={count === 0}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 disabled:opacity-40 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Распечатать или сохранить в PDF для согласования"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Печать КП / сметы для партнёра</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Mobile Sticky Bottom Bar when services are selected */}
      {count > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-500">
              В расчете: <span className="text-slate-900 font-bold">{count}</span> усл. {totalDiscountPercent > 0 && <span className="text-amber-700 font-bold">(−{totalDiscountPercent}%)</span>}
            </div>
            <div className="text-base font-extrabold text-slate-900 font-mono">
              {formatMoney(finalSum)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenBookingWithServices(telegramSummaryText, finalSum)}
              className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Обсудить
            </button>
            <button
              onClick={openTelegramDirect}
              className="p-2 text-slate-700 bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              title="Открыть в Telegram"
            >
              <Send className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
