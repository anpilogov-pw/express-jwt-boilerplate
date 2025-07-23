# Express jwt boilerplate

Шаблон backend-приложения на Node.js с авторизацией через JWT, валидацией, Redis и интеграцией с S3 и Mailgun.

## 📦 Стек технологий

- **Node.js + TypeScript**
- **Express.js**
- **Prisma** — ORM
- **JWT** — Аутентификация
- **Redis** — кеширование, хранение токенов
- **S3 (AWS)** — загрузка файлов
- **Mailgun** — email-рассылка
- **Helmet** — защита HTTP-заголовков
- **Express Rate Limit** — защита от брутфорса
- **dotenv** — управление переменными окружения

## 🚀 Установка и запуск

```bash
# Установка зависимостей
npm install

# Инициализация Prisma
npm run prisma-gen

# Локальный запуск в режиме разработки
npm run dev
```

### 🛠 Скрипты
| Скрипт                   |Назначение                                      |
|--------------------------|------------------------------------------------|
| `npm run dev`            | Запуск сервера в режиме разработки             |
| `npm run build`          | Сборка приложения в production                 |
| `npm run update`         | Обновление и пересоздание Prisma клиента       |
| `npm run migrate_deploy` | Применение миграций в production               |
| `npm run migrate_reset`  | Сброс базы и применение миграций заново        |
