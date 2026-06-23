import styles from './ResultCard.module.css'

const SEVERITY_LABELS = {
  low: { label: 'Можно справиться дома', color: 'var(--primary-dark)', bg: 'var(--soft-sage)' },
  medium: { label: 'Стоит показаться врачу', color: 'var(--primary-dark)', bg: 'var(--soft-cream)' },
  high: { label: 'Лучше не откладывать визит', color: 'var(--danger-text)', bg: 'var(--soft-peach)' },
}

export default function ResultCard({ symptom, onShowDoctors }) {
  const sev = SEVERITY_LABELS[symptom.severity]

  function openKaspi(name) {
    window.open(`https://kaspi.kz/shop/search/?text=${encodeURIComponent(name)}`, '_blank', 'noopener')
  }

  return (
    <div className={`${styles.card} slide-up`}>
      <div className={styles.cardHeader}>
        <span className={styles.emoji}>{symptom.emoji}</span>
        <div className={styles.headerText}>
          <h3 className={styles.title}>{symptom.title}</h3>
          <span className={styles.severity} style={{ color: sev.color, background: sev.bg }}>
            {sev.label}
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>🩹 Что можно сделать прямо сейчас</h4>
        <ul className={styles.list}>
          {symptom.firstAid.map((item, i) => (
            <li key={i} className={styles.listItem}>
              <span className={styles.listNum}>{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>🤍 Кто может помочь</h4>
        <div className={styles.specialistBox}>
          <span className={styles.specialistName}>{symptom.specialist.name}</span>
          <p className={styles.specialistReason}>{symptom.specialist.reason}</p>
          <p className={styles.noCallHint}>
            Записаться можно здесь, <strong>без звонка</strong> — или написать врачу онлайн.
          </p>
          <button className={styles.findDoctorBtn} onClick={onShowDoctors}>
            Подобрать врача рядом →
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>💊 Что может облегчить состояние</h4>
        <div className={styles.medsGrid}>
          {symptom.medications.map((med, i) => (
            <div key={i} className={styles.medCard}>
              <div className={styles.medName}>{med.name}</div>
              <div className={styles.medDose}>{med.dose}</div>
              <div className={styles.medNote}>{med.note}</div>
              <button className={styles.kaspiBtn} onClick={() => openKaspi(med.name)}>
                <img
                  src="https://kaspi.kz/favicon.ico"
                  alt=""
                  width={14}
                  height={14}
                  onError={e => { e.target.style.display = 'none' }}
                />
                Найти на Kaspi
              </button>
            </div>
          ))}
        </div>
        <p className={styles.medDisclaimer}>
          Перед приёмом лекарств лучше посоветоваться с врачом — можно онлайн.
        </p>
      </section>

      <div className={styles.warning}>
        {symptom.warning}
      </div>
    </div>
  )
}
