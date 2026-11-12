import { capture, useCapturePaused } from '../motion.js'
import Icon from './Icons.jsx'

// Stops and restarts the moving background. Rendered in the hero and the footer.
export default function CaptureToggle({ className = '' }) {
  const paused = useCapturePaused()
  return (
    <button
      type="button"
      onClick={capture.toggle}
      className={`inline-flex min-h-11 items-center gap-2 rounded px-2 font-body text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink/8 ${className}`}
    >
      <Icon name={paused ? 'play' : 'pause'} size={16} />
      {paused ? 'Resume background' : 'Pause background'}
    </button>
  )
}
