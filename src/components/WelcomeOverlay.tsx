'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, ShieldCheck } from 'lucide-react';

export const WelcomeOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('welcome-overlay-open');
    } else {
      document.body.classList.remove('welcome-overlay-open');
    }

    return () => document.body.classList.remove('welcome-overlay-open');
  }, [isOpen]);

  const enterPingCheck = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="welcome-window">
        <div className="welcome-window-icon" aria-hidden="true">
          <Heart size={25} />
        </div>
        <span className="welcome-kicker">A quiet moment for you</span>
        <h2 id="welcome-title">Welcome to Ping Check</h2>
        <p className="welcome-lead">
          Before you begin, take one gentle breath. This is a space to pause, notice what you&apos;re carrying, and check in with yourself without judgment.
        </p>
        <div className="welcome-points">
          <div className="welcome-point">
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Your check-in is designed to be anonymous.</span>
          </div>
          <div className="welcome-point">
            <Heart size={17} aria-hidden="true" />
            <span>There is no right feeling and no pressure to explain.</span>
          </div>
        </div>
        <p className="welcome-safety-note">
          Ping Check is not a clinical assessment or emergency service. If you are in immediate danger, please contact emergency responders or open the support resources after entering.
        </p>
        <button type="button" className="welcome-enter-button" onClick={enterPingCheck} autoFocus>
          <span>Enter Ping Check</span>
          <ArrowRight size={17} aria-hidden="true" />
        </button>
        <Link href="/privacy" className="welcome-privacy-link">
          Read how we handle privacy
        </Link>
      </div>
    </div>
  );
};
