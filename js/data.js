const products = [
  {
    "id": 1,
    "title": "GOBLIN Pro",
    "category": "Техника",
    "price": 12990,
    "isAvailable": true,
    "rating": 4.3,
    "description": "GOBLIN Pro — удобное решение для повседневных задач."
  },
  {
    "id": 2,
    "title": "Smart Lamp",
    "category": "Для дома",
    "price": 2490,
    "isAvailable": true,
    "rating": 4.4,
    "description": "Smart Lamp — удобное решение для повседневных задач."
  },
  {
    "id": 3,
    "title": "Audio Mini",
    "category": "Техника",
    "price": 4390,
    "isAvailable": true,
    "rating": 4.5,
    "description": "Audio Mini — удобное решение для повседневных задач."
  },
  {
    "id": 4,
    "title": "Desk Pro",
    "category": "Для работы",
    "price": 3190,
    "isAvailable": true,
    "rating": 4.6,
    "description": "Desk Pro — удобное решение для повседневных задач."
  },
  {
    "id": 5,
    "title": "Clean Air",
    "category": "Для дома",
    "price": 7990,
    "isAvailable": true,
    "rating": 4.7,
    "description": "Clean Air — удобное решение для повседневных задач."
  },
  {
    "id": 6,
    "title": "Travel Kit",
    "category": "Аксессуары",
    "price": 1890,
    "isAvailable": true,
    "rating": 4.8,
    "description": "Travel Kit — удобное решение для повседневных задач."
  },
  {
    "id": 7,
    "title": "Focus Hub",
    "category": "Для работы",
    "price": 5690,
    "isAvailable": true,
    "rating": 4.3,
    "description": "Focus Hub — удобное решение для повседневных задач."
  },
  {
    "id": 8,
    "title": "Power Bank",
    "category": "Аксессуары",
    "price": 2990,
    "isAvailable": true,
    "rating": 4.4,
    "description": "Power Bank — удобное решение для повседневных задач."
  },
  {
    "id": 9,
    "title": "Quiet Keys",
    "category": "Для работы",
    "price": 6490,
    "isAvailable": false,
    "rating": 4.5,
    "description": "Quiet Keys — удобное решение для повседневных задач."
  },
  {
    "id": 10,
    "title": "Home Clock",
    "category": "Для дома",
    "price": 1590,
    "isAvailable": true,
    "rating": 4.6,
    "description": "Home Clock — удобное решение для повседневных задач."
  }
];
const formatPrice = value => new Intl.NumberFormat("ru-RU", {style:"currency",currency:"RUB",maximumFractionDigits:0}).format(value);
const findProduct = id => products.find(p => p.id === Number(id));
