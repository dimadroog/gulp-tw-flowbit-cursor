---
description: Compose buttons, form labels, form controls (.form-control/.form-check-*), and .container belt with @apply-backed classes.
alwaysApply: true
---

# Семантические компоненты (`@apply`)

В одном стиле с **`_typography.scss`**: токены проекта задаются утилитами Tailwind и **сводятся в SCSS** через **`@layer components`** и **`@apply`** (`app/scss/_components.scss`). В разметке по умолчанию — **семантические классы**, а не длинные строки утилит на каждом контроле.

## Кнопки

- Элемент **`button`** (и `a` / `input` с ролью кнопки) используют базу **`.btn`** и модификатор: **`.btn-primary`**, **`.btn-outline`**, **`.btn-muted`** или последующие **`.btn-*`**, описанные рядом в `_components.scss`.
- **Оформление подписи:** текст **внутри** **`.btn` / `.btn-*`** не должен быть **подчёркнут** (в том числе у **`a.btn`**, если глобальные стили ссылок задают подчёркивание). Задаётся базой **`.btn`** в **`_components.scss`** через **`@apply`** с **`no-underline`**; в шаблонах не добавлять **`underline`** / **`decoration-*`** на кнопки, если бриф явно не описывает исключение «как ссылка» вне системы кнопок.
- **Проверка:** в **`_components.scss`** у **`.btn`** есть **`no-underline`**; новые **`a class="btn`** без лишних утилит подчёркивания; поиск **`btn` + `underline`** по **`app/`** пустой, кроме задокументированных исключений.

## Нативные элементы ввода (форма)

- К **нативным элементам ввода формы** относятся **`input`** с **любым** `type` (в т.ч. **`checkbox`** и **`radio`**), а также **`select`** и **`textarea`**. Группы — **`fieldset` / `legend`**, когда уместно; **`aria-invalid` / `aria-describedby`** — единообразно.
- **`label`** над **`.form-control`** (**`input`/`select`/`textarea`**) — класс **`.form-label`** (**`@apply`** в **`_components.scss`**). **`label`** рядом с **`.form-check-input`** — **`.form-check-label`**. В своих шаблонах не копировать длинные утилиты на **`label`**, если бриф не исключает паттерн.
- **`.form-control`** — **только** для **текстоподобных `input`**, **`select`**, **`textarea`**. **`checkbox`/`radio`** — **`.form-check-input`** в том же файле; для чекбокса при **`items-start`** — **`mt-1`** рядом с инпутом.
- **Ошибка:** **`.form-control[aria-invalid="true"]`** и **`.form-check-input[aria-invalid="true"]`** только через **`aria-invalid="true"`**, без отдельных красных border/утилит на каждый файл.
- **Проверка:** **`form-label`** / **`form-check-label`**; текстовые поля — **`form-control`** и при необходимости **`aria-invalid`**; **`form-check-input`** без **`form-control`**, при ошибке **`aria-invalid`**.

## Контентный пояс

- Основной контент страницы с общей шириной колонки — обёртка **`.container`** (`app/scss/_components.scss`: **`max-w-5xl`**, **`px-4`**, **`mx-auto`**). Встроенную утилиту Tailwind **`container`** отключили (`corePlugins.container: false`), чтобы не дублировать имя с этим классом.
- Корневой layout оборачивает **`{% block content %}`** в **`.container`** (`app/njk-layouts/_main.njk`); внутренним страницам не дублировать второй такой пояс без дизайн-причины.

## Как дополнять

- Правки **`.btn-*`**, **`.form-label`**, **`.form-check-label`**, **`.form-control`**, **`.form-check-input`** — только **`_components.scss`**, затем Nunjucks; не плодить разные связки утилит в шаблонах.
- **Сторонние компоненты:** если Flowbite или чужая разметка требует сырых утилит — одна строка исключения в отчёте по задаче; для своих контролов — паттерн по умолчанию.
