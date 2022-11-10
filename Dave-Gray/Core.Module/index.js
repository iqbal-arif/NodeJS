const fs = require ('fs');
//Since the directory path can be an issue, such as it can be forward slash / or backward slash \, so we shall use path module
const path = require ('path');
//now the file read fuction be the following
//fs.readFile(path.join(__dirname, "files",'starter.txt'))
// instead of fs.readFile('starter.txt',

//****READING DATA*****/
/*
1. Method 1 : Reading file
fs.readFile( 'strater.txt',utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});*/

//2. Method 2 : Reading file code shorter form

// Another way of writing the above code
/*fs.readFile('starter.txt','utf-8',(err,data) =>{
  if (err) throw(err);
  console.log(data);
})*/

//3. Method 3 : Reading file through PATH MODULE
// We have skip 'files' directory name as everything is in the same folder
fs.readFile(path.join(__dirname,'starter.txt'),'utf-8',(err,data) =>{
  if (err) throw(err);
  console.log(data);
})

//exit on uncaught errors
process.on("uncaughtException", err=>{
  console.error(`There was an uncaught error : ${err}`);
  process.exit(1);
})

//****WRITING DATA*****/

fs.writeFile(path.join(__dirname,'reply.txt'), 'Nice to meet you.',(err) =>{
  if (err) throw(err);
  console.log("Write Complete");
})

//****APPEND DATA*****/

fs.appendFile(path.join(__dirname,'test.txt'), 'Testing append text.',(err) =>{
  if (err) throw(err);
  console.log("Append Complete");
})


//****MODIFYING DATA*****/

fs.writeFile(path.join(__dirname,'reply.txt'), 'Nice to meet you.',(err) =>{
  if (err) throw(err);
  console.log("Write Complete");

  fs.appendFile(path.join(__dirname,'reply.txt'), '\n\n Yes it is modified',(err) =>{
    if (err) throw(err);
    console.log("Append Complete");
  })
})
//****MODIFYING DATA AND RENAMING FILE*****/

fs.writeFile(path.join(__dirname,'reply.txt'), 'Nice to meet you.',(err) =>{
  if (err) throw(err);
  console.log("Write Complete");
  //Appending file
  fs.appendFile(path.join(__dirname,'reply.txt'), '\n\n Yes it is modified',(err) =>{
    if (err) throw(err);
    console.log("Append Complete");
    // Renaiming file
    fs.rename(path.join(__dirname,'reply.txt'), path.join(__dirname,'newreply.txt'),(err) =>{
      if (err) throw(err);
      console.log("Rename Complete");
    })
  })
})
