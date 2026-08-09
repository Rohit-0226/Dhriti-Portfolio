import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import dhritiTransparentImg from './imports/dhriti_transparent.webp'
import doctorsEventImg1 from './imports/doctors_event_1.jpg'
import doctorsEventImg2 from './imports/doctors_event_2.jpg'
import reelImg1 from './imports/reel_1.jpg'
import reelImg2 from './imports/reel_2.jpg'
import reelImg3 from './imports/reel_3.jpg'
import reelImg4 from './imports/reel_4.jpg'
import reelImg5 from './imports/reel_5.jpg'
import personalBrandingImg from './imports/personal_branding_dashboard.jpg'
import acadoLogoImg from './imports/acado_logo.jpg'
import droneRangersLogoImg from './imports/drone_rangers_logo.jpg'
import learnAndBuildLogoImg from './imports/learn_and_build_logo.jpg'
import poornimaLogoImg from './imports/poornima_university_logo.jpg'
import yougamiLogoImg from './imports/yougami_logo.jpg'

/* ─── Original Data ─────────────────────────────────────── */

const SKILLS_LEFT  = ['Canva', 'Microsoft Office (Excel, PowerPoint, Word)', 'Google Workspace', 'Event & Project Management', 'Social Media Management']
const SKILLS_RIGHT = ['Content Strategy & Storytelling', 'Ghostwriting', 'Mailchimp', 'WATI (WhatsApp Business API)', 'Presentation Design & Visual Communication']

