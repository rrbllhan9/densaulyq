import styles from './Header.module.css'

export default function Header({ page, onChangePage }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span>
          <div>
            <span className={styles.logoTitle}>Densaulyq</span>
            <span className={styles.logoSub}>забота о здоровье</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navBtn} ${page === 'checker' ? styles.active : ''}`}
            onClick={() => onChangePage('checker')}
          >
            <span>💬</span> Что беспокоит
          </button>
          <button
            className={`${styles.navBtn} ${page === 'map' ? styles.active : ''}`}
            onClick={() => onChangePage('map')}
          >
            <span>🤍</span> Врачи рядом
          </button>
        </nav>

        <a href="tel:103" className={styles.emergency} title="Срочная помощь — 103, бесплатно">
          <span className={styles.emergencyIcon}>☎️</span>
          <span className={styles.emergencyText}>Срочно · 103</span>
        </a>
      </div>
    </header>
  )
}
