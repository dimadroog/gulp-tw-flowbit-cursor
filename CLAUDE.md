# CLAUDE.md — Правила проекта fb-atom-layout

Этот файл содержит обязательные правила работы с проектом.
Все правила применяются строго и без исключений, если в задаче явно не оговорено иное.

---

## Стек и инструменты

| Инструмент                      | Роль                                    |
| ------------------------------- | --------------------------------------- |
| Gulp 5                          | Build-система                           |
| Nunjucks (`.njk`)               | HTML-шаблонизатор                       |
| SCSS + Tailwind CSS 3 + PostCSS | Стили                                   |
| Flowbite 4                      | UI-компоненты                           |
| BrowserSync                     | Dev-сервер (порт 3000)                  |
| ESLint, Stylelint, Prettier     | Линтинг и форматирование                |
| html-validate                   | Локальная W3C-валидация HTML            |
| axe-core + jsdom                | Автоматизированный WCAG 2.1 AA аудит    |
| sharp                           | Оптимизация изображений, генерация WebP |
| ttf2woff2                       | Конвертация TTF → WOFF2 при сборке      |

**Команды:**

```
npm run dev             # watch + live reload
npm run build           # продакшн-сборка
npm run qa              # build + lint + validate:html + a11y
npm run format          # автофикс стиля
npm run fonts:download  # скачать WOFF2 с Google Fonts, сгенерировать _fonts.scss
npm run a11y            # WCAG 2.1 AA аудит dist/
npm run validate:html   # W3C HTML-валидация dist/
```

---

## Структура проекта

```
app/
├── fonts/                      # WOFF2-файлы (auto-generated или ручные)
│   └── src/                    # исходные TTF для конвертации → WOFF2
├── img/
│   └── responsive/             # исходники для генерации srcset-вариантов
├── njk-layouts/_main.njk       # мастер-шаблон
├── njk-parts/
│   ├── _header.njk             # шапка (site shell)
│   ├── _footer.njk             # подвал (site shell)
│   └── _mixins.njk             # макросы компонентов
├── scss/
│   ├── style.scss              # точка входа
│   ├── _variables.scss         # CSS-переменные (:root)
│   ├── _fonts.scss             # @font-face (auto-generated, не редактировать)
│   ├── _motion.scss            # prefers-reduced-motion reset (@layer base)
│   ├── _typography.scss        # типографика (@layer base)
│   ├── _components.scss        # семантические компоненты (@layer components)
│   └── _header.scss            # стили шапки
└── js/script.js                # JS точка входа
scripts/
├── download-fonts.js           # npm run fonts:download
├── a11y.js                     # npm run a11y
└── check-no-sass-import.js     # проверка запрета @import в SCSS
dist/                           # скомпилированный вывод (gitignore)
```

---

## 1. HTML и Nunjucks

### Структура страницы

- Мастер-шаблон — `njk-layouts/_main.njk`. Страницы расширяют его через `{% extends %}` и заполняют `{% block content %}`.
- Дополнительный layout создаётся только при подтверждённом структурном расхождении, не ради разовой настройки страницы.
- Глобальные `header`/`footer` — в `njk-parts/`, не в шаблонах страниц.
- Язык страницы по умолчанию — русский: `<html lang="ru">`.
- Viewport строго: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- На каждой странице — ровно один `<h1>`. Если по макету нет видимого заголовка — добавить visually-hidden `h1`.
- Соблюдать корректную иерархию заголовков `h1 → h2 → h3` без пропусков уровней.
- `<section>` и `<article>` — только с содержательным заголовком внутри (`h2` или `h3`).
- Использовать семантические landmarks: `header`, `nav`, `main`, `aside`, `footer` — обязательный baseline каждой страницы.

### Метаданные новых страниц

Если финальный SEO-текст не задан, оставлять заглушки (`content="description"`, `content="keywords"`).

В `<title>` — название страницы из `app/index.njk` (реестр страниц), если не указано иное.

#### `robots`

Умолчание шаблона: `index, follow`. Переопределять на странице через переменную `robots`.

Когда ставить `noindex`:

