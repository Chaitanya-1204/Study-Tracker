const R = 15.5
const C = 2 * Math.PI * R

export default function ProgressRing({ pct, size = 68 }) {
  return (
    <div className="ring" style={{ width: size, height: size }} role="img" aria-label={`${pct}% complete`}>
      <svg viewBox="0 0 36 36">
        <circle className="ring-track" cx="18" cy="18" r={R} />
        <circle
          className="ring-fill"
          cx="18"
          cy="18"
          r={R}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
        />
      </svg>
      <span className="ring-label">{pct}%</span>
    </div>
  )
}
