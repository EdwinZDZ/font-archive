import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Loader2, X } from 'lucide-react'
import type { Face } from '@/data/catalog'
import { EASE } from '@/lib/constants'
import { useFaceState } from '@/lib/useFaceState'
import { downloadWebFont } from '@/lib/downloadFont'
import { styleLabel } from '@/lib/styleNames'
import { SectionLabel } from '@/components/Bilingual'

const FALLBACK = '"PingFang SC", "Microsoft YaHei", sans-serif'

const fmtSize = (kb: number) => (kb > 1024 ? `${(kb / 1024).toFixed(1)}MB` : `${kb}KB`)

const SCENES = [
  { id: 'title', en: 'TITLE CARD', zh: '片名卡' },
  { id: 'subtitle', en: 'SUBTITLE', zh: '字幕' },
  { id: 'credits', en: 'END CREDITS', zh: '片尾字幕' },
] as const

type SceneId = (typeof SCENES)[number]['id']

function PreviewModule({
  fontFamily,
  weight,
  text,
  onText,
  size,
  onSize,
}: {
  fontFamily: string
  weight: string | number
  text: string
  onText: (v: string) => void
  size: number
  onSize: (v: number) => void
}) {
  return (
    <section>
      <SectionLabel
        en="PREVIEW"
        zh="字体预览"
        right={<span className="text-[10px] tabular-nums text-white/35">{size}px</span>}
      />
      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={e => onText(e.target.value)}
          maxLength={14}
          aria-label="预览文字"
          placeholder="输入预览文字 / Type something"
          className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-lime/40"
        />
        <input
          type="range"
          min={20}
          max={120}
          value={size}
          onChange={e => onSize(Number(e.target.value))}
          aria-label="预览字号"
          className="w-24 shrink-0 accent-lime"
        />
      </div>

      <div className="mt-3 flex min-h-[132px] items-center overflow-hidden border border-white/10 bg-white/[0.02] px-5 py-6">
        <div
          className="w-full break-words leading-[1.15] text-white"
          style={{ fontFamily, fontWeight: weight, fontSize: size }}
        >
          {text || '永 Aa'}
        </div>
      </div>

      <div className="mt-2 text-[10px] text-white/30">
        Editable sample · 可编辑字样，字号实时联动
      </div>
    </section>
  )
}

const CHARSET = [
  {
    en: 'LATIN',
    zh: '拉丁字母',
    note: 'A–Z a–z',
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz',
  },
  { en: 'DIGITS', zh: '数字', note: '0–9', chars: '0123456789' },
  {
    en: 'PUNCT',
    zh: '标点',
    note: 'CJK + Latin',
    chars: '，。、；：？！“”‘’（）《》〈〉—…·,.!?;:\'\"()[]{}-/&@#%*+',
  },
  {
    en: 'CJK',
    zh: '汉字',
    note: '千字文',
    chars: '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。',
  },
  {
    en: 'SYMBOL',
    zh: '符号',
    note: 'Common',
    chars: '★☆●○◆◇■□▲△※§¶©®™°±×÷≈≠≤≥',
  },
]

