export function getColumnCount(width: number): number {
  if (width < 640) return 2
  if (width < 1024) return 3
  return 4
}

export function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = []
  let i = 0
  let r = 0

  while (i < count) {
    const row = Array.from({ length: cols }, () => -1)
    const a = (r * 2 + (r % 2)) % cols
    row[a] = i++

    if (r % 3 === 0 && i < count) {
      let b = (a + 2) % cols
      if (b === a) b = (a + 1) % cols
      row[b] = i++
    }

    rows.push(row)
    r++
  }

  return rows
}
