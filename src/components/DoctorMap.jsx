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
  html: '<div style="width:16px;height:16px;background:#5b8caf;border:3px solid white;border-radius:50%;box-shadow:0 0 0 5px rgba(116,185,164,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  className: '',
})

const doctorIcon = L.divIcon({
  html: '<div style="font-size:24px;line-height:1;filter:drop-shadow(0 2px 5px rgba(91,140,175,0.35))">🤍</div>',
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
        setLocError('Не удалось определить местоположение — показываем всех врачей Алматы.')
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
          <h2 className={styles.sidebarTitle}>Врачи рядом</h2>
          <button
            className={styles.locateBtn}
            onClick={locate}
            disabled={locating}
          >
            {locating ? 'Ищем…' : '📍 Кто ближе'}
          </button>
        </div>

        <div className={styles.onlineNote}>
          Все врачи принимают онлайн и записывают без звонка.
        </div>

        {locError && <div className={styles.locError}>{locError}</div>}
        {userPos && (
          <div className={styles.locSuccess}>
            Готово — показываем, кто ближе к вам.
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
          Данные о врачах демонстрационные. Если станет плохо — бесплатный номер <strong>103</strong>.
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
                <Popup><strong>Вы здесь 🤍</strong></Popup>
              </Marker>
              <Circle
                center={userPos}
                radius={1500}
                pathOptions={{ color: '#74b9a4', fillColor: '#74b9a4', fillOpacity: 0.06, weight: 1.5, dashArray: '6,4' }}
              />
            </>
          )}

          {doctors.map(doc => (
            <Marker key={doc.id} position={[doc.lat, doc.lng]} icon={doctorIcon}>
              <Popup maxWidth={260}>
                <div style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <strong style={{ fontSize: 14 }}>{doc.name}</strong>
                  <div style={{ color: '#8b8579', fontSize: 12, marginTop: 2 }}>{doc.specialty}</div>
                  <div style={{ marginTop: 6, fontSize: 13 }}>⭐ {doc.rating} · {doc.reviewCount} отзывов</div>
                  <div style={{ fontSize: 12, color: '#8b8579', marginTop: 4 }}>{doc.address}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4a7491', marginTop: 4 }}>{doc.price}</div>
                  <div style={{ fontSize: 12, color: '#74b9a4', fontWeight: 700, marginTop: 4 }}>💬 Принимает онлайн · без звонка</div>
                  {distances[doc.id] != null && (
                    <div style={{ fontSize: 12, color: '#74b9a4', marginTop: 4 }}>
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