| Тип страницы                                 | Директива                   |
| -------------------------------------------- | --------------------------- |
| Результаты поиска, фильтры с параметрами URL | `noindex, follow`           |
| Thank-you / success страницы                 | `noindex, nofollow`         |
| Черновики, dev-только страницы               | `noindex, nofollow`         |
| 404, ошибки                                  | `noindex, follow`           |
| Все остальные                                | `index, follow` (умолчание) |

#### `canonical`

- Обязателен на каждой публичной странице в production.
- Всегда абсолютный URL: `https://example.com/page/`.
- Передаётся через переменную `canonical` на странице. Если не задан — тег не рендерится (допустимо для layout-разработки, недопустимо при деплое).
- При наличии дублирующего контента (paginated, print-версии) — canonical указывает на основную версию.

#### Open Graph

Обязательный минимум для каждой страницы с публичным контентом:

| Тег              | Источник                 | Заметки                             |
| ---------------- | ------------------------ | ----------------------------------- |
| `og:type`        | переменная `ogType`      | `website` (умолчание) или `article` |
| `og:title`       | переменная `title`       | ≤ 60 символов                       |
| `og:description` | переменная `description` | 100–300 символов                    |
| `og:url`         | переменная `canonical`   | обязательно абсолютный URL          |
| `og:image`       | переменная `ogImage`     | абсолютный URL                      |
| `og:image:alt`   | переменная `ogImageAlt`  | fallback — `title`                  |
| `og:site_name`   | переменная `siteName`    | название проекта                    |

**Требования к `og:image`:**

- Формат: JPG или PNG
- Размер: **1200 × 630 px** (оптимум); минимум 600 × 315 px
- Файл: < 8 MB; рекомендуется < 500 KB
- Без важного контента у краёв — Facebook и VK обрезают под разные соотношения

#### Twitter Card

- `summary_large_image` — если задан `ogImage` (большое изображение в превью)
- `summary` — если `ogImage` не задан (только иконка)
- `twitter:title` и `twitter:description` — те же переменные, что и для OG

#### Переменные страниц

Все переменные передаются в шаблон через `set` в `.njk`-файле страницы:

```nunjucks
{% set title = "Название страницы" %}
{% set description = "Описание 100–300 символов" %}
{% set canonical = "https://example.com/page/" %}
{% set ogImage = "https://example.com/img/og-page.jpg" %}
{% set ogImageAlt = "Описание изображения" %}
{% set siteName = "Название сайта" %}
{# Опциональные переопределения: #}
{% set ogType = "article" %}
{% set robots = "noindex, nofollow" %}
```

### Переиспользование разметки

- Если блок встречается более одного раза — вынести в partial или macro.
- Если меняется только контент — передавать данные, а не клонировать разметку.
- Использовать Nunjucks loops/macros/includes для карточек, списков, сеток.
- Держать partials небольшими и предметными (section, card, nav, media).
- Комментарии — только для неочевидных ограничений и исключений, не для описания того, что делает код.

### Атрибуты и порядок классов

- `js-*` классы размещать после всех визуальных классов в атрибуте `class`.
- Utility-классы Tailwind сортируются автоматически плагином `prettier-plugin-tailwindcss` при запуске `npm run format`. Вручную порядок не редактировать — плагин является единственным источником истины.
- Void-элементы (`<meta>`, `<link>`, `<img>`, `<br>`, `<hr>` и др.) форматируются Prettier в self-closing стиле (`<meta />`). Это стандарт проекта — `html-validate` настроен под него (`void-style: selfclosing`).

---

## 2. SCSS и Sass-модули

- Использовать только `@use` и `@forward`. **`@import` запрещён** (deprecated в Dart Sass).
- `@use "partial" as *` — только при явном намерении дать членам глобальную доступность без namespace. Stylelint предупреждает об этом (`scss/at-use-no-unnamespaced: warning`) — предупреждение означает осознанный выбор.
- В `@use` не писать leading underscore: `@use "variables"`, не `@use "_variables"`.
- В entry-файле `style.scss` все `@use` и `@forward` — строго перед директивами `@tailwind`.
- CSS-переменные (`--*`): не оставлять неиспользуемых токенов. Если написано `var(--foo)`, но `--foo` нигде не задаётся — убрать переменную и использовать конкретное значение.
- Порядок CSS-свойств в custom-блоках автоматически проверяется Stylelint (`order/properties-order`):
  1. Позиционирование и поток: `position`, `inset`, `top/right/bottom/left`, `float`, `clear`, `z-index`
  2. Box model и Layout: `display`, `flex-*`, `grid-*`, `align-*`, `justify-*`, `gap`, `width/height`, `margin`, `padding`, `box-sizing`
  3. Рамки: `border`, `border-radius`, `outline`
  4. Поведение содержимого: `overflow`, `list-style`, `resize`, `cursor`, `pointer-events`
  5. Визуал и типографика: `background`, `color`, `opacity`, `font`, `text-*`, `transform`, `transition`, `animation`

