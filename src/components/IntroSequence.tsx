import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/constants'

const RAY_ANGLES = [0, 30, 60, 120, 150, 210, 240, 300, 330]

export function IntroSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      onDone()
      setVisible(false)
      return
    }
    const t = setTimeout(() => {
      onDone()
      setVisible(false)
    }, 3600)
    return () => clearTimeout(t)
  }, [reduced, onDone])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 3.6, times: [0, 0.82, 1], ease: EASE }}
    >
      <div className="absolute inset-0 matte" />

      {[1, 2, 3].map(n => (
        <motion.div
          key={n}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
          style={{ width: 260 * n, height: 260 * n, marginLeft: -260 * n / 2, marginTop: -260 * n / 2 }}
          initial={{ opacity: 0, scale: 0.15 }}
          animate={{ opacity: [0, 0.55, 0], scale: [0.15, 1, 1.4] }}
          transition={{ duration: 2.4, times: [0, 0.5, 1], delay: 1.22 + n * 0.02, ease: EASE }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {RAY_ANGLES.map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          return (
            <motion.line
              key={deg}
              x1="50"
              y1="50"
              x2={50 + 60 * Math.cos(rad)}
              y2={50 + 60 * Math.sin(rad)}
              stroke="white"
              strokeWidth="0.12"
              strokeLinecap="round"
              strokeOpacity="0.45"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.65, 0] }}
              transition={{ duration: 2, times: [0, 0.7, 1], delay: 1.2 + i * 0.05, ease: EASE }}
            />
          )
        })}
      </svg>

      <motion.div
        className="absolute"
        initial={{ top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
        animate={{ top: '24px', left: '24px', x: 0, y: 0, scale: 0.42, opacity: [1, 1, 0] }}
        transition={{ duration: 3.6, times: [0, 0.82, 1], ease: EASE }}
      >
        <div className="font-display font-black text-white text-6xl leading-[0.95] tracking-tight whitespace-nowrap">
          FONT
          <br />
          ARCHIVE
        </div>
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="rounded-full bg-white"
          initial={{ width: 8, height: 8, opacity: 1 }}
          animate={{ width: [8, 10, 64, 64], height: [8, 10, 64, 64], opacity: [1, 1, 1, 0] }}
          transition={{ duration: 3.6, times: [0, 0.18, 0.4, 1], ease: EASE }}
        />
      </div>
    </motion.div>
  )
}
