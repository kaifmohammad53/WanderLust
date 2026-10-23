const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
app.listen(8080,()=>{
    console.log("app is listening at port:8080");
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
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
app.get("/",(req,res)=>{
    res.send("root is working");
});

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new listing({
//         title:"my new villa",
//         description:"buy the beach",
//         price:1200,
//         location:"calngute goa",
//         country:"india",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.get("/listings",async(req,res)=>{
    const allListing = await listing.find({});
    res.render("listings/index.ejs",{allListing});
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
}); 

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const foundListing=await listing.findById(id);
    res.render("listings/show.ejs",{foundListing});
});

app.post("/listings",async (req,res)=>{
    let newListing=new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const foundListing = await listing.findById(id);
  res.render("listings/edit.ejs", { foundListing });
});

app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  res.redirect("/listings");
});