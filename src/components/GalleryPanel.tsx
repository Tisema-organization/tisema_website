import type { RefObject } from 'react'
import { buildGalleryVictims } from '../lib/assets'
import { buildLayout } from '../lib/layout'

type GalleryPanelProps = {
  cols: number
  panelRef: RefObject<HTMLDivElement | null>
  wrapRef: RefObject<HTMLDivElement | null>
}

const GALLERY = buildGalleryVictims(12)

export function GalleryPanel({ cols, panelRef, wrapRef }: GalleryPanelProps) {
  const rows = buildLayout(GALLERY.length, cols)

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-10 bg-field"
      style={{ transform: 'translateY(100vh)' }}
    >
      <div
        ref={wrapRef}
        className="w-full px-3 sm:px-5 lg:px-8"
        style={{ paddingTop: 'min(280px, 32vh)', paddingBottom: '40vh' }}
      >
        <div
          className="grid gap-3 sm:gap-4 lg:gap-5"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {rows.flatMap((row, rowIndex) =>
            row.map((imageIndex, col) => {
              const key = `${rowIndex}-${col}`
              if (imageIndex < 0) {
                return <div key={key} className="aspect-[2/3]" />
              }

              const origin = col < cols / 2 ? 'right bottom' : 'left bottom'
              const victim = GALLERY[imageIndex]

              return (
                <div key={key} className="bp-cell aspect-[2/3]">
                  <div
                    className="bp-card flex h-full w-full flex-col"
                    style={{
                      transform: 'scale(0)',
                      transformOrigin: origin,
                    }}
                  >
                    <div className="relative min-h-0 flex-1 overflow-hidden border-2 border-lime bg-lime">
                      <img
                        src={victim.src}
                        alt={`${victim.name} — ${victim.tag}`}
                        draggable={false}
                        decoding="async"
                        loading={imageIndex < 4 ? 'eager' : 'lazy'}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <p className="font-ethiopic mt-2 truncate text-[11px] font-semibold text-lime sm:text-[12px] lg:text-[13px]">
                      {victim.tag}
                    </p>
                  </div>
                </div>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}
