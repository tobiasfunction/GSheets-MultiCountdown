# GS Hour Pass Tracker

> This program was first created in 2018. I was a new, self-taught coder, trying to solve a practical problem that was outside the scope of anything else I'd done at the time. Is not representative of my current skill level.

Customer tracking web app for use at a small arcade that sold hourly passes. It uses Google Sheets as a database to integrate with existing documents and projects the business was using at the time.

Example implementation is available [here](https://script.google.com/macros/s/AKfycbwDfjo8fe8KP7MT2Smd4yRyptQnrqqta4_gSbvGTy3lqlqRsYx1/exec). Be aware that entries will be visible to other people using the app on the same day.


## Features

- Syncs with the database every 10 seconds.
- Entry name, description and time can be edited.
- Webhook alerts on new entry, edits, and time up. (Disabled on example implementation)
- Hide/unhide entries.
- Input is limited to hours (negative numbers and decimals permitted).
- A new table is created for each day, creating an archive of previous days' entries.


## Libraries

- [ArrayLib](https://sites.google.com/site/scriptsexamples/custom-methods/2d-arrays-library) V.13: `MOHgh9lncF2UxY-NXF58v3eVJ5jnXUK_T`