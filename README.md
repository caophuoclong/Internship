# Test Internship

## Introduction

1. Login form
   - ![Login-form](./assets/login_form.png)
   - Login you have to give it a second to wakeup server api
2. After login you will see a dial pad and nav bar
   - Nav bar
     - ![nav-bar](./assets/nav-bar.png)
     - If hover on keyboard it will show a two options call you must type a number call or SIP uri to call
       - ![sip-uri-&-dial-pad](./assets/sd.png)
       - Dial pad
         - ![dial-pad](./assets/dial-pad.png)
       - SIP uri
         - ![sip-uri](./assets/sip-uri.png)
   - Dial pad
   - ![dial-pad] (./assets/dial-pad.png)
3. After click on button call it will show call interface
   - Call interface
     - ![call-interface](./assets/call-interface.png)

## USage

- In home directory run: "npm install" to install some package requirement for server
- In client directory run: "npm install" to install some package requirement for client
- Run command **npm run dev** to start server and client side
- To test this app but don't need run in local you can access this link [click me to access](https://keen-jennings-4487b7.netlify.app/) **id**: 109 & **password**: test1109

## FrontEnd code with React js

### Feature:

- Make a call by phone number
- Make a call by SIP uri

  - Sip status
    - Progress: Connect and ringing status
    - Failed: Connect fail with some status description
      - Wrong number
      - Busy
      - Cancelled
    - Confirmed: Access accepted
    - Ended: End of call session
      - Terminated

## BackEnd code with Nodejs

## Database MongoDB
