import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { createReadStream, existsSync, statSync } from 'node:fs'

/**
 * 字体源目录。开源仓库默认使用 ./fonts（不存在则不提供本地字库）。
 * 用法：FONT_DIR=/path/to/fonts npm run dev
 * 兼容作者的旧目录名 ./剪映字体提取。
 */
const LEGACY_DIR = path.resolve(__dirname, '剪映字体提取')
const FONT_DIR = process.env.FONT_DIR
  ? path.resolve(__dirname, process.env.FONT_DIR)
  : existsSync(path.resolve(__dirname, 'fonts'))
    ? path.resolve(__dirname, 'fonts')
    : LEGACY_DIR
const JY_DIR = FONT_DIR
const MIRROR_CSS = 'https://miaoda.feishu.cn/fonts/css2'
const GOOGLE_CSS = 'https://fonts.googleapis.com/css2'

/** 从 css2 响应提取字体文件 url */
const fontUrlFromCss = (css: string) => css.match(/url\(([^)]+)\)/)?.[1]

/** 优先官方 gstatic（文件有效），镜像兜底（其 ttf 源文件有损坏，仅保底） */
async function resolveFontUrl(family: string, weight: string): Promise<string | null> {
  const q = `?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`
  const sources: [string, string][] = [
    [`${GOOGLE_CSS}${q}`, 'google'],
    [`${MIRROR_CSS}${q}`, 'mirror'],
  ]
  for (const [url] of sources) {
    try {
      const css = await fetch(url, { signal: AbortSignal.timeout(15000) }).then(r =>
        r.ok ? r.text() : '',
      )
      const u = fontUrlFromCss(css)
      if (u) return u
    } catch {
      // 下一个源
    }
  }
  return null
}

/**
 * 字体源目录 5.5 GB，不复制进 public/。
 * 开发期由中间件直接流式返回，生产部署时把该目录挂到 /jy/ 即可。
 */
function serveFonts(): Plugin {
  return {
    name: 'serve-jy-fonts',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/jy/')) return next()
        const rel = decodeURIComponent(req.url.slice(4).split('?')[0])
        const abs = path.join(JY_DIR, rel)
        // 防目录穿越
        if (!abs.startsWith(JY_DIR)) {
          res.statusCode = 403
          return res.end('forbidden')
        }
        try {
          const st = statSync(abs)
          if (!st.isFile()) return next()
          res.setHeader('Content-Type', abs.endsWith('.otf') ? 'font/otf' : 'font/ttf')
          res.setHeader('Content-Length', st.size)
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
          createReadStream(abs).pipe(res)
        } catch {
          next()
        }
      })

      // /fontdl/{family}:{weight} —— 代理字体文件直链。
      // 官方 gstatic 文件有效；镜像 css2 在浏览器 UA 下返回子集 woff2（残缺），
      // 服务端 UA 返回的 ttf 源文件损坏，故仅作兜底。
      server.middlewares.use(async (req, res, next) => {
        const m = req.url?.match(/^\/fontdl\/([^:]+):(\d+)/)
        if (!m) return next()
        const family = decodeURIComponent(m[1]).replace(/\+/g, ' ')
        const weight = m[2]
        try {
          const url = await resolveFontUrl(family, weight)
          if (!url) {
            res.statusCode = 404
            return res.end('font url not found')
          }
          const upstream = await fetch(url, { signal: AbortSignal.timeout(60000) })
          if (!upstream.ok) {
            res.statusCode = upstream.status
            return res.end('upstream failed')
          }
          res.setHeader('Content-Type', 'font/ttf')
          res.setHeader('Content-Disposition', `attachment; filename="${family}.ttf"`)
          res.setHeader('Cache-Control', 'public, max-age=86400')
          const buf = Buffer.from(await upstream.arrayBuffer())
          res.setHeader('Content-Length', buf.length)
          res.end(buf)
        } catch (err) {
          res.statusCode = 502
          res.end(String(err))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveFonts()],
  server: { host: true }, // 局域网访问：监听所有网卡（本机仍可用 localhost）
  build: {
    rollupOptions: {
      output: {
        // 本地字库索引体积大且很少变动，单独成块便于缓存
        manualChunks: {
          'font-index': [path.resolve(__dirname, 'src/data/localFonts.ts')],
        },
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
