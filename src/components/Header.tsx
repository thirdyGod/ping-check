import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="header" role="banner">
      <div className="partnership-lockup">
        {/* PSITS Emblem (Clickable to Facebook) */}
        <a
          href="https://www.facebook.com/profile.php?id=61579591881440"
          target="_blank"
          rel="noopener noreferrer"
          className="logo-container psits-badge"
          title="Visit CHMSU PSITS on Facebook"
        >
          <Image
            src="/assets/logo.png"
            alt="Carlos Hilado Memorial State University - PSITS Main Campus Emblem"
            className="brand-logo"
            width={76}
            height={76}
            priority
          />
        </a>

        <div className="partnership-divider" aria-hidden="true">
          <span className="collab-sym">×</span>
        </div>

        {/* CHMSU Psychological Society Emblem (Clickable to Facebook) */}
        <a
          href="https://www.facebook.com/CHMSCPsychologicalSociety"
          target="_blank"
          rel="noopener noreferrer"
          className="logo-container psych-badge"
          title="Visit CHMSU Psychological Society on Facebook"
        >
          <Image
            src="/assets/psych-soc-logo.png"
            alt="CHMSU Psychological Society Emblem"
            className="brand-logo"
            width={76}
            height={76}
            priority
          />
        </a>
      </div>

      <div className="brand-affiliation">
        <span className="pulse-indicator" aria-hidden="true" />
        <span className="brand-eyebrow">CHMSU PSITS × CHMSU Psychological Society</span>
      </div>

      <h1 className="app-title">Ping Check</h1>
      <p className="app-subtitle">How’s your connection with yourself today?</p>
      <p className="partnership-tagline">
        An initiative in partnership with{' '}
        <a
          href="https://www.facebook.com/CHMSCPsychologicalSociety"
          target="_blank"
          rel="noopener noreferrer"
          className="partnership-link"
          title="Visit CHMSU Psychological Society Facebook Page"
        >
          <strong>The CHMSU Psychological Society</strong>
          <ExternalLink className="external-icon" size={13} aria-hidden="true" />
        </a>
      </p>
    </header>
  );
};
