- Visitors can leave feedbacks with their location
- A pin will be addes to the map with the user's current location, name and message.

Inspired by:
* [Build a Maps App with Leaflet - React/Node.js/Express/MongoDB](https://www.youtube.com/watch?v=J7pFiXh-ydA&t=16s)
* [Using Leaflet in React apps: React Hooks](https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/)

## DONE

- [x] create-react-app
- [x] install react-leaflet & leaflet ( needed to add style-link to the head of index.html || import 'leaflet/dist/leaflet.css' && set custom markers)
- [x] get a map on the page
- [x] get a user location
  - [x] with the browser
  - [x] with the IP (https://ipgeolocation.io/ Free IP Geolocation API and GeoIP Lookup Database)
  - [x] with the place's display_name from latlng ( Nominatium reverse API https://nominatim.openstreetmap.org/reverse?)
- [x] show a big red pin at the user's location
  - [x] Users can drag their markers to change the location
- [x] show a form to submit a message with place's address/display_name
  - [x] validation:
    - [x] validate inputs on change with error messages
    - [x] if user's location is set and all inputs are valid enable the submit button
  - when form submitted - POST /message
- [x] setup server with create-express-api 
- [x] add 'monk' and 'joi'
- [x] POST /messages
  - latitude
  - longitude
  - name
  - message
  - date/time
- [x] when the page loads get all messages
- [x] add blue pins to the map
- [x] onClick pin show a message

- [x] when message is successfully submitted get all messages and set initial map view
- [x] if error in fetching messages or form submitting show error snackbar
- [x] if error in fetching user's location don't show form in the messageCard, instead show error msg with close button

## TODO

- [] i18n(en, ua, pl)
- [] Login
- [] Users have their own guest map with their own markers and unique url

\*\* Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. https://www.npmjs.com/package/dotenv

\*\* Morgan - HTTP request logger middleware for node.js https://github.com/expressjs/morgan

\*\* @hapi/joi - Object schema description language and validator for JavaScript objects https://github.com/hapijs/joi

\*\* Helmet - Help secure Express apps with various HTTP headers https://helmetjs.github.io/

\*\* Cors - Node.js CORS middleware https://github.com/expressjs/cors

\*\* Monk - 'A tiny layer that provides simple yet substantial usability improvements for MongoDB usage within Node.JS'
