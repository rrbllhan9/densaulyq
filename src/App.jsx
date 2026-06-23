import { useState } from 'react'
import Header from './components/Header'
import SymptomChecker from './components/SymptomChecker'
import DoctorMap from './components/DoctorMap'

export default function App() {
  const [page, setPage] = useState('checker')

  return (
    <>
      <Header page={page} onChangePage={setPage} />
      {page === 'checker' && (
        <SymptomChecker onShowDoctors={() => setPage('map')} />
      )}
      {page === 'map' && <DoctorMap />}
    </>
  )
}
