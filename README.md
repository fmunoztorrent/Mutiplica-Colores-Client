# Colors API  

Cliente para listar colores desde una API.
[URL de API](https://reqres.in/api/colors/)

URL la PWA funcionando: https://multiplica-prueba-colores.web.app/

## Tooling
- NPM
- Firebase

## Framework usados
- Ionic 5 Framework
- Angular 9
- Sass

## Instalacion

Dentro de la carpeta que contiene **package.json**, debes seguir los siguientes pasos:

Para instalar las dependencias, debes tener instalado NPM o algún otro como Yarn.
```sh
npm install
```

Una vez instalado, para iniciar el entorno de desarrollo, debes ejecutar:
```sh
ionic serve
```

## Compilación producción
Para generar una PWA con el código de este repositorio debes tener instalado e CLI de Angular.
```sh
npm install -g @angular/cli@latest
```

Para la compilación ejecuta:
```sh
ng add @angular/pwa 
ionic build --prod
```

Se generará una carpeta **www** que es donde estará el codigo para hacer el despliegue. Esa carpeta es la que tiene la PWA.