# Security Policy

## Поддерживаемые версии

| Версия | Поддержка безопасности |
| ------ | ---------------------- |
| 1.0.0  | ✅                     |

## Уязвимые места и защита

- **JWT хранение**: Access/Refresh токены подписываются приватным ключом. Приватные ключи не хранятся в репозитории — используются переменные окружения.
- **Rate limiting**: Express Rate Limit ограничивает количество запросов с одного IP.
- **Helmet**: Защита от XSS, Clickjacking, Content sniffing и др.
- **Redis**: Хранение токенов. Используйте защищённый пароль и ограничьте доступ.
- **Prisma**: SQL-инъекции невозможны через ORM, но следует использовать валидации (`class-validator`, `express-validator`).
- **Загрузка файлов**: Проводится через `express-fileupload`. Важно ограничивать MIME-типы и размер.
- **CORS**: Добавить конфигурацию в middleware.
- **Логирование**: Добавьте Winston или аналог для централизованного логирования ошибок.
- **OAuth / Соц. вход**: Google Auth реализован через `google-auth-library`. Проверяйте `aud`, `iss`, `email_verified`.

## Рекомендации

- Не храните `.env` в репозитории.
- Применяйте HTTPS.
- Регулярно обновляйте зависимости (`npm audit`, `npm outdated`).
- Не раскрывайте подробности ошибок в production.
- Настройте CSP и HSTS.
- Используйте переменные среды на CI/CD с GitHub Secrets или Vault.

## Сообщение об уязвимостях

Пишите на [issues](https://github.com/anpilogov-pw/express-jwt-boilerplate/issues) или откройте pull request с исправлением.