const EXPERIENCE = [
  {
    company: 'Acado.ai',
    role: 'Brand and Digital Marketing Intern',
    location: 'Vassa, Finland · Remote',
    period: 'Sept 2025 – Dec 2025',
    color: '#DC2626',
    bullets: [
      'Spearheaded multi-format content production — blogs, newsletters, AI-generated creatives, and video edits to strengthen brand voice and digital presence across key platforms.',
      'Managed end-to-end social media strategy, driving consistent growth in reach and engagement through data-informed content planning and platform-specific execution.',
    ],
  },
  {
    company: 'Learn and Build',
    role: 'Business Development Executive Intern',
    location: 'Jaipur, Rajasthan · Offline',
    period: 'May 2025 – July 2025',
    color: '#9B1C1C',
    bullets: [
      'Executed internship promotion campaigns through creative content, campus outreach, and social media marketing, driving higher engagement.',
      'Increased enrollments through data driven marketing campaigns, leads and audience segmentation.',
    ],
  },
  {
    company: 'Yougami',
    role: 'Marketing Intern',
    location: 'Jodhpur, Rajasthan · Remote',
    period: 'Apr 2024 – May 2024',
    color: '#DC2626',
    bullets: [
      'Managed campus ambassador program operations across partner institutions, overseeing participant communication, onboarding documentation, and progress reporting.',
      'Drove school and college partnership outreach, coordinating collaborative engagements to expand program visibility and institutional reach.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Voice Of Doctors, Season-2',
    role: 'Event Head Coordinator',
    location: 'Jaipur · Hybrid',
    period: 'July 2024 – Sept 2024',
    bullets: [
      'Managed end-to-end coordination of virtual sessions and on-ground event execution, ensuring seamless participant experience across multiple stakeholder groups.',
      'Led stakeholder communication, scheduling, documentation, and team alignment for efficient event delivery.',
    ],
    tags: ['Event Management', 'Stakeholder Comms', 'Hybrid Events'],
  },
  {
    name: 'Drone Rangers',
    role: 'Social Media Content Creator',
    location: 'Jaipur · Freelancing',
    period: 'Apr 2025 – Aug 2025',
    bullets: [
      'Served as brand face and content creator, managing end-to-end reel production — scripting, shoot coordination, and editing to deliver platform-native content aligned with brand identity.',
      'Collaborated on content strategy and represented the brand on digital platforms, contributing to consistent audience engagement and brand visibility.',
    ],
    tags: ['Reel Production', 'Brand Strategy', 'Content Creation'],
  },
]

const LEADERSHIP = [
  { org: 'Poornima Paathshala, NGO', title: 'NGO Head / Captain', desc: 'Led sessions, managed volunteers, and drove awareness through social media initiatives.' },
  { org: 'Faculty of Management & Commerce', title: 'Cultural Head', desc: 'Directed end-to-end cultural event strategy, collaborating with teams, artists, and sponsors.' },
  { org: 'Lakshya 25', title: 'Accommodation & Food Committee Head', desc: 'Oversaw logistics, vendor coordination, and budget management to ensure seamless operations.' },
  { org: 'Student Mentor', title: 'BBA Digital Marketing', desc: 'Mentored juniors on projects and skill development, enhancing academic and practical growth.' },
]

const MARQUEE = ['Brand Strategy', '·', 'Content Creation', '·', 'Social Media', '·', 'Event Management', '·', 'Ghostwriting', '·', 'Canva', '·', 'Mailchimp', '·', 'WATI', '·', 'Campaign Design', '·', 'Storytelling', '·']

/* ─── Scroll Progress Bar ───────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #DC2626, #9B1C1C)',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(220,38,38,0.6)',
        willChange: 'transform',
      }}
    />
  )
}

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled((prev) => {
      if (!prev && latest > 48) return true
      if (prev && latest < 24) return false
      return prev
    })
  })

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '14px 1.5rem' : '0 2.5rem',
        pointerEvents: 'none',
        transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: 'auto',
          width: scrolled ? 'min(860px, 92vw)' : '100%',
          height: scrolled ? '56px' : '66px',
          borderRadius: scrolled ? '999px' : '0px',
          padding: scrolled ? '0 1.75rem' : '0 0rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: `1px solid rgba(0, 0, 0, ${scrolled ? 0.08 : 0})`,
          borderLeft: `1px solid rgba(0, 0, 0, ${scrolled ? 0.08 : 0})`,
          borderRight: `1px solid rgba(0, 0, 0, ${scrolled ? 0.08 : 0})`,
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
          boxShadow: `0 16px 40px rgba(0, 0, 0, ${scrolled ? 0.08 : 0})`,
          willChange: 'width, height, padding, border-radius',
          transition:
            'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1), ' +
            'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1), ' +
            'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Brand Logo with Space: Dhriti Arora */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="font-display"
          style={{
            fontSize: scrolled ? '1.3rem' : '1.45rem',
            fontWeight: 800,
            fontStyle: 'italic',
            cursor: 'pointer',
            color: '#000000',
            letterSpacing: '-0.02em',
            transition: 'font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Dhriti <span style={{ color: '#DC2626' }}>Arora</span>
        </motion.div>

        {/* Connected Section Anchor Links */}
        <div style={{ display: 'flex', gap: scrolled ? '1.8rem' : '2.2rem', alignItems: 'center', transition: 'gap 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          {[
            { name: 'About', href: '#about' },
            { name: 'Experience', href: '#experience' },
            { name: 'Skills & Tools', href: '#skills-tools' },
            { name: 'Projects', href: '#projects' },
          ].map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ y: -2, color: '#DC2626' }}
              style={{
                color: '#1F2937',
                fontSize: scrolled ? '0.84rem' : '0.88rem',
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'color 0.2s ease, font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {item.name}
            </motion.a>
          ))}

          {/* Primary Action Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: '#B91C1C' }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#DC2626',
              color: '#ffffff',
              padding: scrolled ? '7px 18px' : '9px 22px',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(220,38,38,0.22)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Hire Me →
          </motion.a>
        </div>
      </motion.nav>
    </header>
  )
}


const MULTI_LANG_HELLOS = [
  { word: 'Hello', flag: '👋' },
  { word: 'Horas', flag: '👋' },
  { word: 'नमस्ते', flag: '🙏' },
  { word: 'Hola', flag: '👋' },
  { word: 'こんにちは', flag: '🎌' },
  { word: 'Bonjour', flag: '✨' },
  { word: 'Ciao', flag: '✨' },
  { word: 'Hallo', flag: '👋' },
]

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [helloIndex, setHelloIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setHelloIndex((prev) => (prev + 1) % MULTI_LANG_HELLOS.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  const currentGreeting = MULTI_LANG_HELLOS[helloIndex]

  return (
    <section id="about" style={{
      minHeight: '100vh',
      background: '#FFFBFB',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '100px 1.5rem 0px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Dot Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(220, 38, 38, 0.07) 1.2px, transparent 1.2px)',
        backgroundSize: '26px 26px',
        pointerEvents: 'none',
      }} />

      {/* Main Container */}
      <div style={{ maxWidth: '1180px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Top Header Block */}
        <div>
          {/* Centered Rotating Multi-Language Hello Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', position: 'relative', marginBottom: '1rem' }}
          >
            <div className="font-display" style={{
              background: '#FFFBFB', border: '1.5px solid #1A0808', padding: '6px 24px', borderRadius: '999px',
              fontSize: '0.9rem', fontWeight: 600, color: '#1A0808', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              minWidth: '140px', textAlign: 'center', height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGreeting.word}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {currentGreeting.word} {currentGreeting.flag}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Spark Accents */}
            <svg style={{ position: 'absolute', right: '-18px', top: '-12px' }} width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v5M6 4l3 4M18 4l-3 4" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {/* Left Spark Lines */}
            <svg style={{ position: 'absolute', left: '-50px', top: '25px' }} width="44" height="44" viewBox="0 0 42 42" fill="none">
              <path d="M10 32C18 20 28 12 34 8M6 22C14 14 24 8 30 4" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            </svg>

            <h1 className="font-display" style={{
              fontSize: 'clamp(2.8rem, 5.8vw, 4.6rem)', fontWeight: 700, color: '#1A0808',
              lineHeight: 1.1, margin: 0, letterSpacing: '-0.025em',
            }}>
              I'm <span style={{ color: '#DC2626', fontWeight: 800 }}>Dhriti</span> 👋,<br />
              <span>A Brand &amp; Marketing Specialist</span>
            </h1>
          </motion.div>
        </div>

        {/* Central Graphic Area with Huge Red Arch & Cutout Image */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1050px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '480px' }}>
          
          {/* LEFT FLANKING CALLOUT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              position: 'absolute', left: '0%', bottom: '22%', maxWidth: '270px', textAlign: 'left', zIndex: 15,
            }}
          >
            <span style={{ fontSize: '2.8rem', lineHeight: 0.8, color: '#1A0808', fontFamily: 'serif', display: 'block', fontWeight: 700, marginBottom: '6px' }}>“</span>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#4A2020', margin: 0, fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              working under Dhriti, and I can confidently say she is an exceptional marketer and brand strategist
            </p>
          </motion.div>

          {/* RIGHT FLANKING METRIC */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              position: 'absolute', right: '2%', bottom: '25%', maxWidth: '210px', textAlign: 'left', zIndex: 15,
            }}
          >
            <div className="font-display" style={{ fontSize: '3.2rem', fontWeight: 800, color: '#1A0808', lineHeight: 1 }}>
              BBA 2025
            </div>
            <p className="font-mono" style={{ fontSize: '0.78rem', color: '#5C2C2C', margin: '8px 0 0', lineHeight: 1.4, fontWeight: 500 }}>
              in Brand &amp; Marketing Experience
            </p>
          </motion.div>

          {/* HUGE RED DOME ARCH */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: 'absolute', bottom: 0, width: '680px', height: '360px',
              borderTopLeftRadius: '350px', borderTopRightRadius: '350px',
              background: 'linear-gradient(180deg, #DC2626 0%, #EF4444 50%, #9B1C1C 100%)',
              boxShadow: '0 20px 60px rgba(220, 38, 38, 0.35)',
              zIndex: 1,
            }}
          />

          {/* PURE TRANSPARENT CUTOUT PORTRAIT (No background rectangle!) */}
          <div style={{ position: 'relative', zIndex: 5, width: '420px', height: '520px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '0px' }}>
            <motion.img
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              src={dhritiTransparentImg}
              alt="Dhriti Arora"
              decoding="async"
              fetchPriority="high"
              style={{
                width: '400px', height: '500px', objectFit: 'cover', objectPosition: 'top',
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))',
              }}
            />

            {/* FLOATING BLACK PILLS */}
            {/* Pill 1: Top Left - Marketing */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '35%', left: '-30px', zIndex: 20,
                background: '#1A0808', color: '#fff', padding: '8px 20px', borderRadius: '999px',
                fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <span>📣</span> Marketing
            </motion.div>

            {/* Pill 2: Bottom Left - Brand */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute', bottom: '22%', left: '-10px', zIndex: 20,
                background: '#1A0808', color: '#fff', padding: '8px 20px', borderRadius: '999px',
                fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <span>🌟</span> Brand
            </motion.div>

            {/* Pill 3: Top Right - Ads */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              style={{
                position: 'absolute', top: '42%', right: '-35px', zIndex: 20,
                background: '#1A0808', color: '#fff', padding: '8px 20px', borderRadius: '999px',
                fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <span>🚀</span> Ads
            </motion.div>

            {/* Pill 4: Bottom Right - Social Media */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              style={{
                position: 'absolute', bottom: '15%', right: '-25px', zIndex: 20,
                background: '#1A0808', color: '#fff', padding: '8px 20px', borderRadius: '999px',
                fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <span>🤳</span> Social Media
            </motion.div>
          </div>

        </div>

        {/* BOTTOM FLOATING ACTION BAR */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ position: 'relative', zIndex: 25, marginTop: '-20px', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            background: '#1A0808', padding: '5px 6px', borderRadius: '999px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: '#DC2626', color: '#fff', padding: '10px 24px', borderRadius: '999px',
                fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px',
                cursor: 'pointer',
              }}
            >
              Resume ↗
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ color: '#fff' }}
              style={{
                color: 'rgba(255,245,245,0.7)', padding: '10px 20px', fontFamily: 'var(--font-display)',
                fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none',
              }}
            >
              Hire me
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── Slanted Ticker Ribbon ─────────────────────────────── */
function SlantedTicker() {
  const items = ['UX Design', '✦', 'Brand Strategy', '✦', 'Marketing', '✦', 'Social Media', '✦', 'Growth Strategy', '✦', 'Content Creation', '✦', 'Analytics', '✦']
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div style={{
      width: '110vw',
      marginLeft: '-5vw',
      transform: 'rotate(-2.5deg)',
      background: '#ffffff',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      padding: '18px 0',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
      marginBottom: '4.5rem',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content', alignItems: 'center' }}>
        {doubled.map((item, i) => (
          <span key={i} className="font-display" style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: item === '✦' ? '#DC2626' : '#1A0808',
            letterSpacing: '-0.02em',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── About Section ─────────────────────────────────────── */
function About() {
  return (
    <section id="about-detail" style={{
      background: '#FFFBFB',
      padding: '10px 0 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Slanted Ticker Ribbon */}
      <SlantedTicker />

      {/* Main Content Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display" style={{
              fontSize: 'clamp(4rem, 8vw, 6rem)',
              fontWeight: 800,
              color: '#000000',
              letterSpacing: '-0.04em',
              marginBottom: '2rem',
              lineHeight: 0.95,
            }}>
              about.
            </h2>

            <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', fontFamily: 'var(--font-body)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Call me Dhriti, I am a fresh graduate with a passion for creating business strategies, marketing strategies, growth marketing, and other business or brand activities.{' '}
                <span style={{ borderBottom: '3px solid #DC2626', fontWeight: 700, color: '#000000', paddingBottom: '2px' }}>
                  With hands-on professional internship experience
                </span>
                , I honed my skills in business development and strategy, B2B and B2C strategy, brand strategy, content production, and relationship management.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                I am experienced in social media strategy, brand strategy, marketing, campaign execution, Ads performance, and relationship fields in various industries and companies such as Acado.ai (AI technology) and Learn and Build.
              </p>

              <p style={{ margin: 0 }}>
                I am deeply committed to transforming ideas into results, whether it's crafting marketing and business strategies, brand campaigns, and optimizing audience growth performance.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Image with Red Semi-Circle Arch */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '460px' }}
          >
            {/* Solid Clean Red/Coral Semi-Circle Arch (Matching Reference Screenshot) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '460px',
              height: '260px',
              borderTopLeftRadius: '230px',
              borderTopRightRadius: '230px',
              background: '#F87171',
              zIndex: 1,
            }} />

            {/* Transparent Cutout Image */}
            <img
              src={dhritiTransparentImg}
              alt="Dhriti Arora About"
              loading="lazy"
              decoding="async"
              style={{
                position: 'relative',
                zIndex: 5,
                width: '370px',
                height: '470px',
                objectFit: 'cover',
                objectPosition: 'top',
                filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.08))',
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─── Skills, Tools & Education Section (Reference Replica with Real Content) ─── */
function SkillsToolsEducation() {
  const skillPillsLine1 = [
    'Brand Strategy',
    'Growth Marketing',
    'Social Media Management',
    'B2B & B2C Strategy',
  ]
  const skillPillsLine2 = [
    'Content Creation',
    'Campaign Execution',
    'Performance Ads',
    'Relationship Management',
  ]

  const toolCategories = [
    {
      title: 'Brand & Visual Design',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* Canva / Creative */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ECFEFF', border: '1px solid #CFFAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0891B2' }}>C</span>
          </div>
          {/* Adobe */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F2', border: '1px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14.5 4H19v16h-4.5L14.5 4zM9.5 4L5 20h4.5l1.2-4.5h4.6L9.5 4z" fill="#E11D48"/>
            </svg>
          </div>
          {/* Figma */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="20" height="30" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
            </svg>
          </div>
        </div>
      ),
      tools: ['Canva', 'Figma', 'Adobe Creative Suite'],
    },
    {
      title: 'Content & Reel Production',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* CapCut */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#09090B', border: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M7 7l5 5-5 5V7zM17 7l-5 5 5 5V7z" fill="#FFFFFF"/>
            </svg>
          </div>
          {/* AI Tools */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.1rem' }}>✨</span>
          </div>
          {/* Newsletters */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FEFCE8', border: '1px solid #FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.1rem' }}>✉️</span>
          </div>
        </div>
      ),
      tools: ['CapCut & Reel Editing', 'AI Content Generators', 'Newsletter Publishing'],
    },
    {
      title: 'Performance & Analytics',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* Google Analytics */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF7ED', border: '1px solid #FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="3.5" height="8" rx="1" fill="#F97316"/>
              <rect x="10.5" y="6" width="3.5" height="13" rx="1" fill="#EA580C"/>
              <circle cx="17.5" cy="5.5" r="2.5" fill="#EAB308"/>
            </svg>
          </div>
          {/* Meta Ads */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16.8 7.2c-1.3 0-2.5.8-3.4 2-1-1.2-2.1-2-3.4-2-2.3 0-4 1.8-4 4.3 0 2.8 2.2 5.3 4.8 5.3 1.4 0 2.5-.7 3.3-1.8.8 1.1 2 1.8 3.3 1.8 2.6 0 4.8-2.5 4.8-5.3 0-2.5-1.7-4.3-4-4.3zm-7.4 7.4c-1.4 0-2.6-1.5-2.6-3.1 0-1.4.9-2.5 2.1-2.5.9 0 1.8.7 2.4 1.7-.6 2.3-1.2 3.9-1.9 3.9zm7.4 0c-.7 0-1.3-1.6-1.9-3.9.6-1 1.5-1.7 2.4-1.7 1.2 0 2.1 1.1 2.1 2.5 0 1.6-1.2 3.1-2.6 3.1z" fill="#0668E1"/>
            </svg>
          </div>
          {/* Google Ads */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FEFCE8', border: '1px solid #FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.3 3.6L6.5 18.8c-.4.7-.2 1.6.5 2s1.6.2 2-.5l8.8-15.2c.4-.7.2-1.6-.5-2s-1.6-.2-2 .5z" fill="#FBBC04"/>
              <path d="M8.5 20.3l-4.5-2.6c-.7-.4-.9-1.3-.5-2l8.8-15.2c.4-.7 1.3-.9 2-.5l4.5 2.6c.7.4.9 1.3.5 2l-8.8 15.2c-.4.7-1.3.9-2 .5z" fill="#4285F4"/>
              <circle cx="6" cy="18" r="2.5" fill="#34A853"/>
            </svg>
          </div>
        </div>
      ),
      tools: ['Google Analytics', 'Meta Ads Manager', 'Google Ads'],
    },
    {
      title: 'Operations & Execution',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* MS Office */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F2', border: '1px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="3" fill="#E11D48"/>
              <path d="M9 8h6v8H9z" fill="#FFFFFF"/>
            </svg>
          </div>
          {/* Workspace */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.1rem' }}>💼</span>
          </div>
          {/* WATI */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.1rem' }}>💬</span>
          </div>
        </div>
      ),
      tools: ['MS Excel & PowerPoint', 'Google Workspace', 'WATI (WhatsApp API)'],
    },
  ]

  return (
    <section id="skills-tools" style={{ padding: '80px 1.5rem 100px', background: '#FFFBFB' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* TOP BLOCK: *skills. */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}
        >
          {/* Hand-drawn Radiating Arc Sparks on Left & Right */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Left Radiating Curved Arcs */}
            <svg style={{ position: 'absolute', left: '-60px', top: '-25px' }} width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M42 45C30 40 18 36 6 38" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M45 28C28 22 14 18 4 20" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M48 10C36 18 28 30 30 42" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            {/* Right Radiating Curved Arcs */}
            <svg style={{ position: 'absolute', right: '-60px', top: '-25px' }} width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M8 45C20 40 32 36 44 38" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M5 28C22 22 36 18 46 20" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M2 10C14 18 22 30 20 42" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            {/* Title with Hand-Drawn Doodle Star SVG & Red Period Accent */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {/* Hand-Drawn Doodle Star SVG */}
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" style={{ marginTop: '-8px' }}>
                <path
                  d="M20 2 C20.8 11.2, 22.5 18, 38 20 C22.5 22, 20.8 28.8, 20 38 C19.2 28.8, 17.5 22, 2 20 C17.5 18, 19.2 11.2, 20 2 Z"
                  fill="#000000"
                />
                <path d="M9 9L31 31M31 9L9 31" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              <h2 className="font-display" style={{
                fontSize: 'clamp(3.8rem, 7.5vw, 5.8rem)',
                fontWeight: 800,
                color: '#000000',
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                margin: 0,
                display: 'inline',
              }}>
                skills
              </h2>

              <span style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                background: '#DC2626',
                borderRadius: '2px',
                marginLeft: '4px',
                marginTop: '1.8rem',
              }} />
            </div>
          </div>

          {/* Skill Pills Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '2.5rem' }}>
            {/* Line 1 */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {skillPillsLine1.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.06, y: -2, borderColor: '#DC2626' }}
                  className="font-display"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #1A0808',
                    padding: '8px 24px',
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1A0808',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Line 2 */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {skillPillsLine2.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.06, y: -2, borderColor: '#DC2626' }}
                  className="font-display"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #1A0808',
                    padding: '8px 24px',
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1A0808',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BOTTOM GRID: tools. (Left) & education. (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'stretch' }}>
          
          {/* LEFT CARD: tools. */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '3rem 2.5rem',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.07)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '2.5rem' }}>
              <h3 className="font-display" style={{
                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#000000',
                letterSpacing: '-0.04em',
                margin: 0,
                lineHeight: 1.0,
              }}>
                tools
              </h3>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                background: '#DC2626',
                borderRadius: '2px',
                marginLeft: '4px',
              }} />
            </div>

            {/* 4 Quadrants Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem 2rem', flex: 1 }}>
              {toolCategories.map((cat) => (
                <div key={cat.title}>
                  {/* Real Company Logos Row */}
                  {cat.renderLogos()}

                  {/* Category Title Chip */}
                  <span className="font-mono" style={{
                    fontSize: '0.72rem',
                    color: '#64748B',
                    background: '#F1F5F9',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: '8px',
                  }}>
                    {cat.title}
                  </span>

                  {/* Bullet Tool List */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {cat.tools.map((t) => (
                      <li key={t} style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARD: education. */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '3rem 2.5rem',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.07)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '2.5rem' }}>
              <h3 className="font-display" style={{
                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#000000',
                letterSpacing: '-0.04em',
                margin: 0,
                lineHeight: 1.0,
              }}>
                education
              </h3>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                background: '#DC2626',
                borderRadius: '2px',
                marginLeft: '4px',
              }} />
            </div>

            {/* Education Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flex: 1 }}>
              
              {/* Item 1: Poornima University */}
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#ffffff',
                  border: '1.5px solid #1E3A8A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 16px rgba(30,58,138,0.12)',
                  overflow: 'hidden',
                }}>
                  <img
                    src={poornimaLogoImg}
                    alt="Poornima University"
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000000', margin: 0 }}>
                      Poornima University
                    </h4>
                    <span style={{
                      background: '#FFEDD5',
                      color: '#C2410C',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-body)',
                    }}>
                      BBA Digital Marketing
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 8px', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                    2021 – 2025 · Jaipur, Rajasthan
                  </p>

                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                    Specialization in Brand Strategy, Growth Marketing, Content Creation &amp; Campaign Management. Head of Cultural &amp; NGO Initiatives.
                  </p>
                </div>
              </div>

              {/* Item 2: Learn and Build Bootcamp */}
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#ffffff',
                  border: '1.5px solid #00A3FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 16px rgba(0,163,255,0.12)',
                  overflow: 'hidden',
                }}>
                  <img
                    src={learnAndBuildLogoImg}
                    alt="Learn and Build"
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000000', margin: 0 }}>
                      Learn and Build
                    </h4>
                    <span style={{
                      background: '#CCFBF1',
                      color: '#0F766E',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-body)',
                    }}>
                      Growth &amp; BDE Certification
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 8px', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                    May 2025 – July 2025 · Practical Experience
                  </p>

                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                    Led marketing outreach and campus activations resulting in +40% enrollment growth through audience segmentation and performance insights.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

/* ─── Experience Section (Reference Replica) ─────────────────────────── */
function Experience() {
  const experiences = [
    {
      role: 'Brand and Digital Marketing Trainee',
      company: 'Acado AI',
      type: 'Internship',
      period: 'Sep 2025 – Dec 2025 · 4 mos',
      location: 'Vaasa, Finland · Remote',
      bg: '#ffffff',
      border: '1.5px solid #0F172A',
      textColor: '#0F172A',
      logoImg: acadoLogoImg,
      logoText: 'Acado',
      description: 'Drove brand growth and digital presence by creating strategic social media content and executing digital marketing initiatives across India–Finland markets. Contributed to stronger brand visibility and audience engagement through consistent content and online community building.',
      skills: ['Social Media Management', 'Brand Strategy', 'Content Creation'],
    },
    {
      role: 'Social Media Content Creator',
      company: 'Drone Rangers India Private Limited',
      type: 'Freelance',
      period: 'Apr 2025 – Aug 2025 · 5 mos',
      location: 'Jaipur, Rajasthan, India · On-site',
      bg: '#ffffff',
      border: '1.5px solid #0284C7',
      textColor: '#0284C7',
      logoImg: droneRangersLogoImg,
      logoText: 'DR',
      description: 'At Drone Rangers, I worked as a content creator where I was responsible for developing engaging digital content to market products and strengthen brand presence. My role involved creating on-camera promotional material, designing creative campaigns, and presenting products in a way that connected with the target audience. I leveraged my skills in public speaking, digital storytelling, and social media marketing to deliver impactful content that enhanced audience engagement and product visibility.',
      skills: ['Business Development Support', 'Social Media Management', 'Public Speaking'],
    },
    {
      role: 'Business Development Intern',
      company: 'Learn and Build',
      type: 'Internship',
      period: 'May 2025 – Jul 2025 · 3 mos',
      location: 'Jaipur, Rajasthan, India · On-site',
      bg: '#ffffff',
      border: '1.5px solid #00A3FF',
      textColor: '#00A3FF',
      logoImg: learnAndBuildLogoImg,
      logoText: 'L&B',
      description: 'As a BDE Intern at Learn & Build, I drove growth through data-backed marketing and strategic outreach, leading internship campaigns across social media and campus activations. By combining content strategy, audience segmentation, and lead generation, I contributed to a 40% increase in enrollments while continuously optimizing campaigns through research and performance insights, focusing on turning ideas into measurable impact.',
      skills: ['Microsoft Office', 'Project Management', 'Lead Generation'],
    },
    {
      role: 'Captain: Poornima Paathshala',
      company: "Students' Council PU",
      type: 'Leadership',
      period: 'Aug 2024 – Jul 2025 · 1 yr',
      location: 'Jaipur, Rajasthan, India · On-site',
      bg: '#ffffff',
      border: '1.5px solid #1E3A8A',
      textColor: '#1E3A8A',
      logoImg: poornimaLogoImg,
      logoText: 'PU',
      description: "Served as a Captain at Poornima Paathshala, where I grew in ways I didn't expect — leading volunteer sessions, directing awareness initiatives across campus, and managing social media outreach.",
      skills: ['Social Media Marketing', 'Teaching', 'Team Leadership'],
    },
    {
      role: 'Business Development Executive',
      company: 'Yougami',
      type: 'Internship',
      period: 'Apr 2024 – Jun 2024 · 3 mos',
      location: 'Jaipur, Rajasthan, India · Hybrid',
      bg: '#ffffff',
      border: '1.5px solid #DC2626',
      textColor: '#DC2626',
      logoImg: yougamiLogoImg,
      logoText: 'Yougami',
      description: 'I worked on school partnerships, account management, and social media creation. I led campus ambassador initiatives, managed student ambassadors, and organized engagement activities to boost brand presence. I also handled onboarding and communication with partnered schools, ensuring smooth program execution and client satisfaction. Additionally, I created and scheduled content across social media platforms, tracking performance and optimizing strategies for better reach and engagement.',
      skills: ['Microsoft Office', 'Project Management', 'Account Management'],
    },
  ]

  return (
    <section id="experience" style={{
      padding: '80px 1.5rem 100px',
      background: '#FFFBFB',
    }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        
        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '3.5rem 3rem',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
          }}
        >
          {/* Section Title */}
          <h2 className="font-display" style={{
            fontSize: 'clamp(3rem, 6vw, 4.8rem)',
            fontWeight: 800,
            color: '#000000',
            letterSpacing: '-0.04em',
            marginBottom: '3.5rem',
            lineHeight: 1.0,
          }}>
            experience.
          </h2>

          {/* Timeline List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem', position: 'relative' }}>
            {experiences.map((exp, index) => {
              const isLast = index === experiences.length - 1
              return (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ display: 'flex', gap: '2rem', position: 'relative', paddingBottom: isLast ? '0' : '2.75rem' }}
                >
                  {/* Left Column: Logo Badge & Connector Line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flexShrink: 0 }}>
                    {/* Brand Logo Badge */}
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: exp.bg,
                      border: exp.border || '2px solid #ffffff',
                      color: exp.textColor || '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-display)',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      zIndex: 2,
                    }}>
                      {exp.logoImg ? (
                        <img
                          src={exp.logoImg}
                          alt={exp.company}
                          style={{ width: '44px', height: '44px', objectFit: 'contain' }}
                        />
                      ) : (
                        exp.logoText
                      )}
                    </div>

                    {/* Connecting Vertical Line */}
                    {!isLast && (
                      <div style={{
                        width: '3.5px',
                        flex: 1,
                        background: '#3182CE',
                        marginTop: '6px',
                        marginBottom: '-6px',
                        borderRadius: '2px',
                      }} />
                    )}
                  </div>

                  {/* Right Column: Experience Details */}
                  <div style={{ flex: 1, paddingTop: '2px' }}>
                    {/* Line 1: Role Title */}
                    <h3 className="font-display" style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#000000',
                      margin: 0,
                      lineHeight: 1.3,
                    }}>
                      {exp.role}
                    </h3>

                    {/* Line 2: Company Name & Type */}
                    <p style={{
                      fontSize: '0.92rem',
                      color: '#2D3748',
                      margin: '3px 0 0',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                    }}>
                      {exp.company} · <span style={{ color: '#718096', fontWeight: 500 }}>{exp.type}</span>
                    </p>

                    {/* Line 3: Period / Duration & Location */}
                    <p style={{
                      fontSize: '0.82rem',
                      color: '#718096',
                      margin: '2px 0 12px',
                      fontWeight: 500,
                      fontFamily: 'var(--font-body)',
                    }}>
                      {exp.period}<br />
                      {exp.location}
                    </p>

                    {/* Line 4: Description Paragraph */}
                    <p style={{
                      fontSize: '0.94rem',
                      lineHeight: 1.68,
                      color: '#334155',
                      margin: '0 0 12px',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {exp.description}
                    </p>

                    {/* Line 5: Skill Badges (Matching LinkedIn Diamond Badge) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        💎
                      </span>
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: '#475569',
                            background: '#F1F5F9',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {skill}{sIdx < exp.skills.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </div>

        </motion.div>

      </div>
    </section>
  )
}

/* ─── Projects Section ───────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" style={{ background: '#FFFBFB', paddingBottom: '100px' }}>
      
      {/* Dark Divider Segregation Banner: 00 notable Projects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          background: '#121214',
          padding: '6rem 2rem 6.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          color: '#ffffff',
          marginBottom: '5.5rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
      >
        {/* 00 Stroked Number */}
        <span className="font-display" style={{
          fontSize: 'clamp(5.5rem, 12vw, 10.5rem)',
          fontWeight: 900,
          fontStyle: 'italic',
          color: 'transparent',
          WebkitTextStroke: '3px #ffffff',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
        }}>
          00
        </span>

        {/* Main Heading Text: notable Projects */}
        <h2 className="font-display" style={{
          fontSize: 'clamp(4.2rem, 9.5vw, 8.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          margin: 0,
          color: '#ffffff',
          lineHeight: 0.95,
        }}>
          notable <span style={{ fontStyle: 'italic', color: '#DC2626' }}>Projects</span>
        </h2>
      </motion.div>

      {/* Main Project 01 Container */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Project 01 Card: Voice of Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: '#FAF6ED',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Top Banner Ribbon: 01. Projects | voice of doctors, season 2 */}
          <div style={{
            background: '#D9CB9E',
            padding: '1.5rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}>
            <h3 className="font-display" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#000000',
              margin: 0,
              letterSpacing: '-0.03em',
            }}>
              01. Projects
            </h3>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}>
              Voice of Doctors, Season 2
            </span>
          </div>

          {/* Card Body */}
          <div style={{ padding: '3.5rem 3rem', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center' }}>
            
            {/* Left Column: Role & Deliverables */}
            <div>
              {/* Role Chip */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <span className="font-display" style={{
                  background: '#DC2626',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  padding: '6px 18px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.2)',
                }}>
                  Event Head Coordinator
                </span>
                <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                  July 2024 – Sept 2024
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display" style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: '#1A0808',
                margin: '0 0 1rem',
                lineHeight: 1.25,
              }}>
                Managing Healthcare Dialogues &amp; National Medical Series
              </h4>

              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#4A5568',
                marginBottom: '2rem',
                fontFamily: 'var(--font-body)',
              }}>
                Spearheaded end-to-end event strategy, virtual session broadcasts, medical speaker onboarding, and stage coordination for Voice of Doctors (Season 2). Oversaw multi-channel promotion across social media and doctor communities.
              </p>

              {/* Highlight Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DC2626', display: 'block' }}>
                    50+
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                    Doctors &amp; Speakers Coordinated
                  </span>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#000000', display: 'block' }}>
                    100%
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                    Seamless Event Execution
                  </span>
                </div>
              </div>

              {/* Deliverable Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Event Operations', 'Speaker Onboarding', 'Reels & Media Promo', 'Stakeholder Comms'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#475569',
                      background: '#ffffff',
                      border: '1px solid #E2E8F0',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    • {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Overlapping 3D Polaroid Photo Cards with Paperclips */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '380px' }}>
              
              {/* Polaroid 1 (Tilted Left) */}
              <motion.div
                whileHover={{ rotate: -2, scale: 1.04, zIndex: 10 }}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '20px',
                  width: '250px',
                  background: '#ffffff',
                  padding: '12px 12px 30px 12px',
                  borderRadius: '4px',
                  boxShadow: '0 14px 35px rgba(0,0,0,0.12)',
                  transform: 'rotate(-7deg)',
                  zIndex: 2,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {/* Gold Paperclip Icon */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 5,
                }}>
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                    <path d="M8 8V22C8 24.2 9.8 26 12 26C14.2 26 16 24.2 16 22V6C16 4.3 14.7 3 13 3C11.3 3 10 4.3 10 6V20C10 20.6 10.4 21 11 21C11.6 21 12 20.6 12 20V8" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <img
                  src={doctorsEventImg1}
                  alt="Voice of Doctors Event Stage"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '2px',
                  }}
                />
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textAlign: 'center', marginTop: '10px', fontWeight: 600 }}>
                  Doctor Dialogue Stage 📸
                </span>
              </motion.div>

              {/* Polaroid 2 (Tilted Right) */}
              <motion.div
                whileHover={{ rotate: 3, scale: 1.04, zIndex: 10 }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '10px',
                  width: '250px',
                  background: '#ffffff',
                  padding: '12px 12px 30px 12px',
                  borderRadius: '4px',
                  boxShadow: '0 14px 35px rgba(0,0,0,0.14)',
                  transform: 'rotate(6deg)',
                  zIndex: 3,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {/* Gold Paperclip Icon */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 5,
                }}>
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                    <path d="M8 8V22C8 24.2 9.8 26 12 26C14.2 26 16 24.2 16 22V6C16 4.3 14.7 3 13 3C11.3 3 10 4.3 10 6V20C10 20.6 10.4 21 11 21C11.6 21 12 20.6 12 20V8" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <img
                  src={doctorsEventImg2}
                  alt="Voice of Doctors Conference"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '2px',
                  }}
                />
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textAlign: 'center', marginTop: '10px', fontWeight: 600 }}>
                  Season 2 Highlights ✨
                </span>
              </motion.div>

            </div>

          </div>

        </motion.div>

        {/* Project 02 Card: Drone Rangers */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: '#FAFBF4',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            marginTop: '4rem',
          }}
        >
          {/* Top Banner Ribbon: 02. Projects | drone rangers, content creator */}
          <div style={{
            background: '#D9CB9E',
            padding: '1.5rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}>
            <h3 className="font-display" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#000000',
              margin: 0,
              letterSpacing: '-0.03em',
            }}>
              02. Projects
            </h3>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}>
              Drone Rangers, Content Creator
            </span>
          </div>

          {/* Card Body: Info Header & 5 Staggered Reel Cards */}
          <div style={{ padding: '3.5rem 2.5rem 5rem' }}>
            
            {/* Role Header Info */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <span className="font-display" style={{
                  background: '#DC2626',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  padding: '6px 18px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(220,38,38,0.2)',
                }}>
                  Content Creator &amp; Brand Face
                </span>
                <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                  Apr 2025 – Aug 2025 · Freelance
                </span>
              </div>

              <h4 className="font-display" style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#1A0808',
                margin: '0 0 0.5rem',
                lineHeight: 1.25,
              }}>
                Social Media Reels &amp; Promotional Campaigns
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#4A5568', margin: 0, fontFamily: 'var(--font-body)' }}>
                Hover over any reel to preview the auto-playing promotional content &amp; engagement metrics.
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1.25rem',
              alignItems: 'center',
              maxWidth: '1000px',
              margin: '0 auto',
            }}>
              {[
                { img: reelImg1, title: 'FPV Flight Shoot', views: '32.4k', offset: '-24px' },
                { img: reelImg2, title: 'Brand Presenter', views: '48.1k', offset: '24px' },
                { img: reelImg3, title: 'City Aerial Shoot', views: '54.9k', offset: '-24px' },
                { img: reelImg4, title: 'Behind The Scenes', views: '29.3k', offset: '24px' },
                { img: reelImg5, title: 'Drone Unboxing', views: '41.8k', offset: '-24px' },
              ].map((reel, index) => (
                <motion.div
                  key={reel.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
                  style={{
                    transform: `translateY(${reel.offset})`,
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#18181B',
                    boxShadow: '0 14px 35px rgba(0,0,0,0.18)',
                    aspectRatio: '9/16',
                    cursor: 'pointer',
                    border: '2px solid rgba(255,255,255,0.8)',
                  }}
                >
                  {/* Background Reel Cover Image */}
                  <img
                    src={reel.img}
                    alt={reel.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.9)',
                      transition: 'transform 0.4s ease',
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1rem 0.85rem',
                  }}>
                    {/* Top Engagement Badge */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        ❤️ {reel.views}
                      </span>
                    </div>

                    {/* Center Play Button Icon */}
                    <div style={{
                      alignSelf: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(255,255,255,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>

                    {/* Bottom Title Label */}
                    <div>
                      <span className="font-display" style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        display: 'block',
                        lineHeight: 1.25,
                        textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                      }}>
                        {reel.title}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.62rem', color: '#FCA5A5', marginTop: '2px', display: 'block' }}>
                        ▶ Auto-Playing Reel
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Project 03 Card: Personal Branding & What Others Say */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            background: '#FAFBF4',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            marginTop: '4rem',
          }}
        >
          {/* Header Ribbon: 03. Projects | Personal Branding & Recommendations */}
          <div style={{
            background: '#D9CB9E',
            padding: '1.5rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}>
            <h3 className="font-display" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#000000',
              margin: 0,
              letterSpacing: '-0.03em',
            }}>
              03. Projects
            </h3>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}>
              Personal Branding &amp; Recommendations
            </span>
          </div>

          {/* Card Body Container */}
          <div style={{ padding: '3.5rem 2.5rem 4.5rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            
            {/* ─── SLIDE 1: PERSONAL BRANDING ─── */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
            }}>
              {/* Slide 1 Header */}
              <h4 className="font-display" style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#000000',
                textAlign: 'center',
                marginBottom: '2.5rem',
                letterSpacing: '-0.03em',
              }}>
                Personal Branding
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '2.5rem', alignItems: 'center' }}>
                
                {/* Left Card: OBJECTIVES, MY SCOPE, STRATEGY */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '20px',
                  padding: '2.25rem 2rem',
                  border: '1px solid #E2E8F0',
                }}>
                  {/* OBJECTIVES */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h5 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                      OBJECTIVES
                    </h5>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#475569', margin: 0, fontFamily: 'var(--font-body)' }}>
                      Career-focused personal branding &amp; community growth strategy by creating valuable content, fostering audience engagement, and building digital authority across TikTok, LinkedIn, and Instagram.
                    </p>
                  </div>

                  {/* MY SCOPE */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h5 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                      MY SCOPE
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                      <li>Ads Strategy and Optimization</li>
                      <li>Visual Ad Content and Creative Direction</li>
                      <li>Campaign Execution and Management</li>
                      <li>Analytics and Performance Optimization</li>
                    </ul>
                  </div>

                  {/* STRATEGY */}
                  <div>
                    <h5 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                      STRATEGY
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                      <li>Conducted end-to-end research to understand audience needs and industry trends.</li>
                      <li>Designed and implemented a structured content strategy for consistent growth and engagement.</li>
                    </ul>
                  </div>
                </div>

                {/* Right Side: Device Mockup & RESULT Metrics */}
                <div>
                  {/* Laptop & Mobile Device Dashboard Mockup */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    marginBottom: '2rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}>
                    <img
                      src={personalBrandingImg}
                      alt="Personal Branding Analytics Dashboard"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#3B82F6',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      02 · Growth Verified
                    </div>
                  </div>

                  {/* RESULT Metrics Bar */}
                  <div style={{
                    background: '#FAF6ED',
                    borderRadius: '18px',
                    padding: '1.25rem 1.5rem',
                    border: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}>
                    <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', letterSpacing: '-0.02em' }}>
                      RESULT
                    </span>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {/* Metric 1 */}
                      <div style={{ background: '#ffffff', padding: '8px 14px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Organic Followers</span>
                        <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}>4.6K++ ↑</span>
                      </div>

                      {/* Metric 2 */}
                      <div style={{ background: '#ffffff', padding: '8px 14px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Impressions</span>
                        <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}>500K ↑</span>
                      </div>

                      {/* Metric 3 */}
                      <div style={{ background: '#ffffff', padding: '8px 14px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Profile Views</span>
                        <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}>4,159% ↑</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* ─── SLIDE 2: WHAT OTHERS SAY (LINKEDIN RECOMMENDATIONS) ─── */}
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
            }}>
              {/* Slide 2 Header */}
              <h4 className="font-display" style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#000000',
                textAlign: 'center',
                marginBottom: '2.5rem',
                letterSpacing: '-0.03em',
              }}>
                What others Say!
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '2.5rem', alignItems: 'center' }}>
                
                {/* Left Card: LinkedIn Recommendations Quotes Container */}
                <div style={{
                  background: '#FAF6ED',
                  borderRadius: '20px',
                  padding: '2.25rem 2rem',
                  border: '2px solid #8B5CF6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  boxShadow: '0 8px 24px rgba(139,92,246,0.08)',
                }}>
                  {/* Quote 1 */}
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F97316', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                          M
                        </div>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#000000', display: 'block' }}>Mathius</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Full Stack Lead &amp; Mentor</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '1.8rem', color: '#F97316', fontWeight: 900, lineHeight: 1 }}>“</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155', margin: 0, fontFamily: 'var(--font-body)' }}>
                      "Dhriti is expressive, quick to adapt, and a strategic marketer. She manages campaign direction with unmatched enthusiasm and brings genuine authenticity to brand messaging."
                    </p>
                  </div>

                  {/* Quote 2 */}
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3B82F6', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                          A
                        </div>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#000000', display: 'block' }}>Adnan Mahardika</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Growth Marketing Strategist</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '1.8rem', color: '#3B82F6', fontWeight: 900, lineHeight: 1 }}>“</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155', margin: 0, fontFamily: 'var(--font-body)' }}>
                      "Working alongside Dhriti was an exceptional experience. Her dedication to performance marketing, audience analytics, and brand positioning is truly top-tier."
                    </p>
                  </div>

                  {/* Quote 3 */}
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#059669', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                          T
                        </div>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#000000', display: 'block' }}>Theresa Diana P</span>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Digital Marketing Lead</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '1.8rem', color: '#059669', fontWeight: 900, lineHeight: 1 }}>“</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155', margin: 0, fontFamily: 'var(--font-body)' }}>
                      "From a digital marketing perspective, Dhriti has an extraordinary ability to execute multi-channel campaigns, optimize SEO &amp; social algorithms, and drive measurable ROI."
                    </p>
                  </div>
                </div>

                {/* Right Side: Title Callout matching user draft */}
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <h5 className="font-display" style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    fontWeight: 800,
                    color: '#000000',
                    lineHeight: 1.2,
                    margin: '0 0 1.5rem',
                    letterSpacing: '-0.03em',
                  }}>
                    my linkedin<br />recommendations
                  </h5>

                  <a
                    href="https://www.linkedin.com/in/dhriti-pareek-78b17326a/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#0A66C2',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      padding: '12px 24px',
                      borderRadius: '999px',
                      textDecoration: 'none',
                      boxShadow: '0 6px 20px rgba(10,102,194,0.3)',
                    }}
                  >
                    <span>LinkedIn Profile</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}

