import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './AppointmentModal.module.css'

export default function AppointmentModal({ doctor, mode = 'visit', onClose }) {
  const [bookingMode, setBookingMode] = useState(mode)
  const [selectedTime, setSelectedTime] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // Пока модалка открыта — глушим тяжёлую анимацию фоновых пятен,
  // иначе backdrop-filter оверлея лагает при каждом нажатии клавиши.
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const isOnline = bookingMode === 'online'

  function handleConfirm() {
    if (!selectedTime || !name.trim()) return
    setConfirmed(true)
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
                  на <strong>{selectedTime}</strong>, сегодня.<br />
                  Врач сам напишет вам в чат.
                </>
              ) : (
                <>
                  Вы записаны к <strong>{doctor.name}</strong><br />
                  на <strong>{selectedTime}</strong>, сегодня.<br />
                  Адрес: {doctor.address}
                </>
              )}
            </p>
            <p className={styles.successNote}>
              Напоминание придёт сюда, в приложение. Звонить не нужно.
            </p>
            <button className={styles.doneBtn} onClick={onClose}>Понятно</button>
          </div>
        ) : (
          <>
            <div className={styles.noCallBanner}>
              Без звонка — просто выберите удобное время.
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

            <h3 className={styles.sectionLabel}>Когда вам удобно?</h3>
            <div className={styles.timeGrid}>
              {doctor.available.map(t => (
                <button
                  key={t}
                  className={`${styles.timeSlot} ${selectedTime === t ? styles.selected : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <h3 className={styles.sectionLabel}>Как к вам обращаться?</h3>
            <input
              className={styles.inputField}
              placeholder="Имя"
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
