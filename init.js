const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main().
then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats=[{
    from:"Ghamori",
    to:"jamu",
    msg:"send multiple book",
    Created_at:new Date()
}];

Chat.insertMany(allChats);