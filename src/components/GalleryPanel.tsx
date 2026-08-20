import type { RefObject } from 'react'
import { GALLERY_IMAGES } from '../lib/assets'
import { buildLayout } from '../lib/layout'

type GalleryPanelProps = {
  cols: number
  panelRef: RefObject<HTMLDivElement | null>
  wrapRef: RefObject<HTMLDivElement | null>
}

export function GalleryPanel({ cols, panelRef, wrapRef }: GalleryPanelProps) {
  const rows = buildLayout(GALLERY_IMAGES.length, cols)

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-10 bg-black"
      style={{ transform: 'translateY(100vh)' }}
    >
      <div
        ref={wrapRef}
        className="w-full px-2 sm:px-4 lg:px-6"
        style={{ paddingTop: 'min(400px, 40vh)' }}
      >
        <div
          className="grid"
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
              const src = GALLERY_IMAGES[imageIndex]

              return (
                <div key={key} className="bp-cell aspect-[2/3]">
                  <div
                    className="bp-card h-full w-full overflow-hidden"
                    style={{
                      transform: 'scale(0)',
                      transformOrigin: origin,
                    }}
                  >
                    <img
                      src={src}
                      alt={`Archive look ${imageIndex + 1}`}
                      draggable={false}
                      decoding="async"
                      loading={imageIndex < 4 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover"
                    />
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
