import { useEffect, useState } from 'react'
import { loadData, saveData } from './storage.js'

const newId = () => crypto.randomUUID()

const mapTopic = (data, topicId, fn) => ({
  ...data,
  topics: data.topics.map((t) => (t.id === topicId ? fn(t) : t)),
})

const mapSub = (data, topicId, subId, fn) =>
  mapTopic(data, topicId, (t) => ({
    ...t,
    subtopics: t.subtopics.map((s) => (s.id === subId ? fn(s) : s)),
  }))

export function useTracker() {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    saveData(data)
  }, [data])

  const addTopic = (title) =>
    setData((d) => ({ ...d, topics: [...d.topics, { id: newId(), title, subtopics: [] }] }))

  const addSubtopic = (topicId, title) =>
    setData((d) =>
      mapTopic(d, topicId, (t) => ({
        ...t,
        subtopics: [...t.subtopics, { id: newId(), title, items: [] }],
      })),
    )

  const addItem = (topicId, subId, title) =>
    setData((d) =>
      mapSub(d, topicId, subId, (s) => ({
        ...s,
        items: [...s.items, { id: newId(), title, done: false }],
      })),
    )

  const toggleItem = (topicId, subId, itemId) =>
    setData((d) =>
      mapSub(d, topicId, subId, (s) => ({
        ...s,
        items: s.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)),
      })),
    )

  const deleteItem = (topicId, subId, itemId) =>
    setData((d) =>
      mapSub(d, topicId, subId, (s) => ({
        ...s,
        items: s.items.filter((i) => i.id !== itemId),
      })),
    )

  return { data, addTopic, addSubtopic, addItem, toggleItem, deleteItem }
}

export function countItems(items) {
  return { done: items.filter((i) => i.done).length, total: items.length }
}

export function countSubtopic(sub) {
  return countItems(sub.items)
}

export function countTopic(topic) {
  return topic.subtopics.reduce(
    (acc, s) => {
      const c = countSubtopic(s)
      return { done: acc.done + c.done, total: acc.total + c.total }
    },
    { done: 0, total: 0 },
  )
}
