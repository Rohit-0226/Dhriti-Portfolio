import React, { useState, useEffect, useRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import dhritiTransparentImg from './imports/dhriti_transparent.webp'
import dhritiAboutImg from './imports/dhriti_cutout.jpg'
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

/* ─── Motion System ─────────────────────────────────────────
 * One vocabulary for the whole site. Every entrance uses these
 * tokens so sections feel like they belong to the same page
 * instead of each having its own hand-tuned timing.
 * ---------------------------------------------------------- */

/** Expo-out: quick departure, long soft landing. The site's signature curve. */
const EASE = [0.16, 1, 0.3, 1] as const
/** Gentler curve for small UI moves (hovers, taps, toggles). */
const EASE_SOFT = [0.33, 1, 0.68, 1] as const

const DUR = {
  fast: 0.28,
  base: 0.5,
  slow: 0.7,
} as const

/** Shared whileInView config — fires slightly before the element is centred. */
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -60px 0px' } as const

/**
 * Entrance variants. Distances stay small (16–28px) — large travel is what
 * makes scroll animations feel sluggish and janky on mid-range phones.
 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE } },
}

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE } },
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE } },
}

/** Parent that releases its children in sequence. */
const stagger = (each = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
})

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

/* ─── Responsive helpers ────────────────────────────────── */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Single source of truth for layout breakpoints. */
function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  return { isMobile, isTablet, isCompact: isMobile || isTablet }
}

/**
 * Section headings rise out from behind a clipping mask instead of simply
 * fading. Costs one transform, reads as deliberate rather than decorative.
 */
function RevealHeading({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const reduced = useReducedMotion()

  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
      <m.span
        initial={reduced ? { opacity: 0 } : { y: '110%' }}
        whileInView={reduced ? { opacity: 1 } : { y: '0%' }}
        viewport={VIEWPORT}
        transition={{ duration: 0.85, ease: EASE, delay }}
        style={{ display: 'block', willChange: 'transform', ...style }}
      >
        {children}
      </m.span>
    </span>
  )
}

/**
 * Counts a metric up when it scrolls into view. Parses the surrounding
 * characters off the value ("4,159%" / "50+" / "4.6K++") so the prefix and
 * suffix survive, and animates only the number itself.
 */
function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/)
  const [prefix, rawNum, suffix] = match ? [match[1], match[2], match[3]] : ['', '', value]
  const target = parseFloat(rawNum.replace(/,/g, ''))
  const decimals = rawNum.includes('.') ? rawNum.split('.')[1].length : 0
  const grouped = rawNum.includes(',')

  const [display, setDisplay] = useState(() => (reduced || !match ? rawNum : '0'))

  useEffect(() => {
    if (!inView || !match || reduced || !isFinite(target)) {
      if (match) setDisplay(rawNum)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      // Ease-out cubic: fast climb, gentle settle onto the final figure.
      const eased = 1 - Math.pow(1 - t, 3)
      const current = target * eased
      const text = current.toFixed(decimals)
      setDisplay(grouped ? Number(text).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) : text)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(rawNum)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, match, reduced, target, rawNum, decimals, duration, grouped])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/**
 * Long body copy clamped to a few lines on phones with a tap-to-expand toggle.
 * Full text is always in the DOM, so nothing is lost for search or screen readers.
 */
function ExpandableText({
  text,
  clamp = true,
  lines = 3,
  style,
}: {
  text: string
  clamp?: boolean
  lines?: number
  style?: React.CSSProperties
}) {
  const [expanded, setExpanded] = useState(false)

  if (!clamp) return <p style={style}>{text}</p>

  return (
    <div>
      <p
        style={{
          ...style,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: expanded ? 'none' : lines,
          overflow: 'hidden',
          margin: 0,
        }}
      >
        {text}
      </p>
      <m.button
        onClick={() => setExpanded((v) => !v)}
        whileTap={{ scale: 0.96 }}
        style={{
          background: 'none',
          border: 'none',
          padding: '6px 0 0',
          margin: 0,
          color: '#DC2626',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {expanded ? 'Show less' : 'Read more'}
        <m.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: DUR.fast, ease: EASE }}
          style={{ display: 'inline-block', fontSize: '0.7rem' }}
        >
          ▾
        </m.span>
      </m.button>
    </div>
  )
}

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills & Tools', href: '#skills-tools' },
  { name: 'Projects', href: '#projects' },
]

