# zoom-api-integration-nodejs

A basic and moderately structured test of zoom api to manage meetings

## Motivation

This project has as purpose showing how we can use ZOOM API to integrate it with our app from back-end point of view using nodejs. Since the official documentation wasn't enough clear to me when I tried to implement the API along with the SDK, this might be a useful if you just want to implement meetings.

## Important

You have to update the file `scr/config.js` with your keys from zoom. Please follor its own docs to create your JWT app https://marketplace.zoom.us/docs/guides

this section will provide you the keys:
![image](https://user-images.githubusercontent.com/8931070/108663238-16bbe700-749e-11eb-9b2a-87860af66177.png)

here you can set your web-hooks/subscriptions:
![image](https://user-images.githubusercontent.com/8931070/108663381-6e5a5280-749e-11eb-8f89-81e1c2a5f1b2.png)
Please pay attention on details. This is related to `src/routes/zoomIntegrationRoutes.js`

### **_Setup_**

<ol>
<li>yarn install</li>
<li>yarn start</li>
</ol>

## Caveats

To run this project successfuly you will need a mongoDB instance running, its URI have to be set on `src/config` as well. You can use either atlas or a local service of mongoDB. This is used just to log and take control over all the records we will be generating.

**_NOTE:_** _To create users and meetings that belong to them, you must have a paid zoom account or ask for a developer account from zoom support; if you don't have any of them, you will only be able to create meetings for your zoom user_

### Last but not least

This is a complement of other front-end repos I will add to show how to integrate this with the frameworks in the list bellow:

- React Zoom SDK example (pending)
- Vue Zoom SDK example (pending)
- Angular Zoom SDK example (pending)
- Svelte Zoom SDK example (pending)
