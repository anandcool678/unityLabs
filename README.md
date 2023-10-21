# unityLabs
## Steps to set-up
1. Clone the Repository using ``` git clone https://github.com/anandcool678/unityLabs ```.
2. In your local system, open terminal at that location and run ``` npm i ```.
3. Add .env file inside the folder along with other files using below structure.
    ```
    PORT=5000
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<SecretString you want to have>
    JWT_EXPIRES_IN=7d
    JWT_COOKIE_EXPIRE=7d

    ```
4. Run ``` npm start ```
5. You are ready to use this now. Just add API's alike the User folder inside API folder and connect route at server.js .
