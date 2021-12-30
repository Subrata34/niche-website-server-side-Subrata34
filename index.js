
const express=require('express')
const app=express()
const cors=require('cors')
const { MongoClient } = require('mongodb');


require('dotenv').config()
const port =process.env.PORT||8000;

app.use(cors());
app.use(express.json());

//email and password mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g4aj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



//mongodb connection 
async function run(){
    try{
    await client.connect();
    const database=client.db('cars');
    const carCollection=database.collection('carService');
    const userCollection =database.collection('reviewusers')
    console.log('database connection ');

     //userReview api
     app.get('/reviewusers',async(req,res)=>{
         const car=userCollection.find({});
         const reviewserver=await car.toArray();
         res.send(reviewserver);
     })
    //Get api
    app.get('/carService',async (req,res)=>{
        const cursor=carCollection.find({});
        const carService=await cursor.toArray();
        res.send(carService);
    })
    
    //post api
    app.post('/carService',async(req,res)=>{
        const service=req.body;
        console.log('hited the post',service )
        const result =await carCollection.insertOne(service)
       console.log(result)
        res.json(result)
     
    });

    }
    finally{
        //await client.close();
    }

}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hallo worlds');
})

app.listen(port,()=>{
    console.log(`listening at ${port}`);
})