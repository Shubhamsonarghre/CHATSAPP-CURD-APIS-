const express=require("express");
const app=express();
const port=8080;
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().
then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
});

// Add new
app.get("/chats/new",(req,res)=>{
    
    res.render("new.ejs");
});
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;

    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        Created_at:new Date()
    });
    newChat.save().then((res)=>{
        console.log("chat was saves");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async(req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
//update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body; 
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
});
//app delete

app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})
app.listen(port,()=>{
    console.log(`Server is listing port ${port}`);
});