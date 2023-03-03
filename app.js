const express =require('express')
const bodyparser = require('body-parser')
const https = require('https')
const app = express()
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
app.post('/',function(req,res){
    const firstName = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const url = 'https://us21.api.mailchimp.com/3.0/lists/786c410a89';
    // const data = {
    //     members :{
    //         email_address : email,
    //         status : 'subscribed',
    //         merge_fields :{
    //             FNAME : firstName,
    //             LNAME : lastname,
    //         }

    //     }
    // }
   var data = {
     members:[ {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,  //if you change it in mailchimp change it here
         LNAME: lastname,
       }
     }]
       };
    var jsondata = JSON.stringify(data)
    const options = {
        method : 'POST',
        body: data,
        auth: "angela1:f386943dd8b4e9459773d9eee8ee1b93-us21"
        
    }
    const request = https.request(url,options,function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }else {
            res.sendFile(__dirname + '/failure.html')
        }
        response.on('data',function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsondata)
    request.end()

})

app.post('/success',function(req,res){
    res.redirect('/')
})

app.post('/failure',function(req,res){
    res.redirect('/')
})

app.listen(process.env.PORT || '3000',function(){
    console.log('Server running on port 3000.')
})










































// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");
 
// const app = express();
 
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));
 
// app.get("/", function(req, res){
//   res.sendFile(__dirname + "/signup.html");
// });
 
// app.post("/", function(req, res){
 
//    // Make sure you recieve the the data from your form correctly by console l
//    // logging the const values.
 
//   const firstName = req.body.fname;
//   const lastName = req.body.lname;
//   const email = req.body.email;
 
 
 
//    // This is crucial and make sure your keys match the ones in mail chimp
//    // To make sure go to to audiece dashboard, then settings and Audience fiel                            
//    // ds and *|MERGE|* tags.
 

 
//   var jsondata = JSON.stringify(data);
 
//   //Enter your list ID correcly else you will get errors like email cannot be                                          
//   //blank.
//    //replace us8 with your server eg us4 or us6
//   const url = 'https://us21.api.mailchimp.com/3.0/lists/786c410a89'
 
//   const options = {
//     method: "POST",
//     body: data,
//     auth: "angela1:f386943dd8b4e9459773d9eee8ee1b93-us21"
//   };
 
//   const request = https.request(url, options, function(response){
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     });
 
//   });
 
//   request.write(jsondata);
//   request.end();
 
 
// });
 
// app.listen('3000', function(){
//   console.log("You are now live");
// });











// // //API KEY
// // //e51c1ab22c68cd498174d5d069332b49-us21


// // //Unique Id
// // // 786c410a89




