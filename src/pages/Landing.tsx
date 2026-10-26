import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Instagram, ArrowUpRight, MoveRight, Github } from 'lucide-react'
import { EASE, INTRO_DELAY, ASSETS, REPO_URL } from '@/lib/constants'
import { StarField } from '@/components/StarField'
import { LineField } from '@/components/LineField'
import { TOTAL } from '@/data/catalog'

const blurIn = {
  hidden: { opacity: 0, y: 24, filter: 'blur(14px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, delay: INTRO_DELAY + i * 0.08, ease: EASE },
  }),
}

const photoIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay: INTRO_DELAY + 0.1 + i * 0.1, ease: EASE },
  }),
}

const PINTEREST = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0a12 12 0 0 0-4.4 23.2c-.1-1-.2-2.5 0-3.6l1.5-6.3s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4 .2.7.8 1.4 1.7 1.4 2 0 3.5-2.2 3.5-5.3 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2 .9 2.6.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3-.1.2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.6-6.9 4 0 7.1 2.8 7.1 6.6 0 4-2.5 7.2-6 7.2-1.2 0-2.3-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3.1A12 12 0 1 0 12 0z" />
  </svg>
)

interface HeroCard {
  src: string
  alt: string
  pos: string
  size: string
  depth: number
  badge?: 'ig' | 'pin'
  viewAlbum?: boolean
}

const HERO_CARDS: HeroCard[] = [
  { src: '/imgs/hero-letters-bw.png', alt: 'Lead type case', pos: 'top-[2%] left-[34%]', size: 'w-[150px] aspect-[4/3]', depth: 18, badge: 'ig' },
  { src: '/imgs/hero-letters-close.png', alt: 'Letterpress sorts', pos: 'top-[2%] right-[2%]', size: 'w-[260px] aspect-[16/9]', depth: 22 },
  { src: '/imgs/hero-press.png', alt: 'Printing press', pos: 'top-[7%] left-[4%]', size: 'w-[110px] aspect-[3/4]', depth: 28, badge: 'ig' },
  { src: '/imgs/hero-red.png', alt: 'Red dress', pos: 'top-[10%] right-[12%]', size: 'w-[200px] aspect-[3/4]', depth: 26, badge: 'pin', viewAlbum: true },
  { src: '/imgs/hero-typesetter.png', alt: 'Typesetter', pos: 'top-[18%] left-[3%]', size: 'w-[220px] aspect-[3/4]', depth: 20, badge: 'ig' },
  { src: '/imgs/hero-marble.png', alt: 'Marble letter', pos: 'bottom-[calc(6%-10px)] left-[calc(34%-90px)]', size: 'w-[160px] aspect-[4/5]', depth: 24, badge: 'pin' },
  { src: '/imgs/hero-carriers.png', alt: 'Carriers', pos: 'bottom-[6%] right-[22%]', size: 'w-[230px] aspect-[16/10]', depth: 22 },
]

const PROJECTS = [
  { src: '/imgs/project-press.png', alt: 'Press roller', title: 'Press Machinery', titleZh: '印刷机械', mt: 'md:mt-20', w: 'w-[216px]', tall: false },
  { src: '/imgs/project-case.png', alt: 'Type case', title: 'Antique Type', titleZh: '古董铅字', mt: 'md:mt-25', w: 'w-[220px]', tall: true },
  { src: '/imgs/project-hand.png', alt: 'Sign painting', title: 'Hand Lettering', titleZh: '手写招牌', mt: 'md:mt-10', w: 'w-[230px]', tall: false },
  { src: '/imgs/project-sculpture.png', alt: 'Letter sculpture', title: 'Letter Forms', titleZh: '字母雕塑', mt: 'md:mt-4', w: 'w-[200px]', tall: false },
]


