

const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () =>{
    try{
        //Reading File
        const data = await fsPromises.readFile(path.join(__dirname,'starter.txt'),'utf-8');
        console.log(data);
        //Deleting File
        await fsPromises.unlink(path.join(__dirname,'starter.txt'))
        //Writing File
        await fsPromises.writeFile(path.join(__dirname,'promiseWrite.txt'),data)
        //Appending/Modifying File
        await fsPromises.appendFile(path.join(__dirname,'promiseWrite.txt'), '\n\nNice to meet you.');
        //Renaiming File
        await fsPromises.rename(path.join(__dirname,'promiseWrite.txt'), path.join(__dirname,'promiseComplete.txt'));
        //Reading New Created File
        const newData = await fsPromises.readFile(path.join(__dirname,'promiseComplete.txt'),'utf-8');
        console.log(newData);
    } catch (err){
        console.error(err);
    }
}

fileOps();