import { motion } from 'framer-motion'
import { EASE } from '@/lib/constants'

const LINES: Record<string, number[][]> = {
  hero: [
    [0, 0, 22, 100],
    [50, 0, 82, 100],
    [100, 0, 58, 100],
    [0, 35, 100, 80],
    [100, 10, 0, 70],
    [30, 0, 100, 55],
  ],
  photographer: [
    [22, 0, 14, 100],
    [58, 0, 48, 100],
    [82, 0, 86, 100],
    [0, 20, 100, 90],
    [100, 15, 0, 80],
  ],
  projects: [
    [14, 0, 28, 100],
    [48, 0, 64, 100],
    [86, 0, 92, 100],
    [0, 30, 100, 75],
    [100, 5, 0, 90],
  ],
  marvels: [
    [28, 0, 18, 100],
    [64, 0, 50, 100],
    [92, 0, 80, 100],
    [0, 15, 100, 85],
  ],
  marvelsBottom: [
    [10, 30, 45, 35],
    [55, 28, 92, 32],
    [8, 55, 40, 58],
    [60, 62, 90, 60],
    [20, 78, 80, 82],
  ],
}

const MARKERS: Record<string, { line: number; t: number; label: string }[]> = {
  hero: [
    { line: 1, t: 0.38, label: '48768 gytsdactfj (7645t5.87)' },
    { line: 3, t: 0.62, label: '21094 hjkpoplmn (3321q8.14)' },
    { line: 5, t: 0.28, label: '90213 vbnxzlkj (5512w2.06)' },
  ],
  photographer: [
    { line: 0, t: 0.55, label: '33910 plkmnbvx (2287r1.92)' },
    { line: 3, t: 0.72, label: '67452 qwertyui (8841p3.45)' },
  ],
  projects: [
    { line: 1, t: 0.41, label: '10248 zxcvbnma (6634k9.27)' },
    { line: 4, t: 0.58, label: '84210 mnbvcxlk (1192s7.63)' },
    { line: 2, t: 0.83, label: '57023 asdfghjk (4458d2.81)' },
  ],
}

const pointOn = (l: number[], t: number) => [l[0] + (l[2] - l[0]) * t, l[1] + (l[3] - l[1]) * t]

const VARIANT = ['hero', 'photographer', 'projects', 'marvels', 'marvelsBottom'] as const
export type LineVariant = (typeof VARIANT)[number]

export function LineField({ variant = 'hero' }: { variant: LineVariant }) {
  const lines = LINES[variant]
  const markers = MARKERS[variant] ?? []

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      style={{ zIndex: 0 }}
    >
      {lines.map((l, i) => {
        const cx = (l[0] + l[2]) / 2
        const cy = (l[1] + l[3]) / 2
        return (
          <motion.line
            key={i}
            x1={l[0]}
            y1={l[1]}
            x2={l[2]}
            y2={l[3]}
            stroke="white"
            strokeWidth="0.08"
            strokeOpacity={variant === 'marvelsBottom' ? 0.22 : 0.1}
            style={{ originX: `${cx}%`, originY: `${cy}%` }}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, delay: i * 0.12, ease: EASE }}
          />
        )
      })}
      {markers.map((m, i) => {
        const [x, y] = pointOn(lines[m.line], m.t)
        return (
          <motion.g
            key={i}
            style={{ originX: `${x}%`, originY: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.25, ease: EASE }}
          >
            <circle cx={x} cy={y} r="0.18" fill="white" opacity="0.95" />
            {m.label.split(' ').map((word, wi) => (
              <text
                key={wi}
                x={x + 0.5}
                y={y - 0.6 + wi * 0.7}
                fill="white"
                opacity="0.55"
                fontSize="0.5"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.02em"
              >
                {word}
              </text>
            ))}
          </motion.g>
        )
      })}
    </svg>
  )
}
