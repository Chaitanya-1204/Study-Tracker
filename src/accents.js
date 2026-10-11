// Each topic gets its own accent, picked by its position on the home page.
const ACCENTS = [
  { main: '#4f46e5', soft: '#eeeefe' },
  { main: '#e0533a', soft: '#fdeeea' },
  { main: '#0e8f83', soft: '#e2f5f2' },
  { main: '#c27708', soft: '#fbf0d9' },
  { main: '#a43c90', soft: '#f8e9f5' },
  { main: '#1f78c8', soft: '#e5f1fb' },
]

export function accentStyle(index) {
  const a = ACCENTS[index % ACCENTS.length]
  return { '--accent': a.main, '--accent-soft': a.soft }
}
