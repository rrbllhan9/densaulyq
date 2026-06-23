import styles from './ReviewsList.module.css'

function Stars({ count }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? 'var(--accent)' : 'var(--border)', fontSize: 13 }}>★</span>
      ))}
    </span>
  )
}

export default function ReviewsList({ reviews }) {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Отзывы пациентов</h4>
      <div className={styles.list}>
        {reviews.map((r, i) => (
          <div key={i} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div className={styles.authorAvatar}>{r.author[0]}</div>
              <div>
                <div className={styles.author}>{r.author}</div>
                <div className={styles.meta}>
                  <Stars count={r.stars} />
                  <span className={styles.date}>{r.date}</span>
                </div>
              </div>
            </div>
            <p className={styles.text}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
