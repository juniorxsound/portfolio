# Portfolio

[![Build Status](https://travis-ci.com/juniorxsound/portfolio.svg?token=ztzi6EexNpaHGeSp1q8W&branch=master)](https://travis-ci.com/juniorxsound/portfolio)

A minimalist portfolio built using React and Gatsby.

![Screenshot](https://i.imgur.com/mOOcWFd.png)

### Project template

Project pages are auto-generated from `.md` files placed in `/src/pages/projects/`.

```
---
path: "/my-project"
date: "2018-04-22T22:12:03.284Z"
title: "My Project"
tags: ["Futurisem", "Machine Learning", "Experiment"]
cover: "cover_image.png" // Auto pulled from /src/assets/images/headers/
embed: '<iframe width="100%" height="450" src="https://www.youtube.com/embed/OzndnZuvu2c?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
about: "‘Death-Mask’ predicts how long people have to live and overlays that in the form of a “clock” above they’re heads in augmented reality. The project uses a machine learning model titled AgeNet for the prediction process. Once predicted it uses the average life expectancy in that location to try and estimate how long one has left.
The aesthetic inspiration derives from the concept of death masks. These are sculptures meant to symbolize the death of a person by casting his face (i.e creating a mask)."
links: [['Documentation', 'http://itp.orfleisher.com/2017/11/17/where-is-the-line-with-public-data/']]
components: [['code', 'Swift'], ['software', 'Blender, CoreML, AgeNet'], ['3d', 'ARKit']]
credits: 'Developed with <a target="_blank" href="http://agermanidis.com">Anastasis Germanidis</a>'
press: [['Wired', 'https://www.wired.it/attualita/tech/2017/12/20/death-mask-realta-morte-previsione/'], ['UploadVR', 'https://uploadvr.com/arkit-death-mask/'], ['Next Reailty', 'https://next.reality.news/news/ar-experiment-adds-life-clock-anyone-with-face-0181330/'], ['VRInside', 'https://vrinside.jp/news/death-mask/'], ['Shiropen', 'https://shiropen.com/2017/11/29/29963'], ['Owdin','https://owdin.live/2017/11/24/death-mask-combien-dannees-de-vie-vous-reste-t-il-version-realite-augmentee/'], ['prosthetic knowledge', 'http://prostheticknowledge.tumblr.com/post/167809095736/death-mask-programming-project-from-or-fleisher'], ['Realite Virtuelle', 'https://www.realite-virtuelle.com/death-mask-age-mort-2911']]
excerpt: "Predict how long people have to live in augmented reality."
---
```

### Development commands

- `yarn run develop` - Run Gatsby in development mode
- `yarn run build` - Run Gatsby build static site
- `yarn run format` - Use prettier to format the code
- `yarn run deploy` - Format and deploy the code to `gh-pages` branch using Travis-CI
