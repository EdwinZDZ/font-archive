import type { ReactNode } from 'react'

/**
 * 双语排版约定：英文在前，中文在后。
 * 小标签统一走这里，避免各页面各写一套。
 */

/** 区块小标签：PREVIEW 字体预览 */
export function SectionLabel({
  en,
  zh,
  right,
  className = '',
}: {
  en: string
  zh: string
  right?: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-3 flex items-baseline justify-between gap-3 ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">
          {en}
        </span>
        <span className="text-[10px] tracking-wide text-white/30">{zh}</span>
      </div>
      {right}
    </div>
  )
}
