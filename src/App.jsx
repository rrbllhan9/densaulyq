import { useState } from 'react'
import Header from './components/Header'
import SymptomChecker from './components/SymptomChecker'
import DoctorMap from './components/DoctorMap'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('checker')
  // Контекст из чата: какие специальности подошли и что человек написал —
  // жалоба нужна дальше для памятки на приём.
  const [context, setContext] = useState(null)

  function showDoctors(ctx) {
    setContext(ctx?.specialtyIds?.length ? ctx : null)
    setPage('map')
  }

  function changePage(next) {
    // Переход через меню — без фильтра, показываем всех врачей.
    setContext(null)
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
            <DoctorMap context={context} />
          )}
        </div>
      </main>
    </>
  )
}
