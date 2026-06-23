import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { doctors, getDistance } from '../data/doctors'
import DoctorCard from './DoctorCard'
import styles from './DoctorMap.module.css'

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const userIcon = L.divIcon({
  html: '<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(37,99,235,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  className: '',
})

const doctorIcon = L.divIcon({
  html: '<div style="font-size:24px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">🏥</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  className: '',
})

function FlyTo({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.flyTo(center, 13, { duration: 1.5 })
  }, [center, map])
  return null
}

const ALMATY_CENTER = [43.2220, 76.8512]

export default function DoctorMap() {
  const [userPos, setUserPos] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locError, setLocError] = useState(null)
  const [sortedDoctors, setSortedDoctors] = useState(doctors)
  const [selectedId, setSelectedId] = useState(null)

  function locate() {
    setLocating(true)
    setLocError(null)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        setUserPos([lat, lng])
        const withDist = doctors
          .map(d => ({ ...d, dist: getDistance(lat, lng, d.lat, d.lng) }))
          .sort((a, b) => a.dist - b.dist)
        setSortedDoctors(withDist)
        setLocating(false)
      },
      () => {
        setLocError('Не удалось определить местоположение. Показываем всех врачей Алматы.')
        setLocating(false)
      },
      { timeout: 8000 }
    )
  }

  const distances = userPos
    ? Object.fromEntries(
        doctors.map(d => [d.id, getDistance(userPos[0], userPos[1], d.lat, d.lng)])
      )
    : {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Врачи в Алматы</h2>
          <button
            className={styles.locateBtn}
            onClick={locate}
            disabled={locating}
          >
            {locating ? '⏳ Определяем...' : '📍 Рядом со мной'}
          </button>
        </div>

        {locError && <div className={styles.locError}>{locError}</div>}
        {userPos && (
          <div className={styles.locSuccess}>
            ✅ Местоположение определено. Врачи отсортированы по расстоянию.
          </div>
        )}

        <div className={styles.doctorList}>
          {sortedDoctors.map(doc => (
            <div
              key={doc.id}
              className={`${styles.doctorWrapper} ${selectedId === doc.id ? styles.selected : ''}`}
              onClick={() => setSelectedId(doc.id === selectedId ? null : doc.id)}
            >
              <DoctorCard doctor={doc} distance={distances[doc.id]} />
            </div>
          ))}
        </div>

        <p className={styles.disclaimer}>
          ⚠️ Данные о врачах являются демонстрационными. Не является заменой реального
          поиска медицинских услуг. При экстренных ситуациях звоните <strong>103</strong>.
        </p>
      </div>

      <div className={styles.mapWrapper}>
        <MapContainer
          center={ALMATY_CENTER}
          zoom={12}
          className={styles.map}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {userPos && (
            <>
              <FlyTo center={userPos} />
              <Marker position={userPos} icon={userIcon}>
                <Popup><strong>Вы здесь</strong></Popup>
              </Marker>
              <Circle
                center={userPos}
                radius={1500}
                pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.05, weight: 1.5, dashArray: '6,4' }}
              />
            </>
          )}

          {doctors.map(doc => (
            <Marker key={doc.id} position={[doc.lat, doc.lng]} icon={doctorIcon}>
              <Popup maxWidth={260}>
                <div style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ fontSize: 14 }}>{doc.name}</strong>
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{doc.specialty}</div>
                  <div style={{ marginTop: 6, fontSize: 13 }}>⭐ {doc.rating} · {doc.reviewCount} отзывов</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{doc.address}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#2563eb', marginTop: 4 }}>{doc.price}</div>
                  {distances[doc.id] != null && (
                    <div style={{ fontSize: 12, color: '#10b981', marginTop: 4 }}>
                      📍 {distances[doc.id] < 1
                        ? `${Math.round(distances[doc.id] * 1000)} м от вас`
                        : `${distances[doc.id].toFixed(1)} км от вас`}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
