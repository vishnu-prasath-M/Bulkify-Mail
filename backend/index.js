const express = require("express")
const cors = require("cors")
const nodemailer =require("nodemailer")
const mongoose=require("mongoose")

const app =express()

// Middlewares
app.use(cors())
app.use (express.json())


mongoose.connect("mongodb+srv://prasath:8925@cluster0.ngrgl.mongodb.net/mails?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("connected to DB")
}).catch(function(){
    console.log("Failed to connect")
})


const credential = mongoose.model("credential",{},"datas")

app.post("/sendmail",function(req,res)
{   
    var msg=req.body.msg
    var emailList =req.body.emailList
    
    credential.find().then(function(data){
        const transporter =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:data[0].toJSON().user,
                pass:data[0].toJSON().pass,
            },
    
        });


        new Promise(async function(resolve,reject){
            try{
                for(var i=0;i<emailList.length;i++)
                    {
                       await transporter.sendMail(
                            {
                                from:"prasathhari713@gmail.com",
                                to:emailList[i],
                                subject:"A message from Bulkify Mail",
                                text:msg
                            },
                        
                        )
                
                    }
        
                    resolve("success")
            }
            
            catch(error)
            {
                reject("failed")
            }
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })

    }).catch(function(error){
        console.log(error)
    })
   
    
  
})


app.listen(5000,function(){
    console.log("Server started...")
})