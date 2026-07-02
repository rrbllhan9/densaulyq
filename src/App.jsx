import { useState } from 'react'
import Header from './components/Header'
import SymptomChecker from './components/SymptomChecker'
import DoctorMap from './components/DoctorMap'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('checker')
  // Специальности, рекомендованные триажем — карта откроется с готовым подбором.
  const [recommended, setRecommended] = useState(null)

  function showDoctors(specialtyIds) {
    setRecommended(specialtyIds?.length ? specialtyIds : null)
    setPage('map')
  }

  function changePage(next) {
    // Переход через меню — без фильтра, показываем всех врачей.
    setRecommended(null)
    setPage(next)
  }

  return (
    <>
      <Header page={page} onChangePage={changePage} />
      <main className={styles.viewport}>
        {/* key={page} перемонтирует контент → проигрывается анимация входа */}
        <div key={page} className={styles.page}>
          {page === 'checker' ? (
            <SymptomChecker onShowDoctors={showDoctors} />
          ) : (
            <DoctorMap recommendedSpecialties={recommended} />
          )}
        </div>
      </main>
    </>
  )
}
