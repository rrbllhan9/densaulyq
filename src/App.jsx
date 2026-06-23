import { useState } from 'react'
import Header from './components/Header'
import SymptomChecker from './components/SymptomChecker'
import DoctorMap from './components/DoctorMap'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('checker')

  return (
    <>
      <Header page={page} onChangePage={setPage} />
      <main className={styles.viewport}>
        {/* key={page} перемонтирует контент → проигрывается анимация входа */}
        <div key={page} className={styles.page}>
          {page === 'checker' ? (
            <SymptomChecker onShowDoctors={() => setPage('map')} />
          ) : (
            <DoctorMap />
          )}
        </div>
      </main>
    </>
  )
}
