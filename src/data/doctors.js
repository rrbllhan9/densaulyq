export const doctors = [
  {
    id: 1,
    name: 'Айгерим Нурланова',
    specialty: 'Терапевт',
    specialtyId: 'therapist',
    experience: 12,
    rating: 4.9,
    reviewCount: 87,
    address: 'пр. Достык, 162, Алматы',
    phone: '+7 (727) 312-45-67',
    lat: 43.2194,
    lng: 76.9465,
    avatar: null,
    price: '5 000 ₸',
    schedule: [{ dayOffset: 0, times: ['15:30', '17:00'] }, { dayOffset: 1, times: ['09:00', '10:30', '13:00'] }],
    online: true,
    tags: ['🌿 Спокойный, подробный приём', '💬 Принимает онлайн'],
    reviews: [
      { author: 'Асель М.', stars: 5, date: '12 июня 2025', text: 'Замечательный врач! Очень внимательная, всё подробно объяснила. Быстро поставила диагноз.' },
      { author: 'Дмитрий К.', stars: 5, date: '3 июня 2025', text: 'Профессионал своего дела. Приём прошёл оперативно, лечение помогло.' },
      { author: 'Жанна С.', stars: 4, date: '28 мая 2025', text: 'Хороший врач, единственное — пришлось немного подождать в очереди.' },
    ],
  },
  {
    id: 2,
    name: 'Ерлан Сейткалиев',
    specialty: 'Невролог',
    specialtyId: 'neurologist',
    experience: 18,
    rating: 4.8,
    reviewCount: 124,
    address: 'ул. Тимирязева, 42, Алматы',
    phone: '+7 (727) 293-11-22',
    lat: 43.2385,
    lng: 76.8850,
    avatar: null,
    price: '7 000 ₸',
    schedule: [{ dayOffset: 2, times: ['10:00', '11:30'] }, { dayOffset: 3, times: ['14:00', '16:00'] }],
    online: true,
    tags: ['🤍 Не торопит, всё объясняет', '💬 Онлайн-консультация'],
    reviews: [
      { author: 'Мария П.', stars: 5, date: '18 июня 2025', text: 'Ерлан Маратович — настоящий профессионал. Помог разобраться с хроническими мигренями.' },
      { author: 'Алибек Т.', stars: 5, date: '10 июня 2025', text: 'Очень грамотный специалист, всё объяснил доступно.' },
      { author: 'Светлана Р.', stars: 4, date: '1 июня 2025', text: 'Хороший доктор, лечение назначено корректно.' },
    ],
  },
  {
    id: 3,
    name: 'Гульнара Абенова',
    specialty: 'Гастроэнтеролог',
    specialtyId: 'gastroenterologist',
    experience: 9,
    rating: 4.7,
    reviewCount: 56,
    address: 'ул. Байзакова, 280, Алматы',
    phone: '+7 (727) 267-88-90',
    lat: 43.2060,
    lng: 76.8789,
    avatar: null,
    price: '6 500 ₸',
    schedule: [{ dayOffset: 1, times: ['09:30', '11:00', '14:30'] }, { dayOffset: 2, times: ['16:30', '18:00'] }],
    online: true,
    tags: ['🌿 Бережный, мягкий подход', '💬 Принимает онлайн'],
    reviews: [
      { author: 'Руслан Д.', stars: 5, date: '15 июня 2025', text: 'Наконец-то нашёл хорошего гастроэнтеролога! Помогла с хроническим гастритом.' },
      { author: 'Айнур Б.', stars: 4, date: '7 июня 2025', text: 'Компетентный врач, назначила правильное лечение.' },
      { author: 'Кирилл О.', stars: 5, date: '30 мая 2025', text: 'Всё понравилось, буду рекомендовать!' },
    ],
  },
  {
    id: 4,
    name: 'Бауыржан Кенжебаев',
    specialty: 'Пульмонолог',
    specialtyId: 'pulmonologist',
    experience: 15,
    rating: 4.6,
    reviewCount: 43,
    address: 'пр. Абая, 52, Алматы',
    phone: '+7 (727) 261-33-44',
    lat: 43.2355,
    lng: 76.9123,
    avatar: null,
    price: '6 000 ₸',
    schedule: [{ dayOffset: 3, times: ['10:30', '12:00'] }, { dayOffset: 4, times: ['15:00', '17:30'] }],
    online: true,
    tags: ['🤍 Внимательный и спокойный', '💬 Онлайн-консультация'],
    reviews: [
      { author: 'Наталья В.', stars: 5, date: '20 июня 2025', text: 'Бауыржан Аскарович очень внимательный врач. Помог с астмой.' },
      { author: 'Олег М.', stars: 4, date: '11 июня 2025', text: 'Грамотный специалист, лечение эффективное.' },
      { author: 'Дина Н.', stars: 5, date: '5 июня 2025', text: 'Очень доволен приёмом, всё объяснил детально.' },
    ],
  },
  {
    id: 5,
    name: 'Сауле Жаксыбекова',
    specialty: 'Педиатр',
    specialtyId: 'pediatrician',
    experience: 11,
    rating: 4.9,
    reviewCount: 211,
    address: 'мкр. Самал-2, 37, Алматы',
    phone: '+7 (727) 344-55-66',
    lat: 43.2520,
    lng: 76.9340,
    avatar: null,
    price: '5 500 ₸',
    schedule: [{ dayOffset: 0, times: ['17:00'] }, { dayOffset: 1, times: ['09:00', '10:00', '11:30', '14:00'] }],
    online: true,
    tags: ['🌿 Дети не боятся приёма', '💬 Принимает онлайн'],
    reviews: [
      { author: 'Анна Г.', stars: 5, date: '22 июня 2025', text: 'Лучший детский врач! Дети её обожают, не боятся приёма.' },
      { author: 'Ержан К.', stars: 5, date: '14 июня 2025', text: 'Замечательный специалист, очень чуткая к детям.' },
      { author: 'Тамара Л.', stars: 5, date: '8 июня 2025', text: 'Профессионал! Быстро поставила диагноз, ребёнок выздоровел.' },
    ],
  },
  {
    id: 6,
    name: 'Марат Джаксыбеков',
    specialty: 'Кардиолог',
    specialtyId: 'cardiologist',
    experience: 22,
    rating: 4.8,
    reviewCount: 98,
    address: 'ул. Аль-Фараби, 17, Алматы',
    phone: '+7 (727) 390-12-34',
    lat: 43.2275,
    lng: 76.9005,
    avatar: null,
    price: '8 000 ₸',
    schedule: [{ dayOffset: 5, times: ['11:00', '13:30'] }, { dayOffset: 6, times: ['15:00', '16:30'] }],
    online: true,
    tags: ['🤍 Большой опыт, без спешки', '💬 Онлайн-консультация'],
    reviews: [
      { author: 'Владимир С.', stars: 5, date: '19 июня 2025', text: 'Марат Ахметович — настоящий профессионал с большим опытом. Спасибо за помощь!' },
      { author: 'Загипа А.', stars: 5, date: '9 июня 2025', text: 'Очень внимательный кардиолог, всё объяснил понятно.' },
      { author: 'Сергей П.', stars: 4, date: '2 июня 2025', text: 'Хороший врач, но запись занята на 2 недели вперёд.' },
    ],
  },
  {
    id: 7,
    name: 'Динара Смагулова',
    specialty: 'Психотерапевт',
    specialtyId: 'psychotherapist',
    experience: 10,
    rating: 4.9,
    reviewCount: 76,
    address: 'ул. Жандосова, 58, Алматы',
    phone: '+7 (727) 355-20-10',
    lat: 43.2286,
    lng: 76.8724,
    avatar: null,
    price: '8 000 ₸',
    schedule: [{ dayOffset: 1, times: ['10:00', '12:00', '14:00'] }, { dayOffset: 2, times: ['16:00', '18:00'] }],
    online: true,
    tags: ['🤍 Бережно про тревогу и панику', '💬 Онлайн-сессии'],
    reviews: [
      { author: 'Камила Ж.', stars: 5, date: '21 июня 2025', text: 'Полгода мучилась с паническими атаками. После нескольких сессий стало намного легче — спасибо огромное!' },
      { author: 'Ильяс Б.', stars: 5, date: '13 июня 2025', text: 'Первый раз обратился к психотерапевту, очень боялся. Оказалось совсем не страшно, наоборот — спокойно и по-доброму.' },
      { author: 'Вероника С.', stars: 5, date: '4 июня 2025', text: 'Помогла наладить сон и справиться с тревожностью. Онлайн-формат очень удобный.' },
    ],
  },
  {
    id: 8,
    name: 'Тимур Ахметов',
    specialty: 'ЛОР',
    specialtyId: 'lor',
    experience: 14,
    rating: 4.7,
    reviewCount: 65,
    address: 'ул. Гоголя, 86, Алматы',
    phone: '+7 (727) 279-41-15',
    lat: 43.2594,
    lng: 76.9312,
    avatar: null,
    price: '5 500 ₸',
    schedule: [{ dayOffset: 0, times: ['13:30', '15:30', '17:30'] }, { dayOffset: 1, times: ['09:00', '11:00'] }],
    online: true,
    tags: ['🌿 Аккуратный осмотр, без боли', '💬 Принимает онлайн'],
    reviews: [
      { author: 'Гульмира Т.', stars: 5, date: '17 июня 2025', text: 'Вылечил затяжной гайморит без проколов. Очень аккуратный и внимательный врач.' },
      { author: 'Андрей Л.', stars: 4, date: '9 июня 2025', text: 'Хороший специалист, быстро разобрался с проблемой.' },
      { author: 'Салтанат К.', stars: 5, date: '31 мая 2025', text: 'Ходим к нему всей семьёй. Детям тоже нравится — ничего не боятся.' },
    ],
  },
]

