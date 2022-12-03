1. Install node with ejs env. : express movieFan --view=ejs
2. Go to movieFan folder : npm install
3. Start the server : nodemon
4. Install helmet: npm install helmet --save
5. Install http request module : npm install request --save

**\*\*\*\***\***\*\*\*\*** NOTES **\*\*\*\***\***\*\*\*\***

1. INDEX.JS NOTES
   Request.GET takes 2 arg.
   1.1. It takes the URL to HTTP "get".
   1.2. the callback to run when the http response is back. 3 args:
   1.2.1. error (if any).
   1.2.2. http response.
   1.2.3. json/data the server sent back
2. Parsing Data into Object format
   const parsedData = JSON.parse(movieData);
3. Allowing url available in all the files through middleware
   router.use((req, res, next) => {
   res.locals.imageBaseUrl = imageBaseUrl;
   });
