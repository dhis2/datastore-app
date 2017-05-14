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
 Edit app to use your DHIS2- instance.
 API-URL is in `/webapp/js/constands/apiUrl.js`
 
 
##Upload to DHIS2
 Build the app. Zip contents in /build/. Note that you cannot zip the /build folder directly. 
 Manifest needs to be in root of the archive.
 Upload the archive to DHIS2 using the App Management app.