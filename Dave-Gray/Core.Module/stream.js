// For pulling data in portions not at once.

const fs = require('fs');
//Reading Data
const rs = fs.createReadStream('lorem.txt', {encoding: 'utf8'});
//Writing Data to File
const ws = fs.createWriteStream('new-lorem.txt');

//Function to Read and Write Data to a file
//Method I
/*rs.on('data', (dataChunk) =>{
    ws.write(dataChunk)
})*/

//Method II
rs.pipe(ws);
