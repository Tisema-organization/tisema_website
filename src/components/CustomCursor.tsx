import { useEffect, useRef } from 'react'

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
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-50"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-oxblood bg-lime/40">
        <span className="font-ethiopic text-[10px] font-bold text-oxblood">ት</span>
      </div>
    </div>
  )
}
