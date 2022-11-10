//Difference between NodeJS & JavaScript

//1. Node runs on a server -  not in a browser
//2. The console. is the terminal window
console.log("Hello")
//3. global object instead of window object
//console.log(global)
// 4. Has common core modules 
// 5. Common JS modules instead of ES modules
// 6. Missing some JS APIs like fetch

//Common Core Module
const os = require("os");
const path =  require("path")
const math = require('./math') //to acqurie math funtions in this file

//acquring as destruction the module like this
const {multiply} =require("./math")
//can add all the module in destruction as follows (you could write all in the same)
const {subtract,divide} = require("./math")

//acquiring second set of modules
const {addTwo,subtractTwo,multiplyTwo,divideTwo} = require('./math2')

console.log(math.add(2,3))
console.log(multiply(2,3))
console.log(subtract(2,3))
console.log(divide(2,3))

console.log(addTwo(5,3))
console.log(multiplyTwo(5,3))
console.log(subtractTwo(5,3))
console.log(divideTwo(5,3))

console.log(os.type())
console.log(os.version())
console.log(os.homedir())
//directory name
console.log(__dirname)
//filename
console.log(__filename)

//using path to get directory name and filename with path
console.log(path.dirname(__filename))
console.log(path.basename(__filename)) // exact filename
console.log(path.extname(__filename)) // file extention name
//parsing the path will give a full path with file detials
console.log(path.parse(__filename))