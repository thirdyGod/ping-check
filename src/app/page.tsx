'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MoodKey, MoodQuote, MoodQuotesRegistry } from '@/lib/types';
import moodQuotesData from '@/data/moodQuotes.json';
import { MoodSelector } from '@/components/MoodSelector';
import { QuoteDisplay } from '@/components/QuoteDisplay';
import { BreathingPacer } from '@/components/BreathingPacer';
import { VentSpace } from '@/components/VentSpace';
import { SupportDrawer } from '@/components/SupportDrawer';
import { Toast } from '@/components/Toast';

const defaultQuotes = moodQuotesData as MoodQuotesRegistry;

export default function HomePage() {
  const [quotesRegistry, setQuotesRegistry] = useState<MoodQuotesRegistry>(defaultQuotes);
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);
  const [selectedMoodLabel, setSelectedMoodLabel] = useState<string>('');
  const [quoteData, setQuoteData] = useState<MoodQuote | null>(null);

  // Quick Tools Visibility
  const [showBreathing, setShowBreathing] = useState<boolean>(false);
  const [showVent, setShowVent] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Fetch updated quotes in background if server has updates
  useEffect(() => {
    async function loadFreshQuotes() {
      try {
        const res = await fetch('/api/quotes');
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.quotes) {
            setQuotesRegistry(json.data.quotes);
          }
        }
      } catch {
        // Fallback to local embedded data
      }
    }
    loadFreshQuotes();
  }, []);

  const handleSelectMood = useCallback(
    (moodKey: MoodKey, moodLabel: string) => {
      setSelectedMood(moodKey);
      setSelectedMoodLabel(moodLabel);

      const foundQuote = quotesRegistry[moodKey] || defaultQuotes[moodKey];
      setQuoteData(foundQuote);

      // Anonymous log ping
      try {
        fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mood: moodKey,
            referrer: typeof document !== 'undefined' ? document.referrer || null : null,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // Ignore network failure for background logging
      }

      // Scroll smoothly to top of main container
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [quotesRegistry]
  );

  const handleBackToMoods = useCallback(() => {
    setSelectedMood(null);
    setQuoteData(null);
    setSelectedMoodLabel('');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* View 1: Mood Selector (if no mood selected) */}
      {!selectedMood || !quoteData ? (
        <MoodSelector
          onSelectMood={handleSelectMood}
          onToggleBreathing={() => setShowBreathing((prev) => !prev)}
          onToggleVent={() => setShowVent((prev) => !prev)}
          breathingActive={showBreathing}
          ventActive={showVent}
        />
      ) : (
        /* View 2: Empathetic Quote & Grounding Card */
        <QuoteDisplay
          moodLabel={selectedMoodLabel}
          quoteData={quoteData}
          onBack={handleBackToMoods}
        />
      )}

      {/* Somatic Breathing Pacer Card */}
      {showBreathing && (
        <BreathingPacer onClose={() => setShowBreathing(false)} />
      )}

      {/* Vent & Unburden Space */}
      {showVent && (
        <VentSpace
          selectedMood={selectedMood}
          onClose={() => setShowVent(false)}
          onShowToast={showToast}
        />
      )}

      {/* Campus & Crisis Support Drawer */}
      <SupportDrawer />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </>
  );
}