function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3))
      el.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={ref}
      className="relative matte min-h-[110vh] pt-32 pb-24 overflow-hidden"
      style={{ ['--mx' as string]: 0, ['--my' as string]: 0 }}
    >
      <div className="absolute inset-0">
        <StarField count={700} />
        <LineField variant="hero" />
        <img
          src={ASSETS.ellipseArc}
          alt=""
          aria-hidden
          className="absolute top-[10%] left-1/2 w-[1500px] max-w-none opacity-50"
          style={{ transform: 'translateX(-78%)' }}
        />
        <img
          src={ASSETS.ellipseArc}
          alt=""
          aria-hidden
          className="absolute top-[10%] left-1/2 w-[1500px] max-w-none opacity-50"
          style={{ transform: 'translateX(-22%)' }}
        />
        <img
          src={ASSETS.noise}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-overlay z-[1]"
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.04] blur-3xl z-[1]" />
      </div>

      {/* 7 floating cards */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block" aria-hidden>
        {HERO_CARDS.map((c, i) => (
          <motion.div
            key={c.src}
            className={`absolute ${c.pos} ${c.size}`}
            variants={photoIn}
            custom={i}
            initial="hidden"
            animate="show"
            style={{
              transform: `translate3d(calc(var(--mx) * ${c.depth}px), calc(var(--my) * ${c.depth}px), 0)`,
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="relative w-full h-full overflow-hidden group shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              <img src={c.src} alt={c.alt} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              {c.badge && (
                <span className="absolute bottom-2 right-2 w-6 h-6 rounded-md bg-black/40 backdrop-blur-sm grid place-items-center text-white/80">
                  {c.badge === 'ig' ? <Instagram className="w-3 h-3" /> : PINTEREST}
                </span>
              )}
              {c.viewAlbum && (
                <span className="absolute left-4 bottom-5 pointer-events-none flex items-center gap-2.5">
                  <span className="grid place-items-center">
                    <span className="absolute w-[55px] h-[55px] rounded-full bg-white/30 blur-[10px]" />
                    <span className="absolute w-[38px] h-[38px] rounded-full bg-white/50 blur-[4px]" />
                    <span className="block w-[25px] h-[25px] rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,0.7)]" />
                  </span>
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* center block */}
      <div className="relative z-30 grid place-items-center min-h-[80vh] px-6 text-center max-w-2xl mx-auto">
        <div
          style={{
            transform: 'translate3d(calc(var(--mx)*10px), calc(var(--my)*10px), 0)',
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <motion.h1
            className="font-display font-black text-7xl md:text-[110px] leading-[0.95] tracking-tight"
            variants={blurIn}
            custom={1}
            initial="hidden"
            animate="show"
          >
            FONT
            <br />
            ARCHIVE
          </motion.h1>
          <motion.p
            className="mt-6 text-[11px] uppercase tracking-[0.5em] text-white/40"
            variants={blurIn}
            custom={2}
            initial="hidden"
            animate="show"
          >
            字体档案馆
          </motion.p>
          <motion.p
            className="mt-6 text-white/55 text-base md:text-[15px] leading-relaxed max-w-md mx-auto"
            variants={blurIn}
            custom={3}
            initial="hidden"
            animate="show"
          >
            {TOTAL.toLocaleString('en-US')} typefaces across 22 cinematic genres. Crafting visual stories
            that speak before a single frame moves.
            <span className="mt-3 block text-[13px] text-white/35">
              {TOTAL.toLocaleString('en-US')} 款字体，覆盖 22 种影视类型——让画面开口之前，字先说话。
            </span>
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-2.5"
            variants={blurIn}
            custom={5}
            initial="hidden"
            animate="show"
          >
            <span className="relative grid place-items-center">
              <span className="absolute w-[55px] h-[55px] rounded-full bg-white/30 blur-[10px]" />
              <span className="absolute w-[38px] h-[38px] rounded-full bg-white/50 blur-[4px]" />
              <span className="block w-[25px] h-[25px] rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,0.7)]" />
            </span>
            <a
              href="#/library"
              className="grid place-items-center rounded-full bg-black/35 backdrop-blur-md text-white text-[13px] border border-white/15 h-[39px] px-7 hover:bg-black/50 transition pointer-events-auto"
            >
              Enter Library <span className="ml-2 text-white/40 text-[11px]">进入字库</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-30">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
        <MoveRight className="w-3.5 h-3.5 rotate-90" />
      </div>
    </section>
  )
}

function CollectionSection() {
  return (
    <section className="relative matte px-6 md:px-12 py-32 overflow-hidden">
      <div className="absolute inset-0">
        <StarField count={500} />
        <LineField variant="photographer" />
        <img src={ASSETS.fabric} alt="" aria-hidden className="absolute left-0 top-1/3 w-[280px] md:w-[340px] opacity-[0.13] pointer-events-none select-none z-[1]" />
        <img src={ASSETS.silhouettes} alt="" aria-hidden className="absolute right-0 top-[12%] w-[360px] md:w-[460px] opacity-[0.16] pointer-events-none select-none z-[1]" />
        <img src={ASSETS.nikon} alt="" aria-hidden className="absolute right-[4%] bottom-0 w-[280px] md:w-[360px] opacity-[0.14] pointer-events-none select-none z-[1]" />
        <img src={ASSETS.noise} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-overlay z-[1]" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl z-[1]" />
      </div>

      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        <motion.div
          className="relative w-full max-w-[440px] justify-self-center md:justify-self-end bg-[#efeae0] p-4 pb-20 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 60, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="relative">
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img src="/imgs/portrait.png" alt="Type designer portrait" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 text-black font-display font-black text-2xl leading-none">
              THE
              <br />
              ARCHIVE
              <span className="mt-1 block font-body text-[8px] font-normal tracking-[0.3em] text-black/45">
                字体档案馆
              </span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <h2 className="font-display font-medium text-4xl md:text-5xl leading-[1.05] uppercase w-[600px] max-w-full mt-[-28px]">
              curated by genre,
              <br />
              built for
              <br />
              screen
            </h2>
            <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-white/40">
              按类型策展，为银幕而生
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 text-white/55 text-[15px] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <p>
              Typography is the first frame of every film. An action title needs
              compressed weight and impact; a romance needs the breathing room of a
              fine serif; a wuxia epic needs the bones of a brush. The wrong face
              misleads the audience before the first image moves.
            </p>
            <p className="text-[13px] text-white/35">
              字体是每部电影的第一个画面。动作片要压缩的重量与冲击，爱情片要衬线的呼吸感，武侠片要毛笔的骨力——选错字体，观众在第一个镜头之前就已经被误导。
            </p>
            <p>
              Every face here is arranged by the genre it was built for — drawn from
              open-source foundries and curated for the screen, each one previewed in
              its native form.
            </p>
            <p className="text-[13px] text-white/35">
              这里的每一款字体都按它原本服务的类型归位：取自开源字库，为屏幕策展，并以字体本来的样子呈现。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AllGenresSection() {
  return (
    <section className="relative matte px-6 md:px-12 py-32 overflow-hidden">
      <div className="absolute inset-0">
        <StarField count={550} ring ringCount={260} ringRadiusFactor={0.37} ringBandWidth={50} />
        <LineField variant="projects" />
        <img src={ASSETS.noise} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-overlay z-[1]" />
      </div>

      <div className="relative z-[2] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <h2 className="font-display font-black text-5xl md:text-6xl uppercase leading-[0.95]">
              All types of
              <br />
              genres
            </h2>
            <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-white/40">
              囊括所有类型
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-start md:items-end justify-end gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <p className="text-white/55 text-[15px] max-w-md md:text-right">
              Twenty-two cinematic genres, each with faces that speak its language —
              from compressed action blacks to whisper-thin romance scripts.
              <span className="mt-3 block text-[13px] text-white/35">
                22 种影视类型，各有各的字体语言——从压缩到极致的动作黑体，到轻如耳语的爱情手写。
              </span>
            </p>
            <a
              href="#/library"
              className="group flex items-center gap-3 text-sm uppercase tracking-widest text-white/70 hover:text-white transition"
            >
              Enter the library <span className="text-[11px] tracking-normal text-white/35">进入字库</span>
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.src}
              className={p.mt}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
            >
              <div className={`${p.w} mx-auto overflow-hidden group shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10`}>
                <img
                  src={p.src}
                  alt={p.alt}
                  className={`w-full ${p.tall ? 'aspect-[3/4]' : 'aspect-[4/5]'} object-cover transition-transform duration-[1500ms] group-hover:scale-110`}
                />
              </div>
              <div className="text-center space-y-3 mt-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  {p.title}
                </h3>
                <span className="block text-[10px] tracking-[0.24em] text-white/40">
                  {p.titleZh}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-white/60 border border-white/15 rounded-full px-3 py-1.5 hover:bg-white/5 transition">
                  Type Specimen <span className="text-white/35">字样</span>
                  <span className="w-4 h-4 rounded-full border border-white/20 grid place-items-center">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <section className="relative overflow-hidden">
      <div className="relative px-6 md:px-12 pt-28 pb-12">
        <div className="absolute inset-0">
          <StarField count={450} />
          <LineField variant="marvels" />
          <img src={ASSETS.noise} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-overlay z-[1]" />
        </div>
        <motion.div
          className="relative z-[2]"
          initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <h2 className="font-display font-medium uppercase text-5xl md:text-[86px] leading-[0.95] tracking-tight max-w-[1200px]">
            The right face,
            <br />
            the first frame
          </h2>
          <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-white/40">
            对的字，第一个画面
          </p>
        </motion.div>
        <div className="relative z-[2] mt-16 flex items-center justify-between text-xs uppercase tracking-widest text-white/50">
          <span>
            Browse every typeface <span className="tracking-normal text-white/30">浏览全部字体</span>
          </span>
          <span>
            22 Genres · {TOTAL.toLocaleString('en-US')} Faces{' '}
            <span className="tracking-normal text-white/30">
              22 种类型 · {TOTAL.toLocaleString('en-US')} 款
            </span>
          </span>
        </div>
      </div>

      <div ref={ref} className="relative h-[80vh] overflow-hidden">
        <motion.div className="absolute inset-0 -top-[10%] -bottom-[10%]" style={{ y }}>
          <img src={ASSETS.getInTouchBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        <LineField variant="marvelsBottom" />

        <div className="relative h-full grid place-items-center px-6 text-center">
          <div>
            <motion.h3
              className="font-display font-black uppercase text-4xl md:text-7xl leading-[1] tracking-tight"
              initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              Find the type for
              <br />
              <span className="text-lime">your next film.</span>
            </motion.h3>
            <motion.p
              className="mt-5 text-[12px] tracking-[0.3em] text-white/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              为下一部片子，找到对的字。
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
              <a
                href="#/library"
                className="mt-10 inline-flex bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-white/90 uppercase transition"
              >
                Enter Library <span className="ml-2 text-black/45 text-[11px]">进入字库</span>
              </a>
              <span className="w-[19px] h-[19px] rounded-full border border-white mt-10 flex items-center justify-center">
                <ArrowUpRight className="w-2.5 h-2.5 text-white" />
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TopBar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: INTRO_DELAY - 0.2, ease: EASE }}
    >
      <div className="flex items-center justify-between">
        <a href="#/" className="pointer-events-auto flex flex-col leading-none">
          <span className="font-display font-black text-white text-lg tracking-tight">
            FONT&nbsp;<span className="text-lime">ARCHIVE</span>
          </span>
          <span className="mt-1.5 font-body text-[8px] tracking-[0.32em] text-white/35">
            字体档案馆
          </span>
        </a>
        <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-white/15 bg-black/70 px-4 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <a
            href="#/library"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/70 hover:text-white transition"
          >
            Enter Library <span className="tracking-normal text-white/35">进入字库</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="text-white/50 transition hover:text-white"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.header>
  )
}

export default function Landing() {
  return (
    <>
      <TopBar />
      <main>
        <HeroSection />
        <CollectionSection />
        <AllGenresSection />
        <ClosingSection />
      </main>
      <footer className="relative border-t border-white/10 px-6 md:px-12 py-6 flex items-center justify-between text-xs text-white/40">
        <span>
          All Rights Reserved — 2026 <span className="text-white/25">保留所有权利</span>
        </span>
        <span>
          Font Archive <span className="text-white/25">字体档案馆</span>
        </span>
      </footer>
    </>
  )
}
