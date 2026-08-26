import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { formatDay } from '../data/doctors'
import VisitMemo from './VisitMemo'
import styles from './AppointmentModal.module.css'

// Кому записываемся. Молодые часто записывают родителей и детей —
// им приложение нужно даже чаще, чем самому пользователю.
const PATIENTS = [
  { id: 'self', label: 'Себе' },
  { id: 'parent', label: 'Родителю' },
  { id: 'child', label: 'Ребёнку' },
  { id: 'other', label: 'Другому' },
]

const BRING = [
  'Удостоверение личности',
  'Прошлые выписки и результаты анализов, если есть',
  'Список лекарств, которые принимаете',
]

export default function AppointmentModal({ doctor, mode = 'visit', complaint, symptom, onClose }) {
  const [bookingMode, setBookingMode] = useState(mode)
  const [dayIdx, setDayIdx] = useState(0)
  const [selectedTime, setSelectedTime] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [patient, setPatient] = useState('self')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // Пока модалка открыта — глушим тяжёлую анимацию фоновых пятен,
  // иначе backdrop-filter оверлея лагает при каждом нажатии клавиши.
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const isOnline = bookingMode === 'online'
  const schedule = doctor.schedule || []
  const day = schedule[dayIdx]
  const forSelf = patient === 'self'
  const patientLabel = PATIENTS.find(p => p.id === patient)?.label

  function handleConfirm() {
    if (!selectedTime || !name.trim()) return
    setConfirmed(true)
  }

  function pickDay(i) {
    setDayIdx(i)
    setSelectedTime(null)
  }

  return createPortal(
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Закрыть">✕</button>

        {confirmed ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>🌿</div>
            <h2 className={styles.successTitle}>Готово</h2>
            <p className={styles.successText}>
              {isOnline ? (
                <>
                  Онлайн-консультация с <strong>{doctor.name}</strong><br />
                  {formatDay(day.dayOffset)} в <strong>{selectedTime}</strong>.<br />
                  Врач сам напишет в чат.
                </>
              ) : (
                <>
                  {forSelf ? 'Вы записаны' : `Запись оформлена (${patientLabel.toLowerCase()})`} к{' '}
                  <strong>{doctor.name}</strong><br />
                  {formatDay(day.dayOffset)} в <strong>{selectedTime}</strong>.<br />
                  {doctor.address}
                </>
              )}
            </p>

            {!isOnline && (
              <div className={styles.bringBox}>
                <span className={styles.blockLabel}>Что взять с собой</span>
                <ul className={styles.bringList}>
                  {BRING.map(item => (
                    <li key={item} className={styles.bringItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {complaint && symptom && (
              <div className={styles.memoBox}>
                <span className={styles.blockLabel}>Памятка на приём</span>
                <VisitMemo complaint={complaint} symptom={symptom} compact />
              </div>
            )}

            <p className={styles.successNote}>
              Напоминание придёт сюда, в приложение, накануне визита. Звонить не нужно.
            </p>
            <button className={styles.doneBtn} onClick={onClose}>Понятно</button>
          </div>
        ) : (
          <>
            <div className={styles.noCallBanner}>
              Без звонка и без поездки в регистратуру — просто выберите время.
            </div>

            <div className={styles.modeToggle} data-online={isOnline}>
              <span className={styles.modeIndicator} />
              <button
                className={`${styles.modeBtn} ${!isOnline ? styles.modeActive : ''}`}
                onClick={() => { setBookingMode('visit'); setSelectedTime(null) }}
              >
                🤍 В клинике
              </button>
              <button
                className={`${styles.modeBtn} ${isOnline ? styles.modeActive : ''}`}
                onClick={() => { setBookingMode('online'); setSelectedTime(null) }}
              >
                💬 Онлайн
              </button>
            </div>

            <div className={styles.doctorPreview}>
              <div className={styles.docAvatar}>{doctor.name[0]}</div>
              <div>
                <div className={styles.docName}>{doctor.name}</div>
                <div className={styles.docSpec}>{doctor.specialty}</div>
                <div className={styles.docPrice}>Стоимость: {doctor.price}</div>
              </div>
            </div>

            {isOnline && (
              <p className={styles.onlineHint}>
                Консультация пройдёт в чате или по видео — без личной встречи. Врач напишет первым.
              </p>
            )}

            <h3 className={styles.sectionLabel}>Для кого запись?</h3>
            <div className={styles.patientRow}>
              {PATIENTS.map(p => (
                <button
                  key={p.id}
                  className={`${styles.patientBtn} ${patient === p.id ? styles.patientActive : ''}`}
                  onClick={() => setPatient(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <h3 className={styles.sectionLabel}>Когда вам удобно?</h3>
            <div className={styles.dayRow}>
              {schedule.map((d, i) => (
                <button
                  key={d.dayOffset}
                  className={`${styles.dayBtn} ${dayIdx === i ? styles.dayActive : ''}`}
                  onClick={() => pickDay(i)}
                >
                  {formatDay(d.dayOffset, { short: true })}
                </button>
              ))}
            </div>

            <div className={styles.timeGrid}>
              {day?.times.map(t => (
                <button
                  key={t}
                  className={`${styles.timeSlot} ${selectedTime === t ? styles.selected : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <h3 className={styles.sectionLabel}>
              {forSelf ? 'Как к вам обращаться?' : 'Имя пациента'}
            </h3>
            <input
              className={styles.inputField}
              placeholder={forSelf ? 'Имя' : 'Имя того, кого записываете'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={styles.inputField}
              placeholder="Телефон — по желанию"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
            />

            {complaint && (
              <p className={styles.shareHint}>
                Ваша жалоба уйдёт врачу заранее — он подготовится, и приём пройдёт быстрее.
              </p>
            )}

            <button
              className={styles.confirmBtn}
              onClick={handleConfirm}
              disabled={!selectedTime || !name.trim()}
            >
              {isOnline ? 'Записаться на онлайн-консультацию' : 'Записаться без звонка'}
            </button>

            <p className={styles.note}>
              Это демо — настоящая запись не создаётся.
            </p>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
