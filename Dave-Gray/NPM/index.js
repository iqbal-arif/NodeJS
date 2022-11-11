// Acquire the Date Fumction NPM
const {format} = require ('date-fns');

// Acquire the User Unique ID NPM
const {v4 : uuid} = require('uuid');

//Logging Date
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

//Loging UUID
console.log(uuid())
console.log("Program has Started")

