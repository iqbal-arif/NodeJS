const fs = require('fs');

//Writing a Directory Folder
if(!fs.existsSync('./new')){
fs.mkdir('./new', (err)=>{
    if (err) throw err;
    console.log('Directory Created')
});
}

//Deleting a Directory Folder
if(fs.existsSync('./new')){
fs.rmdir('./new', (err)=>{
    if (err) throw err;
    console.log('Directory Removed')
});
}