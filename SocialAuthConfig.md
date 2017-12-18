# Google
- Generate a Client ID and Client Secret in a Google project
    - Log in to your Google account and go to the [APIs & services](https://console.developers.google.com/projectselector/apis/credentials).
    - Navigate to `Credentials` using the left-hand menu.
    - On the `Credentials` page, click `Create credentials` and choose `OAuth client ID`.
    - On the `Create client id` page, select `Web application`. In the new fields that display, set the following parameters.
    - Your `Client Id` and `Client Secret` will be displayed.
- Enable the Google Admin SDK Service
    - Navigate to the `Library` page of the [API Manager](https://console.developers.google.com/apis/dashboard).
    - Select/Search `Admin SDK` from the list of APIs.
    - On the `Admin SDK` page, click `Enable`.
- Enable the `Google+ API` Service
    - Navigate to the `Library` page of the [API Manager](https://console.developers.google.com/apis/dashboard).
    - Select/Search `Google+ API` from the list of APIs.
    - On the `Google+ API` page, click `Enable`.
- Copy your Client ID, Client Secret keys and Redirect/Callback URL into your `.env` configuration


# Github
- Log in to your Github account and go to the [Profile](https://github.com/settings/profile).
- Navigate to [Developer settings](https://github.com/settings/developers).
- Click `New OAuth App`. In the new fields that display, set the following parameters.
- Copy your Client ID, Client Secret keys and Redirect/Callback URL into your `.env` configuration


# LinkedIn
- Log in to your LinkedIn account and go to the [LinkedIn Developer Network](https://developer.linkedin.com/).
- Navigate to [My Apps](https://www.linkedin.com/developer/apps), then click `Add New Application` button.
- Fill out all the required fields, and then save.
- Navigate to `Authentication`, checklist the required permission (basic profile, email, etc).
- Fill out the field `Redirect URL Authorized`, then click `save` button.
- Copy your Client ID, Client Secret keys and Redirect/Callback URL into your `.env` configuration


# Twitter
- Sign in at https://apps.twitter.com/.
- Click `Create New App` button.
- Fill out all the required fields (Website & Callback URL, Privacy Policy URL, and Terms of Service URL), and then save.
- Go to `Permissions` tab, under Application Type select `Read and Write` access and checklist `Request email addresses from users`, and then save.
- Copy your Client ID, Client Secret keys and Redirect/Callback URL into your `.env` configuration.


# Foursquare
- Go to [Foursquare for Developers](https://developer.foursquare.com/).
- Click on `My Apps` in the top menu.
- Click the `Create A New App` button.
- Fill out all the required fields, click Save Changes.
- Copy your Client ID, Client Secret keys and Redirect/Callback URL into your `.env` configuration.