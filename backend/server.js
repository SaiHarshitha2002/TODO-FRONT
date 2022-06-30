const exp=require('express')
const cors=require('cors')
const expressAsyncHandler=require('express-async-handler');
const workApi = require('./APIS/workApi');
const personalApi = require('./APIS/personalApi');
const wishlistsApi=require('./APIS/wishlistsApi');
const birthdaysApi=require('./APIS/birthdaysApi');
const userApi = require('./APIS/userApis');
const app=exp()
app.use(cors())

app.use(exp.json())

const port=4040;

const mclient=require('mongodb').MongoClient;
const DBurl="mongodb+srv://kksaiharshitha:sai%40_123@cluster0.sgyxu.mongodb.net/?retryWrites=true&w=majority";
mclient.connect(DBurl)
.then((client)=>{
    const databaseObj=client.db('MyfirstDatabase')
    const workCollection=databaseObj.collection('workTodos')
    const personalCollection=databaseObj.collection('personalTodos')
    const wishlistsCollection=databaseObj.collection('wishlistsTodos')
    const birthdaysCollection=databaseObj.collection('birthdaysTodos')
    const userCollection=databaseObj.collection("UserCollection")
    app.set("userCollection",userCollection);
    app.set("workCollection",workCollection);
    app.set("personalCollection",personalCollection);
    app.set("wishlistsCollection",wishlistsCollection);
    app.set("birthdaysCollection",birthdaysCollection);
    console.log('DB connection successfull')
})
.catch(()=>console.log('Error in connecting to the database'))

app.use('/work',workApi) 
app.use('/Personal',personalApi)
app.use('/wishlist',wishlistsApi) 
app.use('/birthdays',birthdaysApi) 
app.use('/users',userApi)


app.use((request, response, next) => {
    response.send({ message: `path ${request.url} is invalid` });
  });



  //error handling middleware
  app.use((error, request, response, next) => {
    response.send({ message: "Error occurred", reason: `${error.message}` });
  });
  

app.listen(port,()=>console.log(`server is running on port ${port}`))
