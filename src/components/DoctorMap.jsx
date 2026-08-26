import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { doctors, getDistance, specialtyNames, slotRank, earliestSlot, formatDay } from '../data/doctors'
import DoctorCard from './DoctorCard'
import AppointmentModal from './AppointmentModal'
import styles from './DoctorMap.module.css'

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const userIcon = L.divIcon({
  html: '<div style="width:18px;height:18px;background:#C8775A;border:3px solid white;border-radius:50%;box-shadow:0 0 0 5px rgba(200,119,90,0.3)"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  className: '',
})

// Булавка-капля: sage для всех, терракота — для рекомендованных триажем
function makeDoctorIcon(highlighted) {
  const bg = highlighted
    ? 'linear-gradient(135deg,#C8775A,#E8B4A0)'
    : 'linear-gradient(135deg,#6B9080,#84A98C)'
  return L.divIcon({
    html: `<div style="
      width:36px;height:36px;
      background:${bg};
      border:3px solid #fff;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 5px 12px rgba(61,58,54,0.4);
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);font-size:16px;line-height:1">🩺</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34],
    className: '',
  })
}

const doctorIcon = makeDoctorIcon(false)
const recommendedIcon = makeDoctorIcon(true)

function FlyTo({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.flyTo(center, 13, { duration: 1.5 })
  }, [center, map])
  return null
}

// Leaflet запоминает размер контейнера при создании. На телефоне высота
// меняется позже (адресная строка, поворот экрана), и карта остаётся с
// прежними размерами — половина плиток серая. Пересчитываем размер сами.
function KeepMapSized() {
  const map = useMap()
  useEffect(() => {
    const resize = () => map.invalidateSize()
    const timer = setTimeout(resize, 250)
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
    }
  }, [map])
  return null
}

const ALMATY_CENTER = [43.2220, 76.8512]

export default function DoctorMap({ context }) {
  const recommendedSpecialties = context?.specialtyIds
  const [userPos, setUserPos] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locError, setLocError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [booking, setBooking] = useState(null) // { doctor, mode }
  // Если пришли из чата с рекомендацией — сначала показываем только подходящих.
  const [showAll, setShowAll] = useState(!recommendedSpecialties?.length)
  // По умолчанию — кто примет раньше: это главный вопрос, когда нет времени.
  const [sortBy, setSortBy] = useState('time') // 'time' | 'distance'

  const recSet = recommendedSpecialties?.length ? new Set(recommendedSpecialties) : null
  const isRecommended = doc => Boolean(recSet?.has(doc.specialtyId))

  function locate() {
    setLocating(true)
    setLocError(null)
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserPos([pos.coords.latitude, pos.coords.longitude])
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

  // Список: фильтр по рекомендации, затем сортировка по выбранному признаку.
  let visibleDoctors = recSet && !showAll ? doctors.filter(isRecommended) : [...doctors]
  if (sortBy === 'distance' && userPos) {
    visibleDoctors.sort((a, b) => distances[a.id] - distances[b.id])
  } else {
    visibleDoctors.sort((a, b) => slotRank(a) - slotRank(b))
  }
  if (recSet && showAll) {
    visibleDoctors.sort((a, b) => Number(isRecommended(b)) - Number(isRecommended(a)))
  }

  const recNames = recommendedSpecialties
    ?.map(id => specialtyNames[id])
    .filter(Boolean)
    .join(', ')

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Куда можно попасть</h2>
          <div className={styles.sortToggle}>
            <button
              className={`${styles.sortBtn} ${sortBy === 'time' ? styles.sortActive : ''}`}
              onClick={() => setSortBy('time')}
            >
              Раньше примет
            </button>
            <button
              className={`${styles.sortBtn} ${sortBy === 'distance' ? styles.sortActive : ''}`}
              onClick={() => { setSortBy('distance'); if (!userPos) locate() }}
              disabled={locating}
            >
              {locating ? 'Ищем…' : 'Ближе ко мне'}
            </button>
          </div>
        </div>

        {recSet ? (
          <div className={styles.recBanner}>
            <span>
              🌿 Подобрали по вашему запросу: <strong>{recNames}</strong>
            </span>
            <button className={styles.recToggle} onClick={() => setShowAll(s => !s)}>
              {showAll ? 'Только подходящие' : 'Показать всех'}
            </button>
          </div>
        ) : (
          <div className={styles.onlineNote}>
            {(() => {
              const first = visibleDoctors[0]
              const s = first && earliestSlot(first)
              return s
                ? `Самое раннее окно — ${formatDay(s.dayOffset)} в ${s.time}, ${first.specialty.toLowerCase()}.`
                : 'Все врачи принимают онлайн и записывают без звонка.'
            })()}
          </div>
        )}

        {locError && <div className={styles.locError}>{locError}</div>}
        {userPos && (
          <div className={styles.locSuccess}>
            Готово — показываем, кто ближе к вам.
          </div>
        )}

        <div className={styles.doctorList}>
          {visibleDoctors.map(doc => (
            <div
              key={doc.id}
              className={`${styles.doctorWrapper} ${selectedId === doc.id ? styles.selected : ''}`}
              onClick={() => setSelectedId(doc.id === selectedId ? null : doc.id)}
            >
              {isRecommended(doc) && (
                <div className={styles.recBadge}>✓ Подходит по вашему запросу</div>
              )}
              <DoctorCard
                doctor={doc}
                distance={distances[doc.id]}
                onBook={mode => setBooking({ doctor: doc, mode })}
              />
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
          <KeepMapSized />
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
                pathOptions={{ color: '#6B9080', fillColor: '#6B9080', fillOpacity: 0.07, weight: 1.5, dashArray: '6,4' }}
              />
            </>
          )}

          {doctors.map(doc => (
            <Marker
              key={doc.id}
              position={[doc.lat, doc.lng]}
              icon={isRecommended(doc) ? recommendedIcon : doctorIcon}
            >
              <Popup maxWidth={260}>
                <div style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ fontSize: 14, color: '#3D3A36' }}>{doc.name}</strong>
                  <div style={{ color: '#7A746B', fontSize: 12, marginTop: 2 }}>{doc.specialty}</div>
                  <div style={{ marginTop: 6, fontSize: 13 }}>⭐ {doc.rating} · {doc.reviewCount} отзывов</div>
                  <div style={{ fontSize: 12, color: '#7A746B', marginTop: 4 }}>{doc.address}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#557566', marginTop: 4 }}>{doc.price}</div>
                  <div style={{ fontSize: 12, color: '#6B9080', fontWeight: 700, marginTop: 4 }}>💬 Принимает онлайн · без звонка</div>
                  {distances[doc.id] != null && (
                    <div style={{ fontSize: 12, color: '#6B9080', marginTop: 4 }}>
                      📍 {distances[doc.id] < 1
                        ? `${Math.round(distances[doc.id] * 1000)} м от вас`
                        : `${distances[doc.id].toFixed(1)} км от вас`}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    <button
                      onClick={() => setBooking({ doctor: doc, mode: 'visit' })}
                      style={{
                        flex: 1, padding: '9px 10px', border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg,#6B9080,#84A98C)', color: '#fff',
                        borderRadius: 11, fontSize: 12.5, fontWeight: 700, fontFamily: 'inherit',
                      }}
                    >
                      Записаться
                    </button>
                    <button
                      onClick={() => setBooking({ doctor: doc, mode: 'online' })}
                      style={{
                        flex: 1, padding: '9px 10px', cursor: 'pointer',
                        background: '#fff', color: '#557566', border: '1.5px solid #84A98C',
                        borderRadius: 11, fontSize: 12.5, fontWeight: 700, fontFamily: 'inherit',
                      }}
                    >
                      💬 Онлайн
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {booking && (
        <AppointmentModal
          doctor={booking.doctor}
          mode={booking.mode}
          complaint={context?.complaint}
          symptom={context?.symptom}
          onClose={() => setBooking(null)}
        />
      )}
    </div>
  )
}
