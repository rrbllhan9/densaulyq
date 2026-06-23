import { useState, useRef, useEffect } from 'react'
import { findSymptom } from '../data/symptoms'
import ResultCard from './ResultCard'
import styles from './SymptomChecker.module.css'

const SUGGESTIONS = ['болит голова', 'высокая температура', 'боль в животе', 'сильный кашель']

const WELCOME = {
  id: 'welcome',
  type: 'bot',
  content: '👋 Здравствуйте! Я помогу определить первую помощь при ваших симптомах.\n\nОпишите, что вас беспокоит — например, «болит голова» или «высокая температура». Я дам рекомендации и помогу найти нужного врача.\n\n⚠️ Это не замена консультации врача. При серьёзных симптомах — звоните 103.',
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

    setTimeout(() => {
      const found = findSymptom(trimmed)
      if (found) {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'result', symptom: found }])
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            type: 'bot',
            content:
              '🤔 К сожалению, я не смог распознать симптом. Попробуйте описать подробнее или выберите из подсказок ниже.\n\nЕсли симптомы серьёзные — пожалуйста, позвоните 103 или обратитесь к врачу.',
          },
        ])
      }
      setLoading(false)
    }, 900)
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
          <div key={msg.id} className={`${styles.msgRow} ${msg.type === 'user' ? styles.user : styles.bot}`}>
            {msg.type !== 'user' && <div className={styles.avatar}>🏥</div>}
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
            <div className={styles.avatar}>🏥</div>
            <div className={styles.typing}>
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className={styles.suggestions}>
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
          placeholder="Опишите симптомы... (например: болит голова, температура 38)"
          rows={1}
        />
        <button
          className={styles.sendBtn}
          onClick={() => send()}
          disabled={!input.trim() || loading}
        >
          ➤
        </button>
      </div>

      <p className={styles.disclaimer}>
        ⚠️ Данный сервис предоставляет общую информацию и не заменяет консультацию врача.
        При серьёзных или угрожающих жизни симптомах — немедленно звоните <strong>103</strong>.
      </p>
    </div>
  )
}
