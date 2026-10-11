import { createSeedData } from './seedData.js'

export const STORAGE_KEY = 'studyTracker.v1'

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.topics)) return parsed
    }
  } catch {
    // fall through to seed data
  }
  return createSeedData()
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage unavailable or full; ignore
  }
}
