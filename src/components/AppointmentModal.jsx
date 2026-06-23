import { useState } from 'react'
import styles from './AppointmentModal.module.css'

export default function AppointmentModal({ doctor, onClose }) {
  const [selectedTime, setSelectedTime] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  function handleConfirm() {
    if (!selectedTime || !name.trim() || !phone.trim()) return
    setConfirmed(true)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>

        {confirmed ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✅</div>
            <h2 className={styles.successTitle}>Запись подтверждена!</h2>
            <p className={styles.successText}>
              Вы записаны к <strong>{doctor.name}</strong><br />
              Время: <strong>{selectedTime}</strong>, сегодня<br />
              Адрес: {doctor.address}
            </p>
            <p className={styles.successNote}>
              Мы свяжемся с вами по номеру <strong>{phone}</strong> для подтверждения.
            </p>
            <button className={styles.doneBtn} onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <>
            <div className={styles.doctorPreview}>
              <div className={styles.docAvatar}>{doctor.name[0]}</div>
              <div>
                <div className={styles.docName}>{doctor.name}</div>
                <div className={styles.docSpec}>{doctor.specialty}</div>
                <div className={styles.docPrice}>Стоимость: {doctor.price}</div>
              </div>
            </div>

            <h3 className={styles.sectionLabel}>Выберите время</h3>
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

            <h3 className={styles.sectionLabel}>Ваши данные</h3>
            <input
              className={styles.inputField}
              placeholder="Ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className={styles.inputField}
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
            />

            <button
              className={styles.confirmBtn}
              onClick={handleConfirm}
              disabled={!selectedTime || !name.trim() || !phone.trim()}
            >
              Записаться на приём
            </button>

            <p className={styles.note}>
              ⚠️ Это демо-версия. Реальная запись не производится.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
