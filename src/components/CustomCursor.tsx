import { useEffect, useRef } from 'react'
import { CursorGlyph } from './Marks'

type CustomCursorProps = {
  enabled: boolean
}

export function CustomCursor({ enabled }: CustomCursorProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const onMove = (event: MouseEvent) => {
      el.style.left = `${event.clientX}px`
      el.style.top = `${event.clientY}px`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-exclusion"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <CursorGlyph />
    </div>
  )
}
