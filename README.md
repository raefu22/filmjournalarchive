# Steps when iterating
git fetch
git commit -a
git push
npm run build
npm run deploy
in the index html file in dist folder, change file location to relative ./assets/###xx

# Steps to gh-pages
npm install gh-pages
Under "scripts" in your package.json: "deploy": gh-pages -d dist
npm run build
git init
git remote add origin "https://github.com/raefu22/filmjournalarchive.git"
git add .
git commit -m "commit"
git pull
git push
npm run deploy

reference: 
https://stackoverflow.com/questions/73016488/how-do-i-deploy-a-three-js-project-to-github-pages#:~:text=I%20found%20that%20using%20gh-pages%20is%20the%20easiest,for%20'deploy.'%20Like%20this%3A%20"deploy"%3A%20gh-pages%20-d%20dist

https://www.loom.com/share/1d9a06ec11f542e5861ef7e85e38e912

# Beginning Setup: Used Vite template builder to quickly generate Threejs code in the browser.

This repository will help creating 3D environment using [Threejs](https://threejs.org/examples/#webgl_animation_keyframes), a powerful WebGL library. It is powered by [Vite](https://vitejs.dev/guide/why.html) ⚡️ that quickly compiles anything you need, it is also including [Sass](https://sass-lang.com/guide), [Babel](https://babeljs.io/), [Eslint](https://eslint.org/), [Prettier](https://prettier.io/), [lil-gui](https://www.npmjs.com/package/lil-gui) and [GSAP](https://greensock.com/docs/) for animations.

It is also including a LoaderManager JS file to easily load your assets: (Image, Textures, 3D models...) in one function.

## How to install

Clone the repository or download it in zip format, then

### Open Terminial

Navigate to projects folder

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

### Build Project

To build for production

```bash
  npm run build
```

## How to Use

-   Use the 'src' folder for all project files.
    -   HTML
    -   JS
    -   SCSS
-   vite.config.js file sets up project input to 'src' folder.
-   Use eslintrc file to configure linting rules
-   Use prettierrc file to configure formatting rules

## Useful links
- [Threejs docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [GSAP docs](https://greensock.com/docs/)
- [Vite docs](https://vitejs.dev/config/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
