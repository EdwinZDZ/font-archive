/**
 * 通过本地代理 /fontdl/ 取完整 ttf（服务端请求不受 UA 子集化影响），
 * fetch 为 blob 后触发下载。代理由 vite.config.ts 的中间件提供。
 */
export async function downloadWebFont(family: string, weight: string, fileName: string) {
  const res = await fetch(`/fontdl/${family.replace(/ /g, '+')}:${weight}`)
  if (!res.ok) throw new Error(`fontdl ${res.status}`)
  const blob = await res.blob()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 5000)
}
