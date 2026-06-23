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
  const [showModal, setShowModal] = useState(false)
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

        <div className={styles.cardBottom}>
          <div className={styles.meta}>
            <span className={styles.address}>📍 {doctor.address}</span>
            <span className={styles.price}>💳 {doctor.price}</span>
          </div>
          <button className={styles.appointBtn} onClick={() => setShowModal(true)}>
            Записаться на приём
          </button>
        </div>

        {showReviews && <ReviewsList reviews={doctor.reviews} />}
      </div>

      {showModal && <AppointmentModal doctor={doctor} onClose={() => setShowModal(false)} />}
    </>
  )
}
