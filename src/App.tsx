import { useEffect, useState } from 'react'
import { IntroSequence } from '@/components/IntroSequence'
import Landing from '@/pages/Landing'
import Library from '@/pages/Library'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [route, setRoute] = useState(location.hash.startsWith('#/library') ? 'library' : 'landing')

  useEffect(() => {
    const onHash = () =>
      setRoute(location.hash.startsWith('#/library') ? 'library' : 'landing')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'library') {
    // 库页无需 intro 开场，直达工具
    return <Library />
  }

  return (
    <>
      {!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}
      <Landing />
    </>
  )
}