// Человекочитаемые названия специальностей — для плашки «подобрали по вашему запросу».
export const specialtyNames = {
  therapist: 'Терапевт',
  neurologist: 'Невролог',
  gastroenterologist: 'Гастроэнтеролог',
  pulmonologist: 'Пульмонолог',
  pediatrician: 'Педиатр',
  cardiologist: 'Кардиолог',
  psychotherapist: 'Психотерапевт',
  lor: 'ЛОР',
}

// Ближайшее свободное окно врача — по нему сортируется список «кто примет раньше».
export function earliestSlot(doctor) {
  const day = doctor.schedule?.[0]
  if (!day || !day.times.length) return null
  return { dayOffset: day.dayOffset, time: day.times[0] }
}

// Числовой ключ для сортировки: день и время в одном значении.
export function slotRank(doctor) {
  const s = earliestSlot(doctor)
  if (!s) return Infinity
  const [h, m] = s.time.split(':').map(Number)
  return s.dayOffset * 1440 + h * 60 + m
}

const WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу']
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export function dateFromOffset(dayOffset) {
  const d = new Date()
  d.setDate(d.getDate() + dayOffset)
  return d
}

// «сегодня» / «завтра» / «в пятницу, 29 августа»
export function formatDay(dayOffset, { short = false } = {}) {
  if (dayOffset === 0) return 'сегодня'
  if (dayOffset === 1) return 'завтра'
  const d = dateFromOffset(dayOffset)
  if (short) return `${d.getDate()} ${MONTHS[d.getMonth()]}`
  return `в ${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

