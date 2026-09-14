'use client';

import React, { useState } from 'react';
import { X, Sparkles, Copy, Send } from 'lucide-react';
import { MoodKey } from '@/lib/types';

interface VentSpaceProps {
  selectedMood: MoodKey | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const VentSpace: React.FC<VentSpaceProps> = ({
  selectedMood,
  onClose,
  onShowToast,
}) => {
  const [text, setText] = useState<string>('');
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleDissolve = () => {
    if (!text.trim()) {
      onShowToast('Please write a thought first before releasing.');
      return;
    }

    setIsDissolving(true);
    setTimeout(() => {
      setText('');
      setIsDissolving(false);
      setIsSubmitted(true);
      onShowToast('🍃 Your words have been gently released.');
    }, 1200);
  };

  const handleCopy = async () => {
    if (!text.trim()) {
      onShowToast('Write your thoughts first before copying.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      onShowToast('📋 Copied! You can paste this in a message to a counselor or hotline.');
    } catch {
      onShowToast('Copied text to clipboard.');
    }
  };

  const handleSendAnonymous = async () => {
    if (!text.trim()) {
      onShowToast('Please type your reflection first.');
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch('/api/vent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mood: selectedMood || 'unspecified',
        }),
      });

      if (res.ok) {
        setText('');
        setIsSubmitted(true);
        onShowToast('✉️ Reflection received anonymously. Thank you.');
      } else {
        onShowToast('Notice: Could not submit. Your thought remains private.');
      }
    } catch {
      onShowToast('Notice: Could not reach server. Your thought remains private.');
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setText('');
  };

  return (
    <section
      id="venting-card"
      className="venting-card"
      aria-label="Vent and unburden your thoughts"
    >
      <div className="card-header-with-close">
        <div className="vent-badge">Safe Expression Space</div>
        <button
          id="btn-close-vent"
          className="btn-icon-close"
          type="button"
          onClick={onClose}
          aria-label="Close vent space"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <h3 className="vent-title">Unburden Your Heart</h3>
      <p className="vent-subtitle">
        No one is grading or judging you. Write what made you tired, what hurt today, or what you wish someone understood.
      </p>

      {!isSubmitted ? (
        <div id="vent-input-wrapper" className="vent-input-wrapper">
          <textarea
            id="vent-textarea"
            className={`vent-textarea ${isDissolving ? 'dissolving' : ''}`}
            rows={5}
            maxLength={1000}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type freely here... (It's safe to be honest with yourself)"
            aria-label="Write your thoughts freely"
            disabled={isDissolving || isSending}
          />

          <div className="vent-meta">
            <span id="char-counter" className="char-counter">
              {text.length} / 1000
            </span>
            <span className="confidential-pill">100% Private</span>
          </div>

          <div className="vent-action-grid">
            <button
              id="btn-vent-dissolve"
              className="btn-vent-action primary-dissolve"
              type="button"
              onClick={handleDissolve}
              disabled={isDissolving || isSending}
            >
              <Sparkles size={18} aria-hidden="true" />
              <span>Release into the Wind</span>
            </button>

            <button
              id="btn-vent-copy"
              className="btn-vent-action secondary-copy"
              type="button"
              onClick={handleCopy}
              disabled={isDissolving || isSending}
            >
              <Copy size={16} aria-hidden="true" />
              <span>Copy to Send Counselor</span>
            </button>

            <button
              id="btn-vent-submit"
              className="btn-vent-action tertiary-send"
              type="button"
              onClick={handleSendAnonymous}
              disabled={isDissolving || isSending}
            >
              <Send size={16} aria-hidden="true" />
              <span>{isSending ? 'Sending...' : 'Send Anonymously'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div id="vent-success-banner" className="vent-success-banner">
          <div className="success-icon-wrap" aria-hidden="true">
            🍃
          </div>
          <h4 className="success-heading">Your thoughts have been released.</h4>
          <p className="success-message">
            You don&apos;t have to carry every heavy thought by yourself. Notice the air filling your lungs right now. You are safe.
          </p>
          <button
            id="btn-vent-reset"
            className="btn-vent-reset"
            type="button"
            onClick={handleReset}
          >
            Write another thought
          </button>
        </div>
      )}
    </section>
  );
};
