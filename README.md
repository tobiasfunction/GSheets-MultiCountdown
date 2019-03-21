# MultiCountdown
Synced multiple countdown timer webapp using Google Sheets. Initially implemented to keep track of hourly passes at an arcade.

* Syncs between browsers every 30 seconds.
* Entry name, description and time can be edited.
* Discord Webhook alerts on new entry, edits, and time up.
* Hide/unhide entries.
* Input is currently limited to hours (negative numbers and decimal fractions permitted).

I know that Sheets is far from the ideal database for something like this, but we were using GAS for other integrations and it made the most sense when the project started.

## Libraries
* [ArrayLib](https://sites.google.com/site/scriptsexamples/custom-methods/2d-arrays-library) V.13: `MOHgh9lncF2UxY-NXF58v3eVJ5jnXUK_T`

## Guides
* [Deploying a Script as a Web App](https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app) (Google Apps Script)
* [Intro to Webhooks](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks) (Discord)
