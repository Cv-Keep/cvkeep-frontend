# CV Keep - Front End

This is the **CV Keep Front End** repository.    
You can access the production app here: https://cvkeep.com.

`Pt-BR`: Se vc deseja ler essa documentação em português [clique aqui](https://github.com/Cv-Keep/cvkeep-docs/blob/master/README-PTBR.md)

# What is it?

CV Keep is a `Free and Open Source Platform` intended to manage `Online Resumés`. Its free, pretty and simple. The idea is to deal with your resume as an online profile. Instead of send resume files, you send a resume link. Its perfect if you dont want to keep updating things when adding new information on your resume or dont want to deal with an entire social network. It offers a responsive, multi-device, quick and easy to maintain and update online resume.  

Once `Keep CV` is free and open source you can host your own plaform also (Since you dont use the same brand). This can be very useful if you have a business and need to store your own user profiles, or if you are a job agency that wants a clean and quick CV registration system, or if you need to store people resumes for any purpose, including comercial ones.

# Stack

CV Keep is written in a MEVN stack (Mongo, Express, Vue and Node), and is focused on simplicity. Since you properly configure your .env files, the App is production ready and already internationalized (`en` and `pt-br` by default).

# Quick Start

To quickly run this plaform locally, please perform the following steps:  
Obs: You need the `CV Keep Backend` running locally to have all working.

1. Clone this repository
2. Copy the `.env` file to `.env.local`  and configure it
2. Run `npm install` from root dir
3. Run `npm run serve`
4. Open `https://localhost:8080` on your browser (maybe you will see a SSL warn because you're local)

:warning: If you dont properly configure your `.env.local`, the steps above will run a non-configured plaform. We strongly recommend you to read the full documentation in order to properly configure your plaform, including `.env` files, frontend and backend.

# Documentation

For documentation about advanced usage, development and deployment, please [CLICK HERE](https://github.com/Cv-Keep/cvkeep-docs).
