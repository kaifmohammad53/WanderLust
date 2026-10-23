const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");
main()
.then(()=>{
   console.log("database connection successful"); 
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};

const initDB=async()=>{
    await listing.deleteMany({});
    const data = initData.data.map((obj) => ({
       ...obj,
       image: obj.image.url,
    }));
    await listing.insertMany(data);
    console.log("data was initialized");   
}
initDB();