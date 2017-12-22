## Description
<div align="center">
    <a href="https://travis-ci.org/">
        <img src="http://res.cloudinary.com/adonisjs/image/upload/q_100/v1497112678/adonis-purple_pzkmzt.svg" width="200px" align="center" hspace="30px" vspace="140px">
    </a>
</div>
<br />
<div align="center">
    [![Build Status](https://travis-ci.org/ahmadarif/adonis4.svg?branch=master)](https://travis-ci.org/ahmadarif/adonis4)
</div>

Simple project Adonis 4.0

## Requirements
- [NodeJS](https://nodejs.org/) 8.0 or greater
- [NPM](https://www.npmjs.com/) 3.0 or greater
- AdonisJS 4.0 (`npm i -g @adonisjs/cli`)

## Installations
- Clone this project
- Goto root folder and install dependency using command `npm install`
- Copy `.env.example` to `.env`
- Set your own configuration variable
- Generate random secret key using command `adonis key:generate`
- Start server development using command `adonis serve --dev` (development) or `node server.js` (production)
- Start Queue using command `adonis kue:listen`
- Start Scheduler using command `adonis run:scheduler`

## Development
- Create new Redis listener `adonis make:listener ListenerName`
- Create new Scheduler `adonis make:task SchedulerName`
- Other Adonis help `adonis --help`

## Links
- [Postman Project](https://www.getpostman.com/collections/70ec70ac2fd041098439)
- [Postman Environment Example](Adonis4.postman_environment.json)
- [Social Auth Configuration](SocialAuthConfig.md)

## Notes
- Manage your NodeJS & NPM version, please use NVM (Node Version Manager) like [n](https://github.com/tj/n) or [nvm-windows](https://github.com/coreybutler/nvm-windows) for simplicity.