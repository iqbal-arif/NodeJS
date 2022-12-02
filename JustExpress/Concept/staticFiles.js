const express = require('express');
const app = express();

// EXPRESS APP has USE METHOD. Normally use to invoke Middleware
// It takes one argument and that is the MIDDLEWARE

app.use(express.static("public"))










const PORT = 3002;
// Listen to Port
app.listen(PORT);
console.log(`The server is listening on port ${PORT}`);