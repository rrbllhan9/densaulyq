import { useState } from 'react'
import styles from './VisitMemo.module.css'

// Памятка для приёма. Тревожный человек в кабинете часто теряется и забывает
// половину — здесь его же слова и подсказки собраны в короткий текст, который
// можно просто показать врачу с экрана.
export default function VisitMemo({ complaint, symptom, compact = false }) {
  const [copied, setCopied] = useState(false)

  const questions = symptom.questions || [
    'Что это может быть и насколько это серьёзно?',
    'Нужны ли обследования или анализы?',
    'Что можно делать дома, а чего лучше избегать?',
  ]

  const lines = [
    `Жалоба: ${complaint}`,
    `Похоже на: ${symptom.title}`,
    '',
    'Хочу спросить:',
    ...questions.map(q => `— ${q}`),
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`${styles.memo} ${compact ? styles.compact : ''}`}>
      <div className={styles.row}>
        <span className={styles.key}>Жалоба</span>
        <span className={styles.value}>{complaint}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>Похоже на</span>
        <span className={styles.value}>{symptom.title}</span>
      </div>

      <div className={styles.questions}>
        <span className={styles.key}>Спросить у врача</span>
        <ul className={styles.qList}>
          {questions.map((q, i) => (
            <li key={i} className={styles.qItem}>{q}</li>
          ))}
        </ul>
      </div>

      <button className={styles.copyBtn} onClick={copy}>
        {copied ? 'Скопировано' : 'Скопировать текст'}
      </button>
      <p className={styles.hint}>
        Можно просто показать этот экран врачу — объяснять вслух не придётся.
      </p>
    </div>
  )
}