/* ─── Creative Work — Portrait Reel Cards ────────────────── */

const REEL_SLOTS = [
  { label: 'Drone Rangers', sublabel: 'Brand Reel', hint: 'Upload reel or paste link' },
  { label: 'Voice of Doctors', sublabel: 'Event Highlight', hint: 'Upload clip or paste link' },
  { label: 'Brand Content', sublabel: 'Campaign Visual', hint: 'Upload or paste link' },
  { label: 'Social Reel', sublabel: 'Content Sample', hint: 'Upload or paste link' },
  { label: 'Creative Work', sublabel: 'My Best Piece', hint: 'Upload or paste link' },
]

function ReelCard({ label, sublabel, hint }: { label: string; sublabel: string; hint: string }) {
  const [media, setMedia] = useState<{ src: string; type: 'video' | 'image' | 'embed' } | null>(null)
  const [mode, setMode] = useState<'idle' | 'link'>('idle')
  const [linkVal, setLinkVal] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const src = URL.createObjectURL(file)
    const type = file.type.startsWith('video/') ? 'video' : 'image'
    setMedia({ src, type })
    setMode('idle')
  }

  const handleLink = () => {
    const raw = linkVal.trim()
    const yt = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([A-Za-z0-9_-]{11})/)
    if (yt) {
      setMedia({ src: `https://www.youtube.com/embed/${yt[1]}?autoplay=0`, type: 'embed' })
    } else {
      setMedia({ src: raw, type: 'embed' })
    }
    setMode('idle')
    setLinkVal('')
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMedia(null)
    setMode('idle')
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        position: 'relative',
      }}
    >
      <div style={{ paddingBottom: '177.78%', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '24px',
          overflow: 'hidden',
          background: media ? 'transparent' : 'linear-gradient(160deg, #1A0808 0%, #2D0A0A 60%, #1A0808 100%)',
          border: media ? 'none' : '1.5px solid rgba(220,38,38,0.25)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: media ? 'default' : 'pointer',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { if (!media) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.6)' }}
          onMouseLeave={e => { if (!media) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.25)' }}
          onClick={() => { if (!media && mode === 'idle') inputRef.current?.click() }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*,image/*"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

          {/* Filled state */}
          {media && media.type === 'video' && (
            <video src={media.src} controls playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          {media && media.type === 'image' && (
            <img src={media.src} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          {media && media.type === 'embed' && (
            <iframe
              src={media.src}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={label}
            />
          )}

          {/* Clear button when filled */}
          {media && (
            <button onClick={clear} style={{
              position: 'absolute', top: '12px', right: '12px', zIndex: 10,
              background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%',
              width: '30px', height: '30px', color: '#fff', fontSize: '0.8rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}>✕</button>
          )}

          {/* Empty state */}
          {!media && mode === 'idle' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', width: '100%' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                border: '2px solid rgba(220,38,38,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid rgba(220,38,38,0.7)', marginLeft: '4px' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className="font-display" style={{ fontSize: '0.95rem', color: '#FFF5F5', margin: '0 0 4px', fontStyle: 'italic' }}>{label}</p>
                <p className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(252,165,165,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{sublabel}</p>
              </div>
              <p className="font-mono" style={{ fontSize: '0.58rem', color: 'rgba(255,245,245,0.25)', letterSpacing: '0.08em', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                Click to upload<br/>video or image
              </p>
              <button
                onClick={e => { e.stopPropagation(); setMode('link') }}
                style={{
                  background: 'transparent', border: '1px solid rgba(220,38,38,0.4)',
                  color: 'rgba(252,165,165,0.8)', borderRadius: '20px',
                  padding: '5px 14px', fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#DC2626'; (e.currentTarget as HTMLElement).style.color = '#FCA5A5' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.4)'; (e.currentTarget as HTMLElement).style.color = 'rgba(252,165,165,0.8)' }}
              >
                ↗ Paste Link
              </button>
            </div>
          )}

          {/* Link input mode */}
          {!media && mode === 'link' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.25rem', width: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <p className="font-mono" style={{ fontSize: '0.62rem', color: '#FCA5A5', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Paste Link</p>
              <input
                autoFocus
                value={linkVal}
                onChange={e => setLinkVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLink()}
                placeholder="YouTube / Vimeo URL..."
                style={{
                  width: '100%', border: '1px solid rgba(220,38,38,0.5)',
                  borderRadius: '8px', padding: '8px 10px',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: '#FFF5F5', background: 'rgba(255,255,255,0.06)',
                  outline: 'none', textAlign: 'center',
                }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={handleLink} style={{
                  background: '#DC2626', color: '#fff', border: 'none',
                  borderRadius: '6px', padding: '6px 14px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                }}>Embed ↵</button>
                <button onClick={e => { e.stopPropagation(); setMode('idle') }} style={{
                  background: 'transparent', color: 'rgba(252,165,165,0.6)', border: '1px solid rgba(220,38,38,0.3)',
                  borderRadius: '6px', padding: '6px 10px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                }}>✕</button>
              </div>
            </div>
          )}

          {/* Bottom label strip */}
          {!media && mode === 'idle' && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(26,8,8,0.9) 0%, transparent 100%)',
              padding: '1.5rem 1rem 1rem',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', flexShrink: 0 }} />
              <span className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,245,245,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{hint}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function CreativeWork() {
  return (
    <section id="creative-work" style={{ padding: '100px 2.5rem', background: '#0F0505' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}
        >
          <div>
            <div className="section-chip" style={{ color: '#FCA5A5', marginBottom: '0.75rem' }}>
              <span style={{ background: '#FCA5A5' }} />
              Showcase
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#FFF5F5', margin: 0, lineHeight: 1.1 }}>
              Creative <span style={{ color: '#DC2626', fontStyle: 'italic' }}>Work</span>
            </h2>
          </div>
          <p style={{ color: 'rgba(255,245,245,0.4)', fontSize: '0.88rem', lineHeight: 1.65, maxWidth: '320px', margin: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            Upload your reels, brand videos, and campaign clips directly — or paste a YouTube link to embed.
          </p>
        </motion.div>

        {/* Five equal portrait cards */}
        <div style={{
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'stretch',
        }}>
          {REEL_SLOTS.map(slot => (
            <ReelCard key={slot.label} label={slot.label} sublabel={slot.sublabel} hint={slot.hint} />
          ))}
        </div>

        {/* Footer hint */}
        <p className="font-mono" style={{ textAlign: 'center', fontSize: '0.65rem', color: 'rgba(255,245,245,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2rem' }}>
          Click any card to upload · Paste a YouTube or Vimeo link to embed
        </p>
      </div>
    </section>
  )
}

/* ─── Leadership ─────────────────────────────────────────── */
function Leadership() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="leadership" style={{ padding: '100px 2.5rem', background: '#FFF5F5' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-chip" style={{ marginBottom: '0.75rem' }}>Beyond Work</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#1A0808', marginBottom: '0.75rem' }}>
            Leadership &amp; <span style={{ color: '#DC2626', fontStyle: 'italic' }}>Initiatives</span>
          </h2>
          <p style={{ color: '#5C2C2C', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Roles that shaped my ability to lead, collaborate, and deliver under pressure.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {LEADERSHIP.map((l, i) => (
            <motion.div
              key={l.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                border: `1.5px solid ${open === i ? '#DC2626' : '#FECACA'}`,
                borderRadius: '12px', background: open === i ? '#FFF5F5' : '#fff',
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: open === i ? '0 6px 24px rgba(220,38,38,0.12)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#DC2626', fontWeight: 700, fontSize: '0.95rem' }}>{l.org}</span>
                  <span style={{ color: '#1A0808', fontSize: '0.92rem', marginLeft: '10px' }}>· {l.title}</span>
                </div>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: '#DC2626', fontSize: '1.1rem', display: 'inline-block' }}>▾</motion.span>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.5rem 1.25rem' }}>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: '#4A2020', margin: 0 }}>{l.desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Award */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '3rem', background: 'linear-gradient(135deg,#9B1C1C,#DC2626)', borderRadius: '14px', padding: '2rem', color: '#fff' }}
        >
          <div className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#FCA5A5', textTransform: 'uppercase', marginBottom: '0.75rem' }}>🏆 Academic Award</div>
          <p className="font-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, margin: 0, color: '#fff' }}>
            Best Research Paper — <em>"Learning for Legacy: How Sustainable Education Shapes the Future of Bharat"</em>
          </p>
          <p style={{ fontSize: '0.85rem', color: '#FCA5A5', marginTop: '0.75rem', margin: '0.75rem 0 0' }}>
            National Conference on Innovation and Knowledge Management · Poornima University, Jaipur
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginTop: '1.5rem', background: '#fff', border: '1.5px solid #FECACA', borderRadius: '14px', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#DC2626', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>🎓 Education</div>
            <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#1A0808', margin: 0 }}>Poornima University</h3>
            <p style={{ fontSize: '0.9rem', color: '#5C2C2C', margin: '4px 0 0' }}>BBA · Specialization in Digital Marketing</p>
          </div>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: '#9B1C1C', background: '#FEE2E2', padding: '4px 14px', borderRadius: '6px' }}>Jaipur, Rajasthan</span>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText('dhriti.career@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" style={{
      background: '#121214',
      padding: '100px 1.5rem 60px',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* Header Title with Star Decorator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#DC2626">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <span className="font-mono" style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FCA5A5',
            }}>
              let's connect.
            </span>
          </div>

          <h2 className="font-display" style={{
            fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            margin: 0,
            lineHeight: 1.0,
            color: '#ffffff',
          }}>
            let’s work <span style={{ fontStyle: 'italic', color: '#DC2626' }}>together.</span>
          </h2>
        </motion.div>

        {/* Main Grid: Left Details & Right Action Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '5rem',
        }}>
          
          {/* Left Column: Pitch & Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#1A1A1E',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 className="font-display" style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1rem',
              }}>
                Open for New Opportunities
              </h3>
              <p style={{
                fontSize: '0.98rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-body)',
              }}>
                Actively looking for full-time marketing roles, brand management, content strategy, and creative collaborations across India &amp; global markets.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Email Copy Trigger */}
              <motion.div
                onClick={copy}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(220,38,38,0.15)', borderColor: '#DC2626' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '1.1rem 1.25rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.2rem',
                  }}>
                    ✉
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                      Direct Email
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                      dhriti.career@gmail.com
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: copied ? '#4ADE80' : '#FCA5A5',
                  background: copied ? 'rgba(74,222,128,0.15)' : 'rgba(220,38,38,0.2)',
                  padding: '5px 12px',
                  borderRadius: '8px',
                }}>
                  {copied ? '✓ Copied!' : 'Click to copy'}
                </span>
              </motion.div>

              {/* Phone Link */}
              <motion.a
                href="tel:+918000488008"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                style={{
                  padding: '1.1rem 1.25rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: '#ffffff',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                  }}>
                    📞
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                      Phone / Mobile
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                      +91 80004 88008
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Call ↗</span>
              </motion.a>

              {/* Location Badge */}
              <div style={{
                padding: '1.1rem 1.25rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  📍
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    Location
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    Jaipur, Rajasthan, India (Open to Relocation)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Status Card & CTA Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#1A1A1E',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Availability Status Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(74, 222, 128, 0.12)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                color: '#4ADE80',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '1.75rem',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ADE80',
                  boxShadow: '0 0 10px #4ADE80',
                }} />
                Available for Full-Time Roles
              </div>

              <h3 className="font-display" style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}>
                Ready to elevate your brand presence?
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-body)',
              }}>
                Whether you have an opening in mind, need strategic content creation, or just want to connect over digital marketing trends — reach out directly.
              </p>
            </div>

            {/* Quick CTAs Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.a
                href="mailto:dhriti.career@gmail.com"
                whileHover={{ scale: 1.03, backgroundColor: '#B91C1C' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#DC2626',
                  color: '#ffffff',
                  padding: '16px 24px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 24px rgba(220,38,38,0.3)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>✉</span> Send Email Directly
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/dhriti_arora"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, backgroundColor: '#004182' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#0A66C2',
                  color: '#ffffff',
                  padding: '14px 24px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>in</span> Connect on LinkedIn ↗
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* Footer Sub-Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <span className="font-display" style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              fontStyle: 'italic',
              color: '#ffffff',
            }}>
              Dhriti <span style={{ color: '#DC2626' }}>Arora</span>
            </span>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
              BBA Digital Marketing (2021–2025)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
              © 2026 Dhriti Arora. All rights reserved.
            </span>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, backgroundColor: '#DC2626' }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                border: 'none',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              title="Back to Top"
            >
              ↑
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <SkillsToolsEducation />
      <Projects />
      <Contact />
    </div>
  )
}
