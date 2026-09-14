import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-partnership">
        <span className="partner-lead">An initiative by</span>
        <a
          href="https://www.facebook.com/profile.php?id=61579591881440"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-psits-link"
          title="Visit CHMSU PSITS on Facebook"
        >
          <strong>Philippine Society of Information Technology Students (PSITS)</strong>
        </a>
        <span className="partner-sub">in proud partnership with</span>
        <a
          href="https://www.facebook.com/CHMSCPsychologicalSociety"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-partner-link"
          title="Visit CHMSU Psychological Society on Facebook"
        >
          <strong className="partner-highlight">The CHMSU Psychological Society (Estd. 2016)</strong>
        </a>
      </div>
      <p className="footer-campus">Carlos Hilado Memorial State University • Main Campus (Talisay City)</p>
      <p className="footer-about">
        <Link href="/about" className="footer-about-link">
          Meet the Working Committees &amp; Project Story →
        </Link>
      </p>
      <p className="footer-subnote">
        Ping Check is an anonymous self-reflection tool. It is not a clinical assessment. In an emergency, please contact local emergency responders.
      </p>
    </footer>
  );
};
