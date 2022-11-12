//Importing Custom Module from logEvents file
const logEvents = require("./logEvents")

// Importing Events Core Module
const EventEmitter = require('events');

//Defining Event Class

class MyEmitter extends EventEmitter {};

//Initialze Object
const myEmitter = new MyEmitter();

// Add listener fro the log Event

myEmitter.on('log', (msg) => logEvents(msg));

// Setting Timeout for Event Message

setTimeout(() => {
    // Emit Event with message
   myEmitter.emit('log', 'log event emitted!' )
}, 2000);

setTimeout(() => {
    // Emit Event with message
   myEmitter.emit('log', 'log event emitted!' )
    myEmitter.emit( 'log','Another LOG Event emitted!' )
    myEmitter.emit('log','Third log event emitted!' )
}, 5000);

