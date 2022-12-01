const express = require('express');

const app = express();

const helmet = require('helmet');

app.use(express.static("public"));
// express.json & express.urlencoded gives req.body object. without it is going to be undefined
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());


app.post("/ajax", (req,res) =>{

    console.log(req.body);
    res.json(["Test",1,2,3,4,5]);
})



app.listen(3002, () => {
    console.log('App listening on port 3002!');
});