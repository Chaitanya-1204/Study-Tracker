import { useState } from 'react'

export default function AddInline({ label, placeholder, onAdd, variant = 'primary' }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const close = () => {
    setOpen(false)
    setValue('')
  }

  const submit = () => {
    const title = value.trim()
    if (title) onAdd(title)
    close()
  }

  if (!open) {
    return (
      <button className={`add-btn add-btn-${variant}`} onClick={() => setOpen(true)}>
        <span className="plus">+</span> {label}
      </button>
    )
  }

  return (
    <input
      className={`add-input add-input-${variant}`}
      autoFocus
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') submit()
        if (e.key === 'Escape') close()
      }}
      onBlur={submit}
    />
  )
}
