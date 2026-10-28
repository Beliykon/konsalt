/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TurnkeyPackages } from './components/TurnkeyPackages';
import { RopComparison } from './components/RopComparison';
import { ChatSimulator } from './components/ChatSimulator';
import { SwedishTableCalculator } from './components/SwedishTableCalculator';
import { RoiLeakCalculator } from './components/RoiLeakCalculator';
import { AuditQuiz } from './components/AuditQuiz';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { SegmentSelector } from './components/SegmentSelector';
import { CaseStudies } from './components/CaseStudies';
import { BonusWheel } from './components/BonusWheel';
import { SalesBookMatrix } from './components/SalesBookMatrix';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FoundersSection } from './components/FoundersSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ConfettiEffect } from './components/ConfettiEffect';
import { BookingModal } from './components/BookingModal';
import { FloatingTelegramBar } from './components/FloatingTelegramBar';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { MascotCompanion } from './components/MascotCompanion';
import { TurnkeyPackage } from './data/priceData';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalPackage, setModalPackage] = useState<TurnkeyPackage | null>(null);
  const [modalCalculatorSummary, setModalCalculatorSummary] = useState<string>('');
  const [modalCalculatorTotal, setModalCalculatorTotal] = useState<number>(0);
  const [selectedParentCodes, setSelectedParentCodes] = useState<string[]>([]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  const handleOpenGeneralBooking = () => {
    setModalPackage(null);
    setModalCalculatorSummary('');
    setModalCalculatorTotal(0);
    setIsBookingModalOpen(true);
  };

  const handleOpenPackageBooking = (pkg: TurnkeyPackage) => {
    setModalPackage(pkg);
    setModalCalculatorSummary('');
    setModalCalculatorTotal(pkg.basePrice);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithServices = (summary: string, total: number) => {
    setModalPackage(null);
    setModalCalculatorSummary(summary);
    setModalCalculatorTotal(total);
    setIsBookingModalOpen(true);
  };

  const handleSelectPackageInCalculator = (pkg: TurnkeyPackage) => {
    setSelectedParentCodes(pkg.serviceCodes);
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceOrPackageFromDecider = (target: string) => {
    if (target === '01') {
      setSelectedParentCodes(['01']);
    } else if (target === 'diagnostics') {
      setSelectedParentCodes(['01', '03', '04', '05']);
    } else if (target === 'sales-system') {
      setSelectedParentCodes(['06', '07', '08', '09']);
    } else if (target === 'rop-sharing') {
      setSelectedParentCodes(['03', '15', '16']);
    }
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCalculator = () => {
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSalesBook = () => {
    setSelectedParentCodes(['09']);
    handleScrollToCalculator();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      
      {/* Scroll Reading Progress Bar at the very top */}
      <ReadingProgressBar />

      {/* 3-Zone Top Bar with Interactive Mega-Menu */}
      <Header 
        onOpenBooking={handleOpenGeneralBooking} 
        onSelectPackage={handleSelectPackageInCalculator}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero 
          onOpenBooking={handleOpenGeneralBooking}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* 1.1 Live Continuous Marquee Ticker */}
        <MarqueeTicker />

        {/* 2. Turnkey Packages (Ready-made sets) */}
        <TurnkeyPackages 
          onSelectPackage={handleSelectPackageInCalculator}
          onOpenBookingForPackage={handleOpenPackageBooking}
        />

        {/* 2.1 Side-by-side Economics: In-House РОП vs РОП-шеринг */}
        <RopComparison 
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 2.2 Live Telegram Chat Simulator: Bad vs Good Sales Script */}
        <ChatSimulator 
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 3. Swedish Table Interactive Price Calculator */}
        <SwedishTableCalculator 
          onOpenBookingWithServices={handleOpenBookingWithServices}
          selectedIdsFromParent={selectedParentCodes}
        />

        {/* 4. Interactive ROI & Pipeline Leakage Calculator */}
        <RoiLeakCalculator 
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 4.1 Interactive Express Audit Quiz */}
        <AuditQuiz 
          onSelectRecommendedService={handleSelectServiceOrPackageFromDecider}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 4.2 Interactive Drag Comparison Slider: Chaos vs System */}
        <BeforeAfterSlider />

        {/* 5. Business Stages & "Where to start" Navigator */}
        <SegmentSelector 
          onSelectServiceOrPackage={handleSelectServiceOrPackageFromDecider}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 6. Case Studies in Hard Figures (4 Stages) */}
        <CaseStudies 
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 6.1 Interactive Bonus Roulette Wheel with Confetti on Win */}
        <BonusWheel 
          onOpenBooking={handleOpenGeneralBooking}
          onWinBonus={triggerConfetti}
        />

        {/* 7. Service 09 Feature: Sales Book Value Matrix */}
        <SalesBookMatrix 
          onSelectSalesBook={handleSelectSalesBook}
        />

        {/* 8. 7-Step Transparent Process & NDA */}
        <ProcessTimeline 
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 9. Founders Spotlight */}
        <FoundersSection 
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenGeneralBooking} />

      {/* Floating Telegram Quick Contact Widget (bottom right) */}
      <FloatingTelegramBar onOpenBooking={handleOpenGeneralBooking} />

      {/* Animated Mascot Companion "РОПик" (bottom left) */}
      <MascotCompanion 
        onOpenBooking={handleOpenGeneralBooking}
        onScrollToCalculator={handleScrollToCalculator}
        onSelectPackage={handleSelectPackageInCalculator}
      />

      {/* Canvas Physics Confetti Blast */}
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Universal Booking / Order Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={modalPackage}
        calculatorSummary={modalCalculatorSummary}
        calculatorTotal={modalCalculatorTotal}
        onSubmitSuccess={triggerConfetti}
      />

    </div>
  );
}
