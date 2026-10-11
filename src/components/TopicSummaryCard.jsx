import { countTopic } from '../useTracker.js'
import ProgressRing from './ProgressRing.jsx'

export default function TopicSummaryCard({ topic, accent, onOpen }) {
  const { done, total } = countTopic(topic)
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const n = topic.subtopics.length

  return (
    <button className="topic-card" style={accent} onClick={onOpen}>
      <div className="topic-card-text">
        <span className="topic-card-mark" aria-hidden="true" />
        <h2>{topic.title}</h2>
        <p>
          {n} {n === 1 ? 'subtopic' : 'subtopics'}
        </p>
      </div>
      <ProgressRing pct={pct} />
    </button>
  )
}
