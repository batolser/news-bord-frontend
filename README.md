# Инфраструктура и вёрстка для проекта News Bord

## О проекте

Проект по созданию инфраструктуры и вёрстки для сервиса "News Bord".

Сборка проекта с помощью webpack и библиотеки пакетов NPM.
В работе используется программа-сборщик Webpack и библиотека пакетов NPM для сборки кода проекта и публикации на сервере gh-pages.

Верстка двух страниц сервиса - "Главная" и "Сохраненные статьи".

[Ссылка на проект](https://batolser.github.io/news-bord-frontend/)

Version 1.0.3

##  ПО для выполнения работы:
<li>
Git
<li>
Node.js
<li>
Webpack
<li>
NPM-пакеты:
- #### сборка develop
@babel/cli @babel/core @babel/preset-env autoprefixer babel-loader cross-env css-loader cssnano file-loader gh-pages html-loader html-webpack-plugin@3.2.0 image-webpack-loader lodash mini-css-extract-plugin postcss-loader resolve-url resolve-url-loader style-loader url-loader webpack webpack-cli webpack-dev-server webpack-md5-hash
- #### сборка build:
babel-polyfill core-js optimize-css-assets-webpack-plugin resolve-cwd
- #### deploy проекта:
###### установка gh-pages, задача этой программы для выкладывать в ваш репозиторий на Github в ветку gh-pages, собранные файлы:
npm install gh-pages --save-dev
###### сборка и размещение проекта в интернете:
npm run deploy

### Инструкция по сборке:
<li>
точка входа: index.js
<li>
команда npm run build запускает сборку build и собирает проект в папке dist
<li>
команда npm run dev запускает сборку develop и открывает проект на локальном сервере по адресу localhost:8080
<li>
команда npm run deploy разворачивает проект на сервере gh-pages

### Результат проектной работы:
<li>
Сверстаны две страницы сервиса - "Главная" и "Сохраненные статьи".
<li>
Верстка разбита на блоки по принципам организации файловой структуры БЭМ-проекта.
<li>
Webpack и NPM использован для сборки кода
<li>
CSS-код минимизирован, JS-код переведен бабелем из ES6 в ES5, оптимизированы картинки и шрифты
<li>
Проект опубликован на хостинге gh-pages

## Просмотреть итоговый проект можно двумя способами:

1. На GitHub Environment - View deployment
2. Разместив файлы из ветки gh-pages у себя на сервере
