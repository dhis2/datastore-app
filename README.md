# DHIS2 Datastore App
Project related to course INF5750.

#Installation
 Unzip, cd to directory then:
``` ssh 
npm install
npm start 
 ```
Build: 
``` ssh 
npm run build
``` 


Test:
``` ssh 
npm run test
``` 

##Config
 The app should use the current D2 instance API, but in dev you can configure
 the API-endpoint in `/webapp/js/constants/apiUrl.js`
 
 
##Upload to DHIS2
 Build the app. Zip contents in /build/. Note that you cannot zip the /build folder directly. 
 Manifest needs to be in root of the archive.
 Upload the archive to DHIS2 using the App Management app.