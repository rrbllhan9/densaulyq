import styles from './Header.module.css'

export default function Header({ page, onChangePage }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🏥</span>
          <div>
            <span className={styles.logoTitle}>МедПомощь</span>
            <span className={styles.logoSub}>Первая помощь онлайн</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navBtn} ${page === 'checker' ? styles.active : ''}`}
            onClick={() => onChangePage('checker')}
          >
            <span>💬</span> Симптомы
          </button>
          <button
            className={`${styles.navBtn} ${page === 'map' ? styles.active : ''}`}
            onClick={() => onChangePage('map')}
          >
            <span>🗺️</span> Врачи на карте
          </button>
        </nav>

        <a href="tel:103" className={styles.emergency}>
          📞 103
        </a>
      </div>
    </header>
  )
}
