export default function ItemRow({ item, onToggle, onDelete }) {
  return (
    <div className={`item-row${item.done ? ' done' : ''}`}>
      <label className="item-check">
        <input type="checkbox" checked={item.done} onChange={onToggle} />
        <span className="checkmark" aria-hidden="true" />
        <span className="item-title">{item.title}</span>
      </label>
      <button className="item-delete" onClick={onDelete} aria-label={`Delete ${item.title}`} title="Delete item">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  )
}