function CharsetModule({
  fontFamily,
  weight,
}: {
  fontFamily: string
  weight: string | number
}) {
  return (
    <section>
      <SectionLabel en="CHARACTER SET" zh="字符集覆盖" />

      <div className="divide-y divide-white/8 border border-white/10 bg-white/[0.02]">
        {CHARSET.map(g => (
          <div key={g.en} className="px-4 py-3">
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/45">
                {g.en} <span className="tracking-normal text-white/25">{g.zh}</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/20">{g.note}</span>
            </div>
            <div
              className="break-words text-[17px] leading-[1.7] text-white/80"
              style={{ fontFamily, fontWeight: weight }}
            >
              {g.chars}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[10px] leading-relaxed text-white/30">
        Coverage sample across five character groups. Where a face lacks a glyph, your system font
        steps in — so you can see exactly where the typeface ends. · 按五组字符抽样展示；字体缺失
        的字符由系统字体接管，可直接看出这款字覆盖到哪里。
      </p>
    </section>
  )
}

function SceneModule({
  fontFamily,
  weight,
  sample,
}: {
  fontFamily: string
  weight: string | number
  sample: string
}) {
  const [scene, setScene] = useState<SceneId>('title')
  const text = sample.trim() || '永 Aa'

  return (
    <section>
      <SectionLabel en="IN USE" zh="应用场景" />

      <div className="mb-3 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SCENES.map(s => (
          <button
            key={s.id}
            onClick={() => setScene(s.id)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-wider transition ${
              scene === s.id
                ? 'border-lime/40 bg-lime/10 text-lime'
                : 'border-white/12 text-white/45 hover:border-white/30 hover:text-white/80'
            }`}
          >
            {s.en} <span className="normal-case tracking-normal opacity-60">{s.zh}</span>
          </button>
        ))}
      </div>

      {scene === 'title' && (
        <div className="relative aspect-[2.39/1] overflow-hidden bg-black ring-1 ring-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_130%,rgba(255,255,255,0.18),transparent_62%)]" />
          <div className="absolute inset-x-0 top-3 flex justify-between px-4 text-[7px] uppercase tracking-[0.35em] text-white/30">
            <span>Font Archive</span>
            <span>2026</span>
          </div>
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div className="w-full">
              <div className="text-[7px] uppercase tracking-[0.45em] text-white/40">
                A Film By Edwin
              </div>
              <div
                className="mt-2.5 truncate text-[36px] leading-[1.05] text-white"
                style={{ fontFamily, fontWeight: weight }}
              >
                {text}
              </div>
              <div className="mt-3 text-[7px] uppercase tracking-[0.4em] text-white/35">
                In Theatres · 2026
              </div>
            </div>
          </div>
        </div>
      )}

      {scene === 'subtitle' && (
        <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(155deg,#23262e,#0a0b0d)] ring-1 ring-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.22),transparent_55%)] opacity-40" />
          <div className="absolute left-4 top-3 text-[7px] uppercase tracking-[0.32em] text-white/25">
            Scene 01 / 第一场
          </div>
          <div className="absolute inset-x-5 bottom-5 text-center">
            <div
              className="text-[22px] leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              style={{ fontFamily, fontWeight: weight }}
            >
              {text}
            </div>
            <div className="mt-2 text-[8px] uppercase tracking-[0.3em] text-white/45">
              Lead · 主角
            </div>
          </div>
        </div>
      )}

      {scene === 'credits' && (
        <div className="relative aspect-[16/9] overflow-hidden bg-black px-7 py-6 ring-1 ring-white/10">
          <div className="flex h-full flex-col justify-center gap-4">
            {[
              ['DIRECTOR', '导演'],
              ['CINEMATOGRAPHY', '摄影'],
              ['TITLE DESIGN', '片名设计'],
            ].map(([en, zh]) => (
              <div key={en} className="flex items-baseline justify-between gap-4">
                <span className="shrink-0 text-[8px] uppercase tracking-[0.2em] text-white/35">
                  {en} <span className="tracking-normal text-white/20">{zh}</span>
                </span>
                <span
                  className="truncate text-[16px] text-white/90"
                  style={{ fontFamily, fontWeight: weight }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-2 text-[10px] leading-relaxed text-white/30">
        Layout mockups only — type is set in the selected face, supporting copy stays in the
        system UI font. · 仅作版式示意：主标题使用所选字体，辅助信息仍用系统界面字体。
      </p>
    </section>
  )
}

export function FontDrawer({ face, onClose }: { face: Face; onClose: () => void }) {
  const { state, family } = useFaceState(face, true)
  const ready = state === 'ready'
  const [busy, setBusy] = useState(false)
  const [sample, setSample] = useState(() =>
    /[\u4e00-\u9fff]/.test(face.name) ? '永 Aa' : 'Aa',
  )
  const [size, setSize] = useState(56)

  const ff = ready ? `"${family}", ${FALLBACK}` : FALLBACK

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const runDl = async () => {
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

  return (
    <motion.div
      className="fixed inset-0 z-[90]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${face.name} — font specimen`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        className="absolute right-0 top-0 h-full w-full max-w-[520px] overflow-y-auto border-l border-white/10 bg-[oklch(0.09_0_0)] shadow-[-40px_0_120px_-40px_rgba(0,0,0,0.9)]"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[oklch(0.09_0_0)] px-6 py-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            {styleLabel(face.style)}
          </span>
          <button
            onClick={onClose}
            aria-label="关闭 / Close"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-9 px-6 py-8">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/50">
                {face.ext.toUpperCase()} · {face.remote ? 'Web Font 在线字体' : fmtSize(face.sizeKB)}
              </span>
              {state === 'loading' && (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading 载入中
                </span>
              )}
              {state === 'error' && (
                <span className="text-[10px] uppercase tracking-wider text-amber-300/60">
                  Unavailable 不可用
                </span>
              )}
            </div>

            <div
              className="select-none break-words leading-[1.05] text-white transition-opacity duration-500"
              style={{
                fontFamily: ff,
                fontWeight: face.weight,
                fontSize: 'clamp(56px, 9vw, 104px)',
                opacity: ready ? 1 : 0.35,
              }}
            >
              {/[\u4e00-\u9fff]/.test(face.name) ? '永' : 'Aa'}
            </div>

            <div className="mt-5">
              <h2 className="text-xl font-bold text-white">{face.name}</h2>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/35">
                {face.family !== face.name ? `${face.family} · ` : ''}
                {face.subfamily}
              </p>
            </div>
          </div>

          <PreviewModule
            fontFamily={ff}
            weight={face.weight}
            text={sample}
            onText={setSample}
            size={size}
            onSize={setSize}
          />

          <CharsetModule fontFamily={ff} weight={face.weight} />

          <SceneModule fontFamily={ff} weight={face.weight} sample={sample} />

          {face.remote ? (
            <button
              onClick={runDl}
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-[oklch(0.06_0_0)] transition hover:brightness-110 disabled:opacity-70"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {busy ? 'Downloading 下载中' : 'Download TTF 下载字体'}
            </button>
          ) : (
            <a
              href={face.src}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-[oklch(0.06_0_0)] transition hover:brightness-110"
            >
              <Download className="h-4 w-4" />
              Download {face.ext.toUpperCase()} 下载 · {fmtSize(face.sizeKB)}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
