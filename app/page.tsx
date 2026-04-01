"use client";

import { useState, useEffect, useRef } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>
      ),
      label: "Video Lessons",
      title: "Expert-Led Video Instruction",
      description:
        "Structured modules taught by certified IELTS trainers. From Academic Writing Task 1 to Speaking Part 3 — every band-boosting technique, on demand.",
      accent: "#C9A84C",
      stat: "200+",
      statLabel: "HD lessons",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
        </svg>
      ),
      label: "CBT Practice",
      title: "Authentic Computer-Based Testing",
      description:
        "Practice in a simulated exam environment identical to the real IELTS CBT interface. Timer, question navigation, and instant band-score estimation.",
      accent: "#4C9AC9",
      stat: "50+",
      statLabel: "Full mock tests",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
        </svg>
      ),
      label: "AI Feedback",
      title: "Intelligent Writing & Speaking Analysis",
      description:
        "Receive detailed band-level feedback on your Writing and Speaking submissions in seconds. Understand exactly what separates a Band 6 from a Band 8.",
      accent: "#7C4CC9",
      stat: "<30s",
      statLabel: "Feedback time",
    },
  ];

  const stats = [
    { value: "98,000+", label: "Students Enrolled" },
    { value: "4.9★", label: "Average Rating" },
    { value: "Band 7+", label: "Average Improvement" },
    { value: "140+", label: "Countries Reached" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #0B1527;
          --navy-mid: #112040;
          --navy-light: #1A3060;
          --gold: #C9A84C;
          --gold-light: #E8C96B;
          --gold-pale: rgba(201,168,76,0.12);
          --cream: #F5F0E8;
          --white: #FFFFFF;
          --text-muted: rgba(245,240,232,0.55);
          --border: rgba(201,168,76,0.2);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--navy);
          color: var(--cream);
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          padding: 0 2rem;
        }
        .navbar.scrolled {
          background: rgba(11,21,39,0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-mark {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 18px;
          color: var(--navy);
          flex-shrink: 0;
        }
        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--cream);
          letter-spacing: 0.01em;
        }
        .logo-text span { color: var(--gold); }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color 0.25s;
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transition: transform 0.3s;
          transform-origin: left;
        }
        .nav-links a:hover { color: var(--cream); }
        .nav-links a:hover::after { transform: scaleX(1); }

        .btn-login {
          padding: 9px 22px;
          border: 1px solid var(--gold);
          border-radius: 4px;
          color: var(--gold);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          transition: all 0.3s;
        }
        .btn-login:hover {
          background: var(--gold);
          color: var(--navy);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 24px; height: 1.5px;
          background: var(--cream);
          transition: all 0.3s;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          background: var(--navy);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-orb-1 {
          position: absolute;
          top: -15%;
          right: -10%;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
        }
        .hero-orb-2 {
          position: absolute;
          bottom: -20%;
          left: -15%;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,48,96,0.6) 0%, transparent 70%);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-line {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
          opacity: 0.12;
        }

        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 2rem 80px;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.6rem;
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 2px;
          background: var(--gold-pale);
        }
        .eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 700;
          line-height: 1.12;
          color: var(--cream);
          margin-bottom: 1.6rem;
          letter-spacing: -0.01em;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold);
        }

        .hero-sub {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--text-muted);
          max-width: 480px;
          margin-bottom: 2.8rem;
          font-weight: 300;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }
        .btn-primary {
          padding: 14px 32px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--navy);
          border: none;
          border-radius: 4px;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
          box-shadow: 0 4px 24px rgba(201,168,76,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.45);
        }
        .btn-secondary {
          padding: 14px 28px;
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(245,240,232,0.2);
          border-radius: 4px;
          font-size: 0.88rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .trust-avatars {
          display: flex;
        }
        .trust-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid var(--navy);
          background: var(--navy-light);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--gold);
          margin-left: -8px;
          flex-shrink: 0;
        }
        .trust-avatar:first-child { margin-left: 0; }
        .trust-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .trust-text strong {
          display: block;
          color: var(--cream);
          font-weight: 500;
        }

        /* Hero Right – Score Card */
        .hero-card {
          background: linear-gradient(145deg, rgba(17,32,64,0.9), rgba(11,21,39,0.95));
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08);
          position: relative;
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.6rem;
        }
        .card-badge {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          background: var(--gold-pale);
          padding: 4px 10px;
          border-radius: 2px;
          border: 1px solid var(--border);
        }
        .card-score-ring {
          position: relative;
          width: 120px; height: 120px;
          margin: 0 auto 1.8rem;
        }
        .ring-svg {
          transform: rotate(-90deg);
        }
        .ring-bg { fill: none; stroke: rgba(201,168,76,0.1); stroke-width: 8; }
        .ring-fill {
          fill: none;
          stroke: url(#goldGrad);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 283;
          stroke-dashoffset: 42;
          animation: ringFill 2s ease-out;
        }
        @keyframes ringFill {
          from { stroke-dashoffset: 283; }
          to { stroke-dashoffset: 42; }
        }
        .ring-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .ring-score {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
        }
        .ring-label {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .skill-bars { display: flex; flex-direction: column; gap: 12px; }
        .skill-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .skill-name {
          font-size: 0.75rem;
          color: var(--text-muted);
          width: 60px;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }
        .skill-bar-wrap {
          flex: 1;
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          animation: barGrow 1.5s ease-out;
          transform-origin: left;
        }
        @keyframes barGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .skill-val {
          font-size: 0.75rem;
          color: var(--gold);
          font-weight: 500;
          width: 28px;
          text-align: right;
        }

        /* ── STATS STRIP ── */
        .stats-strip {
          background: var(--navy-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 2.8rem 2rem;
        }
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .stat-item {
          text-align: center;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── FEATURES SECTION ── */
        .features {
          padding: 8rem 2rem;
          background: var(--navy);
          position: relative;
        }
        .features::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }
        .section-header {
          max-width: 1200px;
          margin: 0 auto 5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
        }
        .section-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 600;
          color: var(--cream);
          line-height: 1.2;
          max-width: 400px;
        }
        .section-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.8;
          max-width: 380px;
          font-weight: 300;
        }

        .features-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .feature-card {
          padding: 3rem 2.4rem;
          background: rgba(17,32,64,0.4);
          border-right: 1px solid var(--border);
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .feature-card:last-child { border-right: none; }
        .feature-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s;
        }
        .feature-card.active, .feature-card:hover {
          background: rgba(26,48,96,0.6);
        }
        .feature-card.active::before, .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.8rem;
          transition: all 0.3s;
        }
        .feature-label-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1rem;
        }
        .feature-label {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--cream);
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .feature-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.75;
          font-weight: 300;
        }
        .feature-stat-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: 2rem;
          padding-top: 1.6rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .feature-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1;
        }
        .feature-stat-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        /* ── TESTIMONIALS ── */
        .testimonials {
          background: var(--navy-mid);
          padding: 7rem 2rem;
          border-top: 1px solid var(--border);
        }
        .testimonials-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .testi-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .testi-card {
          background: rgba(11,21,39,0.6);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          position: relative;
          transition: transform 0.3s;
        }
        .testi-card:hover { transform: translateY(-4px); }
        .testi-card::before {
          content: '"';
          position: absolute;
          top: 1rem; right: 1.5rem;
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          color: var(--gold);
          opacity: 0.2;
          line-height: 1;
        }
        .testi-score {
          display: inline-block;
          background: var(--gold-pale);
          border: 1px solid var(--border);
          border-radius: 3px;
          padding: 3px 10px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .testi-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 1.5rem;
          font-weight: 300;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .testi-ava {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--navy-light);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--gold);
          flex-shrink: 0;
        }
        .testi-name {
          font-size: 0.85rem;
          color: var(--cream);
          font-weight: 500;
        }
        .testi-country {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* ── CTA ── */
        .cta-section {
          padding: 7rem 2rem;
          background: var(--navy);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--cream);
          line-height: 1.15;
          margin-bottom: 1.2rem;
        }
        .cta-title em { color: var(--gold); font-style: italic; }
        .cta-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.7;
          font-weight: 300;
        }
        .cta-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 1rem;
          letter-spacing: 0.03em;
        }

        /* ── FOOTER ── */
        footer {
          background: #070F1E;
          border-top: 1px solid var(--border);
          padding: 3rem 2rem;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }
        .footer-links {
          display: flex;
          gap: 1.8rem;
          list-style: none;
        }
        .footer-links a {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--gold); }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 3rem; padding-top: 100px; }
          .hero-card { max-width: 400px; }
          .features-grid { grid-template-columns: 1fr; }
          .feature-card { border-right: none; border-bottom: 1px solid var(--border); }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .testi-grid { grid-template-columns: 1fr; }
          .section-header { flex-direction: column; align-items: flex-start; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu {
            position: fixed;
            top: 72px; left: 0; right: 0;
            background: rgba(11,21,39,0.97);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            padding: 1.5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            z-index: 99;
          }
          .mobile-menu a {
            color: var(--cream);
            text-decoration: none;
            font-size: 0.9rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 6px 0;
          }
        }
        @media (max-width: 600px) {
          .stats-inner { grid-template-columns: 1fr 1fr; }
          .hero-actions { flex-direction: column; }
          .btn-primary, .btn-secondary { text-align: center; justify-content: center; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <div className="logo-mark">I</div>
            <span className="logo-text">IELTS<span>Pro</span></span>
          </a>

          <ul className="nav-links">
            <li><a href="#features">Courses</a></li>
            <li><a href="/practice">CBT Practice</a></li>
            <li><a href="#cta">Resources</a></li>
          </ul>

          <a href="/dashboard" className="btn-login">Student Login</a>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="#features" onClick={() => setMenuOpen(false)}>Courses</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>CBT Practice</a>
            <a href="#cta" onClick={() => setMenuOpen(false)}>Resources</a>
            <a href="#login" className="btn-login" style={{ alignSelf: "flex-start" }} onClick={() => setMenuOpen(false)}>Student Login</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />
          <div className="hero-grid" />
          {[15, 30, 50, 70, 85].map((left) => (
            <div key={left} className="hero-line" style={{ left: `${left}%` }} />
          ))}
        </div>

        <div className="hero-inner">
          {/* Left */}
          <div>
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Trusted by 98,000+ students globally
            </div>

            <h1 className="hero-title">
              Master the IELTS Exam with <em>Real-Time</em> CBT Practice
            </h1>

            <p className="hero-sub">
              The most rigorous online IELTS preparation platform. Structured video lessons, authentic computer-based tests, and AI-powered feedback — engineered for Band 7 and above.
            </p>

            <div className="hero-actions">
              <a href="#cta" className="btn-primary">
                Start Free Today
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#features" className="btn-secondary">
                Explore Features
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                {["A", "K", "M", "J", "R"].map((l, i) => (
                  <div key={i} className="trust-avatar">{l}</div>
                ))}
              </div>
              <div className="trust-text">
                <strong>Join 98,000+ students</strong>
                who improved their band score by 1.5+
              </div>
            </div>
          </div>

          {/* Right – Score Card */}
          <div>
            <div className="hero-card">
              <div className="card-header">
                <span style={{ fontSize: "0.85rem", fontFamily: "'Playfair Display', serif", color: "var(--cream)" }}>
                  Your Progress Report
                </span>
                <span className="card-badge">Live Preview</span>
              </div>

              <div className="card-score-ring">
                <svg className="ring-svg" width="120" height="120" viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C9A84C" />
                      <stop offset="100%" stopColor="#E8C96B" />
                    </linearGradient>
                  </defs>
                  <circle className="ring-bg" cx="60" cy="60" r="45" />
                  <circle className="ring-fill" cx="60" cy="60" r="45" />
                </svg>
                <div className="ring-inner">
                  <span className="ring-score">8.0</span>
                  <span className="ring-label">Band Score</span>
                </div>
              </div>

              <div className="skill-bars">
                {[
                  { name: "Listening", val: "8.5", pct: "94%" },
                  { name: "Reading", val: "8.0", pct: "88%" },
                  { name: "Writing", val: "7.5", pct: "82%" },
                  { name: "Speaking", val: "8.0", pct: "88%" },
                ].map((s) => (
                  <div className="skill-row" key={s.name}>
                    <span className="skill-name">{s.name}</span>
                    <div className="skill-bar-wrap">
                      <div className="skill-bar-fill" style={{ width: s.pct }} />
                    </div>
                    <span className="skill-val">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="stats-inner">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Core Platform Features</div>
            <h2 className="section-title">Everything you need to achieve your target band</h2>
          </div>
          <p className="section-desc">
            Three powerful learning tools, seamlessly integrated into one platform. Built to mirror the real IELTS CBT experience at every step.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-card${activeFeature === i ? " active" : ""}`}
              onClick={() => setActiveFeature(i)}
            >
              <div
                className="feature-icon-wrap"
                style={{
                  background: `${f.accent}18`,
                  color: f.accent,
                  border: `1px solid ${f.accent}30`,
                }}
              >
                {f.icon}
              </div>
              <div className="feature-label-row">
                <span className="feature-label" style={{ color: f.accent }}>{f.label}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-stat-row">
                <span className="feature-stat-num" style={{ color: f.accent }}>{f.stat}</span>
                <span className="feature-stat-lbl">{f.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="testi-header">
            <div className="section-eyebrow" style={{ marginBottom: "0.8rem" }}>Student Success Stories</div>
            <h2 className="section-title" style={{ maxWidth: "none", textAlign: "center" }}>
              Real scores. Real students.
            </h2>
          </div>

          <div className="testi-grid">
            {[
              {
                score: "Band 8.0 Achieved",
                text: "IELTSPro's CBT simulator was almost identical to the real test. I walked in with complete confidence on test day. The AI writing feedback is genuinely on par with a human examiner.",
                name: "Amara O.",
                country: "Nigeria → Canada PR",
                init: "A",
              },
              {
                score: "Band 7.5 Achieved",
                text: "Within six weeks of consistent daily practice on this platform, my band score jumped from 6.0 to 7.5. The speaking module's AI feedback identified exactly where my fluency was dropping.",
                name: "Kenji M.",
                country: "Japan → UK University",
                init: "K",
              },
              {
                score: "Band 8.5 Achieved",
                text: "As an academic professional, I needed Band 8 for university registration. The structured video lessons for Academic Writing Task 1 alone were worth the entire subscription.",
                name: "Priya S.",
                country: "India → Australia",
                init: "P",
              },
            ].map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-score">{t.score}</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-ava">{t.init}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-country">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-inner">
          <div className="hero-eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>
            <span className="eyebrow-dot" />
            Limited Free Access — Start Today
          </div>
          <h2 className="cta-title">
            Your <em>Band 7+</em> journey starts here
          </h2>
          <p className="cta-sub">
            Join thousands of students who chose IELTSPro for their preparation. Access 3 full mock tests and 20 video lessons — completely free, no credit card required.
          </p>
          <a href="#signup" className="btn-primary" style={{ fontSize: "0.95rem", padding: "16px 40px" }}>
            Create Free Account
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p className="cta-note">No credit card · Free forever plan · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="nav-logo" style={{ marginBottom: "6px" }}>
              <div className="logo-mark">I</div>
              <span className="logo-text">IELTS<span>Pro</span></span>
            </div>
            <p className="footer-copy">© 2025 IELTSPro Learning Systems. All rights reserved.</p>
          </div>
          <ul className="footer-links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
