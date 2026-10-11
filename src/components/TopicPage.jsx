import { countTopic } from '../useTracker.js'
import ProgressRing from './ProgressRing.jsx'
import SubtopicAccordion from './SubtopicAccordion.jsx'
import AddInline from './AddInline.jsx'

export default function TopicPage({ topic, accent, onBack, onAddSubtopic, onAddItem, onToggleItem, onDeleteItem }) {
  const { done, total } = countTopic(topic)
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <section className="topic-page" style={accent}>
      <div className="toolbar">
        <button className="back-btn" onClick={onBack}>
          ← All topics
        </button>
        <AddInline label="Add subtopic" placeholder="Subtopic name" onAdd={(t) => onAddSubtopic(topic.id, t)} />
      </div>

      <header className="topic-hero">
        <div>
          <h1>{topic.title}</h1>
          <p>
            {done} of {total} done
          </p>
        </div>
        <ProgressRing pct={pct} size={84} />
      </header>

      {topic.subtopics.length === 0 ? (
        <p className="empty">No subtopics yet. Add one with the button above.</p>
      ) : (
        <div className="subtopic-list">
          {topic.subtopics.map((sub) => (
            <SubtopicAccordion
              key={sub.id}
              subtopic={sub}
              onAddItem={(subId, title) => onAddItem(topic.id, subId, title)}
              onToggleItem={(subId, itemId) => onToggleItem(topic.id, subId, itemId)}
              onDeleteItem={(subId, itemId) => onDeleteItem(topic.id, subId, itemId)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
