# Универсальный gulpfile-starter

- Считайте [`gulpfile.js`](gulpfile.js) **переиспользуемым стартером** для каждого нового layout-проекта из этого scaffold, а не проектным build-скриптом.
- Меняйте `gulpfile.js` только если правка полезна **всем** стартерам (багфикс, стандартные пути тасков, общий vendor sync) или если в брифе задачи **явно** требуется правка gulp.
- **Не добавляйте** без явного брифа:
  - `require()` проектного JSON/JS с доменным или mock-контентом;
  - `manageEnv` / `addGlobal` для фикстур сайта (рубрики, статьи, данные навигации);
  - разовые gulp-таски под один клиентский сайт или спринт.
- Проектную конфигурацию держите в `app/`, `tailwind.config.js`, `postcss.config.js` и скриптах `package.json` — не в `gulpfile.js`.
- Mock/fixture Nunjucks — в consuming `.njk`; см. [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § «Фикстуры и mock-данные».
- **Проверка:** diff `gulpfile.js` по layout-задаче не вводит доменный `require`/`addGlobal`; после отката проектных правок gulp `npm run build` по-прежнему проходит.