**Автоматические проверки (входят в `npm run lint:styles`):**

- Stylelint с конфигом `.stylelintrc.json` на базе `stylelint-config-standard-scss` + `stylelint-order`
- `scripts/check-no-sass-import.js` — завершает с ошибкой при обнаружении любого `@import` в SCSS
- Нарушение порядка свойств, дублирование селекторов/свойств, вложенность >3 уровней — всё ошибки линтера

---

## 3. Tailwind CSS

- Utility-first Tailwind — основной подход к стилизации.
- Предпочитать tokenized utilities для spacing, typography, radius, color.
- BEM/custom классы допустимы только когда utility-композиция не закрывает требование. При использовании — краткое обоснование в комментарии.
- Tailwind `.container` использовать встроенный. Если не соответствует требованиям дизайна — переопределить в `tailwind.config.js` через `theme.container` (например `center: true`, `padding`, кастомные `screens`).

---

## 4. Семантические компоненты (`_components.scss`)

Компоненты задаются в `app/scss/_components.scss` через `@layer components` + `@apply`. В разметке — семантические классы, а не длинные строки утилит.

### Кнопки

- Базовый класс `.btn` + модификатор: `.btn-primary`, `.btn-outline`, `.btn-muted` и т.д.
- `.btn` обязательно включает `no-underline` (в том числе для `a.btn`).
- Не добавлять `underline` / `decoration-*` на кнопки в шаблонах.

### Формы

- `.form-label` — для `label` над текстовыми полями (`.form-control`).
- `.form-check-label` — для `label` рядом с checkbox/radio (`.form-check-input`).
- `.form-control` — только для текстоподобных `input`, `select`, `textarea`. Размер набранного текста: `font-size: 1rem` (`text-base`).
- `.form-check-input` — для `checkbox` и `radio`. Без `.form-control`.
- Состояние ошибки — только через `aria-invalid="true"`, не через отдельные классы.
- Связь `label` ↔ `input` обязательна. При группах — `fieldset`/`legend`.
- `aria-describedby` для helper-текстов и ошибок — единообразно.

### Контентный пояс

- Обёртка основного контента — класс `.container`.
- Корневой layout оборачивает `{% block content %}` в `.container`. Страницы не добавляют второй пояс.

---

## 5. JavaScript

### Подход

- Progressive enhancement: базовый контент и контролы работают без custom JS там, где возможно.
- Unobtrusive JS: поведение подключается через `data-*` атрибуты и `js-*` hooks, не через styling-классы.
- `js-*` классы — только behavioral hooks. CSS-селекторы для `js-*` классов в файлах стилей не объявлять.

### Flowbite-first

- Для accordion, modal, offcanvas, tabs, dropdown, tooltip — сначала Flowbite data-attributes API.
- Custom JS добавлять только при явной недостаточности Flowbite. Причину фиксировать в комментарии.

### Архитектура

- Преобразования данных и логику — в pure helper-функциях.
- DOM-чтение/запись, события, side effects — в тонком imperative shell.
- Не смешивать бизнес-логику напрямую в event handlers.
- Каждый custom интерактив — idempotent init (безопасный повторный вызов, без повторных bindings).

### Читаемость

- Тернарный оператор — только для коротких однострочных выражений.
- Вложенные тернарные операторы запрещены.
- Многострочные ветвления — явные блоки `if/else`.
- В build/config-скриптах приоритет у читаемости, а не компактности.

---

## 6. Переходы и анимации

