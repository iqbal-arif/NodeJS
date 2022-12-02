1.  Initialize NODE: npm init
2.  Install EXPRESS: npm i express --save
3.  Middleware: Difference between app.use and app.all
    A. app.use will check if the path provided (if there is one) matches the beginning of the current URL. It does NOT have to match whole thing.

    For example:

        app.use('/user',(req, res, next)=>{
            res.send("Hit!")
        });

    Will trigger at "/user" also at "/user/rob" but NOT at "/rob"

    app.all will only match the path given exactly.

        app.all('/user',(req, res, next)=>{
            res.send("Hit!")
        });

    Will trigger at "/user" but NOT at "/user/rob" or at "/rob"

    B. app.use can only take a single callback. i.e.:

        app.use('/user',validateUser, getFile, checkLog, (req, res, next)=>{
            res.send("Hit!")
        });

    validateUser is the only thing that will ever get called (getFile, checkLog, and the last one will be ignored), so in this example you wouldn't get the res.send().

    app.all can take multiple callbacks:

        app.all('/user',validateUser, getFile, checkLog, (req, res, next)=>{
            res.send("Hit!")
        });

    All of these pieces of middleware would run.

    Ultimately, Express is made so that app.all (along with app.get, app.post, etc.) is running a route. That's why it expects an exact match and any number of potential callbacks. app.use is meant to add application level middleware, so it's matching rules are wider, and it only takes one callback because you "shouldn't" package two separate pieces of app level middleware together; either merge them or make them separate.

4.  Install helmet: sudo npm install helmet --save
5.  Install utility module express-generator : sudo npm install express-generator -g
6.  Create new app with express-generator : express myNewExpressSite
    This will create the following directories
    create : myNewExpressSite\
    create : myNewExpressSite\public\
    create : myNewExpressSite\public\javascripts\
    create : myNewExpressSite\public\images\
    create : myNewExpressSite\public\stylesheets\
    create : myNewExpressSite\public\stylesheets\style.css
    create : myNewExpressSite\routes\
    create : myNewExpressSite\routes\index.js
    create : myNewExpressSite\routes\users.js
    create : myNewExpressSite\views\
    create : myNewExpressSite\views\error.jade
    create : myNewExpressSite\views\index.jade
    create : myNewExpressSite\views\layout.jade
    create : myNewExpressSite\app.js
    create : myNewExpressSite\package.json
    create : myNewExpressSite\bin\
    create : myNewExpressSite\bin\www

change directory: > cd myNewExpressSite

install dependencies: > npm install

run the app: > SET DEBUG=mynewexpresssite:\* & npm start

PS C:\Users\NCFAdmin\Documents\JustExpress>

7.  At the prompt : npm install
8.  Two install express-generator with ejs : express myEjsSite --view=ejs

\***\*\*\*\*\*\*\*** NodeJS Express **\*\***\*\***\*\***

1.  Networking - http and tcp/udp
    1.1. stateless
    1.2. connectionless
    1.3. flexible
2.  HTTP message
    2.1. Start line
    2.2. req: METHOD (GET) PATH (/blog) http/1.1
    2.3. res: http/1.1 statusCode (200) OK
3.  HTTP Headers
    3.1. {key:values}
    3.2. content-type: text/html
    3.3. content-type: application/json
    3.4. cache-control: public, max-age=0
    3.5. Date: Fri, 24, Aug 2022 19:23:52 GMT
    3.6. Blank Line
    3.7. Body
    3.8. HTML , 4K video (binary), image
4.  \***\*\*\*\*\*** NODE SERVER \***\*\*\*\*\*\***
    4.1. write headers
    4.2. write body
    4.3. used the fs module
    4.4. close connection
    4.5. server.listen
    4.6. 3002
    4.7. req, res
5.  **\*\***\***\*\*** EXPRESS **\*\*\*\***\***\*\*\*\***
    5.1. Express is node js
    5.2. app === express() ====== createApplication()
    5.3. server.listen ====> app.listen
    5.4. router
    5.5. app.get, app.post, app.all, etc.
    5.6. served up static files with express.static() middleware
6.  **\*\***\***\*\*** MIDDLEWARE **\*\***\*\***\*\***
    6.1. Middleware === any function that has access to REQ, RES, and NEXT
    6.2. Networking on the outside, NODE/EXPRESS development on the inside.
    6.3. app.use === anytime there is a callback/function (req,res,next) =>
    6.4. next() === is the a way to move a piece of middleware forward
    6.5. express.json() === body parser
    6.6. express.urlencoded === body parser
    6.7. helmet() === 3rd party module for protect attacker to modify header
7.  **\*\***\***\*\*** REQUEST Object **\*\***\*\*\***\*\***
    7.1. req.ip === contains requesters IP
    7.2. req.path === contains the requested path
    7.3. req.body === parse data
8.  **\*\***\***\*\*** RESPONSE Object **\*\***\*\*\***\*\***
    8.1. res.send (.end()) - send text/html
    8.2. res.sendFile - send a file
    8.3. res.locals - use in rendering templates
    8.4. res.json (jsonp) - sends json back as application/json
9.  **\*\*\*\***\*\***\*\*\*\*** RENDER **\*\*\*\***\***\*\*\*\***
    9.1. Define a VIEW ENGINE. (EJS, MUSTACHE, HANDLEBARS, JADE/PUG)
    9.2. ROUTES have res.render
    9.3. res.render takes two values
    9.3.1. File that will be used
    9.3.2. Data that will be sent to the file.
    9.4. Express uses the node module for specified view engine and parse the file.
    9.5. The final product is in the form of HTML,JS, CSS processed by engine and node.
    9.6. app.set() used to set the behavior of the node server.
10. **\*\*\*\***\*\***\*\*\*\*** ROUTER **\*\*\*\***\***\*\*\*\***
    10.1. router.js
    10.2. routerApp.js
    10.3. userRouter.js
11. **\*\*\*\***\*\***\*\*\*\*** ROUTER **\*\*\*\***\***\*\*\*\***
    11.1. res.json
    res.render
    res.send
    res.sendFile
    res.download
    res.redirect

         Using any of the above response does not send
         a. webpage
         b. json
         c. file, etc

    it sends HTTP Message (Start line, headers, straight line, & body)