/* ─── Scroll Progress Bar ───────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Raw scroll maps 1:1 to the bar and inherits every jitter of a trackpad or
  // momentum scroll. A spring damps it into a continuous glide.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <m.div
      style={{
        scaleX,
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
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile } = useBreakpoint()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled((prev) => {
      if (!prev && latest > 48) return true
      if (prev && latest < 24) return false
      return prev
    })
  })

  // Close the drawer if the viewport grows back to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

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
        padding: isMobile ? '10px 1rem' : scrolled ? '14px 1.5rem' : '0 2.5rem',
        pointerEvents: 'none',
        transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <m.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DUR.slow, ease: EASE }}
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: isMobile ? '100%' : scrolled ? 'min(860px, 92vw)' : '100%',
          height: isMobile ? '58px' : scrolled ? '56px' : '66px',
          borderRadius: isMobile ? '20px' : scrolled ? '999px' : '0px',
          padding: isMobile ? '0 0.6rem 0 1.1rem' : scrolled ? '0 1.75rem' : '0 0rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isMobile
            ? 'rgba(255, 255, 255, 0.72)'
            : scrolled
              ? 'rgba(255, 255, 255, 0.88)'
              : 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderTop: `1px solid rgba(0, 0, 0, ${isMobile || scrolled ? 0.08 : 0})`,
          borderLeft: `1px solid rgba(0, 0, 0, ${isMobile || scrolled ? 0.08 : 0})`,
          borderRight: `1px solid rgba(0, 0, 0, ${isMobile || scrolled ? 0.08 : 0})`,
          borderBottom: isMobile || scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
          boxShadow: `0 16px 40px rgba(0, 0, 0, ${isMobile || scrolled ? 0.08 : 0})`,
          // Promote to its own layer so the blur isn't re-sampled against the
          // whole page, and isolate the morph so it can't reflow the document.
          willChange: 'width, height, padding, border-radius',
          contain: 'layout style',
          transition:
            'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1), ' +
            'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1), ' +
            'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Brand Logo with Space: Dhriti Arora */}
        <m.div
          whileHover={{ scale: 1.03 }}
          className="font-display"
          style={{
            fontSize: isMobile ? '1.35rem' : scrolled ? '1.5rem' : '1.7rem',
            fontWeight: 800,
            fontStyle: 'italic',
            cursor: 'pointer',
            color: '#000000',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            transition: 'font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={() => {
            setMenuOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Dhriti <span style={{ color: '#DC2626' }}>Arora</span>
        </m.div>

        {isMobile ? (
          /* Hamburger Toggle */
          <m.button
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: menuOpen ? '#DC2626' : 'rgba(255,255,255,0.6)',
              border: `1px solid ${menuOpen ? '#DC2626' : 'rgba(0,0,0,0.1)'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
          >
            {[0, 1].map((i) => (
              <m.span
                key={i}
                animate={
                  menuOpen
                    ? { rotate: i === 0 ? 45 : -45, y: i === 0 ? 3.5 : -3.5, width: 18 }
                    : { rotate: 0, y: 0, width: i === 0 ? 18 : 12 }
                }
                transition={{ duration: DUR.fast, ease: EASE }}
                style={{
                  height: '2px',
                  borderRadius: '2px',
                  background: menuOpen ? '#ffffff' : '#1A0808',
                  display: 'block',
                }}
              />
            ))}
          </m.button>
        ) : (
          /* Desktop: Connected Section Anchor Links */
          <div style={{ display: 'flex', gap: scrolled ? '1.8rem' : '2.2rem', alignItems: 'center', transition: 'gap 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            {NAV_LINKS.map((item) => (
              <m.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2, color: '#DC2626' }}
                style={{
                  color: '#1F2937',
                  fontSize: scrolled ? '0.94rem' : '1.02rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease, font-size 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {item.name}
              </m.a>
            ))}

            {/* Primary Action Button */}
            <m.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: '#B91C1C' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: '#DC2626',
                color: '#ffffff',
                padding: scrolled ? '8px 22px' : '10px 26px',
                borderRadius: '999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(220,38,38,0.22)',
                transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Let's Connect →
            </m.a>
          </div>
        )}

        {/* Mobile Glass Dropdown Panel */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <m.div
              className="mobile-nav-panel"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: DUR.fast, ease: EASE }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: 0,
                right: 0,
                borderRadius: '22px',
                padding: '0.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                transformOrigin: 'top center',
              }}
            >
              {NAV_LINKS.map((item, i) => (
                <m.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: DUR.fast, ease: EASE, delay: 0.06 + i * 0.05 }}
                  whileTap={{ scale: 0.98, backgroundColor: 'rgba(220,38,38,0.08)' }}
                  style={{
                    color: '#1A0808',
                    fontSize: '1rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {item.name}
                  <span style={{ color: '#DC2626', fontSize: '0.9rem' }}>→</span>
                </m.a>
              ))}

              <m.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.fast, ease: EASE, delay: 0.28 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#DC2626',
                  color: '#ffffff',
                  padding: '0.9rem 1rem',
                  marginTop: '6px',
                  borderRadius: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 700,
                  textAlign: 'center',
                  boxShadow: '0 8px 22px rgba(220,38,38,0.28)',
                }}
              >
                Let's Connect →
              </m.a>
            </m.div>
          )}
        </AnimatePresence>
      </m.nav>

      {/* Tap-away backdrop */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <m.div
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            style={{
              position: 'fixed',
              inset: 0,
              top: '76px',
              background: 'rgba(26, 8, 8, 0.28)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              pointerEvents: 'auto',
              zIndex: -1,
            }}
          />
        )}
      </AnimatePresence>
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
  const { isMobile, isTablet } = useBreakpoint()
  const reduced = useReducedMotion()

  // The four floating pills loop forever. Left ungated they keep waking the
  // compositor for the whole page, so they idle once the hero scrolls away.
  const stageRef = useRef<HTMLDivElement>(null)
  const stageInView = useInView(stageRef, { amount: 0.1 })
  const pillsActive = stageInView && !reduced

  useEffect(() => {
    // The greeting rotator is the same story: no point ticking off-screen.
    if (!stageInView) return
    const timer = setInterval(() => {
      setHelloIndex((prev) => (prev + 1) % MULTI_LANG_HELLOS.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [stageInView])

  const currentGreeting = MULTI_LANG_HELLOS[helloIndex]

  /** Bob loop for a floating pill, paused when the hero is out of view. */
  const bob = (distance: number, duration: number, delay = 0) =>
    pillsActive
      ? {
          animate: { y: [0, distance, 0] },
          transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay },
        }
      : { animate: { y: 0 }, transition: { duration: DUR.fast, ease: EASE_SOFT } }

  const pillStyle: React.CSSProperties = {
    background: '#1A0808',
    color: '#fff',
    padding: isMobile ? '8px 16px' : '11px 24px',
    borderRadius: '999px',
    fontFamily: 'var(--font-display)',
    fontSize: isMobile ? '0.78rem' : '0.94rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '6px' : '10px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.12)',
    whiteSpace: 'nowrap',
    zIndex: 20,
    position: 'absolute',
  }

  return (
    <section id="about" style={{
      minHeight: isMobile ? 'auto' : '100vh',
      background: '#FFFBFB',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '84px 1.1rem 0px' : '100px 1.5rem 0px',
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
        
        {/* Top Header Block - Flex Column enforces vertical stacking on all screen resolutions */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginBottom: '1.5rem',
        }}>
          {/* Centered Rotating Multi-Language Hello Badge */}
          <m.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginBottom: '1.25rem',
              width: 'max-content',
            }}
          >
            <div className="font-display" style={{
              background: '#FFFBFB', border: '1.5px solid #1A0808', padding: '6px 24px', borderRadius: '999px',
              fontSize: '0.9rem', fontWeight: 600, color: '#1A0808', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              minWidth: '140px', textAlign: 'center', height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AnimatePresence mode="wait">
                <m.span
                  key={currentGreeting.word}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: DUR.fast, ease: EASE }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {currentGreeting.word} {currentGreeting.flag}
                </m.span>
              </AnimatePresence>
            </div>

            {/* Spark Accents */}
            <svg style={{ position: 'absolute', right: '-18px', top: '-12px', pointerEvents: 'none' }} width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v5M6 4l3 4M18 4l-3 4" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </m.div>

          {/* Main Headline Block */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <h1 className="font-display" style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)', fontWeight: 700, color: '#1A0808',
              lineHeight: 1.1, margin: 0, letterSpacing: '-0.025em', textAlign: 'center',
            }}>
              I'm <span style={{ color: '#DC2626', fontWeight: 800 }}>Dhriti</span> 👋,<br />
              <span>Brand &amp; Marketing Creative</span>
            </h1>
          </m.div>
        </div>

        {/* Central Graphic Area with Huge Red Arch & Cutout Image */}
        <div ref={stageRef} style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: isMobile ? 'clamp(340px, 88vw, 430px)' : isTablet ? '430px' : '480px',
        }}>
          {/* RIGHT FLANKING HERO TAGLINE — anchored right: 0rem on pure white dot grid background */}
          {!isMobile && (
            <m.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.3 }}
              style={{
                position: 'absolute', right: '0rem', bottom: '22%',
                textAlign: 'right', zIndex: 15, pointerEvents: 'none',
              }}
            >
              <div className="font-display" style={{
                fontSize: isTablet ? '1.3rem' : '1.85rem',
                fontWeight: 800,
                color: '#1A0808',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}>
                IDEAS <span style={{ color: '#DC2626' }}>→</span> EXECUTION
              </div>
              <p className="font-mono" style={{
                fontSize: isTablet ? '0.72rem' : '0.82rem',
                color: '#DC2626',
                fontWeight: 700,
                margin: '6px 0 0',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                Brand • Marketing • Growth
              </p>
            </m.div>
          )}

          {/* HUGE RED DOME ARCH */}
          <m.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
            style={{
              position: 'absolute', bottom: 0,
              width: isMobile ? 'min(400px, 94vw)' : isTablet ? 'min(560px, 82vw)' : '680px',
              height: isMobile ? 'clamp(200px, 52vw, 280px)' : isTablet ? '310px' : '360px',
              borderTopLeftRadius: '350px', borderTopRightRadius: '350px',
              background: 'linear-gradient(180deg, #DC2626 0%, #EF4444 50%, #9B1C1C 100%)',
              boxShadow: '0 20px 60px rgba(220, 38, 38, 0.35)',
              zIndex: 1,
            }}
          />

          {/* PURE TRANSPARENT CUTOUT PORTRAIT (Pops out high above red dome arch!) */}
          <div style={{
            position: 'relative', zIndex: 5,
            width: isMobile ? 'min(290px, 74vw)' : isTablet ? '390px' : '460px',
            height: isMobile ? 'clamp(360px, 90vw, 450px)' : isTablet ? '490px' : '560px',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '0px',
            overflow: 'visible',
          }}>
            <m.img
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.25 }}
              src={dhritiTransparentImg}
              alt="Dhriti Arora"
              decoding="async"
              fetchPriority="high"
              style={{
                width: '100%', height: '112%', objectFit: 'contain', objectPosition: 'bottom center',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
                transform: 'translateY(-24px)',
              }}
            />

            {/* FLOATING BLACK PILLS */}
            {/* Pill 1: Top Left - Marketing */}
            <m.div
              {...bob(-8, 4)}
              style={{ ...pillStyle, top: '28%', left: isMobile ? '-20px' : '-70px' }}
            >
              <span style={{ fontSize: isMobile ? '0.95rem' : '1.2rem' }}>📣</span> Marketing
            </m.div>

            {/* Pill 2: Bottom Left - Brand Management */}
            <m.div
              {...bob(8, 5, 0.5)}
              style={{ ...pillStyle, bottom: '18%', left: isMobile ? '-15px' : '-80px' }}
            >
              <span style={{ fontSize: isMobile ? '0.95rem' : '1.2rem' }}>🌟</span> Brand Management
            </m.div>

            {/* Pill 3: Top Right - Personal Branding */}
            <m.div
              {...bob(-10, 4.5, 0.2)}
              style={{ ...pillStyle, top: '28%', right: isMobile ? '-20px' : '-80px' }}
            >
              <span style={{ fontSize: isMobile ? '0.95rem' : '1.2rem' }}>✨</span> Personal Branding
            </m.div>

            {/* Pill 4: Bottom Right - Social Media */}
            <m.div
              {...bob(8, 5.5, 0.7)}
              style={{ ...pillStyle, bottom: '10%', right: isMobile ? '-15px' : '-70px' }}
            >
              <span style={{ fontSize: isMobile ? '0.95rem' : '1.2rem' }}>🤳</span> Social Media
            </m.div>
          </div>

        </div>

        {/* MOBILE: tagline restacked beneath the portrait */}
        {isMobile && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.35 }}
            style={{
              display: 'flex', flexDirection: 'column', gap: '0.4rem',
              textAlign: 'center', marginTop: '1.5rem', width: '100%',
            }}
          >
            <div>
              <div className="font-display" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1A0808', lineHeight: 1.1 }}>
                IDEAS <span style={{ color: '#DC2626' }}>→</span> EXECUTION
              </div>
              <p className="font-mono" style={{ fontSize: '0.8rem', color: '#DC2626', margin: '6px 0 0', lineHeight: 1.4, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Brand • Marketing • Growth
              </p>
            </div>
          </m.div>
        )}

        {/* BOTTOM FLOATING ACTION BAR */}
        <m.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.4 }}
          style={{ position: 'relative', zIndex: 25, marginTop: isMobile ? '2rem' : '-20px', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            background: '#1A0808', padding: '5px 6px', borderRadius: '999px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <m.a
              href="https://drive.google.com/file/d/1mQAwcemebkcWtThhc86C3kij1MQHsa22/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
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
            </m.a>
            <m.a
              href="#contact"
              whileHover={{ color: '#fff' }}
              style={{
                color: 'rgba(255,245,245,0.7)', padding: '10px 20px', fontFamily: 'var(--font-display)',
                fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none',
              }}
            >
              Let's Connect
            </m.a>
          </div>
        </m.div>

      </div>
    </section>
  )
}

/* ─── Slanted Ticker Ribbon ─────────────────────────────── */
function SlantedTicker() {
  const { isMobile } = useBreakpoint()
  const ref = useRef<HTMLDivElement>(null)
  // A 32s infinite transform keeps the compositor busy even far off-screen.
  const inView = useInView(ref, { amount: 0 })

  const items = ['Personal Branding', '✦', 'Brand Strategy', '✦', 'Marketing', '✦', 'Social Media', '✦', 'Growth Strategy', '✦', 'Content Creation', '✦', 'Event Management', '✦']
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div ref={ref} style={{
      width: '110vw',
      marginLeft: '-5vw',
      transform: isMobile ? 'rotate(-2deg)' : 'rotate(-2.5deg)',
      background: '#ffffff',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      padding: isMobile ? '12px 0' : '18px 0',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
      marginBottom: isMobile ? '2.5rem' : '4.5rem',
      position: 'relative',
      zIndex: 10,
    }}>
      <div
        className="animate-marquee"
        style={{
          display: 'flex',
          gap: isMobile ? '1.75rem' : '3rem',
          whiteSpace: 'nowrap',
          width: 'max-content',
          alignItems: 'center',
          animationPlayState: inView ? 'running' : 'paused',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-display" style={{
            fontSize: isMobile ? '1rem' : '1.4rem',
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
  const { isMobile, isCompact } = useBreakpoint()

  return (
    <section id="about-detail" style={{
      background: '#FFFBFB',
      padding: isMobile ? '10px 0 70px' : '10px 0 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Slanted Ticker Ribbon */}
      <SlantedTicker />

      {/* Main Content Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isCompact ? '1fr' : '1.15fr 0.85fr',
          gap: isMobile ? '2.5rem' : '4.5rem',
          alignItems: 'center',
        }}>
          
          {/* Left Column: Text Content */}
          <m.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: EASE }}
          >
            <h2 className="font-display" style={{
              fontSize: 'clamp(3.8rem, 7vw, 5.4rem)',
              fontWeight: 800,
              color: '#000000',
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              lineHeight: 0.95,
            }}>
              <RevealHeading>about.</RevealHeading>
            </h2>

            {/* Premium Styled Subheading */}
            <div className="font-display" style={{
              fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)',
              fontWeight: 800,
              color: '#DC2626',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ display: 'inline-block', width: '28px', height: '3px', background: '#DC2626', borderRadius: '99px', flexShrink: 0 }} />
              <span>Just a curious kid with too many ideas.</span>
            </div>

            {/* Premium Editorial Body Paragraphs */}
            <div style={{ fontSize: '1.04rem', lineHeight: 1.8, color: '#374151', fontFamily: 'var(--font-body)' }}>
              <p style={{ marginBottom: '1.35rem', fontWeight: 700, color: '#1A0808', fontSize: '1.14rem', lineHeight: 1.6 }}>
                I'm Dhriti — a brand &amp; marketing creative who is fascinated by why people notice, remember and connect with things.
              </p>

              <p style={{ marginBottom: '1.35rem', color: '#4A2020' }}>
                I love exploring the space where creativity, communication, culture and strategy meet — from understanding brand analytics and human psychology to crafting stories, building personal brands and creating content that actually feels like something.
              </p>

              <p style={{ marginBottom: '1.35rem', color: '#4A2020' }}>
                I'm naturally drawn to <span style={{ fontWeight: 700, color: '#1A0808', borderBottom: '2px solid #FCA5A5' }}>Brand Management, Marketing, Personal Branding, Content Creation and Ghostwriting</span>. I enjoy taking an idea, making sense of it, giving it a personality and figuring out how it can create a real result.
              </p>

              <p style={{
                margin: 0,
                fontStyle: 'italic',
                color: '#5C2C2C',
                background: '#FFF5F5',
                padding: '14px 20px',
                borderRadius: '14px',
                borderLeft: '4px solid #DC2626',
                fontWeight: 500,
              }}>
                You'll probably find me journaling, dancing Kathak, exploring a new skill or getting lost in some random idea. ✨
              </p>
            </div>
          </m.div>

          {/* Right Column: Image popping out of compact Pure Black Semi-Circle Arch */}
          <m.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              width: isMobile ? 'min(340px, 88vw)' : '440px',
              height: isMobile ? 'clamp(360px, 90vw, 460px)' : '460px',
            }}
          >
            {/* BLACK SEMI-CIRCLE ARCH STAGE (Height 240px - compact dome arch!) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: isMobile ? 'clamp(170px, 44vw, 240px)' : '240px',
              borderTopLeftRadius: '220px',
              borderTopRightRadius: '220px',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              background: '#000000',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              zIndex: 2,
            }}>
              <img
                src={dhritiAboutImg}
                alt="Dhriti Arora About Base"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%) translateY(34px)',
                  width: isMobile ? 'min(350px, 90vw)' : '440px',
                  height: isMobile ? 'clamp(380px, 94vw, 480px)' : '480px',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                }}
              />
            </div>

            {/* UNCLIPPED TOP HEAD & TORSO (Pops out high above the black arch!) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 3,
            }}>
              <img
                src={dhritiAboutImg}
                alt="Dhriti Arora About Popout"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%) translateY(34px)',
                  width: isMobile ? 'min(350px, 90vw)' : '440px',
                  height: isMobile ? 'clamp(380px, 94vw, 480px)' : '480px',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))',
                }}
              />
            </div>
          </m.div>

        </div>
      </div>
    </section>
  )
}

/* ─── Skills, Tools & Education Section (Reference Replica with Real Content) ─── */
function SkillsToolsEducation() {
  const { isMobile, isCompact } = useBreakpoint()

  const skillPillsLine1 = [
    'Brand Management',
    'Growth Marketing',
    'Social Media Management',
    'Ghostwriting',
  ]
  const skillPillsLine2 = [
    'Content Creation',
    'Campaign Execution',
    'Market Research',
    'Personal Branding',
  ]

  const toolCategories = [
    {
      title: 'Visual Design & Presentation',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* Canva */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ECFEFF', border: '1px solid #CFFAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0891B2' }}>C</span>
          </div>
          {/* Presentation Design */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F2', border: '1px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="#E11D48" strokeWidth="2"/>
              <path d="M12 17v4M8 21h8" stroke="#E11D48" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 10l3 3 5-5" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Visual Communication */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.2rem' }}>🎨</span>
          </div>
        </div>
      ),
      tools: ['Canva', 'Presentation Design', 'Visual Communication'],
    },
    {
      title: 'Productivity & Office Suites',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* Microsoft Office */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF1F2', border: '1px solid #FECDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#E11D48"/>
              <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#10B981"/>
              <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#3B82F6"/>
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#F59E0B"/>
            </svg>
          </div>
          {/* Google Workspace */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#4285F4" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M12 12L3 7M12 12l9-5M12 12v10" stroke="#EA4335" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ),
      tools: ['Microsoft Office (Excel, PowerPoint, Word)', 'Google Workspace (Docs, Sheets, Slides, Drive)'],
    },
    {
      title: 'Content & Marketing Tech',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* Mailchimp */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FEFCE8', border: '1px solid #FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.2rem' }}>🐵</span>
          </div>
          {/* WATI WhatsApp API */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l5.05-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#25D366"/>
              <path d="M8.5 9.5c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4.3.7.8 1.8.9 2 .1.2.1.3 0 .5-.1.2-.2.3-.4.5-.1.1-.3.3-.2.5.3.6.9 1.5 1.7 2.1.8.6 1.6.9 2.2 1.1.2.1.4 0 .5-.2.2-.3.6-.8.8-1 .1-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.4 0 .6-.4 1.4-1 1.6-.6.2-1.4.3-3.8-.6-2.9-1.2-4.8-4.2-5-4.4-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6z" fill="#FFFFFF"/>
            </svg>
          </div>
          {/* Storytelling */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FAF5FF', border: '1px solid #F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.2rem' }}>✍️</span>
          </div>
        </div>
      ),
      tools: ['Content Strategy & Storytelling', 'Ghostwriting', 'Mailchimp', 'WATI (WhatsApp Business API)'],
    },
    {
      title: 'Management & Strategy',
      renderLogos: () => (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          {/* Event Management */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFF7ED', border: '1px solid #FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.2rem' }}>🎟️</span>
          </div>
          {/* Social Media Management */}
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '1.2rem' }}>📣</span>
          </div>
        </div>
      ),
      tools: ['Event Management', 'Social Media Management'],
    },
  ]

  return (
    <section id="skills-tools" style={{ padding: isMobile ? '60px 1.25rem 70px' : '80px 1.5rem 100px', background: '#FFFBFB' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* TOP BLOCK: *skills. */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem', position: 'relative' }}
        >
          {/* Hand-drawn Radiating Arc Sparks on Left & Right */}
          <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
            {/* Left Radiating Curved Arcs */}
            {!isMobile && (
              <svg style={{ position: 'absolute', left: '-60px', top: '-25px' }} width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M42 45C30 40 18 36 6 38" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M45 28C28 22 14 18 4 20" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M48 10C36 18 28 30 30 42" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            )}

            {/* Right Radiating Curved Arcs */}
            {!isMobile && (
              <svg style={{ position: 'absolute', right: '-60px', top: '-25px' }} width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M8 45C20 40 32 36 44 38" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M5 28C22 22 36 18 46 20" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M2 10C14 18 22 30 20 42" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            )}

            {/* Title with Hand-Drawn Doodle Star SVG & Red Period Accent */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {/* Hand-Drawn Doodle Star SVG */}
              <svg width={isMobile ? 34 : 48} height={isMobile ? 34 : 48} viewBox="0 0 40 40" fill="none" style={{ marginTop: '-8px', flexShrink: 0 }}>
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
                <RevealHeading>skills</RevealHeading>
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
            <m.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={VIEWPORT} style={{ display: 'flex', gap: isMobile ? '0.6rem' : '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {skillPillsLine1.map((skill) => (
                <m.span
                  key={skill}
                  variants={fadeUp}
                  whileHover={{ scale: 1.06, y: -2, borderColor: '#DC2626' }}
                  whileTap={{ scale: 0.96, borderColor: '#DC2626' }}
                  className="font-display"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #1A0808',
                    padding: isMobile ? '7px 16px' : '8px 24px',
                    borderRadius: '999px',
                    fontSize: isMobile ? '0.85rem' : '1rem',
                    fontWeight: 600,
                    color: '#1A0808',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {skill}
                </m.span>
              ))}
            </m.div>

            {/* Line 2 */}
            <m.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={VIEWPORT} style={{ display: 'flex', gap: isMobile ? '0.6rem' : '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {skillPillsLine2.map((skill) => (
                <m.span
                  key={skill}
                  variants={fadeUp}
                  whileHover={{ scale: 1.06, y: -2, borderColor: '#DC2626' }}
                  whileTap={{ scale: 0.96, borderColor: '#DC2626' }}
                  className="font-display"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #1A0808',
                    padding: isMobile ? '7px 16px' : '8px 24px',
                    borderRadius: '999px',
                    fontSize: isMobile ? '0.85rem' : '1rem',
                    fontWeight: 600,
                    color: '#1A0808',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {skill}
                </m.span>
              ))}
            </m.div>
          </div>
        </m.div>

        {/* BOTTOM GRID: tools. (Left) & education. (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isCompact ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? '1.5rem' : '2.5rem',
          alignItems: 'start',
        }}>
          
          {/* LEFT CARD: tools. */}
          <m.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: EASE }}
            style={{
              background: '#ffffff',
              borderRadius: isMobile ? '22px' : '28px',
              padding: isMobile ? '2rem 1.4rem' : '3rem 2.5rem',
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
                <RevealHeading>tools</RevealHeading>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '1.75rem 1rem' : '2.5rem 2rem', flex: 1 }}>
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
          </m.div>

          {/* RIGHT CARD: education. */}
          <m.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: EASE }}
            style={{
              background: '#ffffff',
              borderRadius: isMobile ? '22px' : '28px',
              padding: isMobile ? '2rem 1.4rem' : '3rem 2.5rem',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
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
                <RevealHeading>education</RevealHeading>
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
                    2023 – 2026 · Jaipur, Rajasthan
                  </p>

                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                    Specialization in Brand Strategy, Growth Marketing, Content Creation &amp; Campaign Management. Head of Cultural &amp; NGO Initiatives.
                  </p>
                </div>
              </div>

            </div>
          </m.div>

        </div>

      </div>
    </section>
  )
}

/* ─── Experience Section (Reference Replica) ─────────────────────────── */
function Experience() {
  const { isMobile } = useBreakpoint()
  const reduced = useReducedMotion()

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
      skills: ['Content Creation', 'Social Media Management', 'Public Speaking'],
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
      padding: isMobile ? '60px 1.25rem 70px' : '80px 1.5rem 100px',
      background: '#FFFBFB',
    }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>

        {/* Main Card Container */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
          style={{
            background: '#ffffff',
            borderRadius: isMobile ? '22px' : '28px',
            padding: isMobile ? '2.25rem 1.4rem' : '3.5rem 3rem',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
          }}
        >
          {/* Section Title */}
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            fontWeight: 800,
            color: '#000000',
            letterSpacing: '-0.04em',
            marginBottom: isMobile ? '2.25rem' : '3.5rem',
            lineHeight: 1.0,
          }}>
            <RevealHeading>experience.</RevealHeading>
          </h2>

          {/* Timeline List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0rem', position: 'relative' }}>
            {experiences.map((exp, index) => {
              const isLast = index === experiences.length - 1
              return (
                <m.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: DUR.base, ease: EASE, delay: index * (isMobile ? 0.04 : 0.1) }}
                  style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', position: 'relative', paddingBottom: isLast ? '0' : isMobile ? '1.75rem' : '2.75rem' }}
                >
                  {/* Left Column: Logo Badge & Connector Line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flexShrink: 0 }}>
                    {/* Brand Logo Badge */}
                    <m.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      whileHover={{ scale: 1.08, rotate: -3 }}
                      style={{
                      width: isMobile ? '48px' : '64px',
                      height: isMobile ? '48px' : '64px',
                      borderRadius: isMobile ? '13px' : '16px',
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
                          loading="lazy"
                          decoding="async"
                          style={{ width: isMobile ? '32px' : '44px', height: isMobile ? '32px' : '44px', objectFit: 'contain' }}
                        />
                      ) : (
                        exp.logoText
                      )}
                    </m.div>

                    {/* Connecting Vertical Line — draws downward as it enters view.
                        The line is structural, so when motion is reduced it renders
                        plainly rather than depending on an animation to become visible. */}
                    {!isLast && (
                      <m.div
                        initial={reduced ? false : { scaleY: 0 }}
                        whileInView={reduced ? undefined : { scaleY: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                        style={{
                          width: '3.5px',
                          flex: 1,
                          background: '#3182CE',
                          marginTop: '6px',
                          marginBottom: '-6px',
                          borderRadius: '2px',
                          transformOrigin: 'top center',
                          willChange: 'transform',
                        }}
                      />
                    )}
                  </div>

                  {/* Right Column: Experience Details */}
                  <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                    {/* Line 1: Role Title */}
                    <h3 className="font-display" style={{
                      fontSize: isMobile ? '1.05rem' : '1.2rem',
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
                    <div style={{ marginBottom: '12px' }}>
                      <ExpandableText
                        text={exp.description}
                        clamp={isMobile}
                        lines={3}
                        style={{
                          fontSize: isMobile ? '0.88rem' : '0.94rem',
                          lineHeight: 1.62,
                          color: '#334155',
                          margin: isMobile ? 0 : '0 0 12px',
                          fontFamily: 'var(--font-body)',
                        }}
                      />
                    </div>

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
                </m.div>
              )
            })}
          </div>

        </m.div>

      </div>
    </section>
  )
}

/* ─── Projects Section ───────────────────────────────────── */
function Projects() {
  const { isMobile, isCompact } = useBreakpoint()
  const [activeReelModal, setActiveReelModal] = useState<{
    id: string
    url: string
    embedUrl: string
    title: string
  } | null>(null)
  const [inlineReelId, setInlineReelId] = useState<string | null>(null)

  const droneReels = [
    {
      id: 'DP1HOi1gV5u',
      url: 'https://www.instagram.com/reel/DP1HOi1gV5u/',
      embedUrl: 'https://www.instagram.com/reel/DP1HOi1gV5u/embed',
      img: reelImg1,
      title: 'FPV Flight Shoot',
      views: '32.4k',
      offset: '-24px',
    },
    {
      id: 'DL1gZxruAuW',
      url: 'https://www.instagram.com/reel/DL1gZxruAuW/',
      embedUrl: 'https://www.instagram.com/reel/DL1gZxruAuW/embed',
      img: reelImg2,
      title: 'Brand Presenter',
      views: '48.1k',
      offset: '24px',
    },
    {
      id: 'DKbq4CTBITl',
      url: 'https://www.instagram.com/reel/DKbq4CTBITl/',
      embedUrl: 'https://www.instagram.com/reel/DKbq4CTBITl/embed',
      img: reelImg3,
      title: 'City Aerial Shoot',
      views: '54.9k',
      offset: '-24px',
    },
    {
      id: 'DKJkYa-MA3o',
      url: 'https://www.instagram.com/reel/DKJkYa-MA3o/',
      embedUrl: 'https://www.instagram.com/reel/DKJkYa-MA3o/embed',
      img: reelImg4,
      title: 'Behind The Scenes',
      views: '29.3k',
      offset: '24px',
    },
    {
      id: 'DIGzp7kBxAX',
      url: 'https://www.instagram.com/reel/DIGzp7kBxAX/',
      embedUrl: 'https://www.instagram.com/reel/DIGzp7kBxAX/embed',
      img: reelImg5,
      title: 'Drone Unboxing',
      views: '41.8k',
      offset: '-24px',
    },
  ]

  return (
    <section id="projects" style={{ background: '#FFFBFB', paddingBottom: isMobile ? '70px' : '100px' }}>

      {/* Dark Divider Segregation Banner: 00 notable Projects */}
      <m.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DUR.slow, ease: EASE }}
        style={{
          background: '#121214',
          padding: isMobile ? '3.5rem 1.25rem 3.75rem' : '6rem 2rem 6.5rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '0.5rem' : '2.5rem',
          color: '#ffffff',
          marginBottom: isMobile ? '3rem' : '5.5rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* 00 Stroked Number */}
        <span className="font-display" style={{
          fontSize: 'clamp(4rem, 12vw, 10.5rem)',
          fontWeight: 900,
          fontStyle: 'italic',
          color: 'transparent',
          WebkitTextStroke: isMobile ? '2px #ffffff' : '3px #ffffff',
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
        }}>
          00
        </span>

        {/* Main Heading Text: notable Projects */}
        <h2 className="font-display" style={{
          fontSize: 'clamp(2.6rem, 9.5vw, 8.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          margin: 0,
          color: '#ffffff',
          lineHeight: 0.95,
        }}>
          <RevealHeading>notable <span style={{ fontStyle: 'italic', color: '#DC2626' }}>Projects</span></RevealHeading>
        </h2>
      </m.div>

      {/* Main Project 01 Container */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 1.5rem' }}>
        
        {/* Project 01 Card: Voice of Doctors */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
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
            padding: isMobile ? '1.15rem 1.4rem' : '1.5rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: isMobile ? '0.35rem' : '1rem',
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
              fontSize: isMobile ? '0.95rem' : '1.2rem',
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}>
              Voice of Doctors, Season 2
            </span>
          </div>

          {/* Card Body */}
          <div style={{
            padding: isMobile ? '2rem 1.4rem' : '3.5rem 3rem',
            display: 'grid',
            gridTemplateColumns: isCompact ? '1fr' : '1.1fr 0.9fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'center',
          }}>
            
            {/* Left Column: Role & Deliverables */}
            <div>
              {/* Role Chip & Logo */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
                <span style={{
                  background: '#1E293B',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  padding: '5px 14px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  🩺 Voice of Doctors
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display" style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#1A0808',
                margin: '0 0 1rem',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                50+ Voices. One Seamless Experience.
              </h4>

              <div style={{ marginBottom: isMobile ? '1.25rem' : '2rem' }}>
                <p style={{
                  fontSize: isMobile ? '0.92rem' : '1rem',
                  lineHeight: 1.7,
                  color: '#334155',
                  fontFamily: 'var(--font-body)',
                  margin: '0 0 0.85rem',
                }}>
                  Led the end-to-end coordination of Voice of Doctors Season 2, bringing together doctors, speakers and project teams across virtual sessions and on-ground events.
                </p>
                <p style={{
                  fontSize: isMobile ? '0.92rem' : '1rem',
                  lineHeight: 1.7,
                  color: '#334155',
                  fontFamily: 'var(--font-body)',
                  margin: 0,
                }}>
                  Managed speaker coordination, stakeholder communication, scheduling, documentation and team alignment, ensuring smooth execution from planning to delivery.
                </p>
              </div>

              {/* Highlight Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '0.6rem' : '1rem', marginBottom: isMobile ? '1.25rem' : '2rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#DC2626', display: 'block' }}>
                    <CountUp value="50+" />
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                    Doctors &amp; Speakers Coordinated
                  </span>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', display: 'block' }}>
                    <CountUp value="100%" />
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                    Event Execution
                  </span>
                </div>
              </div>

              {/* Deliverable Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  'Event Operations',
                  'Speaker Coordination',
                  'Stakeholder Management',
                  'Virtual Events',
                  'On-ground Execution',
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#334155',
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
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: isMobile ? '350px' : '420px', width: '100%' }}>

              {/* Polaroid 1 (Tilted Left - Team & VOD Logo Stage) */}
              <m.div
                whileHover={{ rotate: -2, scale: 1.04, zIndex: 10 }}
                whileTap={{ rotate: -2, scale: 1.04, zIndex: 10 }}
                style={{
                  position: 'absolute',
                  left: isMobile ? '-5px' : '0px',
                  top: isMobile ? '5px' : '15px',
                  width: isMobile ? 'min(210px, 58vw)' : '280px',
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
                    height: isMobile ? '165px' : '225px',
                    objectFit: 'cover',
                    objectPosition: '30% center',
                    borderRadius: '2px',
                  }}
                />
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textAlign: 'center', marginTop: '10px', fontWeight: 600 }}>
                  Doctor Dialogue Stage 📸
                </span>
              </m.div>

              {/* Polaroid 2 (Tilted Right - Award Presentation Stage) */}
              <m.div
                whileHover={{ rotate: 3, scale: 1.04, zIndex: 10 }}
                whileTap={{ rotate: 3, scale: 1.04, zIndex: 10 }}
                style={{
                  position: 'absolute',
                  right: isMobile ? '-5px' : '0px',
                  bottom: isMobile ? '5px' : '15px',
                  width: isMobile ? 'min(210px, 58vw)' : '280px',
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
                    height: isMobile ? '165px' : '225px',
                    objectFit: 'cover',
                    objectPosition: '74% center',
                    borderRadius: '2px',
                  }}
                />
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', textAlign: 'center', marginTop: '10px', fontWeight: 600 }}>
                  Season 2 Highlights ✨
                </span>
              </m.div>

            </div>

          </div>

        </m.div>

        {/* Project 02 Card: Drone Rangers */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
          style={{
            background: '#FAFBF4',
            borderRadius: isMobile ? '22px' : '28px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            marginTop: isMobile ? '2rem' : '4rem',
          }}
        >
          {/* Top Banner Ribbon: 02. Projects | drone rangers, content creator */}
          <div style={{
            background: '#D9CB9E',
            padding: isMobile ? '1.15rem 1.4rem' : '1.5rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: isMobile ? '0.35rem' : '1rem',
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
              fontSize: isMobile ? '0.95rem' : '1.2rem',
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}>
              Drone Rangers, Content Creator
            </span>
          </div>

          {/* Card Body: Info Header & 5 Staggered Reel Cards */}
          <div style={{ padding: isMobile ? '2rem 1.25rem 2.5rem' : '3.5rem 2.5rem 5rem' }}>

            {/* Role Header Info */}
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              <p style={{ fontSize: isMobile ? '0.88rem' : '0.95rem', color: '#4A5568', margin: 0, fontFamily: 'var(--font-body)' }}>
                {isMobile
                  ? 'Swipe through the reels to preview the auto-playing promotional content & engagement metrics.'
                  : 'Hover over any reel to preview the auto-playing promotional content & engagement metrics.'}
              </p>
            </div>
            <div className={isMobile ? 'snap-tray' : undefined} style={{
              // On phones the 9:16 cards stack into a very tall grid, so they
              // become a snap-scrolling tray instead — one row, swipeable.
              display: isMobile ? 'flex' : 'grid',
              gridTemplateColumns: isCompact ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
              gap: isMobile ? '0.75rem' : '1.25rem',
              alignItems: 'center',
              maxWidth: '1000px',
              margin: '0 auto',
              ...(isMobile && {
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                paddingBottom: '4px',
                // let cards bleed to the card edge rather than stopping at padding
                marginInline: '-1.25rem',
                paddingInline: '1.25rem',
              }),
            }}>
              {droneReels.map((reel, index) => {
                const isInline = inlineReelId === reel.id

                return (
                  <m.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: DUR.base, ease: EASE, delay: index * (isMobile ? 0.05 : 0.1) }}
                    whileHover={{ scale: 1.04, y: -5, zIndex: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveReelModal(reel)}
                    style={{
                      transform: isCompact ? 'none' : `translateY(${reel.offset})`,
                      position: 'relative',
                      borderRadius: isMobile ? '18px' : '24px',
                      overflow: 'hidden',
                      background: '#09090B',
                      boxShadow: '0 14px 35px rgba(0,0,0,0.18)',
                      aspectRatio: '9/16',
                      cursor: 'pointer',
                      border: '2px solid rgba(255,255,255,0.8)',
                      ...(isMobile && {
                        flex: '0 0 46%',
                        scrollSnapAlign: 'center',
                      }),
                    }}
                  >
                    {isInline ? (
                      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000000' }}>
                        <iframe
                          src={reel.embedUrl}
                          title={reel.title}
                          style={{ width: '100%', height: '100%', border: 'none' }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setInlineReelId(null)
                          }}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(0,0,0,0.75)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '26px',
                            height: '26px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            zIndex: 20,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Background Cover Image */}
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
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.88) 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '1rem 0.85rem',
                        }}>
                          {/* Top Engagement Badge */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <span style={{
                              background: 'rgba(0,0,0,0.6)',
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
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            background: 'rgba(220, 38, 38, 0.9)',
                            backdropFilter: 'blur(8px)',
                            border: '2px solid rgba(255,255,255,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            boxShadow: '0 6px 20px rgba(220,38,38,0.4)',
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>

                          {/* Bottom Title Label & Action */}
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setInlineReelId(reel.id)
                                }}
                                style={{
                                  fontSize: '0.65rem',
                                  color: '#ffffff',
                                  background: 'rgba(255,255,255,0.25)',
                                  padding: '2px 8px',
                                  borderRadius: '999px',
                                  fontWeight: 700,
                                }}
                              >
                                ▶ Play Inline
                              </span>
                              <span style={{ fontSize: '0.65rem', color: '#FCA5A5', fontWeight: 600 }}>
                                • Tap to Watch
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </m.div>
                )
              })}
            </div>
          </div>

        </m.div>

        {/* Project 03 Card: Personal Branding & What Others Say */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.3 }}
          style={{
            background: '#FAFBF4',
            borderRadius: isMobile ? '22px' : '28px',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            marginTop: isMobile ? '2rem' : '4rem',
          }}
        >
          {/* Header Ribbon: 03. Projects | Personal Branding & Recommendations */}
          <div style={{
            background: '#D9CB9E',
            padding: isMobile ? '1.15rem 1.4rem' : '1.5rem 3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: isMobile ? '0.35rem' : '1rem',
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
              fontSize: isMobile ? '0.95rem' : '1.2rem',
              fontWeight: 800,
              color: '#000000',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}>
              Personal Branding &amp; Recommendations
            </span>
          </div>

          {/* Card Body Container */}
          <div style={{ padding: isMobile ? '2rem 1.25rem 2.5rem' : '3.5rem 2.5rem 4.5rem', display: 'flex', flexDirection: 'column', gap: isMobile ? '2rem' : '4rem' }}>
            
            {/* ─── SLIDE 1: PERSONAL BRANDING ─── */}
            <div style={{
              background: '#ffffff',
              borderRadius: isMobile ? '18px' : '24px',
              padding: isMobile ? '1.75rem 1.15rem' : '3rem 2.5rem',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
            }}>
              {/* Slide 1 Header */}
              <h4 className="font-display" style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#000000',
                textAlign: 'center',
                marginBottom: isMobile ? '1.5rem' : '2.5rem',
                letterSpacing: '-0.03em',
              }}>
                Personal Branding
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: isCompact ? '1fr' : '1fr 1.1fr', gap: isMobile ? '1.5rem' : '2.5rem', alignItems: 'center' }}>
                
                {/* Left Card: OBJECTIVES, MY SCOPE, STRATEGY */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '20px',
                  padding: isMobile ? '1.5rem 1.25rem' : '2.25rem 2rem',
                  border: '1px solid #E2E8F0',
                }}>
                  {/* OBJECTIVES */}
                  <div style={{ marginBottom: isMobile ? '1.25rem' : '1.75rem' }}>
                    <h5 className="font-display" style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                      OBJECTIVES
                    </h5>
                    <ExpandableText
                      text="Career-focused personal branding & community growth strategy by creating valuable content, fostering audience engagement, and building digital authority across TikTok, LinkedIn, and Instagram."
                      clamp={isMobile}
                      lines={3}
                      style={{ fontSize: isMobile ? '0.88rem' : '0.92rem', lineHeight: 1.6, color: '#475569', margin: 0, fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  {/* MY SCOPE */}
                  <div style={{ marginBottom: isMobile ? '1.25rem' : '1.75rem' }}>
                    <h5 className="font-display" style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                      MY SCOPE
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: isMobile ? 1.55 : 1.7, fontFamily: 'var(--font-body)' }}>
                      <li>Ads Strategy and Optimization</li>
                      <li>Visual Ad Content and Creative Direction</li>
                      <li>Campaign Execution and Management</li>
                      <li>Analytics and Performance Optimization</li>
                    </ul>
                  </div>

                  {/* STRATEGY */}
                  <div>
                    <h5 className="font-display" style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', fontWeight: 900, color: '#000000', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                      STRATEGY
                    </h5>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: isMobile ? '0.85rem' : '0.9rem', lineHeight: isMobile ? 1.55 : 1.7, fontFamily: 'var(--font-body)' }}>
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
                    marginBottom: isMobile ? '1.25rem' : '2rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}>
                    <img
                      src={personalBrandingImg}
                      alt="Personal Branding Analytics Dashboard"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: isMobile ? '170px' : '240px', objectFit: 'cover' }}
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
                        <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}><CountUp value="4.6K++" /> ↑</span>
                      </div>

                      {/* Metric 2 */}
                      <div style={{ background: '#ffffff', padding: '8px 14px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Impressions</span>
                        <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}><CountUp value="500K" /> ↑</span>
                      </div>

                      {/* Metric 3 */}
                      <div style={{ background: '#ffffff', padding: '8px 14px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', fontWeight: 600 }}>Profile Views</span>
                        <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}><CountUp value="4,159%" /> ↑</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* ─── SLIDE 2: WHAT OTHERS SAY (LINKEDIN RECOMMENDATIONS) ─── */}
            <div style={{
              background: '#ffffff',
              borderRadius: isMobile ? '18px' : '24px',
              padding: isMobile ? '1.75rem 1.15rem' : '3rem 2.5rem',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
            }}>
              {/* Slide 2 Header */}
              <h4 className="font-display" style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#000000',
                textAlign: 'center',
                marginBottom: isMobile ? '1.5rem' : '2.5rem',
                letterSpacing: '-0.03em',
              }}>
                What others Say!
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: isCompact ? '1fr' : '1.25fr 0.75fr', gap: isMobile ? '1.5rem' : '2.5rem', alignItems: 'center' }}>
                
                {/* Left Card: LinkedIn Recommendations Quotes Container */}
                <div style={{
                  background: '#FAF6ED',
                  borderRadius: '20px',
                  padding: isMobile ? '1.25rem 1rem' : '2.25rem 2rem',
                  border: '2px solid #8B5CF6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '0.85rem' : '1.5rem',
                  boxShadow: '0 8px 24px rgba(139,92,246,0.08)',
                }}>
                  {/* Quote 1 */}
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: isMobile ? '0.9rem 1rem' : '1.25rem 1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
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
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: isMobile ? '0.9rem 1rem' : '1.25rem 1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
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
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: isMobile ? '0.9rem 1rem' : '1.25rem 1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
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

        </m.div>

      </div>

      {/* Interactive Playable Reel Video Player Modal Overlay */}
      <AnimatePresence>
        {activeReelModal && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReelModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <m.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: isMobile ? 'min(360px, 94vw)' : '380px',
                height: isMobile ? 'min(640px, 85vh)' : '660px',
                background: '#000000',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Modal Top Bar */}
              <div style={{
                padding: '12px 16px',
                background: '#121214',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                zIndex: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1rem' }}>🎥</span>
                  <span className="font-display" style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700 }}>
                    {activeReelModal.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveReelModal(null)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    color: '#ffffff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Live Playable Instagram Reel Iframe */}
              <iframe
                src={activeReelModal.embedUrl}
                title={activeReelModal.title}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#000000',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
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
    <m.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: DUR.fast, ease: EASE }}
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
    </m.div>
  )
}

function CreativeWork() {
  return (
    <section id="creative-work" style={{ padding: '100px 2.5rem', background: '#0F0505' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
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
        </m.div>

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
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
        >
          <div className="section-chip" style={{ marginBottom: '0.75rem' }}>Beyond Work</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#1A0808', marginBottom: '0.75rem' }}>
            Leadership &amp; <span style={{ color: '#DC2626', fontStyle: 'italic' }}>Initiatives</span>
          </h2>
          <p style={{ color: '#5C2C2C', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Roles that shaped my ability to lead, collaborate, and deliver under pressure.</p>
        </m.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {LEADERSHIP.map((l, i) => (
            <m.div
              key={l.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.base, ease: EASE, delay: i * 0.1 }}
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
                <m.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: DUR.fast, ease: EASE }} style={{ color: '#DC2626', fontSize: '1.1rem', display: 'inline-block' }}>▾</m.span>
              </div>
              <AnimatePresence>
                {open === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DUR.fast, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.5rem 1.25rem' }}>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: '#4A2020', margin: 0 }}>{l.desc}</p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </div>

        {/* Award */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
          style={{ marginTop: '3rem', background: 'linear-gradient(135deg,#9B1C1C,#DC2626)', borderRadius: '14px', padding: '2rem', color: '#fff' }}
        >
          <div className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#FCA5A5', textTransform: 'uppercase', marginBottom: '0.75rem' }}>🏆 Academic Award</div>
          <p className="font-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6, margin: 0, color: '#fff' }}>
            Best Research Paper — <em>"Learning for Legacy: How Sustainable Education Shapes the Future of Bharat"</em>
          </p>
          <p style={{ fontSize: '0.85rem', color: '#FCA5A5', marginTop: '0.75rem', margin: '0.75rem 0 0' }}>
            National Conference on Innovation and Knowledge Management · Poornima University, Jaipur
          </p>
        </m.div>

        {/* Education */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.1 }}
          style={{ marginTop: '1.5rem', background: '#fff', border: '1.5px solid #FECACA', borderRadius: '14px', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#DC2626', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>🎓 Education</div>
            <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#1A0808', margin: 0 }}>Poornima University</h3>
            <p style={{ fontSize: '0.9rem', color: '#5C2C2C', margin: '4px 0 0' }}>BBA · Specialization in Digital Marketing</p>
          </div>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: '#9B1C1C', background: '#FEE2E2', padding: '4px 14px', borderRadius: '6px' }}>Jaipur, Rajasthan</span>
        </m.div>
      </div>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false)
  const { isMobile } = useBreakpoint()
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
      padding: isMobile ? '64px 1.25rem 50px' : '100px 1.5rem 60px',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* Header Title with Star Decorator */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
          style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}
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
            <RevealHeading>let’s work <span style={{ fontStyle: 'italic', color: '#DC2626' }}>together.</span></RevealHeading>
          </h2>
        </m.div>

        {/* Main Grid: Left Details & Right Action Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: isMobile ? '1.75rem' : '2.5rem',
          marginBottom: isMobile ? '3rem' : '5rem',
        }}>
          
          {/* Left Column: Pitch & Contact Channels */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: EASE }}
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
              <m.div
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
              </m.div>

              {/* Phone Link */}
              <m.a
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
              </m.a>

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
          </m.div>

          {/* Right Column: Status Card & CTA Actions */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.slow, ease: EASE }}
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
              <m.a
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
              </m.a>

              <m.a
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
              </m.a>
            </div>
          </m.div>

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
            
            <m.button
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
            </m.button>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  return (
    /**
     * LazyMotion + `m` ships only the DOM animation feature set instead of the
     * full `motion` bundle. `strict` makes the build fail loudly if a plain
     * `motion.*` component ever sneaks back in and silently undoes the saving.
     *
     * MotionConfig sets the house transition once, and `reducedMotion="user"`
     * lets framer-motion drop transform/layout animation for people who ask
     * for it — keeping opacity fades — instead of a blunt CSS override.
     */
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: DUR.base, ease: EASE }}>
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
      </MotionConfig>
    </LazyMotion>
  )
}
