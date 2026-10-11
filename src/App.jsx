import { useEffect, useState } from 'react'
import { useTracker } from './useTracker.js'
import { accentStyle } from './accents.js'
import TopicSummaryCard from './components/TopicSummaryCard.jsx'
import TopicPage from './components/TopicPage.jsx'
import AddInline from './components/AddInline.jsx'

const readHash = () => decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))

export default function App() {
  const { data, addTopic, addSubtopic, addItem, toggleItem, deleteItem } = useTracker()
  const [topicId, setTopicId] = useState(readHash)

  useEffect(() => {
    const onHash = () => setTopicId(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openTopic = (id) => {
    window.location.hash = id ? `/${encodeURIComponent(id)}` : ''
  }

  const topicIndex = data.topics.findIndex((t) => t.id === topicId)
  const topic = data.topics[topicIndex]

  if (topic) {
    return (
      <div className="app">
        <TopicPage
          topic={topic}
          accent={accentStyle(topicIndex)}
          onBack={() => openTopic('')}
          onAddSubtopic={addSubtopic}
          onAddItem={addItem}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Study Tracker</h1>
        <AddInline label="Add topic" placeholder="Topic name" onAdd={addTopic} />
      </header>

      <main className="topic-box">
        {data.topics.length === 0 ? (
          <p className="empty">No topics yet. Add your first one with the button above.</p>
        ) : (
          <div className="topic-grid">
            {data.topics.map((t, i) => (
              <TopicSummaryCard key={t.id} topic={t} accent={accentStyle(i)} onOpen={() => openTopic(t.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
