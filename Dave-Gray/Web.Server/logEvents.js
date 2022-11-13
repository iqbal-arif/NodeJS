// Acquire the Date Fumction NPM
const {format} = require ('date-fns');

// Acquire the User Unique ID NPM
const {v4 : uuid} = require('uuid');

//Importing the NODEJS Core Modules
const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path');


//Logging Event

const logEvents = async (message, logName) =>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    // \n is for the line break ; \t is for space
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;  
    console.log(logItem);
    try{
        //Checking if the directory is available or not; then create one.
        if (!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,"logs", logName), logItem);
    } catch (err){
        console.error(err);
    }
}

module.exports = logEvents;
/*
//Logging Date
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

//Loging UUID
console.log(uuid())
console.log("Program has Started")
*/

    
