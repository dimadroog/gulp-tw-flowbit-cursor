# Универсальный gulpfile-starter

- Считайте [`gulpfile.js`](../../../gulpfile.js) **переиспользуемым стартером** для каждого нового layout-проекта из этого scaffold, а не проектным build-скриптом.
- Меняйте `gulpfile.js` только если правка полезна **всем** стартерам (багфикс, стандартные пути тасков, общий vendor sync) или если в брифе задачи **явно** требуется правка gulp.
- **Не добавляйте** без явного брифа:
  - `require()` **конкретных** проектных JSON/JS с доменным или mock-контентом (например `require('./app/shared/rubrics.json')`);
  - `manageEnv` / `addGlobal` для фикстур сайта (рубрики, статьи, данные навигации);
  - разовые gulp-таски под один клиентский сайт или спринт.
- **Разрешено в gulpfile** (инфраструктура стартера): `gulp-data` + универсальная `getTemplateData`, которая динамически читает `app/shared/*.json` и co-located `app/<page>.json` — без хардкода путей к фикстурам.
- Проектный **контент** — в `app/*.json`, `app/shared/` и consuming `.njk`; не встраивайте в `gulpfile.js`. Конфиг инструментов — в `tailwind.config.js`, `postcss.config.js`, `package.json`.
- Политика mock/fixture — [`html-nunjucks-conventions.RULE.md`](./html-nunjucks-conventions.md) § «Фикстуры и mock-данные».
- **Проверка:** diff `gulpfile.js` не вводит доменный `require` фикстур или `addGlobal`; после отката проектных правок `npm run build` проходит.
