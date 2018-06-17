# DHIS2 Datastore App
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdhis2%2Fdatastore-app.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdhis2%2Fdatastore-app?ref=badge_shield)

A DHIS2 app for managing and editing keys and namespaces in the datastore.

# Installation
 Unzip, cd to directory then:
``` ssh 
yarn install
yarn start 
 ```
Build: 
``` ssh 
yarn run build
``` 


Test:
``` ssh 
yarn run test
``` 

## Config
 The app should use the current D2 instance API, but in dev you can configure
 the API-endpoint in `/webapp/js/constants/apiUrl.js`
 
 
## Upload to DHIS2
 Build the app. Zip contents in /build/. Note that you cannot zip the /build folder directly. 
 Manifest needs to be in root of the archive.
 Upload the archive to DHIS2 using the App Management app.


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdhis2%2Fdatastore-app.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdhis2%2Fdatastore-app?ref=badge_large)