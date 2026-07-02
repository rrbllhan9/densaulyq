import { useState, useEffect, useRef } from 'react'
import styles from './BreathingExercise.module.css'

// Спокойное дыхание 4–4–6: вдох, пауза, длинный выдох.
// Длинный выдох активирует парасимпатическую систему — тело само успокаивается.
const PHASES = [
  { label: 'Вдох через нос', short: 'Вдох', sec: 4, scale: 1.45 },
  { label: 'Мягкая пауза', short: 'Пауза', sec: 4, scale: 1.45 },
  { label: 'Медленный выдох', short: 'Выдох', sec: 6, scale: 1 },
]

export default function BreathingExercise() {
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].sec)
  const [cycles, setCycles] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!running) return
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) return prev - 1
        // Фаза закончилась — переходим к следующей.
        setPhaseIdx(idx => {
          const next = (idx + 1) % PHASES.length
          if (next === 0) setCycles(c => c + 1)
          return next
        })
        return 0 // будет выставлено эффектом ниже
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [running])

  // Когда сменилась фаза — заводим её таймер заново.
  useEffect(() => {
    if (running) setSecondsLeft(PHASES[phaseIdx].sec)
  }, [phaseIdx, running])

  function start() {
    setPhaseIdx(0)
    setSecondsLeft(PHASES[0].sec)
    setCycles(0)
    setRunning(true)
  }

  function stop() {
    setRunning(false)
    clearInterval(timerRef.current)
  }

  const phase = PHASES[phaseIdx]

  return (
    <div className={styles.box}>
      {!running ? (
        <div className={styles.intro}>
          <div className={styles.introText}>
            <strong>Подышим вместе?</strong>
            <p>
              Минута спокойного дыхания помогает телу выйти из тревоги.
              Просто следуйте за кругом — он всё подскажет.
            </p>
          </div>
          <button className={styles.startBtn} onClick={start}>
            🫁 Начать
          </button>
        </div>
      ) : (
        <div className={styles.session}>
          <div className={styles.circleWrap}>
            <div
              className={styles.circle}
              style={{
                transform: `scale(${phase.scale})`,
                transition: `transform ${phase.sec}s ease-in-out`,
              }}
            />
            <div className={styles.circleText}>
              <span className={styles.phaseLabel}>{phase.short}</span>
              <span className={styles.count}>{secondsLeft}</span>
            </div>
          </div>
          <div className={styles.hint}>{phase.label}</div>
          {cycles > 0 && (
            <div className={styles.cycles}>
              Круг {cycles + 1} · вы отлично справляетесь 🤍
            </div>
          )}
          <button className={styles.stopBtn} onClick={stop}>
            Достаточно
          </button>
        </div>
      )}
    </div>
  )
}
