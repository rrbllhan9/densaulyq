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
    available: ['09:00', '10:30', '13:00', '15:30', '17:00'],
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
    available: ['10:00', '11:30', '14:00', '16:00'],
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
    available: ['09:30', '11:00', '14:30', '16:30', '18:00'],
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
    available: ['10:30', '12:00', '15:00', '17:30'],
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
    available: ['09:00', '10:00', '11:30', '14:00', '15:30', '17:00'],
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
    available: ['11:00', '13:30', '15:00', '16:30'],
    reviews: [
      { author: 'Владимир С.', stars: 5, date: '19 июня 2025', text: 'Марат Ахметович — настоящий профессионал с большим опытом. Спасибо за помощь!' },
      { author: 'Загипа А.', stars: 5, date: '9 июня 2025', text: 'Очень внимательный кардиолог, всё объяснил понятно.' },
      { author: 'Сергей П.', stars: 4, date: '2 июня 2025', text: 'Хороший врач, но запись занята на 2 недели вперёд.' },
    ],
  },
]

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

export const specialtyToId = {
  'Невролог': 'neurologist',
  'Терапевт': 'therapist',
  'Гастроэнтеролог': 'gastroenterologist',
  'Пульмонолог': 'pulmonologist',
  'Педиатр': 'pediatrician',
  'Кардиолог': 'cardiologist',
}
