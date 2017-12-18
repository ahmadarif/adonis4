'use strict'

/*
|--------------------------------------------------------------------------
| Services Configuration
|--------------------------------------------------------------------------
|
| This is general purpose file to define configuration for multiple services.
| The below config is for the ally provider. Make sure to save it inside
| config/services.js file.
|
| Happy Coding :)
|
*/

const Env = use('Env')

module.exports = {
  ally: {
    /*
    |--------------------------------------------------------------------------
    | Google Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the google developers
    | console. https://console.developers.google.com
    |
    */
    google: {
      clientId: Env.get('GOOGLE_CLIENT_ID'),
      clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: Env.get('GOOGLE_REDIRECT_URI')
    },

    /*
    |--------------------------------------------------------------------------
    | Github Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the github developers
    | console. https://github.com/settings/developers
    |
    */
    github: {
      clientId: Env.get('GITHUB_CLIENT_ID'),
      clientSecret: Env.get('GITHUB_CLIENT_SECRET'),
      redirectUri: Env.get('GITHUB_REDIRECT_URI')
    },

    /*
     |--------------------------------------------------------------------------
     | LinkedIn Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the LinkedIn developers
     | console. https://developer.linkedin.com/
     |
     */
    linkedin: {
      clientId: Env.get('LINKEDIN_CLIENT_ID'),
      clientSecret: Env.get('LINKEDIN_CLIENT_SECRET'),
      redirectUri: Env.get('LINKEDIN_REDIRECT_URI')
    },

    /*
     |--------------------------------------------------------------------------
     | Twitter Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the Twitter developers
     | console. https://apps.twitter.com/
     |
     */
    twitter: {
      clientId: Env.get('TWITTER_CLIENT_ID'),
      clientSecret: Env.get('TWITTER_CLIENT_SECRET'),
      redirectUri: Env.get('TWITTER_REDIRECT_URI')
    },

    /*
     |--------------------------------------------------------------------------
     | Foursquare Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the Foursquare developers
     | console. https://developer.foursquare.com/
     |
     */
    foursquare: {
      clientId: Env.get('FOURSQUARE_CLIENT_ID'),
      clientSecret: Env.get('FOURSQUARE_CLIENT_SECRET'),
      redirectUri: Env.get('FOURSQUARE_REDIRECT_URI')
    }
  }
}
