import { createSeedData } from './seedData.js'

export const STORAGE_KEY = 'studyTracker.v1'

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.topics)) return addNewSeedTopics(parsed)
    }
  } catch {
    // fall through to seed data
  }
  return createSeedData()
}

// Seed topics added after someone's first visit still need to reach them, since
// their saved data is what gets loaded from then on. `seeded` remembers which
// seed topics have already been handed over, so deleting one keeps it gone.
function addNewSeedTopics(data) {
  const seeded = Array.isArray(data.seeded) ? data.seeded : data.topics.map((t) => t.title)
  const missing = createSeedData().topics.filter((t) => !seeded.includes(t.title))
  return {
    ...data,
    topics: [...data.topics, ...missing],
    seeded: [...seeded, ...missing.map((t) => t.title)],
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage unavailable or full; ignore
  }
}
