import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Download, Loader2, ArrowLeft } from 'lucide-react'
import { faces, genreOptions, styleOptions, TOTAL, type Face } from '@/data/catalog'
import { useLocalLibrary } from '@/lib/useLocalLibrary'
import { useFaceState } from '@/lib/useFaceState'
import { isHeavy } from '@/lib/localFontLoader'
import { downloadWebFont } from '@/lib/downloadFont'
import { styleEn, styleLabel } from '@/lib/styleNames'
import { FontDrawer } from '@/components/FontDrawer'
import { EASE } from '@/lib/constants'

const FALLBACK = '"PingFang SC", "Microsoft YaHei", sans-serif'

const OPEN_SOURCE_COUNT = faces.filter(f => f.remote).length

const fmtSize = (kb: number) => (kb > 1024 ? `${(kb / 1024).toFixed(1)}MB` : `${kb}KB`)

const tileSize = (len: number, base: number) => (len <= 4 ? base * 1.25 : len <= 7 ? base : base * 0.8)

const faceFromHash = () => {
  const id = decodeURIComponent(location.hash.split('/')[2] ?? '')
  return id ? (faces.find(f => f.id === id) ?? null) : null
}

function useDownload(face: Face) {
  const [busy, setBusy] = useState(false)
  const run = async () => {
    if (!face.remote || busy) return
    setBusy(true)
    try {
      await downloadWebFont(face.family, face.weight, `${face.name}.ttf`)
    } catch (err) {
      console.error('download failed:', err)
    } finally {
      setBusy(false)
    }
  }
  return { busy, run }
}

