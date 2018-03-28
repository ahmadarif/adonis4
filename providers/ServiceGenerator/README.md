# Service Generator
Create service using command

# Installation
* Copy `ServiceGenerator` folder to `YOUR_PROJECT/providers`
* Register in `start/app.js`
  ```js
  const Helpers = use('Helpers')
  
  const aceProviders = [
    Helpers.appRoot('providers/ServiceGenerator/providers/ServiceGeneratorProvider')
  ]
  ```

# Usage
* Generate service
  ```
  adonis make:service auth
  ```
  This command will generate `app/Services/AuthService.js`

* Usage in controller or other file
  ```js
  const AuthService = use('App/Service/AuthService')
  await AuthService.someFunction()
  ```