- **Hover / focus-visible:** изменения `color`, `background-color`, `border-color`, `opacity`, `box-shadow` — переход **200ms ease-in-out** по умолчанию.
  - Реализация: Tailwind `transition-colors duration-200 ease-in-out` или эквивалент в `_components.scss`.
- **Раскрывающиеся панели, аккордеон, оверлеи:** ≤300ms. Значения >400ms без явного обоснования не использовать.
- Дефолтные переходы Flowbite не переопределять без задачи на это.

### `prefers-reduced-motion`

#### Глобальный reset (автоматический)

Файл `app/scss/_motion.scss` включает глобальный safety-net в `@layer base`:

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Это подавляет **все** transitions и animations автоматически — резервная защита на случай, если компонент не обработал медиазапрос самостоятельно.

#### Правило opt-in для кастомных анимаций

Кастомные анимации пишутся в режиме opt-in — активируются только когда пользователь **не** просил уменьшить движение:

```scss
// Правильно — анимация opt-in
@media (prefers-reduced-motion: no-preference) {
  .hero-illustration {
    animation: float 3s ease-in-out infinite;
  }
}

// Неправильно — потребует override в reduce
.hero-illustration {
  animation: float 3s ease-in-out infinite;
}
```

В Tailwind — использовать вариант `motion-safe:`:

```html
<div class="motion-safe:animate-bounce"></div>
```

Не использовать `motion-reduce:` для отключения — это инверсия: лучше не включать изначально, чем отключать.

#### Измеримые критерии применения

| Элемент                                            | Требует явного `prefers-reduced-motion`?              |
| -------------------------------------------------- | ----------------------------------------------------- |
| `transition` на hover/focus (≤200ms)               | Нет — глобальный reset покрывает                      |
| `animation` декоративная (плавающий объект, пульс) | **Да** — обернуть в `no-preference`                   |
| `animation` с длительностью > 1s                   | **Да**                                                |
| Parallax, scroll-driven анимации в JS              | **Да** — проверить `window.matchMedia`                |
| `<video autoplay>`                                 | **Да** — `prefers-reduced-motion: reduce` → `pause()` |
| Skeleton loader                                    | Нет — CSS reset до 0.01ms делает его мгновенным       |
| Spinner/индикатор загрузки                         | Нет — функциональный элемент, допустим при 0.01ms     |

#### `:focus-visible` — исключение

Стили `:focus-visible` **не подавлять** при reduced motion. Обводка фокуса — информация, не декорация. Она должна быть видна вне зависимости от длительности.

#### JS-анимации

Проверять предпочтение перед запуском любой JS-анимации:

```js
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  startAnimation();
}
```

---

## 7. Accessibility и W3C

### Семантика

- Все `img` — с атрибутом `alt`: осмысленное описание для информативных, `alt=""` для декоративных.
- Декоративные элементы скрыты от assistive technologies (`aria-hidden="true"` или `alt=""`).
- Все интерактивные элементы — доступны и управляемы с клавиатуры.
- Tab order — соответствует визуальной и логической структуре.
- Для modal/offcanvas — корректное управление фокусом и закрытием.

### Стили фокуса

- `:focus-visible` стили — с хорошо заметным контрастом (не убирать outline без замены).

### ARIA

- Для динамических контролов — полная настройка `aria-*`: `aria-expanded`, `aria-controls`, labels, states.

### Контраст

- Базовый ориентир — WCAG 2.1 уровень AA:
  - Основной текст: ≥4.5:1
  - Крупный текст (≥18pt / полужирный ≥14pt) и значимые границы/иконки: ≥3:1
- Использовать токены палитры из `tailwind.config.js`. Сомнительные пары проверять в DevTools или WebAIM.
- `color-contrast` **не покрывается автотестом** (требует реального CSS-рендеринга) — проверять вручную.

### Автоматизированный аудит (axe-core)

**Инструмент:** `axe-core` + `jsdom` — запуск в Node.js без браузера, покрывает структурные WCAG 2.1 AA правила.

```
npm run a11y      # standalone аудит
npm run qa        # включает a11y как последний шаг
```

**Что проверяется автоматически:**