function FontTile({
  face,
  preview,
  size,
  onSelect,
}: {
  face: Face
  preview: string
  size: number
  onSelect: () => void
}) {
  const [forced, setForced] = useState(false)
  const { state, family } = useFaceState(face, forced)
  const ready = state === 'ready'
  const heavy = !face.remote && isHeavy(face)
  const { busy: dlBusy, run: runDl } = useDownload(face)
  const ff = ready ? `"${family}", ${FALLBACK}` : FALLBACK

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Open specimen / 查看 ${face.name}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="relative overflow-hidden bg-[oklch(0.105_0_0)] ring-1 ring-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:ring-white/20">
        <div className="aspect-[4/3] grid place-items-center px-4">
          <span
            className="select-none text-center leading-[1.1] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis max-w-full transition-opacity duration-400"
            style={{
              fontFamily: ff,
              fontWeight: face.weight,
              fontSize: `${tileSize(preview.length, size * 0.8)}px`,
              opacity: ready ? 1 : 0.35,
            }}
          >
            {preview}
          </span>
        </div>

        <div className="absolute top-2.5 left-3.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/30">
          {styleLabel(face.style)}
        </div>

        {heavy && state === 'idle' && (
          <button
            onClick={e => {
              e.stopPropagation()
              setForced(true)
            }}
            className="absolute top-2 right-2.5 rounded-full border border-white/20 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/45 transition hover:border-lime/50 hover:text-lime"
          >
            {fmtSize(face.sizeKB)} · Load 载入
          </button>
        )}
        {state === 'loading' && (
          <Loader2 className="absolute top-2.5 right-2.5 h-3.5 w-3.5 animate-spin text-white/40" />
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {face.remote ? (
            <button
              onClick={e => {
                e.stopPropagation()
                runDl()
              }}
              disabled={dlBusy}
              className="flex w-full items-center justify-center gap-2 bg-lime py-2.5 text-[11px] font-bold uppercase tracking-widest text-[oklch(0.06_0_0)] transition hover:brightness-110 disabled:opacity-70"
            >
              {dlBusy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
              {dlBusy ? 'Downloading 下载中' : 'Download TTF 下载'}
            </button>
          ) : (
            <a
              href={face.src}
              download
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-2 bg-lime py-2.5 text-[11px] font-bold uppercase tracking-widest text-[oklch(0.06_0_0)] transition hover:brightness-110"
            >
              <Download className="h-3 w-3" />
              Download {face.ext.toUpperCase()} 下载 · {fmtSize(face.sizeKB)}
            </a>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-2">
        <h3 className="truncate text-[13px] font-semibold text-white">{face.name}</h3>
        <span className="shrink-0 text-[10px] uppercase tracking-wider text-white/30">
          {face.remote ? 'WEB' : fmtSize(face.sizeKB)}
        </span>
      </div>
    </motion.div>
  )
}

export default function Library() {
  const status = useLocalLibrary()
  const [q, setQ] = useState('')
  const [preview, setPreview] = useState('') // 空 = 按字体自动选样
  const [size, setSize] = useState(56)
  const [genre, setGenre] = useState('all')
  const [style, setStyle] = useState('all')
  const [shown, setShown] = useState(48)
  const [pick, setPick] = useState<Face | null>(faceFromHash)
  const sentinel = useRef<HTMLDivElement>(null)

  // 本地字库未接入时只展示开源字体，避免满屏 404 字样
  const pool = useMemo(() => (status === 'offline' ? faces.filter(f => f.remote) : faces), [status])

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return pool.filter(f => {
      if (genre !== 'all' && !f.genres.includes(genre)) return false
      if (style !== 'all' && f.style !== style) return false
      if (kw && !`${f.name} ${f.family} ${f.vendor}`.toLowerCase().includes(kw)) return false
      return true
    })
  }, [pool, q, genre, style])

  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const io = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting) setShown(s => Math.min(s + 48, filtered.length))
      },
      { rootMargin: '900px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [filtered.length])

  // 详情可深链：#/library/<faceId>，便于在 README 里指向具体字样
  const openFace = (face: Face) => {
    setPick(face)
    history.replaceState(null, '', `#/library/${encodeURIComponent(face.id)}`)
  }
  const closeFace = () => {
    setPick(null)
    history.replaceState(null, '', '#/library')
  }

  return (
    <div className="relative min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[oklch(0.06_0_0)/88] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 px-6 py-4 md:px-12">
          <a
            href="#/"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back <span className="tracking-normal text-white/30">返回</span>
          </a>
          <a href="#/" className="font-display text-base font-black tracking-tight text-white">
            FONT&nbsp;<span className="text-lime">ARCHIVE</span>
            <span className="ml-2 align-middle text-[9px] font-normal tracking-[0.22em] text-white/35">
              字体档案馆
            </span>
          </a>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            {(status === 'checking' ? TOTAL : pool.length).toLocaleString('en-US')} Faces{' '}
            <span className="tracking-normal text-white/25">款</span>
          </span>
        </div>

        <div className="space-y-3 border-t border-white/5 px-6 py-3 md:px-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
              <input
                value={q}
                onChange={e => {
                  setQ(e.target.value)
                  setShown(48)
                }}
                placeholder="Search typefaces / 搜索字体…"
                aria-label="搜索字体 / Search"
                className="w-full rounded-full border border-white/12 bg-white/[0.04] py-2 pl-9 pr-9 text-[13px] text-white placeholder:text-white/30 outline-none transition focus:border-lime/40"
              />
              {q && (
                <button
                  onClick={() => setQ('')}
                  aria-label="清除搜索 / Clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/40">
                Preview <span className="tracking-normal text-white/25">预览</span>
                <input
                  value={preview}
                  onChange={e => setPreview(e.target.value)}
                  maxLength={12}
                  aria-label="预览文字 / Preview text"
                  placeholder="Auto / 自动"
                  className="w-32 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[13px] tracking-normal text-white outline-none transition placeholder:text-white/25 focus:border-lime/40"
                />
              </label>
              <label className="flex items-center gap-2.5 text-[10px] uppercase tracking-wider text-white/40">
                {size}px
                <input
                  type="range"
                  min={24}
                  max={96}
                  value={size}
                  onChange={e => setSize(Number(e.target.value))}
                  aria-label="预览字号 / Preview size"
                  className="w-24 accent-lime md:w-28"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden w-24 shrink-0 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:block">
              Genre <span className="tracking-normal">类型</span>
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,#000_90%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <FilterChip active={genre === 'all'} onClick={() => setGenre('all')}>
                ALL <span className="normal-case opacity-60">全部</span>
              </FilterChip>
              {genreOptions.map(g => (
                <FilterChip key={g.id} active={genre === g.id} onClick={() => setGenre(g.id)}>
                  {g.nameEn} <span className="normal-case opacity-60">{g.name}</span>
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden w-24 shrink-0 text-[9px] uppercase tracking-[0.2em] text-white/25 sm:block">
              Style <span className="tracking-normal">风格</span>
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,#000_90%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <FilterChip active={style === 'all'} onClick={() => setStyle('all')}>
                ALL <span className="normal-case opacity-60">全部</span>
              </FilterChip>
              {styleOptions.map(s => (
                <FilterChip key={s} active={style === s} onClick={() => setStyle(s)}>
                  {styleEn(s)} <span className="normal-case opacity-60">{s}</span>
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </header>

      {status === 'offline' && (
        <div className="border-b border-amber-300/15 bg-amber-300/[0.04] px-6 py-2.5 text-[11px] text-amber-200/70 md:px-12">
          <span className="font-semibold uppercase tracking-[0.18em]">Local Library Offline</span>{' '}
          <span className="text-amber-200/50">本地字库未接入</span>
          <span className="text-white/35">
            {' '}
            — showing {OPEN_SOURCE_COUNT} open-source faces only. Set FONT_DIR to index your own
            collection. · 当前仅展示 {OPEN_SOURCE_COUNT} 款开源字体，接入方式见 README。
          </span>
        </div>
      )}

      <main className="px-6 py-10 md:px-12">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              All Typefaces
            </span>
            <span className="text-[11px] text-white/25">全部字体</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-white/30">
            {filtered.length} Matches <span className="tracking-normal text-white/20">款匹配</span>
            {filtered.length > shown && (
              <span className="tracking-normal text-white/20"> · Showing 已显示 {shown}</span>
            )}
          </span>
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.slice(0, shown).map(f => (
              <FontTile
                key={f.id}
                face={f}
                preview={preview || (/[\u4e00-\u9fff]/.test(f.name) ? '永 Aa' : 'Aa')}
                size={size}
                onSelect={() => openFace(f)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/45">
              No Matches <span className="tracking-normal text-white/30">没有匹配的字体</span>
            </p>
            <p className="mt-3 text-[12px] text-white/30">
              Try another keyword or clear the filters. · 换个关键词，或清空筛选条件。
            </p>
          </div>
        )}
        <div ref={sentinel} className="h-px" />
      </main>

      <AnimatePresence>
        {pick && <FontDrawer key={pick.id} face={pick} onClose={closeFace} />}
      </AnimatePresence>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-wider transition ${
        active
          ? 'border-lime/40 bg-lime/10 text-lime'
          : 'border-white/12 text-white/45 hover:border-white/30 hover:text-white/80'
      }`}
    >
      {children}
    </button>
  )
}
