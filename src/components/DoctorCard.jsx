import { useState } from 'react'
import AppointmentModal from './AppointmentModal'
import ReviewsList from './ReviewsList'
import styles from './DoctorCard.module.css'

function Stars({ rating }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </span>
  )
}

export default function DoctorCard({ doctor, distance }) {
  const [modalMode, setModalMode] = useState(null)
  const [showReviews, setShowReviews] = useState(false)

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.avatar}>{doctor.name[0]}</div>
          <div className={styles.info}>
            <div className={styles.name}>{doctor.name}</div>
            <div className={styles.specialty}>{doctor.specialty} · {doctor.experience} лет опыта</div>
            <div className={styles.ratingRow}>
              <Stars rating={doctor.rating} />
              <span className={styles.ratingNum}>{doctor.rating}</span>
              <button className={styles.reviewsLink} onClick={() => setShowReviews(s => !s)}>
                {doctor.reviewCount} отзывов
              </button>
            </div>
          </div>
          {distance != null && (
            <div className={styles.distance}>
              📍 {distance < 1 ? `${Math.round(distance * 1000)} м` : `${distance.toFixed(1)} км`}
            </div>
          )}
        </div>

        {doctor.tags && (
          <div className={styles.tags}>
            {doctor.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        <div className={styles.cardBottom}>
          <div className={styles.meta}>
            <span className={styles.address}>📍 {doctor.address}</span>
            <span className={styles.price}>💳 {doctor.price}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.appointBtn} onClick={() => setModalMode('visit')}>
              Записаться без звонка
            </button>
            <button className={styles.onlineBtn} onClick={() => setModalMode('online')}>
              💬 Онлайн-консультация
            </button>
          </div>
        </div>

        {showReviews && <ReviewsList reviews={doctor.reviews} />}
      </div>

      {modalMode && (
        <AppointmentModal doctor={doctor} mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </>
  )
}
