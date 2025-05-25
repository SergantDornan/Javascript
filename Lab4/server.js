const express = require('express');
const stocks = require('./internal/stocks');

const app = express();
const host = 'localhost';
const port = 7000;

// Кастомный CORS middleware
app.use((req, res, next) => {
  // Разрешаем запросы с любого origin (для разработки)
  res.header('Access-Control-Allow-Origin', '*');
  
  // Разрешаемые методы
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Разрешаемые заголовки
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Разрешаем передачу кук и авторизационных данных
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Кэширование preflight-запросов на 24 часа
  res.header('Access-Control-Max-Age', '86400');
  
  // Обрабатываем OPTIONS-запрос (preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());
app.use('/stocks', stocks);

app.listen(port, host, () => {
  console.log(`Сервер запущен по адресу http://${host}:${port}`);
});