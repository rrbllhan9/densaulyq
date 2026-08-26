import { useState, useRef, useEffect } from 'react'
import { triage } from '../data/triage'
import ResultCard from './ResultCard'
import styles from './SymptomChecker.module.css'

const SUGGESTIONS = ['болит голова', 'температура', 'тревожно, паника', 'болит горло', 'не могу уснуть']

const WELCOME = {
  id: 'welcome',
  type: 'bot',
  content: 'Здравствуйте 🌿 Расскажите, что вас беспокоит — например, «болит голова» или «температура».\n\nПодскажу, что можно сделать сейчас, и помогу записаться к врачу без звонка.',
}

export default function SymptomChecker({ onShowDoctors }) {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send(text) {
    const trimmed = (text || input).trim()
    if (!trimmed || loading) return

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: trimmed }])
    setInput('')
    setLoading(true)

    // Небольшая пауза с индикатором печати — спокойный, «живой» ритм диалога.
    setTimeout(() => {
      const result = triage(trimmed)
      if (result) {
        const { symptom, reassurance } = result
        setMessages(prev => [
          ...prev,
          ...(reassurance ? [{ id: Date.now() + 1, type: 'bot', content: reassurance }] : []),
          { id: Date.now() + 2, type: 'result', symptom },
        ])
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            type: 'bot',
            content:
              'Пока не совсем понял. Опишите чуть подробнее своими словами или выберите вариант из подсказок ниже.',
          },
        ])
      }
      setLoading(false)
    }, 800)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat}>
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`${styles.msgRow} ${msg.type === 'user' ? styles.user : styles.bot} ${
              msg.type === 'result' ? styles.resultRow : ''
            }`}
          >
            {msg.type !== 'user' && <div className={styles.avatar}>🌿</div>}
            {msg.type === 'result' ? (
              <ResultCard symptom={msg.symptom} onShowDoctors={onShowDoctors} />
            ) : (
              <div className={`${styles.bubble} fade-in`} style={{ animationDelay: `${i * 0.05}s` }}>
                {msg.content.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < msg.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={`${styles.msgRow} ${styles.bot}`}>
            <div className={styles.avatar}>🌿</div>
            <div className={styles.typing}>
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className={styles.suggestions}>
        <span className={styles.suggestLabel}>Например:</span>
        {SUGGESTIONS.map(s => (
          <button key={s} className={styles.chip} onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Расскажите своими словами, что вас беспокоит…"
          rows={1}
        />
        <button
          className={styles.sendBtn}
          onClick={() => send()}
          disabled={!input.trim() || loading}
          aria-label="Отправить"
        >
          <span>➤</span>
        </button>
      </div>

      <p className={styles.disclaimer}>
        Это общие подсказки, а не замена врача. Если станет плохо — бесплатный номер <strong>103</strong>.
      </p>
    </div>
  )
}
