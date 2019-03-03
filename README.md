# Markdown Links

## Introducción

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

MD-LINKS es una herramienta que usando [Node.js](https://nodejs.org/), lee y analiza archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Instalación

Para la instalación del módulo se debe posicionar en la carpeta de su proyecto y escribir en la terminal la siguiente linea de código:

- De manera local:
```js
npm install --save https://github.com/Milexys/SCL007-md-links
```
-  De manera global:
```js
npm install --save https://github.com/Milexys/SCL007-md-links -g
```
## ¿Cómo se utiliza?

Luego de instalar el módulo este mismo funciona mendiante una función principal con un parámetro (**URLpath**)
```js
mdlinks(Urlpath);
```