- Отсутствие/пустой `alt` на `<img>`
- Связь `label` ↔ `input`
- Корректные ARIA-роли и состояния
- Иерархия заголовков
- Доступность интерактивных элементов
- Landmark-регионы (`main`, `nav`, `header`, `footer`)
- Дубли `id`, скрытые активные элементы

**Что требует ручной проверки:**

- `color-contrast` — DevTools / [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Управление фокусом в модалках и offcanvas
- Порядок Tab через всю страницу

Скрипт: `scripts/a11y.js`. Завершается с кодом 1 при наличии любых нарушений — блокирует `npm run qa`.

### W3C HTML-валидация

**Требование абсолютное: ноль errors, warnings и notices.**

Валидация автоматизирована через `html-validate` (локальный пакет, без сети):

- Конфиг: `.htmlvalidate.json` в корне проекта, ruleset `html-validate:recommended`
- Запуск: `npm run validate:html` — проверяет все файлы `dist/**/*.html`
- Входит в `npm run qa` как обязательный шаг после сборки

`npm run qa` не должен завершаться с ненулевым кодом — это блокирующее условие перед завершением любой задачи с HTML-выводом.

Обязательные конвенции шаблонов (уже настроены в `_main.njk`):

- `<!DOCTYPE html>` — заглавными буквами
- `<html lang="{{ lang | default('ru') }}">` — атрибут `lang` обязателен
- `<meta charset="UTF-8">` — первым в `<head>`
- `<title>` — непустой
- Корректная вложенность элементов
- Атрибуты `id` — уникальны в пределах страницы

---

## 8. Изображения

### Пайплайн сборки

Gulp-таск `images` автоматически обрабатывает все файлы из `app/img/`:

- **JPG/PNG** → оптимизированный оригинал + WebP-версия (quality 85) в `dist/img/`
- **JPG/PNG в `app/img/responsive/`** → дополнительно генерируются варианты под breakpoints: `640w`, `960w`, `1280w`, `1600w` (пропускаются размеры, превышающие естественную ширину)
- **SVG, GIF, WebP, видео** → копируются без изменений

Именование генерируемых файлов: `image-640w.jpg`, `image-640w.webp` и т.д.

### Форматы

- Рабочий формат для контентных изображений — **WebP** как основной, JPEG/PNG как fallback.
- SVG — для иконок и векторной графики. Декоративные SVG: `aria-hidden="true"`.
- Никаких растровых изображений там, где уместен SVG.

### Обязательные атрибуты `<img>`

Каждый `<img>` должен иметь:

- `alt` — осмысленный текст для информативных изображений; `alt=""` для декоративных
- `width` и `height` — числовые значения, соответствующие естественным размерам исходника (или размеру отображения). Предотвращают Layout Shift (CLS)
- `loading` — явно `"lazy"` или `"eager"` (см. правила ниже)

### Загрузка: `loading` и `fetchpriority`

| Ситуация                                             | Атрибуты                               |
| ---------------------------------------------------- | -------------------------------------- |
| LCP-изображение (первый экран, hero, главный визуал) | `loading="eager" fetchpriority="high"` |
| Изображения выше fold, но не LCP                     | `loading="eager"`                      |
| Всё что ниже fold                                    | `loading="lazy"`                       |
| Некритичные фоновые изображения                      | `loading="lazy" decoding="async"`      |

На каждой странице — не более одного `fetchpriority="high"`.

### Критерии применения `srcset` / `<picture>`

Решение принимается на основе критериев Lighthouse («Properly size images»):
Lighthouse сигнализирует, когда потенциальная экономия превышает ~4 КБ:
`savings ≈ file_size × (1 − rendered_pixels / natural_pixels)`, где `rendered_pixels = css_width × DPR × css_height × DPR`.

**Применять `srcset`/`<picture>` при выполнении любого из условий:**

1. **Переменная ширина по breakpoints** — CSS-ширина изображения отличается между наименьшим и наибольшим breakpoint на ≥200px (responsive-колонки, hero на всю ширину)
2. **Превышение 1.5× максимальной ширины отображения** — `natural_width > max_css_display_width × 1.5` (proxy Lighthouse-порога: гарантированная экономия > 4 КБ)
3. **Крупное изображение** — отображается на ширине ≥600px CSS хотя бы на одном breakpoint (hero, banner, feature-блок)
4. **Плотность экрана для фиксированных изображений** — изображение с фиксированной CSS-шириной ≥100px, где качество на 2x-экране критично (логотип, аватар, иллюстрация)

**`srcset`/`<picture>` не нужен когда:**

- SVG (вектор масштабируется без потерь)
- Фиксированный размер ≤200px CSS (иконки, мелкие логотипы)
- `natural_width ≤ max_css_display_width × 1.5` на всех breakpoints и изображение меньше 600px

### Шаблон `<picture>` с WebP и srcset

Для изображений, требующих `srcset`, использовать конструкцию:

```html
<picture>
  <source
    type="image/webp"
    srcset="
      img/responsive/hero-640w.webp   640w,
      img/responsive/hero-960w.webp   960w,
      img/responsive/hero-1280w.webp 1280w,
      img/responsive/hero-1600w.webp 1600w
    "
    sizes="(max-width: 560px) 100vw, (max-width: 880px) 100vw, 1280px"
  />
  <img
    src="img/responsive/hero.jpg"
    srcset="
      img/responsive/hero-640w.jpg   640w,
      img/responsive/hero-960w.jpg   960w,
      img/responsive/hero-1280w.jpg 1280w,
      img/responsive/hero-1600w.jpg 1600w
    "
    sizes="(max-width: 560px) 100vw, (max-width: 880px) 100vw, 1280px"
    alt="Описание изображения"
    width="1600"
    height="900"
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

Для простых изображений без art direction, где нужна только WebP-замена:

```html
<picture>
  <source type="image/webp" srcset="img/photo.webp" />
  <img src="img/photo.jpg" alt="..." width="800" height="600" loading="lazy" />
</picture>
```

### Семантика

- Изображения с подписью — в `<figure>` + `<figcaption>`.
- Контентные изображения — только через `<img>` или `<picture>`, не через CSS `background-image`.
- CSS `background-image` допустим только для декоративных текстур и паттернов без смыслового содержания.

---

## 9. Производительность и архитектура

- Приоритет: скорость загрузки и runtime-производительность. Ориентир — Lighthouse/PageSpeed.
- Шрифты: **self-hosted обязателен** — никаких внешних CDN-запросов к шрифтам в production. Только форматы WOFF2, только реально используемые семейства и начертания, `font-display: swap`.

### Пайплайн шрифтов

1. **Автозагрузка с Google Fonts:** `npm run fonts:download` — скачивает WOFF2-файлы в `app/fonts/`, генерирует `app/scss/_fonts.scss` с `@font-face`-блоками.
2. **TTF → WOFF2 из собственных файлов:** положить TTF-файлы в `app/fonts/src/` — Gulp-таск `convertTtf` автоматически конвертирует при сборке через `ttf2woff2`.
3. **При недоступности автозагрузки** (сеть, лицензия, проприетарный шрифт): запросить у пользователя WOFF2-файлы. Именование: `<family-slug>-<weight>-<subset>.woff2` (пример: `{family-slug}-400-latin.woff2`). Вручную добавить `@font-face`-блоки в `app/scss/_fonts.scss`.
4. `app/scss/_fonts.scss` — автогенерируемый файл, не редактировать вручную, исключён из Stylelint (`/* stylelint-disable */`) и Prettier (`.prettierignore`).
5. После добавления шрифтов убедиться, что `@use "fonts"` раскомментирован в `style.scss`.

- Не поставлять лишние JS/CSS и тяжёлые медиа при наличии более лёгких эквивалентов.
- Вёрстка контентоустойчива: проверять поведение при длинных текстах и замене изображений.

### `<link rel="preload">` — правила применения

`preload` сообщает браузеру: «скачай этот ресурс как можно раньше, он точно понадобится». Неправильное применение хуже, чем его отсутствие — лишние preload-запросы конкурируют с реально критичными ресурсами.

#### Шрифты

**Применять** для шрифтов, используемых в тексте первого экрана (above the fold).

Критерии применения (все три должны быть верны):

1. Шрифт присутствует в контенте первого экрана (до прокрутки на типичном устройстве 1080p)
2. Начертание — одно из body-начертаний (`font-weight: 400` или `500`) **или** начертание заголовка `h1`/`h2` первого экрана
3. Subset соответствует языку страницы: русский → `cyrillic` + `latin`; только латиница → `latin`

**Лимит:** не более **4 font preload** на страницу. Больше — Lighthouse «Avoid chaining critical requests».

**Шаблон:**

```html
<link
  rel="preload"
  as="font"
  type="font/woff2"
  href="fonts/{family-slug}-400-cyrillic.woff2"
  crossorigin
/>
<link
  rel="preload"
  as="font"
  type="font/woff2"
  href="fonts/{family-slug}-400-latin.woff2"
  crossorigin
/>
```

Атрибут `crossorigin` обязателен для шрифтов даже при same-origin — без него браузер загружает шрифт дважды.

**По умолчанию** в `_main.njk`: preload body-шрифт проекта, weight 400, subsets по языку страницы (русский → cyrillic + latin).

Страница может расширить список через `{% block preload %}{% endblock %}` — добавить начертания заголовка или другой шрифт первого экрана.

#### LCP-изображение

**Правило:** `<link rel="preload">` для изображений нужен **только** когда браузер не может обнаружить ресурс самостоятельно до начала рендеринга.

| Ситуация                                | Действие                                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| LCP — `<img>` или `<picture>` в HTML    | **Не нужен** — браузер обнаруживает при парсинге; используй `loading="eager" fetchpriority="high"` |
| LCP — `background-image` в CSS          | **Нужен** — браузер узнаёт о нём только при вычислении стилей                                      |
| LCP — изображение подгружается через JS | **Нужен**                                                                                          |

Измеримый порог: применяй preload для LCP CSS-фона, если Lighthouse сообщает «Preload Largest Contentful Paint image» (savings > 200ms на slow 4G).

#### Другие ресурсы

| Ресурс                   | Применять когда                                                             |
| ------------------------ | --------------------------------------------------------------------------- |
| `<script type="module">` | `rel="modulepreload"` для критичных ES-модулей первого взаимодействия       |
| CSS                      | Не нужен — `<link rel="stylesheet">` в `<head>` уже имеет высокий приоритет |
| Видео                    | `preload="metadata"` на `<video>` — не `<link rel="preload">`               |

---

## 10. Чеклист перед завершением задачи

Перед отметкой задачи как выполненной проверить:

- [ ] Соблюдена корректная иерархия заголовков, на странице один `h1`
- [ ] Все `img` имеют `alt`, `width`, `height`, `loading`
- [ ] LCP-изображение: `loading="eager" fetchpriority="high"` (не более одного `fetchpriority="high"` на странице), помещено в `app/img/responsive/`
- [ ] Preload: body-шрифт first-screen subsets в `_main.njk` (≤4 font preload); LCP CSS-фон — `<link rel="preload" as="image">`
- [ ] `canonical` задан на всех публичных страницах (абсолютный URL); `robots` переопределён там где нужен noindex; `ogImage` 1200×630px задан для страниц с OG-шеринг
- [ ] Изображения ≥600px или с переменной шириной: используют `<picture>` + `srcset`
- [ ] `color-contrast` проверен вручную (DevTools или WebAIM): текст ≥4.5:1, крупный текст/иконки ≥3:1
- [ ] Все интерактивные элементы доступны с клавиатуры
- [ ] `:focus-visible` стили не убраны без замены
- [ ] `aria-*` атрибуты расставлены для динамических контролов
- [ ] В SCSS нет `@import`, нет мёртвых CSS-переменных
- [ ] `js-*` классы не используются как CSS-селекторы
- [ ] Flowbite-компонент проверен перед написанием аналога на custom JS
- [ ] Переходы hover/focus — 200ms; раскрытия — ≤300ms
- [ ] Кастомные анимации длительностью > 1s или декоративные — обёрнуты в `@media (prefers-reduced-motion: no-preference)` или `motion-safe:`; JS-анимации проверяют `window.matchMedia`
- [ ] Шрифты self-hosted: WOFF2 в `app/fonts/`, `@font-face` в `_fonts.scss`, `font-display: swap`, `@use "fonts"` активирован в `style.scss`
- [ ] `npm run qa` проходит без ошибок
