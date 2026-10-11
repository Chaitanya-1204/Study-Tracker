import { useState } from 'react'
import { countSubtopic } from '../useTracker.js'
import ItemRow from './ItemRow.jsx'
import AddInline from './AddInline.jsx'

export default function SubtopicAccordion({ subtopic, onAddItem, onToggleItem, onDeleteItem }) {
  const [open, setOpen] = useState(false)
  const { done, total } = countSubtopic(subtopic)
  const complete = total > 0 && done === total

  return (
    <div className={`subtopic${open ? ' open' : ''}${complete ? ' complete' : ''}`}>
      <button className="subtopic-header" onClick={() => setOpen(!open)} aria-expanded={open}>
        <svg className="chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 3.5 10.5 8 6 12.5" />
        </svg>
        <span className="subtopic-title">{subtopic.title}</span>
        <span className="subtopic-count">
          {done}/{total}
        </span>
      </button>

      {open && (
        <div className="subtopic-body">
          {subtopic.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(subtopic.id, item.id)}
              onDelete={() => onDeleteItem(subtopic.id, item.id)}
            />
          ))}
          <AddInline
            variant="ghost"
            label="Add item"
            placeholder="Item name"
            onAdd={(t) => onAddItem(subtopic.id, t)}
          />
        </div>
      )}
    </div>
  )
}
