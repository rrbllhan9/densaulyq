import BreathingExercise from './BreathingExercise'
import VisitMemo from './VisitMemo'
import styles from './ResultCard.module.css'

const SEVERITY_LABELS = {
  low: { label: 'Можно справиться дома', color: 'var(--primary-dark)', bg: 'var(--soft-sage)' },
  medium: { label: 'Стоит показаться врачу', color: 'var(--primary-dark)', bg: 'var(--soft-cream)' },
  high: { label: 'Лучше не откладывать визит', color: 'var(--danger-text)', bg: 'var(--soft-peach)' },
}

export default function ResultCard({ symptom, complaint, onShowDoctors }) {
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

      {symptom.breathing && (
        <section className={styles.section}>
          <h4 className={styles.sectionTitle}>🫁 Дыхание, которое успокаивает</h4>
          <BreathingExercise />
        </section>
      )}

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>🤍 Кто может помочь</h4>
        <div className={styles.specialistBox}>
          <span className={styles.specialistName}>{symptom.specialist.name}</span>
          <p className={styles.specialistReason}>{symptom.specialist.reason}</p>
          {symptom.id === 'emergency' ? (
            <a href="tel:103" className={styles.emergencyBtn}>
              📞 Позвонить 103 — бесплатно
            </a>
          ) : (
            <>
              <p className={styles.noCallHint}>
                Записаться можно здесь, <strong>без звонка</strong> — или написать врачу онлайн.
              </p>
              <button
                className={styles.findDoctorBtn}
                onClick={() => onShowDoctors({ specialtyIds: symptom.specialtyIds, complaint, symptom })}
              >
                Подобрать врача рядом →
              </button>
            </>
          )}
        </div>
      </section>

      {complaint && symptom.id !== 'emergency' && (
        <section className={styles.section}>
          <h4 className={styles.sectionTitle}>📝 Памятка на приём</h4>
          <VisitMemo complaint={complaint} symptom={symptom} />
        </section>
      )}

      {symptom.medications.length > 0 && (
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
      )}

      <div className={styles.warning}>
        {symptom.warning}
      </div>
    </div>
  )
}
